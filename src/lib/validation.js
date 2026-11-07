export function validateContact(values){
  const errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (name.length < 2 || name.length > 100){
    errors.name = 'El nombre debe tener entre 2 y 100 caracteres.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    errors.email = 'Ingresa un correo electrónico válido.';
  }
  if (message.length < 10 || message.length > 500){
    errors.message = 'El mensaje debe tener entre 10 y 500 caracteres.';
  }
  return errors;
}
