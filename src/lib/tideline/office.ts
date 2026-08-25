import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";
import { COUNTRIES, isWhatsappUrl, slugify } from "./place";
import type { ClubMember, Gathering, Profile, Report, Spot, Swim } from "./types";

function num(v: unknown): number {
  if (typeof v === "number") return v;
  if (typeof v === "string" && v !== "") return Number(v);
  return 0;
}

function numOrNull(v: unknown): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = num(v);
  return Number.isFinite(n) ? n : null;
}

function iso(v: unknown): string {
  if (v instanceof Date) return v.toISOString();
  if (typeof v === "string") return v;
  return "";
}

function isPool(text: string) {
  const lowered = text.toLowerCase();
  return /\bpool\b/.test(lowered) || lowered.includes("בריכה") || lowered.includes("בריכת");
}

async function requireOwner(userId: string) {
  const sql = await getSql();
  const rows = await sql<{ user_id: string }>`
    select user_id from app_owners where id = 1 limit 1
  `;
  if (!rows[0] || rows[0].user_id !== userId) {
    throw new Error("Forbidden");
  }
  return sql;
}

export type OfficeAccess = {
  status: "open" | "owner" | "locked";
};

export const getOfficeAccess = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<OfficeAccess> => {
    const sql = await getSql();
    const rows = await sql<{ user_id: string }>`
      select user_id from app_owners where id = 1 limit 1
    `;
    if (!rows[0]) return { status: "open" };
    if (rows[0].user_id === context.userId) return { status: "owner" };
    return { status: "locked" };
  });

export const claimOffice = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<OfficeAccess> => {
    const sql = await getSql();
    await sql`
      insert into profiles (user_id, display_name)
      values (${context.userId}, 'Owner')
      on conflict (user_id) do nothing
    `;
    await sql`
      insert into app_owners (id, user_id)
      values (1, ${context.userId})
      on conflict (id) do nothing
    `;
    const rows = await sql<{ user_id: string }>`
      select user_id from app_owners where id = 1 limit 1
    `;
    if (rows[0]?.user_id === context.userId) return { status: "owner" };
    return { status: "locked" };
  });

export type OfficeStats = {
  spots: number;
  groups: number;
  gatherings: number;
  stories: number;
  reports: number;
  swims: number;
  people: number;
};

export const officeStats = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await requireOwner(context.userId);
    const rows = await sql<{
      spots: unknown;
      groups: unknown;
      gatherings: unknown;
      stories: unknown;
      reports: unknown;
      swims: unknown;
      people: unknown;
    }>`
      select
        (select count(*)::int from spots) as spots,
        (select count(*)::int from clubs) as groups,
        (select count(*)::int from events) as gatherings,
        (select count(*)::int from dispatches) as stories,
        (select count(*)::int from reports) as reports,
        (select count(*)::int from swims) as swims,
        (select count(*)::int from profiles) as people
    `;
    const row = rows[0];
    const stats: OfficeStats = {
      spots: num(row?.spots),
      groups: num(row?.groups),
      gatherings: num(row?.gatherings),
      stories: num(row?.stories),
      reports: num(row?.reports),
      swims: num(row?.swims),
      people: num(row?.people),
    };
    return stats;
  });

type SpotRow = {
  id: number;
  slug: string;
  name: string;
  city: string;
  country: string;
  region: string;
  lat: unknown;
  lng: unknown;
  water_type: string;
  difficulty: string;
  typical_temp_c: number | null;
  typical_km: unknown;
  hazards: string;
  best_season: string;
  description: string;
  swim_count: unknown;
  created_by: string | null;
};

function mapSpot(row: SpotRow): Spot {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    city: row.city,
    country: row.country,
    region: row.region,
    lat: num(row.lat),
    lng: num(row.lng),
    waterType: row.water_type,
    difficulty: row.difficulty,
    typicalTempC: row.typical_temp_c,
    typicalKm: numOrNull(row.typical_km),
    hazards: row.hazards,
    bestSeason: row.best_season,
    description: row.description,
    swimCount: num(row.swim_count),
    createdBy: row.created_by,
  };
}

