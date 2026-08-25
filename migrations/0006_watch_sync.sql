-- Watch and phone workout sync

alter table swims add column if not exists source text not null default 'manual';
alter table swims add column if not exists source_key text;

create unique index if not exists swims_user_source_key_idx
  on swims (user_id, source, source_key)
  where source_key is not null;

create table if not exists watch_links (
  user_id text not null,
  source text not null,
  linked_at timestamptz not null default now(),
  last_import_at timestamptz,
  import_count integer not null default 0,
  primary key (user_id, source)
);
