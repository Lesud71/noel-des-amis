import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { AuthView } from '@neondatabase/neon-js/auth/react'

import { fallbackProducts, fallbackSections } from './catalog'
import type { Product } from './types'
import './styles.css'
import Checkout from './Checkout'
function Shop() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('nda-favorites') || '[]')
    } catch {
      return []
    }
  })

  const [cart, setCart] = useState<Record<string, number>>(() => {
    try {
      return JSON.parse(localStorage.getItem('nda-cart') || '{}')
    } catch {
      return {}
    }
  })

  const [cartOpen, setCartOpen] = useState(false)
const [checkoutOpen, setCheckoutOpen] = useState(false)
  const sections = fallbackSections
  const products = fallbackProducts

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0)

  const selection = products.filter(p => favorites.includes(p.id))

  const cartItems = products
    .filter(p => (cart[p.id] || 0) > 0)
    .map(product => ({
      product,
      quantity: cart[product.id] || 0,
    }))

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + item.product.price_cents * item.quantity,
    0
  )

  function saveCart(next: Record<string, number>) {
    setCart(next)
    localStorage.setItem('nda-cart', JSON.stringify(next))
  }

  function toggleFavorite(id: string) {
    const next = favorites.includes(id)
      ? favorites.filter(x => x !== id)
      : [...favorites, id]

    setFavorites(next)
    localStorage.setItem('nda-favorites', JSON.stringify(next))
  }

  function addToCart(id: string) {
    const next = {
      ...cart,
      [id]: (cart[id] || 0) + 1,
    }

    saveCart(next)
  }

  function increaseQuantity(id: string) {
    const next = {
      ...cart,
      [id]: (cart[id] || 0) + 1,
    }

    saveCart(next)
  }

  function decreaseQuantity(id: string) {
    const current = cart[id] || 0

    if (current <= 1) {
      removeFromCart(id)
      return
    }

    const next = {
      ...cart,
      [id]: current - 1,
    }

    saveCart(next)
  }

  function removeFromCart(id: string) {
    const next = { ...cart }
    delete next[id]
    saveCart(next)
  }

  return (
    <div className="site">
      <header className="shopHeader">
        <div className="brand">Le Noël des Amis</div>

        <nav>
          <a href="#accueil">Accueil</a>
          <a href="#boutique">Boutique</a>

          <a href="#selection">
            Ma sélection{' '}
            <span className="count">{favorites.length}</span>
          </a>

          <button
            className="linkButton"
            onClick={() => setCartOpen(true)}
          >
            Panier{' '}
            <span className="count">{cartCount}</span>
          </button>

          <Link to="/admin" className="adminLink">
            Admin
          </Link>
        </nav>
      </header>

      <main>
        <section id="accueil" className="hero">
          <div className="heroInner">
            <div className="eyebrow">Quai des Amis</div>

            <h1>Le Noël des Amis</h1>

            <p>
              La cuisine du Quai des Amis s’invite chez vous.
            </p>

            <a className="cta" href="#boutique">
              Découvrir la boutique
            </a>
          </div>
        </section>

        <section id="boutique" className="catalogue">
          <div className="sectionIntro">
            <div className="eyebrow">La boutique</div>

            <h2>
              Une sélection gastronomique à partager
            </h2>
          </div>

          {sections.map(section => {
            const items = products.filter(
              p => p.section_id === section.id
            )

            if (!items.length) return null

            return (
              <div
                className="category"
                key={section.id}
              >
                <h3>{section.title_fr}</h3>

                <div className="cards">
                  {items.map(p => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      favorite={favorites.includes(p.id)}
                      onFavorite={() =>
                        toggleFavorite(p.id)
                      }
                      onAdd={() => addToCart(p.id)}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </section>

        <section
          id="selection"
          className="selection"
        >
          <div className="sectionIntro">
            <div className="eyebrow">
              Vos favoris
            </div>

            <h2>Ma sélection</h2>
          </div>

          {selection.length ? (
            <div className="cards">
              {selection.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  favorite
                  onFavorite={() =>
                    toggleFavorite(p.id)
                  }
                  onAdd={() =>
                    addToCart(p.id)
                  }
                />
              ))}
            </div>
          ) : (
            <p className="muted">
              Ajoutez des produits à votre
              sélection avec le cœur.
            </p>
          )}
        </section>
      </main>

      <footer>
        Le Noël des Amis · Quai des Amis
      </footer>

      {cartOpen && (
        <>
          <div
            className="cartBackdrop"
            onClick={() => setCartOpen(false)}
          />

          <aside className="cartDrawer">
            <div className="cartHeader">
              <div>
                <div className="eyebrow">
                  Votre commande
                </div>

                <h2>Panier</h2>
              </div>

              <button
                className="cartClose"
                onClick={() => setCartOpen(false)}
                aria-label="Fermer le panier"
              >
                ×
              </button>
            </div>

            <div className="cartContent">
              {cartItems.length === 0 ? (
                <div className="emptyCart">
                  <p>
                    Votre panier est vide.
                  </p>

                  <button
                    className="ghost"
                    onClick={() =>
                      setCartOpen(false)
                    }
                  >
                    Continuer mes achats
                  </button>
                </div>
              ) : (
                <>
                  <div className="cartItems">
                    {cartItems.map(
                      ({ product, quantity }) => (
                        <div
                          className="cartItem"
                          key={product.id}
                        >
                          <div className="cartItemImage">
                            {product.image_url ? (
                              <img
                                src={product.image_url}
                                alt=""
                              />
                            ) : (
                              <span>
                                Photo
                              </span>
                            )}
                          </div>

                          <div className="cartItemInfo">
                            <h3>
                              {product.name_fr}
                            </h3>

                            <div className="cartItemMeta">
                              {(product.price_cents /
                                100
                              ).toFixed(2)}{' '}
                              €
                              {product.grams
                                ? ` · ${product.grams} g`
                                : ''}
                            </div>

                            <div className="quantityRow">
                              <button
                                onClick={() =>
                                  decreaseQuantity(
                                    product.id
                                  )
                                }
                              >
                                −
                              </button>

                              <span>
                                {quantity}
                              </span>

                              <button
                                onClick={() =>
                                  increaseQuantity(
                                    product.id
                                  )
                                }
                              >
                                +
                              </button>

                              <button
                                className="removeItem"
                                onClick={() =>
                                  removeFromCart(
                                    product.id
                                  )
                                }
                              >
                                Supprimer
                              </button>
                            </div>
                          </div>

                          <strong className="cartLineTotal">
                            {(
                              (product.price_cents *
                                quantity) /
                              100
                            ).toFixed(2)}{' '}
                            €
                          </strong>
                        </div>
                      )
                    )}
                  </div>

                  <div className="cartFooter">
                    <div className="cartTotal">
                      <span>Total</span>

                      <strong>
                        {(cartTotal / 100).toFixed(
                          2
                        )}{' '}
                        €
                      </strong>
                    </div>

                    <p className="cartInfo">
                      Le retrait et le paiement
                      seront sélectionnés à
                      l’étape suivante.
                    </p>

                    <button
                      className="checkoutButton"
                      onClick={() =>
                        alert(
                          'Étape suivante : checkout et paiement Viva.'
                        )
                      }
                    >
                      Commander
                    </button>

                    <button
                      className="continueButton"
                      onClick={() =>
                        setCartOpen(false)
                      }
                    >
                      Continuer mes achats
                    </button>
                  </div>
                </>
              )}
            </div>
          </aside>
        </>
      )}
    </div>
  )
}

function ProductCard({
  product,
  favorite,
  onFavorite,
  onAdd,
}: {
  product: Product
  favorite: boolean
  onFavorite: () => void
  onAdd: () => void
}) {
  return (
    <article className="card">
      <button
        className={`fav ${
          favorite ? 'on' : ''
        }`}
        onClick={onFavorite}
        aria-label="Ajouter à ma sélection"
      >
        {favorite ? '♥' : '♡'}
      </button>

      <div className="imagePlaceholder">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt=""
          />
        ) : (
          <span>Photo produit</span>
        )}
      </div>

      <div className="cardBody">
        <h4>{product.name_fr}</h4>

        <div className="productMeta">
          <span>
            {(product.price_cents / 100).toFixed(
              2
            )}{' '}
            €
          </span>

          {product.grams ? (
            <span>
              {' '}
              · {product.grams} g
            </span>
          ) : null}
        </div>

        <button
          className="add"
          onClick={onAdd}
        >
          Ajouter au panier
        </button>
      </div>
    </article>
  )
}

function Admin() {
  return (
    <div className="adminShell">
      <div className="adminTop">
        <div>
          <div className="eyebrow">
            Administration
          </div>

          <h1>Le Noël des Amis</h1>
        </div>

        <Link
          to="/"
          className="ghost"
        >
          Voir la boutique
        </Link>
      </div>

      <div className="adminGrid">
        <section className="adminPanel">
          <h2>Connexion Admin</h2>

          <p className="muted">
            La connexion est gérée par Neon Auth.
            Les règles RLS de la base restent
            l’autorité finale pour toute
            modification.
          </p>

          <AuthView pathname="sign-in" />
        </section>

        <section className="adminPanel">
          <h2>V4 technique</h2>

          <p>
            Cette V4 sépare enfin le site public
            de l’Admin et prépare les écritures
            persistantes dans Neon.
          </p>

          <div className="check">
            ✓ Neon Auth branchable
          </div>

          <div className="check">
            ✓ Admin isolé sur /admin
          </div>

          <div className="check">
            ✓ Design boutique conservé
          </div>

          <div className="check">
            ✓ Structure prête pour produits,
            sections, tailles et stocks
          </div>

          <div className="next">
            Prochaine sous-étape : brancher le
            catalogue et les modifications Admin
            sur Neon.
          </div>
        </section>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Shop />}
      />

      <Route
        path="/admin"
        element={<Admin />}
      />

      <Route
        path="/auth/:pathname"
        element={<AuthView />}
      />
    </Routes>
  )
}