export const officeListSpots = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await requireOwner(context.userId);
    const rows = await sql<SpotRow>`
      select
        s.id, s.slug, s.name, s.city, s.country, s.region, s.lat, s.lng,
        s.water_type, s.difficulty, s.typical_temp_c, s.typical_km,
        s.hazards, s.best_season, s.description, s.created_by,
        (select count(*)::int from swims w where w.spot_id = s.id) as swim_count
      from spots s
      order by s.country asc, s.name asc
    `;
    return rows.map(mapSpot);
  });

const spotWriteSchema = z.object({
  name: z.string().trim().min(2).max(80),
  city: z.string().trim().min(1).max(80),
  country: z.string().trim().min(1).max(80),
  waterType: z.enum(["sea", "ocean", "lake", "river"]),
  difficulty: z.enum(["gentle", "moderate", "challenging", "extreme"]),
  typicalKm: z.number().positive().max(200).nullable(),
  typicalTempC: z.number().min(-2).max(40).nullable(),
  bestSeason: z.string().trim().max(80),
  hazards: z.string().trim().max(200),
  description: z.string().trim().min(8).max(800),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

export const officeCreateSpot = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => spotWriteSchema.parse(input))
  .handler(async ({ context, data }) => {
    const sql = await requireOwner(context.userId);
    if (isPool(`${data.name} ${data.description}`)) {
      throw new Error("Pools are not open water");
    }
    const region = COUNTRIES.find((c) => c.name === data.country)?.region ?? "Europe";
    let slug = slugify(data.name);
    for (let i = 0; i < 8; i++) {
      const existing = await sql<{ slug: string }>`
        select slug from spots where slug = ${slug} limit 1
      `;
      if (!existing[0]) break;
      slug = `${slugify(data.name)}-${i + 2}`;
    }
    const rows = await sql<{ id: number; slug: string }>`
      insert into spots (
        slug, name, city, country, region, lat, lng, water_type, difficulty,
        typical_temp_c, typical_km, hazards, best_season, description, created_by
      ) values (
        ${slug}, ${data.name}, ${data.city}, ${data.country}, ${region},
        ${data.lat}, ${data.lng}, ${data.waterType}, ${data.difficulty},
        ${data.typicalTempC}, ${data.typicalKm}, ${data.hazards},
        ${data.bestSeason}, ${data.description}, ${context.userId}
      )
      returning id, slug
    `;
    return { id: rows[0]?.id, slug: rows[0]?.slug ?? slug };
  });

const spotUpdateSchema = spotWriteSchema.extend({
  id: z.number().int().positive(),
});

export const officeUpdateSpot = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => spotUpdateSchema.parse(input))
  .handler(async ({ context, data }) => {
    const sql = await requireOwner(context.userId);
    if (isPool(`${data.name} ${data.description}`)) {
      throw new Error("Pools are not open water");
    }
    const region = COUNTRIES.find((c) => c.name === data.country)?.region ?? "Europe";
    const rows = await sql<{ id: number }>`
      update spots set
        name = ${data.name},
        city = ${data.city},
        country = ${data.country},
        region = ${region},
        lat = ${data.lat},
        lng = ${data.lng},
        water_type = ${data.waterType},
        difficulty = ${data.difficulty},
        typical_temp_c = ${data.typicalTempC},
        typical_km = ${data.typicalKm},
        hazards = ${data.hazards},
        best_season = ${data.bestSeason},
        description = ${data.description}
      where id = ${data.id}
      returning id
    `;
    if (!rows[0]) throw new Error("Not found");
    return { ok: true };
  });

