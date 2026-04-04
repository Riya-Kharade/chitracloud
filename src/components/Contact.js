import React, { useState } from "react";
import { FaUser, FaEnvelope, FaCommentDots } from "react-icons/fa";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      setSuccess("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setSuccess("Something went wrong!");
    }
  };

  return (
    <div className="contactContainer">

      <h1>Contact <span className="brand">ChitraCloud</span></h1>

      <form className="contactForm" onSubmit={handleSubmit}>

        <div className="inputGroup">
          <FaUser className="icon" />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="inputGroup">
          <FaEnvelope className="icon" />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="inputGroup">
          <FaCommentDots className="icon" />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Send Message</button>

        {success && <p className="successMsg">{success}</p>}
      </form>
    </div>
  );
}

export default Contact;