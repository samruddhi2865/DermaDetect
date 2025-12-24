import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="page-shell">
      <section className="hero-section">
        <h1>About DermaDetect</h1>
        <p>
          DermaDetect is a skin health companion that uses artificial
          intelligence to help you understand what your skin is telling you.
        </p>
      </section>

      <section className="about-grid">
        <div className="about-card">
          <h2>Our mission</h2>
          <p>
            Many people delay visiting a dermatologist because of distance,
            stigma, or uncertainty about their symptoms. DermaDetect was
            created to give everyone a private, instant first opinion on
            visible skin conditions.
          </p>
          <p>
            The goal is not to replace doctors, but to encourage earlier
            medical consultation and better daily skin‑care decisions.
          </p>
        </div>

        <div className="about-card">
          <h2>How it works</h2>
          <p>
            Using a deep learning model trained on dermatology images,
            DermaDetect analyses a photo of the affected area and suggests
            the most likely condition from a set of common skin diseases.
          </p>
          <p>
            Each prediction generates a secure record in your account so you
            can track changes over time and discuss them with your doctor.
          </p>
        </div>

        <div className="about-card">
          <h2>Why skin AI?</h2>
          <p>
            Skin is our largest organ and often the first place that health
            issues appear. Early pattern recognition by AI can highlight
            problems that might otherwise be ignored for months.
          </p>
          <p>
            By combining computer vision, medical literature and human‑centred
            design, DermaDetect aims to make proactive skin care accessible to
            everyone.
          </p>
        </div>

        <div className="about-card">
          <h2>Safety & responsibility</h2>
          <p>
            Predictions are informative, not diagnostic. They are meant to
            support conversations with qualified dermatologists, not replace
            them.
          </p>
          <p>
            Your images and prediction records are stored securely and are
            visible only to you when you are logged in.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
