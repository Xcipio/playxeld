alter table public.friend_articles
  add column if not exists author_homepage_url text,
  add column if not exists author_social_label text,
  add column if not exists author_social_url text;
