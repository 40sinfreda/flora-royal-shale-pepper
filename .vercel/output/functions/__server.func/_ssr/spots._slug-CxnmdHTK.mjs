import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as BookmarkCheck, p as Bookmark, u as MapPin } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { $ as formatTemp, D as listSpotClubs, I as toggleRsvp, K as difficultyLabel, L as toggleSaveSpot, O as listSpotGatherings, Q as formatKm, T as listSavedSpotIds, U as Page, X as formatDateTime, dt as waterLabel, ft as Button, gt as regionLabel, k as listSpotSwims, lt as useCurrentUserState, ot as localizedSpot, r as createReport, st as placeLine, tt as isUnauthorized, ut as useLoad, vt as usePlaceStore, w as listReports, yt as useT } from "./router-PvLfXnWv.mjs";
import { h as spotPhoto, n as Route$2, o as SeaPhoto } from "./router-PvLfXnWv2.mjs";
import { t as GatheringCard } from "./gathering-card-CmawUDb6.mjs";
import { n as Label, t as Input } from "./label-uWd1WSk2.mjs";
import { t as Select } from "./select-CDibZZWI.mjs";
import { t as Textarea } from "./textarea-BW0kypl0.mjs";
import { t as Skeleton } from "./skeleton-BvVD9v0T.mjs";
import { t as ClubCard } from "./club-card-BMchp_ZZ.mjs";
import { t as Badge } from "./badge-BAMbVlLv.mjs";
import { t as Atlas } from "./atlas-4EXrtIJy.mjs";
import { t as FeedList } from "./feed-D67bFDPD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/spots._slug-CxnmdHTK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SpotPage() {
	const t = useT();
	const locale = usePlaceStore((s) => s.locale);
	const loaded = Route$2.useLoaderData();
	const { user, isPending } = useCurrentUserState();
	const swims = useLoad(() => loaded.spot ? listSpotSwims({ data: loaded.spot.id }) : Promise.resolve([]), [loaded.spot?.id]);
	const gatherings = useLoad(() => loaded.spot ? listSpotGatherings({ data: loaded.spot.id }) : Promise.resolve([]), [loaded.spot?.id]);
	const reports = useLoad(() => loaded.spot ? listReports({ data: loaded.spot.id }) : Promise.resolve([]), [loaded.spot?.id]);
	const clubs = useLoad(() => loaded.spot ? listSpotClubs({ data: loaded.spot.id }) : Promise.resolve([]), [loaded.spot?.id]);
	const saved = useLoad(async () => {
		if (isPending || !user) return [];
		try {
			return await listSavedSpotIds();
		} catch (err) {
			if (isUnauthorized(err)) return [];
			throw err;
		}
	}, [user?.id, isPending]);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const isSaved = Boolean(loaded.spot && saved.data?.includes(loaded.spot.id));
	async function onSave() {
		if (!loaded.spot) return;
		if (!user) {
			window.location.href = "/login";
			return;
		}
		setSaving(true);
		try {
			const res = await toggleSaveSpot({ data: loaded.spot.id });
			toast(res.saved ? t("toast.savedSpot") : t("toast.unsavedSpot"));
			saved.reload();
		} catch (err) {
			if (isUnauthorized(err)) window.location.href = "/login";
			else toast.error(t("toast.saveFail"));
		} finally {
			setSaving(false);
		}
	}
	if (!loaded.spot) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display text-3xl text-fg",
		children: t("spot.notFound")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/spots",
		className: "mt-4 inline-block text-accent",
		children: t("spot.back")
	})] });
	const s = localizedSpot(loaded.spot, locale);
	const feedItems = (swims.data ?? loaded.swims).map((swim) => ({
		kind: "swim",
		swim
	}));
	const photo = spotPhoto(s.slug, s.waterType);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-[16/7] min-h-48 sm:aspect-[21/8]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeaPhoto, {
					src: photo,
					alt: s.name,
					className: "object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-6 text-xs font-medium uppercase tracking-widest text-accent",
			children: [
				regionLabel(locale, s.region),
				" · ",
				waterLabel(s.waterType, locale)
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex flex-wrap items-start justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl font-medium tracking-tight text-fg",
				children: s.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 flex items-center gap-1.5 text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }), placeLine(loaded.spot.city, loaded.spot.country, locale)]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: onSave,
					disabled: saving,
					children: [isSaved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-4" }), isSaved ? t("spot.saved") : t("spot.save")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/log",
						search: { spot: s.slug },
						children: t("spot.log")
					})
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: difficultyLabel(s.difficulty, locale) }),
				s.typicalKm != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t("spot.typical", { km: formatKm(s.typicalKm, locale) }) }) : null,
				s.typicalTempC != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: formatTemp(s.typicalTempC) }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: s.bestSeason })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 max-w-2xl text-base leading-relaxed text-muted",
			children: s.description
		}),
		s.hazards ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-2xl text-sm text-faint",
			children: t("spot.watch", { hazards: s.hazards })
		}) : null,
		loaded.spots.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atlas, {
				spots: loaded.spots,
				activeSlug: s.slug
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-12 grid gap-10 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl text-fg",
				children: t("spot.loggedHere")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: swims.loading && !loaded.swims.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-32 rounded-xl" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedList, { items: feedItems })
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-fg",
						children: t("spot.gatherings")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-col gap-3",
						children: (gatherings.data ?? loaded.gatherings).length === 0 && !gatherings.loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: t("spot.noneGather")
						}) : (gatherings.data ?? loaded.gatherings).map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GatheringCard, {
							event,
							onToggle: async (id) => {
								try {
									await toggleRsvp({ data: id });
									gatherings.reload();
								} catch (err) {
									if (isUnauthorized(err)) window.location.href = "/login";
								}
							}
						}, event.id))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-fg",
						children: t("spot.groups")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-col gap-3",
						children: (clubs.data ?? loaded.clubs).map((club) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClubCard, { club }, club.id))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl text-fg",
							children: t("spot.conditions")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConditionForm, {
							spotId: s.id,
							displayName: user?.displayName ?? void 0,
							signedIn: Boolean(user),
							onPosted: reports.reload
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-3",
							children: (reports.data ?? loaded.reports).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-lg bg-surface p-4 shadow-[var(--shadow-border)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-fg",
										children: r.swimmerName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-faint",
										children: formatDateTime(r.createdAt, locale)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted",
										children: r.notes
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-faint",
										children: [
											r.waterTempC != null ? formatTemp(r.waterTempC) : null,
											r.visibility,
											r.wildlife
										].filter(Boolean).join(" · ")
									})
								]
							}, r.id))
						})
					] })
				]
			})]
		})
	] });
}
function ConditionForm({ spotId, displayName, signedIn, onPosted }) {
	const t = useT();
	const [notes, setNotes] = (0, import_react.useState)("");
	const [temp, setTemp] = (0, import_react.useState)("");
	const [visibility, setVisibility] = (0, import_react.useState)("");
	const [wildlife, setWildlife] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (!signedIn) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-3 text-sm text-muted",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/login",
			className: "text-accent hover:underline",
			children: t("spot.signInReport")
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "mt-4 space-y-3 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
		onSubmit: async (e) => {
			e.preventDefault();
			setBusy(true);
			try {
				await createReport({ data: {
					spotId,
					notes,
					waterTempC: temp ? Number(temp) : null,
					visibility: visibility || null,
					wildlife: wildlife || null,
					displayName
				} });
				setNotes("");
				setTemp("");
				setVisibility("");
				setWildlife("");
				toast(t("toast.report"));
				onPosted();
			} catch (err) {
				if (isUnauthorized(err)) window.location.href = "/login";
				else toast.error(t("toast.reportFail"));
			} finally {
				setBusy(false);
			}
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block space-y-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: t("spot.reportLabel") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					required: true,
					value: notes,
					onChange: (e) => setNotes(e.target.value),
					placeholder: t("spot.reportPh")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						step: "0.5",
						placeholder: "°C",
						value: temp,
						onChange: (e) => setTemp(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: visibility,
						onChange: (e) => setVisibility(e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: t("spot.visibility")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "clear",
								children: t("spot.clear")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "green",
								children: t("spot.green")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "murky",
								children: t("spot.murky")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: t("spot.wildlife"),
						value: wildlife,
						onChange: (e) => setWildlife(e.target.value)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				size: "sm",
				disabled: busy || !notes.trim(),
				children: busy ? t("spot.filing") : t("spot.file")
			})
		]
	});
}
//#endregion
export { SpotPage as component };