export const officeDeleteSpot = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => z.number().int().positive().parse(id))
  .handler(async ({ context, data: id }) => {
    const sql = await requireOwner(context.userId);
    await sql`update clubs set spot_id = null where spot_id = ${id}`;
    await sql`update dispatches set spot_id = null where spot_id = ${id}`;
    await sql`delete from reports where spot_id = ${id}`;
    await sql`delete from rsvps where event_id in (select id from events where spot_id = ${id})`;
    await sql`delete from events where spot_id = ${id}`;
    await sql`delete from swims where spot_id = ${id}`;
    await sql`delete from saved_spots where spot_id = ${id}`;
    const rows = await sql<{ id: number }>`
      delete from spots where id = ${id} returning id
    `;
    if (!rows[0]) throw new Error("Not found");
    return { ok: true };
  });

export type OfficeClub = {
  id: number;
  slug: string;
  name: string;
  country: string;
  region: string;
  spotId: number | null;
  spotName: string | null;
  description: string;
  whatsappUrl: string | null;
  adminUserId: string;
  adminName: string;
  memberCount: number;
};

export const officeListClubs = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await requireOwner(context.userId);
    const rows = await sql<{
      id: number;
      slug: string;
      name: string;
      country: string;
      region: string;
      spot_id: number | null;
      spot_name: string | null;
      description: string;
      whatsapp_url: string | null;
      admin_user_id: string;
      admin_name: string | null;
      member_count: unknown;
    }>`
      select
        c.id, c.slug, c.name, c.country, c.region, c.spot_id,
        s.name as spot_name, c.description, c.whatsapp_url,
        c.admin_user_id, p.display_name as admin_name,
        (select count(*)::int from club_members m where m.club_id = c.id) as member_count
      from clubs c
      left join spots s on s.id = c.spot_id
      left join profiles p on p.user_id = c.admin_user_id
      order by c.name asc
    `;
    return rows.map(
      (row): OfficeClub => ({
        id: row.id,
        slug: row.slug,
        name: row.name,
        country: row.country,
        region: row.region,
        spotId: row.spot_id,
        spotName: row.spot_name,
        description: row.description,
        whatsappUrl: row.whatsapp_url,
        adminUserId: row.admin_user_id,
        adminName: row.admin_name?.trim() || "Swimmer",
        memberCount: num(row.member_count),
      }),
    );
  });

const clubWriteSchema = z.object({
  name: z.string().trim().min(2).max(80),
  description: z.string().trim().max(400),
  country: z.string().trim().min(1).max(80),
  spotId: z.number().int().positive().nullable(),
  whatsappUrl: z.string().trim().max(300),
});

export const officeCreateClub = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => clubWriteSchema.parse(input))
  .handler(async ({ context, data }) => {
    const sql = await requireOwner(context.userId);
    if (data.whatsappUrl && !isWhatsappUrl(data.whatsappUrl)) {
      throw new Error("Invalid WhatsApp link");
    }
    const region = COUNTRIES.find((c) => c.name === data.country)?.region ?? "Europe";
    let slug = slugify(data.name);
    for (let i = 0; i < 8; i++) {
      const existing = await sql<{ slug: string }>`
        select slug from clubs where slug = ${slug} limit 1
      `;
      if (!existing[0]) break;
      slug = `${slugify(data.name)}-${i + 2}`;
    }
    const rows = await sql<{ id: number; slug: string }>`
      insert into clubs (
        slug, name, country, region, spot_id, description, whatsapp_url, admin_user_id
      ) values (
        ${slug}, ${data.name}, ${data.country}, ${region},
        ${data.spotId}, ${data.description},
        ${data.whatsappUrl || null}, ${context.userId}
      )
      returning id, slug
    `;
    const id = rows[0]?.id;
    if (id) {
      await sql`
        insert into club_members (club_id, user_id)
        values (${id}, ${context.userId})
        on conflict (club_id, user_id) do nothing
      `;
    }
    return { id, slug: rows[0]?.slug ?? slug };
  });

const clubUpdateSchema = clubWriteSchema.extend({
  id: z.number().int().positive(),
});

