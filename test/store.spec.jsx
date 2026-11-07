import { act } from 'react';
import { createRoot } from 'react-dom/client';
import App from '../src/App.jsx';
import Cart from '../src/components/Cart.jsx';
import ContactForm from '../src/components/ContactForm.jsx';
import ProductCard from '../src/components/ProductCard.jsx';
import { products } from '../src/data/products.js';
import { addItem, readCart, removeItem } from '../src/lib/cart.js';
import { validateContact } from '../src/lib/validation.js';

const product = products[0];
let container;
let root;

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

function render(component){
  act(() => root.render(component));
}

function click(element){
  act(() => element.click());
}

function fillField(id, value){
  const element = container.querySelector(`#${id}`);
  const setter = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(element), 'value').set;
  act(() => {
    setter.call(element, value);
    element.dispatchEvent(new Event('input', { bubbles: true }));
  });
}

beforeEach(() => {
  localStorage.clear();
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  localStorage.clear();
});

describe('Roots & Beans', () => {
  it('abre el inicio con un carrito inválido', () => {
    localStorage.setItem('carrito', 'datos-incorrectos');
    render(<App />);
    expect(container.querySelector('h1').textContent).toContain('Roots & Beans');
    expect(container.querySelector('video')).not.toBeNull();
    click(Array.from(container.querySelectorAll('nav button')).find(button => button.textContent === 'Contacto'));
    expect(container.querySelector('form')).not.toBeNull();
  });

  it('muestra los seis productos', () => {
    render(<App />);
    click(Array.from(container.querySelectorAll('nav button')).find(button => button.textContent === 'Productos'));
    expect(container.querySelectorAll('.product-card').length).toBe(6);
  });

  it('añade un producto y actualiza el total', () => {
    render(<App />);
    click(Array.from(container.querySelectorAll('nav button')).find(button => button.textContent === 'Productos'));
    click(container.querySelector('.product-card button'));
    expect(container.querySelector('nav').textContent).toContain('Carrito (1)');
    click(Array.from(container.querySelectorAll('nav button')).find(button => button.textContent.startsWith('Carrito')));
    expect(container.textContent).toContain('Total: $8.000');
    expect(JSON.parse(localStorage.getItem('carrito'))).toEqual([{ id: 1, quantity: 1 }]);
  });

  it('quita un producto del carrito', () => {
    render(<App />);
    click(Array.from(container.querySelectorAll('nav button')).find(button => button.textContent === 'Productos'));
    click(container.querySelector('.product-card button'));
    click(Array.from(container.querySelectorAll('nav button')).find(button => button.textContent.startsWith('Carrito')));
    click(container.querySelector('[aria-label="Quitar una unidad de Té Chai"]'));
    expect(container.textContent).toContain('Tu carrito está vacío.');
  });

  it('muestra el producto y ejecuta onAdd', () => {
    const onAdd = jasmine.createSpy('onAdd');
    render(<ProductCard product={product} onAdd={onAdd} />);
    expect(container.textContent).toContain('Té Chai');
    expect(container.textContent).toContain('$8.000');
    click(container.querySelector('button'));
    expect(onAdd).toHaveBeenCalledOnceWith(1);
  });

  it('muestra el carrito y ejecuta onRemove', () => {
    const onRemove = jasmine.createSpy('onRemove');
    render(<Cart cart={[{ id: 1, quantity: 2 }]} products={products} onRemove={onRemove} />);
    expect(container.textContent).toContain('Cantidad: 2');
    expect(container.textContent).toContain('Total: $16.000');
    click(container.querySelector('button'));
    expect(onRemove).toHaveBeenCalledOnceWith(1);
  });

  it('actualiza cantidades y recupera el carrito', () => {
    const once = addItem([], 1);
    const twice = addItem(once, 1);
    expect(twice).toEqual([{ id: 1, quantity: 2 }]);
    expect(removeItem(twice, 1)).toEqual([{ id: 1, quantity: 1 }]);
    expect(removeItem(once, 1)).toEqual([]);
    expect(addItem([], 999)).toEqual([]);
    localStorage.setItem('carrito', JSON.stringify([{ id: 1 }, { id: 1 }, { id: 999 }]));
    expect(readCart()).toEqual([{ id: 1, quantity: 2 }]);
  });

  it('valida los datos del contacto', () => {
    const errors = validateContact({ name: 'A', email: 'correo-invalido', message: 'Hola' });
    expect(Object.keys(errors).length).toBe(3);
    expect(errors.email).toContain('correo electrónico válido');
    expect(validateContact({ name: 'Juan Pérez', email: 'ejemplo@ejemplo.com', message: 'Mensaje de prueba para el formulario.' })).toEqual({});
  });

  it('muestra los errores del formulario', () => {
    render(<ContactForm />);
    click(container.querySelector('button[type="submit"]'));
    expect(container.querySelectorAll('.error').length).toBe(3);
    expect(container.querySelector('[role="status"]')).toBeNull();
  });

  it('completa el formulario y limpia los campos', () => {
    render(<ContactForm />);
    fillField('name', 'Juan Pérez');
    fillField('email', 'ejemplo@ejemplo.com');
    fillField('message', 'Mensaje de prueba para el formulario.');
    click(container.querySelector('button[type="submit"]'));
    expect(container.querySelector('[role="status"]').textContent).toContain('Mensaje registrado correctamente');
    expect(JSON.parse(localStorage.getItem('ultimoMensaje')).email).toBe('ejemplo@ejemplo.com');
    expect(container.querySelector('#name').value).toBe('');
  });
});
