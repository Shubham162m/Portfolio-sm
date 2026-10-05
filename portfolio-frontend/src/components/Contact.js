import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const socialLinks = {
    Instagram: "https://www.instagram.com/smodi._20/",
    Facebook: "https://www.facebook.com/shubham.modi.33483",
    WhatsApp: "https://wa.me/qr/URLGP4CNTE23M1",
    LinkedIn: "https://www.linkedin.com/in/shubham-modi-ba1230363/",
    GitHub: "https://github.com/Shubham162m",
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch(
        "https://smgalaxy-backend.onrender.com/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      setForm({
        name: "",
        email: "",
        message: "",
      });

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      alert("Unable to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">

        <div className="section-header">
          <span className="section-tag">CONTACT</span>
          <h2>Get In Touch</h2>
          <p>Let's discuss your next project.</p>
        </div>

        <div className="contact-wrapper">

          {/* Contact Information */}
          <div className="contact-info">

            <h3>Let's Talk</h3>

            <p>
              Have a project in mind? I'd love to hear about it.
              Send me a message and I'll get back to you within 24 hours.
            </p>

            <div className="contact-item">
              <h4>Email</h4>
              <a href="mailto:modishubham162@gmail.com">
                modishubham162@gmail.com
              </a>
            </div>

            <div className="contact-item">
              <h4>Phone</h4>
              <a href="tel:+919265706957">
                +91 9265706957
              </a>
            </div>

            <div className="contact-item">
              <h4>Location</h4>
              <p>Vadgam, Palanpur, Gujarat, India</p>
            </div>

            <div className="contact-social">
              <h4>Follow Me</h4>

              <div className="social-links">
                {Object.entries(socialLinks).map(
                  ([name, url]) => (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {name}
                    </a>
                  )
                )}
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <h3>Contact Me</h3>

            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                placeholder="Tell me about your project..."
                rows="5"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success && (
              <div className="success-message">
                Message sent successfully!
              </div>
            )}

          </form>

        </div>
      </div>
    </section>
  );
}

export default Contact;
