import { formatPrice } from '../data/products.js';
import { cartTotal } from '../lib/cart.js';

export default function Cart({ cart, products, onRemove }){
  if (cart.length === 0){
    return <p className="text-muted mb-0">Tu carrito está vacío.</p>;
  }

  return (
    <div className="border-top">
      {cart.map(item => {
        const product = products.find(product => product.id === item.id);
        if (!product){
          return null;
        }

        return (
          <div className="border-bottom py-3 d-flex flex-wrap align-items-center justify-content-between gap-3" key={item.id}>
            <div>
              <strong>{product.name}</strong>
              <div className="d-flex flex-wrap gap-3 text-muted small">
                <span>Cantidad: {item.quantity}</span>
                <span>{formatPrice(product.price * item.quantity)}</span>
              </div>
            </div>
            <button className="btn btn-outline-secondary btn-sm" type="button" onClick={() => onRemove(item.id)} aria-label={`Quitar una unidad de ${product.name}`}>
              Quitar
            </button>
          </div>
        );
      })}
      <p className="fw-semibold text-end mt-3">Total: {formatPrice(cartTotal(cart))}</p>
    </div>
  );
}
