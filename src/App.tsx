import { useMemo, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { AuthView } from '@neondatabase/neon-js/auth/react'

import { fallbackProducts, fallbackSections } from './catalog'
import type { Product } from './types'
import './styles.css'

function Shop() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('nda-favorites') || '[]') } catch { return [] }
  })
  const [cart, setCart] = useState<Record<string, number>>({})

  const sections = fallbackSections
  const products = fallbackProducts

  const cartCount = Object.values(cart).reduce((a,b)=>a+b,0)
  const selection = products.filter(p => favorites.includes(p.id))

  function toggleFavorite(id:string){
    const next = favorites.includes(id) ? favorites.filter(x=>x!==id) : [...favorites,id]
    setFavorites(next)
    localStorage.setItem('nda-favorites', JSON.stringify(next))
  }

  function addToCart(id:string){
    setCart(c => ({...c,[id]:(c[id]||0)+1}))
  }

  return <div className="site">
    <header className="shopHeader">
      <div className="brand">Le Noël des Amis</div>
      <nav>
        <a href="#accueil">Accueil</a>
        <a href="#boutique">Boutique</a>
        <a href="#selection">Ma sélection <span className="count">{favorites.length}</span></a>
        <button className="linkButton" onClick={()=>alert(`Panier : ${cartCount} article(s). Le checkout arrive à l’étape suivante.`)}>Panier <span className="count">{cartCount}</span></button>
        <Link to="/admin" className="adminLink">Admin</Link>
      </nav>
    </header>

    <main>
      <section id="accueil" className="hero">
        <div className="heroInner">
          <div className="eyebrow">Quai des Amis</div>
          <h1>Le Noël des Amis</h1>
          <p>La cuisine du Quai des Amis s’invite chez vous.</p>
          <a className="cta" href="#boutique">Découvrir la boutique</a>
        </div>
      </section>

      <section id="boutique" className="catalogue">
        <div className="sectionIntro">
          <div className="eyebrow">La boutique</div>
          <h2>Une sélection gastronomique à partager</h2>
        </div>

        {sections.map(section => {
          const items = products.filter(p => p.section_id === section.id)
          if (!items.length) return null
          return <div className="category" key={section.id}>
            <h3>{section.title_fr}</h3>
            <div className="cards">
              {items.map(p => <ProductCard
                key={p.id}
                product={p}
                favorite={favorites.includes(p.id)}
                onFavorite={()=>toggleFavorite(p.id)}
                onAdd={()=>addToCart(p.id)}
              />)}
            </div>
          </div>
        })}
      </section>

      <section id="selection" className="selection">
        <div className="sectionIntro">
          <div className="eyebrow">Vos favoris</div>
          <h2>Ma sélection</h2>
        </div>
        {selection.length
          ? <div className="cards">{selection.map(p => <ProductCard key={p.id} product={p} favorite onFavorite={()=>toggleFavorite(p.id)} onAdd={()=>addToCart(p.id)} />)}</div>
          : <p className="muted">Ajoutez des produits à votre sélection avec le cœur.</p>}
      </section>
    </main>

    <footer>Le Noël des Amis · Quai des Amis</footer>
  </div>
}

function ProductCard({product,favorite,onFavorite,onAdd}:{product:Product,favorite:boolean,onFavorite:()=>void,onAdd:()=>void}){
  return <article className="card">
    <button className={`fav ${favorite?'on':''}`} onClick={onFavorite} aria-label="Ajouter à ma sélection">{favorite?'♥':'♡'}</button>
    <div className="imagePlaceholder">{product.image_url ? <img src={product.image_url} alt="" /> : <span>Photo produit</span>}</div>
    <div className="cardBody">
      <h4>{product.name_fr}</h4>
      <div className="productMeta">
        <span>{(product.price_cents/100).toFixed(2)} €</span>
        {product.grams ? <span>· {product.grams} g</span> : null}
      </div>
      <button className="add" onClick={onAdd}>Ajouter au panier</button>
    </div>
  </article>
}

function Admin() {
  return <div className="adminShell">
    <div className="adminTop">
      <div>
        <div className="eyebrow">Administration</div>
        <h1>Le Noël des Amis</h1>
      </div>
      <Link to="/" className="ghost">Voir la boutique</Link>
    </div>

    <div className="adminGrid">
      <section className="adminPanel">
        <h2>Connexion Admin</h2>
        <p className="muted">La connexion est gérée par Neon Auth. Les règles RLS de la base restent l’autorité finale pour toute modification.</p>
        <AuthView pathname="sign-in" />
      </section>

      <section className="adminPanel">
        <h2>V4 technique</h2>
        <p>Cette V4 sépare enfin le site public de l’Admin et prépare les écritures persistantes dans Neon.</p>
        <div className="check">✓ Neon Auth branchable</div>
        <div className="check">✓ Admin isolé sur /admin</div>
        <div className="check">✓ Design boutique conservé</div>
        <div className="check">✓ Structure prête pour produits, sections, tailles et stocks</div>
        <div className="next">Prochaine sous-étape : brancher le client Data API unifié et remplacer le catalogue de secours par les données live.</div>
      </section>
    </div>
  </div>
}

export default function App(){
  return <Routes>
    <Route path="/" element={<Shop />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/auth/:pathname" element={<AuthView />} />
  </Routes>
}
