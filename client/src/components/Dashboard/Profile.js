import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentProfile,
  updateProfile
} from '../../actions/profileActions';
import './Profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector(state => state.profile);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    healthIssues: '',
    avatar: ''
  });

  const [file, setFile] = useState(null);

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        contact: profile.contact || '',
        healthIssues: profile.healthIssues
          ? profile.healthIssues.join(', ')
          : '',
        avatar: profile.avatar || ''
      });
    }
  }, [profile]);

  const { name, email, contact, healthIssues, avatar } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onFileChange = e => setFile(e.target.files[0]);

  const onSubmit = e => {
    e.preventDefault();
    const updateData = new FormData();
    updateData.append('name', name);
    updateData.append('email', email);
    if (contact) updateData.append('contact', contact);
    if (healthIssues) {
      updateData.append(
        'healthIssues',
        JSON.stringify(
          healthIssues.split(',').map(issue => issue.trim()).filter(Boolean)
        )
      );
    }
    if (file) updateData.append('avatar', file);

    dispatch(updateProfile(updateData));
  };

  if (loading && !profile) {
    return <div className="profile-shell">Loading...</div>;
  }

  return (
    <div className="profile-shell">
      <div className="profile-card">
        <div className="profile-header">
          <h1>Your profile</h1>
          <p>
            Keep your details up to date so your reports and notifications stay
            accurate.
          </p>
        </div>

        <div className="profile-body">
          <div className="profile-avatar-block">
            <div className="avatar-ring">
              <img
                src={avatar || '/default-avatar.png'}
                alt="Avatar"
                className="avatar-img"
              />
            </div>
            <p className="avatar-hint">
              Upload a clear face or icon image. This is only visible to you in
              your account.
            </p>
          </div>

          <form onSubmit={onSubmit} className="profile-form">
            <div className="pf-group">
              <label htmlFor="pf-name">Name</label>
              <input
                id="pf-name"
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                required
              />
            </div>

            <div className="pf-group">
              <label htmlFor="pf-email">Email</label>
              <input
                id="pf-email"
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </div>

            <div className="pf-group">
              <label htmlFor="pf-contact">Contact</label>
              <input
                id="pf-contact"
                type="text"
                name="contact"
                value={contact}
                onChange={onChange}
                placeholder="Optional phone or alternate email"
              />
            </div>

            <div className="pf-group">
              <label htmlFor="pf-health">
                Health issues (comma‑separated)
              </label>
              <input
                id="pf-health"
                type="text"
                name="healthIssues"
                value={healthIssues}
                onChange={onChange}
                placeholder="e.g. eczema, allergies"
              />
            </div>

            <div className="pf-group">
              <label htmlFor="pf-avatar">Avatar</label>
              <input id="pf-avatar" type="file" onChange={onFileChange} />
            </div>

            <button type="submit" className="btn primary full-width">
              Update profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
