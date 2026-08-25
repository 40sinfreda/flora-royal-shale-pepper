import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as listSpots, U as Page, _t as usePlaceFilter, ft as Button, mt as cn, ut as useLoad, yt as useT } from "./router-PvLfXnWv.mjs";
import { t as Skeleton } from "./skeleton-BvVD9v0T.mjs";
import { i as WATER_TYPES, n as DIFFICULTIES } from "./types-DAe4BlRl.mjs";
import { t as SpotCard } from "./spot-card-DUmpCoCF.mjs";
import { t as Atlas } from "./atlas-4EXrtIJy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/spots.index-BRRqnCij.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SpotsPage() {
	const t = useT();
	const filter = usePlaceFilter();
	const key = `${filter.country ?? ""}:${filter.region ?? ""}`;
	const loaded = useLoad(() => listSpots({ data: filter }), [key]);
	const data = loaded.data ?? [];
	const [water, setWater] = (0, import_react.useState)("all");
	const [difficulty, setDifficulty] = (0, import_react.useState)("all");
	const filtered = (0, import_react.useMemo)(() => {
		return data.filter((s) => {
			if (water !== "all" && s.waterType !== water) return false;
			if (difficulty !== "all" && s.difficulty !== difficulty) return false;
			return true;
		});
	}, [
		data,
		water,
		difficulty
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-widest text-accent",
					children: t("spots.kicker")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl font-semibold tracking-tight text-fg",
					children: t("spots.title")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-muted",
					children: t("spots.lead")
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/spots/new",
					children: t("spots.add")
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8",
			children: loaded.loading && !loaded.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "aspect-[2/1] w-full rounded-xl" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atlas, { spots: filtered.length ? filtered : data })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 flex flex-col gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterRow, {
				label: t("spots.filterWater"),
				value: water,
				onChange: setWater,
				options: ["all", ...WATER_TYPES],
				t,
				kind: "water"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterRow, {
				label: t("spots.filterGrade"),
				value: difficulty,
				onChange: setDifficulty,
				options: ["all", ...DIFFICULTIES],
				t,
				kind: "grade"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 text-sm text-faint",
			children: filtered.length === 1 ? t("spots.countOne") : t("spots.count", { n: filtered.length })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid gap-4 sm:grid-cols-2",
			children: filtered.map((spot) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotCard, { spot }, spot.id))
		}),
		filtered.length === 0 && !loaded.loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 text-sm text-muted",
			children: t("spots.empty")
		}) : null
	] });
}
function FilterRow({ label, value, onChange, options, t, kind }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "w-16 shrink-0 text-xs uppercase tracking-widest text-faint",
			children: label
		}), options.map((opt) => {
			const text = opt === "all" ? t("spots.filterAll") : kind === "water" ? t(`water.${opt}`) : t(`grade.${opt}`);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onChange(opt),
				className: cn("h-11 rounded-full px-3.5 text-sm capitalize transition-colors duration-150", value === opt ? "bg-accent text-accent-fg" : "bg-raised text-muted hover:text-fg"),
				children: text
			}, opt);
		})]
	});
}
//#endregion
export { SpotsPage as component };
