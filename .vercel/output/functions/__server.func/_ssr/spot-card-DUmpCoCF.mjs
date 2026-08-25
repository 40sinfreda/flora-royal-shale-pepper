import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as MapPin } from "../_libs/lucide-react.mjs";
import { $ as formatTemp, K as difficultyLabel, Q as formatKm, dt as waterLabel, gt as regionLabel, ht as countryLabel, mt as cn, ot as localizedSpot, vt as usePlaceStore } from "./router-PvLfXnWv.mjs";
import { h as spotPhoto, o as SeaPhoto } from "./router-PvLfXnWv2.mjs";
import { t as Badge } from "./badge-BAMbVlLv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/spot-card-DUmpCoCF.js
var import_jsx_runtime = require_jsx_runtime();
function SpotCard({ spot, featured = false }) {
	const locale = usePlaceStore((s) => s.locale);
	const s = localizedSpot(spot, locale);
	const photo = spotPhoto(spot.slug, spot.waterType);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/spots/$slug",
		params: { slug: spot.slug },
		className: cn("group block overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)] transition-[transform,background-color] duration-200 ease-out hover:bg-raised"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("relative overflow-hidden", featured ? "aspect-[16/8]" : "aspect-[16/9]"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeaPhoto, {
				src: photo,
				alt: "",
				className: "transition-transform duration-500 ease-out group-hover:scale-[1.04]"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface to-transparent" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("p-5", featured && "p-6"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-widest text-accent",
							children: regionLabel(locale, s.region)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 font-display text-xl font-semibold tracking-tight text-fg",
							children: s.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 flex items-center gap-1.5 text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }),
								s.city,
								", ",
								countryLabel(locale, spot.country)
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: difficultyLabel(s.difficulty, locale) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 line-clamp-3 text-sm leading-relaxed text-muted",
					children: s.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2 text-xs text-faint",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: waterLabel(s.waterType, locale) }),
						s.typicalKm != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["· ", formatKm(s.typicalKm, locale)] }) : null,
						s.typicalTempC != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["· ", formatTemp(s.typicalTempC)] }) : null
					]
				})
			]
		})]
	});
}
//#endregion
export { SpotCard as t };
