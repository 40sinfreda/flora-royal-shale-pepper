import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resolveMapsPin } from "@/lib/tideline/api";
import { looksLikeMapsLink, parseMapsPin, type MapsPin } from "@/lib/tideline/maps-pin";
import { useT } from "@/lib/tideline/place-store";

export function MapsPinField({
  link,
  onLink,
  pin,
  onPin,
}: {
  link: string;
  onLink: (value: string) => void;
  pin: MapsPin | null;
  onPin: (pin: MapsPin | null) => void;
}) {
  const t = useT();
  const [checking, setChecking] = useState(false);
  const onPinRef = useRef(onPin);
  onPinRef.current = onPin;

  useEffect(() => {
    const text = link.trim();
    if (!text) {
      onPinRef.current(null);
      setChecking(false);
      return;
    }
    const direct = parseMapsPin(text);
    if (direct) {
      onPinRef.current(direct);
      setChecking(false);
      return;
    }
    if (!looksLikeMapsLink(text)) {
      onPinRef.current(null);
      setChecking(false);
      return;
    }
    setChecking(true);
    const handle = window.setTimeout(() => {
      void resolveMapsPin({ data: text })
        .then((found) => onPinRef.current(found))
        .catch(() => onPinRef.current(null))
        .finally(() => setChecking(false));
    }, 450);
    return () => window.clearTimeout(handle);
  }, [link]);

  return (
    <div className="space-y-1.5">
      <Label>{t("spotNew.maps")}</Label>
      <Input
        dir="ltr"
        value={link}
        onChange={(e) => onLink(e.target.value)}
        placeholder={t("spotNew.mapsPh")}
        autoComplete="off"
      />
      <p className="text-xs text-faint">{t("spotNew.mapsHelp")}</p>
      {checking ? <p className="text-sm text-muted">{t("spotNew.mapsChecking")}</p> : null}
      {!checking && pin ? <p className="text-sm text-accent">{t("spotNew.mapsOk")}</p> : null}
    </div>
  );
}
