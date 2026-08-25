import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import {
  GROK_PROVIDERS,
  authClient,
  authEnabled,
  signIn,
} from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { TideRule } from "@/components/tide-rule";
import { usePlaceStore, useT } from "@/lib/tideline/place-store";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const t = useT();
  const setLocale = usePlaceStore((s) => s.setLocale);
  const locale = usePlaceStore((s) => s.locale);
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === "up") {
        const res = await authClient.signUp.email({
          email,
          password,
          name: name.trim() || email.split("@")[0] || "Swimmer",
        });
        if (res.error) throw new Error(res.error.message ?? t("groupNew.err"));
      } else {
        const res = await authClient.signIn.email({ email, password });
        if (res.error) throw new Error(res.error.message ?? t("auth.signIn"));
      }
      let next = "/";
      try {
        const stored = sessionStorage.getItem("tideline-next");
        if (stored && stored.startsWith("/") && !stored.startsWith("//")) next = stored;
        sessionStorage.removeItem("tideline-next");
      } catch {
        /* ignore */
      }
      window.location.href = next;
    } catch (err) {
      setError(err instanceof Error ? err.message : t("toast.clubFail"));
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-dvh lg:grid-cols-2">
      <section className="relative hidden min-h-dvh overflow-hidden lg:flex">
        <img
          src="/sea/login.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="sea-scrim-side pointer-events-none absolute inset-0" />
        <div className="relative flex w-full flex-col justify-between p-10">
          <Logo />
          <div className="max-w-md">
            <p className="text-xs uppercase tracking-widest text-accent">
              {t("login.kicker")}
            </p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-tight text-fg">
              {t("login.hero")}
            </h1>
            <div className="mt-6 max-w-xs">
              <TideRule />
            </div>
            <p className="mt-6 text-fg/90">{t("login.heroLead")}</p>
          </div>
          <p className="text-xs text-fg/70">{t("login.brandLine")}</p>
        </div>
      </section>

      <section className="flex items-center justify-center bg-bg px-4 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Logo />
            <button
              type="button"
              className="h-11 px-3 text-sm text-muted"
              onClick={() => setLocale(locale === "he" ? "en" : "he")}
            >
              {locale === "he" ? t("lang.en") : t("lang.he")}
            </button>
          </div>
          <h2 className="font-display text-3xl font-medium text-fg">
            {mode === "in" ? t("login.in") : t("login.up")}
          </h2>
          <p className="mt-2 text-sm text-muted">
            {mode === "in" ? t("login.inLead") : t("login.upLead")}
          </p>

          {authEnabled ? (
            <div className="mt-8 space-y-3">
              {GROK_PROVIDERS.map((p) => (
                <Button
                  key={p.providerId}
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    let next = "/";
                    try {
                      const stored = sessionStorage.getItem("tideline-next");
                      if (stored && stored.startsWith("/") && !stored.startsWith("//")) {
                        next = stored;
                      }
                    } catch {
                      /* ignore */
                    }
                    void signIn(p.providerId, { callbackURL: next });
                  }}
                >
                  {t("login.continueWith", { name: p.label })}
                </Button>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm text-muted">{t("login.disabled")}</p>
          )}

          <div className="my-8 flex items-center gap-3">
            <span className="h-px flex-1 bg-line" />
            <span className="text-xs uppercase tracking-widest text-faint">
              {t("login.orEmail")}
            </span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <form className="space-y-4" onSubmit={onSubmit}>
            {mode === "up" ? (
              <Field label={t("login.name")}>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("login.namePh")}
                  autoComplete="name"
                />
              </Field>
            ) : null}
            <Field label={t("login.email")}>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </Field>
            <Field label={t("login.password")}>
              <Input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("login.passwordPh")}
                autoComplete={mode === "up" ? "new-password" : "current-password"}
              />
            </Field>
            {error ? <p className="text-sm text-danger">{error}</p> : null}
            <Button type="submit" className="w-full" disabled={busy}>
              {busy
                ? t("login.wait")
                : mode === "in"
                  ? t("login.submitIn")
                  : t("login.submitUp")}
            </Button>
          </form>

          <p className="mt-6 text-sm text-muted">
            {mode === "in" ? t("login.new") : t("login.member")}{" "}
            <button
              type="button"
              className="text-accent hover:underline"
              onClick={() => {
                setMode(mode === "in" ? "up" : "in");
                setError(null);
              }}
            >
              {mode === "in" ? t("login.join") : t("login.in")}
            </button>
          </p>
          <p className="mt-8 text-sm">
            <Link to="/" className="text-faint hover:text-fg">
              {t("login.back")}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <Label>{label}</Label>
      {children}
    </label>
  );
}
