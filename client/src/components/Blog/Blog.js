import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Blog.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="page-shell">
      <section className="blog-hero">
        <h1>Skin health insights</h1>
        <p>
          Articles, tips and research notes to help you understand your skin
          and use DermaDetect more effectively.
        </p>
      </section>

      <div className="blog-list">
        {blogs.length === 0 && (
          <div className="blog-empty">
            <p>No blog posts yet. Check back soon for new skin‑care content.</p>
          </div>
        )}

        {blogs.map(blog => (
          <article key={blog._id} className="blog-card">
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
