import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { AuthView } from '@neondatabase/neon-js/auth/react'

import { fallbackProducts, fallbackSections } from './catalog'
import type { Product } from './types'
import './styles.css'

import Checkout from './Checkout'
import PaymentResult from './PaymentResult'
import AdminDashboard from './AdminDashboard'
import { authClient } from './neon'

import {
  CGV,
  Confidentialite,
  Contact,
  MentionsLegales,
} from './LegalPages'

function Shop() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(
        localStorage.getItem('nda-favorites') || '[]'
      )
    } catch {
      return []
    }
  })

  const [cart, setCart] = useState<Record<string, number>>(() => {
    try {
      return JSON.parse(
        localStorage.getItem('nda-cart') || '{}'
      )
    } catch {
      return {}
    }
  })

  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  const sections = fallbackSections
  const products = fallbackProducts

  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0
  )

  const selection = products.filter((product) =>
    favorites.includes(product.id)
  )

  const cartItems = products
    .filter((product) => (cart[product.id] || 0) > 0)
    .map((product) => ({
      product,
      quantity: cart[product.id] || 0,
    }))

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total +
      item.product.price_cents * item.quantity,
    0
  )

  function saveCart(next: Record<string, number>) {
    setCart(next)

    localStorage.setItem(
      'nda-cart',
      JSON.stringify(next)
    )
  }

  function toggleFavorite(id: string) {
    const next = favorites.includes(id)
      ? favorites.filter((item) => item !== id)
      : [...favorites, id]

    setFavorites(next)

    localStorage.setItem(
      'nda-favorites',
      JSON.stringify(next)
    )
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
        <div className="brand">
          Le Noël des Amis
        </div>

        <nav>
          <a href="#accueil">
            Accueil
          </a>

          <a href="#boutique">
            Boutique
          </a>

          <a href="#selection">
            Ma sélection{' '}
            <span className="count">
              {favorites.length}
            </span>
          </a>

          <button
            type="button"
            className="linkButton"
            onClick={() => setCartOpen(true)}
          >
            Panier{' '}
            <span className="count">
              {cartCount}
            </span>
          </button>

          <Link
            to="/admin"
            className="adminLink"
          >
            Admin
          </Link>
        </nav>
      </header>

      <main>
        <section
          id="accueil"
          className="hero"
        >
          <div className="heroInner">
            <div className="eyebrow">
              Quai des Amis
            </div>

            <h1>
              Le Noël des Amis
            </h1>

            <p>
              La cuisine du Quai des Amis
              s’invite chez vous.
            </p>

            <a
              className="cta"
              href="#boutique"
            >
              Découvrir la boutique
            </a>
          </div>
        </section>

        <section
          id="boutique"
          className="catalogue"
        >
          <div className="sectionIntro">
            <div className="eyebrow">
              La boutique
            </div>

            <h2>
              Une sélection gastronomique
              à partager
            </h2>
          </div>

          {sections.map((section) => {
            const items = products.filter(
              (product) =>
                product.section_id === section.id
            )

            if (!items.length) {
              return null
            }

            return (
              <div
                className="category"
                key={section.id}
              >
                <h3>
                  {section.title_fr}
                </h3>

                <div className="cards">
                  {items.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      favorite={favorites.includes(
                        product.id
                      )}
                      onFavorite={() =>
                        toggleFavorite(product.id)
                      }
                      onAdd={() =>
                        addToCart(product.id)
                      }
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

            <h2>
              Ma sélection
            </h2>
          </div>

          {selection.length ? (
            <div className="cards">
              {selection.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  favorite
                  onFavorite={() =>
                    toggleFavorite(product.id)
                  }
                  onAdd={() =>
                    addToCart(product.id)
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
        <div>
          Le Noël des Amis · Quai des Amis
        </div>

        <div className="footerLinks">
          <Link to="/mentions-legales">
            Mentions légales
          </Link>

          <Link to="/cgv">
            CGV
          </Link>

          <Link to="/confidentialite">
            Confidentialité
          </Link>

          <Link to="/contact">
            Contact
          </Link>
        </div>
      </footer>

      {cartOpen && (
        <>
          <div
            className="cartBackdrop"
            onClick={() =>
              setCartOpen(false)
            }
          />

          <aside className="cartDrawer">
            <div className="cartHeader">
              <div>
                <div className="eyebrow">
                  Votre commande
                </div>

                <h2>
                  Panier
                </h2>
              </div>

              <button
                type="button"
                className="cartClose"
                onClick={() =>
                  setCartOpen(false)
                }
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
                    type="button"
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
                      ({
                        product,
                        quantity,
                      }) => (
                        <div
                          className="cartItem"
                          key={product.id}
                        >
                          <div className="cartItemImage">
                            {product.image_url ? (
                              <img
                                src={
                                  product.image_url
                                }
                                alt={
                                  product.name_fr
                                }
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
                              {(
                                product.price_cents /
                                100
                              ).toFixed(2)}{' '}
                              €

                              {product.grams
                                ? ` · ${product.grams} g`
                                : ''}
                            </div>

                            <div className="quantityRow">
                              <button
                                type="button"
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
                                type="button"
                                onClick={() =>
                                  increaseQuantity(
                                    product.id
                                  )
                                }
                              >
                                +
                              </button>

                              <button
                                type="button"
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
                      <span>
                        Total
                      </span>

                      <strong>
                        {(
                          cartTotal / 100
                        ).toFixed(2)}{' '}
                        €
                      </strong>
                    </div>

                    <p className="cartInfo">
                      Le retrait et le paiement
                      seront sélectionnés à
                      l’étape suivante.
                    </p>

                    <button
                      type="button"
                      className="checkoutButton"
                      onClick={() => {
                        setCartOpen(false)
                        setCheckoutOpen(true)
                      }}
                    >
                      Commander
                    </button>

                    <button
                      type="button"
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

      {checkoutOpen && (
        <>
          <div
            className="cartBackdrop"
            onClick={() =>
              setCheckoutOpen(false)
            }
          />

          <aside className="checkoutDrawer">
            <Checkout
              total={cartTotal}
              count={cartCount}
              onBack={() => {
                setCheckoutOpen(false)
                setCartOpen(true)
              }}
            />
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
        type="button"
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
            alt={product.name_fr}
          />
        ) : (
          <span>
            Photo produit
          </span>
        )}
      </div>

      <div className="cardBody">
        <h4>
          {product.name_fr}
        </h4>

        <div className="productMeta">
          <span>
            {(
              product.price_cents /
              100
            ).toFixed(2)}{' '}
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
          type="button"
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
  const {
    data: session,
    isPending,
  } = authClient.useSession()

  async function logout() {
    await authClient.signOut()
    window.location.href = '/'
  }

  if (isPending) {
    return (
      <div className="adminShell">
        <div className="adminPanel">
          <p>
            Vérification de la session…
          </p>
        </div>
      </div>
    )
  }

  if (!session?.user) {
    return (
      <div className="adminShell">
        <div className="adminTop">
          <div>
            <div className="eyebrow">
              Espace privé
            </div>

            <h1>
              Administration
            </h1>
          </div>

          <Link
            to="/"
            className="ghost"
          >
            Retour à la boutique
          </Link>
        </div>

        <div className="adminGrid">
          <section className="adminPanel">
            <h2>
              Connexion
            </h2>

            <p className="muted">
              Cet espace est réservé aux
              comptes internes du Noël des Amis.
            </p>

            <AuthView pathname="sign-in" />
          </section>

          <section className="adminPanel">
            <h2>
              Accès réservé
            </h2>

            <p>
              Les clients de la boutique
              n’ont pas besoin de compte.
            </p>

            <div className="check">
              ✓ Commande client sans inscription
            </div>

            <div className="check">
              ✓ Accès interne uniquement
            </div>

            <div className="check">
              ✓ Comptes Admin / Chef
            </div>
          </section>
        </div>
      </div>
    )
  }

  return (
    <div className="adminShell">
      <div className="adminTop">
        <div>
          <div className="eyebrow">
            Administration
          </div>

          <h1>
            Le Noël des Amis
          </h1>

          <p className="muted">
            Connecté : {session.user.email}
          </p>
        </div>

        <div>
          <Link
            to="/"
            className="ghost"
          >
            Voir la boutique
          </Link>

          {' '}

          <button
            type="button"
            className="ghost"
            onClick={logout}
          >
            Se déconnecter
          </button>
        </div>
      </div>

      <AdminDashboard />
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

      <Route
        path="/mentions-legales"
        element={<MentionsLegales />}
      />

      <Route
        path="/confidentialite"
        element={<Confidentialite />}
      />

      <Route
        path="/cgv"
        element={<CGV />}
      />

      <Route
        path="/contact"
        element={<Contact />}
      />

      <Route
        path="/paiement-reussi"
        element={
          <PaymentResult status="success" />
        }
      />

      <Route
        path="/paiement-echec"
        element={
          <PaymentResult status="failure" />
        }
      />
    </Routes>
  )
}
