import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, f as useRouterState, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { o as filterFromPlace, r as authMiddleware, u as localeForCountry } from "./place-Bp16cyux.mjs";
import { cn as _enum, dn as boolean, gn as object, hn as number, un as array, yn as string } from "../_libs/@better-auth/core+[...].mjs";
import { i as signOut, t as authClient } from "./client-B40BzJxt.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { l as Menu, t as X } from "../_libs/lucide-react.mjs";
import { i as enUS, n as parseISO, r as format, t as he } from "../_libs/date-fns.mjs";
import { m as router_exports } from "./router-PvLfXnWv2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-Di3cIc2z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var dictionaries = {
	en: {
		"nav.tide": "Tide",
		"nav.spots": "Spots",
		"nav.gatherings": "Gatherings",
		"nav.log": "Log a swim",
		"nav.groups": "Groups",
		"nav.logbook": "Logbook",
		"nav.sync": "Sync",
		"nav.office": "Office",
		"nav.menu": "Open menu",
		"nav.close": "Close menu",
		"auth.signIn": "Sign in",
		"auth.signOut": "Sign out",
		"auth.signingOut": "Signing out…",
		"brand.home": "Tideline home",
		"footer.tag": "A global club for people who swim where there is no wall.",
		"footer.line": "Know the water. Tell the group.",
		"place.kicker": "Your water",
		"place.title": "Where do you swim?",
		"place.lead": "We will show spots, gatherings and groups in your country. You can widen to the whole region any time.",
		"place.countries": "Country",
		"place.regions": "Whole region",
		"place.continue": "Show me the water",
		"place.language": "Language",
		"place.change": "Change place",
		"place.needPick": "Choose a country or a region to continue.",
		"lang.he": "עברית",
		"lang.en": "English",
		"lang.label": "Language",
		"home.kicker": "The official app of open water swimmers",
		"home.title": "Where the open water community meets.",
		"home.lead": "Find a spot. Log a crossing. Meet the group. Tideline is where open water swimmers keep the water honest: conditions, gatherings, and the miles in between.",
		"home.explore": "Explore spots",
		"home.log": "Log a swim",
		"home.statSpots": "Beaches",
		"home.statGatherings": "Upcoming gatherings",
		"home.statKm": "Kilometres logged",
		"home.statSwims": "Swims on the tide",
		"home.kmEmpty": "Yours next",
		"home.atlasKicker": "Atlas",
		"home.atlasTitle": "Waters around you",
		"home.allSpots": "All spots",
		"home.tideKicker": "The tide",
		"home.tideTitle": "Friends share",
		"home.gatherKicker": "Gatherings",
		"home.gatherTitle": "Swim with a group",
		"home.allGatherings": "All gatherings",
		"home.groupsKicker": "Groups",
		"home.groupsTitle": "Your local groups",
		"home.allGroups": "All groups",
		"spots.kicker": "Atlas",
		"spots.title": "List of beaches",
		"spots.lead": "Beaches, lakes, channels and city shores. Only open water, never pools. Add a place the atlas is missing.",
		"spots.count": "{n} spots",
		"spots.countOne": "1 spot",
		"spots.empty": "Nothing on that line yet. Add a beach, a lake or a stretch of coast.",
		"spots.add": "Add a spot",
		"spots.filterWater": "Water",
		"spots.filterGrade": "Grade",
		"spots.filterAll": "All",
		"spot.notFound": "Spot not found",
		"spot.back": "Back to the atlas",
		"spot.save": "Save",
		"spot.saved": "Saved",
		"spot.log": "Log a swim",
		"spot.loggedHere": "Logged here",
		"spot.gatherings": "Gatherings",
		"spot.noneGather": "No gatherings on the calendar.",
		"spot.groups": "Groups here",
		"spot.conditions": "Conditions",
		"spot.signInReport": "Sign in to file a conditions report.",
		"spot.reportLabel": "What did you find?",
		"spot.reportPh": "Water, wind, wildlife, the feel of it",
		"spot.visibility": "Visibility",
		"spot.clear": "Clear",
		"spot.green": "Green",
		"spot.murky": "Murky",
		"spot.wildlife": "Wildlife",
		"spot.file": "File report",
		"spot.filing": "Filing…",
		"spot.watch": "Watch for: {hazards}",
		"spot.typical": "{km} typical",
		"spot.added": "Added by the group",
		"spotNew.kicker": "Atlas",
		"spotNew.title": "Add a place to swim",
		"spotNew.lead": "A beach, a lake, a river, a stretch of sea. Not a pool. The group will see it on the atlas.",
		"spotNew.name": "Name",
		"spotNew.namePh": "Gordon Beach, Lake Zurich…",
		"spotNew.city": "City or shore",
		"spotNew.country": "Country",
		"spotNew.water": "Kind of water",
		"spotNew.grade": "Grade",
		"spotNew.km": "Typical distance (km)",
		"spotNew.temp": "Typical water °C",
		"spotNew.season": "Best months",
		"spotNew.hazards": "What to watch",
		"spotNew.desc": "Describe the water",
		"spotNew.lat": "Latitude (optional)",
		"spotNew.lng": "Longitude (optional)",
		"spotNew.submit": "Add to the atlas",
		"spotNew.saving": "Saving…",
		"spotNew.needAuth": "Sign in to add a spot.",
		"spotNew.err": "Could not add that spot",
		"groups.kicker": "Groups",
		"groups.title": "Swim groups",
		"groups.lead": "Local groups with a manager and a WhatsApp door. Join the ones near you, or start one.",
		"groups.create": "Start a group",
		"groups.empty": "No groups here yet. Start one for your water.",
		"groups.members": "{n} members",
		"groups.memberOne": "1 member",
		"groups.join": "Join",
		"groups.leave": "Leave",
		"groups.whatsapp": "Open WhatsApp",
		"groups.whatsappMissing": "The manager has not set a WhatsApp link yet.",
		"groups.admin": "Manager",
		"groups.youAdmin": "You manage this group",
		"groups.joining": "Joining…",
		"groups.onlyAdminManages": "Only the manager can edit this group.",
		"groups.needAuth": "Sign in to join a group.",
		"group.notFound": "Group not found",
		"group.back": "Back to groups",
		"group.homeWater": "Home water",
		"group.manage": "Manage group",
		"group.name": "Group name",
		"group.desc": "About the group",
		"group.whatsapp": "WhatsApp link",
		"group.whatsappPh": "https://chat.whatsapp.com/…",
		"group.whatsappHelp": "Only members see this link. Use a group invite from WhatsApp.",
		"group.spot": "Home spot (optional)",
		"group.spotNone": "No home spot",
		"group.save": "Save changes",
		"group.saving": "Saving…",
		"group.delete": "Delete group",
		"group.members": "Members",
		"group.remove": "Remove",
		"group.cannotLeave": "Managers cannot leave. Delete the group, or keep swimming with it.",
		"groupNew.kicker": "Community",
		"groupNew.title": "Start a swim group",
		"groupNew.lead": "You will be the manager. You set the WhatsApp door. Anyone here can join.",
		"groupNew.submit": "Create group",
		"groupNew.err": "Could not create that group",
		"groupNew.badWa": "That does not look like a WhatsApp group link.",
		"events.kicker": "Gatherings",
		"events.title": "Swim with a group",
		"events.lead": "Dawn loops, channel windows, island crossings. Show up and the water does the rest.",
		"events.empty": "No gatherings on the calendar in this place.",
		"events.chart": "Chart a spot",
		"gather.going": "I'm going",
		"gather.leave": "Leave",
		"gather.goingCount": "{n} going",
		"log.kicker": "Logbook",
		"log.title": "Log a swim",
		"log.lead": "Distance, water, the feel of it. The group reads what you write.",
		"log.spot": "Spot",
		"log.choose": "Choose a water",
		"log.date": "Date",
		"log.km": "Distance (km)",
		"log.time": "Time (minutes)",
		"log.temp": "Water °C",
		"log.conditions": "Conditions",
		"log.feeling": "How it felt",
		"log.notes": "Notes",
		"log.notesPh": "The colour of the water. Who you swam with. What the sky did.",
		"log.submit": "Save to the tide",
		"log.saving": "Saving…",
		"log.needSpot": "Choose a spot",
		"log.optional": "Optional",
		"log.syncCta": "Or connect a watch and let it pull",
		"profile.kicker": "Logbook",
		"profile.lead": "Your miles, your waters, the gatherings you said yes to.",
		"profile.swims": "Swims",
		"profile.km": "Kilometres",
		"profile.waters": "Waters",
		"profile.longest": "Longest",
		"profile.recent": "Recent swims",
		"profile.emptySwims": "No swims yet. The first one is the one that counts.",
		"profile.remove": "Remove",
		"profile.how": "How you swim",
		"profile.name": "Name",
		"profile.homeWater": "Home water",
		"profile.homeWaterPh": "Gordon Beach, Lake Zurich…",
		"profile.stroke": "Stroke",
		"profile.strokePh": "Freestyle, breaststroke…",
		"profile.bio": "Bio",
		"profile.bioPh": "What you swim for",
		"profile.save": "Save profile",
		"profile.saving": "Saving…",
		"profile.savedWaters": "Saved waters",
		"profile.savedEmpty": "Save spots from the atlas to keep them on this page.",
		"profile.sync": "Sync a watch",
		"profile.syncLead": "Connect once. New swims land on their own.",
		"login.kicker": "Open water",
		"login.hero": "Come in. The water is waiting.",
		"login.heroLead": "Chart spots from Dover to Eilat, log your miles, and find a group for the next crossing.",
		"login.brandLine": "Tideline · a global swimming club",
		"login.in": "Sign in",
		"login.up": "Join the club",
		"login.inLead": "Welcome back. Your logbook is on the other side.",
		"login.upLead": "Create an account to log swims and join groups.",
		"login.continueWith": "Continue with {name}",
		"login.orEmail": "or email",
		"login.name": "Name",
		"login.namePh": "What the group calls you",
		"login.email": "Email",
		"login.password": "Password",
		"login.passwordPh": "At least 8 characters",
		"login.submitIn": "Sign in",
		"login.submitUp": "Create account",
		"login.wait": "Please wait…",
		"login.new": "New here?",
		"login.member": "Already a member?",
		"login.join": "Join Tideline",
		"login.back": "Back to the tide",
		"login.disabled": "Sign in is disabled.",
		"feed.quiet": "The water is quiet",
		"feed.quietLead": "Be the first to log a swim and start the tide.",
		"feed.swam": "swam",
		"feed.dispatch": "Dispatch",
		"feed.open": "Open {name}",
		"grade.gentle": "Gentle",
		"grade.moderate": "Moderate",
		"grade.challenging": "Challenging",
		"grade.extreme": "Extreme",
		"water.sea": "Sea",
		"water.ocean": "Ocean",
		"water.lake": "Lake",
		"water.river": "River",
		"cond.glass": "glass",
		"cond.chop": "chop",
		"cond.swell": "swell",
		"cond.wind": "wind",
		"feel.euphoric": "euphoric",
		"feel.solid": "solid",
		"feel.worked": "worked",
		"feel.epic": "epic",
		"region.Europe": "Europe",
		"region.Americas": "Americas",
		"region.Asia-Pacific": "Asia Pacific",
		"region.Middle East": "Middle East",
		"region.Africa": "Africa",
		"country.Israel": "Israel",
		"country.Cyprus": "Cyprus",
		"country.Egypt": "Egypt",
		"country.Turkey": "Turkey",
		"country.United Kingdom": "United Kingdom",
		"country.Ireland": "Ireland",
		"country.France": "France",
		"country.Spain": "Spain",
		"country.Portugal": "Portugal",
		"country.Italy": "Italy",
		"country.Croatia": "Croatia",
		"country.Greece": "Greece",
		"country.Switzerland": "Switzerland",
		"country.Germany": "Germany",
		"country.United States": "United States",
		"country.Canada": "Canada",
		"country.Mexico": "Mexico",
		"country.Brazil": "Brazil",
		"country.Australia": "Australia",
		"country.New Zealand": "New Zealand",
		"country.Japan": "Japan",
		"country.South Africa": "South Africa",
		"source.garmin": "Garmin",
		"source.suunto": "Suunto",
		"source.samsung": "Samsung Health",
		"source.apple": "iPhone",
		"source.manual": "Logged here",
		"sync.kicker": "Watches and phones",
		"sync.title": "Bring the swim in",
		"sync.lead": "Connect a watch once. Tideline pulls open water swims when you open the club, the way Strava does.",
		"sync.why": "New swims land in the logbook on their own. Drop a file only for an older workout the watch still has on disk.",
		"sync.drop": "Drop a workout file",
		"sync.dropHint": "GPX, FIT, TCX, JSON or CSV. Open water only.",
		"sync.browse": "Choose files",
		"sync.samples": "Try a sample swim",
		"sync.sampleGarmin": "Garmin at Gordon",
		"sync.sampleSuunto": "Suunto on the Kinneret",
		"sync.sampleSamsung": "Samsung at Dado",
		"sync.sampleApple": "iPhone at Coral Beach",
		"sync.connect": "Connect",
		"sync.connected": "Live",
		"sync.disconnect": "Unlink",
		"sync.live": "Live",
		"sync.syncNow": "Sync now",
		"sync.syncing": "Pulling…",
		"sync.lastImport": "Last pull {when}",
		"sync.never": "Waiting for the first pull",
		"sync.imports": "{n} swims in",
		"sync.importsOne": "1 swim in",
		"sync.preview": "Ready to log",
		"sync.empty": "No workouts waiting. Connect a watch, or drop an older file.",
		"sync.pool": "Looks like a pool. Tideline keeps open water only.",
		"sync.needSpot": "Pick a water. GPS did not land near a charted spot.",
		"sync.matched": "Matched {name}",
		"sync.away": "{n} km from {name}",
		"sync.import": "Save to the logbook",
		"sync.importing": "Saving…",
		"sync.imported": "{n} swims saved",
		"sync.importedOne": "1 swim saved",
		"sync.skipped": "{n} skipped",
		"sync.duplicate": "Already in the logbook",
		"sync.ok": "Saved",
		"sync.fail": "Could not import that file",
		"sync.unsupported": "That file type is not a workout we can read.",
		"sync.badFile": "Could not read that file",
		"sync.spot": "Water",
		"sync.remove": "Remove",
		"sync.needAuth": "Sign in to sync workouts.",
		"sync.done": "Open logbook",
		"sync.choose": "Choose a water",
		"sync.log": "Pull log",
		"sync.logEmpty": "Nothing pulled yet. Connect a watch and the swims land here.",
		"sync.status.ok": "Saved to the logbook",
		"sync.status.duplicate": "Already in the logbook",
		"sync.status.pool": "Skipped. Looks like a pool.",
		"sync.status.needSpot": "Needs a water",
		"groupNew.whatsappOpt": "WhatsApp is optional",
		"toast.savedSpot": "Saved to your chart",
		"toast.unsavedSpot": "Removed from saved",
		"toast.saveFail": "Could not save that spot",
		"toast.rsvpYes": "See you in the water",
		"toast.rsvpNo": "Left the gathering",
		"toast.rsvpFail": "Could not update that RSVP",
		"toast.report": "Report filed",
		"toast.reportFail": "Could not file that report",
		"toast.swim": "Swim logged",
		"toast.swimFail": "Could not save that swim",
		"toast.profile": "Profile saved",
		"toast.profileFail": "Could not save profile",
		"toast.joined": "You are in",
		"toast.left": "You left the group",
		"toast.clubSaved": "Group updated",
		"toast.clubFail": "Could not update the group",
		"toast.clubDeleted": "Group deleted",
		"toast.sync": "Workouts saved",
		"toast.syncFail": "Could not save those workouts",
		"toast.watchOn": "Watch is live",
		"toast.watchOff": "Watch unlinked",
		"toast.pulled": "{n} new swims from the watch",
		"toast.pulledOne": "1 new swim from the watch",
		"toast.pulledNone": "Already up to date",
		"common.km": "{n} km",
		"atlas.label": "Map of open water swim spots",
		"atlas.hint": "Satellite map · {n} waters",
		"kind.conditions": "Conditions",
		"kind.crossing": "Crossing",
		"kind.gathering": "Gathering",
		"kind.notice": "Notice",
		"dur.min": "{n} min",
		"dur.hours": "{n}h",
		"dur.hoursMin": "{h}h {m}m",
		"spotNew.poolErr": "That looks like a pool. Tideline is for open water only.",
		"office.kicker": "Office",
		"office.title": "Edit the whole app",
		"office.lead": "Beaches, groups, gatherings, stories and people. Locked to this account only.",
		"office.take": "Take ownership",
		"office.takeLead": "Nobody owns the office yet. Taking it locks editing to this account.",
		"office.locked": "This office belongs to another account.",
		"office.needAuth": "Sign in to open the office.",
		"office.forbidden": "No access",
		"office.tab.home": "Overview",
		"office.tab.spots": "Beaches",
		"office.tab.groups": "Groups",
		"office.tab.gatherings": "Gatherings",
		"office.tab.stories": "Friends share",
		"office.tab.reports": "Conditions",
		"office.tab.swims": "Swims",
		"office.tab.people": "People",
		"office.new": "New",
		"office.save": "Save",
		"office.saving": "Saving…",
		"office.delete": "Delete",
		"office.confirmDelete": "Delete this for good?",
		"office.saved": "Saved",
		"office.deleted": "Deleted",
		"office.fail": "Could not save",
		"office.empty": "Nothing here yet",
		"office.pick": "Choose a row to edit, or start a new one.",
		"office.owned": "You own this office",
		"office.starts": "Starts",
		"office.organizer": "Organizer",
		"office.notes": "Notes",
		"office.kind": "Kind",
		"office.location": "Place label",
		"office.body": "Text",
		"office.ownerBadge": "Owner",
		"office.removePerson": "Remove their app data",
		"office.cannotOwner": "The owner cannot be removed."
	},
	he: {
		"nav.tide": "זרם",
		"nav.spots": "מקומות",
		"nav.gatherings": "מפגשים",
		"nav.log": "תיעוד שחייה",
		"nav.groups": "קבוצות",
		"nav.logbook": "יומן",
		"nav.sync": "סנכרון",
		"nav.office": "ניהול",
		"nav.menu": "פתיחת תפריט",
		"nav.close": "סגירת תפריט",
		"auth.signIn": "כניסה",
		"auth.signOut": "יציאה",
		"auth.signingOut": "יוצאים…",
		"brand.home": "Tideline דף הבית",
		"footer.tag": "מועדון עולמי לאנשים ששוחים במקום בלי קיר.",
		"footer.line": "מכירים את המים. מספרים לקבוצה.",
		"place.kicker": "המים שלך",
		"place.title": "איפה אתם שוחים?",
		"place.lead": "נציג מקומות, מפגשים וקבוצות במדינה שלכם. אפשר תמיד להרחיב לכל האזור.",
		"place.countries": "מדינה",
		"place.regions": "כל האזור",
		"place.continue": "הציגו לי את המים",
		"place.language": "שפה",
		"place.change": "החלפת מקום",
		"place.needPick": "בחרו מדינה או אזור כדי להמשיך.",
		"lang.he": "עברית",
		"lang.en": "English",
		"lang.label": "שפה",
		"home.kicker": "האפליקציה הרשמית של שחייני המים הפתוחים",
		"home.title": "כאן נפגשת קהילת המים הפתוחים",
		"home.lead": "מוצאים מקום. מתעדים חציה. פוגשים את הקבוצה. Tideline הוא המקום שבו שחייני מים פתוחים שומרים על הכנות של המים: תנאים, מפגשים, והקילומטרים שביניהם.",
		"home.explore": "למקומות",
		"home.log": "תיעוד שחייה",
		"home.statSpots": "רשימת חופים",
		"home.statGatherings": "מפגשים בקרוב",
		"home.statKm": "קילומטרים שתועדו",
		"home.statSwims": "שחיות על הזרם",
		"home.kmEmpty": "שלכם הבא",
		"home.atlasKicker": "אטלס",
		"home.atlasTitle": "המים סביבכם",
		"home.allSpots": "כל המקומות",
		"home.tideKicker": "הזרם",
		"home.tideTitle": "חברים מספרים",
		"home.gatherKicker": "מפגשים",
		"home.gatherTitle": "לשחות עם קבוצה",
		"home.allGatherings": "כל המפגשים",
		"home.groupsKicker": "קבוצות",
		"home.groupsTitle": "הקבוצות לידכם",
		"home.allGroups": "כל הקבוצות",
		"spots.kicker": "אטלס",
		"spots.title": "רשימת חופים",
		"spots.lead": "חופים, אגמים, תעלות וחופי עיר. רק מים פתוחים, בלי בריכות. מוסיפים מקום שחסר באטלס.",
		"spots.count": "{n} מקומות",
		"spots.countOne": "מקום אחד",
		"spots.empty": "אין עדיין כלום על הקו הזה. הוסיפו חוף, אגם או קטע חוף.",
		"spots.add": "הוספת מקום",
		"spots.filterWater": "מים",
		"spots.filterGrade": "רמה",
		"spots.filterAll": "הכל",
		"spot.notFound": "המקום לא נמצא",
		"spot.back": "חזרה לאטלס",
		"spot.save": "שמירה",
		"spot.saved": "שמור",
		"spot.log": "תיעוד שחייה",
		"spot.loggedHere": "תועד כאן",
		"spot.gatherings": "מפגשים",
		"spot.noneGather": "אין מפגשים ביומן.",
		"spot.groups": "קבוצות כאן",
		"spot.conditions": "תנאים",
		"spot.signInReport": "נכנסים כדי לדווח על תנאים.",
		"spot.reportLabel": "מה מצאתם?",
		"spot.reportPh": "מים, רוח, חיות, איך זה הרגיש",
		"spot.visibility": "ראות",
		"spot.clear": "צלול",
		"spot.green": "ירוק",
		"spot.murky": "עכור",
		"spot.wildlife": "חיות",
		"spot.file": "שליחת דיווח",
		"spot.filing": "שולחים…",
		"spot.watch": "שימו לב: {hazards}",
		"spot.typical": "{km} טיפוסי",
		"spot.added": "נוסף על ידי הקבוצה",
		"spotNew.kicker": "אטלס",
		"spotNew.title": "הוספת מקום לשחייה",
		"spotNew.lead": "חוף, אגם, נהר, קטע ים. לא בריכה. הקבוצה תראה את זה באטלס.",
		"spotNew.name": "שם",
		"spotNew.namePh": "חוף גורדון, אגם ציריך…",
		"spotNew.city": "עיר או חוף",
		"spotNew.country": "מדינה",
		"spotNew.water": "סוג המים",
		"spotNew.grade": "רמה",
		"spotNew.km": "מרחק טיפוסי (ק״מ)",
		"spotNew.temp": "טמפרטורה טיפוסית",
		"spotNew.season": "חודשים טובים",
		"spotNew.hazards": "למה לשים לב",
		"spotNew.desc": "תיאור המים",
		"spotNew.lat": "קו רוחב (רשות)",
		"spotNew.lng": "קו אורך (רשות)",
		"spotNew.submit": "הוספה לאטלס",
		"spotNew.saving": "שומרים…",
		"spotNew.needAuth": "נכנסים כדי להוסיף מקום.",
		"spotNew.err": "לא הצלחנו להוסיף את המקום",
		"groups.kicker": "קבוצות",
		"groups.title": "קבוצות שחייה",
		"groups.lead": "קבוצות מקומיות עם מנהל ודלת לוואטסאפ. מצטרפים לקרובות אליכם, או פותחים אחת.",
		"groups.create": "פתיחת קבוצה",
		"groups.empty": "אין עדיין קבוצות כאן. פתחו אחת למים שלכם.",
		"groups.members": "{n} חברים",
		"groups.memberOne": "חבר אחד",
		"groups.join": "הצטרפות",
		"groups.leave": "יציאה",
		"groups.whatsapp": "פתיחת וואטסאפ",
		"groups.whatsappMissing": "המנהל עדיין לא הגדיר קישור לוואטסאפ.",
		"groups.admin": "מנהל",
		"groups.youAdmin": "אתם מנהלים את הקבוצה",
		"groups.joining": "מצטרפים…",
		"groups.onlyAdminManages": "רק המנהל יכול לערוך את הקבוצה.",
		"groups.needAuth": "נכנסים כדי להצטרף לקבוצה.",
		"group.notFound": "הקבוצה לא נמצאה",
		"group.back": "חזרה לקבוצות",
		"group.homeWater": "מים ביתיים",
		"group.manage": "ניהול הקבוצה",
		"group.name": "שם הקבוצה",
		"group.desc": "על הקבוצה",
		"group.whatsapp": "קישור וואטסאפ",
		"group.whatsappPh": "https://chat.whatsapp.com/…",
		"group.whatsappHelp": "רק חברים רואים את הקישור. השתמשו בהזמנה לקבוצה מוואטסאפ.",
		"group.spot": "מקום בית (רשות)",
		"group.spotNone": "בלי מקום בית",
		"group.save": "שמירת שינויים",
		"group.saving": "שומרים…",
		"group.delete": "מחיקת הקבוצה",
		"group.members": "חברים",
		"group.remove": "הסרה",
		"group.cannotLeave": "מנהלים לא יוצאים. מוחקים את הקבוצה, או ממשיכים לשחות איתה.",
		"groupNew.kicker": "קהילה",
		"groupNew.title": "פתיחת קבוצת שחייה",
		"groupNew.lead": "אתם תהיו המנהלים. אתם קובעים את דלת הוואטסאפ. כל אחד כאן יכול להצטרף.",
		"groupNew.submit": "יצירת קבוצה",
		"groupNew.err": "לא הצלחנו ליצור את הקבוצה",
		"groupNew.badWa": "זה לא נראה כמו קישור לקבוצת וואטסאפ.",
		"events.kicker": "מפגשים",
		"events.title": "לשחות עם קבוצה",
		"events.lead": "לולאות שחר, חלונות תעלה, חציות אי. מגיעים והמים עושים את השאר.",
		"events.empty": "אין מפגשים ביומן במקום הזה.",
		"events.chart": "למפות מקום",
		"gather.going": "ספרו אותי",
		"gather.leave": "ביטול",
		"gather.goingCount": "{n} מגיעים",
		"log.kicker": "יומן",
		"log.title": "תיעוד שחייה",
		"log.lead": "מרחק, מים, איך זה הרגיש. הקבוצה קוראת מה שכתבתם.",
		"log.spot": "מקום",
		"log.choose": "בחירת מים",
		"log.date": "תאריך",
		"log.km": "מרחק (ק״מ)",
		"log.time": "זמן (דקות)",
		"log.temp": "מים °C",
		"log.conditions": "תנאים",
		"log.feeling": "איך זה הרגיש",
		"log.notes": "הערות",
		"log.notesPh": "צבע המים. עם מי שחיתם. מה השמיים עשו.",
		"log.submit": "שמירה לזרם",
		"log.saving": "שומרים…",
		"log.needSpot": "בחרו מקום",
		"log.optional": "רשות",
		"log.syncCta": "או מחברים שעון ונותנים לו למשוך",
		"profile.kicker": "יומן",
		"profile.lead": "הקילומטרים שלכם, המים שלכם, המפגשים שאמרתם להם כן.",
		"profile.swims": "שחיות",
		"profile.km": "קילומטרים",
		"profile.waters": "מים",
		"profile.longest": "הארוך ביותר",
		"profile.recent": "שחיות אחרונות",
		"profile.emptySwims": "עדיין אין שחיות. הראשונה היא זו שחשובה.",
		"profile.remove": "הסרה",
		"profile.how": "איך אתם שוחים",
		"profile.name": "שם",
		"profile.homeWater": "מים ביתיים",
		"profile.homeWaterPh": "חוף גורדון, אגם ציריך…",
		"profile.stroke": "סגנון",
		"profile.strokePh": "חופשי, חזה…",
		"profile.bio": "על עצמכם",
		"profile.bioPh": "בשביל מה אתם שוחים",
		"profile.save": "שמירת פרופיל",
		"profile.saving": "שומרים…",
		"profile.savedWaters": "מים שמורים",
		"profile.savedEmpty": "שומרים מקומות מהאטלס כדי שיישארו כאן.",
		"profile.sync": "סנכרון שעון",
		"profile.syncLead": "מחברים פעם אחת. שחיות חדשות נכנסות לבד.",
		"login.kicker": "מים פתוחים",
		"login.hero": "בואו. המים מחכים.",
		"login.heroLead": "ממפים מקומות מדובר עד אילת, מתעדים קילומטרים, ומוצאים קבוצה לחציה הבאה.",
		"login.brandLine": "Tideline · מועדון שחייה עולמי",
		"login.in": "כניסה",
		"login.up": "הצטרפות למועדון",
		"login.inLead": "ברוכים השבים. היומן בצד השני.",
		"login.upLead": "יוצרים חשבון כדי לתעד שחיות ולהצטרף לקבוצות.",
		"login.continueWith": "המשך עם {name}",
		"login.orEmail": "או אימייל",
		"login.name": "שם",
		"login.namePh": "איך הקבוצה קוראת לכם",
		"login.email": "אימייל",
		"login.password": "סיסמה",
		"login.passwordPh": "לפחות 8 תווים",
		"login.submitIn": "כניסה",
		"login.submitUp": "יצירת חשבון",
		"login.wait": "רגע…",
		"login.new": "חדשים כאן?",
		"login.member": "כבר חברים?",
		"login.join": "הצטרפות למועדון",
		"login.back": "חזרה לזרם",
		"login.disabled": "הכניסה כבויה.",
		"feed.quiet": "המים שקטים",
		"feed.quietLead": "תהיו הראשונים לתעד שחייה ולהניע את הזרם.",
		"feed.swam": "שחה ב",
		"feed.dispatch": "דיווח",
		"feed.open": "פתיחת {name}",
		"grade.gentle": "עדין",
		"grade.moderate": "בינוני",
		"grade.challenging": "מאתגר",
		"grade.extreme": "קיצוני",
		"water.sea": "ים",
		"water.ocean": "אוקיינוס",
		"water.lake": "אגם",
		"water.river": "נהר",
		"cond.glass": "חלק",
		"cond.chop": "קצת גלים",
		"cond.swell": "גלים",
		"cond.wind": "רוח",
		"feel.euphoric": "אופורי",
		"feel.solid": "יציב",
		"feel.worked": "עבד קשה",
		"feel.epic": "מלכותי",
		"region.Europe": "אירופה",
		"region.Americas": "אמריקה",
		"region.Asia-Pacific": "אסיה והאוקיינוס השקט",
		"region.Middle East": "המזרח התיכון",
		"region.Africa": "אפריקה",
		"country.Israel": "ישראל",
		"country.Cyprus": "קפריסין",
		"country.Egypt": "מצרים",
		"country.Turkey": "טורקיה",
		"country.United Kingdom": "בריטניה",
		"country.Ireland": "אירלנד",
		"country.France": "צרפת",
		"country.Spain": "ספרד",
		"country.Portugal": "פורטוגל",
		"country.Italy": "איטליה",
		"country.Croatia": "קרואטיה",
		"country.Greece": "יוון",
		"country.Switzerland": "שווייץ",
		"country.Germany": "גרמניה",
		"country.United States": "ארצות הברית",
		"country.Canada": "קנדה",
		"country.Mexico": "מקסיקו",
		"country.Brazil": "ברזיל",
		"country.Australia": "אוסטרליה",
		"country.New Zealand": "ניו זילנד",
		"country.Japan": "יפן",
		"country.South Africa": "דרום אפריקה",
		"source.garmin": "גרמין",
		"source.suunto": "סונטו",
		"source.samsung": "סמסונג",
		"source.apple": "אייפון",
		"source.manual": "תועד כאן",
		"sync.kicker": "שעונים וטלפונים",
		"sync.title": "מביאים את השחייה",
		"sync.lead": "מחברים שעון פעם אחת. Tideline מושך שחיות מים פתוחים כשפותחים את המועדון, כמו שסטרבה עושה.",
		"sync.why": "שחיות חדשות נכנסות ליומן לבד. שמים קובץ רק בשביל אימון ישן שעדיין יושב על השעון.",
		"sync.drop": "שחרור קובץ אימון",
		"sync.dropHint": "GPX, FIT, TCX, JSON או CSV. רק מים פתוחים.",
		"sync.browse": "בחירת קבצים",
		"sync.samples": "ניסיון שחייה לדוגמה",
		"sync.sampleGarmin": "גרמין בגורדון",
		"sync.sampleSuunto": "סונטו בכנרת",
		"sync.sampleSamsung": "סמסונג בדדו",
		"sync.sampleApple": "אייפון בחוף האלמוג",
		"sync.connect": "חיבור",
		"sync.connected": "חי",
		"sync.disconnect": "ניתוק",
		"sync.live": "חי",
		"sync.syncNow": "סנכרון עכשיו",
		"sync.syncing": "מושכים…",
		"sync.lastImport": "משיכה אחרונה {when}",
		"sync.never": "מחכים למשיכה הראשונה",
		"sync.imports": "{n} שחיות נכנסו",
		"sync.importsOne": "שחייה אחת נכנסה",
		"sync.preview": "מוכן לתיעוד",
		"sync.empty": "אין אימונים ממתינים. מחברים שעון, או שמים קובץ ישן.",
		"sync.pool": "זה נראה כמו בריכה. Tideline שומר מים פתוחים בלבד.",
		"sync.needSpot": "בחרו מים. ה GPS לא נחת ליד מקום על המפה.",
		"sync.matched": "הותאם ל{name}",
		"sync.away": "{n} ק״מ מ{name}",
		"sync.import": "שמירה ליומן",
		"sync.importing": "שומרים…",
		"sync.imported": "{n} שחיות נשמרו",
		"sync.importedOne": "שחייה אחת נשמרה",
		"sync.skipped": "{n} דולגו",
		"sync.duplicate": "כבר ביומן",
		"sync.ok": "נשמר",
		"sync.fail": "לא הצלחנו לייבא את הקובץ",
		"sync.unsupported": "סוג הקובץ הזה אינו אימון שאפשר לקרוא.",
		"sync.badFile": "לא הצלחנו לקרוא את הקובץ",
		"sync.spot": "מים",
		"sync.remove": "הסרה",
		"sync.needAuth": "נכנסים כדי לסנכרן אימונים.",
		"sync.done": "פתיחת היומן",
		"sync.choose": "בחירת מים",
		"sync.log": "יומן משיכות",
		"sync.logEmpty": "עדיין אין משיכות. מחברים שעון והשחיות נכנסות לכאן.",
		"sync.status.ok": "נשמר ביומן",
		"sync.status.duplicate": "כבר ביומן",
		"sync.status.pool": "דולג. זה נראה כמו בריכה.",
		"sync.status.needSpot": "צריך לבחור מים",
		"groupNew.whatsappOpt": "וואטסאפ הוא רשות",
		"toast.savedSpot": "נשמר במפה שלכם",
		"toast.unsavedSpot": "הוסר מהשמורים",
		"toast.saveFail": "לא הצלחנו לשמור את המקום",
		"toast.rsvpYes": "ניפגש במים",
		"toast.rsvpNo": "יצאתם מהמפגש",
		"toast.rsvpFail": "לא הצלחנו לעדכן את ההרשמה",
		"toast.report": "הדיווח נשלח",
		"toast.reportFail": "לא הצלחנו לשלוח את הדיווח",
		"toast.swim": "השחייה תועדה",
		"toast.swimFail": "לא הצלחנו לשמור את השחייה",
		"toast.profile": "הפרופיל נשמר",
		"toast.profileFail": "לא הצלחנו לשמור את הפרופיל",
		"toast.joined": "אתם בפנים",
		"toast.left": "יצאתם מהקבוצה",
		"toast.clubSaved": "הקבוצה עודכנה",
		"toast.clubFail": "לא הצלחנו לעדכן את הקבוצה",
		"toast.clubDeleted": "הקבוצה נמחקה",
		"toast.sync": "האימונים נשמרו",
		"toast.syncFail": "לא הצלחנו לשמור את האימונים",
		"toast.watchOn": "השעון חי",
		"toast.watchOff": "השעון נותק",
		"toast.pulled": "{n} שחיות חדשות מהשעון",
		"toast.pulledOne": "שחייה חדשה מהשעון",
		"toast.pulledNone": "כבר מעודכן",
		"common.km": "{n} ק״מ",
		"atlas.label": "מפת מקומות שחייה במים פתוחים",
		"atlas.hint": "מפת לווין · {n} מים",
		"kind.conditions": "תנאים",
		"kind.crossing": "חציה",
		"kind.gathering": "מפגש",
		"kind.notice": "הודעה",
		"dur.min": "{n} דק׳",
		"dur.hours": "{n} שע׳",
		"dur.hoursMin": "{h} שע׳ {m} דק׳",
		"spotNew.poolErr": "זה נראה כמו בריכה. Tideline מיועד למים פתוחים בלבד.",
		"office.kicker": "ניהול",
		"office.title": "עריכת כל האפליקציה",
		"office.lead": "חופים, קבוצות, מפגשים, סיפורים ואנשים. נעול לחשבון הזה בלבד.",
		"office.take": "לקחת בעלות",
		"office.takeLead": "עדיין אין בעלים למשרד. לקיחה נועלת את העריכה לחשבון הזה.",
		"office.locked": "המשרד שייך לחשבון אחר.",
		"office.needAuth": "נכנסים כדי לפתוח את המשרד.",
		"office.forbidden": "אין גישה",
		"office.tab.home": "סקירה",
		"office.tab.spots": "חופים",
		"office.tab.groups": "קבוצות",
		"office.tab.gatherings": "מפגשים",
		"office.tab.stories": "חברים מספרים",
		"office.tab.reports": "תנאים",
		"office.tab.swims": "שחיות",
		"office.tab.people": "אנשים",
		"office.new": "חדש",
		"office.save": "שמירה",
		"office.saving": "שומרים…",
		"office.delete": "מחיקה",
		"office.confirmDelete": "למחוק לצמיתות?",
		"office.saved": "נשמר",
		"office.deleted": "נמחק",
		"office.fail": "לא הצלחנו לשמור",
		"office.empty": "אין כאן עדיין כלום",
		"office.pick": "בוחרים שורה לעריכה, או פותחים חדשה.",
		"office.owned": "המשרד הזה שלכם",
		"office.starts": "שעה",
		"office.organizer": "מארגן",
		"office.notes": "הערות",
		"office.kind": "סוג",
		"office.location": "שם המקום",
		"office.body": "טקסט",
		"office.ownerBadge": "בעלים",
		"office.removePerson": "מחיקת נתוני האפליקציה שלהם",
		"office.cannotOwner": "אי אפשר להסיר את הבעלים."
	}
};
function t(locale, key, vars) {
	let s = dictionaries[locale][key] || dictionaries.en[key] || key;
	if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
	return s;
}
function countryLabel(locale, name) {
	const key = `country.${name}`;
	if (key in dictionaries[locale]) return t(locale, key);
	return name;
}
function regionLabel(locale, name) {
	const key = `region.${name}`;
	if (key in dictionaries[locale]) return t(locale, key);
	return name;
}
var usePlaceStore = create()(persist((set, get) => ({
	hydrated: false,
	editing: false,
	place: null,
	locale: "en",
	localeLocked: false,
	setHydrated: () => set({ hydrated: true }),
	setEditing: (editing) => set({ editing }),
	setPlace: (place, opts) => {
		const next = {
			place,
			editing: false
		};
		if (!get().localeLocked && !opts?.lockLocale) next.locale = localeForCountry(place.country);
		set(next);
	},
	setLocale: (locale) => set({
		locale,
		localeLocked: true
	}),
	applyFromProfile: (row) => {
		if (!row.country) return;
		const scope = row.placeScope === "region" ? "region" : "country";
		const region = row.region ?? get().place?.region ?? "Europe";
		const locale = row.locale === "he" ? "he" : "en";
		set({
			place: {
				country: row.country,
				region,
				scope
			},
			locale,
			localeLocked: Boolean(row.locale)
		});
	}
}), {
	name: "tideline-place",
	skipHydration: true,
	partialize: (s) => ({
		place: s.place,
		locale: s.locale,
		localeLocked: s.localeLocked
	}),
	onRehydrateStorage: () => (state) => {
		state?.setHydrated();
	}
}));
function useT() {
	const locale = usePlaceStore((s) => s.locale);
	return (key, vars) => t(locale, key, vars);
}
function usePlaceFilter() {
	const place = usePlaceStore((s) => s.place);
	return filterFromPlace(place);
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Logo({ className }) {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: cn("group flex items-center gap-2.5 text-fg", className),
		"aria-label": t("brand.home"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "relative grid size-8 place-items-center rounded-md bg-raised",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-x-1.5 top-[17px] h-px bg-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute end-2 top-2 size-1.5 rounded-full bg-fg" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-xl font-medium tracking-tight",
			children: "Tideline"
		})]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[transform,background-color,color,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg hover:bg-accent/90",
			ghost: "bg-transparent text-fg hover:bg-raised",
			outline: "bg-transparent text-fg shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-fg)_14%,transparent)] hover:bg-raised",
			subtle: "bg-raised text-fg hover:bg-raised/80",
			danger: "bg-danger text-fg hover:bg-danger/90"
		},
		size: {
			sm: "h-9 px-3",
			md: "h-11 px-4",
			lg: "h-12 px-5 text-base",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
var Button = (0, import_react.forwardRef)(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/shell-CQE3eLLT.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
function useLoad(fn, deps = []) {
	const [data, setData] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [tick, setTick] = (0, import_react.useState)(0);
	const reload = (0, import_react.useCallback)(() => setTick((n) => n + 1), []);
	(0, import_react.useEffect)(() => {
		let alive = true;
		setLoading(true);
		fn().then((value) => {
			if (!alive) return;
			setData(value);
			setError(null);
		}).catch((err) => {
			if (!alive) return;
			setError(err instanceof Error ? err.message : "Something went wrong");
		}).finally(() => {
			if (alive) setLoading(false);
		});
		return () => {
			alive = false;
		};
	}, [tick, ...deps]);
	return {
		data,
		loading,
		error,
		reload,
		setData
	};
}
function isUnauthorized(err) {
	return err instanceof Error && err.message === "Unauthorized";
}
var heSpots = {
	gordon: {
		name: "חוף גורדון",
		city: "תל אביב",
		description: "חוף עיר עם תרבות שחיית שחר רצינית. מים עם מציל, מדף חול ארוך, וים תיכוני שהופך חלק כמו משי בבוקר שקט.",
		hazards: "מדוזות בקיץ, שובך לחוף בימים של רוח",
		bestSeason: "אפריל עד יוני, אוקטובר עד דצמבר"
	},
	eilat: {
		name: "חוף האלמוגים",
		city: "אילת",
		description: "מלח ים סוף וחום בחורף. שוחים מעל מדף האלמוגים במים כל כך צלולים שהקרקעית נראית קרובה. נשארים מחוץ לחבלי השמורה.",
		hazards: "שונית, תנועת סירות, שמש חזקה",
		bestSeason: "כל השנה"
	},
	caesarea: {
		name: "חוף קיסריה",
		city: "קיסריה",
		description: "אמת מים רומית על החול, אבני נמל הרודיאני במים. קטע חוף ישראלי עם אופי, לשחיינים שאוהבים מרקם מתחתם.",
		hazards: "סלעים, שרידים ארכיאולוגיים, שובך",
		bestSeason: "מאי עד נובמבר"
	},
	kinneret: {
		name: "כנרת",
		city: "טבריה",
		description: "אגן מתוק מתחת לפני הים, חם ומינרלי. קבוצות מקומיות מתאמנות כאן כל השנה. חציית הכנרת היא קלאסיקה ישראלית שקטה.",
		hazards: "תנועת סירות, רוח חורף",
		bestSeason: "אפריל עד נובמבר"
	},
	herzliya: {
		name: "חוף הרצליה",
		city: "הרצליה",
		description: "חוף עירוני ארוך צפונית לתל אביב, עם קבוצת שחר קבועה ומדף חול רחב. כניסה קלה, מים צלולים בחורף, וקפה אחרי.",
		hazards: "נתיב אופנועי ים, מדוזות בקיץ",
		bestSeason: "אפריל עד יוני, אוקטובר עד דצמבר"
	},
	dado: {
		name: "חוף דדו",
		city: "חיפה",
		description: "המים הפתוחים של חיפה. מפרץ רחב עם שובר גלים, מועדון מקומי רציני, והכרמל ברקע. עדיף בבוקר לפני שהרוח המערבית קמה.",
		hazards: "סלעים בקצוות, גלים בקיץ, מדוזות",
		bestSeason: "מאי עד נובמבר"
	},
	"tel-baruch": {
		name: "תל ברוך",
		city: "תל אביב",
		description: "האחות השקטה של גורדון. מדף חול, קבוצת ימי חול, וקו פשוט הלוך ושוב לאורך צפון תל אביב.",
		hazards: "מדוזות בקיץ, שובך מדי פעם",
		bestSeason: "אפריל עד יוני, אוקטובר עד דצמבר"
	},
	palmachim: {
		name: "חוף פלמחים",
		city: "פלמחים",
		description: "קטע פראי יותר דרומית לראשון. דיונות של גן לאומי, מים צלולים יותר מהעיר, ופחות אנשים אם מגיעים מוקדם.",
		hazards: "סלעים, כללי שמורה, בלי מציל מחוץ לעונה",
		bestSeason: "מאי עד נובמבר"
	},
	nahariya: {
		name: "חוף נהריה",
		city: "נהריה",
		description: "ים תיכון צפוני, לעיתים קריר וצלול יותר מתל אביב. טיילת ארוכה, מדף עדין, וקבוצה קטנה כל השנה.",
		hazards: "מדוזות בקיץ, גלים מצפון",
		bestSeason: "מאי עד נובמבר"
	},
	ashkelon: {
		name: "מרינה אשקלון",
		city: "אשקלון",
		description: "שחייה דרומית מחומת המרינה. לעיתים חם יותר, לפעמים יותר אצה, ואופציה טובה בחורף כשהצפון סגור ברוח.",
		hazards: "תנועת מרינה, סלעים, מדוזות",
		bestSeason: "מאי עד נובמבר"
	},
	"dover-channel": {
		name: "תעלת למאנש",
		city: "דובר"
	},
	alcatraz: {
		name: "חציית אלקטרז",
		city: "סן פרנסיסקו"
	},
	rottnest: {
		name: "תעלת רוטנסט",
		city: "פרת"
	},
	catalina: {
		name: "תעלת קטלינה",
		city: "אוואלון"
	},
	gibraltar: {
		name: "מצר גיברלטר",
		city: "טריפה"
	},
	zurich: {
		name: "אגם ציריך",
		city: "ציריך"
	},
	hellespont: {
		name: "הלספונט",
		city: "צנאקלה"
	},
	robben: {
		name: "חציית רובן איילנד",
		city: "קייפטאון"
	},
	bondi: {
		name: "בונדי לברונטה",
		city: "סידני"
	},
	waikiki: {
		name: "חוף וואיקיקי",
		city: "הונולולו"
	},
	"cook-strait": {
		name: "מצר קוק",
		city: "ולינגטון"
	},
	manhattan: {
		name: "אי מנהטן",
		city: "ניו יורק"
	},
	santorini: {
		name: "שחיית הקלדרה",
		city: "פירה"
	},
	serpentine: {
		name: "סרפנטין",
		city: "לונדון"
	}
};
var heCities = {
	"Tel Aviv": "תל אביב",
	Eilat: "אילת",
	Caesarea: "קיסריה",
	Tiberias: "טבריה",
	Herzliya: "הרצליה",
	Haifa: "חיפה",
	Palmachim: "פלמחים",
	Nahariya: "נהריה",
	Ashkelon: "אשקלון",
	Dover: "דובר",
	"San Francisco": "סן פרנסיסקו",
	Perth: "פרת",
	Avalon: "אוואלון",
	Tarifa: "טריפה",
	Zurich: "ציריך",
	"Çanakkale": "צנאקלה",
	"Cape Town": "קייפטאון",
	Sydney: "סידני",
	Honolulu: "הונולולו",
	Wellington: "ולינגטון",
	"New York": "ניו יורק",
	Fira: "פירה",
	London: "לונדון"
};
var heEvents = {
	"Tel Aviv dawn crew": {
		title: "קבוצת שחר תל אביב",
		organizer: "קבועים בגורדון",
		notes: "נפגשים במגדל המציל. בוקר חלק כמו משי בלבד. מבטלים כשיש שובך."
	},
	"Escape from the Rock (training)": {
		title: "בריחה מהסלע אימון",
		organizer: "מועדון החתירה סאות אנד",
		notes: "חציית אימון של המועדון. חליפות רשות, קייק ליווי חובה."
	},
	"Channel weather window": {
		title: "חלון מזג אוויר בתעלה",
		organizer: "איגוד שחיית התעלה",
		notes: "חלון גאות חלשה. הטייסים מחכים. זו חציה מפוקחת, לא שחייה חברתית."
	},
	"Red Sea coral loop": {
		title: "לולאת אלמוגים בים סוף",
		organizer: "מים פתוחים אילת",
		notes: "נשארים מחוץ לחבלי השמורה. קרם הגנה שמתאים לשוניות."
	},
	"Rottnest Channel Swim briefing": {
		title: "תדרוך שחיית תעלת רוטנסט",
		organizer: "איגוד שחיית רוטנסט",
		notes: "יחידים, זוגות וקבוצות. האוקיינוס ההודי, מקוטסלו לאי."
	},
	"Length of the lake": {
		title: "לאורך האגם",
		organizer: "מועדון מיטנקוואי",
		notes: "מציריך לרפרסוויל. האכלה מליווי. המים בדרך כלל 20 עד 22 מעלות."
	},
	"Bondi to Bronte social": {
		title: "בונדי לברונטה חברתי",
		organizer: "קבוצת אייסברגס",
		notes: "שחיית אוקיינוס לאורך הצוקים. אם השובך עולה, עוברים לבריכות הגאות."
	},
	"Tarifa to Africa attempt": {
		title: "ניסיון טריפה לאפריקה",
		organizer: "שחיית המצר",
		notes: "תלוי בגאות. דרכון לנחיתה במרוקו. סירת ליווי חובה."
	},
	"Kinneret Saturday loop": {
		title: "לולאת שבת בכנרת",
		organizer: "שחייני טבריה",
		notes: "מים מתוקים, חמים, בלי מדוזות. נפגשים בטיילת."
	},
	"Caldera crossing": {
		title: "חציית הקלדרה",
		organizer: "מים פתוחים האגאי",
		notes: "הורדה בסירה בקלדרה, שוחים לכיוון אויה. מים עמוקים, בלי יציאה באמצע המסלול."
	},
	"Herzliya sunrise loop": {
		title: "לולאת זריחה בהרצליה",
		organizer: "קבוצת הרצליה",
		notes: "נפגשים במגדל מול האקדיה. כובעים על הראש. קפה אחרי."
	},
	"Haifa Dado Saturday": {
		title: "שבת בדדו חיפה",
		organizer: "מים פתוחים כרמל",
		notes: "הלוך ושוב לשובר הגלים. אם הרוח המערבית קמה נשארים בתוך החומה."
	},
	"Tel Baruch weekday dawn": {
		title: "שחר ימי חול בתל ברוך",
		organizer: "שחייני צפון תל אביב",
		notes: "מים שקטים, קבוצה קטנה. שחיינים חדשים מוזמנים בקו הפנימי."
	}
};
var heDispatches = {
	"Jellyfish thinning off Gordon": {
		title: "מדוזות מתמעטות מול גורדון",
		location: "תל אביב",
		body: "פריחת סוף הקיץ מתפרקת. קבוצות שחר מדווחות על מים צלולים וטמפרטורה 25 מעלות מהילטון עד חוף בננה. עדיין שמים כובע שאפשר לראות."
	},
	"Channel neap window in October": {
		title: "חלון גאות חלשה בתעלה באוקטובר",
		location: "דובר",
		body: "טייסים מחזיקים חלון מגאות חלשה מ3 עד 7 באוקטובר. המים על 16 מעלות. אם יש לכם חציה, ישנים כמו טייס: מזג האוויר לפני האגו."
	},
	"New Saturday crew on the Kinneret": {
		title: "קבוצת שבת חדשה בכנרת",
		location: "טבריה",
		body: "שחייני טבריה נפגשים בשבע כל שבת ללולאה של ארבעה קילומטר במים מתוקים. בלי זרם, בלי מדוזות, קפה אחרי. מתחילים מוזמנים בקו הפנימי."
	},
	"Cape Doctor easing for Robben attempts": {
		title: "הקייפ דוקטור נרגע לניסיונות רובן",
		location: "קייפטאון",
		body: "צפויה תקופה שקטה יותר מול קייפטאון. המים 15 מעלות, אצות סמיכות ליד האי. אם אתם מחכים לחלון, זה החלון לעקוב אחריו."
	},
	"Santorini caldera going still": {
		title: "הקלדרה בסנטוריני נרגעת",
		location: "סנטוריני",
		body: "האגאי בסוף העונה משתטח. סירות התיירים מתמעטות אחרי שש בערב. המשבצת של הערב היא הנוחה. מים עמוקים, בלי יציאה לחוף, מכירים את המסלול."
	}
};
function localizeSpotField(locale, slug, field, fallback) {
	if (locale !== "he") return fallback;
	return heSpots[slug]?.[field] || fallback;
}
function localizeCity(locale, city) {
	if (locale !== "he") return city;
	return heCities[city] || city;
}
function localizeEventField(locale, title, field, fallback) {
	if (locale !== "he") return fallback;
	return heEvents[title]?.[field] || fallback;
}
function localizeDispatchField(locale, title, field, fallback) {
	if (locale !== "he") return fallback;
	return heDispatches[title]?.[field] || fallback;
}
function formatKm(km, locale = "en") {
	return t(locale, "common.km", { n: km >= 10 ? km.toFixed(0) : String(Math.round(km * 10) / 10) });
}
function formatTemp(c) {
	return `${Math.round(c)}°C`;
}
function formatDate(iso, locale = "en") {
	try {
		const d = iso.length <= 10 ? parseISO(`${iso}T12:00:00`) : parseISO(iso);
		return format(d, "d MMM yyyy", { locale: locale === "he" ? he : enUS });
	} catch {
		return iso;
	}
}
function formatDateTime(iso, locale = "en") {
	try {
		return format(parseISO(iso), "d MMM · HH:mm", { locale: locale === "he" ? he : enUS });
	} catch {
		return iso;
	}
}
function formatDuration(min, locale = "en") {
	const h = Math.floor(min / 60);
	const m = min % 60;
	if (h <= 0) return t(locale, "dur.min", { n: m });
	if (m === 0) return t(locale, "dur.hours", { n: h });
	return t(locale, "dur.hoursMin", {
		h,
		m
	});
}
function difficultyLabel(value, locale = "en") {
	const key = `grade.${value}`;
	if (key === "grade.gentle" || key === "grade.moderate" || key === "grade.challenging" || key === "grade.extreme") return t(locale, key);
	return value;
}
function waterLabel(value, locale = "en") {
	const key = `water.${value}`;
	if (key === "water.sea" || key === "water.ocean" || key === "water.lake" || key === "water.river") return t(locale, key);
	return value;
}
function dispatchKindLabel(kind, locale) {
	if (kind === "conditions") return t(locale, "kind.conditions");
	if (kind === "crossing") return t(locale, "kind.crossing");
	if (kind === "gathering") return t(locale, "kind.gathering");
	if (kind === "notice") return t(locale, "kind.notice");
	return kind;
}
function conditionLabel(value, locale) {
	if (value === "glass" || value === "chop" || value === "swell" || value === "wind") return t(locale, `cond.${value}`);
	return value;
}
function feelingLabel(value, locale) {
	if (value === "euphoric" || value === "solid" || value === "worked" || value === "epic") return t(locale, `feel.${value}`);
	return value;
}
function sourceLabel(source, locale) {
	if (source === "garmin") return t(locale, "source.garmin");
	if (source === "suunto") return t(locale, "source.suunto");
	if (source === "samsung") return t(locale, "source.samsung");
	if (source === "apple") return t(locale, "source.apple");
	return t(locale, "source.manual");
}
function initials(name) {
	return name.trim().split(/\s+/).slice(0, 2).map((p) => p.charAt(0).toUpperCase()).join("") || "S";
}
function placeLine(city, country, locale) {
	return `${localizeCity(locale, city)}, ${countryLabel(locale, country)}`;
}
function localizedSpot(spot, locale) {
	return {
		...spot,
		name: localizeSpotField(locale, spot.slug, "name", spot.name),
		city: localizeSpotField(locale, spot.slug, "city", localizeCity(locale, spot.city)),
		description: localizeSpotField(locale, spot.slug, "description", spot.description),
		hazards: localizeSpotField(locale, spot.slug, "hazards", spot.hazards),
		bestSeason: localizeSpotField(locale, spot.slug, "bestSeason", spot.bestSeason)
	};
}
function AuthSlot() {
	const { user, isPending } = useCurrentUserState();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const t = useT();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-11 w-24 animate-pulse rounded-md bg-raised" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		size: "md",
		variant: "primary",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/login",
			children: t("auth.signIn")
		})
	});
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/profile",
			className: "flex h-11 items-center gap-2 rounded-md px-1.5 hover:bg-raised",
			children: [user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "size-8 rounded-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-8 place-items-center rounded-full bg-raised text-xs font-medium text-accent",
				children: initials(label)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden max-w-32 truncate text-sm text-fg sm:inline",
				children: label
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			disabled: signingOut,
			onClick: () => {
				setSigningOut(true);
				signOut().catch(() => setSigningOut(false));
			},
			className: "hidden h-11 px-2 text-sm text-muted hover:text-fg sm:inline disabled:cursor-wait",
			children: signingOut ? t("auth.signingOut") : t("auth.signOut")
		})]
	});
}
function Header() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const t = useT();
	const locale = usePlaceStore((s) => s.locale);
	const place = usePlaceStore((s) => s.place);
	const setEditing = usePlaceStore((s) => s.setEditing);
	const setLocale = usePlaceStore((s) => s.setLocale);
	const { user } = useCurrentUserState();
	const nav = [
		{
			to: "/",
			label: t("nav.tide")
		},
		{
			to: "/spots",
			label: t("nav.spots")
		},
		{
			to: "/groups",
			label: t("nav.groups")
		},
		{
			to: "/events",
			label: t("nav.gatherings")
		},
		{
			to: "/log",
			label: t("nav.log")
		},
		{
			to: "/sync",
			label: t("nav.sync")
		}
	];
	const placeLabel = place ? place.scope === "region" ? regionLabel(locale, place.region) : countryLabel(locale, place.country) : t("place.change");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 lg:flex",
					children: nav.map((item) => {
						const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							className: cn("rounded-md px-3 py-2 text-sm transition-colors duration-150", active ? "text-fg" : "text-muted hover:text-fg"),
							children: item.label
						}, item.to);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						place ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setEditing(true),
							className: "hidden h-11 max-w-40 truncate rounded-md px-3 text-sm text-muted hover:bg-raised hover:text-fg sm:inline",
							children: placeLabel
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setLocale(locale === "he" ? "en" : "he"),
							className: "hidden h-11 rounded-md px-3 text-sm text-muted hover:bg-raised hover:text-fg md:inline",
							children: locale === "he" ? t("lang.en") : t("lang.he")
						}),
						user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/office",
							className: cn("hidden h-11 items-center rounded-md px-3 text-sm lg:inline-flex", pathname.startsWith("/office") ? "text-accent" : "text-muted hover:text-accent"),
							children: t("nav.office")
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden md:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "grid size-11 place-items-center rounded-md text-fg lg:hidden",
							"aria-label": open ? t("nav.close") : t("nav.menu"),
							onClick: () => setOpen((v) => !v),
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						})
					]
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-line bg-bg px-4 py-4 lg:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex flex-col gap-1",
				children: [
					nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						onClick: () => setOpen(false),
						className: "rounded-md px-3 py-3 text-base text-fg hover:bg-raised",
						children: item.label
					}, item.to)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/profile",
						onClick: () => setOpen(false),
						className: "rounded-md px-3 py-3 text-base text-fg hover:bg-raised",
						children: t("nav.logbook")
					}),
					user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/office",
						onClick: () => setOpen(false),
						className: "rounded-md px-3 py-3 text-base text-accent hover:bg-raised",
						children: t("nav.office")
					}) : null,
					place ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							setOpen(false);
							setEditing(true);
						},
						className: "rounded-md px-3 py-3 text-start text-base text-fg hover:bg-raised",
						children: [
							t("place.change"),
							": ",
							placeLabel
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setLocale(locale === "he" ? "en" : "he"),
						className: "rounded-md px-3 py-3 text-start text-base text-fg hover:bg-raised",
						children: [
							t("lang.label"),
							": ",
							locale === "he" ? t("lang.he") : t("lang.en")
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 border-t border-line pt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, {})
			})]
		}) : null]
	});
}
function Footer() {
	const t = useT();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-line",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-2 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-lg text-fg",
				children: "Tideline"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-sm text-sm text-muted",
				children: t("footer.tag")
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-faint",
				children: t("footer.line")
			})]
		})
	});
}
function Page({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: cn("mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12", className),
		children
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/api-WIonAM7P.js
var placeFilterSchema = object({
	country: string().optional(),
	region: string().optional()
});
var listSpots = createServerFn({ method: "GET" }).validator((input) => placeFilterSchema.parse(input ?? {})).handler(createSsrRpc("3e0be6fdcbab214323b7e4ee2270c0c1cee91a05de57577b6525b2faa2260336"));
var getSpot = createServerFn({ method: "GET" }).validator((slug) => slug).handler(createSsrRpc("2bf7da519f4d07e6d99369b8376a070b8063b3064fe4933768193685ca7e2032"));
var getHomeStats = createServerFn({ method: "GET" }).validator((input) => placeFilterSchema.parse(input ?? {})).handler(createSsrRpc("6038aaefc058b8391d594742fac1df5b4e49cf8828ac8b384d3c4dda9b29d3a4"));
var listFeed = createServerFn({ method: "GET" }).validator((input) => placeFilterSchema.parse(input ?? {})).handler(createSsrRpc("c950f7de4c878359722206516af72e102b914520387027eff9608cecf5978e7e"));
var listSpotSwims = createServerFn({ method: "GET" }).validator((spotId) => spotId).handler(createSsrRpc("cbd87445a172b4839521932316d25f96ae99151ede775b600646dce916add3d1"));
var listGatherings = createServerFn({ method: "GET" }).validator((input) => placeFilterSchema.parse(input ?? {})).handler(createSsrRpc("99d6280a07743e087727bba0f14b28035f9c67037b05291830d9b59295369a22"));
var listSpotGatherings = createServerFn({ method: "GET" }).validator((spotId) => spotId).handler(createSsrRpc("de2e0fe2cc968df803d25df14926cc519106032905034441468979396d54cd3f"));
var listReports = createServerFn({ method: "GET" }).validator((spotId) => spotId).handler(createSsrRpc("0cdef54ab09f8e45fde5f1725709e6792d718b3c3e377c94594192e43ca22225"));
var logSwimSchema = object({
	spotId: number().int().positive(),
	swamOn: string().min(8),
	distanceKm: number().positive().max(200),
	durationMin: number().int().positive().max(6e3).nullable(),
	waterTempC: number().min(-2).max(40).nullable(),
	conditions: string().max(40).nullable(),
	feeling: string().max(40).nullable(),
	notes: string().max(600).nullable(),
	displayName: string().max(80).optional()
});
var logSwim = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => logSwimSchema.parse(input)).handler(createSsrRpc("285ede87bf505f70ccaa2128588136b6439efb4922938fc77cada139f19792b5"));
var deleteSwim = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => id).handler(createSsrRpc("57a9f5a6d104e1b3049d500d5e04c9917a47a0714c3f0d3bf6e822c571531dee"));
var listMySwims = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("b915a9ccf25de7b86cb865b5cef4fa9a149643123a8781ecf65884b3b846cbab"));
var getMyStats = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("8cff446a31219d2c0a21e0fce6b2a43fc8458f0997dc8bef6634ddcb31d654ef"));
var getMyProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("17671ff447b8d58927c9e1ef5008352c81885d02c9f9f17ec6d1a21640902490"));
var profileSchema = object({
	displayName: string().trim().min(1).max(80),
	homeWater: string().trim().max(80),
	bio: string().trim().max(280),
	stroke: string().trim().max(40)
});
var updateMyProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => profileSchema.parse(input)).handler(createSsrRpc("d6deecc2f3bf4897f24527cf8ac29735ed39a601aa83c44eb6650771e3900126"));
var placeSaveSchema = object({
	country: string().min(1).max(80),
	region: string().min(1).max(80),
	scope: _enum(["country", "region"]),
	locale: _enum(["he", "en"])
});
var saveMyPlace = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => placeSaveSchema.parse(input)).handler(createSsrRpc("bb160b717bd45eb376cb353ca9418d427723dd8dab58357b271b9f3441b4019f"));
var toggleSaveSpot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((spotId) => spotId).handler(createSsrRpc("69afa193023060e9139e0ba3c9dd41eaec545c4dd7e24a05684c0c6247b85f1b"));
var listSavedSpotIds = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("d6ba9bc72e40881b45dddc9096c31a596cfd3ca996de52f46d0a909f385a9ff4"));
var listSavedSpots = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("058b3432cbaffe1534a2bc3576fbc791c68bb53b1bab50f3c42b5dcdeabb4b5e"));
var toggleRsvp = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((eventId) => eventId).handler(createSsrRpc("1344c827603fa60ac28ea9725455f5b76059e4f20e0ccdd0803bb1974af5a562"));
var listMyRsvpIds = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("cb6613287310d65b528a9fd672d07fac684c7eb9c00eafd0ab800d3b4e499a4f"));
var reportSchema = object({
	spotId: number().int().positive(),
	waterTempC: number().min(-2).max(40).nullable(),
	visibility: string().max(40).nullable(),
	wildlife: string().max(80).nullable(),
	notes: string().trim().min(1).max(400),
	displayName: string().max(80).optional()
});
var createReport = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => reportSchema.parse(input)).handler(createSsrRpc("de136598203c7e061039b1c95da6eccf9908a83ad70801369053aa762daf711e"));
var createSpotSchema = object({
	name: string().trim().min(2).max(80),
	city: string().trim().min(1).max(80),
	country: string().trim().min(1).max(80),
	waterType: _enum([
		"sea",
		"ocean",
		"lake",
		"river"
	]),
	difficulty: _enum([
		"gentle",
		"moderate",
		"challenging",
		"extreme"
	]),
	typicalKm: number().positive().max(200).nullable(),
	typicalTempC: number().min(-2).max(40).nullable(),
	bestSeason: string().trim().max(80),
	hazards: string().trim().max(200),
	description: string().trim().min(8).max(800),
	lat: number().min(-90).max(90).nullable(),
	lng: number().min(-180).max(180).nullable()
});
var createSpot = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => createSpotSchema.parse(input)).handler(createSsrRpc("442036881e1fc3788b4fee79a3f1905e8c9cb5bdd032fef5f90af12247ad16d2"));
var listClubs = createServerFn({ method: "GET" }).validator((input) => placeFilterSchema.parse(input ?? {})).handler(createSsrRpc("8ea58f064f70abdf444513c844bb57414be5d205c70613268f66293e9e7d6b4e"));
var getClub = createServerFn({ method: "GET" }).validator((slug) => slug).handler(createSsrRpc("4bf34ab45006325c56a41e314adc585446d5df4340833ae06a044e7c525bc79d"));
var getMyClubAccess = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((slug) => slug).handler(createSsrRpc("653f3f334692ba2330792988a426b59c8020e3a3223b8ed57aba1c6e0623a676"));
var listMyClubSlugs = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("f545b125c08614eb437f03e7839e260f2ecad68b5fbdd4123e0b363c3c49b8eb"));
var createClubSchema = object({
	name: string().trim().min(2).max(80),
	description: string().trim().max(400),
	country: string().trim().min(1).max(80),
	spotId: number().int().positive().nullable(),
	whatsappUrl: string().trim().max(300)
});
var createClub = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => createClubSchema.parse(input)).handler(createSsrRpc("afedac5f3f6ea3df93d1d42075a9796bc9bece57773aa78acffbe18025452338"));
var joinClub = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((clubId) => clubId).handler(createSsrRpc("b1339361d99540f42bae654a8bfbadfc84d56280d029503a730b947b6b13e0b3"));
var leaveClub = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((clubId) => clubId).handler(createSsrRpc("d51373d9ce833ea79d93c5a9de9177e5f56a79b922347718f39c68777156b5e8"));
var updateClubSchema = object({
	clubId: number().int().positive(),
	name: string().trim().min(2).max(80),
	description: string().trim().max(400),
	spotId: number().int().positive().nullable(),
	whatsappUrl: string().trim().max(300)
});
var updateClub = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => updateClubSchema.parse(input)).handler(createSsrRpc("b318e0856d502799a03aded9b98b40143499b83a4f3916f2b51c6f69401f0342"));
var deleteClub = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((clubId) => clubId).handler(createSsrRpc("2e58bb999ccf2b27a16450ba3dd58d3794d682431778b0635ff466f4bf71fd50"));
var listClubMembers = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((clubId) => clubId).handler(createSsrRpc("f7eab5e164bfd2f31e9d62b648723139eec61051ae330e063d2d7d90f4eb63f7"));
var removeClubMember = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	clubId: number(),
	userId: string().min(1)
}).parse(input)).handler(createSsrRpc("7a32555c687e72ebfdad49120e75391e49ce93c2f4ecc3b4e3517115e09c42e4"));
var listSpotClubs = createServerFn({ method: "GET" }).validator((spotId) => spotId).handler(createSsrRpc("c6432a8e2753f1f81bf003e5e431a168884e578fd2c69c61a1c8c9db883086b2"));
var watchSourceSchema = _enum([
	"garmin",
	"suunto",
	"samsung",
	"apple"
]);
var importWorkoutSchema = object({
	source: watchSourceSchema,
	key: string().min(1).max(80),
	title: string().max(160),
	swamOn: string().min(8).max(12),
	distanceKm: number().positive().max(200),
	durationMin: number().positive().max(6e3),
	waterTempC: number().min(-2).max(40).nullable(),
	lat: number().min(-90).max(90).nullable(),
	lng: number().min(-180).max(180).nullable(),
	poolLike: boolean().optional(),
	spotId: number().int().positive().nullable().optional()
});
var listWatchLinks = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("4e9b4dad29c245bd328f048eb47609d01774476e0007bc2040c1f3f4b3a27b05"));
var linkWatch = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => watchSourceSchema.parse(input)).handler(createSsrRpc("fc9dd245833e98d898277bebb63554e0ad7b6399e08383983043ef83ada16016"));
var unlinkWatch = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => watchSourceSchema.parse(input)).handler(createSsrRpc("d39c1eee243c8fc661471e25d1ab1964aa0310118d3624282660f25053a0b84a"));
var importWatchWorkouts = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({ workouts: array(importWorkoutSchema).min(1).max(25) }).parse(input)).handler(createSsrRpc("60394d12e775dd093ced5234801bd6e1c469105b36e482a951234cf3c9b797ac"));
var listSyncEvents = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("4d15a46db3ee25aa0179c499f7e37418ccca535d7f26512f9cc283e9f4919824"));
//#endregion
export { formatTemp as $, listSpots as A, updateMyProfile as B, listMySwims as C, listSpotClubs as D, listSavedSpots as E, saveMyPlace as F, createSsrRpc as G, Header as H, toggleRsvp as I, feelingLabel as J, difficultyLabel as K, toggleSaveSpot as L, listWatchLinks as M, logSwim as N, listSpotGatherings as O, removeClubMember as P, formatKm as Q, unlinkWatch as R, listMyRsvpIds as S, listSavedSpotIds as T, Page as U, Footer as V, conditionLabel as W, formatDateTime as X, formatDate as Y, formatDuration as Z, listClubMembers as _, usePlaceFilter as _t, deleteClub as a, localizeSpotField as at, listGatherings as b, getHomeStats as c, sourceLabel as ct, getMyStats as d, waterLabel as dt, initials as et, getSpot as f, Button as ft, linkWatch as g, regionLabel as gt, leaveClub as h, countryLabel as ht, createSpot as i, localizeEventField as it, listSyncEvents as j, listSpotSwims as k, getMyClubAccess as l, useCurrentUserState as lt, joinClub as m, cn as mt, createClub as n, localizeCity as nt, deleteSwim as o, localizedSpot as ot, importWatchWorkouts as p, Logo as pt, dispatchKindLabel as q, createReport as r, localizeDispatchField as rt, getClub as s, placeLine as st, router_exports as t, isUnauthorized as tt, getMyProfile as u, useLoad as ut, listClubs as v, usePlaceStore as vt, listReports as w, listMyClubSlugs as x, listFeed as y, useT as yt, updateClub as z };
