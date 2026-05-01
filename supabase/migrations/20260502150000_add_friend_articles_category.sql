alter table public.friend_articles
  add column if not exists category text;

update public.friend_articles
set category = case
  when category in ('故事', '专题', '随笔') then category
  when tags @> array['故事']::text[] then '故事'
  when tags @> array['专题']::text[] then '专题'
  when tags @> array['随笔']::text[] then '随笔'
  when tags_text ilike '%故事%' then '故事'
  when tags_text ilike '%专题%' then '专题'
  when tags_text ilike '%随笔%' then '随笔'
  else '随笔'
end;

alter table public.friend_articles
  alter column category set default '随笔';

update public.friend_articles
set category = '随笔'
where category is null;

alter table public.friend_articles
  alter column category set not null;

alter table public.friend_articles
  drop constraint if exists friend_articles_category_check;

alter table public.friend_articles
  add constraint friend_articles_category_check
  check (category in ('故事', '专题', '随笔'));

create or replace function public.assign_friend_article_category()
returns trigger
language plpgsql
as $$
declare
  normalized_tags_text text;
begin
  normalized_tags_text := lower(coalesce(new.tags_text, array_to_string(new.tags, ', '), ''));

  if new.category not in ('故事', '专题', '随笔') then
    if new.tags @> array['故事']::text[] or normalized_tags_text like '%故事%' then
      new.category := '故事';
    elsif new.tags @> array['专题']::text[] or normalized_tags_text like '%专题%' then
      new.category := '专题';
    elsif new.tags @> array['随笔']::text[] or normalized_tags_text like '%随笔%' then
      new.category := '随笔';
    else
      new.category := '随笔';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists assign_friend_article_category_on_write on public.friend_articles;

create trigger assign_friend_article_category_on_write
before insert or update on public.friend_articles
for each row
execute function public.assign_friend_article_category();
