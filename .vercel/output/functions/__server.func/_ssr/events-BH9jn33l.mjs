import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { I as toggleRsvp, S as listMyRsvpIds, U as Page, _t as usePlaceFilter, b as listGatherings, lt as useCurrentUserState, tt as isUnauthorized, ut as useLoad, yt as useT } from "./router-PvLfXnWv.mjs";
import { i as SEA, o as SeaPhoto } from "./router-PvLfXnWv2.mjs";
import { t as GatheringCard } from "./gathering-card-CmawUDb6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/events-BH9jn33l.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EventsPage() {
	const t = useT();
	const filter = usePlaceFilter();
	const key = `${filter.country ?? ""}:${filter.region ?? ""}`;
	const { user, isPending } = useCurrentUserState();
	const gatherings = useLoad(() => listGatherings({ data: filter }), [key]);
	const itemsBase = gatherings.data ?? [];
	const rsvps = useLoad(async () => {
		if (isPending || !user) return [];
		try {
			return await listMyRsvpIds();
		} catch (err) {
			if (isUnauthorized(err)) return [];
			throw err;
		}
	}, [user?.id, isPending]);
	const [busyId, setBusyId] = (0, import_react.useState)(null);
	const items = itemsBase.map((event) => ({
		...event,
		going: Boolean(rsvps.data?.includes(event.id))
	}));
	async function onToggle(id) {
		if (!user) {
			window.location.href = "/login";
			return;
		}
		setBusyId(id);
		try {
			const res = await toggleRsvp({ data: id });
			toast(res.going ? t("toast.rsvpYes") : t("toast.rsvpNo"));
			rsvps.reload();
			gatherings.reload();
		} catch (err) {
			if (isUnauthorized(err)) window.location.href = "/login";
			else toast.error(t("toast.rsvpFail"));
		} finally {
			setBusyId(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium uppercase tracking-widest text-accent",
			children: t("events.kicker")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-4xl font-semibold tracking-tight text-fg",
			children: t("events.title")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-xl text-muted",
			children: t("events.lead")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 flex flex-col gap-4",
			children: items.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GatheringCard, {
				event,
				busy: busyId === event.id,
				onToggle
			}, event.id))
		}),
		items.length === 0 && !gatherings.loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 overflow-hidden rounded-xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-40",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeaPhoto, {
						src: SEA.sunset,
						alt: ""
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "absolute inset-x-5 bottom-5 text-sm text-fg",
						children: [
							t("events.empty"),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/spots",
								className: "text-accent",
								children: t("events.chart")
							})
						]
					})
				]
			})
		}) : null
	] });
}
//#endregion
export { EventsPage as component };
