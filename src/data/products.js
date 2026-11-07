export const products = [
  { id: 1, name: 'Té Chai', price: 8000, image: '/img/te_chai.jpg' },
  { id: 2, name: 'Té Verde', price: 6000, image: '/img/te_verde.jpg' },
  { id: 3, name: 'Té Menta', price: 10000, image: '/img/te_menta.jpg' },
  { id: 4, name: 'Café Árabe', price: 12000, image: '/img/arabic_coffee.jpg' },
  { id: 5, name: 'Café Libérica', price: 15000, image: '/img/liberica_coffee.png' },
  { id: 6, name: 'Café Robusta', price: 18000, image: '/img/robusta_coffee.jpg' }
];

export function formatPrice(amount){
  return `$${amount.toLocaleString('es-CL')}`;
}
