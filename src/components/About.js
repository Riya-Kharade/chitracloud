import React from "react";
import { FaRocket, FaStar, FaLightbulb } from "react-icons/fa";
import "./About.css";

function About() {
  return (
    <div className="aboutContainer">

      {/* HERO */}
      <div className="aboutHero">
        <h1>
          About <span className="brand">ChitraCloud</span>
        </h1>
        <p>
          A cloud-based image editing platform designed for fast, simple, and powerful editing.
        </p>
      </div>

      {/* CARDS */}
      <div className="aboutContent">

        {/* CARD 1 */}
        <div className="aboutCard">
          <FaRocket className="topIcon" />
          <h2>Our Mission</h2>
          <p>
            To provide an easy-to-use online image editor that helps users edit,
            transform, and manage images efficiently without installing any software.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="aboutCard">
          <FaStar className="topIcon" />
          <h2>Features</h2>
          <p>
            Real-time image editing, filters, adjustments, resize, rotate, flip,
            cloud storage, and undo/redo functionality.
          </p>
        </div>

        {/* CARD 3 */}
        <div className="aboutCard">
          <FaLightbulb className="topIcon" />
          <h2>Technology</h2>
          <p>
            Built using React, Node.js, AWS S3, and DynamoDB for scalable
            and secure cloud-based image processing.
          </p>
        </div>

      </div>

    </div>
  );
}

export default About;