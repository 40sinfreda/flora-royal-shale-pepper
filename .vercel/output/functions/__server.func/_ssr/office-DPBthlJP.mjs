import { r as createServerFn } from "./ssr.mjs";
import { r as authMiddleware } from "./place-Bp16cyux.mjs";
import { cn as _enum, gn as object, hn as number, yn as string } from "../_libs/@better-auth/core+[...].mjs";
import { G as createSsrRpc } from "./router-PvLfXnWv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/office-DPBthlJP.js
var getOfficeAccess = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("2de6c2fe3d3d0fb5d039bdb9b1d1468ea1e5b7df75d3251bddd191cc5d26d8d9"));
var claimOffice = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("211ed994d6cc8d347cd9984d9cd7e55039505126ec5c5d44424ead5098c4ddc8"));
var officeStats = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("21cbf8a9d742fc79f5ed2a734e92ee77897f88776b66ab04865dd5a1112a0b0e"));
var officeListSpots = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("44b08e0951a4d8f8ce9f0bf7adee38655681633fb6e99a18e294d507492009b7"));
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
var officeCreateSpot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => spotWriteSchema.parse(input)).handler(createSsrRpc("11da9c5a4f8296b6e49bb841ea6a30d53479962dcc49f01b4c0d83b26861ce48"));
var spotUpdateSchema = spotWriteSchema.extend({ id: number().int().positive() });
var officeUpdateSpot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => spotUpdateSchema.parse(input)).handler(createSsrRpc("722f62c76bf81b72135b14e2501feac11e0c54fab1a046e3b663bbcce510cfa6"));
var officeDeleteSpot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => number().int().positive().parse(id)).handler(createSsrRpc("bbbc12ca5c2dc41c8326f4cfc976212f2f17495730156851309e1935d809bf95"));
var officeListClubs = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("d3ddf94b015cfe78c7a7ee64bf026dc381f23b81f14afd3cbdc9478fe5d437f7"));
var clubWriteSchema = object({
	name: string().trim().min(2).max(80),
	description: string().trim().max(400),
	country: string().trim().min(1).max(80),
	spotId: number().int().positive().nullable(),
	whatsappUrl: string().trim().max(300)
});
var officeCreateClub = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => clubWriteSchema.parse(input)).handler(createSsrRpc("cd8c06f2e04c709cad325720e1e4abe690d3a532c4e039dc033fc7cdc398d724"));
var clubUpdateSchema = clubWriteSchema.extend({ id: number().int().positive() });
var officeUpdateClub = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => clubUpdateSchema.parse(input)).handler(createSsrRpc("55e823419c9532150f7735b80e35e343b7a61c46e033bf2054708ce5a0eddc7b"));
var officeDeleteClub = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => number().int().positive().parse(id)).handler(createSsrRpc("f104c406d6108f7bb108f0209d63d67d25ad01e55a7804d2712ce67b3accb923"));
var officeListClubMembers = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((clubId) => number().int().positive().parse(clubId)).handler(createSsrRpc("0966cafcf289a8b9b000670571db2f01c717ad5447fb2e33f087f86d0d2af95c"));
var officeRemoveClubMember = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	clubId: number().int().positive(),
	userId: string().min(1)
}).parse(input)).handler(createSsrRpc("9fa3159a0caf8f4ec3f5b7403959e24d0c978fe93069a5b678dde741487e678c"));
var officeListGatherings = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("e3cb914a559afed1e02062dda696e07a907b79a638aeb71fd58cea7e6021180f"));
var gatheringWriteSchema = object({
	spotId: number().int().positive(),
	title: string().trim().min(2).max(120),
	startsAt: string().min(8),
	distanceKm: number().positive().max(200).nullable(),
	organizer: string().trim().min(1).max(80),
	notes: string().trim().max(400)
});
var officeCreateGathering = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => gatheringWriteSchema.parse(input)).handler(createSsrRpc("21371b01f4b705b6115244b461d3ed8e1d590244df5d0d3356b45d78138b7bd3"));
var gatheringUpdateSchema = gatheringWriteSchema.extend({ id: number().int().positive() });
var officeUpdateGathering = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => gatheringUpdateSchema.parse(input)).handler(createSsrRpc("aae7682e294ae51a36e393686a7ab1fd4ed530ed0ad1524e1d702248c0baf8ae"));
var officeDeleteGathering = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => number().int().positive().parse(id)).handler(createSsrRpc("3dbf8107cf64ca6e34f1b9021be053a5cd807beb85dc9cd6667125726d43b9d9"));
var officeListStories = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("b9186e465a253d4117bce65adaa31122698416b9c0da059aef5d2e206513bd87"));
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
var officeCreateStory = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => storyWriteSchema.parse(input)).handler(createSsrRpc("bd3968a632f7337d5a21c7564b1dad2c941b68bfc43cf9c1526e4a45805de97e"));
var storyUpdateSchema = storyWriteSchema.extend({ id: number().int().positive() });
var officeUpdateStory = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => storyUpdateSchema.parse(input)).handler(createSsrRpc("303cb302741f882b91aa2824289ba13c2b83e5349b20ba5b77771a0c6ea10439"));
var officeDeleteStory = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => number().int().positive().parse(id)).handler(createSsrRpc("72a23a96a020c057122a1b5e5377f5c171f0347de61fff135f7277ff886d0b30"));
var officeListReports = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("a584bc0558d1406669b675d62a21ce035d624b25cbb0a592af1bc5ec32ce08f1"));
var officeDeleteReport = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => number().int().positive().parse(id)).handler(createSsrRpc("350e211ee4c8593bcdd92823c5a7a9d2e88c79c5ba322e361520225045be19ea"));
var officeListSwims = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("7b4b63ea80f7631a1b7b403b21b92167043909bf590cef3b33b15afe11805818"));
var swimUpdateSchema = object({
	id: number().int().positive(),
	spotId: number().int().positive(),
	swamOn: string().min(8),
	distanceKm: number().positive().max(200),
	durationMin: number().int().positive().max(6e3).nullable(),
	waterTempC: number().min(-2).max(40).nullable(),
	notes: string().max(600).nullable()
});
var officeUpdateSwim = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => swimUpdateSchema.parse(input)).handler(createSsrRpc("488f6365257e3faab4df0b23313e6ce3a4b404d821c5d5d44c40e447b86ca22b"));
var officeDeleteSwim = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => number().int().positive().parse(id)).handler(createSsrRpc("c6a358b966cd5dfcb412e872bb7cbb8fa4f133125390a81828c656c73d3170be"));
var officeListPeople = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("310eb9fdb08236ae1201c2f593824a07a4f0cad2042c4b00236888816070ef79"));
var personUpdateSchema = object({
	userId: string().min(1),
	displayName: string().trim().min(1).max(80),
	homeWater: string().trim().max(80),
	stroke: string().trim().max(40),
	bio: string().trim().max(400),
	country: string().trim().max(80)
});
var officeUpdatePerson = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => personUpdateSchema.parse(input)).handler(createSsrRpc("79c474c1bc5f69e5d3245eb5d77e30b8fb66cc35b5a04319c4e369c502ffd160"));
var officeDeletePerson = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((userId) => string().min(1).parse(userId)).handler(createSsrRpc("6844b4b64b701371c764eae7fae3391056f2d6c2b8211e93b872a280bc25780a"));
//#endregion
export { officeStats as C, officeUpdateSpot as D, officeUpdatePerson as E, officeUpdateStory as O, officeRemoveClubMember as S, officeUpdateGathering as T, officeListPeople as _, officeCreateSpot as a, officeListStories as b, officeDeleteGathering as c, officeDeleteSpot as d, officeDeleteStory as f, officeListGatherings as g, officeListClubs as h, officeCreateGathering as i, officeUpdateSwim as k, officeDeletePerson as l, officeListClubMembers as m, getOfficeAccess as n, officeCreateStory as o, officeDeleteSwim as p, officeCreateClub as r, officeDeleteClub as s, claimOffice as t, officeDeleteReport as u, officeListReports as v, officeUpdateClub as w, officeListSwims as x, officeListSpots as y };