export const officeUpdateClub = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => clubUpdateSchema.parse(input))
  .handler(async ({ context, data }) => {
    const sql = await requireOwner(context.userId);
    if (data.whatsappUrl && !isWhatsappUrl(data.whatsappUrl)) {
      throw new Error("Invalid WhatsApp link");
    }
    const region = COUNTRIES.find((c) => c.name === data.country)?.region ?? "Europe";
    const rows = await sql<{ id: number }>`
      update clubs set
        name = ${data.name},
        description = ${data.description},
        country = ${data.country},
        region = ${region},
        spot_id = ${data.spotId},
        whatsapp_url = ${data.whatsappUrl || null}
      where id = ${data.id}
      returning id
    `;
    if (!rows[0]) throw new Error("Not found");
    return { ok: true };
  });

export const officeDeleteClub = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => z.number().int().positive().parse(id))
  .handler(async ({ context, data: id }) => {
    const sql = await requireOwner(context.userId);
    await sql`delete from saved_clubs where club_id = ${id}`;
    const rows = await sql<{ id: number }>`
      delete from clubs where id = ${id} returning id
    `;
    if (!rows[0]) throw new Error("Not found");
    return { ok: true };
  });

export const officeListClubMembers = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((clubId: number) => z.number().int().positive().parse(clubId))
  .handler(async ({ context, data: clubId }) => {
    const sql = await requireOwner(context.userId);
    const club = await sql<{ admin_user_id: string }>`
      select admin_user_id from clubs where id = ${clubId} limit 1
    `;
    if (!club[0]) throw new Error("Not found");
    const rows = await sql<{
      user_id: string;
      display_name: string | null;
      joined_at: unknown;
    }>`
      select m.user_id, p.display_name, m.joined_at
      from club_members m
      left join profiles p on p.user_id = m.user_id
      where m.club_id = ${clubId}
      order by m.joined_at asc
    `;
    return rows.map(
      (row): ClubMember => ({
        userId: row.user_id,
        displayName: row.display_name?.trim() || "Swimmer",
        joinedAt: iso(row.joined_at),
        isAdmin: row.user_id === club[0].admin_user_id,
      }),
    );
  });

export const officeRemoveClubMember = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) =>
    z.object({
      clubId: z.number().int().positive(),
      userId: z.string().min(1),
    }).parse(input),
  )
  .handler(async ({ context, data }) => {
    const sql = await requireOwner(context.userId);
    const club = await sql<{ admin_user_id: string }>`
      select admin_user_id from clubs where id = ${data.clubId} limit 1
    `;
    if (!club[0]) throw new Error("Not found");
    if (club[0].admin_user_id === data.userId) {
      throw new Error("Cannot remove the manager");
    }
    await sql`
      delete from club_members
      where club_id = ${data.clubId} and user_id = ${data.userId}
    `;
    return { ok: true };
  });

export const officeListGatherings = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await requireOwner(context.userId);
    const rows = await sql<{
      id: number;
      spot_id: number;
      spot_name: string;
      spot_slug: string;
      city: string;
      country: string;
      title: string;
      starts_at: unknown;
      distance_km: unknown;
      organizer: string;
      notes: string | null;
      rsvp_count: unknown;
    }>`
      select
        e.id, e.spot_id, s.name as spot_name, s.slug as spot_slug,
        s.city, s.country, e.title, e.starts_at, e.distance_km,
        e.organizer, e.notes,
        (select count(*)::int from rsvps r where r.event_id = e.id) as rsvp_count
      from events e
      join spots s on s.id = e.spot_id
      order by e.starts_at desc
    `;
    return rows.map(
      (row): Gathering => ({
        id: row.id,
        spotId: row.spot_id,
        spotName: row.spot_name,
        spotSlug: row.spot_slug,
        city: row.city,
        country: row.country,
        title: row.title,
        startsAt: iso(row.starts_at),
        distanceKm: numOrNull(row.distance_km),
        organizer: row.organizer,
        notes: row.notes,
        rsvpCount: num(row.rsvp_count),
        going: false,
      }),
    );
  });

const gatheringWriteSchema = z.object({
  spotId: z.number().int().positive(),
  title: z.string().trim().min(2).max(120),
  startsAt: z.string().min(8),
  distanceKm: z.number().positive().max(200).nullable(),
  organizer: z.string().trim().min(1).max(80),
  notes: z.string().trim().max(400),
});

