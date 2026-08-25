import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { K as difficultyLabel, gt as regionLabel, ot as localizedSpot, st as placeLine, vt as usePlaceStore, yt as useT } from "./router-PvLfXnWv.mjs";
import { t as require_leaflet_src } from "../_libs/leaflet.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/atlas-4EXrtIJy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_leaflet_src = /* @__PURE__ */ __toESM(require_leaflet_src());
var TILES = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
function Atlas({ spots, activeSlug }) {
	const navigate = useNavigate();
	const t = useT();
	const locale = usePlaceStore((s) => s.locale);
	const hostRef = (0, import_react.useRef)(null);
	const mapRef = (0, import_react.useRef)(null);
	const layerRef = (0, import_react.useRef)(null);
	const [hover, setHover] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const el = hostRef.current;
		if (!el) return;
		const map = import_leaflet_src.default.map(el, {
			zoomControl: true,
			attributionControl: true,
			scrollWheelZoom: false,
			zoomSnap: .25
		});
		import_leaflet_src.default.tileLayer(TILES, {
			attribution: "Esri",
			maxZoom: 18
		}).addTo(map);
		const layer = import_leaflet_src.default.layerGroup().addTo(map);
		mapRef.current = map;
		layerRef.current = layer;
		const ro = new ResizeObserver(() => {
			map.invalidateSize();
		});
		ro.observe(el);
		return () => {
			ro.disconnect();
			map.remove();
			mapRef.current = null;
			layerRef.current = null;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const map = mapRef.current;
		const layer = layerRef.current;
		if (!map || !layer) return;
		layer.clearLayers();
		const markers = [];
		for (const raw of spots) {
			const spot = localizedSpot(raw, locale);
			const marker = import_leaflet_src.default.circleMarker([spot.lat, spot.lng], {
				radius: spot.slug === activeSlug ? 10 : 7,
				color: "var(--color-fg)",
				weight: 2,
				fillColor: "var(--color-accent)",
				fillOpacity: 1,
				opacity: 1
			});
			marker.on("mouseover", () => {
				setHover(spot.slug);
				marker.setRadius(10);
				marker.bringToFront();
			});
			marker.on("mouseout", () => {
				setHover((current) => current === spot.slug ? null : current);
				marker.setRadius(7);
			});
			marker.on("click", () => {
				navigate({
					to: "/spots/$slug",
					params: { slug: spot.slug }
				});
			});
			marker.addTo(layer);
			markers.push(marker);
		}
		map.invalidateSize();
		if (markers.length === 0) map.setView([31.5, 34.85], 7);
		else if (markers.length === 1) map.setView(markers[0].getLatLng(), 13);
		else {
			const group = import_leaflet_src.default.featureGroup(markers);
			map.fitBounds(group.getBounds(), {
				padding: [36, 36],
				maxZoom: 12
			});
		}
	}, [
		spots,
		locale,
		navigate,
		activeSlug
	]);
	const focused = spots.map((spot) => localizedSpot(spot, locale)).find((spot) => spot.slug === (hover ?? activeSlug));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[2/1] w-full overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: hostRef,
				className: "atlas-map absolute inset-0",
				role: "img",
				"aria-label": t("atlas.label")
			}), focused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute bottom-3 start-3 end-3 z-20 sm:start-auto sm:end-3 sm:w-72",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-bg/90 p-3 shadow-[var(--shadow-border)] backdrop-blur-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs uppercase tracking-widest text-accent",
							children: [
								regionLabel(locale, focused.region),
								" ·",
								" ",
								difficultyLabel(focused.difficulty, locale)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg text-fg",
							children: focused.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: placeLine(focused.city, focused.country, locale)
						})
					]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pointer-events-none absolute bottom-3 start-3 z-20 text-xs uppercase tracking-widest text-fg/80",
				children: t("atlas.hint", { n: spots.length })
			})]
		})
	});
}
//#endregion
export { Atlas as t };
