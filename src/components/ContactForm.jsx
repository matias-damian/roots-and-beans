import { useState } from 'react';
import { validateContact } from '../lib/validation.js';

const emptyForm = { name: '', email: '', message: '' };

export default function ContactForm(){
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event){
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: value }));
    setSubmitted(false);
  }

  function handleSubmit(event){
    event.preventDefault();
    const nextErrors = validateContact(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0){
      return;
    }
    try{
      localStorage.setItem('ultimoMensaje', JSON.stringify(form));
    } catch{
      setErrors({ form: 'No se pudo guardar el mensaje. Inténtalo de nuevo.' });
      return;
    }

    setSubmitted(true);
    setForm(emptyForm);
  }

  return (
    <form className="contact-form bg-white border rounded-2 p-4" noValidate onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label" htmlFor="name">Nombre</label>
        <input className="form-control" id="name" name="name" type="text" autoComplete="name" value={form.name} onChange={handleChange} aria-invalid={Boolean(errors.name)} />
        {errors.name && <p className="error mt-1">{errors.name}</p>}
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="email">Correo electrónico</label>
        <input className="form-control" id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} aria-invalid={Boolean(errors.email)} />
        {errors.email && <p className="error mt-1">{errors.email}</p>}
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="message">Mensaje</label>
        <textarea className="form-control" id="message" name="message" rows="4" value={form.message} onChange={handleChange} aria-invalid={Boolean(errors.message)} />
        {errors.message && <p className="error mt-1">{errors.message}</p>}
      </div>
      <button className="btn btn-coffee" type="submit">Enviar mensaje</button>
      {errors.form && <p className="error mt-3 mb-0" role="alert">{errors.form}</p>}
      {submitted && <p className="success mt-3 mb-0" role="status">Mensaje registrado correctamente.</p>}
    </form>
  );
}
