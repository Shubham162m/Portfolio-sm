import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const YOUR_INFO = {
    name: "Modi Shubham",
    title: "B-Tech Student",
    email: "modishubham162@gmail.com",
    phone: "+91 9265706957",
    location: "Vadgam, Palanpur, Gujarat, India",
    introText:
      "Have a project in mind? I'd love to hear about it. Send me a message and I'll get back to you within 24 hours."
  };

  const SOCIAL_LINKS = {
    instagram: "https://www.instagram.com/smodi._20/",
    facebook: "https://www.facebook.com/shubham.modi.33483",
    whatsapp: "https://wa.me/qr/URLGP4CNTE23M1",
    linkedin: "https://www.linkedin.com/in/shubham-modi-ba1230363/",
    github: "https://github.com/Shubham162m"
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });

        setTimeout(() => setSubmitted(false), 3000);
      } else {
        alert(data.message || "Something went wrong");
      }

    } catch (error) {
      console.error(error);
      alert("Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-wrapper">

          <div className="contact-info">
            <h3>Let's Talk</h3>
            <p>{YOUR_INFO.introText}</p>

            <div className="contact-details">
              <div className="contact-item">
                <h4>Email</h4>
                <a href={`mailto:${YOUR_INFO.email}`}>
                  {YOUR_INFO.email}
                </a>
              </div>

              <div className="contact-item">
                <h4>Phone</h4>
                <a href={`tel:${YOUR_INFO.phone}`}>
                  {YOUR_INFO.phone}
                </a>
              </div>

              <div className="contact-item">
                <h4>Location</h4>
                <p>{YOUR_INFO.location}</p>
              </div>
            </div>

            <div className="contact-social">
              <h4>Follow Me</h4>
              <div className="social-links">
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer">Instagram</a>
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer">Facebook</a>
                <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Contact Me</h3>

            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                placeholder="Tell me about your project..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>

            {submitted && (
              <div className="success-message">
                Message sent successfully! 
              </div>
            )}
          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;