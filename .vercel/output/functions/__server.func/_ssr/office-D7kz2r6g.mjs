import { r as createServerFn } from "./ssr.mjs";
import { c as getSql, d as slugify, l as isWhatsappUrl, r as authMiddleware, t as COUNTRIES } from "./place-Bp16cyux.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { cn as _enum, gn as object, hn as number, yn as string } from "../_libs/@better-auth/core+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/office-D7kz2r6g.js
function num(v) {
	if (typeof v === "number") return v;
	if (typeof v === "string" && v !== "") return Number(v);
	return 0;
}
function numOrNull(v) {
	if (v === null || v === void 0 || v === "") return null;
	const n = num(v);
	return Number.isFinite(n) ? n : null;
}
function iso(v) {
	if (v instanceof Date) return v.toISOString();
	if (typeof v === "string") return v;
	return "";
}
function isPool(text) {
	const lowered = text.toLowerCase();
	return /\bpool\b/.test(lowered) || lowered.includes("בריכה") || lowered.includes("בריכת");
}
async function requireOwner(userId) {
	const sql = await getSql();
	const rows = await sql`
    select user_id from app_owners where id = 1 limit 1
  `;
	if (!rows[0] || rows[0].user_id !== userId) throw new Error("Forbidden");
	return sql;
}
var getOfficeAccess_createServerFn_handler = createServerRpc({
	id: "2de6c2fe3d3d0fb5d039bdb9b1d1468ea1e5b7df75d3251bddd191cc5d26d8d9",
	name: "getOfficeAccess",
	filename: "src/lib/tideline/office.ts"
}, (opts) => getOfficeAccess.__executeServer(opts));
var getOfficeAccess = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getOfficeAccess_createServerFn_handler, async ({ context }) => {
	const rows = await (await getSql())`
      select user_id from app_owners where id = 1 limit 1
    `;
	if (!rows[0]) return { status: "open" };
	if (rows[0].user_id === context.userId) return { status: "owner" };
	return { status: "locked" };
});
var claimOffice_createServerFn_handler = createServerRpc({
	id: "211ed994d6cc8d347cd9984d9cd7e55039505126ec5c5d44424ead5098c4ddc8",
	name: "claimOffice",
	filename: "src/lib/tideline/office.ts"
}, (opts) => claimOffice.__executeServer(opts));
var claimOffice = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(claimOffice_createServerFn_handler, async ({ context }) => {
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
	if ((await sql`
      select user_id from app_owners where id = 1 limit 1
    `)[0]?.user_id === context.userId) return { status: "owner" };
	return { status: "locked" };
});
var officeStats_createServerFn_handler = createServerRpc({
	id: "21cbf8a9d742fc79f5ed2a734e92ee77897f88776b66ab04865dd5a1112a0b0e",
	name: "officeStats",
	filename: "src/lib/tideline/office.ts"
}, (opts) => officeStats.__executeServer(opts));
var officeStats = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(officeStats_createServerFn_handler, async ({ context }) => {
	const row = (await (await requireOwner(context.userId))`
      select
        (select count(*)::int from spots) as spots,
        (select count(*)::int from clubs) as groups,
        (select count(*)::int from events) as gatherings,
        (select count(*)::int from dispatches) as stories,
        (select count(*)::int from reports) as reports,
        (select count(*)::int from swims) as swims,
        (select count(*)::int from profiles) as people
    `)[0];
	return {
		spots: num(row?.spots),
		groups: num(row?.groups),
		gatherings: num(row?.gatherings),
		stories: num(row?.stories),
		reports: num(row?.reports),
		swims: num(row?.swims),
		people: num(row?.people)
	};
});
function mapSpot(row) {
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
		createdBy: row.created_by
	};
}
var officeListSpots_createServerFn_handler = createServerRpc({
	id: "44b08e0951a4d8f8ce9f0bf7adee38655681633fb6e99a18e294d507492009b7",
	name: "officeListSpots",
	filename: "src/lib/tideline/office.ts"
}, (opts) => officeListSpots.__executeServer(opts));
var officeListSpots = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(officeListSpots_createServerFn_handler, async ({ context }) => {
	return (await (await requireOwner(context.userId))`
      select
        s.id, s.slug, s.name, s.city, s.country, s.region, s.lat, s.lng,
        s.water_type, s.difficulty, s.typical_temp_c, s.typical_km,
        s.hazards, s.best_season, s.description, s.created_by,
        (select count(*)::int from swims w where w.spot_id = s.id) as swim_count
      from spots s
      order by s.country asc, s.name asc
    `).map(mapSpot);
});
var spotWriteSchema = object({
	name: string().trim().min(2).max(80),
	city: string().trim().min(1).max(80),
	country: string().trim().min(1).max(80),
	waterType: _enum([
		"sea",
		"ocean",
		"lake",
		"river"
	]),
	difficulty: _enum([
		"gentle",
		"moderate",
		"challenging",
		"extreme"
	]),
	typicalKm: number().positive().max(200).nullable(),
	typicalTempC: number().min(-2).max(40).nullable(),
	bestSeason: string().trim().max(80),
	hazards: string().trim().max(200),
	description: string().trim().min(8).max(800),
	lat: number().min(-90).max(90),
	lng: number().min(-180).max(180)
});
var officeCreateSpot_createServerFn_handler = createServerRpc({
	id: "11da9c5a4f8296b6e49bb841ea6a30d53479962dcc49f01b4c0d83b26861ce48",
	name: "officeCreateSpot",
	filename: "src/lib/tideline/office.ts"
}, (opts) => officeCreateSpot.__executeServer(opts));
var officeCreateSpot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => spotWriteSchema.parse(input)).handler(officeCreateSpot_createServerFn_handler, async ({ context, data }) => {
	const sql = await requireOwner(context.userId);
	if (isPool(`${data.name} ${data.description}`)) throw new Error("Pools are not open water");
	const region = COUNTRIES.find((c) => c.name === data.country)?.region ?? "Europe";
	let slug = slugify(data.name);
	for (let i = 0; i < 8; i++) {
		if (!(await sql`
        select slug from spots where slug = ${slug} limit 1
      `)[0]) break;
		slug = `${slugify(data.name)}-${i + 2}`;
	}
	const rows = await sql`
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
	return {
		id: rows[0]?.id,
		slug: rows[0]?.slug ?? slug
	};
});
var spotUpdateSchema = spotWriteSchema.extend({ id: number().int().positive() });
var officeUpdateSpot_createServerFn_handler = createServerRpc({
	id: "722f62c76bf81b72135b14e2501feac11e0c54fab1a046e3b663bbcce510cfa6",
	name: "officeUpdateSpot",
	filename: "src/lib/tideline/office.ts"
}, (opts) => officeUpdateSpot.__executeServer(opts));
var officeUpdateSpot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => spotUpdateSchema.parse(input)).handler(officeUpdateSpot_createServerFn_handler, async ({ context, data }) => {
	const sql = await requireOwner(context.userId);
	if (isPool(`${data.name} ${data.description}`)) throw new Error("Pools are not open water");
	const region = COUNTRIES.find((c) => c.name === data.country)?.region ?? "Europe";
	if (!(await sql`
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
    `)[0]) throw new Error("Not found");
	return { ok: true };
});
var officeDeleteSpot_createServerFn_handler = createServerRpc({
	id: "bbbc12ca5c2dc41c8326f4cfc976212f2f17495730156851309e1935d809bf95",
	name: "officeDeleteSpot",
	filename: "src/lib/tideline/office.ts"
}, (opts) => officeDeleteSpot.__executeServer(opts));
var officeDeleteSpot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => number().int().positive().parse(id)).handler(officeDeleteSpot_createServerFn_handler, async ({ context, data: id }) => {
	const sql = await requireOwner(context.userId);
	await sql`update clubs set spot_id = null where spot_id = ${id}`;
	await sql`update dispatches set spot_id = null where spot_id = ${id}`;
	await sql`delete from reports where spot_id = ${id}`;
	await sql`delete from rsvps where event_id in (select id from events where spot_id = ${id})`;
	await sql`delete from events where spot_id = ${id}`;
	await sql`delete from swims where spot_id = ${id}`;
	await sql`delete from saved_spots where spot_id = ${id}`;
	if (!(await sql`
      delete from spots where id = ${id} returning id
    `)[0]) throw new Error("Not found");
	return { ok: true };
});
var officeListClubs_createServerFn_handler = createServerRpc({
	id: "d3ddf94b015cfe78c7a7ee64bf026dc381f23b81f14afd3cbdc9478fe5d437f7",
	name: "officeListClubs",
	filename: "src/lib/tideline/office.ts"
}, (opts) => officeListClubs.__executeServer(opts));
var officeListClubs = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(officeListClubs_createServerFn_handler, async ({ context }) => {
	return (await (await requireOwner(context.userId))`
      select
        c.id, c.slug, c.name, c.country, c.region, c.spot_id,
        s.name as spot_name, c.description, c.whatsapp_url,
        c.admin_user_id, p.display_name as admin_name,
        (select count(*)::int from club_members m where m.club_id = c.id) as member_count
      from clubs c
      left join spots s on s.id = c.spot_id
      left join profiles p on p.user_id = c.admin_user_id
      order by c.name asc
    `).map((row) => ({
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
		memberCount: num(row.member_count)
	}));
});
var clubWriteSchema = object({
	name: string().trim().min(2).max(80),
	description: string().trim().max(400),
	country: string().trim().min(1).max(80),
	spotId: number().int().positive().nullable(),
	whatsappUrl: string().trim().max(300)
});
var officeCreateClub_createServerFn_handler = createServerRpc({
	id: "cd8c06f2e04c709cad325720e1e4abe690d3a532c4e039dc033fc7cdc398d724",
	name: "officeCreateClub",
	filename: "src/lib/tideline/office.ts"
}, (opts) => officeCreateClub.__executeServer(opts));
var officeCreateClub = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => clubWriteSchema.parse(input)).handler(officeCreateClub_createServerFn_handler, async ({ context, data }) => {
	const sql = await requireOwner(context.userId);
	if (data.whatsappUrl && !isWhatsappUrl(data.whatsappUrl)) throw new Error("Invalid WhatsApp link");
	const region = COUNTRIES.find((c) => c.name === data.country)?.region ?? "Europe";
	let slug = slugify(data.name);
	for (let i = 0; i < 8; i++) {
		if (!(await sql`
        select slug from clubs where slug = ${slug} limit 1
      `)[0]) break;
		slug = `${slugify(data.name)}-${i + 2}`;
	}
	const rows = await sql`
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
	if (id) await sql`
        insert into club_members (club_id, user_id)
        values (${id}, ${context.userId})
        on conflict (club_id, user_id) do nothing
      `;
	return {
		id,
		slug: rows[0]?.slug ?? slug
	};
});
var clubUpdateSchema = clubWriteSchema.extend({ id: number().int().positive() });
var officeUpdateClub_createServerFn_handler = createServerRpc({
	id: "55e823419c9532150f7735b80e35e343b7a61c46e033bf2054708ce5a0eddc7b",
	name: "officeUpdateClub",
	filename: "src/lib/tideline/office.ts"
}, (opts) => officeUpdateClub.__executeServer(opts));
var officeUpdateClub = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => clubUpdateSchema.parse(input)).handler(officeUpdateClub_createServerFn_handler, async ({ context, data }) => {
	const sql = await requireOwner(context.userId);
	if (data.whatsappUrl && !isWhatsappUrl(data.whatsappUrl)) throw new Error("Invalid WhatsApp link");
	const region = COUNTRIES.find((c) => c.name === data.country)?.region ?? "Europe";
	if (!(await sql`
      update clubs set
        name = ${data.name},
        description = ${data.description},
        country = ${data.country},
        region = ${region},
        spot_id = ${data.spotId},
        whatsapp_url = ${data.whatsappUrl || null}
      where id = ${data.id}
      returning id
    `)[0]) throw new Error("Not found");
	return { ok: true };
});
var officeDeleteClub_createServerFn_handler = createServerRpc({
	id: "f104c406d6108f7bb108f0209d63d67d25ad01e55a7804d2712ce67b3accb923",
	name: "officeDeleteClub",
	filename: "src/lib/tideline/office.ts"
}, (opts) => officeDeleteClub.__executeServer(opts));
var officeDeleteClub = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => number().int().positive().parse(id)).handler(officeDeleteClub_createServerFn_handler, async ({ context, data: id }) => {
	if (!(await (await requireOwner(context.userId))`
      delete from clubs where id = ${id} returning id
    `)[0]) throw new Error("Not found");
	return { ok: true };
});
var officeListClubMembers_createServerFn_handler = createServerRpc({
	id: "0966cafcf289a8b9b000670571db2f01c717ad5447fb2e33f087f86d0d2af95c",
	name: "officeListClubMembers",
	filename: "src/lib/tideline/office.ts"
}, (opts) => officeListClubMembers.__executeServer(opts));
var officeListClubMembers = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((clubId) => number().int().positive().parse(clubId)).handler(officeListClubMembers_createServerFn_handler, async ({ context, data: clubId }) => {
	const sql = await requireOwner(context.userId);
	const club = await sql`
      select admin_user_id from clubs where id = ${clubId} limit 1
    `;
	if (!club[0]) throw new Error("Not found");
	return (await sql`
      select m.user_id, p.display_name, m.joined_at
      from club_members m
      left join profiles p on p.user_id = m.user_id
      where m.club_id = ${clubId}
      order by m.joined_at asc
    `).map((row) => ({
		userId: row.user_id,
		displayName: row.display_name?.trim() || "Swimmer",
		joinedAt: iso(row.joined_at),
		isAdmin: row.user_id === club[0].admin_user_id
	}));
});
var officeRemoveClubMember_createServerFn_handler = createServerRpc({
	id: "9fa3159a0caf8f4ec3f5b7403959e24d0c978fe93069a5b678dde741487e678c",
	name: "officeRemoveClubMember",
	filename: "src/lib/tideline/office.ts"
}, (opts) => officeRemoveClubMember.__executeServer(opts));
var officeRemoveClubMember = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	clubId: number().int().positive(),
	userId: string().min(1)
}).parse(input)).handler(officeRemoveClubMember_createServerFn_handler, async ({ context, data }) => {
	const sql = await requireOwner(context.userId);
	const club = await sql`
      select admin_user_id from clubs where id = ${data.clubId} limit 1
    `;
	if (!club[0]) throw new Error("Not found");
	if (club[0].admin_user_id === data.userId) throw new Error("Cannot remove the manager");
	await sql`
      delete from club_members
      where club_id = ${data.clubId} and user_id = ${data.userId}
    `;
	return { ok: true };
});
var officeListGatherings_createServerFn_handler = createServerRpc({
	id: "e3cb914a559afed1e02062dda696e07a907b79a638aeb71fd58cea7e6021180f",
	name: "officeListGatherings",
	filename: "src/lib/tideline/office.ts"
}, (opts) => officeListGatherings.__executeServer(opts));
var officeListGatherings = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(officeListGatherings_createServerFn_handler, async ({ context }) => {
	return (await (await requireOwner(context.userId))`
      select
        e.id, e.spot_id, s.name as spot_name, s.slug as spot_slug,
        s.city, s.country, e.title, e.starts_at, e.distance_km,
        e.organizer, e.notes,
        (select count(*)::int from rsvps r where r.event_id = e.id) as rsvp_count
      from events e
      join spots s on s.id = e.spot_id
      order by e.starts_at desc
    `).map((row) => ({
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
		going: false
	}));
});
var gatheringWriteSchema = object({
	spotId: number().int().positive(),
	title: string().trim().min(2).max(120),
	startsAt: string().min(8),
	distanceKm: number().positive().max(200).nullable(),
	organizer: string().trim().min(1).max(80),
	notes: string().trim().max(400)
});
var officeCreateGathering_createServerFn_handler = createServerRpc({
	id: "21371b01f4b705b6115244b461d3ed8e1d590244df5d0d3356b45d78138b7bd3",
	name: "officeCreateGathering",
	filename: "src/lib/tideline/office.ts"
}, (opts) => officeCreateGathering.__executeServer(opts));
var officeCreateGathering = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => gatheringWriteSchema.parse(input)).handler(officeCreateGathering_createServerFn_handler, async ({ context, data }) => {
	const sql = await requireOwner(context.userId);
	const starts = new Date(data.startsAt);
	if (Number.isNaN(starts.getTime())) throw new Error("Invalid time");
	return { id: (await sql`
      insert into events (spot_id, title, starts_at, distance_km, organizer, notes)
      values (
        ${data.spotId}, ${data.title}, ${starts.toISOString()},
        ${data.distanceKm}, ${data.organizer}, ${data.notes || null}
      )
      returning id
    `)[0]?.id };
});
var gatheringUpdateSchema = gatheringWriteSchema.extend({ id: number().int().positive() });
var officeUpdateGathering_createServerFn_handler = createServerRpc({
	id: "aae7682e294ae51a36e393686a7ab1fd4ed530ed0ad1524e1d702248c0baf8ae",
	name: "officeUpdateGathering",
	filename: "src/lib/tideline/office.ts"
}, (opts) => officeUpdateGathering.__executeServer(opts));
var officeUpdateGathering = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => gatheringUpdateSchema.parse(input)).handler(officeUpdateGathering_createServerFn_handler, async ({ context, data }) => {
	const sql = await requireOwner(context.userId);
	const starts = new Date(data.startsAt);
	if (Number.isNaN(starts.getTime())) throw new Error("Invalid time");
	if (!(await sql`
      update events set
        spot_id = ${data.spotId},
        title = ${data.title},
        starts_at = ${starts.toISOString()},
        distance_km = ${data.distanceKm},
        organizer = ${data.organizer},
        notes = ${data.notes || null}
      where id = ${data.id}
      returning id
    `)[0]) throw new Error("Not found");
	return { ok: true };
});
var officeDeleteGathering_createServerFn_handler = createServerRpc({
	id: "3dbf8107cf64ca6e34f1b9021be053a5cd807beb85dc9cd6667125726d43b9d9",
	name: "officeDeleteGathering",
	filename: "src/lib/tideline/office.ts"
}, (opts) => officeDeleteGathering.__executeServer(opts));
var officeDeleteGathering = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => number().int().positive().parse(id)).handler(officeDeleteGathering_createServerFn_handler, async ({ context, data: id }) => {
	const sql = await requireOwner(context.userId);
	await sql`delete from rsvps where event_id = ${id}`;
	if (!(await sql`
      delete from events where id = ${id} returning id
    `)[0]) throw new Error("Not found");
	return { ok: true };
});
var officeListStories_createServerFn_handler = createServerRpc({
	id: "b9186e465a253d4117bce65adaa31122698416b9c0da059aef5d2e206513bd87",
	name: "officeListStories",
	filename: "src/lib/tideline/office.ts"
}, (opts) => officeListStories.__executeServer(opts));
var officeListStories = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(officeListStories_createServerFn_handler, async ({ context }) => {
	return (await (await requireOwner(context.userId))`
      select
        d.id, d.title, d.body, d.kind, d.location_label, d.spot_id,
        s.slug as spot_slug, s.name as spot_name, d.published_at
      from dispatches d
      left join spots s on s.id = d.spot_id
      order by d.published_at desc
    `).map((row) => ({
		id: row.id,
		title: row.title,
		body: row.body,
		kind: row.kind,
		locationLabel: row.location_label,
		spotId: row.spot_id,
		spotSlug: row.spot_slug,
		spotName: row.spot_name,
		publishedAt: iso(row.published_at)
	}));
});
var storyWriteSchema = object({
	title: string().trim().min(2).max(120),
	body: string().trim().min(8).max(800),
	kind: _enum([
		"conditions",
		"crossing",
		"gathering",
		"notice"
	]),
	locationLabel: string().trim().max(80),
	spotId: number().int().positive().nullable()
});
var officeCreateStory_createServerFn_handler = createServerRpc({
	id: "bd3968a632f7337d5a21c7564b1dad2c941b68bfc43cf9c1526e4a45805de97e",
	name: "officeCreateStory",
	filename: "src/lib/tideline/office.ts"
}, (opts) => officeCreateStory.__executeServer(opts));
var officeCreateStory = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => storyWriteSchema.parse(input)).handler(officeCreateStory_createServerFn_handler, async ({ context, data }) => {
	return { id: (await (await requireOwner(context.userId))`
      insert into dispatches (title, body, kind, location_label, spot_id)
      values (
        ${data.title}, ${data.body}, ${data.kind},
        ${data.locationLabel || null}, ${data.spotId}
      )
      returning id
    `)[0]?.id };
});
var storyUpdateSchema = storyWriteSchema.extend({ id: number().int().positive() });
var officeUpdateStory_createServerFn_handler = createServerRpc({
	id: "303cb302741f882b91aa2824289ba13c2b83e5349b20ba5b77771a0c6ea10439",
	name: "officeUpdateStory",
	filename: "src/lib/tideline/office.ts"
}, (opts) => officeUpdateStory.__executeServer(opts));
var officeUpdateStory = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => storyUpdateSchema.parse(input)).handler(officeUpdateStory_createServerFn_handler, async ({ context, data }) => {
	if (!(await (await requireOwner(context.userId))`
      update dispatches set
        title = ${data.title},
        body = ${data.body},
        kind = ${data.kind},
        location_label = ${data.locationLabel || null},
        spot_id = ${data.spotId}
      where id = ${data.id}
      returning id
    `)[0]) throw new Error("Not found");
	return { ok: true };
});
var officeDeleteStory_createServerFn_handler = createServerRpc({
	id: "72a23a96a020c057122a1b5e5377f5c171f0347de61fff135f7277ff886d0b30",
	name: "officeDeleteStory",
	filename: "src/lib/tideline/office.ts"
}, (opts) => officeDeleteStory.__executeServer(opts));
var officeDeleteStory = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => number().int().positive().parse(id)).handler(officeDeleteStory_createServerFn_handler, async ({ context, data: id }) => {
	if (!(await (await requireOwner(context.userId))`
      delete from dispatches where id = ${id} returning id
    `)[0]) throw new Error("Not found");
	return { ok: true };
});
var officeListReports_createServerFn_handler = createServerRpc({
	id: "a584bc0558d1406669b675d62a21ce035d624b25cbb0a592af1bc5ec32ce08f1",
	name: "officeListReports",
	filename: "src/lib/tideline/office.ts"
}, (opts) => officeListReports.__executeServer(opts));
var officeListReports = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(officeListReports_createServerFn_handler, async ({ context }) => {
	return (await (await requireOwner(context.userId))`
      select
        r.id, r.spot_id, s.name as spot_name, p.display_name as swimmer_name,
        r.water_temp_c, r.visibility, r.wildlife, r.notes, r.created_at
      from reports r
      join spots s on s.id = r.spot_id
      left join profiles p on p.user_id = r.user_id
      order by r.created_at desc
      limit 200
    `).map((row) => ({
		id: row.id,
		spotId: row.spot_id,
		spotName: row.spot_name,
		swimmerName: row.swimmer_name?.trim() || "Swimmer",
		waterTempC: numOrNull(row.water_temp_c),
		visibility: row.visibility,
		wildlife: row.wildlife,
		notes: row.notes,
		createdAt: iso(row.created_at)
	}));
});
var officeDeleteReport_createServerFn_handler = createServerRpc({
	id: "350e211ee4c8593bcdd92823c5a7a9d2e88c79c5ba322e361520225045be19ea",
	name: "officeDeleteReport",
	filename: "src/lib/tideline/office.ts"
}, (opts) => officeDeleteReport.__executeServer(opts));
var officeDeleteReport = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => number().int().positive().parse(id)).handler(officeDeleteReport_createServerFn_handler, async ({ context, data: id }) => {
	if (!(await (await requireOwner(context.userId))`
      delete from reports where id = ${id} returning id
    `)[0]) throw new Error("Not found");
	return { ok: true };
});
var officeListSwims_createServerFn_handler = createServerRpc({
	id: "7b4b63ea80f7631a1b7b403b21b92167043909bf590cef3b33b15afe11805818",
	name: "officeListSwims",
	filename: "src/lib/tideline/office.ts"
}, (opts) => officeListSwims.__executeServer(opts));
var officeListSwims = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(officeListSwims_createServerFn_handler, async ({ context }) => {
	return (await (await requireOwner(context.userId))`
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
    `).map((row) => ({
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
		source: row.source ?? "manual"
	}));
});
var swimUpdateSchema = object({
	id: number().int().positive(),
	spotId: number().int().positive(),
	swamOn: string().min(8),
	distanceKm: number().positive().max(200),
	durationMin: number().int().positive().max(6e3).nullable(),
	waterTempC: number().min(-2).max(40).nullable(),
	notes: string().max(600).nullable()
});
var officeUpdateSwim_createServerFn_handler = createServerRpc({
	id: "488f6365257e3faab4df0b23313e6ce3a4b404d821c5d5d44c40e447b86ca22b",
	name: "officeUpdateSwim",
	filename: "src/lib/tideline/office.ts"
}, (opts) => officeUpdateSwim.__executeServer(opts));
var officeUpdateSwim = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => swimUpdateSchema.parse(input)).handler(officeUpdateSwim_createServerFn_handler, async ({ context, data }) => {
	if (!(await (await requireOwner(context.userId))`
      update swims set
        spot_id = ${data.spotId},
        swam_on = ${data.swamOn},
        distance_km = ${data.distanceKm},
        duration_min = ${data.durationMin},
        water_temp_c = ${data.waterTempC},
        notes = ${data.notes}
      where id = ${data.id}
      returning id
    `)[0]) throw new Error("Not found");
	return { ok: true };
});
var officeDeleteSwim_createServerFn_handler = createServerRpc({
	id: "c6a358b966cd5dfcb412e872bb7cbb8fa4f133125390a81828c656c73d3170be",
	name: "officeDeleteSwim",
	filename: "src/lib/tideline/office.ts"
}, (opts) => officeDeleteSwim.__executeServer(opts));
var officeDeleteSwim = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => number().int().positive().parse(id)).handler(officeDeleteSwim_createServerFn_handler, async ({ context, data: id }) => {
	const sql = await requireOwner(context.userId);
	await sql`update sync_events set swim_id = null where swim_id = ${id}`;
	if (!(await sql`
      delete from swims where id = ${id} returning id
    `)[0]) throw new Error("Not found");
	return { ok: true };
});
var officeListPeople_createServerFn_handler = createServerRpc({
	id: "310eb9fdb08236ae1201c2f593824a07a4f0cad2042c4b00236888816070ef79",
	name: "officeListPeople",
	filename: "src/lib/tideline/office.ts"
}, (opts) => officeListPeople.__executeServer(opts));
var officeListPeople = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(officeListPeople_createServerFn_handler, async ({ context }) => {
	return (await (await requireOwner(context.userId))`
      select
        p.user_id, p.display_name, p.home_water, p.bio, p.stroke,
        p.country, p.locale, p.place_scope,
        (select count(*)::int from swims w where w.user_id = p.user_id) as swim_count
      from profiles p
      order by p.display_name asc
    `).map((row) => ({
		userId: row.user_id,
		displayName: row.display_name,
		homeWater: row.home_water,
		bio: row.bio,
		stroke: row.stroke,
		country: row.country,
		locale: row.locale,
		placeScope: row.place_scope,
		swimCount: num(row.swim_count),
		isOwner: row.user_id === context.userId
	}));
});
var personUpdateSchema = object({
	userId: string().min(1),
	displayName: string().trim().min(1).max(80),
	homeWater: string().trim().max(80),
	stroke: string().trim().max(40),
	bio: string().trim().max(400),
	country: string().trim().max(80)
});
var officeUpdatePerson_createServerFn_handler = createServerRpc({
	id: "79c474c1bc5f69e5d3245eb5d77e30b8fb66cc35b5a04319c4e369c502ffd160",
	name: "officeUpdatePerson",
	filename: "src/lib/tideline/office.ts"
}, (opts) => officeUpdatePerson.__executeServer(opts));
var officeUpdatePerson = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => personUpdateSchema.parse(input)).handler(officeUpdatePerson_createServerFn_handler, async ({ context, data }) => {
	if (!(await (await requireOwner(context.userId))`
      update profiles set
        display_name = ${data.displayName},
        home_water = ${data.homeWater || null},
        stroke = ${data.stroke || null},
        bio = ${data.bio || null},
        country = ${data.country || null},
        updated_at = now()
      where user_id = ${data.userId}
      returning user_id
    `)[0]) throw new Error("Not found");
	return { ok: true };
});
var officeDeletePerson_createServerFn_handler = createServerRpc({
	id: "6844b4b64b701371c764eae7fae3391056f2d6c2b8211e93b872a280bc25780a",
	name: "officeDeletePerson",
	filename: "src/lib/tideline/office.ts"
}, (opts) => officeDeletePerson.__executeServer(opts));
var officeDeletePerson = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((userId) => string().min(1).parse(userId)).handler(officeDeletePerson_createServerFn_handler, async ({ context, data: userId }) => {
	const sql = await requireOwner(context.userId);
	if (userId === context.userId) throw new Error("Cannot remove the owner");
	await sql`update clubs set admin_user_id = ${context.userId} where admin_user_id = ${userId}`;
	await sql`delete from club_members where user_id = ${userId}`;
	await sql`delete from rsvps where user_id = ${userId}`;
	await sql`delete from saved_spots where user_id = ${userId}`;
	await sql`delete from reports where user_id = ${userId}`;
	await sql`delete from swims where user_id = ${userId}`;
	await sql`delete from watch_links where user_id = ${userId}`;
	await sql`delete from sync_events where user_id = ${userId}`;
	if (!(await sql`
      delete from profiles where user_id = ${userId} returning user_id
    `)[0]) throw new Error("Not found");
	return { ok: true };
});
//#endregion
export { claimOffice_createServerFn_handler, getOfficeAccess_createServerFn_handler, officeCreateClub_createServerFn_handler, officeCreateGathering_createServerFn_handler, officeCreateSpot_createServerFn_handler, officeCreateStory_createServerFn_handler, officeDeleteClub_createServerFn_handler, officeDeleteGathering_createServerFn_handler, officeDeletePerson_createServerFn_handler, officeDeleteReport_createServerFn_handler, officeDeleteSpot_createServerFn_handler, officeDeleteStory_createServerFn_handler, officeDeleteSwim_createServerFn_handler, officeListClubMembers_createServerFn_handler, officeListClubs_createServerFn_handler, officeListGatherings_createServerFn_handler, officeListPeople_createServerFn_handler, officeListReports_createServerFn_handler, officeListSpots_createServerFn_handler, officeListStories_createServerFn_handler, officeListSwims_createServerFn_handler, officeRemoveClubMember_createServerFn_handler, officeStats_createServerFn_handler, officeUpdateClub_createServerFn_handler, officeUpdateGathering_createServerFn_handler, officeUpdatePerson_createServerFn_handler, officeUpdateSpot_createServerFn_handler, officeUpdateStory_createServerFn_handler, officeUpdateSwim_createServerFn_handler };
