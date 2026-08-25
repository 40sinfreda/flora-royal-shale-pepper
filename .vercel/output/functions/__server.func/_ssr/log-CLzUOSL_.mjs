import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as format } from "../_libs/date-fns.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as listSpots, N as logSwim, U as Page, at as localizeSpotField, ft as Button, lt as useCurrentUserState, nt as localizeCity, tt as isUnauthorized, ut as useLoad, vt as usePlaceStore, yt as useT } from "./router-PvLfXnWv.mjs";
import { t as Route$12 } from "./router-PvLfXnWv2.mjs";
import { n as Label, t as Input } from "./label-uWd1WSk2.mjs";
import { t as Select } from "./select-CDibZZWI.mjs";
import { t as Textarea } from "./textarea-BW0kypl0.mjs";
import { t as Skeleton } from "./skeleton-BvVD9v0T.mjs";
import { t as RedirectToSignIn } from "./gates-TlwD99gA.mjs";
import { r as FEELINGS, t as CONDITIONS } from "./types-DAe4BlRl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/log-CLzUOSL_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LogPage() {
	const t = useT();
	const locale = usePlaceStore((s) => s.locale);
	const place = usePlaceStore((s) => s.place);
	const { user, isPending } = useCurrentUserState();
	const { spot: preset } = Route$12.useSearch();
	const spots = useLoad(() => listSpots({ data: {} }));
	const [spotId, setSpotId] = (0, import_react.useState)("");
	const [swamOn, setSwamOn] = (0, import_react.useState)(format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"));
	const [distanceKm, setDistanceKm] = (0, import_react.useState)("2");
	const [durationMin, setDurationMin] = (0, import_react.useState)("");
	const [waterTempC, setWaterTempC] = (0, import_react.useState)("");
	const [conditions, setConditions] = (0, import_react.useState)("glass");
	const [feeling, setFeeling] = (0, import_react.useState)("solid");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!spots.data) return;
		if (preset) {
			const match = spots.data.find((s) => s.slug === preset);
			if (match) {
				setSpotId(String(match.id));
				return;
			}
		}
		if (!spotId && place?.country) {
			const local = spots.data.find((s) => s.country === place.country);
			if (local) setSpotId(String(local.id));
		}
	}, [
		spots.data,
		preset,
		place?.country,
		spotId
	]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-11 w-48" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-6 h-80 w-full rounded-xl" })] });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	const ordered = [...spots.data ?? []].sort((a, b) => {
		return (place?.country === a.country ? 0 : 1) - (place?.country === b.country ? 0 : 1) || a.name.localeCompare(b.name);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		className: "max-w-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-widest text-accent",
				children: t("log.kicker")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl font-medium tracking-tight text-fg",
				children: t("log.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: t("log.lead")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/sync",
				className: "mt-3 inline-flex h-11 items-center text-sm text-accent hover:underline",
				children: t("log.syncCta")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 space-y-5",
				onSubmit: async (e) => {
					e.preventDefault();
					if (!spotId) {
						toast.error(t("log.needSpot"));
						return;
					}
					setBusy(true);
					try {
						await logSwim({ data: {
							spotId: Number(spotId),
							swamOn,
							distanceKm: Number(distanceKm),
							durationMin: durationMin ? Number(durationMin) : null,
							waterTempC: waterTempC ? Number(waterTempC) : null,
							conditions,
							feeling,
							notes: notes.trim() || null,
							displayName: user.displayName ?? void 0
						} });
						toast(t("toast.swim"));
						setNotes("");
						window.location.href = "/profile";
					} catch (err) {
						if (isUnauthorized(err)) window.location.href = "/login";
						else toast.error(t("toast.swimFail"));
						setBusy(false);
					}
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("log.spot"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							required: true,
							value: spotId,
							onChange: (e) => setSpotId(e.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: t("log.choose")
							}), ordered.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: s.id,
								children: [
									localizeSpotField(locale, s.slug, "name", s.name),
									", ",
									localizeCity(locale, s.city)
								]
							}, s.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("log.date"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								required: true,
								value: swamOn,
								onChange: (e) => setSwamOn(e.target.value)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("log.km"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								required: true,
								min: .1,
								step: .1,
								value: distanceKm,
								onChange: (e) => setDistanceKm(e.target.value)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("log.time"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 1,
								placeholder: t("log.optional"),
								value: durationMin,
								onChange: (e) => setDurationMin(e.target.value)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("log.temp"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								step: .5,
								placeholder: t("log.optional"),
								value: waterTempC,
								onChange: (e) => setWaterTempC(e.target.value)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("log.conditions"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								value: conditions,
								onChange: (e) => setConditions(e.target.value),
								children: CONDITIONS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c,
									children: t(`cond.${c}`)
								}, c))
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("log.feeling"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								value: feeling,
								onChange: (e) => setFeeling(e.target.value),
								children: FEELINGS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c,
									children: t(`feel.${c}`)
								}, c))
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("log.notes"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: notes,
							onChange: (e) => setNotes(e.target.value),
							placeholder: t("log.notesPh")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						disabled: busy,
						children: busy ? t("log.saving") : t("log.submit")
					})
				]
			})
		]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
//#endregion
export { LogPage as component };
