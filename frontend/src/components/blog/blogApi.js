/**
 * Ikshan Blog API
 * Primary: ikshan-growth backend (/growth/blog/*)
 * Fallback: static /blog-data/ JSON (local dev or backend down)
 */

const GROWTH_API = "/growth/blog";
const STATIC = "/blog-data";

export async function getAllPosts({ category = null } = {}) {
  try {
    const url = `${GROWTH_API}/posts${category ? `?category=${encodeURIComponent(category)}` : ""}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : (data.posts || []);
  } catch {
    const res = await fetch(`${STATIC}/index.json`);
    if (!res.ok) return [];
    let posts = await res.json();
    if (category) posts = posts.filter((p) => p.category === category);
    return posts;
  }
}

export async function getPostBySlug(slug) {
  try {
    const res = await fetch(`${GROWTH_API}/posts/${slug}`);
    if (!res.ok) throw new Error(`${res.status}`);
    return await res.json();
  } catch {
    const res = await fetch(`${STATIC}/${slug}.json`);
    if (!res.ok) return null;
    return await res.json();
  }
}

export async function getRelatedPosts(currentSlug, category) {
  const all = await getAllPosts({ category });
  return all.filter((p) => p.slug !== currentSlug).slice(0, 3);
}

export async function getPostsByCategory(category) {
  return getAllPosts({ category });
}
