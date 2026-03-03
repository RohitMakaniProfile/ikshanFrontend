import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Clock, Tag, Calendar, Share2, BookOpen } from 'lucide-react';
import BlogCard from './BlogCard';
import { getPostBySlug, getRelatedPosts } from './blogApi';
import './Blog.css';

const CATEGORY_COLORS = {
  'Growth': '#fbbf24', 'SEO': '#60a5fa', 'Analytics': '#4ade80',
  'Automation': '#f472b6', 'Sales': '#fb923c', 'Marketing': '#a78bfa',
};

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getPostBySlug(slug)
      .then(async (data) => {
        setPost(data);
        // update SEO meta
        document.title = `${data.title} — Ikshan Blog`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', data.meta_description || '');
        // fetch related
        const rel = await getRelatedPosts(data.category, slug).catch(() => []);
        setRelated(rel);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const accent = CATEGORY_COLORS[post?.category] || '#fbbf24';

  const date = post?.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
      })
    : '';

  if (loading) {
    return (
      <div className="blog-post-loading">
        <div className="blog-post-skeleton-header" />
        <div className="blog-post-skeleton-body" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-page">
        <div className="blog-error" style={{ marginTop: '4rem' }}>
          <p>Article not found.</p>
          <button onClick={() => navigate('/blog')} className="blog-clear-btn">
            ← Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      {/* Back nav */}
      <div className="blog-post-nav">
        <button className="blog-back-btn" onClick={() => navigate('/blog')}>
          <ArrowLeft size={16} /> All Articles
        </button>
        <button className="blog-share-btn" onClick={handleShare}>
          <Share2 size={15} /> Share
        </button>
      </div>

      {/* Cover image */}
      {post.cover_image_url && (
        <div className="blog-post-cover">
          <img src={post.cover_image_url} alt={post.title} />
        </div>
      )}

      {/* Article header */}
      <header className="blog-post-header">
        <span className="blog-card-tag" style={{ color: accent, borderColor: `${accent}44` }}>
          <Tag size={11} /> {post.category}
        </span>
        <h1 className="blog-post-title">{post.title}</h1>
        <p className="blog-post-excerpt">{post.meta_description}</p>

        <div className="blog-post-meta">
          <span><Calendar size={13} /> {date}</span>
          <span><Clock size={13} /> {post.reading_time || 5} min read</span>
          <span><BookOpen size={13} /> Ikshan Research</span>
        </div>
      </header>

      {/* Article content */}
      <article className="blog-post-content">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>

      {/* CTA box */}
      <div className="blog-post-cta">
        <h3>Want a full growth analysis for your business?</h3>
        <p>Ikshan identifies the root cause of your growth leaks — in minutes, not months.</p>
        <button onClick={() => navigate('/')} className="blog-post-cta-btn">
          Try Ikshan Free →
        </button>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="blog-related">
          <h2 className="blog-related-title">More in {post.category}</h2>
          <div className="blog-grid blog-grid-3">
            {related.map((r) => <BlogCard key={r.id} post={r} />)}
          </div>
        </section>
      )}
    </div>
  );
}
