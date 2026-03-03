import { useNavigate } from 'react-router-dom';
import { Clock, Tag, ArrowUpRight } from 'lucide-react';

const CATEGORY_COLORS = {
  'Growth':     '#fbbf24',
  'SEO':        '#60a5fa',
  'Analytics':  '#4ade80',
  'Automation': '#f472b6',
  'Sales':      '#fb923c',
  'Marketing':  '#a78bfa',
};

export default function BlogCard({ post }) {
  const navigate = useNavigate();
  const accent = CATEGORY_COLORS[post.category] || '#fbbf24';

  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
      })
    : '';

  return (
    <article
      className="blog-card"
      onClick={() => navigate(`/blog/${post.slug}`)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/blog/${post.slug}`)}
    >
      <div className="blog-card-image">
        {post.cover_image_url ? (
          <img src={post.cover_image_url} alt={post.title} loading="lazy" />
        ) : (
          <div className="blog-card-placeholder">
            <span style={{ color: accent }}>{post.category || 'Blog'}</span>
          </div>
        )}
        <span className="blog-card-tag" style={{ color: accent, borderColor: `${accent}44` }}>
          <Tag size={10} /> {post.category || 'Growth'}
        </span>
      </div>

      <div className="blog-card-body">
        <h2 className="blog-card-title">{post.title}</h2>
        <p className="blog-card-excerpt">{post.meta_description}</p>

        <div className="blog-card-footer">
          <div className="blog-card-meta">
            <Clock size={12} />
            <span>{post.reading_time || 5} min read</span>
            {date && <span>· {date}</span>}
          </div>
          <span className="blog-card-cta" style={{ color: accent }}>
            Read <ArrowUpRight size={13} />
          </span>
        </div>
      </div>
    </article>
  );
}
