-- Place, user-created waters, and swim clubs

alter table spots add column if not exists created_by text;

alter table profiles add column if not exists country text;
alter table profiles add column if not exists locale text;
alter table profiles add column if not exists place_scope text;

create table if not exists clubs (
  id serial primary key,
  slug text unique not null,
  name text not null,
  country text not null,
  region text not null,
  spot_id integer references spots(id),
  description text not null default '',
  whatsapp_url text,
  admin_user_id text not null,
  created_at timestamptz not null default now()
);
create index if not exists clubs_country_idx on clubs (country);
create index if not exists clubs_region_idx on clubs (region);
create index if not exists clubs_admin_idx on clubs (admin_user_id);

create table if not exists club_members (
  club_id integer not null references clubs(id) on delete cascade,
  user_id text not null,
  joined_at timestamptz not null default now(),
  primary key (club_id, user_id)
);
create index if not exists club_members_user_idx on club_members (user_id);

-- Strip dashes from seeded copy
update spots set best_season = replace(replace(best_season, '–', ' to '), '-', ' to ')
  where best_season like '%–%' or best_season like '%-%';

update spots set description = 'The defining marathon of open water. Thirty three kilometres of shipping, tide and water that never quite warms. A crossing here is a life work, not a weekend.'
  where slug = 'dover-channel';
update spots set description = 'A short crossing with a long reputation. The Golden Gate pushes a river of cold Pacific through a two kilometre slot, and the Rock sits right in it.'
  where slug = 'alcatraz';
update spots set description = 'Nineteen kilometres of Indian Ocean between Cottesloe and an island without cars. On event day it becomes the largest open water swim on earth.'
  where slug = 'rottnest';
update spots set description = 'A night launch off Avalon into the black Pacific, thirty two kilometres to the mainland. One of the Oceans Seven, and a quieter twin to the Channel.'
  where slug = 'catalina';
update spots set description = 'A city beach with a serious dawn swim culture. Lifeguarded water, a long sandy shelf, and a Mediterranean that turns silk flat on still mornings.'
  where slug = 'gordon';
update spots set description = 'Red Sea salt and winter warmth. Swim over the coral shelf in water so clear the bottom looks close enough to stand on. Stay outside the reserve ropes.'
  where slug = 'eilat';
update spots set hazards = 'Summer jellyfish, shore dump on windy days'
  where slug = 'gordon';
update spots set hazards = 'Reef, boat traffic, strong sun'
  where slug = 'eilat';
update spots set description = 'Five kilometres of headland to headland ocean along Sydney east. The classic ocean race course, and a daily training ground when the swell allows.'
  where slug = 'bondi';
update spots set description = 'Seven and a half kilometres of Atlantic from a prison island to the mainland, with Table Mountain as the only landmark that stays put.'
  where slug = 'robben';
update spots set description = 'A wild piece of water between the North and South Islands. Weather windows are brief, the current is honest, and finishers are few.'
  where slug = 'cook-strait';
update spots set description = 'Hyde Park swimming lake, home of the oldest swimming club in the world. A gentle green water loop, and a serious winter dip if you want one.'
  where slug = 'serpentine';

update events set notes = 'Meet at the lifeguard tower. Silk flat mornings only. We cancel on a dump.'
  where title = 'Tel Aviv dawn pod';
update events set notes = 'Club training crossing. Wetsuits optional, escort kayaks required.'
  where title = 'Escape from the Rock (training)';
update events set notes = 'Neap tide window. Pilots holding. This is an observed crossing, not a social swim.'
  where title = 'Channel weather window';
update events set notes = 'Stay seaward of the reserve ropes. Bring sunscreen that is safe for reefs.'
  where title = 'Red Sea coral loop';
update events set notes = 'Ocean swim along the cliffs. If the dump is up, we move to the baths.'
  where title = 'Bondi to Bronte social';
update events set notes = 'Tide dependent. Passport for the Moroccan landing. Support boat mandatory.'
  where title = 'Tarifa to Africa attempt';
update events set notes = 'Boat drop in the caldera, swim toward Oia. Deep water, no exit in the middle of the course.'
  where title = 'Caldera crossing';

update dispatches set body = 'The late summer bloom is breaking up. Dawn pods report clear water and a 25°C skin temperature from the Hilton down to Banana Beach. Still wear a cap you can see.'
  where title = 'Jellyfish thinning off Gordon';
