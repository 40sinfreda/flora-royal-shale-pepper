import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as COUNTRIES } from "./place-Bp16cyux.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { U as Page, ft as Button, ht as countryLabel, i as createSpot, lt as useCurrentUserState, tt as isUnauthorized, vt as usePlaceStore, yt as useT } from "./router-PvLfXnWv.mjs";
import { n as Label, t as Input } from "./label-uWd1WSk2.mjs";
import { t as Select } from "./select-CDibZZWI.mjs";
import { t as Textarea } from "./textarea-BW0kypl0.mjs";
import { t as Skeleton } from "./skeleton-BvVD9v0T.mjs";
import { t as RedirectToSignIn } from "./gates-TlwD99gA.mjs";
import { i as WATER_TYPES, n as DIFFICULTIES } from "./types-DAe4BlRl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/spots.new-DLbxUHuZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewSpotPage() {
	const t = useT();
	const locale = usePlaceStore((s) => s.locale);
	const place = usePlaceStore((s) => s.place);
	const { user, isPending } = useCurrentUserState();
	const navigate = useNavigate();
	const [name, setName] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("");
	const [country, setCountry] = (0, import_react.useState)(place?.country ?? "Israel");
	const [waterType, setWaterType] = (0, import_react.useState)("sea");
	const [difficulty, setDifficulty] = (0, import_react.useState)("gentle");
	const [typicalKm, setTypicalKm] = (0, import_react.useState)("");
	const [typicalTempC, setTypicalTempC] = (0, import_react.useState)("");
	const [bestSeason, setBestSeason] = (0, import_react.useState)("");
	const [hazards, setHazards] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [lat, setLat] = (0, import_react.useState)("");
	const [lng, setLng] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-11 w-48" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-6 h-80 w-full rounded-xl" })] });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		className: "max-w-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-widest text-accent",
				children: t("spotNew.kicker")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl font-medium tracking-tight text-fg",
				children: t("spotNew.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: t("spotNew.lead")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 space-y-5",
				onSubmit: async (e) => {
					e.preventDefault();
					setBusy(true);
					try {
						const res = await createSpot({ data: {
							name,
							city,
							country,
							waterType,
							difficulty,
							typicalKm: typicalKm ? Number(typicalKm) : null,
							typicalTempC: typicalTempC ? Number(typicalTempC) : null,
							bestSeason,
							hazards,
							description,
							lat: lat ? Number(lat) : null,
							lng: lng ? Number(lng) : null
						} });
						navigate({
							to: "/spots/$slug",
							params: { slug: res.slug }
						});
					} catch (err) {
						if (isUnauthorized(err)) window.location.href = "/login";
						else {
							const msg = err instanceof Error ? err.message : String(err);
							toast.error(/pool|בריכ/i.test(msg) ? t("spotNew.poolErr") : t("spotNew.err"));
						}
						setBusy(false);
					}
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("spotNew.name"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							required: true,
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: t("spotNew.namePh")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("spotNew.city"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								value: city,
								onChange: (e) => setCity(e.target.value)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("spotNew.country"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								value: country,
								onChange: (e) => setCountry(e.target.value),
								children: COUNTRIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c.name,
									children: countryLabel(locale, c.name)
								}, c.name))
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("spotNew.water"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								value: waterType,
								onChange: (e) => setWaterType(e.target.value),
								children: WATER_TYPES.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: w,
									children: t(`water.${w}`)
								}, w))
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("spotNew.grade"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								value: difficulty,
								onChange: (e) => setDifficulty(e.target.value),
								children: DIFFICULTIES.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: d,
									children: t(`grade.${d}`)
								}, d))
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("spotNew.km"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: .1,
								step: .1,
								value: typicalKm,
								onChange: (e) => setTypicalKm(e.target.value)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("spotNew.temp"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								step: .5,
								value: typicalTempC,
								onChange: (e) => setTypicalTempC(e.target.value)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("spotNew.season"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: bestSeason,
							onChange: (e) => setBestSeason(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("spotNew.hazards"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: hazards,
							onChange: (e) => setHazards(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("spotNew.desc"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							required: true,
							value: description,
							onChange: (e) => setDescription(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("spotNew.lat"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								step: "0.0001",
								value: lat,
								onChange: (e) => setLat(e.target.value)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("spotNew.lng"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								step: "0.0001",
								value: lng,
								onChange: (e) => setLng(e.target.value)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						disabled: busy,
						children: busy ? t("spotNew.saving") : t("spotNew.submit")
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
export { NewSpotPage as component };