export const officeCreateGathering = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => gatheringWriteSchema.parse(input))
  .handler(async ({ context, data }) => {
    const sql = await requireOwner(context.userId);
    const starts = new Date(data.startsAt);
    if (Number.isNaN(starts.getTime())) throw new Error("Invalid time");
    const rows = await sql<{ id: number }>`
      insert into events (spot_id, title, starts_at, distance_km, organizer, notes)
      values (
        ${data.spotId}, ${data.title}, ${starts.toISOString()},
        ${data.distanceKm}, ${data.organizer}, ${data.notes || null}
      )
      returning id
    `;
    return { id: rows[0]?.id };
  });

const gatheringUpdateSchema = gatheringWriteSchema.extend({
  id: z.number().int().positive(),
});

export const officeUpdateGathering = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => gatheringUpdateSchema.parse(input))
  .handler(async ({ context, data }) => {
    const sql = await requireOwner(context.userId);
    const starts = new Date(data.startsAt);
    if (Number.isNaN(starts.getTime())) throw new Error("Invalid time");
    const rows = await sql<{ id: number }>`
      update events set
        spot_id = ${data.spotId},
        title = ${data.title},
        starts_at = ${starts.toISOString()},
        distance_km = ${data.distanceKm},
        organizer = ${data.organizer},
        notes = ${data.notes || null}
      where id = ${data.id}
      returning id
    `;
    if (!rows[0]) throw new Error("Not found");
    return { ok: true };
  });

export const officeDeleteGathering = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => z.number().int().positive().parse(id))
  .handler(async ({ context, data: id }) => {
    const sql = await requireOwner(context.userId);
    await sql`delete from rsvps where event_id = ${id}`;
    const rows = await sql<{ id: number }>`
      delete from events where id = ${id} returning id
    `;
    if (!rows[0]) throw new Error("Not found");
    return { ok: true };
  });

export const officeListStories = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await requireOwner(context.userId);
    const rows = await sql<{
      id: number;
      title: string;
      body: string;
      kind: string;
      location_label: string | null;
      spot_id: number | null;
      spot_slug: string | null;
      spot_name: string | null;
      published_at: unknown;
    }>`
      select
        d.id, d.title, d.body, d.kind, d.location_label, d.spot_id,
        s.slug as spot_slug, s.name as spot_name, d.published_at
      from dispatches d
      left join spots s on s.id = d.spot_id
      order by d.published_at desc
    `;
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      body: row.body,
      kind: row.kind,
      locationLabel: row.location_label,
      spotId: row.spot_id,
      spotSlug: row.spot_slug,
      spotName: row.spot_name,
      publishedAt: iso(row.published_at),
    }));
  });

const storyWriteSchema = z.object({
  title: z.string().trim().min(2).max(120),
  body: z.string().trim().min(8).max(800),
  kind: z.enum(["conditions", "crossing", "gathering", "notice"]),
  locationLabel: z.string().trim().max(80),
  spotId: z.number().int().positive().nullable(),
});

export const officeCreateStory = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => storyWriteSchema.parse(input))
  .handler(async ({ context, data }) => {
    const sql = await requireOwner(context.userId);
    const rows = await sql<{ id: number }>`
      insert into dispatches (title, body, kind, location_label, spot_id)
      values (
        ${data.title}, ${data.body}, ${data.kind},
        ${data.locationLabel || null}, ${data.spotId}
      )
      returning id
    `;
    return { id: rows[0]?.id };
  });

const storyUpdateSchema = storyWriteSchema.extend({
  id: z.number().int().positive(),
});

export const officeUpdateStory = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => storyUpdateSchema.parse(input))
  .handler(async ({ context, data }) => {
    const sql = await requireOwner(context.userId);
    const rows = await sql<{ id: number }>`
      update dispatches set
        title = ${data.title},
        body = ${data.body},
        kind = ${data.kind},
        location_label = ${data.locationLabel || null},
        spot_id = ${data.spotId}
      where id = ${data.id}
      returning id
    `;
    if (!rows[0]) throw new Error("Not found");
    return { ok: true };
  });

