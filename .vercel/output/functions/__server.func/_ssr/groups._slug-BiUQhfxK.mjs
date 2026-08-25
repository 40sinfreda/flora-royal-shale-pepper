import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as isWhatsappUrl } from "./place-Bp16cyux.mjs";
import { c as MessageCircle } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as listSpots, P as removeClubMember, U as Page, _ as listClubMembers, _t as usePlaceFilter, a as deleteClub, at as localizeSpotField, ft as Button, h as leaveClub, ht as countryLabel, l as getMyClubAccess, lt as useCurrentUserState, m as joinClub, tt as isUnauthorized, ut as useLoad, vt as usePlaceStore, yt as useT, z as updateClub } from "./router-PvLfXnWv.mjs";
import { r as Route$5 } from "./router-PvLfXnWv2.mjs";
import { n as Label, t as Input } from "./label-uWd1WSk2.mjs";
import { t as Select } from "./select-CDibZZWI.mjs";
import { t as Textarea } from "./textarea-BW0kypl0.mjs";
import { t as Skeleton } from "./skeleton-BvVD9v0T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/groups._slug-BiUQhfxK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GroupPage() {
	const t = useT();
	const locale = usePlaceStore((s) => s.locale);
	const loaded = Route$5.useLoaderData();
	const { slug } = Route$5.useParams();
	const { user, isPending } = useCurrentUserState();
	const navigate = useNavigate();
	const access = useLoad(async () => {
		if (isPending || !user) return null;
		try {
			return await getMyClubAccess({ data: slug });
		} catch (err) {
			if (isUnauthorized(err)) return null;
			throw err;
		}
	}, [
		slug,
		user?.id,
		isPending
	]);
	const club = access.data ?? loaded;
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (!loaded && !access.loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display text-3xl text-fg",
		children: t("group.notFound")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/groups",
		className: "mt-4 inline-block text-accent",
		children: t("group.back")
	})] });
	if (!club) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-12 w-64" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-6 h-40 rounded-xl" })] });
	const clubId = club.id;
	async function onJoin() {
		if (!user) {
			window.location.href = "/login";
			return;
		}
		setBusy(true);
		try {
			await joinClub({ data: clubId });
			toast(t("toast.joined"));
			access.reload();
		} catch (err) {
			if (isUnauthorized(err)) window.location.href = "/login";
		} finally {
			setBusy(false);
		}
	}
	async function onLeave() {
		setBusy(true);
		try {
			await leaveClub({ data: clubId });
			toast(t("toast.left"));
			access.reload();
		} catch {
			toast.error(t("group.cannotLeave"));
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs font-medium uppercase tracking-widest text-accent",
			children: [countryLabel(locale, club.country), club.isAdmin ? ` · ${t("groups.youAdmin")}` : ""]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex flex-wrap items-start justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl font-medium tracking-tight text-fg",
				children: club.name
			}), club.spotName && club.spotSlug ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-muted",
				children: [
					t("group.homeWater"),
					":",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/spots/$slug",
						params: { slug: club.spotSlug },
						className: "text-accent hover:underline",
						children: localizeSpotField(locale, club.spotSlug, "name", club.spotName)
					})
				]
			}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [club.isMember && club.whatsappUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: club.whatsappUrl,
						target: "_blank",
						rel: "noreferrer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }), t("groups.whatsapp")]
					})
				}) : null, !club.isMember ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => void onJoin(),
					disabled: busy,
					children: busy ? t("groups.joining") : t("groups.join")
				}) : club.isAdmin ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "subtle",
					onClick: () => void onLeave(),
					disabled: busy,
					children: t("groups.leave")
				})]
			})]
		}),
		club.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 max-w-2xl text-base leading-relaxed text-muted",
			children: club.description
		}) : null,
		club.isMember && !club.whatsappUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm text-faint",
			children: t("groups.whatsappMissing")
		}) : null,
		club.isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPanel, {
			club,
			onSaved: access.reload,
			onDeleted: () => void navigate({ to: "/groups" })
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-10 text-sm text-faint",
			children: t("groups.onlyAdminManages")
		})
	] });
}
function AdminPanel({ club, onSaved, onDeleted }) {
	const t = useT();
	const locale = usePlaceStore((s) => s.locale);
	const filter = usePlaceFilter();
	const spots = useLoad(() => listSpots({ data: filter }), [`${filter.country ?? ""}:${filter.region ?? ""}`]);
	const members = useLoad(() => listClubMembers({ data: club.id }), [club.id]);
	const [name, setName] = (0, import_react.useState)(club.name);
	const [description, setDescription] = (0, import_react.useState)(club.description);
	const [whatsappUrl, setWhatsappUrl] = (0, import_react.useState)(club.whatsappUrl ?? "");
	const [spotId, setSpotId] = (0, import_react.useState)(club.spotId ? String(club.spotId) : "");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setName(club.name);
		setDescription(club.description);
		setWhatsappUrl(club.whatsappUrl ?? "");
		setSpotId(club.spotId ? String(club.spotId) : "");
	}, [
		club.id,
		club.name,
		club.description,
		club.whatsappUrl,
		club.spotId
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-12 grid gap-10 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-4 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
			onSubmit: async (e) => {
				e.preventDefault();
				if (whatsappUrl && !isWhatsappUrl(whatsappUrl)) {
					toast.error(t("groupNew.badWa"));
					return;
				}
				setBusy(true);
				try {
					await updateClub({ data: {
						clubId: club.id,
						name,
						description,
						whatsappUrl,
						spotId: spotId ? Number(spotId) : null
					} });
					toast(t("toast.clubSaved"));
					onSaved();
				} catch {
					toast.error(t("toast.clubFail"));
				} finally {
					setBusy(false);
				}
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-fg",
					children: t("group.manage")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("group.name"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						required: true,
						value: name,
						onChange: (e) => setName(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("group.spot"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: spotId,
						onChange: (e) => setSpotId(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: t("group.spotNone")
						}), (spots.data ?? []).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s.id,
							children: localizeSpotField(locale, s.slug, "name", s.name)
						}, s.id))]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("group.desc"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: description,
						onChange: (e) => setDescription(e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
					label: t("group.whatsapp"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: whatsappUrl,
						onChange: (e) => setWhatsappUrl(e.target.value),
						placeholder: t("group.whatsappPh")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-faint",
						children: t("group.whatsappHelp")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: busy,
						children: busy ? t("group.saving") : t("group.save")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "danger",
						onClick: async () => {
							setBusy(true);
							try {
								await deleteClub({ data: club.id });
								toast(t("toast.clubDeleted"));
								onDeleted();
							} catch {
								toast.error(t("toast.clubFail"));
								setBusy(false);
							}
						},
						children: t("group.delete")
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl text-fg",
			children: t("group.members")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 space-y-2",
			children: (members.data ?? []).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between rounded-lg bg-surface px-4 py-3 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-sm text-fg",
					children: [m.displayName, m.isAdmin ? ` · ${t("groups.admin")}` : ""]
				}), !m.isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 px-2 text-xs text-faint hover:text-danger",
					onClick: async () => {
						try {
							await removeClubMember({ data: {
								clubId: club.id,
								userId: m.userId
							} });
							members.reload();
							onSaved();
						} catch {
							toast.error(t("toast.clubFail"));
						}
					},
					children: t("group.remove")
				}) : null]
			}, m.userId))
		})] })]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
//#endregion
export { GroupPage as component };
