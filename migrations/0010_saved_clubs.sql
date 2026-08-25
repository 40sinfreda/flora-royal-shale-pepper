create table if not exists saved_clubs (
  user_id text not null,
  club_id integer not null references clubs(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, club_id)
);
create index if not exists saved_clubs_user_idx on saved_clubs (user_id);