export const officeDeleteStory = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => z.number().int().positive().parse(id))
  .handler(async ({ context, data: id }) => {
    const sql = await requireOwner(context.userId);
    const rows = await sql<{ id: number }>`
      delete from dispatches where id = ${id} returning id
    `;
    if (!rows[0]) throw new Error("Not found");
    return { ok: true };
  });

export type OfficeReport = Report & {
  spotId: number;
  spotName: string;
};

export const officeListReports = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await requireOwner(context.userId);
    const rows = await sql<{
      id: number;
      spot_id: number;
      spot_name: string;
      swimmer_name: string | null;
      water_temp_c: unknown;
      visibility: string | null;
      wildlife: string | null;
      notes: string;
      created_at: unknown;
    }>`
      select
        r.id, r.spot_id, s.name as spot_name, p.display_name as swimmer_name,
        r.water_temp_c, r.visibility, r.wildlife, r.notes, r.created_at
      from reports r
      join spots s on s.id = r.spot_id
      left join profiles p on p.user_id = r.user_id
      order by r.created_at desc
      limit 200
    `;
    return rows.map(
      (row): OfficeReport => ({
        id: row.id,
        spotId: row.spot_id,
        spotName: row.spot_name,
        swimmerName: row.swimmer_name?.trim() || "Swimmer",
        waterTempC: numOrNull(row.water_temp_c),
        visibility: row.visibility,
        wildlife: row.wildlife,
        notes: row.notes,
        createdAt: iso(row.created_at),
      }),
    );
  });

export const officeDeleteReport = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => z.number().int().positive().parse(id))
  .handler(async ({ context, data: id }) => {
    const sql = await requireOwner(context.userId);
    const rows = await sql<{ id: number }>`
      delete from reports where id = ${id} returning id
    `;
    if (!rows[0]) throw new Error("Not found");
    return { ok: true };
  });

export const officeListSwims = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await requireOwner(context.userId);
    const rows = await sql<{
      id: number;
      user_id: string;
      swimmer_name: string | null;
      spot_id: number;
      spot_name: string;
      spot_slug: string;
      city: string;
      country: string;
      swam_on: unknown;
      distance_km: unknown;
      duration_min: number | null;
      water_temp_c: unknown;
      conditions: string | null;
      feeling: string | null;
      notes: string | null;
      created_at: unknown;
      source: string | null;
    }>`
      select
        w.id, w.user_id, p.display_name as swimmer_name, w.spot_id,
        s.name as spot_name, s.slug as spot_slug, s.city, s.country,
        w.swam_on, w.distance_km, w.duration_min, w.water_temp_c,
        w.conditions, w.feeling, w.notes, w.created_at, w.source
      from swims w
      join spots s on s.id = w.spot_id
      left join profiles p on p.user_id = w.user_id
      order by w.created_at desc
      limit 300
    `;
    return rows.map(
      (row): Swim => ({
        id: row.id,
        userId: row.user_id,
        swimmerName: row.swimmer_name?.trim() || "Swimmer",
        spotId: row.spot_id,
        spotName: row.spot_name,
        spotSlug: row.spot_slug,
        city: row.city,
        country: row.country,
        swamOn: iso(row.swam_on).slice(0, 10),
        distanceKm: num(row.distance_km),
        durationMin: row.duration_min,
        waterTempC: numOrNull(row.water_temp_c),
        conditions: row.conditions,
        feeling: row.feeling,
        notes: row.notes,
        createdAt: iso(row.created_at),
        source: row.source ?? "manual",
      }),
    );
  });

const swimUpdateSchema = z.object({
  id: z.number().int().positive(),
  spotId: z.number().int().positive(),
  swamOn: z.string().min(8),
  distanceKm: z.number().positive().max(200),
  durationMin: z.number().int().positive().max(6000).nullable(),
  waterTempC: z.number().min(-2).max(40).nullable(),
  notes: z.string().max(600).nullable(),
});

