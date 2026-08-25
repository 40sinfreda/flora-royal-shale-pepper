import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { U as Page, _t as usePlaceFilter, ft as Button, h as leaveClub, lt as useCurrentUserState, m as joinClub, tt as isUnauthorized, ut as useLoad, v as listClubs, x as listMyClubSlugs, yt as useT } from "./router-PvLfXnWv.mjs";
import { i as SEA, o as SeaPhoto } from "./router-PvLfXnWv2.mjs";
import { t as ClubCard } from "./club-card-BMchp_ZZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/groups.index-BuYuKLHL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GroupsPage() {
	const t = useT();
	const filter = usePlaceFilter();
	const key = `${filter.country ?? ""}:${filter.region ?? ""}`;
	const { user, isPending } = useCurrentUserState();
	const clubs = useLoad(() => listClubs({ data: filter }), [key]);
	const mine = useLoad(async () => {
		if (isPending || !user) return [];
		try {
			return await listMyClubSlugs();
		} catch (err) {
			if (isUnauthorized(err)) return [];
			throw err;
		}
	}, [user?.id, isPending]);
	const [busyId, setBusyId] = (0, import_react.useState)(null);
	const items = (clubs.data ?? []).map((club) => ({
		...club,
		isMember: club.isMember || Boolean(mine.data?.includes(club.slug))
	}));
	async function onJoin(id) {
		if (!user) {
			window.location.href = "/login";
			return;
		}
		setBusyId(id);
		try {
			await joinClub({ data: id });
			toast(t("toast.joined"));
			clubs.reload();
			mine.reload();
		} catch (err) {
			if (isUnauthorized(err)) window.location.href = "/login";
			else toast.error(t("toast.clubFail"));
		} finally {
			setBusyId(null);
		}
	}
	async function onLeave(id) {
		setBusyId(id);
		try {
			await leaveClub({ data: id });
			toast(t("toast.left"));
			clubs.reload();
			mine.reload();
		} catch {
			toast.error(t("group.cannotLeave"));
		} finally {
			setBusyId(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-widest text-accent",
					children: t("groups.kicker")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl font-semibold tracking-tight text-fg",
					children: t("groups.title")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-muted",
					children: t("groups.lead")
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/groups/new",
					children: t("groups.create")
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 flex flex-col gap-4",
			children: items.map((club) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClubCard, {
				club,
				busy: busyId === club.id,
				onJoin,
				onLeave
			}, club.id))
		}),
		items.length === 0 && !clubs.loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-[16/7] min-h-40",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeaPhoto, {
						src: SEA.swimmers,
						alt: ""
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "absolute inset-x-5 bottom-5 text-start text-sm text-fg",
						children: t("groups.empty")
					})
				]
			})
		}) : null
	] });
}
//#endregion
export { GroupsPage as component };
