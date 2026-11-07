import { useEffect, useState } from 'react';
import Cart from './components/Cart.jsx';
import ContactForm from './components/ContactForm.jsx';
import ProductCard from './components/ProductCard.jsx';
import { products } from './data/products.js';
import { addItem, readCart, removeItem } from './lib/cart.js';

const pages = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'productos', label: 'Productos' },
  { id: 'contacto', label: 'Contacto' },
  { id: 'carrito', label: 'Carrito' }
];

export default function App(){
  const [page, setPage] = useState('inicio');
  const [cart, setCart] = useState(readCart);
  const count = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(cart));
  }, [cart]);

  function addProduct(id){
    setCart(current => addItem(current, id));
  }

  function removeProduct(id){
    setCart(current => removeItem(current, id));
  }

  return (
    <div className="site d-flex flex-column min-vh-100">
      <header className="site-header py-3">
        <div className="container d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3">
          <button className="brand border-0 bg-transparent text-white" type="button" onClick={() => setPage('inicio')}>
            Roots &amp; Beans
          </button>
          <nav aria-label="Navegación principal" className="d-flex flex-wrap justify-content-center gap-2">
            {pages.map(item => (
              <button key={item.id} type="button" className={`nav-button ${page === item.id ? 'selected' : ''}`} onClick={() => setPage(item.id)} aria-current={page === item.id ? 'page' : undefined}>
                {item.label}{item.id === 'carrito' ? ` (${count})` : ''}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container py-5 flex-grow-1">
        {page === 'inicio' && (
          <section className="intro row align-items-center g-4">
            <div className="col-lg-7">
              <h1>Bienvenido a Roots &amp; Beans</h1>
              <p>Roots &amp; Beans es una tienda de café de especialidad y té orgánico, con productos seleccionados directamente de nuestros proveedores.</p>
              <button className="btn btn-coffee" type="button" onClick={() => setPage('productos')}>Ver productos</button>
            </div>
            <div className="col-lg-5 text-center">
              <video className="intro-video rounded-2" controls playsInline preload="none" poster="/neko-poster.jpg" aria-label="Video de un gato junto a un café">
                <source src="/video.mp4" type="video/mp4" />
                Tu navegador no permite reproducir el video.
              </video>
            </div>
          </section>
        )}

        {page === 'productos' && (
          <section>
            <h1 className="mb-4">Productos</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {products.map(product => (
                <div className="col" key={product.id}>
                  <ProductCard product={product} onAdd={addProduct} />
                </div>
              ))}
            </div>
          </section>
        )}

        {page === 'contacto' && (
          <section>
            <h1 className="mb-4">Contacto</h1>
            <ContactForm />
          </section>
        )}

        {page === 'carrito' && (
          <section>
            <h1 className="mb-4">Carrito</h1>
            <Cart cart={cart} products={products} onRemove={removeProduct} />
          </section>
        )}
      </main>

      <footer className="site-footer py-3 text-center">2026 Roots &amp; Beans</footer>
    </div>
  );
}
