import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as isWhatsappUrl, t as COUNTRIES } from "./place-Bp16cyux.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as listSpots, U as Page, _t as usePlaceFilter, at as localizeSpotField, ft as Button, ht as countryLabel, lt as useCurrentUserState, n as createClub, tt as isUnauthorized, ut as useLoad, vt as usePlaceStore, yt as useT } from "./router-PvLfXnWv.mjs";
import { n as Label, t as Input } from "./label-uWd1WSk2.mjs";
import { t as Select } from "./select-CDibZZWI.mjs";
import { t as Textarea } from "./textarea-BW0kypl0.mjs";
import { t as Skeleton } from "./skeleton-BvVD9v0T.mjs";
import { t as RedirectToSignIn } from "./gates-TlwD99gA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/groups.new-BBd6aqwn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewGroupPage() {
	const t = useT();
	const locale = usePlaceStore((s) => s.locale);
	const place = usePlaceStore((s) => s.place);
	const filter = usePlaceFilter();
	const { user, isPending } = useCurrentUserState();
	const navigate = useNavigate();
	const spots = useLoad(() => listSpots({ data: filter }), [`${filter.country ?? ""}:${filter.region ?? ""}`]);
	const [name, setName] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [country, setCountry] = (0, import_react.useState)(place?.country ?? "Israel");
	const [spotId, setSpotId] = (0, import_react.useState)("");
	const [whatsappUrl, setWhatsappUrl] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-11 w-48" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-6 h-80 w-full rounded-xl" })] });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		className: "max-w-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-widest text-accent",
				children: t("groupNew.kicker")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl font-medium tracking-tight text-fg",
				children: t("groupNew.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: t("groupNew.lead")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-8 space-y-5",
				onSubmit: async (e) => {
					e.preventDefault();
					if (whatsappUrl && !isWhatsappUrl(whatsappUrl)) {
						toast.error(t("groupNew.badWa"));
						return;
					}
					setBusy(true);
					try {
						const res = await createClub({ data: {
							name,
							description,
							country,
							spotId: spotId ? Number(spotId) : null,
							whatsappUrl
						} });
						if (!res?.slug) throw new Error("missing slug");
						navigate({
							to: "/groups/$slug",
							params: { slug: res.slug }
						});
					} catch (err) {
						if (isUnauthorized(err)) window.location.href = "/login";
						else {
							const msg = err instanceof Error ? err.message : "";
							toast.error(/whatsapp/i.test(msg) ? t("groupNew.badWa") : t("groupNew.err"));
						}
						setBusy(false);
					}
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("group.name"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							required: true,
							minLength: 2,
							value: name,
							onChange: (e) => setName(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("spotNew.country"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: country,
							onChange: (e) => setCountry(e.target.value),
							children: COUNTRIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c.name,
								children: countryLabel(locale, c.name)
							}, c.name))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("group.spot"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: spotId,
							onChange: (e) => setSpotId(e.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: t("group.spotNone")
							}), (spots.data ?? []).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s.id,
								children: localizeSpotField(locale, s.slug, "name", s.name)
							}, s.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: t("group.desc"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: description,
							onChange: (e) => setDescription(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
						label: t("group.whatsapp"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: whatsappUrl,
							onChange: (e) => setWhatsappUrl(e.target.value),
							placeholder: t("group.whatsappPh")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-faint",
							children: [
								t("groupNew.whatsappOpt"),
								". ",
								t("group.whatsappHelp")
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						disabled: busy,
						children: busy ? t("group.saving") : t("groupNew.submit")
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
export { NewGroupPage as component };
