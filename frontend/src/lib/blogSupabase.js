import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dggwfqciitreparftp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnZ3dmcWNpaWl0cmVwZGFyZnRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzODE5ODYsImV4cCI6MjA4Nzk1Nzk4Nn0.zHxH6O_7l0Axo4A1Eb_R0INPz1Con6EYZGk1Q7TrlRo';

export const blogSupabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================
// BLOG POST FUNCTIONS
// ============================================

export const getAllPosts = async () => {
  const { data, error } = await blogSupabase
    .from('posts')
    .select('id, title, slug, meta_description, focus_keyword, category, reading_time, published_at, cover_image_url')
    .eq('status', 'published')
    .order('published_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getPostBySlug = async (slug) => {
  const { data, error } = await blogSupabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();
  if (error) throw error;
  return data;
};

export const getRelatedPosts = async (category, currentSlug) => {
  const { data, error } = await blogSupabase
    .from('posts')
    .select('id, title, slug, meta_description, category, reading_time, published_at, cover_image_url')
    .eq('status', 'published')
    .eq('category', category)
    .neq('slug', currentSlug)
    .limit(3);
  if (error) throw error;
  return data;
};
