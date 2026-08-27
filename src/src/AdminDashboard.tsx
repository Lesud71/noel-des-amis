import { useEffect, useState } from 'react'

type Product = {
  id: string
  section_id: string | null
  name_fr: string
  category: string
  price_cents: number
  grams: number | null
  image_url: string | null
  stock_mode: string
  stock_qty: number | null
  state: string
  archived: boolean
  sort_order: number
}

type ProductForm = {
  name_fr: string
  category: string
  price: string
  grams: string
  image_url: string
  stock_mode: string
  stock_qty: string
  state: string
}

const emptyForm: ProductForm = {
  name_fr: '',
  category: 'Foie gras',
  price: '',
  grams: '',
  image_url: '',
  stock_mode: 'unlimited',
  stock_qty: '',
  state: 'published',
}

const categories = [
  'Caviar',
  'Chutneys',
  'Foie gras',
  'Fromage',
  'Pains',
  'Saumons',
]

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [form, setForm] = useState<ProductForm>(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  async function loadProducts() {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin-products')

      if (!response.ok) {
        throw new Error(
          'Impossible de charger les produits.'
        )
      }

      const data = await response.json()
      setProducts(data)
    } catch (err) {
      console.error(err)
      setError(
        'Impossible de récupérer les produits depuis Neon.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  function updateField(
    field: keyof ProductForm,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function resetForm() {
    setForm(emptyForm)
    setEditingId(null)
    setError('')
    setMessage('')
  }

  function editProduct(product: Product) {
    setEditingId(product.id)

    setForm({
      name_fr: product.name_fr,
      category: product.category || 'Foie gras',
      price: (product.price_cents / 100).toFixed(2),
      grams:
        product.grams === null
          ? ''
          : String(product.grams),
      image_url: product.image_url || '',
      stock_mode: product.stock_mode || 'unlimited',
      stock_qty:
        product.stock_qty === null
          ? ''
          : String(product.stock_qty),
      state: product.state || 'published',
    })

    setError('')
    setMessage('')

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  async function saveProduct(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    setSaving(true)
    setError('')
    setMessage('')

    const normalizedPrice = form.price.replace(',', '.')
    const priceNumber = Number(normalizedPrice)

    if (
      Number.isNaN(priceNumber) ||
      priceNumber < 0
    ) {
      setError('Le prix indiqué est invalide.')
      setSaving(false)
      return
    }

    const priceCents = Math.round(priceNumber * 100)

    const payload = {
      id: editingId,
      name_fr: form.name_fr.trim(),
      category: form.category,
      price_cents: priceCents,
      grams: form.grams,
      image_url: form.image_url.trim(),
      stock_mode: form.stock_mode,
      stock_qty:
        form.stock_mode === 'limited'
          ? form.stock_qty
          : null,
      state: form.state,
    }

    try {
      const response = await fetch(
        '/api/admin-products',
        {
          method: editingId ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            'Impossible d’enregistrer le produit.'
        )
      }

      setMessage(
        editingId
          ? 'Produit modifié avec succès.'
          : 'Produit créé avec succès.'
      )

      setForm(emptyForm)
      setEditingId(null)

      await loadProducts()
    } catch (err) {
      console.error(err)

      setError(
        err instanceof Error
          ? err.message
          : 'Une erreur est survenue.'
      )
    } finally {
      setSaving(false)
    }
  }

  async function archiveProduct(product: Product) {
    const confirmed = window.confirm(
      `Archiver « ${product.name_fr} » ?`
    )

    if (!confirmed) {
      return
    }

    setError('')
    setMessage('')

    try {
      const response = await fetch(
        `/api/admin-products?id=${encodeURIComponent(
          product.id
        )}`,
        {
          method: 'DELETE',
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            'Impossible d’archiver le produit.'
        )
      }

      setMessage('Produit archivé.')
      await loadProducts()
    } catch (err) {
      console.error(err)

      setError(
        err instanceof Error
          ? err.message
          : 'Une erreur est survenue.'
      )
    }
  }

  return (
    <div className="adminProducts">
      <div className="adminPanel">
        <div className="adminSectionHeader">
          <div>
            <div className="eyebrow">
              Gestion de la boutique
            </div>

            <h2>
              {editingId
                ? 'Modifier le produit'
                : 'Nouveau produit'}
            </h2>
          </div>

          {editingId && (
            <button
              type="button"
              className="ghost"
              onClick={resetForm}
            >
              Annuler la modification
            </button>
          )}
        </div>

        <form
          className="adminProductForm"
          onSubmit={saveProduct}
        >
          <label>
            Nom du produit
            <input
              value={form.name_fr}
              onChange={(e) =>
                updateField('name_fr', e.target.value)
              }
              placeholder="Ex. Produit test Viva"
              required
            />
          </label>

          <div className="checkoutGrid">
            <label>
              Catégorie
              <select
                value={form.category}
                onChange={(e) =>
                  updateField(
                    'category',
                    e.target.value
                  )
                }
              >
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Prix en €
              <input
                value={form.price}
                onChange={(e) =>
                  updateField('price', e.target.value)
                }
                inputMode="decimal"
                placeholder="0,30"
                required
              />
            </label>

            <label>
              Poids en grammes
              <input
                value={form.grams}
                onChange={(e) =>
                  updateField('grams', e.target.value)
                }
                type="number"
                min="0"
                placeholder="100"
              />
            </label>

            <label>
              État
              <select
                value={form.state}
                onChange={(e) =>
                  updateField('state', e.target.value)
                }
              >
                <option value="published">
                  Publié
                </option>

                <option value="draft">
                  Brouillon
                </option>
              </select>
            </label>

            <label>
              Gestion du stock
              <select
                value={form.stock_mode}
                onChange={(e) =>
                  updateField(
                    'stock_mode',
                    e.target.value
                  )
                }
              >
                <option value="unlimited">
                  Stock illimité
                </option>

                <option value="limited">
                  Stock limité
                </option>
              </select>
            </label>

            {form.stock_mode === 'limited' && (
              <label>
                Quantité disponible
                <input
                  value={form.stock_qty}
                  onChange={(e) =>
                    updateField(
                      'stock_qty',
                      e.target.value
                    )
                  }
                  type="number"
                  min="0"
                  required
                />
              </label>
            )}
          </div>

          <label>
            URL de l’image
            <input
              value={form.image_url}
              onChange={(e) =>
                updateField(
                  'image_url',
                  e.target.value
                )
              }
              placeholder="https://..."
            />
          </label>

          {error && (
            <div className="adminNotice adminNoticeError">
              {error}
            </div>
          )}

          {message && (
            <div className="adminNotice">
              {message}
            </div>
          )}

          <button
            type="submit"
            className="checkoutButton"
            disabled={saving}
          >
            {saving
              ? 'Enregistrement…'
              : editingId
                ? 'Enregistrer les modifications'
                : 'Créer le produit'}
          </button>
        </form>
      </div>

      <div className="adminPanel">
        <div className="adminSectionHeader">
          <div>
            <div className="eyebrow">
              Catalogue
            </div>

            <h2>Produits</h2>
          </div>

          <strong>
            {products.length} produit(s)
          </strong>
        </div>

        {loading ? (
          <p>Chargement des produits…</p>
        ) : products.length === 0 ? (
          <p>Aucun produit.</p>
        ) : (
          <div className="adminProductList">
            {products.map((product) => (
              <div
                className="adminProductRow"
                key={product.id}
              >
                <div>
                  <strong>{product.name_fr}</strong>

                  <small>
                    {product.category}
                    {' · '}
                    {(product.price_cents / 100).toFixed(
                      2
                    )}{' '}
                    €
                    {product.grams
                      ? ` · ${product.grams} g`
                      : ''}
                  </small>
                </div>

                <div className="adminProductActions">
                  <span>
                    {product.state === 'published'
                      ? 'Publié'
                      : 'Brouillon'}
                  </span>

                  <button
                    type="button"
                    className="ghost"
                    onClick={() =>
                      editProduct(product)
                    }
                  >
                    Modifier
                  </button>

                  <button
                    type="button"
                    className="ghost"
                    onClick={() =>
                      archiveProduct(product)
                    }
                  >
                    Archiver
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
