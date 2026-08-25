import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, S as useRouter, _ as createFileRoute, d as HeadContent, f as useRouterState, g as lazyRouteComponent, h as Outlet, m as createRouter, u as Scripts, v as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as __exportAll } from "./ssr.mjs";
import { i as countryDef, n as REGIONS, t as COUNTRIES, u as localeForCountry } from "./place-Bp16cyux.mjs";
import { t as haversineKm } from "./geo-D8B0gUVb.mjs";
import { bn as union, gn as object, hn as number, pn as literal, yn as string } from "../_libs/@better-auth/core+[...].mjs";
import { a as TriangleAlert } from "../_libs/lucide-react.mjs";
import { n as auth } from "./server-XeOSjV0B.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { A as listSpots, D as listSpotClubs, F as saveMyPlace, H as Header, M as listWatchLinks, O as listSpotGatherings, V as Footer, f as getSpot, ft as Button, gt as regionLabel, ht as countryLabel, k as listSpotSwims, lt as useCurrentUserState, mt as cn, p as importWatchWorkouts, pt as Logo, s as getClub, tt as isUnauthorized, u as getMyProfile, vt as usePlaceStore, w as listReports, yt as useT } from "./router-PvLfXnWv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-PvLfXnWv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function PlaceProvider({ children }) {
	const setHydrated = usePlaceStore((s) => s.setHydrated);
	const applyFromProfile = usePlaceStore((s) => s.applyFromProfile);
	const { user, isPending } = useCurrentUserState();
	(0, import_react.useEffect)(() => {
		const result = usePlaceStore.persist.rehydrate();
		Promise.resolve(result).then(() => {
			usePlaceStore.getState().setHydrated();
		});
	}, [setHydrated]);
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		let alive = true;
		getMyProfile().then((profile) => {
			if (!alive) return;
			if (profile.country) {
				const def = countryDef(profile.country);
				applyFromProfile({
					country: profile.country,
					locale: profile.locale,
					placeScope: profile.placeScope,
					region: def?.region ?? null
				});
			} else {
				const place = usePlaceStore.getState().place;
				const locale = usePlaceStore.getState().locale;
				if (place) saveMyPlace({ data: {
					country: place.country,
					region: place.region,
					scope: place.scope,
					locale
				} }).catch(() => void 0);
			}
		}).catch((err) => {
			if (isUnauthorized(err)) return;
		});
		return () => {
			alive = false;
		};
	}, [
		user?.id,
		isPending,
		applyFromProfile
	]);
	return children;
}
function TideRule({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 320 12",
		fill: "none",
		"aria-hidden": true,
		className: `h-3 w-full text-accent/70 ${className}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M0 7 C 20 7, 28 3, 48 3 S 76 11, 96 11 124 3, 144 3 172 11, 192 11 220 3, 240 3 268 11, 288 11 308 7, 320 7",
			stroke: "currentColor",
			strokeWidth: "1.25"
		})
	});
}
function SeaPhoto({ src, alt = "", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt,
		className: cn("h-full w-full object-cover", className),
		loading: "lazy",
		decoding: "async"
	});
}
function SeaBackdrop({ src, className, children, priority = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative overflow-hidden", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover",
				loading: priority ? "eager" : "lazy",
				decoding: "async",
				fetchPriority: priority ? "high" : "auto"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "sea-scrim pointer-events-none absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative",
				children
			})
		]
	});
}
var SEA = {
	hero: "/sea/hero.jpg",
	swimmers: "/sea/swimmers.jpg",
	gordon: "/sea/gordon.jpg",
	surface: "/sea/surface.jpg",
	eilat: "/sea/eilat.jpg",
	channel: "/sea/channel.jpg",
	kinneret: "/sea/kinneret.jpg",
	haifa: "/sea/haifa.jpg",
	ocean: "/sea/ocean.jpg",
	login: "/sea/login.jpg",
	sunset: "/sea/sunset.jpg"
};
var SLUG_PHOTO = {
	gordon: SEA.gordon,
	herzliya: SEA.gordon,
	"tel-baruch": SEA.gordon,
	palmachim: SEA.sunset,
	nahariya: SEA.hero,
	ashkelon: SEA.surface,
	dado: SEA.haifa,
	caesarea: SEA.haifa,
	eilat: SEA.eilat,
	kinneret: SEA.kinneret,
	"dover-channel": SEA.channel,
	serpentine: SEA.kinneret,
	zurich: SEA.kinneret,
	alcatraz: SEA.ocean,
	rottnest: SEA.ocean,
	catalina: SEA.ocean,
	bondi: SEA.ocean,
	waikiki: SEA.ocean,
	"cook-strait": SEA.ocean,
	robben: SEA.ocean,
	gibraltar: SEA.channel,
	manhattan: SEA.surface,
	hellespont: SEA.channel,
	santorini: SEA.eilat
};
var WATER_PHOTO = {
	sea: SEA.hero,
	ocean: SEA.ocean,
	lake: SEA.kinneret,
	river: SEA.surface
};
function spotPhoto(slug, waterType) {
	return SLUG_PHOTO[slug] ?? WATER_PHOTO[waterType] ?? SEA.hero;
}
function PlaceGate() {
	const t = useT();
	const locale = usePlaceStore((s) => s.locale);
	const current = usePlaceStore((s) => s.place);
	const hydrated = usePlaceStore((s) => s.hydrated);
	const setPlace = usePlaceStore((s) => s.setPlace);
	const setLocale = usePlaceStore((s) => s.setLocale);
	const { user } = useCurrentUserState();
	const [country, setCountry] = (0, import_react.useState)(current?.country ?? "Israel");
	const [scope, setScope] = (0, import_react.useState)(current?.scope ?? "country");
	const [region, setRegion] = (0, import_react.useState)(current?.region ?? COUNTRIES.find((c) => c.name === (current?.country ?? "Israel"))?.region ?? "Middle East");
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		const locked = usePlaceStore.getState().localeLocked;
		if (!current && !locked) usePlaceStore.setState({ locale: localeForCountry(country) });
	}, [
		country,
		current,
		hydrated
	]);
	const grouped = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const c of COUNTRIES) {
			const list = map.get(c.region) ?? [];
			list.push(c);
			map.set(c.region, list);
		}
		return REGIONS.map((r) => ({
			region: r,
			countries: map.get(r) ?? []
		})).filter((g) => g.countries.length);
	}, []);
	async function confirm() {
		const def = COUNTRIES.find((c) => c.name === country);
		const nextRegion = scope === "region" ? region : def?.region ?? region;
		const place = {
			country: scope === "region" ? COUNTRIES.find((c) => c.region === nextRegion)?.name ?? country : country,
			region: nextRegion,
			scope
		};
		setPlace(place);
		if (user) try {
			await saveMyPlace({ data: {
				country: place.country,
				region: place.region,
				scope: place.scope,
				locale: usePlaceStore.getState().locale
			} });
		} catch {}
	}
	const chip = (on) => cn("h-11 rounded-full px-4 text-sm transition-colors duration-150", on ? "bg-accent text-accent-fg" : "bg-bg/55 text-fg backdrop-blur-sm hover:bg-bg/75");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeaBackdrop, {
		src: SEA.swimmers,
		className: "min-h-dvh",
		priority: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-10 text-xs font-medium uppercase tracking-widest text-accent",
					children: t("place.kicker")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl",
					children: t("place.title")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-base leading-relaxed text-fg/90",
					children: t("place.lead")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 max-w-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TideRule, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "self-center text-xs uppercase tracking-widest text-fg/70",
						children: t("place.language")
					}), ["he", "en"].map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setLocale(code),
						className: chip(locale === code),
						children: t(code === "he" ? "lang.he" : "lang.en")
					}, code))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-widest text-fg/70",
						children: t("place.countries")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 space-y-6",
						children: grouped.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-sm text-fg/80",
							children: regionLabel(locale, g.region)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: g.countries.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setCountry(c.name);
									setRegion(c.region);
									setScope("country");
								},
								className: chip(scope === "country" && country === c.name),
								children: countryLabel(locale, c.name)
							}, c.name))
						})] }, g.region))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-widest text-fg/70",
						children: t("place.regions")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: REGIONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setScope("region");
								setRegion(r);
								const first = COUNTRIES.find((c) => c.region === r);
								if (first) setCountry(first.name);
							},
							className: chip(scope === "region" && region === r),
							children: regionLabel(locale, r)
						}, r))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-10",
					size: "lg",
					onClick: () => void confirm(),
					children: t("place.continue")
				})
			]
		})
	});
}
var WATCH_SOURCES = [
	"garmin",
	"suunto",
	"samsung",
	"apple"
];
var FIT_EPOCH = Date.UTC(1989, 11, 31);
function sourceFromName(name, fallback) {
	const n = name.toLowerCase();
	if (/(garmin|fenix|forerunner|instinct|enduro|connect)/.test(n)) return "garmin";
	if (/(suunto|ambit|spartan|vertical|ocean)/.test(n)) return "suunto";
	if (/(samsung|galaxy|shealth|health-connect)/.test(n)) return "samsung";
	if (/(apple|iphone|watch-os|healthfit|workoutdoors|fitness)/.test(n)) return "apple";
	return fallback;
}
function ymd(d) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function workoutKey(source, swamOn, km, min, name) {
	const raw = `${source}|${swamOn}|${km.toFixed(3)}|${min}|${name}`;
	let h = 2166136261;
	for (let i = 0; i < raw.length; i++) {
		h ^= raw.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return (h >>> 0).toString(16);
}
function pathStats(points) {
	if (!points.length) return {
		km: 0,
		lat: null,
		lng: null,
		boxM: 0
	};
	let km = 0;
	let minLat = points[0].lat;
	let maxLat = points[0].lat;
	let minLng = points[0].lng;
	let maxLng = points[0].lng;
	for (let i = 1; i < points.length; i++) {
		km += haversineKm(points[i - 1].lat, points[i - 1].lng, points[i].lat, points[i].lng);
		minLat = Math.min(minLat, points[i].lat);
		maxLat = Math.max(maxLat, points[i].lat);
		minLng = Math.min(minLng, points[i].lng);
		maxLng = Math.max(maxLng, points[i].lng);
	}
	const boxM = haversineKm(minLat, minLng, maxLat, maxLng) * 1e3;
	return {
		km,
		lat: points[0].lat,
		lng: points[0].lng,
		boxM
	};
}
function finish(partial) {
	const stats = pathStats(partial.points);
	const distanceKm = partial.distanceKm > .05 ? partial.distanceKm : stats.km;
	const durationMin = Math.max(1, Math.round(partial.durationMin));
	const sport = (partial.sport || "swim").toLowerCase();
	const sub = (partial.subSport || "").toLowerCase();
	const poolLike = sub.includes("lap") || sub.includes("pool") || /\bpool\b|בריכה/.test(partial.fileName.toLowerCase()) || stats.boxM > 0 && stats.boxM < 80 && distanceKm > .4;
	const openWater = !poolLike && (sub.includes("open") || sport.includes("swim") || sport === "open_water" || sport === "generic" || sport === "" || distanceKm >= .3);
	return {
		fileName: partial.fileName,
		source: partial.source,
		key: workoutKey(partial.source, ymd(partial.startedAt), distanceKm, durationMin, partial.fileName),
		title: (partial.title || "").trim() || partial.fileName.replace(/\.[a-z0-9]+$/i, "").replace(/[_-]+/g, " "),
		swamOn: ymd(partial.startedAt),
		startedAt: partial.startedAt.toISOString(),
		distanceKm: Math.round(distanceKm * 1e3) / 1e3,
		durationMin,
		waterTempC: partial.waterTempC,
		lat: stats.lat,
		lng: stats.lng,
		pointCount: partial.points.length,
		sport: sport || "swim",
		openWater,
		poolLike
	};
}
function parseGpx(text, fileName, source) {
	const xml = new DOMParser().parseFromString(text, "application/xml");
	if (xml.querySelector("parsererror")) throw new Error("bad-gpx");
	const trkpts = [...xml.getElementsByTagName("trkpt"), ...xml.getElementsByTagName("wpt")];
	const points = [];
	for (const el of trkpts) {
		const lat = Number(el.getAttribute("lat"));
		const lng = Number(el.getAttribute("lon"));
		if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;
		const timeEl = el.getElementsByTagName("time")[0];
		const t = timeEl?.textContent ? new Date(timeEl.textContent) : void 0;
		points.push({
			lat,
			lng,
			t
		});
	}
	if (points.length < 2) throw new Error("empty");
	const times = points.map((p) => p.t).filter((t) => Boolean(t && !Number.isNaN(t.getTime())));
	const start = times[0] ?? /* @__PURE__ */ new Date();
	const end = times[times.length - 1] ?? start;
	return [finish({
		fileName,
		source,
		startedAt: start,
		distanceKm: 0,
		durationMin: Math.max(1, (end.getTime() - start.getTime()) / 6e4),
		waterTempC: null,
		points,
		sport: "swim",
		subSport: "open_water",
		title: (xml.querySelector("metadata > name") || xml.querySelector("trk > name") || xml.getElementsByTagName("name")[0])?.textContent ?? void 0
	})];
}
function parseTcx(text, fileName, source) {
	const xml = new DOMParser().parseFromString(text, "application/xml");
	if (xml.querySelector("parsererror")) throw new Error("bad-tcx");
	const activities = [...xml.getElementsByTagName("Activity")];
	const out = [];
	const blocks = activities.length ? activities : [xml.documentElement];
	for (const act of blocks) {
		const sport = act.getAttribute?.("Sport") || "Swim";
		const points = [];
		const lats = act.getElementsByTagName("LatitudeDegrees");
		const lngs = act.getElementsByTagName("LongitudeDegrees");
		const n = Math.min(lats.length, lngs.length);
		for (let i = 0; i < n; i++) {
			const lat = Number(lats[i].textContent);
			const lng = Number(lngs[i].textContent);
			if (Number.isFinite(lat) && Number.isFinite(lng)) points.push({
				lat,
				lng
			});
		}
		const idEl = act.getElementsByTagName("Id")[0] || act.getElementsByTagName("StartTime")[0];
		const start = idEl?.textContent ? new Date(idEl.textContent) : /* @__PURE__ */ new Date();
		const distEl = act.getElementsByTagName("DistanceMeters")[0];
		const timeEl = act.getElementsByTagName("TotalTimeSeconds")[0];
		const distM = distEl ? Number(distEl.textContent) : 0;
		const sec = timeEl ? Number(timeEl.textContent) : 0;
		out.push(finish({
			fileName,
			source,
			startedAt: Number.isNaN(start.getTime()) ? /* @__PURE__ */ new Date() : start,
			distanceKm: Number.isFinite(distM) ? distM / 1e3 : 0,
			durationMin: Number.isFinite(sec) ? sec / 60 : 0,
			waterTempC: null,
			points,
			sport,
			subSport: /pool/i.test(sport) ? "lap_swimming" : "open_water"
		}));
	}
	if (!out.length) throw new Error("empty");
	return out;
}
function readUInt(view, offset, size, little) {
	if (size === 1) return view.getUint8(offset);
	if (size === 2) return little ? view.getUint16(offset, true) : view.getUint16(offset, false);
	if (size === 4) return little ? view.getUint32(offset, true) : view.getUint32(offset, false);
	return 0;
}
function readInt(view, offset, size, little) {
	if (size === 1) return view.getInt8(offset);
	if (size === 2) return little ? view.getInt16(offset, true) : view.getInt16(offset, false);
	if (size === 4) return little ? view.getInt32(offset, true) : view.getInt32(offset, false);
	return 0;
}
function semicirclesToDeg(n) {
	return n * (180 / 2147483648);
}
function fitDate(seconds) {
	return new Date(FIT_EPOCH + seconds * 1e3);
}
var SPORT_NAME = {
	0: "generic",
	5: "swim",
	15: "fitness"
};
var SUB_SPORT_NAME = {
	0: "generic",
	17: "lap_swimming",
	18: "open_water"
};
function parseFit(buf, fileName, source) {
	const view = new DataView(buf);
	if (view.byteLength < 14) throw new Error("bad-fit");
	const headerSize = view.getUint8(0);
	const dataSize = view.getUint32(4, true);
	if (String.fromCharCode(view.getUint8(8), view.getUint8(9), view.getUint8(10), view.getUint8(11)) !== ".FIT") throw new Error("bad-fit");
	const start = headerSize;
	const end = Math.min(view.byteLength - 2, start + dataSize);
	const defs = /* @__PURE__ */ new Map();
	let offset = start;
	let sport = "swim";
	let subSport = "open_water";
	let startTime = null;
	let totalDistanceM = 0;
	let totalTimerS = 0;
	let temp = null;
	const points = [];
	while (offset < end) {
		const header = view.getUint8(offset);
		offset += 1;
		if (header & 128) continue;
		const local = header & 15;
		if (header & 64) {
			if (offset + 5 > end) break;
			offset += 1;
			const little = view.getUint8(offset) === 0;
			offset += 1;
			const global = readUInt(view, offset, 2, little);
			offset += 2;
			const fieldCount = view.getUint8(offset);
			offset += 1;
			const fields = [];
			for (let i = 0; i < fieldCount; i++) {
				if (offset + 3 > end) break;
				fields.push({
					num: view.getUint8(offset),
					size: view.getUint8(offset + 1),
					base: view.getUint8(offset + 2)
				});
				offset += 3;
			}
			if (header & 32) {
				if (offset >= end) break;
				const devCount = view.getUint8(offset);
				offset += 1;
				offset += devCount * 3;
			}
			defs.set(local, {
				little,
				global,
				fields
			});
			continue;
		}
		const def = defs.get(local);
		if (!def) break;
		const rec = {};
		let recOk = true;
		for (const f of def.fields) {
			if (offset + f.size > end) {
				recOk = false;
				break;
			}
			const val = (f.base & 7) === 2 || (f.base & 7) === 4 || f.base === 134 || f.base === 132 ? readUInt(view, offset, Math.min(f.size, 4), def.little) : readInt(view, offset, Math.min(f.size, 4), def.little);
			rec[f.num] = val;
			offset += f.size;
		}
		if (!recOk) break;
		if (def.global === 18 || def.global === 19) {
			if (typeof rec[5] === "number" && rec[5] !== 255) sport = SPORT_NAME[rec[5]] ?? sport;
			if (typeof rec[6] === "number" && rec[6] !== 255) subSport = SUB_SPORT_NAME[rec[6]] ?? subSport;
			if (typeof rec[253] === "number" && rec[253] !== 4294967295) startTime = fitDate(rec[253]);
			if (typeof rec[9] === "number" && rec[9] !== 4294967295) totalDistanceM = rec[9] / 100;
			if (typeof rec[8] === "number" && rec[8] !== 4294967295) totalTimerS = rec[8] / 1e3;
			if (typeof rec[14] === "number" && rec[14] !== 127) temp = rec[14];
			if (typeof rec[3] === "number" && rec[3] !== 2147483647) {
				const lat = semicirclesToDeg(rec[3]);
				const lng = typeof rec[4] === "number" ? semicirclesToDeg(rec[4]) : 0;
				if (Math.abs(lat) <= 90) points.unshift({
					lat,
					lng
				});
			}
		}
		if (def.global === 20) {
			if (typeof rec[0] === "number" && rec[0] !== 2147483647 && typeof rec[1] === "number") {
				const lat = semicirclesToDeg(rec[0]);
				const lng = semicirclesToDeg(rec[1]);
				if (Math.abs(lat) <= 90 && Math.abs(lng) <= 180) points.push({
					lat,
					lng
				});
			}
			if (temp == null && typeof rec[13] === "number" && rec[13] !== 127) temp = rec[13];
		}
	}
	if (!startTime) startTime = /* @__PURE__ */ new Date();
	if (totalDistanceM <= 0 && points.length < 2) throw new Error("empty");
	return [finish({
		fileName,
		source,
		startedAt: startTime,
		distanceKm: totalDistanceM / 1e3,
		durationMin: totalTimerS / 60,
		waterTempC: temp,
		points,
		sport,
		subSport
	})];
}
function parseJson(text, fileName, source) {
	const data = JSON.parse(text);
	const rows = Array.isArray(data) ? data : [data];
	const out = [];
	for (const raw of rows) {
		if (!raw || typeof raw !== "object") continue;
		const row = raw;
		const type = String(row.workoutActivityType ?? row.exerciseType ?? row.sport ?? row.type ?? "swim").toLowerCase();
		if (type && !/swim|open.?water|surfing|unknown/.test(type) && type !== "other") continue;
		const startRaw = row.startDate ?? row.startTime ?? row.start_time ?? row.beginDate;
		const start = typeof startRaw === "number" ? new Date(startRaw > 1e10 ? startRaw : startRaw * 1e3) : startRaw ? new Date(String(startRaw)) : /* @__PURE__ */ new Date();
		const distRaw = Number(row.totalDistance ?? row.distance ?? row.distanceMeter ?? row.distance_m ?? 0);
		const distanceKm = distRaw > 100 ? distRaw / 1e3 : distRaw;
		const durRaw = Number(row.duration ?? row.durationMin ?? row.elapsed ?? 0);
		const durationMin = durRaw > 200 ? durRaw / 6e4 : durRaw > 50 ? durRaw / 60 : durRaw;
		const lat = Number(row.latitude ?? row.lat ?? row.startLatitude);
		const lng = Number(row.longitude ?? row.lng ?? row.startLongitude);
		const points = Number.isFinite(lat) && Number.isFinite(lng) ? [{
			lat,
			lng
		}] : [];
		out.push(finish({
			fileName,
			source,
			startedAt: Number.isNaN(start.getTime()) ? /* @__PURE__ */ new Date() : start,
			distanceKm,
			durationMin,
			waterTempC: null,
			points,
			sport: type,
			subSport: /pool/.test(type) ? "lap_swimming" : "open_water"
		}));
	}
	if (!out.length) throw new Error("empty");
	return out;
}
function parseCsv(text, fileName, source) {
	const lines = text.trim().split(/\r?\n/);
	if (lines.length < 2) throw new Error("empty");
	const head = lines[0].split(",").map((s) => s.trim().toLowerCase());
	const di = head.findIndex((h) => h.includes("distance"));
	const ti = head.findIndex((h) => h.includes("duration") || h.includes("time"));
	const si = head.findIndex((h) => h.includes("start") || h.includes("date"));
	if (di < 0) throw new Error("empty");
	const out = [];
	for (const line of lines.slice(1)) {
		const cols = line.split(",");
		const dist = Number(cols[di]);
		const dur = ti >= 0 ? Number(cols[ti]) : 40;
		const start = si >= 0 ? new Date(cols[si]) : /* @__PURE__ */ new Date();
		if (!Number.isFinite(dist) || dist <= 0) continue;
		out.push(finish({
			fileName,
			source,
			startedAt: Number.isNaN(start.getTime()) ? /* @__PURE__ */ new Date() : start,
			distanceKm: dist > 100 ? dist / 1e3 : dist,
			durationMin: dur > 200 ? dur / 60 : dur,
			waterTempC: null,
			points: [],
			sport: "swim",
			subSport: "open_water"
		}));
	}
	if (!out.length) throw new Error("empty");
	return out;
}
async function parseWorkoutFile(file, preferred) {
	const source = sourceFromName(file.name, preferred);
	const name = file.name;
	const lower = name.toLowerCase();
	if (lower.endsWith(".fit")) return parseFit(await file.arrayBuffer(), name, source);
	const text = await file.text();
	const trimmed = text.trim();
	if (lower.endsWith(".gpx") || trimmed.startsWith("<gpx") || trimmed.includes("<gpx")) return parseGpx(text, name, source);
	if (lower.endsWith(".tcx") || trimmed.includes("TrainingCenterDatabase")) return parseTcx(text, name, source);
	if (lower.endsWith(".json") || trimmed.startsWith("{") || trimmed.startsWith("[")) return parseJson(text, name, source);
	if (lower.endsWith(".csv")) return parseCsv(text, name, source);
	if (trimmed.startsWith("<")) try {
		return parseGpx(text, name, source);
	} catch {
		return parseTcx(text, name, source);
	}
	throw new Error("unsupported");
}
var SOURCE_FEED_FILES = {
	garmin: "/samples/garmin-gordon.gpx",
	suunto: "/samples/suunto-kinneret.gpx",
	samsung: "/samples/samsung-dado.gpx",
	apple: "/samples/apple-eilat.gpx"
};
function isWatchSource(value) {
	return WATCH_SOURCES.includes(value);
}
function toImportPayload(w, spotId = null) {
	return {
		source: w.source,
		key: w.key,
		title: w.title,
		swamOn: w.swamOn,
		distanceKm: w.distanceKm,
		durationMin: w.durationMin,
		waterTempC: w.waterTempC,
		lat: w.lat,
		lng: w.lng,
		poolLike: w.poolLike,
		spotId
	};
}
async function commitWorkouts(workouts) {
	const ready = workouts.filter((w) => !w.poolLike).slice(0, 25);
	if (!ready.length) return [];
	return importWatchWorkouts({ data: { workouts: ready.map((w) => toImportPayload(w, w.spotId ?? null)) } });
}
async function pullSourceFeed(source) {
	const path = SOURCE_FEED_FILES[source];
	const res = await fetch(path);
	if (!res.ok) throw new Error("feed");
	const blob = await res.blob();
	const name = path.split("/").pop() ?? `${source}.gpx`;
	return parseWorkoutFile(new File([blob], name, { type: "application/gpx+xml" }), source);
}
async function pullAndImport(sources) {
	const workouts = [];
	for (const source of sources) workouts.push(...await pullSourceFeed(source));
	const results = await commitWorkouts(workouts);
	return {
		workouts,
		results,
		ok: results.filter((r) => r.status === "ok").length,
		duplicate: results.filter((r) => r.status === "duplicate").length,
		needSpot: results.filter((r) => r.status === "needSpot").length
	};
}
function markSessionPull(userId) {
	try {
		sessionStorage.setItem(`tideline-watch-pull:${userId}`, String(Date.now()));
	} catch {}
}
function shouldSessionPull(userId, minMs = 12e4) {
	try {
		const last = Number(sessionStorage.getItem(`tideline-watch-pull:${userId}`) || "0");
		return Date.now() - last >= minMs;
	} catch {
		return true;
	}
}
/** Pulls linked watch feeds when the swimmer opens the club. Silent if nothing new. */
function WatchSyncBridge() {
	const { user, isPending } = useCurrentUserState();
	const t = useT();
	const running = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		if (running.current) return;
		if (!shouldSessionPull(user.id)) return;
		running.current = true;
		(async () => {
			try {
				const sources = (await listWatchLinks()).map((l) => l.source).filter(isWatchSource);
				if (!sources.length) {
					running.current = false;
					return;
				}
				markSessionPull(user.id);
				const summary = await pullAndImport(sources);
				if (summary.ok === 1) toast(t("toast.pulledOne"));
				else if (summary.ok > 1) toast(t("toast.pulled", { n: summary.ok }));
			} catch (err) {
				running.current = false;
				if (isUnauthorized(err)) return;
			}
		})();
	}, [
		user?.id,
		isPending,
		t
	]);
	return null;
}
var styles_default = "/assets/styles-1uTBr0OA.css";
var APP_NAME = "Tideline";
var Route$16 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Tideline is the global club for open water swimmers. Spots, gatherings, groups, and a shared log of the world's waters."
			},
			{
				name: "theme-color",
				content: "#0B161A"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const locale = usePlaceStore((s) => s.locale);
	const dir = locale === "he" ? "rtl" : "ltr";
	const login = pathname === "/login";
	const office = pathname.startsWith("/office");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: locale,
		dir,
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "min-h-dvh bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PlaceProvider, { children: [login ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) : office ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-dvh flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppFrame, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					theme: "dark",
					position: "bottom-center",
					toastOptions: { classNames: { toast: "bg-surface text-fg border-line font-sans" } }
				})] }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
function AppFrame() {
	const hydrated = usePlaceStore((s) => s.hydrated);
	const place = usePlaceStore((s) => s.place);
	const editing = usePlaceStore((s) => s.editing);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-dvh overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/sea/hero.jpg",
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "sea-scrim absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl font-semibold text-fg",
					children: "Tideline"
				})
			})
		]
	});
	if (!place || editing) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceGate, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WatchSyncBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
var $$splitComponentImporter$14 = () => import("./routes-C-zUk_Q5.mjs");
var Route$15 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./events-BH9jn33l.mjs");
var Route$14 = createFileRoute("/events")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./groups-DZ1mr_sR.mjs");
var Route$13 = createFileRoute("/groups")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./log-CLzUOSL_.mjs");
var Route$12 = createFileRoute("/log")({
	validateSearch: (search) => ({ spot: typeof search.spot === "string" ? search.spot : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./login-B_vPJR9g.mjs");
var Route$11 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./office-CpGhNbe8.mjs");
var Route$10 = createFileRoute("/office")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./profile-BWe-lCD5.mjs");
var Route$9 = createFileRoute("/profile")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./spots-Dh9KNHJZ.mjs");
var Route$8 = createFileRoute("/spots")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./sync-BN3DokV4.mjs");
var Route$7 = createFileRoute("/sync")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./groups.index-BuYuKLHL.mjs");
var Route$6 = createFileRoute("/groups/")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./groups._slug-BiUQhfxK.mjs");
var Route$5 = createFileRoute("/groups/$slug")({
	loader: async ({ params }) => {
		try {
			return await getClub({ data: params.slug });
		} catch {
			return null;
		}
	},
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./groups.new-BBd6aqwn.mjs");
var Route$4 = createFileRoute("/groups/new")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./spots.index-BRRqnCij.mjs");
var Route$3 = createFileRoute("/spots/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./spots._slug-CxnmdHTK.mjs");
var Route$2 = createFileRoute("/spots/$slug")({
	loader: async ({ params }) => {
		const spot = await getSpot({ data: params.slug });
		if (!spot) return {
			spot: null,
			spots: [],
			swims: [],
			gatherings: [],
			reports: [],
			clubs: []
		};
		const [spots, swims, gatherings, reports, clubs] = await Promise.all([
			listSpots({ data: { country: spot.country } }),
			listSpotSwims({ data: spot.id }),
			listSpotGatherings({ data: spot.id }),
			listReports({ data: spot.id }),
			listSpotClubs({ data: spot.id })
		]);
		return {
			spot,
			spots,
			swims,
			gatherings,
			reports,
			clubs
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./spots.new-DLbxUHuZ.mjs");
var Route$1 = createFileRoute("/spots/new")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var Route = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var IndexRoute = Route$15.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$16
});
var EventsRoute = Route$14.update({
	id: "/events",
	path: "/events",
	getParentRoute: () => Route$16
});
var GroupsRoute = Route$13.update({
	id: "/groups",
	path: "/groups",
	getParentRoute: () => Route$16
});
var LogRoute = Route$12.update({
	id: "/log",
	path: "/log",
	getParentRoute: () => Route$16
});
var LoginRoute = Route$11.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$16
});
var OfficeRoute = Route$10.update({
	id: "/office",
	path: "/office",
	getParentRoute: () => Route$16
});
var ProfileRoute = Route$9.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => Route$16
});
var SpotsRoute = Route$8.update({
	id: "/spots",
	path: "/spots",
	getParentRoute: () => Route$16
});
var SyncRoute = Route$7.update({
	id: "/sync",
	path: "/sync",
	getParentRoute: () => Route$16
});
var GroupsIndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => GroupsRoute
});
var GroupsSlugRoute = Route$5.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => GroupsRoute
});
var GroupsNewRoute = Route$4.update({
	id: "/new",
	path: "/new",
	getParentRoute: () => GroupsRoute
});
var SpotsIndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => SpotsRoute
});
var SpotsSlugRoute = Route$2.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => SpotsRoute
});
var SpotsNewRoute = Route$1.update({
	id: "/new",
	path: "/new",
	getParentRoute: () => SpotsRoute
});
var ApiAuthSplatRoute = Route.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$16
});
var GroupsRouteChildren = {
	GroupsSlugRoute,
	GroupsNewRoute,
	GroupsIndexRoute
};
var GroupsRouteWithChildren = GroupsRoute._addFileChildren(GroupsRouteChildren);
var SpotsRouteChildren = {
	SpotsSlugRoute,
	SpotsNewRoute,
	SpotsIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	EventsRoute,
	GroupsRoute: GroupsRouteWithChildren,
	LogRoute,
	LoginRoute,
	OfficeRoute,
	ProfileRoute,
	SpotsRoute: SpotsRoute._addFileChildren(SpotsRouteChildren),
	SyncRoute,
	ApiAuthSplatRoute
};
var routeTree = Route$16._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { SeaBackdrop as a, WATCH_SOURCES as c, markSessionPull as d, parseWorkoutFile as f, spotPhoto as h, SEA as i, commitWorkouts as l, router_exports as m, Route$2 as n, SeaPhoto as o, pullAndImport as p, Route$5 as r, TideRule as s, Route$12 as t, getRouter as u };
