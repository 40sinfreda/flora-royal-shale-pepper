-- Seed swim groups and a pull log for watch imports

create table if not exists sync_events (
  id serial primary key,
  user_id text not null,
  source text not null,
  title text not null default '',
  status text not null,
  swim_id integer,
  created_at timestamptz not null default now()
);
create index if not exists sync_events_user_idx on sync_events (user_id, created_at desc);

insert into clubs (slug, name, country, region, spot_id, description, admin_user_id)
select
  'gordon-dawn-crew',
  'קבוצת שחר גורדון',
  'Israel',
  'Middle East',
  s.id,
  'שחיית שחר בגורדון. נפגשים במגדל המציל, כובע על הראש, קפה אחרי. כל אחד יכול להצטרף.',
  'tideline'
from spots s
where s.slug = 'gordon'
  and not exists (select 1 from clubs c where c.slug = 'gordon-dawn-crew');

insert into clubs (slug, name, country, region, spot_id, description, admin_user_id)
select
  'kinneret-saturday-crew',
  'קבוצת שבת כנרת',
  'Israel',
  'Middle East',
  s.id,
  'לולאת שבת בטבריה. מים מתוקים, בלי מדוזות, מתחילים מוזמנים בקו הפנימי.',
  'tideline'
from spots s
where s.slug = 'kinneret'
  and not exists (select 1 from clubs c where c.slug = 'kinneret-saturday-crew');

insert into clubs (slug, name, country, region, spot_id, description, admin_user_id)
select
  'dado-saturday-crew',
  'קבוצת דדו חיפה',
  'Israel',
  'Middle East',
  s.id,
  'שבת בחיפה. הלוך ושוב לשובר הגלים. אם הרוח המערבית קמה, נשארים בתוך החומה.',
  'tideline'
from spots s
where s.slug = 'dado'
  and not exists (select 1 from clubs c where c.slug = 'dado-saturday-crew');

insert into club_members (club_id, user_id)
select c.id, 'tideline'
from clubs c
where c.admin_user_id = 'tideline'
on conflict (club_id, user_id) do nothing;

update events set title = 'Tel Aviv dawn crew' where title = 'Tel Aviv dawn pod';
update dispatches set title = 'New Saturday crew on the Kinneret'
  where title = 'New Saturday pod on the Kinneret';
