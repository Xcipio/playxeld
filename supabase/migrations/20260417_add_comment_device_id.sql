alter table public.comments
  add column if not exists device_id text;

create index if not exists comments_post_slug_idx
  on public.comments (post_slug);

create index if not exists comments_device_id_idx
  on public.comments (device_id);
