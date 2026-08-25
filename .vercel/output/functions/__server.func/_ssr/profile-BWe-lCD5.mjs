import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as formatTemp, B as updateMyProfile, C as listMySwims, E as listSavedSpots, Q as formatKm, U as Page, Y as formatDate, Z as formatDuration, at as localizeSpotField, ct as sourceLabel, d as getMyStats, ft as Button, lt as useCurrentUserState, o as deleteSwim, tt as isUnauthorized, u as getMyProfile, ut as useLoad, vt as usePlaceStore, yt as useT } from "./router-PvLfXnWv.mjs";
import { n as Label, t as Input } from "./label-uWd1WSk2.mjs";
import { t as Textarea } from "./textarea-BW0kypl0.mjs";
import { t as Skeleton } from "./skeleton-BvVD9v0T.mjs";
import { t as RedirectToSignIn } from "./gates-TlwD99gA.mjs";
import { n as getOfficeAccess } from "./office-DPBthlJP.mjs";
import { t as SpotCard } from "./spot-card-DUmpCoCF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-BWe-lCD5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const t = useT();
	const locale = usePlaceStore((s) => s.locale);
	const { user, isPending } = useCurrentUserState();
	const profile = useLoad(async () => {
		if (isPending || !user) return null;
		return getMyProfile();
	}, [user?.id, isPending]);
	const stats = useLoad(async () => {
		if (isPending || !user) return null;
		return getMyStats();
	}, [user?.id, isPending]);
	const swims = useLoad(async () => {
		if (isPending || !user) return [];
		return listMySwims();
	}, [user?.id, isPending]);
	const saved = useLoad(async () => {
		if (isPending || !user) return [];
		return listSavedSpots();
	}, [user?.id, isPending]);
	const office = useLoad(async () => {
		if (isPending || !user) return null;
		try {
			return await getOfficeAccess();
		} catch {
			return null;
		}
	}, [user?.id, isPending]);
	const [displayName, setDisplayName] = (0, import_react.useState)("");
	const [homeWater, setHomeWater] = (0, import_react.useState)("");
	const [stroke, setStroke] = (0, import_react.useState)("");
	const [bio, setBio] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!profile.data) return;
		setDisplayName(profile.data.displayName);
		setHomeWater(profile.data.homeWater ?? "");
		setStroke(profile.data.stroke ?? "");
		setBio(profile.data.bio ?? "");
	}, [profile.data]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-48" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-6 h-40 rounded-xl" })] });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium uppercase tracking-widest text-accent",
			children: t("profile.kicker")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-4xl font-medium tracking-tight text-fg",
			children: displayName || user.displayName || "Swimmer"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-muted",
			children: t("profile.lead")
		}),
		office.data?.status === "owner" || office.data?.status === "open" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				size: "sm",
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/office",
					children: t("nav.office")
				})
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: t("profile.swims"),
					value: stats.data ? String(stats.data.swimCount) : "0"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: t("profile.km"),
					value: stats.data ? formatKm(stats.data.totalKm, locale) : formatKm(0, locale)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: t("profile.waters"),
					value: stats.data ? String(stats.data.uniqueSpots) : "0"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: t("profile.longest"),
					value: stats.data ? formatKm(stats.data.longestKm, locale) : formatKm(0, locale)
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-12 grid gap-10 lg:grid-cols-[1fr_0.9fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-fg",
					children: t("profile.recent")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "sm",
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/sync",
							children: t("profile.sync")
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/log",
							children: t("nav.log")
						})
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-3",
				children: (swims.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-xl bg-surface p-6 text-sm text-muted shadow-[var(--shadow-border)]",
					children: t("profile.emptySwims")
				}) : (swims.data ?? []).map((swim) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/spots/$slug",
								params: { slug: swim.spotSlug },
								className: "font-medium text-fg hover:text-accent",
								children: localizeSpotField(locale, swim.spotSlug, "name", swim.spotName)
							}),
							swim.source && swim.source !== "manual" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ms-2 inline-flex items-center rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-accent",
								children: sourceLabel(swim.source, locale)
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-faint",
								children: [
									formatDate(swim.swamOn, locale),
									" · ",
									formatKm(swim.distanceKm, locale),
									swim.durationMin ? ` · ${formatDuration(swim.durationMin)}` : "",
									swim.waterTempC != null ? ` · ${formatTemp(swim.waterTempC)}` : ""
								]
							}),
							swim.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: swim.notes
							}) : null
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "h-11 text-xs text-faint hover:text-danger",
							onClick: async () => {
								try {
									await deleteSwim({ data: swim.id });
									swims.reload();
									stats.reload();
								} catch (err) {
									if (isUnauthorized(err)) window.location.href = "/login";
								}
							},
							children: t("profile.remove")
						})]
					})
				}, swim.id))
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-3 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
					onSubmit: async (e) => {
						e.preventDefault();
						setSaving(true);
						try {
							await updateMyProfile({ data: {
								displayName,
								homeWater,
								bio,
								stroke
							} });
							toast(t("toast.profile"));
							profile.reload();
						} catch (err) {
							if (isUnauthorized(err)) window.location.href = "/login";
							else toast.error(t("toast.profileFail"));
						} finally {
							setSaving(false);
						}
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl text-fg",
							children: t("profile.how")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("profile.name"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: displayName,
								onChange: (e) => setDisplayName(e.target.value),
								required: true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("profile.homeWater"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: homeWater,
								onChange: (e) => setHomeWater(e.target.value),
								placeholder: t("profile.homeWaterPh")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("profile.stroke"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: stroke,
								onChange: (e) => setStroke(e.target.value),
								placeholder: t("profile.strokePh")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: t("profile.bio"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: bio,
								onChange: (e) => setBio(e.target.value),
								placeholder: t("profile.bioPh")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							size: "sm",
							disabled: saving,
							children: saving ? t("profile.saving") : t("profile.save")
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-fg",
					children: t("profile.savedWaters")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-3",
					children: (saved.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: t("profile.savedEmpty")
					}) : (saved.data ?? []).map((spot) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotCard, { spot }, spot.id))
				})] })]
			})]
		})
	] });
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-surface px-4 py-3 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs uppercase tracking-widest text-faint",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 font-display text-2xl tabular-nums text-fg",
			children: value
		})]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
//#endregion
export { ProfilePage as component };
