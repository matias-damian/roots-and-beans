import { products } from '../data/products.js';

export function readCart(){
  try{
    const saved = JSON.parse(localStorage.getItem('carrito') || '[]');
    if (!Array.isArray(saved)){
      return [];
    }

    return saved.reduce((cart, item) => {
      if (!products.some(product => product.id === item?.id)){
        return cart;
      }

      const quantity = Number.isInteger(item.quantity) && item.quantity > 0 ? item.quantity : 1;
      const existing = cart.find(product => product.id === item.id);
      if (existing){
        existing.quantity += quantity;
      } else{
        cart.push({ id: item.id, quantity });
      }
      return cart;
    }, []);
  } catch{
    return [];
  }
}

export function addItem(cart, id){
  if (!products.some(product => product.id === id)){
    return cart;
  }

  const existing = cart.find(item => item.id === id);
  if (existing){
    return cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
  }
  return [...cart, { id, quantity: 1 }];
}

export function removeItem(cart, id){
  const existing = cart.find(item => item.id === id);
  if (!existing){
    return cart;
  }
  if (existing.quantity === 1){
    return cart.filter(item => item.id !== id);
  }
  return cart.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item);
}

export function cartTotal(cart){
  return cart.reduce((total, item) => {
    const product = products.find(product => product.id === item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
}
