import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import skinImg1 from '../../images/skin-care-1.png';
import skinImg2 from '../../images/skin-care-2.png';
import skinImg3 from '../../images/skin-care-3.png';

const Dashboard = () => {
  return (
    <div className="dash-shell">
      <section className="dash-header">
        <h1>Your skin health hub</h1>
        <p>
          Manage your profile, review past predictions and upload new images
          from one place.
        </p>
      </section>

      <section className="dash-grid">
        <Link to="/profile" className="dash-card">
          <h2>Profile</h2>
          <p>Update your details, contact information and avatar.</p>
        </Link>

        <Link to="/records" className="dash-card">
          <h2>Records</h2>
          <p>View and download your previous prediction reports.</p>
        </Link>

        <Link to="/predict" className="dash-card">
          <h2>Predict</h2>
          <p>Upload a new skin photo and generate a fresh prediction.</p>
        </Link>
      </section>

      <section className="dash-gallery">
        <div className="dash-gallery-item">
          <img src={skinImg1} alt="Healthy skin care" />
          <p>Capture clear photos in natural light for better predictions.</p>
        </div>
        <div className="dash-gallery-item">
          <img src={skinImg2} alt="Dermatology consultation" />
          <p>Use your reports to start informed conversations with doctors.</p>
        </div>
        <div className="dash-gallery-item">
          <img src={skinImg3} alt="Daily skin routine" />
          <p>Combine AI insights with a gentle daily skin routine.</p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
