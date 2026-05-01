alter table public.friend_articles
  add column if not exists tags_text text;

create or replace function public.sync_friend_article_tags()
returns trigger
language plpgsql
as $$
declare
  normalized_tags text[];
begin
  if new.tags_text is not null and btrim(new.tags_text) <> '' then
    select coalesce(
      array_agg(distinct cleaned_tag order by cleaned_tag),
      '{}'::text[]
    )
    into normalized_tags
    from (
      select nullif(
        btrim(
          regexp_replace(tag_piece, '\s+', ' ', 'g')
        ),
        ''
      ) as cleaned_tag
      from unnest(
        regexp_split_to_array(
          replace(replace(new.tags_text, '，', ','), '、', ','),
          '\s*,\s*'
        )
      ) as tag_piece
    ) prepared
    where cleaned_tag is not null;

    new.tags := coalesce(normalized_tags, '{}'::text[]);
  elsif new.tags is not null then
    new.tags_text := array_to_string(new.tags, ', ');
  else
    new.tags := '{}'::text[];
    new.tags_text := null;
  end if;

  return new;
end;
$$;

drop trigger if exists sync_friend_article_tags_on_write on public.friend_articles;

create trigger sync_friend_article_tags_on_write
before insert or update on public.friend_articles
for each row
execute function public.sync_friend_article_tags();

update public.friend_articles
set tags_text = case
  when tags is null or array_length(tags, 1) is null then null
  else array_to_string(tags, ', ')
end;
