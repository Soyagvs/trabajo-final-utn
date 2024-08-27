import "./Contacts.css";

export const Contacts = () => {
  return (
    <main className="contact-main">
      <h2 className="contact-h2">Contactame</h2>
      <div className="context-contacto">
        <p className="contact-p">
          Por favor, complete el formulario y nos pondremos en contacto con
          usted a la brevedad a través de su correo electrónico.
        </p>

        <form action="" className="form">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            required
            autoComplete="additional-name"
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            autoComplete="additional-name"
          />

          <label htmlFor="message">Mensaje</label>
          <textarea name="message" id="message" ></textarea>
          <button type="submit" className="btn-contact">Enviar</button>
        </form>
      </div>
    </main>
  );
};
