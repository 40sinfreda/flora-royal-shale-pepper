-- Single owner lock for the Tideline office

create table if not exists app_owners (
  id integer primary key check (id = 1),
  user_id text not null unique,
  claimed_at timestamptz not null default now()
);
