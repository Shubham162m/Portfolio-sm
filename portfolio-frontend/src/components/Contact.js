import React, { useState } from "react";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const social = {
    instagram: "https://www.instagram.com/smodi._20/",
    facebook: "https://www.facebook.com/shubham.modi.33483",
    whatsapp: "https://wa.me/qr/URLGP4CNTE23M1",
    linkedin: "https://www.linkedin.com/in/shubham-modi-ba1230363/",
    github: "https://github.com/Shubham162m",
  };

  const change = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch(
        "https://smgalaxy-backend.onrender.com/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error();

      setForm({ name: "", email: "", message: "" });
      setSuccess(true);
    } catch {
      alert("Unable to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-wrapper">

          <div className="contact-info">
            <h3>Let's Talk</h3>
            <p>
              Have a project in mind? I'd love to hear about it.
              Send me a message and I'll get back to you within 24 hours.
            </p>

            <h4>Email</h4>
            <a href="mailto:modishubham162@gmail.com">
              modishubham162@gmail.com
            </a>

            <h4>Phone</h4>
            <a href="tel:+919265706957">
              +91 9265706957
            </a>

            <h4>Location</h4>
            <p>Vadgam, Palanpur, Gujarat, India</p>

            <h4>Follow Me</h4>

            <div className="social-links">
              {Object.entries(social).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>

          <form
            className="contact-form"
            onSubmit={submit}
          >
            <h3>Contact Me</h3>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={change}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={change}
              required
            />

            <textarea
              name="message"
              placeholder="Tell me about your project..."
              rows="5"
              value={form.message}
              onChange={change}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success && (
              <p>Message sent successfully!</p>
            )}
          </form>

        </div>
      </div>
    </section>
  );
}

export default Contact;
