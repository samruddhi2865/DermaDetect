import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { name, email, message } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    const mailtoLink = `mailto:l201027@lhr.nu.edu.pk?subject=DermaDetect contact from ${name}&body=${encodeURIComponent(
      message
    )}%0D%0A%0D%0AFrom:%20${name}%0D%0AEmail:%20${email}`;
    window.location.href = mailtoLink;

    alert(
      'You are being redirected to your email client. If it does not open, please send the details manually using your email app.'
    );

    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="page-shell">
      <section className="contact-hero">
        <h1>Contact us</h1>
        <p>
          Have questions about your account, predictions, or the project in
          general? Send a message and the DermaDetect team will respond as
          soon as possible.
        </p>
      </section>

      <div className="contact-layout">
        <form className="contact-card" onSubmit={onSubmit}>
          <div className="contact-group">
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Your name"
              required
            />
          </div>

          <div className="contact-group">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="contact-group">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              value={message}
              onChange={onChange}
              placeholder="Tell us how we can help you"
              required
            />
          </div>

          <button type="submit" className="btn primary full-width">
            Send message
          </button>
        </form>

        <aside className="contact-side">
          <h2>Support & feedback</h2>
          <p>
            DermaDetect is a research‑driven project. Your feedback helps us
            improve the accuracy of the model, the usability of the interface,
            and the safety of the recommendations.
          </p>
          <p>
            Please avoid sharing highly sensitive personal information in your
            message. For urgent medical issues, always contact a healthcare
            professional directly.
          </p>
        </aside>
      </div>
    </div>
  );
};

export default Contact;
