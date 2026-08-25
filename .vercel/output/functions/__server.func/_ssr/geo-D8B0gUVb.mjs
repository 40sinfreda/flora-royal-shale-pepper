//#region node_modules/.nitro/vite/services/ssr/assets/geo-D8B0gUVb.js
function haversineKm(lat1, lng1, lat2, lng2) {
	const R = 6371;
	const dLat = (lat2 - lat1) * Math.PI / 180;
	const dLng = (lng2 - lng1) * Math.PI / 180;
	const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
	return 2 * R * Math.asin(Math.min(1, Math.sqrt(a)));
}
function nearestByKm(items, lat, lng) {
	let best = null;
	let bestKm = Infinity;
	for (const item of items) {
		const km = haversineKm(lat, lng, item.lat, item.lng);
		if (km < bestKm) {
			bestKm = km;
			best = item;
		}
	}
	return best ? {
		item: best,
		km: bestKm
	} : null;
}
//#endregion
export { nearestByKm as n, haversineKm as t };