export const officeUpdateSwim = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => swimUpdateSchema.parse(input))
  .handler(async ({ context, data }) => {
    const sql = await requireOwner(context.userId);
    const rows = await sql<{ id: number }>`
      update swims set
        spot_id = ${data.spotId},
        swam_on = ${data.swamOn},
        distance_km = ${data.distanceKm},
        duration_min = ${data.durationMin},
        water_temp_c = ${data.waterTempC},
        notes = ${data.notes}
      where id = ${data.id}
      returning id
    `;
    if (!rows[0]) throw new Error("Not found");
    return { ok: true };
  });

export const officeDeleteSwim = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => z.number().int().positive().parse(id))
  .handler(async ({ context, data: id }) => {
    const sql = await requireOwner(context.userId);
    await sql`update sync_events set swim_id = null where swim_id = ${id}`;
    const rows = await sql<{ id: number }>`
      delete from swims where id = ${id} returning id
    `;
    if (!rows[0]) throw new Error("Not found");
    return { ok: true };
  });

export type OfficePerson = Profile & {
  swimCount: number;
  isOwner: boolean;
};

export const officeListPeople = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await requireOwner(context.userId);
    const rows = await sql<{
      user_id: string;
      display_name: string;
      home_water: string | null;
      bio: string | null;
      stroke: string | null;
      country: string | null;
      locale: string | null;
      place_scope: string | null;
      swim_count: unknown;
    }>`
      select
        p.user_id, p.display_name, p.home_water, p.bio, p.stroke,
        p.country, p.locale, p.place_scope,
        (select count(*)::int from swims w where w.user_id = p.user_id) as swim_count
      from profiles p
      order by p.display_name asc
    `;
    return rows.map(
      (row): OfficePerson => ({
        userId: row.user_id,
        displayName: row.display_name,
        homeWater: row.home_water,
        bio: row.bio,
        stroke: row.stroke,
        country: row.country,
        locale: row.locale,
        placeScope: row.place_scope,
        swimCount: num(row.swim_count),
        isOwner: row.user_id === context.userId,
      }),
    );
  });

const personUpdateSchema = z.object({
  userId: z.string().min(1),
  displayName: z.string().trim().min(1).max(80),
  homeWater: z.string().trim().max(80),
  stroke: z.string().trim().max(40),
  bio: z.string().trim().max(400),
  country: z.string().trim().max(80),
});

export const officeUpdatePerson = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => personUpdateSchema.parse(input))
  .handler(async ({ context, data }) => {
    const sql = await requireOwner(context.userId);
    const rows = await sql<{ user_id: string }>`
      update profiles set
        display_name = ${data.displayName},
        home_water = ${data.homeWater || null},
        stroke = ${data.stroke || null},
        bio = ${data.bio || null},
        country = ${data.country || null},
        updated_at = now()
      where user_id = ${data.userId}
      returning user_id
    `;
    if (!rows[0]) throw new Error("Not found");
    return { ok: true };
  });

export const officeDeletePerson = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((userId: string) => z.string().min(1).parse(userId))
  .handler(async ({ context, data: userId }) => {
    const sql = await requireOwner(context.userId);
    if (userId === context.userId) throw new Error("Cannot remove the owner");
    await sql`update clubs set admin_user_id = ${context.userId} where admin_user_id = ${userId}`;
    await sql`delete from club_members where user_id = ${userId}`;
    await sql`delete from rsvps where user_id = ${userId}`;
    await sql`delete from saved_spots where user_id = ${userId}`;
    await sql`delete from saved_clubs where user_id = ${userId}`;
    await sql`delete from reports where user_id = ${userId}`;
    await sql`delete from swims where user_id = ${userId}`;
    await sql`delete from watch_links where user_id = ${userId}`;
    await sql`delete from sync_events where user_id = ${userId}`;
    const rows = await sql<{ user_id: string }>`
      delete from profiles where user_id = ${userId} returning user_id
    `;
    if (!rows[0]) throw new Error("Not found");
    return { ok: true };
  });

