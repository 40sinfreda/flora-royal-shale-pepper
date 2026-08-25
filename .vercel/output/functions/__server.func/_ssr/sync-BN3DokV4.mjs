import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as nearestByKm } from "./geo-D8B0gUVb.mjs";
import { d as HeartPulse, f as Compass, o as Smartphone, r as Watch, s as RefreshCw } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as listSpots, M as listWatchLinks, Q as formatKm, R as unlinkWatch, U as Page, X as formatDateTime, Y as formatDate, Z as formatDuration, at as localizeSpotField, ct as sourceLabel, ft as Button, g as linkWatch, j as listSyncEvents, lt as useCurrentUserState, mt as cn, tt as isUnauthorized, ut as useLoad, vt as usePlaceStore, yt as useT } from "./router-PvLfXnWv.mjs";
import { c as WATCH_SOURCES, d as markSessionPull, f as parseWorkoutFile, i as SEA, l as commitWorkouts, o as SeaPhoto, p as pullAndImport } from "./router-PvLfXnWv2.mjs";
import { t as Select } from "./select-CDibZZWI.mjs";
import { t as Skeleton } from "./skeleton-BvVD9v0T.mjs";
import { t as RedirectToSignIn } from "./gates-TlwD99gA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sync-BN3DokV4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SOURCE_META = {
	garmin: {
		icon: Watch,
		photo: SEA.gordon,
		sample: "garmin-gordon.gpx",
		sampleKey: "sync.sampleGarmin"
	},
	suunto: {
		icon: Compass,
		photo: SEA.kinneret,
		sample: "suunto-kinneret.gpx",
		sampleKey: "sync.sampleSuunto"
	},
	samsung: {
		icon: Smartphone,
		photo: SEA.haifa,
		sample: "samsung-dado.gpx",
		sampleKey: "sync.sampleSamsung"
	},
	apple: {
		icon: HeartPulse,
		photo: SEA.eilat,
		sample: "apple-eilat.gpx",
		sampleKey: "sync.sampleApple"
	}
};
function syncStatusLabel(status, t) {
	if (status === "ok") return t("sync.status.ok");
	if (status === "duplicate") return t("sync.status.duplicate");
	if (status === "pool") return t("sync.status.pool");
	if (status === "needSpot") return t("sync.status.needSpot");
	return status;
}
function matchDraft(w, spots) {
	if (w.poolLike || w.lat == null || w.lng == null) return {
		spotId: null,
		kmAway: null,
		matchedName: null
	};
	const near = nearestByKm(spots, w.lat, w.lng);
	if (!near) return {
		spotId: null,
		kmAway: null,
		matchedName: null
	};
	const kmAway = Math.round(near.km * 10) / 10;
	if (near.km > 40) return {
		spotId: null,
		kmAway,
		matchedName: near.item.name
	};
	return {
		spotId: near.item.id,
		kmAway,
		matchedName: near.item.name
	};
}
function SyncPage() {
	const t = useT();
	const locale = usePlaceStore((s) => s.locale);
	const place = usePlaceStore((s) => s.place);
	const { user, isPending } = useCurrentUserState();
	const spots = useLoad(() => listSpots({ data: {} }));
	const links = useLoad(async () => {
		if (isPending || !user) return [];
		return listWatchLinks();
	}, [user?.id, isPending]);
	const events = useLoad(async () => {
		if (isPending || !user) return [];
		return listSyncEvents();
	}, [user?.id, isPending]);
	const [preferred, setPreferred] = (0, import_react.useState)("garmin");
	const [drafts, setDrafts] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [hover, setHover] = (0, import_react.useState)(false);
	const [linking, setLinking] = (0, import_react.useState)(null);
	const inputRef = (0, import_react.useRef)(null);
	const linkBySource = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const l of links.data ?? []) map.set(l.source, l);
		return map;
	}, [links.data]);
	const orderedSpots = (0, import_react.useMemo)(() => {
		return [...spots.data ?? []].sort((a, b) => {
			return (place?.country === a.country ? 0 : 1) - (place?.country === b.country ? 0 : 1) || a.name.localeCompare(b.name);
		});
	}, [spots.data, place?.country]);
	function mergeDrafts(parsed, results) {
		const catalog = spots.data ?? [];
		const byKey = new Map((results ?? []).map((r) => [r.key, r]));
		setDrafts((prev) => {
			const map = new Map(prev.map((d) => [d.key, d]));
			for (const w of parsed) map.set(w.key, {
				...w,
				...matchDraft(w, catalog),
				result: byKey.get(w.key)
			});
			return [...map.values()];
		});
	}
	function announcePull(ok, fallbackNone = false) {
		if (ok === 1) toast(t("toast.pulledOne"));
		else if (ok > 1) toast(t("toast.pulled", { n: ok }));
		else if (fallbackNone) toast(t("toast.pulledNone"));
	}
	async function ingestFiles(files, source) {
		const parsed = [];
		for (const file of files) try {
			parsed.push(...await parseWorkoutFile(file, source));
		} catch (err) {
			const msg = err instanceof Error ? err.message : "";
			toast.error(msg === "unsupported" ? t("sync.unsupported") : t("sync.badFile"));
		}
		if (!parsed.length) return;
		setBusy(true);
		try {
			const results = await commitWorkouts(parsed);
			mergeDrafts(parsed, results);
			announcePull(results.filter((r) => r.status === "ok").length);
			links.reload();
			events.reload();
		} catch (err) {
			mergeDrafts(parsed);
			if (isUnauthorized(err)) window.location.href = "/login";
			else toast.error(t("toast.syncFail"));
		} finally {
			setBusy(false);
		}
	}
	async function onPull(source, opts) {
		setLinking(source);
		try {
			const summary = await pullAndImport([source]);
			mergeDrafts(summary.workouts, summary.results);
			announcePull(summary.ok, opts?.noneToast);
			if (user) markSessionPull(user.id);
			links.reload();
			events.reload();
		} catch (err) {
			if (isUnauthorized(err)) window.location.href = "/login";
			else toast.error(t("toast.syncFail"));
		} finally {
			setLinking(null);
		}
	}
	async function onLink(source, on) {
		setLinking(source);
		try {
			if (on) {
				await linkWatch({ data: source });
				toast(t("toast.watchOn"));
				const summary = await pullAndImport([source]);
				mergeDrafts(summary.workouts, summary.results);
				announcePull(summary.ok);
				if (user) markSessionPull(user.id);
			} else {
				await unlinkWatch({ data: source });
				toast(t("toast.watchOff"));
			}
			links.reload();
			events.reload();
		} catch (err) {
			if (isUnauthorized(err)) window.location.href = "/login";
			else toast.error(t("toast.syncFail"));
		} finally {
			setLinking(null);
		}
	}
	function onDrop(e) {
		e.preventDefault();
		setHover(false);
		const files = [...e.dataTransfer.files ?? []];
		if (files.length) ingestFiles(files, preferred);
	}
	async function onImport() {
		const ready = drafts.filter((d) => !d.result || d.result.status === "needSpot");
		if (!ready.length) return;
		setBusy(true);
		try {
			const results = await commitWorkouts(ready);
			const byKey = new Map(results.map((r) => [r.key, r]));
			setDrafts((prev) => prev.map((d) => byKey.has(d.key) ? {
				...d,
				result: byKey.get(d.key)
			} : d));
			announcePull(results.filter((r) => r.status === "ok").length);
			links.reload();
			events.reload();
		} catch (err) {
			if (isUnauthorized(err)) window.location.href = "/login";
			else toast.error(t("toast.syncFail"));
		} finally {
			setBusy(false);
		}
	}
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-11 w-48" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-6 h-64 w-full rounded-xl" })] });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	const pending = drafts.filter((d) => !d.result || d.result.status === "needSpot");
	const savedCount = drafts.filter((d) => d.result?.status === "ok").length;
	const canImport = pending.some((d) => !d.poolLike);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium uppercase tracking-widest text-accent",
			children: t("sync.kicker")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 font-display text-4xl font-semibold tracking-tight text-fg",
			children: t("sync.title")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-2xl text-muted",
			children: t("sync.lead")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-2xl text-sm text-faint",
			children: t("sync.why")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: WATCH_SOURCES.map((source) => {
				const meta = SOURCE_META[source];
				const Icon = meta.icon;
				const link = linkBySource.get(source);
				const active = preferred === source;
				const working = linking === source;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: cn("overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]", active && "ring-2 ring-accent/70"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "relative block aspect-[16/9] w-full",
						onClick: () => setPreferred(source),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeaPhoto, { src: meta.photo }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "absolute bottom-3 start-3 flex items-center gap-2 text-sm font-medium text-fg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-accent" }), sourceLabel(source, locale)]
							}),
							link ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "absolute top-3 end-3 inline-flex items-center gap-1 rounded-full bg-accent px-2 py-1 text-xs font-medium text-accent-fg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 animate-pulse rounded-full bg-accent-fg" }), t("sync.live")]
							}) : null
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-faint",
								children: link?.lastImportAt ? t("sync.lastImport", { when: formatDateTime(link.lastImportAt, locale) }) : t("sync.never")
							}),
							link && link.importCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: link.importCount === 1 ? t("sync.importsOne") : t("sync.imports", { n: link.importCount })
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									size: "sm",
									variant: link ? "outline" : "primary",
									disabled: working,
									onClick: () => onLink(source, !link),
									children: link ? t("sync.disconnect") : t("sync.connect")
								}), link ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									size: "sm",
									variant: "subtle",
									disabled: working,
									onClick: () => void onPull(source, { noneToast: true }),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-3.5", working && "animate-spin") }), working ? t("sync.syncing") : t("sync.syncNow")]
								}) : null]
							})
						]
					})]
				}, source);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl text-fg",
				children: t("sync.log")
			}), (events.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: t("sync.logEmpty")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2",
				children: (events.data ?? []).map((ev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-baseline justify-between gap-2 rounded-xl bg-surface px-4 py-3 shadow-[var(--shadow-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-fg",
						children: [sourceLabel(ev.source, locale), ev.title ? ` · ${ev.title}` : ""]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 text-xs text-faint",
						children: [syncStatusLabel(ev.status, t), ev.spotName ? ` · ${ev.spotName}` : ""]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-faint",
						children: formatDateTime(ev.createdAt, locale)
					})]
				}, ev.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("mt-8 rounded-xl bg-surface p-6 text-center shadow-[var(--shadow-border)]", hover && "ring-2 ring-accent/60"),
			onDragOver: (e) => {
				e.preventDefault();
				setHover(true);
			},
			onDragLeave: () => setHover(false),
			onDrop,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Watch, { className: "mx-auto size-7 text-accent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-display text-xl text-fg",
					children: t("sync.drop")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: t("sync.dropHint")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: inputRef,
					type: "file",
					accept: ".gpx,.tcx,.fit,.json,.csv,application/gpx+xml,application/vnd.garmin.tcx+xml",
					multiple: true,
					className: "sr-only",
					onChange: (e) => {
						const files = [...e.target.files ?? []];
						e.target.value = "";
						if (files.length) ingestFiles(files, preferred);
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					className: "mt-4",
					onClick: () => inputRef.current?.click(),
					children: t("sync.browse")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs text-faint",
					children: t("sync.samples")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-wrap justify-center gap-2",
					children: WATCH_SOURCES.map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "ghost",
						onClick: () => {
							const name = SOURCE_META[source].sample;
							fetch(`/samples/${name}`).then((res) => {
								if (!res.ok) throw new Error("bad");
								return res.blob();
							}).then((blob) => {
								return ingestFiles([new File([blob], name, { type: "application/gpx+xml" })], source);
							}).catch(() => toast.error(t("sync.fail")));
						},
						children: t(SOURCE_META[source].sampleKey)
					}, source))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-fg",
						children: t("sync.preview")
					}), savedCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/profile",
							children: t("sync.done")
						})
					}) : null]
				}),
				drafts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: t("sync.empty")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-3",
					children: drafts.map((draft) => {
						const status = draft.result?.status;
						const spot = orderedSpots.find((s) => s.id === draft.spotId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium text-fg",
										children: draft.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-0.5 text-xs text-faint",
										children: [
											sourceLabel(draft.source, locale),
											" · ",
											formatDate(draft.swamOn, locale),
											" ·",
											" ",
											formatKm(draft.distanceKm, locale),
											draft.durationMin ? ` · ${formatDuration(draft.durationMin, locale)}` : ""
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "h-11 text-xs text-faint hover:text-danger",
										onClick: () => setDrafts((prev) => prev.filter((d) => d.key !== draft.key)),
										children: t("sync.remove")
									})]
								}),
								draft.poolLike ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-warn",
									children: t("sync.pool")
								}) : status === "ok" || status === "duplicate" ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-end",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted",
											children: t("sync.spot")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: draft.spotId ? String(draft.spotId) : "",
											onChange: (e) => {
												const id = e.target.value ? Number(e.target.value) : null;
												setDrafts((prev) => prev.map((d) => d.key === draft.key ? {
													...d,
													spotId: id,
													result: void 0
												} : d));
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: t("sync.choose")
											}), orderedSpots.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: String(s.id),
												children: localizeSpotField(locale, s.slug, "name", s.name)
											}, s.id))]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-faint",
										children: spot && draft.kmAway != null && draft.kmAway <= 40 ? t("sync.matched", { name: localizeSpotField(locale, spot.slug, "name", spot.name) }) : draft.matchedName ? t("sync.away", {
											n: draft.kmAway ?? "?",
											name: draft.matchedName
										}) : t("sync.needSpot")
									})]
								}),
								status === "ok" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-accent",
									children: t("sync.ok")
								}) : null,
								status === "duplicate" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: t("sync.duplicate")
								}) : null,
								status === "pool" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-warn",
									children: t("sync.pool")
								}) : null
							]
						}, draft.key);
					})
				}),
				canImport ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					className: "mt-6 w-full sm:w-auto",
					disabled: busy,
					onClick: () => void onImport(),
					children: busy ? t("sync.importing") : t("sync.import")
				}) : null
			]
		})
	] });
}
//#endregion
export { SyncPage as component };
