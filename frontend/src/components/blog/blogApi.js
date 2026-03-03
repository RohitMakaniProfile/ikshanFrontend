/**
 * Ikshan Blog API
 * Reads blog posts from /public/blog-data/ (static JSON files)
 * No Supabase or backend needed — works fully offline/local
 */

const BASE = "/blog-data";

export async function getAllPosts({ category = null } = {}) {
  const res = await fetch(`${BASE}/index.json`);
  if (!res.ok) return [];
  let posts = await res.json();
  if (category) posts = posts.filter((p) => p.category === category);
  return posts;
}

export async function getPostBySlug(slug) {
  const res = await fetch(`${BASE}/${slug}.json`);
  if (!res.ok) return null;
  return await res.json();
}

export async function getRelatedPosts(currentSlug, category) {
  const all = await getAllPosts({ category });
  return all.filter((p) => p.slug !== currentSlug).slice(0, 3);
}

export async function getPostsByCategory(category) {
  return getAllPosts({ category });
}