update dispatches set body = 'Pilots are holding a neap tide window from 3 to 7 October. Water sitting at 16°C. If you have a crossing booked, start sleeping like a pilot: weather over ego.'
  where title = 'Channel neap window in October';
update dispatches set title = 'New Saturday pod on the Kinneret',
  body = 'Tiberias swimmers are gathering at 07:00 every Saturday for a four kilometre freshwater loop. No current, no jellyfish, coffee after. Beginners welcome on the inside line.'
  where title = 'New Saturday pod on the Kinneret';
update dispatches set body = 'Late season Aegean is flattening. Tourist boats thin after 18:00. The evening slot is the civilised one. Deep water, no beach exit, know your course.'
  where title = 'Santorini caldera going still';

insert into spots (slug, name, city, country, region, lat, lng, water_type, difficulty, typical_temp_c, typical_km, hazards, best_season, description)
values
  (
    'herzliya',
    'Herzliya Beach',
    'Herzliya',
    'Israel',
    'Middle East',
    32.1640, 34.7960,
    'sea', 'gentle', 24, 2.0,
    'Jet ski lane, summer jellyfish',
    'Apr to Jun, Oct to Dec',
    'A long municipal beach north of Tel Aviv with a regular dawn pod and a wide sandy shelf. Easy entry, clear winter water, and a cafe line waiting when you get out.'
  ),
  (
    'dado',
    'Dado Beach',
    'Haifa',
    'Israel',
    'Middle East',
    32.7940, 34.9890,
    'sea', 'moderate', 23, 2.5,
    'Rocks at the edges, summer swell, jellyfish',
    'May to Nov',
    'Haifa open water. A wide bay with a breakwater, a serious local club, and Carmel as the backdrop. Better in the morning before the west wind stands up.'
  ),
  (
    'tel-baruch',
    'Tel Baruch',
    'Tel Aviv',
    'Israel',
    'Middle East',
    32.1220, 34.7870,
    'sea', 'gentle', 24, 1.5,
    'Summer jellyfish, occasional shore dump',
    'Apr to Jun, Oct to Dec',
    'The quieter sister of Gordon. A sandy shelf, a local weekday pod, and an easy out and back along the north Tel Aviv coast.'
  ),
  (
    'palmachim',
    'Palmachim Beach',
    'Palmachim',
    'Israel',
    'Middle East',
    31.9300, 34.7000,
    'sea', 'moderate', 24, 2.0,
    'Rocks, nature reserve rules, no lifeguard off season',
    'May to Nov',
    'A wilder stretch south of Rishon. National park dunes, clearer water than the city, and fewer people if you come early.'
  ),
  (
    'nahariya',
    'Nahariya Shore',
    'Nahariya',
    'Israel',
    'Middle East',
    33.0050, 35.0940,
    'sea', 'gentle', 23, 2.0,
    'Summer jellyfish, north swell',
    'May to Nov',
    'Northern Mediterranean, often a little cooler and clearer than Tel Aviv. A long promenade, a gentle shelf, and a small year round pod.'
  ),
  (
    'ashkelon',
    'Ashkelon Marina',
    'Ashkelon',
    'Israel',
    'Middle East',
    31.6790, 34.5560,
    'sea', 'moderate', 24, 2.0,
    'Marina traffic, rocks, jellyfish',
    'May to Nov',
    'Southern coast swimming from the marina wall. Often warmer, sometimes weedier, and a solid winter option when the north is blown out.'
  )
on conflict (slug) do nothing;

insert into events (spot_id, title, starts_at, distance_km, organizer, notes)
select s.id, e.title, e.starts_at::timestamptz, e.distance_km, e.organizer, e.notes
from (
  values
    ('herzliya', 'Herzliya sunrise loop', '2026-09-07 05:30:00+03', 2.0, 'Herzliya pod', 'Meet at the tower opposite the Accadia. Caps on. Coffee after.'),
    ('dado', 'Haifa Dado Saturday', '2026-09-13 06:45:00+03', 2.5, 'Carmel Open Water', 'Breakwater out and back. If the west wind is up we stay inside the wall.'),
    ('tel-baruch', 'Tel Baruch weekday dawn', '2026-09-10 05:20:00+03', 1.5, 'North TA swimmers', 'Quiet water, small group. New swimmers welcome on the inside line.')
) as e(slug, title, starts_at, distance_km, organizer, notes)
join spots s on s.slug = e.slug
where not exists (select 1 from events x where x.title = e.title);
