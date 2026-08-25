-- Tideline: global open-water swimming club

create table if not exists spots (
  id serial primary key,
  slug text unique not null,
  name text not null,
  city text not null,
  country text not null,
  region text not null,
  lat double precision not null,
  lng double precision not null,
  water_type text not null,
  difficulty text not null,
  typical_temp_c integer,
  typical_km double precision,
  hazards text not null default '',
  best_season text not null default '',
  description text not null
);

create table if not exists profiles (
  user_id text primary key,
  display_name text not null default 'Swimmer',
  home_water text,
  bio text,
  stroke text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists swims (
  id serial primary key,
  user_id text not null,
  spot_id integer not null references spots(id),
  swam_on date not null,
  distance_km double precision not null,
  duration_min integer,
  water_temp_c double precision,
  conditions text,
  feeling text,
  notes text,
  created_at timestamptz not null default now()
);
create index if not exists swims_user_id_idx on swims (user_id);
create index if not exists swims_spot_id_idx on swims (spot_id);
create index if not exists swims_created_at_idx on swims (created_at desc);

create table if not exists events (
  id serial primary key,
  spot_id integer not null references spots(id),
  title text not null,
  starts_at timestamptz not null,
  distance_km double precision,
  organizer text not null,
  notes text,
  created_at timestamptz not null default now()
);
create index if not exists events_starts_at_idx on events (starts_at);

create table if not exists rsvps (
  id serial primary key,
  user_id text not null,
  event_id integer not null references events(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, event_id)
);
create index if not exists rsvps_user_id_idx on rsvps (user_id);

create table if not exists saved_spots (
  user_id text not null,
  spot_id integer not null references spots(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, spot_id)
);

create table if not exists reports (
  id serial primary key,
  user_id text not null,
  spot_id integer not null references spots(id),
  water_temp_c double precision,
  visibility text,
  wildlife text,
  notes text not null,
  created_at timestamptz not null default now()
);
create index if not exists reports_spot_id_idx on reports (spot_id, created_at desc);

create table if not exists dispatches (
  id serial primary key,
  title text not null,
  body text not null,
  kind text not null,
  location_label text,
  spot_id integer references spots(id),
  published_at timestamptz not null default now()
);

insert into spots (slug, name, city, country, region, lat, lng, water_type, difficulty, typical_temp_c, typical_km, hazards, best_season, description)
values
  (
    'dover-channel',
    'English Channel',
    'Dover',
    'United Kingdom',
    'Europe',
    51.1279, 1.3134,
    'sea', 'extreme', 16, 33.0,
    'Shipping lanes, strong tides, cold water, fog',
    'Jul–Sep',
    'The defining marathon of open water. Thirty-three kilometres of shipping, tide and water that never quite warms. A crossing here is a life''s work, not a weekend.'
  ),
  (
    'alcatraz',
    'Alcatraz Crossing',
    'San Francisco',
    'United States',
    'Americas',
    37.8267, -122.4230,
    'ocean', 'challenging', 14, 2.3,
    'Currents, cold Pacific, fog, shipping',
    'Sep–Nov',
    'A short crossing with a long reputation. The Golden Gate pushes a river of cold Pacific through a two-kilometre slot, and the Rock sits right in it.'
  ),
  (
    'rottnest',
    'Rottnest Channel',
    'Perth',
    'Australia',
    'Asia-Pacific',
    -32.0069, 115.5400,
    'ocean', 'challenging', 20, 19.7,
    'Wind chop, jellyfish, sun',
    'Feb',
    'Nineteen kilometres of Indian Ocean between Cottesloe and a car-free island. On event day it becomes the largest open-water swim on earth.'
  ),
  (
    'catalina',
    'Catalina Channel',
    'Avalon',
    'United States',
    'Americas',
    33.3872, -118.4160,
    'ocean', 'extreme', 18, 32.3,
    'Night start, shipping, cold pockets, wildlife',
    'Jul–Oct',
    'A night launch off Avalon into the black Pacific, thirty-two kilometres to the mainland. One of the Oceans Seven, and a quieter twin to the Channel.'
  ),
  (
    'gibraltar',
    'Strait of Gibraltar',
    'Tarifa',
    'Spain',
    'Europe',
    36.0139, -5.6037,
    'sea', 'extreme', 18, 14.4,
    'Currents, shipping, wind',
    'Apr–Oct',
    'Europe to Africa in a single tide window. Fourteen kilometres on the chart, longer in the water, with tankers drawing a moving wall between the continents.'
  ),
  (
    'zurich',
    'Lake Zurich',
    'Zurich',
    'Switzerland',
    'Europe',
    47.3667, 8.5500,
    'lake', 'moderate', 20, 26.4,
    'Boat traffic, sudden weather',
    'Jun–Sep',
    'A long alpine lake with city swimming culture at one end and quiet coves at the other. The classic 26 km lengthwise swim is a European rite.'
  ),
  (
    'gordon',
    'Gordon Beach',
    'Tel Aviv',
    'Israel',
    'Middle East',
    32.0853, 34.7692,
    'sea', 'gentle', 24, 2.0,
    'Summer jellyfish, shore dump on windy days',
    'Apr–Jun, Oct–Dec',
    'A city beach with a serious dawn-swim culture. Lifeguarded water, a long sandy shelf, and a Mediterranean that turns silk-flat on still mornings.'
  ),
  (
    'eilat',
    'Coral Beach',
    'Eilat',
    'Israel',
    'Middle East',
    29.5030, 34.9180,
    'sea', 'gentle', 23, 1.5,
    'Reef, boat traffic, strong sun',
    'Year-round',
    'Red Sea salt and winter warmth. Swim over the coral shelf in water so clear the bottom looks close enough to stand on. Stay outside the reserve ropes.'
  ),
  (
    'caesarea',
    'Caesarea Coast',
    'Caesarea',
    'Israel',
    'Middle East',
    32.5010, 34.8920,
    'sea', 'moderate', 23, 3.0,
    'Rocks, archaeological ruins, shore break',
    'May–Nov',
    'Roman aqueduct on the sand, Herodian harbour stones in the water. A moody, historic stretch of the Israeli coast for swimmers who like texture under them.'
  ),
  (
    'kinneret',
    'Sea of Galilee',
    'Tiberias',
    'Israel',
    'Middle East',
    32.7950, 35.5420,
    'lake', 'gentle', 22, 4.0,
    'Boat traffic, winter wind',
    'Apr–Nov',
    'A freshwater basin below sea level, warm and mineral. Local pods train here year-round; the Kinneret crossing is a quiet Israeli classic.'
  ),
  (
    'hellespont',
    'Hellespont',
    'Çanakkale',
    'Turkey',
    'Europe',
    40.1450, 26.4060,
    'sea', 'challenging', 20, 6.0,
    'Current, shipping, shipping traffic',
    'Aug',
    'Leander swam it. Byron swam it. The Dardanelles still runs a hard east-west current between Asia and Europe, and the annual crossing keeps the myth in the water.'
  ),
  (
    'robben',
    'Robben Island Crossing',
    'Cape Town',
    'South Africa',
    'Africa',
    -33.8067, 18.3662,
    'ocean', 'challenging', 15, 7.5,
    'Cape Doctor wind, cold Atlantic, kelp, sharks (rare)',
    'Jan–Apr',
    'Seven and a half kilometres of Atlantic from a prison island to the mainland, with Table Mountain as the only landmark that stays put.'
  ),
  (
    'bondi',
    'Bondi to Bronte',
    'Sydney',
    'Australia',
    'Asia-Pacific',
    -33.8915, 151.2767,
    'ocean', 'moderate', 20, 5.0,
    'Shore dump, rocks, summer crowds',
    'Dec–Mar',
    'Five kilometres of headland-to-headland ocean along Sydney''s east. The classic ocean-race course, and a daily training ground when the swell allows.'
  ),
  (
    'waikiki',
    'Waikiki Shore',
    'Honolulu',
    'United States',
    'Asia-Pacific',
    21.2766, -157.8270,
    'ocean', 'gentle', 26, 2.0,
    'Boards, reef, sun',
    'Year-round',
    'Warm Pacific inside the reef, palmed and crowded and still worth the dawn. A gentle introduction to ocean swimming if you keep outside the surf lineup.'
  ),
  (
    'cook-strait',
    'Cook Strait',
    'Wellington',
    'New Zealand',
    'Asia-Pacific',
    -41.2500, 174.5000,
    'ocean', 'extreme', 14, 26.0,
    'Furious currents, cold, wind, shipping',
    'Feb–Apr',
    'A wild piece of water between the North and South Islands. Weather windows are brief, the current is honest, and finishers are few.'
  ),
  (
    'manhattan',
    'Manhattan Island',
    'New York',
    'United States',
    'Americas',
    40.7580, -73.9855,
    'river', 'extreme', 20, 45.9,
    'Current, traffic, water quality, timing',
    'Jul–Sep',
    'Circumnavigate the island with the tide as your engine. Forty-six kilometres of river, harbour and East River, and a city that barely notices you are there.'
  ),
  (
    'santorini',
    'Caldera Swim',
    'Fira',
    'Greece',
    'Europe',
    36.3932, 25.4615,
    'sea', 'moderate', 23, 5.0,
    'Cliff jump-offs, boat wake, sun',
    'Jun–Oct',
    'Aegean blue against volcanic cliff. The caldera swim is a postcard that still asks for respect: deep water, no beach, and a long way down from the town.'
  ),
  (
    'serpentine',
    'Serpentine Lido',
    'London',
    'United Kingdom',
    'Europe',
    51.5055, -0.1736,
    'lake', 'gentle', 18, 1.0,
    'Winter ice, summer crowds',
    'Year-round',
    'Hyde Park''s swimming lake, home of the oldest swimming club in the world. A gentle green-water loop, and a serious winter dip if you want one.'
  )
on conflict (slug) do nothing;

insert into events (spot_id, title, starts_at, distance_km, organizer, notes)
select s.id, e.title, e.starts_at::timestamptz, e.distance_km, e.organizer, e.notes
from (
  values
    ('gordon', 'Tel Aviv dawn pod', '2026-09-06 05:15:00+03', 2.0, 'Gordon regulars', 'Meet at the lifeguard tower. Silk-flat mornings only — we cancel on a dump.'),
    ('alcatraz', 'Escape from the Rock (training)', '2026-09-14 07:00:00-07', 2.3, 'South End Rowing Club', 'Club training crossing. Wetsuits optional, escort kayaks required.'),
    ('dover-channel', 'Channel weather window', '2026-10-03 04:00:00+01', 33.0, 'Channel Swimming Association', 'Neap-tide window. Pilots holding. This is an observed crossing, not a social swim.'),
    ('eilat', 'Red Sea coral loop', '2026-09-20 06:30:00+03', 1.5, 'Eilat Open Water', 'Stay seaward of the reserve ropes. Bring reef-safe sunscreen only.'),
    ('rottnest', 'Rottnest Channel Swim briefing', '2026-02-21 05:30:00+08', 19.7, 'Rottnest Channel Swim Association', 'Solo, duo and teams. Indian Ocean, Cottesloe to the island.'),
    ('zurich', 'Length of the lake', '2026-08-30 07:00:00+02', 26.4, 'Mythenquai Club', 'Zurich to Rapperswil. Feeding from escort. Water typically 20–22°C.'),
    ('bondi', 'Bondi to Bronte social', '2026-12-12 06:45:00+11', 5.0, 'Icebergs pod', 'Ocean swim along the cliffs. If the dump is up, we move to the baths.'),
    ('gibraltar', 'Tarifa to Africa attempt', '2026-10-18 08:00:00+02', 14.4, 'Strait Swimming', 'Tide-dependent. Passport for the Moroccan landing. Support boat mandatory.'),
    ('kinneret', 'Kinneret Saturday loop', '2026-09-12 07:00:00+03', 4.0, 'Tiberias swimmers', 'Freshwater, warm, no jellyfish. Meet at the promenade.'),
    ('santorini', 'Caldera crossing', '2026-09-27 08:00:00+03', 5.0, 'Aegean Open Water', 'Boat drop in the caldera, swim toward Oia. Deep water, no exit mid-course.')
) as e(slug, title, starts_at, distance_km, organizer, notes)
join spots s on s.slug = e.slug
where not exists (select 1 from events x where x.title = e.title);

insert into dispatches (title, body, kind, location_label, spot_id, published_at)
select d.title, d.body, d.kind, d.location_label, s.id, d.published_at::timestamptz
from (
  values
    (
      'Jellyfish thinning off Gordon',
      'The late-summer bloom is breaking up. Dawn pods report clear water and a 25°C skin temperature from the Hilton down to Banana Beach. Still wear a cap you can see.',
      'conditions',
      'Tel Aviv',
      'gordon',
      '2026-08-22 06:40:00+03'
    ),
    (
      'Channel neap window in October',
      'Pilots are holding a neap-tide window from 3–7 October. Water sitting at 16°C. If you have a crossing booked, start sleeping like a pilot: weather over ego.',
      'crossing',
      'Dover',
      'dover-channel',
      '2026-08-20 11:00:00+01'
    ),
    (
      'New Saturday pod on the Kinneret',
      'Tiberias swimmers are gathering at 07:00 every Saturday for a four-kilometre freshwater loop. No current, no jellyfish, coffee after. Beginners welcome on the inside line.',
      'gathering',
      'Tiberias',
      'kinneret',
      '2026-08-18 18:00:00+03'
    ),
    (
      'Cape Doctor easing for Robben attempts',
      'A quieter spell is forecast off Cape Town. Water 15°C, kelp thick near the island. If you are waiting on a window, this is the one to watch.',
      'conditions',
      'Cape Town',
      'robben',
      '2026-08-16 09:15:00+02'
    ),
    (
      'Santorini caldera going still',
      'Late-season Aegean is flattening. Tourist boats thin after 18:00 — the evening slot is the civilised one. Deep water, no beach exit, know your course.',
      'notice',
      'Santorini',
      'santorini',
      '2026-08-14 16:20:00+03'
    )
) as d(title, body, kind, location_label, slug, published_at)
join spots s on s.slug = d.slug
where not exists (select 1 from dispatches x where x.title = d.title);
