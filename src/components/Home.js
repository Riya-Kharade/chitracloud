import React from "react";
import "./Home.css";
import {
  Palette,
  Scissors,
  SlidersHorizontal,
  RefreshCw,
  Upload,
  Wand2,
  Download
} from "lucide-react";

import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaHome,
  FaInfoCircle,
  FaEdit
} from "react-icons/fa";

function Home({ setCurrentPage, isAuthenticated }) {

  const handleStart = () => {
  if (isAuthenticated) {
    setCurrentPage("editor");
  } else {
    setCurrentPage("auth");
  }
};
  

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="heroContent">
          <h1>
            Edit Images Faster in the Cloud ☁️
          </h1>

          <p>
            Crop, resize, apply filters and convert images online.
            No software installation needed.
          </p>

          <div className="heroButtons">
           <button 
  className="primaryBtn" 
  onClick={() => setCurrentPage("auth")}
>
  Start Editing
</button>

<button
  className="secondaryBtn"
  onClick={() => setCurrentPage("auth")}
>
  Create Free Account
</button>
          </div>

          <div className="trust">Fast • Secure • Free</div>
        </div>

        {/* 🔥 REAL IMAGE ADD */}
        <div className="heroImage">
          <img
            src="https://images.unsplash.com/photo-1545235617-9465d2a55698"
            alt="editor"
            className="heroImg"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>Features</h2>

        <div className="featureGrid">

          <div className="featureCard">
            <Palette className="icon" />
            <h3>Filters</h3>
            <p>Apply beautiful color effects instantly.</p>
          </div>

          <div className="featureCard">
            <Scissors className="icon" />
            <h3>Crop & Transform</h3>
            <p>Resize, rotate and crop with ease.</p>
          </div>

          <div className="featureCard">
            <SlidersHorizontal className="icon" />
            <h3>Adjustments</h3>
            <p>Control brightness, contrast and colors.</p>
          </div>

          <div className="featureCard">
            <RefreshCw className="icon" />
            <h3>Conversion</h3>
            <p>Convert PDF/Image instantly.</p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how">
        <h2>How it Works</h2>

        <div className="steps">

          <div className="step">
            <Upload className="icon" />
            <h3>Upload Image</h3>
            <p>Upload JPG, PNG or PDF files</p>
          </div>

          <div className="step">
            <Wand2 className="icon" />
            <h3>Edit Online</h3>
            <p>Apply filters and transformations</p>
          </div>

          <div className="step">
            <Download className="icon" />
            <h3>Download</h3>
            <p>Save edited image instantly</p>
          </div>

        </div>
      </section>

      {/* PREVIEW */}
      <section className="preview">
        <h2>Application Preview</h2>

        <div className="previewGrid">

          <div className="previewCard">
            <img src="https://via.placeholder.com/300x180" alt="editor" />
            <p>Editor UI</p>
          </div>

          <div className="previewCard">
            <img src="https://via.placeholder.com/300x180" alt="filters" />
            <p>Filters</p>
          </div>

          <div className="previewCard">
            <img src="https://via.placeholder.com/300x180" alt="conversion" />
            <p>Conversion</p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to edit your images?</h2>
        <p>Start using ChitraCloud today for free.</p>

       <button className="primaryBtnn" onClick={() => setCurrentPage("auth")}>
          Create Free Account
        </button>
      </section>

      {/* FOOTER */}

<footer className="footer">
  <div className="footerContent">

    {/* Column 1 */}
    <div className="footerCol">
      <h3>ChitraCloud</h3>
      <p>Cloud based image editing platform for fast and easy editing.</p>
    </div>

    {/* Column 2 */}
    {/* Column 2 */}
<div className="footerCol">
  <h4>Important Pages</h4>

  <ul>

    <li onClick={() => setCurrentPage("home")}>
      <FaHome />
      <span>Home</span>
    </li>

    <li onClick={() => setCurrentPage("about")}>
      <FaInfoCircle />
      <span>About</span>
    </li>

    {/* ✅ Editor → goes to auth first */}
    <li onClick={() => setCurrentPage("auth")}>
      <FaEdit />
      <span>Editor</span>
    </li>

    {/* ✅ Contact */}
    <li onClick={() => setCurrentPage("contact")}>
      <FaEnvelope />
      <span>Contact</span>
    </li>

  </ul>
</div>

    {/* Column 3 */}
    <div className="footerCol">
      <h4>Contact</h4>
      <p>
  <FaEnvelope />
  <a href="mailto:riyasunilkharade.vit@gmail.com">
    riyasunilkharade.vit@gmail.com
  </a>
</p>

<p>
  <FaGithub />
  <a href="https://github.com/riya-kharade" target="_blank" rel="noopener noreferrer">
    Github
  </a>
</p>

<p>
  <FaLinkedin />
  <a href="https://linkedin.com/in/riyakharade" target="_blank" rel="noopener noreferrer">
    LinkedIn
  </a>
</p>
    </div>

  </div>

 <p className="copy">
  © 2026 ChitraCloud |
  <a
    href="https://riyakharade-portfolio.netlify.app/"
    target="_blank"
    rel="noopener noreferrer"
  >
    My Portfolio
  </a>
</p>
</footer>

    </div>
  );
}

export default Home;