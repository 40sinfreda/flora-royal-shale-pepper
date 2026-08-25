import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as MessageCircle, i as Users } from "../_libs/lucide-react.mjs";
import { ft as Button, ht as countryLabel, vt as usePlaceStore, yt as useT } from "./router-PvLfXnWv.mjs";
import { h as spotPhoto, i as SEA, o as SeaPhoto } from "./router-PvLfXnWv2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/club-card-BMchp_ZZ.js
var import_jsx_runtime = require_jsx_runtime();
function ClubCard({ club, busy, onJoin, onLeave }) {
	const t = useT();
	const locale = usePlaceStore((s) => s.locale);
	const photo = club.spotSlug ? spotPhoto(club.spotSlug, "sea") : SEA.swimmers;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeaPhoto, {
				src: photo,
				alt: ""
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-surface to-transparent" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-start justify-between gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-medium uppercase tracking-widest text-accent",
							children: [countryLabel(locale, club.country), club.isAdmin ? ` · ${t("groups.admin")}` : ""]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 font-display text-xl font-semibold text-fg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/groups/$slug",
								params: { slug: club.slug },
								className: "hover:text-accent",
								children: club.name
							})
						}),
						club.spotName && club.spotSlug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/spots/$slug",
								params: { slug: club.spotSlug },
								className: "hover:text-fg",
								children: club.spotName
							})
						}) : null
					] })
				}),
				club.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: club.description
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 text-xs text-faint",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5" }), club.memberCount === 1 ? t("groups.memberOne") : t("groups.members", { n: club.memberCount })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [club.isMember && club.whatsappUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: club.whatsappUrl,
								target: "_blank",
								rel: "noreferrer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }), t("groups.whatsapp")]
							})
						}) : null, onJoin && onLeave ? club.isMember && !club.isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "subtle",
							disabled: busy,
							onClick: () => onLeave(club.id),
							children: t("groups.leave")
						}) : club.isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "subtle",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/groups/$slug",
								params: { slug: club.slug },
								children: t("group.manage")
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							disabled: busy,
							onClick: () => onJoin(club.id),
							children: busy ? t("groups.joining") : t("groups.join")
						}) : null]
					})]
				})
			]
		})]
	});
}
//#endregion
export { ClubCard as t };
