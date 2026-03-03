import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Loader2, Rss } from 'lucide-react';
import BlogCard from './BlogCard';
import { getAllPosts } from './blogApi';
import './Blog.css';

const CATEGORIES = ['All', 'Lead Generation', 'Sales & Retention', 'Business Strategy', 'Automation'];

export default function BlogPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAllPosts()
      .then((data) => { setPosts(data); setFiltered(data); })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = posts;
    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.meta_description?.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [activeCategory, search, posts]);

  // SEO — update document title
  useEffect(() => {
    document.title = 'Blog — Ikshan | Growth Insights for Small & Mid Companies';
  }, []);

  return (
    <div className="blog-page">
      {/* Header */}
      <header className="blog-header">
        <div className="blog-header-inner">
          <button className="blog-back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={16} /> Back to Ikshan
          </button>

          <div className="blog-hero">
            <div className="blog-hero-badge">
              <Rss size={14} /> Growth Intelligence
            </div>
            <h1 className="blog-hero-title">
              Insights for <span className="gradient-text">Growing Businesses</span>
            </h1>
            <p className="blog-hero-subtitle">
              Actionable strategies on SEO, analytics, sales automation, and growth —
              written for small and mid-sized companies.
            </p>
          </div>

          {/* Search */}
          <div className="blog-search-wrap">
            <Search size={16} className="blog-search-icon" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="blog-search-input"
            />
          </div>

          {/* Category filters */}
          <div className="blog-categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`blog-cat-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="blog-main">
        {loading && (
          <div className="blog-loading">
            <Loader2 size={32} className="spin" />
            <p>Loading articles...</p>
          </div>
        )}

        {error && (
          <div className="blog-error">
            <p>Could not load posts. Please try again.</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="blog-empty">
            <p>No articles found{search ? ` for "${search}"` : ''}.</p>
            {search && (
              <button onClick={() => setSearch('')} className="blog-clear-btn">
                Clear search
              </button>
            )}
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="blog-grid">
            {filtered.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
