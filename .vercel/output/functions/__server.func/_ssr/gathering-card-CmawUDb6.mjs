import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Users, n as Waves, u as MapPin } from "../_libs/lucide-react.mjs";
import { Q as formatKm, X as formatDateTime, at as localizeSpotField, ft as Button, it as localizeEventField, st as placeLine, vt as usePlaceStore, yt as useT } from "./router-PvLfXnWv.mjs";
import { h as spotPhoto, o as SeaPhoto } from "./router-PvLfXnWv2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gathering-card-CmawUDb6.js
var import_jsx_runtime = require_jsx_runtime();
function GatheringCard({ event, onToggle, busy }) {
	const t = useT();
	const locale = usePlaceStore((s) => s.locale);
	const spotName = localizeSpotField(locale, event.spotSlug, "name", event.spotName);
	const title = localizeEventField(locale, event.title, "title", event.title);
	const notes = localizeEventField(locale, event.title, "notes", event.notes ?? "");
	const organizer = localizeEventField(locale, event.title, "organizer", event.organizer);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-28",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeaPhoto, {
				src: spotPhoto(event.spotSlug, "sea"),
				alt: ""
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-surface to-transparent" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-widest text-accent",
					children: formatDateTime(event.startsAt, locale)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 font-display text-xl font-semibold text-fg",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 flex items-center gap-1.5 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/spots/$slug",
							params: { slug: event.spotSlug },
							className: "hover:text-fg",
							children: spotName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-faint",
							children: ["· ", placeLine(event.city, event.country, locale)]
						})
					]
				}),
				notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: notes
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 text-xs text-faint",
						children: [
							event.distanceKm != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waves, { className: "size-3.5" }), formatKm(event.distanceKm, locale)]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5" }), t("gather.goingCount", { n: event.rsvpCount })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: organizer })
						]
					}), onToggle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: event.going ? "subtle" : "primary",
						disabled: busy,
						onClick: () => onToggle(event.id),
						children: event.going ? t("gather.leave") : t("gather.going")
					}) : null]
				})
			]
		})]
	});
}
//#endregion
export { GatheringCard as t };
