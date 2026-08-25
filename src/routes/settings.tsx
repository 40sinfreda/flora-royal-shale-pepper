import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/shell";
import { SettingsBody } from "@/components/settings-panel";
import { useT } from "@/lib/tideline/place-store";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const t = useT();
  return (
    <Page className="max-w-xl">
      <p className="text-xs font-medium uppercase tracking-widest text-accent">
        {t("settings.kicker")}
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-fg">
        {t("settings.title")}
      </h1>
      <p className="mt-2 text-muted">{t("settings.lead")}</p>
      <div className="mt-8 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] sm:p-6">
        <SettingsBody />
      </div>
    </Page>
  );
}
