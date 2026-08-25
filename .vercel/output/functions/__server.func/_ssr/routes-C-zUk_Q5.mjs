import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as ArrowRight } from "../_libs/lucide-react.mjs";
import { A as listSpots, Q as formatKm, U as Page, _t as usePlaceFilter, b as listGatherings, c as getHomeStats, ft as Button, ut as useLoad, v as listClubs, vt as usePlaceStore, y as listFeed, yt as useT } from "./router-PvLfXnWv.mjs";
import { a as SeaBackdrop, i as SEA, s as TideRule } from "./router-PvLfXnWv2.mjs";
import { t as GatheringCard } from "./gathering-card-CmawUDb6.mjs";
import { t as Skeleton } from "./skeleton-BvVD9v0T.mjs";
import { t as ClubCard } from "./club-card-BMchp_ZZ.mjs";
import { t as SpotCard } from "./spot-card-DUmpCoCF.mjs";
import { t as Atlas } from "./atlas-4EXrtIJy.mjs";
import { t as FeedList } from "./feed-D67bFDPD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C-zUk_Q5.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const t = useT();
	const locale = usePlaceStore((s) => s.locale);
	const filter = usePlaceFilter();
	const key = `${filter.country ?? ""}:${filter.region ?? ""}`;
	const spots = useLoad(() => listSpots({ data: filter }), [key]);
	const feed = useLoad(() => listFeed({ data: filter }), [key]);
	const gatherings = useLoad(() => listGatherings({ data: filter }), [key]);
	const clubs = useLoad(() => listClubs({ data: filter }), [key]);
	const stats = useLoad(() => getHomeStats({ data: filter }), [key]);
	const featured = (spots.data ?? []).slice(0, 4);
	const upcoming = (gatherings.data ?? []).slice(0, 3);
	const clubPreview = (clubs.data ?? []).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeaBackdrop, {
		src: SEA.hero,
		className: "min-h-[32rem] border-b border-line sm:min-h-[36rem]",
		priority: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-[32rem] max-w-6xl flex-col justify-end px-4 pb-12 pt-10 sm:min-h-[36rem] sm:px-6 sm:pb-16 sm:pt-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rise-in text-xs font-medium tracking-wide text-accent",
					children: t("home.kicker")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "rise-in mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight text-fg sm:text-6xl",
					children: t("home.title")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rise-in mt-4 max-w-lg text-base leading-relaxed text-fg/90 sm:text-lg",
					children: t("home.lead")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rise-in mt-4 max-w-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TideRule, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rise-in mt-8 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/spots",
							children: [t("home.explore"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 rtl:rotate-180" })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						variant: "outline",
						className: "bg-bg/40 backdrop-blur-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/log",
							children: t("home.log")
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: t("home.statSpots"),
							value: String(stats.data?.spots ?? 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: t("home.statGatherings"),
							value: String(stats.data?.gatherings ?? 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: t("home.statKm"),
							value: stats.data && stats.data.kmLogged > 0 ? formatKm(stats.data.kmLogged, locale) : t("home.kmEmpty")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: t("home.statSwims"),
							value: String(stats.data?.swims ?? 0)
						})
					]
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Page, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-14",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
				kicker: t("home.atlasKicker"),
				title: t("home.atlasTitle"),
				to: "/spots",
				action: t("home.allSpots")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: spots.loading && !spots.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "aspect-[2/1] w-full rounded-xl" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atlas, { spots: spots.data ?? [] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-4 sm:grid-cols-2",
				children: featured.map((spot) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotCard, {
					spot,
					featured: true
				}, spot.id))
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "grid gap-10 lg:grid-cols-[1.2fr_0.8fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
				kicker: t("home.tideKicker"),
				title: t("home.tideTitle")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: feed.loading && !feed.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-40 rounded-xl" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedList, { items: feed.data ?? [] })
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
					kicker: t("home.gatherKicker"),
					title: t("home.gatherTitle"),
					to: "/events",
					action: t("home.allGatherings")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex flex-col gap-3",
					children: upcoming.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GatheringCard, { event }, event.id))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
					kicker: t("home.groupsKicker"),
					title: t("home.groupsTitle"),
					to: "/groups",
					action: t("home.allGroups")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex flex-col gap-3",
					children: clubPreview.map((club) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClubCard, { club }, club.id))
				})] })]
			})]
		})]
	}) })] });
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-bg/55 px-4 py-3 backdrop-blur-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs uppercase tracking-widest text-fg/70",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 font-display text-2xl font-semibold text-fg tabular-nums",
			children: value
		})]
	});
}
function SectionHead({ kicker, title, to, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium uppercase tracking-widest text-accent",
			children: kicker
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-1 font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl",
			children: title
		})] }), to && action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to,
			className: "hidden text-sm text-muted hover:text-fg sm:inline",
			children: action
		}) : null]
	});
}
//#endregion
export { Home as component };
