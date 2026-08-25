import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Waves } from "../_libs/lucide-react.mjs";
import { $ as formatTemp, J as feelingLabel, Q as formatKm, W as conditionLabel, X as formatDateTime, Y as formatDate, Z as formatDuration, at as localizeSpotField, ct as sourceLabel, et as initials, mt as cn, q as dispatchKindLabel, rt as localizeDispatchField, st as placeLine, vt as usePlaceStore, yt as useT } from "./router-PvLfXnWv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/feed-D67bFDPD.js
var import_jsx_runtime = require_jsx_runtime();
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]", className),
		...props
	});
}
function FeedList({ items }) {
	const t = useT();
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "py-12 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waves, { className: "mx-auto size-6 text-accent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-display text-lg text-fg",
				children: t("feed.quiet")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: t("feed.quietLead")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/log",
				className: "mt-4 inline-flex h-11 items-center rounded-md bg-accent px-4 text-sm font-medium text-accent-fg",
				children: t("nav.log")
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "flex flex-col gap-3",
		children: items.map((item) => item.kind === "swim" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwimCard, { item }) }, `swim-${item.swim.id}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DispatchCard, { item }) }, `dispatch-${item.dispatch.id}`))
	});
}
function SwimCard({ item }) {
	const t = useT();
	const locale = usePlaceStore((s) => s.locale);
	const swim = item.swim;
	const spotName = localizeSpotField(locale, swim.spotSlug, "name", swim.spotName);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-10 shrink-0 place-items-center rounded-full bg-raised text-xs font-medium text-accent",
				children: initials(swim.swimmerName)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-fg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: swim.swimmerName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [
									" ",
									t("feed.swam"),
									" "
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/spots/$slug",
								params: { slug: swim.spotSlug },
								className: "font-medium text-accent hover:underline",
								children: spotName
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 text-xs text-faint",
						children: [
							placeLine(swim.city, swim.country, locale),
							" · ",
							formatDate(swim.swamOn, locale)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, { children: formatKm(swim.distanceKm, locale) }),
							swim.durationMin != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, { children: formatDuration(swim.durationMin, locale) }) : null,
							swim.waterTempC != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, { children: formatTemp(swim.waterTempC) }) : null,
							swim.conditions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, { children: conditionLabel(swim.conditions, locale) }) : null,
							swim.feeling ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, { children: feelingLabel(swim.feeling, locale) }) : null,
							swim.source && swim.source !== "manual" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, { children: sourceLabel(swim.source, locale) }) : null
						]
					}),
					swim.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: swim.notes
					}) : null
				]
			})]
		})
	});
}
function DispatchCard({ item }) {
	const t = useT();
	const locale = usePlaceStore((s) => s.locale);
	const d = item.dispatch;
	const spotName = d.spotSlug ? localizeSpotField(locale, d.spotSlug, "name", d.spotName ?? "") : d.spotName;
	const title = localizeDispatchField(locale, d.title, "title", d.title);
	const body = localizeDispatchField(locale, d.title, "body", d.body);
	const location = localizeDispatchField(locale, d.title, "location", d.locationLabel ?? "") || spotName;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs font-medium uppercase tracking-widest text-accent",
				children: [
					t("feed.dispatch"),
					" · ",
					dispatchKindLabel(d.kind, locale)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-1 font-display text-lg font-medium text-fg",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-faint",
				children: [
					location,
					" · ",
					formatDateTime(d.publishedAt, locale)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-muted",
				children: body
			}),
			d.spotSlug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/spots/$slug",
				params: { slug: d.spotSlug },
				className: "mt-3 inline-block text-sm text-accent hover:underline",
				children: t("feed.open", { name: spotName ?? "" })
			}) : null
		]
	});
}
function Meta({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "rounded-full bg-raised px-2.5 py-1 text-xs text-muted",
		children
	});
}
//#endregion
export { FeedList as t };
