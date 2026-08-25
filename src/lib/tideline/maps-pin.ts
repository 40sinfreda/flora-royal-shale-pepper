export type MapsPin = { lat: number; lng: number };

function pin(latRaw: string, lngRaw: string): MapsPin | null {
  const lat = Number(latRaw);
  const lng = Number(lngRaw);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;
  if (lat === 0 && lng === 0) return null;
  return { lat, lng };
}

function decode(text: string) {
  try {
    return decodeURIComponent(text.replace(/\+/g, " "));
  } catch {
    return text;
  }
}

export function parseMapsPin(input: string): MapsPin | null {
  const text = decode(input.trim());
  if (!text) return null;

  const geo = text.match(/^geo:([+-]?\d+(?:\.\d+)?),([+-]?\d+(?:\.\d+)?)/i);
  if (geo) return pin(geo[1], geo[2]);

  const bang34 = text.match(/!3d([+-]?\d+(?:\.\d+)?)!4d([+-]?\d+(?:\.\d+)?)/);
  if (bang34) return pin(bang34[1], bang34[2]);

  const bang23 = text.match(/!2d([+-]?\d+(?:\.\d+)?)!3d([+-]?\d+(?:\.\d+)?)/);
  if (bang23) return pin(bang23[2], bang23[1]);

  const wazeTo = text.match(/[?&#]to=ll\.([+-]?\d+(?:\.\d+)?),([+-]?\d+(?:\.\d+)?)/i);
  if (wazeTo) return pin(wazeTo[1], wazeTo[2]);

  const named = text.match(
    /[?&#](?:ll|latlng|q|query|destination|destination_place_id|center|daddr|sll)=([+-]?\d+(?:\.\d+)?)[,/\s]+([+-]?\d+(?:\.\d+)?)/i,
  );
  if (named) return pin(named[1], named[2]);

  const at = text.match(/@([+-]?\d+(?:\.\d+)?),([+-]?\d+(?:\.\d+)?)/);
  if (at) return pin(at[1], at[2]);

  const pathPair = text.match(
    /(?:maps\/dir\/(?:[^/]+\/)?|maps\/search\/)([+-]?\d+(?:\.\d+)?),([+-]?\d+(?:\.\d+)?)/i,
  );
  if (pathPair) return pin(pathPair[1], pathPair[2]);

  const latp = text.match(/[?&#]lat=([+-]?\d+(?:\.\d+)?)/i);
  const lngp = text.match(/[?&#](?:lng|lon|long|longitude)=([+-]?\d+(?:\.\d+)?)/i);
  if (latp && lngp) return pin(latp[1], lngp[1]);

  const raw = text.match(
    /^([+-]?\d+(?:\.\d+)?)\s*[,/\s]\s*([+-]?\d+(?:\.\d+)?)\s*$/,
  );
  if (raw) return pin(raw[1], raw[2]);

  return null;
}

export function looksLikeMapsLink(input: string) {
  const text = input.trim().toLowerCase();
  if (!/^https?:\/\//.test(text)) return false;
  return (
    (text.includes("google.") && text.includes("/maps")) ||
    text.includes("maps.google.") ||
    text.includes("maps.app.goo.gl") ||
    text.includes("goo.gl/maps") ||
    text.includes("waze.com")
  );
}

export function mapsLinkFromPin(pinValue: MapsPin) {
  return `https://www.google.com/maps?q=${pinValue.lat},${pinValue.lng}`;
}
