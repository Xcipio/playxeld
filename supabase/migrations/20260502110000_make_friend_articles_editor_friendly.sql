create or replace function public.set_friend_article_timestamps()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();

  if new.is_published = true and new.published_at is null then
    new.published_at = now();
  end if;

  return new;
end;
$$;

drop trigger if exists set_friend_article_timestamps_on_write on public.friend_articles;

create trigger set_friend_article_timestamps_on_write
before insert or update on public.friend_articles
for each row
execute function public.set_friend_article_timestamps();

update public.friend_articles
set
  published_at = coalesce(published_at, created_at, now()),
  updated_at = now()
where is_published = true
  and published_at is null;
