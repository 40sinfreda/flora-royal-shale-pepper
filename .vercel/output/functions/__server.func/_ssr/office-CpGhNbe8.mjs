import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as COUNTRIES } from "./place-Bp16cyux.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { K as difficultyLabel, Q as formatKm, U as Page, X as formatDateTime, Y as formatDate, at as localizeSpotField, dt as waterLabel, ft as Button, ht as countryLabel, lt as useCurrentUserState, mt as cn, tt as isUnauthorized, ut as useLoad, vt as usePlaceStore, yt as useT } from "./router-PvLfXnWv.mjs";
import { n as Label, t as Input } from "./label-uWd1WSk2.mjs";
import { t as Select } from "./select-CDibZZWI.mjs";
import { t as Textarea } from "./textarea-BW0kypl0.mjs";
import { t as Skeleton } from "./skeleton-BvVD9v0T.mjs";
import { t as RedirectToSignIn } from "./gates-TlwD99gA.mjs";
import { i as WATER_TYPES, n as DIFFICULTIES } from "./types-DAe4BlRl.mjs";
import { C as officeStats, D as officeUpdateSpot, E as officeUpdatePerson, O as officeUpdateStory, S as officeRemoveClubMember, T as officeUpdateGathering, _ as officeListPeople, a as officeCreateSpot, b as officeListStories, c as officeDeleteGathering, d as officeDeleteSpot, f as officeDeleteStory, g as officeListGatherings, h as officeListClubs, i as officeCreateGathering, k as officeUpdateSwim, l as officeDeletePerson, m as officeListClubMembers, n as getOfficeAccess, o as officeCreateStory, p as officeDeleteSwim, r as officeCreateClub, s as officeDeleteClub, t as claimOffice, u as officeDeleteReport, v as officeListReports, w as officeUpdateClub, x as officeListSwims, y as officeListSpots } from "./office-DPBthlJP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/office-CpGhNbe8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	{
		key: "home",
		label: "office.tab.home"
	},
	{
		key: "spots",
		label: "office.tab.spots"
	},
	{
		key: "groups",
		label: "office.tab.groups"
	},
	{
		key: "gatherings",
		label: "office.tab.gatherings"
	},
	{
		key: "stories",
		label: "office.tab.stories"
	},
	{
		key: "reports",
		label: "office.tab.reports"
	},
	{
		key: "swims",
		label: "office.tab.swims"
	},
	{
		key: "people",
		label: "office.tab.people"
	}
];
function OfficePage() {
	const t = useT();
	const { user, isPending } = useCurrentUserState();
	const access = useLoad(async () => {
		if (isPending || !user) return null;
		return getOfficeAccess();
	}, [user?.id, isPending]);
	const [tab, setTab] = (0, import_react.useState)("home");
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (isPending || access.loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-48" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-6 h-64 w-full rounded-xl" })] });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (isUnauthorized(access.error) || access.error === "Unauthorized") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	const status = access.data?.status;
	async function take() {
		setBusy(true);
		try {
			const next = await claimOffice();
			access.setData(next);
			if (next.status !== "owner") toast.error(t("office.locked"));
		} catch (err) {
			if (isUnauthorized(err)) window.location.href = "/login";
			else toast.error(t("office.fail"));
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		className: "max-w-6xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-wide text-accent",
				children: t("office.kicker")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl font-medium tracking-tight text-fg",
				children: t("office.title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-muted",
				children: t("office.lead")
			}),
			status === "locked" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 rounded-xl bg-surface p-6 shadow-[var(--shadow-border)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-fg",
					children: t("office.locked")
				})
			}) : status === "open" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 max-w-lg rounded-xl bg-surface p-6 shadow-[var(--shadow-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted",
					children: t("office.takeLead")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-5",
					onClick: () => void take(),
					disabled: busy,
					children: busy ? t("office.saving") : t("office.take")
				})]
			}) : status === "owner" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-accent",
					children: t("office.owned")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 -mx-4 flex gap-1 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0",
					children: TABS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setTab(item.key),
						className: cn("h-11 shrink-0 rounded-md px-3 text-sm", tab === item.key ? "bg-raised text-fg" : "text-muted hover:text-fg"),
						children: t(item.label)
					}, item.key))
				}),
				tab === "home" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overview, {}) : null,
				tab === "spots" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotsPanel, {}) : null,
				tab === "groups" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupsPanel, {}) : null,
				tab === "gatherings" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GatheringsPanel, {}) : null,
				tab === "stories" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoriesPanel, {}) : null,
				tab === "reports" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportsPanel, {}) : null,
				tab === "swims" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwimsPanel, {}) : null,
				tab === "people" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PeoplePanel, {}) : null
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-muted",
				children: t("office.forbidden")
			})
		]
	});
}
function Overview() {
	const t = useT();
	const stats = useLoad(() => officeStats(), []);
	if (stats.loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-8 h-40 rounded-xl" });
	const s = stats.data;
	if (!s) return null;
	const cards = [
		{
			label: "office.tab.spots",
			value: s.spots
		},
		{
			label: "office.tab.groups",
			value: s.groups
		},
		{
			label: "office.tab.gatherings",
			value: s.gatherings
		},
		{
			label: "office.tab.stories",
			value: s.stories
		},
		{
			label: "office.tab.reports",
			value: s.reports
		},
		{
			label: "office.tab.swims",
			value: s.swims
		},
		{
			label: "office.tab.people",
			value: s.people
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
		className: "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4",
		children: cards.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-xs text-muted",
				children: t(c.label)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "mt-1 font-display text-2xl text-fg",
				children: c.value
			})]
		}, c.label))
	});
}
function useSpotsCatalog() {
	return useLoad(() => officeListSpots(), []);
}
function SpotsPanel() {
	const t = useT();
	const locale = usePlaceStore((s) => s.locale);
	const list = useSpotsCatalog();
	const [selected, setSelected] = (0, import_react.useState)(null);
	const current = (0, import_react.useMemo)(() => typeof selected === "number" ? list.data?.find((s) => s.id === selected) : null, [list.data, selected]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Split, {
		list: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, {
			loading: list.loading,
			empty: t("office.empty"),
			onNew: () => setSelected("new"),
			newLabel: t("office.new"),
			items: (list.data ?? []).map((s) => ({
				id: s.id,
				title: localizeSpotField(locale, s.slug, "name", s.name),
				meta: `${s.city} · ${countryLabel(locale, s.country)}`,
				active: selected === s.id,
				onClick: () => setSelected(s.id)
			}))
		}),
		form: selected === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hint, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotForm, {
			spot: current ?? null,
			onDone: () => {
				list.reload();
			},
			onDeleted: () => {
				setSelected(null);
				list.reload();
			}
		}, selected === "new" ? "new" : selected)
	});
}
function SpotForm({ spot, onDone, onDeleted }) {
	const t = useT();
	const locale = usePlaceStore((s) => s.locale);
	const [name, setName] = (0, import_react.useState)(spot?.name ?? "");
	const [city, setCity] = (0, import_react.useState)(spot?.city ?? "");
	const [country, setCountry] = (0, import_react.useState)(spot?.country ?? "Israel");
	const [waterType, setWaterType] = (0, import_react.useState)(spot?.waterType ?? "sea");
	const [difficulty, setDifficulty] = (0, import_react.useState)(spot?.difficulty ?? "gentle");
	const [typicalKm, setTypicalKm] = (0, import_react.useState)(spot?.typicalKm != null ? String(spot.typicalKm) : "");
	const [typicalTempC, setTypicalTempC] = (0, import_react.useState)(spot?.typicalTempC != null ? String(spot.typicalTempC) : "");
	const [bestSeason, setBestSeason] = (0, import_react.useState)(spot?.bestSeason ?? "");
	const [hazards, setHazards] = (0, import_react.useState)(spot?.hazards ?? "");
	const [description, setDescription] = (0, import_react.useState)(spot?.description ?? "");
	const [lat, setLat] = (0, import_react.useState)(spot ? String(spot.lat) : "");
	const [lng, setLng] = (0, import_react.useState)(spot ? String(spot.lng) : "");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		const payload = {
			name,
			city,
			country,
			waterType,
			difficulty,
			typicalKm: typicalKm ? Number(typicalKm) : null,
			typicalTempC: typicalTempC ? Number(typicalTempC) : null,
			bestSeason,
			hazards,
			description,
			lat: Number(lat),
			lng: Number(lng)
		};
		setBusy(true);
		try {
			if (spot) await officeUpdateSpot({ data: {
				id: spot.id,
				...payload
			} });
			else await officeCreateSpot({ data: payload });
			toast.success(t("office.saved"));
			onDone();
		} catch (err) {
			handleErr(err, t("spotNew.poolErr"), t("office.fail"));
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-4",
		onSubmit: (e) => void onSubmit(e),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("spotNew.name"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					required: true,
					minLength: 2,
					value: name,
					onChange: (e) => setName(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("spotNew.city"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						required: true,
						value: city,
						onChange: (e) => setCity(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("spotNew.country"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: country,
						onChange: (e) => setCountry(e.target.value),
						children: COUNTRIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.name,
							children: countryLabel(locale, c.name)
						}, c.name))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("spotNew.water"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: waterType,
						onChange: (e) => setWaterType(e.target.value),
						children: WATER_TYPES.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: w,
							children: waterLabel(w, locale)
						}, w))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("spotNew.grade"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: difficulty,
						onChange: (e) => setDifficulty(e.target.value),
						children: DIFFICULTIES.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: d,
							children: difficultyLabel(d, locale)
						}, d))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("spotNew.km"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: .1,
						step: .1,
						value: typicalKm,
						onChange: (e) => setTypicalKm(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("spotNew.temp"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						step: .5,
						value: typicalTempC,
						onChange: (e) => setTypicalTempC(e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("spotNew.season"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: bestSeason,
					onChange: (e) => setBestSeason(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("spotNew.hazards"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: hazards,
					onChange: (e) => setHazards(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("spotNew.desc"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					required: true,
					minLength: 8,
					value: description,
					onChange: (e) => setDescription(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("spotNew.lat"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						required: true,
						type: "number",
						step: "0.0001",
						value: lat,
						onChange: (e) => setLat(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("spotNew.lng"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						required: true,
						type: "number",
						step: "0.0001",
						value: lng,
						onChange: (e) => setLng(e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormActions, {
				busy,
				canDelete: Boolean(spot),
				onDelete: async () => {
					if (!spot) return;
					await officeDeleteSpot({ data: spot.id });
					toast.success(t("office.deleted"));
					onDeleted();
				}
			})
		]
	});
}
function GroupsPanel() {
	const t = useT();
	const locale = usePlaceStore((s) => s.locale);
	const list = useLoad(() => officeListClubs(), []);
	const spots = useSpotsCatalog();
	const [selected, setSelected] = (0, import_react.useState)(null);
	const current = (0, import_react.useMemo)(() => typeof selected === "number" ? list.data?.find((c) => c.id === selected) : null, [list.data, selected]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Split, {
		list: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, {
			loading: list.loading,
			empty: t("office.empty"),
			onNew: () => setSelected("new"),
			newLabel: t("office.new"),
			items: (list.data ?? []).map((c) => ({
				id: c.id,
				title: c.name,
				meta: `${c.spotName ?? t("group.spotNone")} · ${countryLabel(locale, c.country)}`,
				active: selected === c.id,
				onClick: () => setSelected(c.id)
			}))
		}),
		form: selected === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hint, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupForm, {
			club: current ?? null,
			spots: spots.data ?? [],
			onDone: () => void list.reload(),
			onDeleted: () => {
				setSelected(null);
				list.reload();
			}
		}, selected === "new" ? "new" : selected)
	});
}
function GroupForm({ club, spots, onDone, onDeleted }) {
	const t = useT();
	const locale = usePlaceStore((s) => s.locale);
	const [name, setName] = (0, import_react.useState)(club?.name ?? "");
	const [description, setDescription] = (0, import_react.useState)(club?.description ?? "");
	const [country, setCountry] = (0, import_react.useState)(club?.country ?? "Israel");
	const [spotId, setSpotId] = (0, import_react.useState)(club?.spotId ? String(club.spotId) : "");
	const [whatsappUrl, setWhatsappUrl] = (0, import_react.useState)(club?.whatsappUrl ?? "");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const members = useLoad(async () => {
		if (!club) return [];
		return officeListClubMembers({ data: club.id });
	}, [club?.id]);
	async function onSubmit(e) {
		e.preventDefault();
		const payload = {
			name,
			description,
			country,
			spotId: spotId ? Number(spotId) : null,
			whatsappUrl
		};
		setBusy(true);
		try {
			if (club) await officeUpdateClub({ data: {
				id: club.id,
				...payload
			} });
			else await officeCreateClub({ data: payload });
			toast.success(t("office.saved"));
			onDone();
		} catch (err) {
			handleErr(err, t("groupNew.badWa"), t("office.fail"));
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-4",
		onSubmit: (e) => void onSubmit(e),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("group.name"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					required: true,
					minLength: 2,
					value: name,
					onChange: (e) => setName(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("spotNew.country"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: country,
					onChange: (e) => setCountry(e.target.value),
					children: COUNTRIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.name,
						children: countryLabel(locale, c.name)
					}, c.name))
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
					}), spots.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("group.whatsapp"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: whatsappUrl,
					onChange: (e) => setWhatsappUrl(e.target.value),
					placeholder: t("group.whatsappPh")
				})
			}),
			club ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-wide text-muted",
				children: t("group.members")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-1",
				children: (members.data ?? []).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-fg",
						children: [m.displayName, m.isAdmin ? ` · ${t("groups.admin")}` : ""]
					}), m.isAdmin ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 px-2 text-muted hover:text-danger",
						onClick: async () => {
							try {
								await officeRemoveClubMember({ data: {
									clubId: club.id,
									userId: m.userId
								} });
								members.reload();
							} catch (err) {
								handleErr(err, t("office.fail"), t("office.fail"));
							}
						},
						children: t("group.remove")
					})]
				}, m.userId))
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormActions, {
				busy,
				canDelete: Boolean(club),
				onDelete: async () => {
					if (!club) return;
					await officeDeleteClub({ data: club.id });
					toast.success(t("office.deleted"));
					onDeleted();
				}
			})
		]
	});
}
function GatheringsPanel() {
	const t = useT();
	const locale = usePlaceStore((s) => s.locale);
	const list = useLoad(() => officeListGatherings(), []);
	const spots = useSpotsCatalog();
	const [selected, setSelected] = (0, import_react.useState)(null);
	const current = (0, import_react.useMemo)(() => typeof selected === "number" ? list.data?.find((g) => g.id === selected) : null, [list.data, selected]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Split, {
		list: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, {
			loading: list.loading,
			empty: t("office.empty"),
			onNew: () => setSelected("new"),
			newLabel: t("office.new"),
			items: (list.data ?? []).map((g) => ({
				id: g.id,
				title: g.title,
				meta: `${g.spotName} · ${formatDateTime(g.startsAt, locale)}`,
				active: selected === g.id,
				onClick: () => setSelected(g.id)
			}))
		}),
		form: selected === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hint, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GatheringForm, {
			gathering: current ?? null,
			spots: spots.data ?? [],
			onDone: () => void list.reload(),
			onDeleted: () => {
				setSelected(null);
				list.reload();
			}
		}, selected === "new" ? "new" : selected)
	});
}
function GatheringForm({ gathering, spots, onDone, onDeleted }) {
	const t = useT();
	const locale = usePlaceStore((s) => s.locale);
	const [title, setTitle] = (0, import_react.useState)(gathering?.title ?? "");
	const [spotId, setSpotId] = (0, import_react.useState)(gathering ? String(gathering.spotId) : "");
	const [startsAt, setStartsAt] = (0, import_react.useState)(gathering ? toLocalInput(gathering.startsAt) : "");
	const [distanceKm, setDistanceKm] = (0, import_react.useState)(gathering?.distanceKm != null ? String(gathering.distanceKm) : "");
	const [organizer, setOrganizer] = (0, import_react.useState)(gathering?.organizer ?? "");
	const [notes, setNotes] = (0, import_react.useState)(gathering?.notes ?? "");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		if (!spotId) return;
		const payload = {
			title,
			spotId: Number(spotId),
			startsAt: fromLocalInput(startsAt),
			distanceKm: distanceKm ? Number(distanceKm) : null,
			organizer,
			notes
		};
		setBusy(true);
		try {
			if (gathering) await officeUpdateGathering({ data: {
				id: gathering.id,
				...payload
			} });
			else await officeCreateGathering({ data: payload });
			toast.success(t("office.saved"));
			onDone();
		} catch (err) {
			handleErr(err, t("office.fail"), t("office.fail"));
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-4",
		onSubmit: (e) => void onSubmit(e),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("spotNew.name"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					required: true,
					minLength: 2,
					value: title,
					onChange: (e) => setTitle(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("log.spot"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					required: true,
					value: spotId,
					onChange: (e) => setSpotId(e.target.value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: t("log.choose")
					}), spots.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: s.id,
						children: localizeSpotField(locale, s.slug, "name", s.name)
					}, s.id))]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("office.starts"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					required: true,
					type: "datetime-local",
					value: startsAt,
					onChange: (e) => setStartsAt(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("log.km"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: .1,
						step: .1,
						value: distanceKm,
						onChange: (e) => setDistanceKm(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("office.organizer"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						required: true,
						value: organizer,
						onChange: (e) => setOrganizer(e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("office.notes"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: notes,
					onChange: (e) => setNotes(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormActions, {
				busy,
				canDelete: Boolean(gathering),
				onDelete: async () => {
					if (!gathering) return;
					await officeDeleteGathering({ data: gathering.id });
					toast.success(t("office.deleted"));
					onDeleted();
				}
			})
		]
	});
}
function StoriesPanel() {
	const t = useT();
	usePlaceStore((s) => s.locale);
	const list = useLoad(() => officeListStories(), []);
	const spots = useSpotsCatalog();
	const [selected, setSelected] = (0, import_react.useState)(null);
	const current = (0, import_react.useMemo)(() => typeof selected === "number" ? list.data?.find((s) => s.id === selected) : null, [list.data, selected]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Split, {
		list: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, {
			loading: list.loading,
			empty: t("office.empty"),
			onNew: () => setSelected("new"),
			newLabel: t("office.new"),
			items: (list.data ?? []).map((s) => ({
				id: s.id,
				title: s.title,
				meta: s.locationLabel || s.spotName || s.kind,
				active: selected === s.id,
				onClick: () => setSelected(s.id)
			}))
		}),
		form: selected === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hint, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryForm, {
			story: current ?? null,
			spots: spots.data ?? [],
			onDone: () => void list.reload(),
			onDeleted: () => {
				setSelected(null);
				list.reload();
			}
		}, selected === "new" ? "new" : selected)
	});
}
function StoryForm({ story, spots, onDone, onDeleted }) {
	const t = useT();
	const locale = usePlaceStore((s) => s.locale);
	const [title, setTitle] = (0, import_react.useState)(story?.title ?? "");
	const [body, setBody] = (0, import_react.useState)(story?.body ?? "");
	const [kind, setKind] = (0, import_react.useState)(story?.kind ?? "notice");
	const [locationLabel, setLocationLabel] = (0, import_react.useState)(story?.locationLabel ?? "");
	const [spotId, setSpotId] = (0, import_react.useState)(story?.spotId ? String(story.spotId) : "");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		const payload = {
			title,
			body,
			kind,
			locationLabel,
			spotId: spotId ? Number(spotId) : null
		};
		setBusy(true);
		try {
			if (story) await officeUpdateStory({ data: {
				id: story.id,
				...payload
			} });
			else await officeCreateStory({ data: payload });
			toast.success(t("office.saved"));
			onDone();
		} catch (err) {
			handleErr(err, t("office.fail"), t("office.fail"));
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-4",
		onSubmit: (e) => void onSubmit(e),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("spotNew.name"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					required: true,
					minLength: 2,
					value: title,
					onChange: (e) => setTitle(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("office.kind"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: kind,
					onChange: (e) => setKind(e.target.value),
					children: [
						"conditions",
						"crossing",
						"gathering",
						"notice"
					].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: k,
						children: t(k === "conditions" ? "kind.conditions" : k === "crossing" ? "kind.crossing" : k === "gathering" ? "kind.gathering" : "kind.notice")
					}, k))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("office.location"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: locationLabel,
					onChange: (e) => setLocationLabel(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("log.spot"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: spotId,
					onChange: (e) => setSpotId(e.target.value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: t("group.spotNone")
					}), spots.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: s.id,
						children: localizeSpotField(locale, s.slug, "name", s.name)
					}, s.id))]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("office.body"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					required: true,
					minLength: 8,
					value: body,
					onChange: (e) => setBody(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormActions, {
				busy,
				canDelete: Boolean(story),
				onDelete: async () => {
					if (!story) return;
					await officeDeleteStory({ data: story.id });
					toast.success(t("office.deleted"));
					onDeleted();
				}
			})
		]
	});
}
function ReportsPanel() {
	const t = useT();
	const locale = usePlaceStore((s) => s.locale);
	const list = useLoad(() => officeListReports(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6 space-y-3",
		children: [
			list.loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-40 rounded-xl" }) : null,
			!list.loading && (list.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl bg-surface p-6 text-sm text-muted shadow-[var(--shadow-border)]",
				children: t("office.empty")
			}) : null,
			(list.data ?? []).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-fg",
							children: [
								r.spotName,
								" · ",
								r.swimmerName
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: formatDate(r.createdAt, locale)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: r.notes
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "danger",
						onClick: async () => {
							if (!window.confirm(t("office.confirmDelete"))) return;
							try {
								await officeDeleteReport({ data: r.id });
								toast.success(t("office.deleted"));
								list.reload();
							} catch (err) {
								handleErr(err, t("office.fail"), t("office.fail"));
							}
						},
						children: t("office.delete")
					})]
				})
			}, r.id))
		]
	});
}
function SwimsPanel() {
	const t = useT();
	const locale = usePlaceStore((s) => s.locale);
	const list = useLoad(() => officeListSwims(), []);
	const spots = useSpotsCatalog();
	const [selected, setSelected] = (0, import_react.useState)(null);
	const current = (0, import_react.useMemo)(() => selected ? list.data?.find((s) => s.id === selected) : null, [list.data, selected]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Split, {
		list: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, {
			loading: list.loading,
			empty: t("office.empty"),
			items: (list.data ?? []).map((s) => ({
				id: s.id,
				title: `${s.swimmerName} · ${formatKm(s.distanceKm, locale)}`,
				meta: `${s.spotName} · ${formatDate(s.swamOn, locale)}`,
				active: selected === s.id,
				onClick: () => setSelected(s.id)
			}))
		}),
		form: current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwimForm, {
			swim: current,
			spots: spots.data ?? [],
			onDone: () => void list.reload(),
			onDeleted: () => {
				setSelected(null);
				list.reload();
			}
		}, current.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hint, {})
	});
}
function SwimForm({ swim, spots, onDone, onDeleted }) {
	const t = useT();
	const locale = usePlaceStore((s) => s.locale);
	const [spotId, setSpotId] = (0, import_react.useState)(String(swim.spotId));
	const [swamOn, setSwamOn] = (0, import_react.useState)(swim.swamOn);
	const [distanceKm, setDistanceKm] = (0, import_react.useState)(String(swim.distanceKm));
	const [durationMin, setDurationMin] = (0, import_react.useState)(swim.durationMin != null ? String(swim.durationMin) : "");
	const [waterTempC, setWaterTempC] = (0, import_react.useState)(swim.waterTempC != null ? String(swim.waterTempC) : "");
	const [notes, setNotes] = (0, import_react.useState)(swim.notes ?? "");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		setBusy(true);
		try {
			await officeUpdateSwim({ data: {
				id: swim.id,
				spotId: Number(spotId),
				swamOn,
				distanceKm: Number(distanceKm),
				durationMin: durationMin ? Number(durationMin) : null,
				waterTempC: waterTempC ? Number(waterTempC) : null,
				notes: notes || null
			} });
			toast.success(t("office.saved"));
			onDone();
		} catch (err) {
			handleErr(err, t("office.fail"), t("office.fail"));
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-4",
		onSubmit: (e) => void onSubmit(e),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: swim.swimmerName
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("log.spot"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: spotId,
					onChange: (e) => setSpotId(e.target.value),
					children: spots.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: s.id,
						children: localizeSpotField(locale, s.slug, "name", s.name)
					}, s.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("log.date"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "date",
					required: true,
					value: swamOn,
					onChange: (e) => setSwamOn(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("log.km"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: .1,
						step: .1,
						required: true,
						value: distanceKm,
						onChange: (e) => setDistanceKm(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("log.time"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: 1,
						value: durationMin,
						onChange: (e) => setDurationMin(e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("log.temp"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					step: .5,
					value: waterTempC,
					onChange: (e) => setWaterTempC(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("office.notes"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: notes,
					onChange: (e) => setNotes(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormActions, {
				busy,
				canDelete: true,
				onDelete: async () => {
					await officeDeleteSwim({ data: swim.id });
					toast.success(t("office.deleted"));
					onDeleted();
				}
			})
		]
	});
}
function PeoplePanel() {
	const t = useT();
	const list = useLoad(() => officeListPeople(), []);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const current = (0, import_react.useMemo)(() => selected ? list.data?.find((p) => p.userId === selected) : null, [list.data, selected]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Split, {
		list: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowList, {
			loading: list.loading,
			empty: t("office.empty"),
			items: (list.data ?? []).map((p) => ({
				id: p.userId,
				title: p.displayName,
				meta: p.isOwner ? t("office.ownerBadge") : `${p.swimCount}`,
				active: selected === p.userId,
				onClick: () => setSelected(p.userId)
			}))
		}),
		form: current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonForm, {
			person: current,
			onDone: () => void list.reload(),
			onDeleted: () => {
				setSelected(null);
				list.reload();
			}
		}, current.userId) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hint, {})
	});
}
function PersonForm({ person, onDone, onDeleted }) {
	const t = useT();
	const locale = usePlaceStore((s) => s.locale);
	const [displayName, setDisplayName] = (0, import_react.useState)(person.displayName);
	const [homeWater, setHomeWater] = (0, import_react.useState)(person.homeWater ?? "");
	const [stroke, setStroke] = (0, import_react.useState)(person.stroke ?? "");
	const [bio, setBio] = (0, import_react.useState)(person.bio ?? "");
	const [country, setCountry] = (0, import_react.useState)(person.country ?? "");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		setBusy(true);
		try {
			await officeUpdatePerson({ data: {
				userId: person.userId,
				displayName,
				homeWater,
				stroke,
				bio,
				country
			} });
			toast.success(t("office.saved"));
			onDone();
		} catch (err) {
			handleErr(err, t("office.fail"), t("office.fail"));
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-4",
		onSubmit: (e) => void onSubmit(e),
		children: [
			person.isOwner ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-accent",
				children: t("office.ownerBadge")
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("profile.name"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					required: true,
					value: displayName,
					onChange: (e) => setDisplayName(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("profile.homeWater"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: homeWater,
					onChange: (e) => setHomeWater(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("spotNew.country"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: country,
					onChange: (e) => setCountry(e.target.value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: t("group.spotNone")
					}), COUNTRIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.name,
						children: countryLabel(locale, c.name)
					}, c.name))]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("profile.stroke"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: stroke,
					onChange: (e) => setStroke(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("profile.bio"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: bio,
					onChange: (e) => setBio(e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormActions, {
				busy,
				canDelete: !person.isOwner,
				deleteLabel: t("office.removePerson"),
				onDelete: async () => {
					await officeDeletePerson({ data: person.userId });
					toast.success(t("office.deleted"));
					onDeleted();
				}
			}),
			person.isOwner ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-faint",
				children: t("office.cannotOwner")
			}) : null
		]
	});
}
function Split({ list, form }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: list }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]",
			children: form
		})]
	});
}
function Hint() {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm leading-relaxed text-muted",
		children: t("office.pick")
	});
}
function RowList({ loading, empty, items, onNew, newLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		onNew ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			size: "sm",
			variant: "outline",
			className: "mb-3",
			onClick: onNew,
			children: newLabel
		}) : null,
		loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-40 rounded-xl" }) : null,
		!loading && items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-xl bg-surface p-6 text-sm text-muted shadow-[var(--shadow-border)]",
			children: empty
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-1",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: item.onClick,
				className: cn("flex min-h-11 w-full flex-col items-start rounded-md px-3 py-2 text-start", item.active ? "bg-raised text-fg" : "text-fg hover:bg-raised/60"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm",
					children: item.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted",
					children: item.meta
				})]
			}) }, item.id))
		})
	] });
}
function FormActions({ busy, canDelete, onDelete, deleteLabel }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap gap-2 pt-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "submit",
			disabled: busy,
			children: busy ? t("office.saving") : t("office.save")
		}), canDelete ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "danger",
			disabled: busy,
			onClick: async () => {
				if (!window.confirm(t("office.confirmDelete"))) return;
				try {
					await onDelete();
				} catch (err) {
					handleErr(err, t("office.fail"), t("office.fail"));
				}
			},
			children: deleteLabel ?? t("office.delete")
		}) : null]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
function handleErr(err, special, fallback) {
	if (isUnauthorized(err)) {
		window.location.href = "/login";
		return;
	}
	const msg = err instanceof Error ? err.message : "";
	if (/pool/i.test(msg) || msg.includes("בריכ")) toast.error(special);
	else if (/whatsapp/i.test(msg)) toast.error(special);
	else if (msg === "Forbidden") toast.error(fallback);
	else toast.error(fallback);
}
function toLocalInput(iso) {
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return "";
	const pad = (n) => String(n).padStart(2, "0");
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function fromLocalInput(value) {
	return new Date(value).toISOString();
}
//#endregion
export { OfficePage as component };
