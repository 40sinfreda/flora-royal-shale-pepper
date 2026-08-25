export const SEA = {
  hero: "/sea/hero.jpg",
  swimmers: "/sea/swimmers.jpg",
  gordon: "/sea/gordon.jpg",
  surface: "/sea/surface.jpg",
  eilat: "/sea/eilat.jpg",
  channel: "/sea/channel.jpg",
  kinneret: "/sea/kinneret.jpg",
  haifa: "/sea/haifa.jpg",
  ocean: "/sea/ocean.jpg",
  login: "/sea/login.jpg",
  sunset: "/sea/sunset.jpg",
} as const;

const SLUG_PHOTO: Record<string, string> = {
  gordon: SEA.gordon,
  herzliya: SEA.gordon,
  "tel-baruch": SEA.gordon,
  palmachim: SEA.sunset,
  nahariya: SEA.hero,
  ashkelon: SEA.surface,
  dado: SEA.haifa,
  caesarea: SEA.haifa,
  eilat: SEA.eilat,
  kinneret: SEA.kinneret,
  "dover-channel": SEA.channel,
  serpentine: SEA.kinneret,
  zurich: SEA.kinneret,
  alcatraz: SEA.ocean,
  rottnest: SEA.ocean,
  catalina: SEA.ocean,
  bondi: SEA.ocean,
  waikiki: SEA.ocean,
  "cook-strait": SEA.ocean,
  robben: SEA.ocean,
  gibraltar: SEA.channel,
  manhattan: SEA.surface,
  hellespont: SEA.channel,
  santorini: SEA.eilat,
};

const WATER_PHOTO: Record<string, string> = {
  sea: SEA.hero,
  ocean: SEA.ocean,
  lake: SEA.kinneret,
  river: SEA.surface,
};

export function spotPhoto(slug: string, waterType: string): string {
  return SLUG_PHOTO[slug] ?? WATER_PHOTO[waterType] ?? SEA.hero;
}
