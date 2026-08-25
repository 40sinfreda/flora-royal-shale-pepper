import { r as createServerFn } from "./ssr.mjs";
import { c as getSql, d as slugify, l as isWhatsappUrl, r as authMiddleware, t as COUNTRIES } from "./place-Bp16cyux.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
import { n as nearestByKm, t as haversineKm } from "./geo-D8B0gUVb.mjs";
import { cn as _enum, dn as boolean, gn as object, hn as number, un as array, yn as string } from "../_libs/@better-auth/core+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-DIQ6i2tL.js
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
var placeFilterSchema = object({
	country: string().optional(),
	region: string().optional()
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
var SPOT_SELECT = `
  s.id, s.slug, s.name, s.city, s.country, s.region, s.lat, s.lng,
  s.water_type, s.difficulty, s.typical_temp_c, s.typical_km,
  s.hazards, s.best_season, s.description, s.created_by,
  (select count(*)::int from swims w where w.spot_id = s.id) as swim_count
`;
async function loadSpots(filter = {}) {
	const sql = await getSql();
	const country = filter.country ?? null;
	const region = filter.region ?? null;
	return (await sql`
    select
      s.id, s.slug, s.name, s.city, s.country, s.region, s.lat, s.lng,
      s.water_type, s.difficulty, s.typical_temp_c, s.typical_km,
      s.hazards, s.best_season, s.description, s.created_by,
      (select count(*)::int from swims w where w.spot_id = s.id) as swim_count
    from spots s
    where (${country}::text is null or s.country = ${country})
      and (${region}::text is null or s.region = ${region})
    order by s.name asc
  `).map(mapSpot);
}
async function ensureProfile(userId, fallbackName = "Swimmer") {
	await (await getSql())`
    insert into profiles (user_id, display_name)
    values (${userId}, ${fallbackName.trim() || "Swimmer"})
    on conflict (user_id) do nothing
  `;
}
var listSpots_createServerFn_handler = createServerRpc({
	id: "3e0be6fdcbab214323b7e4ee2270c0c1cee91a05de57577b6525b2faa2260336",
	name: "listSpots",
	filename: "src/lib/tideline/api.ts"
}, (opts) => listSpots.__executeServer(opts));
var listSpots = createServerFn({ method: "GET" }).validator((input) => placeFilterSchema.parse(input ?? {})).handler(listSpots_createServerFn_handler, async ({ data }) => loadSpots(data));
var getSpot_createServerFn_handler = createServerRpc({
	id: "2bf7da519f4d07e6d99369b8376a070b8063b3064fe4933768193685ca7e2032",
	name: "getSpot",
	filename: "src/lib/tideline/api.ts"
}, (opts) => getSpot.__executeServer(opts));
var getSpot = createServerFn({ method: "GET" }).validator((slug) => slug).handler(getSpot_createServerFn_handler, async ({ data: slug }) => {
	const rows = await (await getSql()).query(`select ${SPOT_SELECT} from spots s where s.slug = $1 limit 1`, [slug]);
	return rows[0] ? mapSpot(rows[0]) : null;
});
var getHomeStats_createServerFn_handler = createServerRpc({
	id: "6038aaefc058b8391d594742fac1df5b4e49cf8828ac8b384d3c4dda9b29d3a4",
	name: "getHomeStats",
	filename: "src/lib/tideline/api.ts"
}, (opts) => getHomeStats.__executeServer(opts));
var getHomeStats = createServerFn({ method: "GET" }).validator((input) => placeFilterSchema.parse(input ?? {})).handler(getHomeStats_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const country = data.country ?? null;
	const region = data.region ?? null;
	const row = (await sql`
      select
        (select count(*)::int from spots s
          where (${country}::text is null or s.country = ${country})
            and (${region}::text is null or s.region = ${region})) as spots,
        (select count(*)::int from events e
          join spots s on s.id = e.spot_id
          where e.starts_at > now()
            and (${country}::text is null or s.country = ${country})
            and (${region}::text is null or s.region = ${region})) as gatherings,
        (select coalesce(sum(w.distance_km), 0) from swims w
          join spots s on s.id = w.spot_id
          where (${country}::text is null or s.country = ${country})
            and (${region}::text is null or s.region = ${region})) as km_logged,
        (select count(*)::int from swims w
          join spots s on s.id = w.spot_id
          where (${country}::text is null or s.country = ${country})
            and (${region}::text is null or s.region = ${region})) as swims
    `)[0];
	return {
		spots: num(row?.spots),
		gatherings: num(row?.gatherings),
		kmLogged: num(row?.km_logged),
		swims: num(row?.swims)
	};
});
function mapSwim(row) {
	return {
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
	};
}
var listFeed_createServerFn_handler = createServerRpc({
	id: "c950f7de4c878359722206516af72e102b914520387027eff9608cecf5978e7e",
	name: "listFeed",
	filename: "src/lib/tideline/api.ts"
}, (opts) => listFeed.__executeServer(opts));
var listFeed = createServerFn({ method: "GET" }).validator((input) => placeFilterSchema.parse(input ?? {})).handler(listFeed_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const country = data.country ?? null;
	const region = data.region ?? null;
	const swimRows = await sql`
      select
        w.id, w.user_id, p.display_name as swimmer_name, w.spot_id,
        s.name as spot_name, s.slug as spot_slug, s.city, s.country,
        w.swam_on, w.distance_km, w.duration_min, w.water_temp_c,
        w.conditions, w.feeling, w.notes, w.created_at, w.source
      from swims w
      join spots s on s.id = w.spot_id
      left join profiles p on p.user_id = w.user_id
      where (${country}::text is null or s.country = ${country})
        and (${region}::text is null or s.region = ${region})
      order by w.created_at desc
      limit 20
    `;
	const dispatchRows = await sql`
      select
        d.id, d.title, d.body, d.kind, d.location_label,
        s.slug as spot_slug, s.name as spot_name, d.published_at
      from dispatches d
      left join spots s on s.id = d.spot_id
      where (${country}::text is null or s.country = ${country})
        and (${region}::text is null or s.region = ${region})
      order by d.published_at desc
      limit 12
    `;
	const items = [...swimRows.map((row) => ({
		kind: "swim",
		swim: mapSwim(row)
	})), ...dispatchRows.map((row) => {
		return {
			kind: "dispatch",
			dispatch: {
				id: row.id,
				title: row.title,
				body: row.body,
				kind: row.kind,
				locationLabel: row.location_label,
				spotSlug: row.spot_slug,
				spotName: row.spot_name,
				publishedAt: iso(row.published_at)
			}
		};
	})];
	items.sort((a, b) => {
		const ta = a.kind === "swim" ? a.swim.createdAt : a.dispatch.publishedAt;
		return (b.kind === "swim" ? b.swim.createdAt : b.dispatch.publishedAt).localeCompare(ta);
	});
	return items.slice(0, 18);
});
var listSpotSwims_createServerFn_handler = createServerRpc({
	id: "cbd87445a172b4839521932316d25f96ae99151ede775b600646dce916add3d1",
	name: "listSpotSwims",
	filename: "src/lib/tideline/api.ts"
}, (opts) => listSpotSwims.__executeServer(opts));
var listSpotSwims = createServerFn({ method: "GET" }).validator((spotId) => spotId).handler(listSpotSwims_createServerFn_handler, async ({ data: spotId }) => {
	return (await (await getSql())`
      select
        w.id, w.user_id, p.display_name as swimmer_name, w.spot_id,
        s.name as spot_name, s.slug as spot_slug, s.city, s.country,
        w.swam_on, w.distance_km, w.duration_min, w.water_temp_c,
        w.conditions, w.feeling, w.notes, w.created_at, w.source
      from swims w
      join spots s on s.id = w.spot_id
      left join profiles p on p.user_id = w.user_id
      where w.spot_id = ${spotId}
      order by w.swam_on desc, w.created_at desc
      limit 20
    `).map(mapSwim);
});
function mapEvent(row, goingIds) {
	return {
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
		going: goingIds.includes(row.id)
	};
}
var listGatherings_createServerFn_handler = createServerRpc({
	id: "99d6280a07743e087727bba0f14b28035f9c67037b05291830d9b59295369a22",
	name: "listGatherings",
	filename: "src/lib/tideline/api.ts"
}, (opts) => listGatherings.__executeServer(opts));
var listGatherings = createServerFn({ method: "GET" }).validator((input) => placeFilterSchema.parse(input ?? {})).handler(listGatherings_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const country = data.country ?? null;
	const region = data.region ?? null;
	return (await sql`
      select
        e.id, e.spot_id, s.name as spot_name, s.slug as spot_slug,
        s.city, s.country, e.title, e.starts_at, e.distance_km,
        e.organizer, e.notes,
        (select count(*)::int from rsvps r where r.event_id = e.id) as rsvp_count
      from events e
      join spots s on s.id = e.spot_id
      where e.starts_at > now() - interval '1 day'
        and (${country}::text is null or s.country = ${country})
        and (${region}::text is null or s.region = ${region})
      order by e.starts_at asc
    `).map((row) => mapEvent(row, []));
});
var listSpotGatherings_createServerFn_handler = createServerRpc({
	id: "de2e0fe2cc968df803d25df14926cc519106032905034441468979396d54cd3f",
	name: "listSpotGatherings",
	filename: "src/lib/tideline/api.ts"
}, (opts) => listSpotGatherings.__executeServer(opts));
var listSpotGatherings = createServerFn({ method: "GET" }).validator((spotId) => spotId).handler(listSpotGatherings_createServerFn_handler, async ({ data: spotId }) => {
	return (await (await getSql())`
      select
        e.id, e.spot_id, s.name as spot_name, s.slug as spot_slug,
        s.city, s.country, e.title, e.starts_at, e.distance_km,
        e.organizer, e.notes,
        (select count(*)::int from rsvps r where r.event_id = e.id) as rsvp_count
      from events e
      join spots s on s.id = e.spot_id
      where e.spot_id = ${spotId}
        and e.starts_at > now() - interval '1 day'
      order by e.starts_at asc
    `).map((row) => mapEvent(row, []));
});
var listReports_createServerFn_handler = createServerRpc({
	id: "0cdef54ab09f8e45fde5f1725709e6792d718b3c3e377c94594192e43ca22225",
	name: "listReports",
	filename: "src/lib/tideline/api.ts"
}, (opts) => listReports.__executeServer(opts));
var listReports = createServerFn({ method: "GET" }).validator((spotId) => spotId).handler(listReports_createServerFn_handler, async ({ data: spotId }) => {
	return (await (await getSql())`
      select
        r.id, p.display_name as swimmer_name, r.water_temp_c,
        r.visibility, r.wildlife, r.notes, r.created_at
      from reports r
      left join profiles p on p.user_id = r.user_id
      where r.spot_id = ${spotId}
      order by r.created_at desc
      limit 12
    `).map((row) => ({
		id: row.id,
		swimmerName: row.swimmer_name?.trim() || "Swimmer",
		waterTempC: numOrNull(row.water_temp_c),
		visibility: row.visibility,
		wildlife: row.wildlife,
		notes: row.notes,
		createdAt: iso(row.created_at)
	}));
});
var logSwimSchema = object({
	spotId: number().int().positive(),
	swamOn: string().min(8),
	distanceKm: number().positive().max(200),
	durationMin: number().int().positive().max(6e3).nullable(),
	waterTempC: number().min(-2).max(40).nullable(),
	conditions: string().max(40).nullable(),
	feeling: string().max(40).nullable(),
	notes: string().max(600).nullable(),
	displayName: string().max(80).optional()
});
var logSwim_createServerFn_handler = createServerRpc({
	id: "285ede87bf505f70ccaa2128588136b6439efb4922938fc77cada139f19792b5",
	name: "logSwim",
	filename: "src/lib/tideline/api.ts"
}, (opts) => logSwim.__executeServer(opts));
var logSwim = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => logSwimSchema.parse(input)).handler(logSwim_createServerFn_handler, async ({ context, data }) => {
	await ensureProfile(context.userId, data.displayName);
	return { id: (await (await getSql())`
      insert into swims (
        user_id, spot_id, swam_on, distance_km, duration_min,
        water_temp_c, conditions, feeling, notes
      ) values (
        ${context.userId}, ${data.spotId}, ${data.swamOn}, ${data.distanceKm},
        ${data.durationMin}, ${data.waterTempC}, ${data.conditions},
        ${data.feeling}, ${data.notes}
      )
      returning id
    `)[0]?.id ?? 0 };
});
var deleteSwim_createServerFn_handler = createServerRpc({
	id: "57a9f5a6d104e1b3049d500d5e04c9917a47a0714c3f0d3bf6e822c571531dee",
	name: "deleteSwim",
	filename: "src/lib/tideline/api.ts"
}, (opts) => deleteSwim.__executeServer(opts));
var deleteSwim = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(deleteSwim_createServerFn_handler, async ({ context, data: id }) => {
	await (await getSql())`
      delete from swims
      where id = ${id} and user_id = ${context.userId}
    `;
	return { ok: true };
});
var listMySwims_createServerFn_handler = createServerRpc({
	id: "b915a9ccf25de7b86cb865b5cef4fa9a149643123a8781ecf65884b3b846cbab",
	name: "listMySwims",
	filename: "src/lib/tideline/api.ts"
}, (opts) => listMySwims.__executeServer(opts));
var listMySwims = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listMySwims_createServerFn_handler, async ({ context }) => {
	return (await (await getSql())`
      select
        w.id, w.user_id, p.display_name as swimmer_name, w.spot_id,
        s.name as spot_name, s.slug as spot_slug, s.city, s.country,
        w.swam_on, w.distance_km, w.duration_min, w.water_temp_c,
        w.conditions, w.feeling, w.notes, w.created_at, w.source
      from swims w
      join spots s on s.id = w.spot_id
      left join profiles p on p.user_id = w.user_id
      where w.user_id = ${context.userId}
      order by w.swam_on desc, w.created_at desc
      limit 50
    `).map(mapSwim);
});
var getMyStats_createServerFn_handler = createServerRpc({
	id: "8cff446a31219d2c0a21e0fce6b2a43fc8458f0997dc8bef6634ddcb31d654ef",
	name: "getMyStats",
	filename: "src/lib/tideline/api.ts"
}, (opts) => getMyStats.__executeServer(opts));
var getMyStats = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getMyStats_createServerFn_handler, async ({ context }) => {
	const row = (await (await getSql())`
      select
        count(*)::int as swim_count,
        coalesce(sum(distance_km), 0) as total_km,
        count(distinct spot_id)::int as unique_spots,
        coalesce(max(distance_km), 0) as longest_km
      from swims
      where user_id = ${context.userId}
    `)[0];
	return {
		swimCount: num(row?.swim_count),
		totalKm: num(row?.total_km),
		uniqueSpots: num(row?.unique_spots),
		longestKm: num(row?.longest_km)
	};
});
var getMyProfile_createServerFn_handler = createServerRpc({
	id: "17671ff447b8d58927c9e1ef5008352c81885d02c9f9f17ec6d1a21640902490",
	name: "getMyProfile",
	filename: "src/lib/tideline/api.ts"
}, (opts) => getMyProfile.__executeServer(opts));
var getMyProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getMyProfile_createServerFn_handler, async ({ context }) => {
	await ensureProfile(context.userId);
	const row = (await (await getSql())`
      select user_id, display_name, home_water, bio, stroke, country, locale, place_scope
      from profiles
      where user_id = ${context.userId}
      limit 1
    `)[0];
	return {
		userId: context.userId,
		displayName: row?.display_name ?? "Swimmer",
		homeWater: row?.home_water ?? null,
		bio: row?.bio ?? null,
		stroke: row?.stroke ?? null,
		country: row?.country ?? null,
		locale: row?.locale ?? null,
		placeScope: row?.place_scope ?? null
	};
});
var profileSchema = object({
	displayName: string().trim().min(1).max(80),
	homeWater: string().trim().max(80),
	bio: string().trim().max(280),
	stroke: string().trim().max(40)
});
var updateMyProfile_createServerFn_handler = createServerRpc({
	id: "d6deecc2f3bf4897f24527cf8ac29735ed39a601aa83c44eb6650771e3900126",
	name: "updateMyProfile",
	filename: "src/lib/tideline/api.ts"
}, (opts) => updateMyProfile.__executeServer(opts));
var updateMyProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => profileSchema.parse(input)).handler(updateMyProfile_createServerFn_handler, async ({ context, data }) => {
	await (await getSql())`
      insert into profiles (user_id, display_name, home_water, bio, stroke, updated_at)
      values (
        ${context.userId}, ${data.displayName},
        ${data.homeWater || null}, ${data.bio || null}, ${data.stroke || null},
        now()
      )
      on conflict (user_id) do update set
        display_name = excluded.display_name,
        home_water = excluded.home_water,
        bio = excluded.bio,
        stroke = excluded.stroke,
        updated_at = now()
    `;
	return { ok: true };
});
var placeSaveSchema = object({
	country: string().min(1).max(80),
	region: string().min(1).max(80),
	scope: _enum(["country", "region"]),
	locale: _enum(["he", "en"])
});
var saveMyPlace_createServerFn_handler = createServerRpc({
	id: "bb160b717bd45eb376cb353ca9418d427723dd8dab58357b271b9f3441b4019f",
	name: "saveMyPlace",
	filename: "src/lib/tideline/api.ts"
}, (opts) => saveMyPlace.__executeServer(opts));
var saveMyPlace = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => placeSaveSchema.parse(input)).handler(saveMyPlace_createServerFn_handler, async ({ context, data }) => {
	await ensureProfile(context.userId);
	await (await getSql())`
      update profiles set
        country = ${data.country},
        locale = ${data.locale},
        place_scope = ${data.scope},
        updated_at = now()
      where user_id = ${context.userId}
    `;
	return { ok: true };
});
var toggleSaveSpot_createServerFn_handler = createServerRpc({
	id: "69afa193023060e9139e0ba3c9dd41eaec545c4dd7e24a05684c0c6247b85f1b",
	name: "toggleSaveSpot",
	filename: "src/lib/tideline/api.ts"
}, (opts) => toggleSaveSpot.__executeServer(opts));
var toggleSaveSpot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((spotId) => spotId).handler(toggleSaveSpot_createServerFn_handler, async ({ context, data: spotId }) => {
	const sql = await getSql();
	if ((await sql`
      select user_id from saved_spots
      where user_id = ${context.userId} and spot_id = ${spotId}
      limit 1
    `)[0]) {
		await sql`
        delete from saved_spots
        where user_id = ${context.userId} and spot_id = ${spotId}
      `;
		return { saved: false };
	}
	await sql`
      insert into saved_spots (user_id, spot_id)
      values (${context.userId}, ${spotId})
    `;
	return { saved: true };
});
var listSavedSpotIds_createServerFn_handler = createServerRpc({
	id: "d6ba9bc72e40881b45dddc9096c31a596cfd3ca996de52f46d0a909f385a9ff4",
	name: "listSavedSpotIds",
	filename: "src/lib/tideline/api.ts"
}, (opts) => listSavedSpotIds.__executeServer(opts));
var listSavedSpotIds = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listSavedSpotIds_createServerFn_handler, async ({ context }) => {
	return (await (await getSql())`
      select spot_id from saved_spots where user_id = ${context.userId}
    `).map((r) => r.spot_id);
});
var listSavedSpots_createServerFn_handler = createServerRpc({
	id: "058b3432cbaffe1534a2bc3576fbc791c68bb53b1bab50f3c42b5dcdeabb4b5e",
	name: "listSavedSpots",
	filename: "src/lib/tideline/api.ts"
}, (opts) => listSavedSpots.__executeServer(opts));
var listSavedSpots = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listSavedSpots_createServerFn_handler, async ({ context }) => {
	return (await (await getSql()).query(`select ${SPOT_SELECT}
       from saved_spots sv
       join spots s on s.id = sv.spot_id
       where sv.user_id = $1
       order by sv.created_at desc`, [context.userId])).map(mapSpot);
});
var toggleRsvp_createServerFn_handler = createServerRpc({
	id: "1344c827603fa60ac28ea9725455f5b76059e4f20e0ccdd0803bb1974af5a562",
	name: "toggleRsvp",
	filename: "src/lib/tideline/api.ts"
}, (opts) => toggleRsvp.__executeServer(opts));
var toggleRsvp = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((eventId) => eventId).handler(toggleRsvp_createServerFn_handler, async ({ context, data: eventId }) => {
	await ensureProfile(context.userId);
	const sql = await getSql();
	if ((await sql`
      select id from rsvps
      where user_id = ${context.userId} and event_id = ${eventId}
      limit 1
    `)[0]) {
		await sql`
        delete from rsvps
        where user_id = ${context.userId} and event_id = ${eventId}
      `;
		return { going: false };
	}
	await sql`
      insert into rsvps (user_id, event_id)
      values (${context.userId}, ${eventId})
    `;
	return { going: true };
});
var listMyRsvpIds_createServerFn_handler = createServerRpc({
	id: "cb6613287310d65b528a9fd672d07fac684c7eb9c00eafd0ab800d3b4e499a4f",
	name: "listMyRsvpIds",
	filename: "src/lib/tideline/api.ts"
}, (opts) => listMyRsvpIds.__executeServer(opts));
var listMyRsvpIds = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listMyRsvpIds_createServerFn_handler, async ({ context }) => {
	return (await (await getSql())`
      select event_id from rsvps where user_id = ${context.userId}
    `).map((r) => r.event_id);
});
var reportSchema = object({
	spotId: number().int().positive(),
	waterTempC: number().min(-2).max(40).nullable(),
	visibility: string().max(40).nullable(),
	wildlife: string().max(80).nullable(),
	notes: string().trim().min(1).max(400),
	displayName: string().max(80).optional()
});
var createReport_createServerFn_handler = createServerRpc({
	id: "de136598203c7e061039b1c95da6eccf9908a83ad70801369053aa762daf711e",
	name: "createReport",
	filename: "src/lib/tideline/api.ts"
}, (opts) => createReport.__executeServer(opts));
var createReport = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => reportSchema.parse(input)).handler(createReport_createServerFn_handler, async ({ context, data }) => {
	await ensureProfile(context.userId, data.displayName);
	await (await getSql())`
      insert into reports (user_id, spot_id, water_temp_c, visibility, wildlife, notes)
      values (
        ${context.userId}, ${data.spotId}, ${data.waterTempC},
        ${data.visibility}, ${data.wildlife}, ${data.notes}
      )
    `;
	return { ok: true };
});
var createSpotSchema = object({
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
	lat: number().min(-90).max(90).nullable(),
	lng: number().min(-180).max(180).nullable()
});
var createSpot_createServerFn_handler = createServerRpc({
	id: "442036881e1fc3788b4fee79a3f1905e8c9cb5bdd032fef5f90af12247ad16d2",
	name: "createSpot",
	filename: "src/lib/tideline/api.ts"
}, (opts) => createSpot.__executeServer(opts));
var createSpot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => createSpotSchema.parse(input)).handler(createSpot_createServerFn_handler, async ({ context, data }) => {
	const lowered = `${data.name} ${data.description}`.toLowerCase();
	if (/\bpool\b/.test(lowered) || lowered.includes("בריכה") || lowered.includes("בריכת")) throw new Error("Pools are not open water");
	const def = COUNTRIES.find((c) => c.name === data.country);
	const region = def?.region ?? "Europe";
	const lat = data.lat ?? def?.lat ?? 0;
	const lng = data.lng ?? def?.lng ?? 0;
	let slug = slugify(data.name);
	const sql = await getSql();
	for (let i = 0; i < 8; i++) {
		if (!(await sql`
        select slug from spots where slug = ${slug} limit 1
      `)[0]) break;
		slug = `${slugify(data.name)}-${i + 2}`;
	}
	return { slug: (await sql`
      insert into spots (
        slug, name, city, country, region, lat, lng, water_type, difficulty,
        typical_temp_c, typical_km, hazards, best_season, description, created_by
      ) values (
        ${slug}, ${data.name}, ${data.city}, ${data.country}, ${region},
        ${lat}, ${lng}, ${data.waterType}, ${data.difficulty},
        ${data.typicalTempC}, ${data.typicalKm}, ${data.hazards},
        ${data.bestSeason}, ${data.description}, ${context.userId}
      )
      returning slug
    `)[0]?.slug ?? slug };
});
function mapClub(row, opts) {
	const isAdmin = opts.userId ? row.admin_user_id === opts.userId : false;
	const isMember = opts.userId ? Boolean(opts.memberIds?.includes(opts.userId)) || isAdmin : false;
	return {
		id: row.id,
		slug: row.slug,
		name: row.name,
		country: row.country,
		region: row.region,
		spotId: row.spot_id,
		spotName: row.spot_name,
		spotSlug: row.spot_slug,
		description: row.description,
		memberCount: num(row.member_count),
		isMember,
		isAdmin,
		whatsappUrl: isMember ? row.whatsapp_url : null,
		adminName: row.admin_name?.trim() || "Swimmer"
	};
}
var CLUB_SELECT = `
  c.id, c.slug, c.name, c.country, c.region, c.spot_id,
  s.name as spot_name, s.slug as spot_slug, c.description, c.whatsapp_url,
  c.admin_user_id, p.display_name as admin_name,
  (select count(*)::int from club_members m where m.club_id = c.id) as member_count
`;
var listClubs_createServerFn_handler = createServerRpc({
	id: "8ea58f064f70abdf444513c844bb57414be5d205c70613268f66293e9e7d6b4e",
	name: "listClubs",
	filename: "src/lib/tideline/api.ts"
}, (opts) => listClubs.__executeServer(opts));
var listClubs = createServerFn({ method: "GET" }).validator((input) => placeFilterSchema.parse(input ?? {})).handler(listClubs_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const country = data.country ?? null;
	const region = data.region ?? null;
	return (await sql`
      select
        c.id, c.slug, c.name, c.country, c.region, c.spot_id,
        s.name as spot_name, s.slug as spot_slug, c.description, c.whatsapp_url,
        c.admin_user_id, p.display_name as admin_name,
        (select count(*)::int from club_members m where m.club_id = c.id) as member_count
      from clubs c
      left join spots s on s.id = c.spot_id
      left join profiles p on p.user_id = c.admin_user_id
      where (${country}::text is null or c.country = ${country})
        and (${region}::text is null or c.region = ${region})
      order by c.created_at desc
    `).map((row) => mapClub(row, {}));
});
var getClub_createServerFn_handler = createServerRpc({
	id: "4bf34ab45006325c56a41e314adc585446d5df4340833ae06a044e7c525bc79d",
	name: "getClub",
	filename: "src/lib/tideline/api.ts"
}, (opts) => getClub.__executeServer(opts));
var getClub = createServerFn({ method: "GET" }).validator((slug) => slug).handler(getClub_createServerFn_handler, async ({ data: slug }) => {
	const rows = await (await getSql()).query(`select ${CLUB_SELECT}
       from clubs c
       left join spots s on s.id = c.spot_id
       left join profiles p on p.user_id = c.admin_user_id
       where c.slug = $1
       limit 1`, [slug]);
	return rows[0] ? mapClub(rows[0], {}) : null;
});
var getMyClubAccess_createServerFn_handler = createServerRpc({
	id: "653f3f334692ba2330792988a426b59c8020e3a3223b8ed57aba1c6e0623a676",
	name: "getMyClubAccess",
	filename: "src/lib/tideline/api.ts"
}, (opts) => getMyClubAccess.__executeServer(opts));
var getMyClubAccess = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((slug) => slug).handler(getMyClubAccess_createServerFn_handler, async ({ context, data: slug }) => {
	const sql = await getSql();
	const row = (await sql.query(`select ${CLUB_SELECT}
       from clubs c
       left join spots s on s.id = c.spot_id
       left join profiles p on p.user_id = c.admin_user_id
       where c.slug = $1
       limit 1`, [slug]))[0];
	if (!row) return null;
	const members = await sql`
      select user_id from club_members where club_id = ${row.id}
    `;
	return mapClub(row, {
		userId: context.userId,
		memberIds: members.map((m) => m.user_id)
	});
});
var listMyClubSlugs_createServerFn_handler = createServerRpc({
	id: "f545b125c08614eb437f03e7839e260f2ecad68b5fbdd4123e0b363c3c49b8eb",
	name: "listMyClubSlugs",
	filename: "src/lib/tideline/api.ts"
}, (opts) => listMyClubSlugs.__executeServer(opts));
var listMyClubSlugs = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listMyClubSlugs_createServerFn_handler, async ({ context }) => {
	return (await (await getSql())`
      select c.slug
      from club_members m
      join clubs c on c.id = m.club_id
      where m.user_id = ${context.userId}
    `).map((r) => r.slug);
});
var createClubSchema = object({
	name: string().trim().min(2).max(80),
	description: string().trim().max(400),
	country: string().trim().min(1).max(80),
	spotId: number().int().positive().nullable(),
	whatsappUrl: string().trim().max(300)
});
var createClub_createServerFn_handler = createServerRpc({
	id: "afedac5f3f6ea3df93d1d42075a9796bc9bece57773aa78acffbe18025452338",
	name: "createClub",
	filename: "src/lib/tideline/api.ts"
}, (opts) => createClub.__executeServer(opts));
var createClub = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => createClubSchema.parse(input)).handler(createClub_createServerFn_handler, async ({ context, data }) => {
	if (data.whatsappUrl && !isWhatsappUrl(data.whatsappUrl)) throw new Error("Invalid WhatsApp link");
	await ensureProfile(context.userId);
	const region = COUNTRIES.find((c) => c.name === data.country)?.region ?? "Europe";
	let slug = slugify(data.name);
	const sql = await getSql();
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
      returning slug, id
    `;
	const id = rows[0]?.id;
	if (id) await sql`
        insert into club_members (club_id, user_id)
        values (${id}, ${context.userId})
        on conflict (club_id, user_id) do nothing
      `;
	return { slug: rows[0]?.slug ?? slug };
});
var joinClub_createServerFn_handler = createServerRpc({
	id: "b1339361d99540f42bae654a8bfbadfc84d56280d029503a730b947b6b13e0b3",
	name: "joinClub",
	filename: "src/lib/tideline/api.ts"
}, (opts) => joinClub.__executeServer(opts));
var joinClub = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((clubId) => clubId).handler(joinClub_createServerFn_handler, async ({ context, data: clubId }) => {
	await ensureProfile(context.userId);
	await (await getSql())`
      insert into club_members (club_id, user_id)
      values (${clubId}, ${context.userId})
      on conflict (club_id, user_id) do nothing
    `;
	return { ok: true };
});
var leaveClub_createServerFn_handler = createServerRpc({
	id: "d51373d9ce833ea79d93c5a9de9177e5f56a79b922347718f39c68777156b5e8",
	name: "leaveClub",
	filename: "src/lib/tideline/api.ts"
}, (opts) => leaveClub.__executeServer(opts));
var leaveClub = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((clubId) => clubId).handler(leaveClub_createServerFn_handler, async ({ context, data: clubId }) => {
	const sql = await getSql();
	if ((await sql`
      select admin_user_id from clubs where id = ${clubId} limit 1
    `)[0]?.admin_user_id === context.userId) throw new Error("Admin cannot leave");
	await sql`
      delete from club_members
      where club_id = ${clubId} and user_id = ${context.userId}
    `;
	return { ok: true };
});
var updateClubSchema = object({
	clubId: number().int().positive(),
	name: string().trim().min(2).max(80),
	description: string().trim().max(400),
	spotId: number().int().positive().nullable(),
	whatsappUrl: string().trim().max(300)
});
var updateClub_createServerFn_handler = createServerRpc({
	id: "b318e0856d502799a03aded9b98b40143499b83a4f3916f2b51c6f69401f0342",
	name: "updateClub",
	filename: "src/lib/tideline/api.ts"
}, (opts) => updateClub.__executeServer(opts));
var updateClub = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => updateClubSchema.parse(input)).handler(updateClub_createServerFn_handler, async ({ context, data }) => {
	if (data.whatsappUrl && !isWhatsappUrl(data.whatsappUrl)) throw new Error("Invalid WhatsApp link");
	if (!(await (await getSql())`
      update clubs set
        name = ${data.name},
        description = ${data.description},
        spot_id = ${data.spotId},
        whatsapp_url = ${data.whatsappUrl || null}
      where id = ${data.clubId} and admin_user_id = ${context.userId}
      returning id
    `)[0]) throw new Error("Forbidden");
	return { ok: true };
});
var deleteClub_createServerFn_handler = createServerRpc({
	id: "2e58bb999ccf2b27a16450ba3dd58d3794d682431778b0635ff466f4bf71fd50",
	name: "deleteClub",
	filename: "src/lib/tideline/api.ts"
}, (opts) => deleteClub.__executeServer(opts));
var deleteClub = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((clubId) => clubId).handler(deleteClub_createServerFn_handler, async ({ context, data: clubId }) => {
	if (!(await (await getSql())`
      delete from clubs
      where id = ${clubId} and admin_user_id = ${context.userId}
      returning id
    `)[0]) throw new Error("Forbidden");
	return { ok: true };
});
var listClubMembers_createServerFn_handler = createServerRpc({
	id: "f7eab5e164bfd2f31e9d62b648723139eec61051ae330e063d2d7d90f4eb63f7",
	name: "listClubMembers",
	filename: "src/lib/tideline/api.ts"
}, (opts) => listClubMembers.__executeServer(opts));
var listClubMembers = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((clubId) => clubId).handler(listClubMembers_createServerFn_handler, async ({ context, data: clubId }) => {
	const sql = await getSql();
	const club = await sql`
      select admin_user_id from clubs where id = ${clubId} limit 1
    `;
	if (!club[0] || club[0].admin_user_id !== context.userId) throw new Error("Forbidden");
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
		isAdmin: row.user_id === context.userId
	}));
});
var removeClubMember_createServerFn_handler = createServerRpc({
	id: "7a32555c687e72ebfdad49120e75391e49ce93c2f4ecc3b4e3517115e09c42e4",
	name: "removeClubMember",
	filename: "src/lib/tideline/api.ts"
}, (opts) => removeClubMember.__executeServer(opts));
var removeClubMember = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	clubId: number(),
	userId: string().min(1)
}).parse(input)).handler(removeClubMember_createServerFn_handler, async ({ context, data }) => {
	if (data.userId === context.userId) throw new Error("Forbidden");
	const sql = await getSql();
	const club = await sql`
      select admin_user_id from clubs where id = ${data.clubId} limit 1
    `;
	if (!club[0] || club[0].admin_user_id !== context.userId) throw new Error("Forbidden");
	await sql`
      delete from club_members
      where club_id = ${data.clubId} and user_id = ${data.userId}
    `;
	return { ok: true };
});
var listSpotClubs_createServerFn_handler = createServerRpc({
	id: "c6432a8e2753f1f81bf003e5e431a168884e578fd2c69c61a1c8c9db883086b2",
	name: "listSpotClubs",
	filename: "src/lib/tideline/api.ts"
}, (opts) => listSpotClubs.__executeServer(opts));
var listSpotClubs = createServerFn({ method: "GET" }).validator((spotId) => spotId).handler(listSpotClubs_createServerFn_handler, async ({ data: spotId }) => {
	return (await (await getSql()).query(`select ${CLUB_SELECT}
       from clubs c
       left join spots s on s.id = c.spot_id
       left join profiles p on p.user_id = c.admin_user_id
       where c.spot_id = $1
       order by c.created_at desc`, [spotId])).map((row) => mapClub(row, {}));
});
var watchSourceSchema = _enum([
	"garmin",
	"suunto",
	"samsung",
	"apple"
]);
var importWorkoutSchema = object({
	source: watchSourceSchema,
	key: string().min(1).max(80),
	title: string().max(160),
	swamOn: string().min(8).max(12),
	distanceKm: number().positive().max(200),
	durationMin: number().positive().max(6e3),
	waterTempC: number().min(-2).max(40).nullable(),
	lat: number().min(-90).max(90).nullable(),
	lng: number().min(-180).max(180).nullable(),
	poolLike: boolean().optional(),
	spotId: number().int().positive().nullable().optional()
});
function mapWatchLink(row) {
	return {
		source: row.source,
		linkedAt: iso(row.linked_at),
		lastImportAt: row.last_import_at ? iso(row.last_import_at) : null,
		importCount: num(row.import_count)
	};
}
async function ensureWatchLink(userId, source) {
	await (await getSql())`
    insert into watch_links (user_id, source)
    values (${userId}, ${source})
    on conflict (user_id, source) do nothing
  `;
}
async function bumpWatchLink(userId, source, added) {
	await ensureWatchLink(userId, source);
	if (added <= 0) return;
	await (await getSql())`
    update watch_links
    set last_import_at = now(),
        import_count = import_count + ${added}
    where user_id = ${userId} and source = ${source}
  `;
}
var listWatchLinks_createServerFn_handler = createServerRpc({
	id: "4e9b4dad29c245bd328f048eb47609d01774476e0007bc2040c1f3f4b3a27b05",
	name: "listWatchLinks",
	filename: "src/lib/tideline/api.ts"
}, (opts) => listWatchLinks.__executeServer(opts));
var listWatchLinks = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listWatchLinks_createServerFn_handler, async ({ context }) => {
	return (await (await getSql())`
      select source, linked_at, last_import_at, import_count
      from watch_links
      where user_id = ${context.userId}
      order by linked_at asc
    `).map(mapWatchLink);
});
var linkWatch_createServerFn_handler = createServerRpc({
	id: "fc9dd245833e98d898277bebb63554e0ad7b6399e08383983043ef83ada16016",
	name: "linkWatch",
	filename: "src/lib/tideline/api.ts"
}, (opts) => linkWatch.__executeServer(opts));
var linkWatch = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => watchSourceSchema.parse(input)).handler(linkWatch_createServerFn_handler, async ({ context, data: source }) => {
	await ensureWatchLink(context.userId, source);
	return { ok: true };
});
var unlinkWatch_createServerFn_handler = createServerRpc({
	id: "d39c1eee243c8fc661471e25d1ab1964aa0310118d3624282660f25053a0b84a",
	name: "unlinkWatch",
	filename: "src/lib/tideline/api.ts"
}, (opts) => unlinkWatch.__executeServer(opts));
var unlinkWatch = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => watchSourceSchema.parse(input)).handler(unlinkWatch_createServerFn_handler, async ({ context, data: source }) => {
	await (await getSql())`
      delete from watch_links
      where user_id = ${context.userId} and source = ${source}
    `;
	return { ok: true };
});
var importWatchWorkouts_createServerFn_handler = createServerRpc({
	id: "60394d12e775dd093ced5234801bd6e1c469105b36e482a951234cf3c9b797ac",
	name: "importWatchWorkouts",
	filename: "src/lib/tideline/api.ts"
}, (opts) => importWatchWorkouts.__executeServer(opts));
var importWatchWorkouts = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({ workouts: array(importWorkoutSchema).min(1).max(25) }).parse(input)).handler(importWatchWorkouts_createServerFn_handler, async ({ context, data }) => {
	await ensureProfile(context.userId);
	const spots = await loadSpots({});
	const sql = await getSql();
	const results = [];
	const addedBySource = /* @__PURE__ */ new Map();
	for (const w of data.workouts) {
		if (w.poolLike) {
			results.push({
				key: w.key,
				status: "pool"
			});
			await logSyncEvent(context.userId, w.source, w.title, "pool", null);
			continue;
		}
		const dup = await sql`
        select id from swims
        where user_id = ${context.userId}
          and source = ${w.source}
          and source_key = ${w.key}
        limit 1
      `;
		if (dup[0]) {
			results.push({
				key: w.key,
				status: "duplicate",
				swimId: dup[0].id
			});
			await logSyncEvent(context.userId, w.source, w.title, "duplicate", dup[0].id);
			continue;
		}
		let chosen = w.spotId ? spots.find((s) => s.id === w.spotId) : void 0;
		let kmAway = null;
		if (!chosen && w.lat != null && w.lng != null) {
			const near = nearestByKm(spots, w.lat, w.lng);
			if (near) {
				kmAway = Math.round(near.km * 10) / 10;
				if (near.km <= 40) chosen = near.item;
			}
		}
		if (!chosen) {
			results.push({
				key: w.key,
				status: "needSpot",
				kmAway,
				spotName: null,
				spotSlug: null,
				spotId: null
			});
			await logSyncEvent(context.userId, w.source, w.title, "needSpot", null);
			continue;
		}
		if (w.lat != null && w.lng != null) kmAway = Math.round(haversineKm(chosen.lat, chosen.lng, w.lat, w.lng) * 10) / 10;
		const durationMin = Math.max(1, Math.round(w.durationMin));
		const rows = await sql`
        insert into swims (
          user_id, spot_id, swam_on, distance_km, duration_min,
          water_temp_c, conditions, feeling, notes, source, source_key
        ) values (
          ${context.userId}, ${chosen.id}, ${w.swamOn}, ${w.distanceKm},
          ${durationMin}, ${w.waterTempC}, null, null, null,
          ${w.source}, ${w.key}
        )
        returning id
      `;
		results.push({
			key: w.key,
			status: "ok",
			swimId: rows[0]?.id ?? 0,
			spotId: chosen.id,
			spotName: chosen.name,
			spotSlug: chosen.slug,
			kmAway
		});
		addedBySource.set(w.source, (addedBySource.get(w.source) ?? 0) + 1);
		await logSyncEvent(context.userId, w.source, w.title, "ok", rows[0]?.id ?? null);
	}
	const seen = new Set(data.workouts.map((w) => w.source));
	for (const source of seen) await bumpWatchLink(context.userId, source, addedBySource.get(source) ?? 0);
	return results;
});
async function logSyncEvent(userId, source, title, status, swimId) {
	try {
		await (await getSql())`
      insert into sync_events (user_id, source, title, status, swim_id)
      values (${userId}, ${source}, ${title}, ${status}, ${swimId})
    `;
	} catch {}
}
var listSyncEvents_createServerFn_handler = createServerRpc({
	id: "4d15a46db3ee25aa0179c499f7e37418ccca535d7f26512f9cc283e9f4919824",
	name: "listSyncEvents",
	filename: "src/lib/tideline/api.ts"
}, (opts) => listSyncEvents.__executeServer(opts));
var listSyncEvents = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listSyncEvents_createServerFn_handler, async ({ context }) => {
	try {
		return (await (await getSql())`
      select
        e.id, e.source, e.title, e.status, e.created_at,
        s.name as spot_name
      from sync_events e
      left join swims w on w.id = e.swim_id
      left join spots s on s.id = w.spot_id
      where e.user_id = ${context.userId}
      order by e.created_at desc
      limit 40
    `).map((row) => ({
			id: row.id,
			source: row.source,
			title: row.title,
			status: row.status,
			spotName: row.spot_name,
			createdAt: iso(row.created_at)
		}));
	} catch {
		return [];
	}
});
//#endregion
export { createClub_createServerFn_handler, createReport_createServerFn_handler, createSpot_createServerFn_handler, deleteClub_createServerFn_handler, deleteSwim_createServerFn_handler, getClub_createServerFn_handler, getHomeStats_createServerFn_handler, getMyClubAccess_createServerFn_handler, getMyProfile_createServerFn_handler, getMyStats_createServerFn_handler, getSpot_createServerFn_handler, importWatchWorkouts_createServerFn_handler, joinClub_createServerFn_handler, leaveClub_createServerFn_handler, linkWatch_createServerFn_handler, listClubMembers_createServerFn_handler, listClubs_createServerFn_handler, listFeed_createServerFn_handler, listGatherings_createServerFn_handler, listMyClubSlugs_createServerFn_handler, listMyRsvpIds_createServerFn_handler, listMySwims_createServerFn_handler, listReports_createServerFn_handler, listSavedSpotIds_createServerFn_handler, listSavedSpots_createServerFn_handler, listSpotClubs_createServerFn_handler, listSpotGatherings_createServerFn_handler, listSpotSwims_createServerFn_handler, listSpots_createServerFn_handler, listSyncEvents_createServerFn_handler, listWatchLinks_createServerFn_handler, logSwim_createServerFn_handler, removeClubMember_createServerFn_handler, saveMyPlace_createServerFn_handler, toggleRsvp_createServerFn_handler, toggleSaveSpot_createServerFn_handler, unlinkWatch_createServerFn_handler, updateClub_createServerFn_handler, updateMyProfile_createServerFn_handler };
