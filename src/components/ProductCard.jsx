import { formatPrice } from '../data/products.js';

export default function ProductCard({ product, onAdd }){
  return (
    <article className="card product-card h-100">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body d-flex flex-column">
        <h3 className="h6 mb-2">{product.name}</h3>
        <p className="mb-3">{formatPrice(product.price)}</p>
        <button className="btn btn-coffee mt-auto" type="button" onClick={() => onAdd(product.id)}>
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}
