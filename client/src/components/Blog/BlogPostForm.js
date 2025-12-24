import React, { useState } from 'react';
import axios from 'axios';
import './BlogPostForm.css';

const BlogPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/blogs',
        { title, content },
        { headers: { 'x-auth-token': localStorage.getItem('token') } }
      );
      console.log(res.data);
      setTitle('');
      setContent('');
      setError('');
      setSuccess('Blog post created successfully.');
    } catch (err) {
      console.error(err);
      setSuccess('');
      setError('Error creating blog post. Please try again.');
    }
  };

  return (
    <div className="page-shell">
      <div className="blog-form-card">
        <h1>Create blog post</h1>
        <p className="blog-form-subtitle">
          Share educational content, model updates, or skin‑care tips with your users.
        </p>

        {error && <div className="blog-form-alert error">{error}</div>}
        {success && <div className="blog-form-alert success">{success}</div>}

        <form onSubmit={onSubmit} className="blog-form">
          <div className="blog-form-group">
            <label htmlFor="blog-title">Title</label>
            <input
              id="blog-title"
              type="text"
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Post title"
              required
            />
          </div>

          <div className="blog-form-group">
            <label htmlFor="blog-content">Content</label>
            <textarea
              id="blog-content"
              name="content"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Write your article here..."
              required
            />
          </div>

          <button type="submit" className="btn primary full-width">
            Publish post
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogPostForm;
