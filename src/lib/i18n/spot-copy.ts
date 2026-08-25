import type { Locale } from "./messages";

type SpotText = {
  name?: string;
  city?: string;
  description?: string;
  hazards?: string;
  bestSeason?: string;
};

const heSpots: Record<string, SpotText> = {
  gordon: {
    name: "חוף גורדון",
    city: "תל אביב",
    description:
      "חוף עיר עם תרבות שחיית שחר רצינית. מים עם מציל, מדף חול ארוך, וים תיכוני שהופך חלק כמו משי בבוקר שקט.",
    hazards: "מדוזות בקיץ, שובך לחוף בימים של רוח",
    bestSeason: "אפריל עד יוני, אוקטובר עד דצמבר",
  },
  eilat: {
    name: "חוף האלמוגים",
    city: "אילת",
    description:
      "מלח ים סוף וחום בחורף. שוחים מעל מדף האלמוגים במים כל כך צלולים שהקרקעית נראית קרובה. נשארים מחוץ לחבלי השמורה.",
    hazards: "שונית, תנועת סירות, שמש חזקה",
    bestSeason: "כל השנה",
  },
  caesarea: {
    name: "חוף קיסריה",
    city: "קיסריה",
    description:
      "אמת מים רומית על החול, אבני נמל הרודיאני במים. קטע חוף ישראלי עם אופי, לשחיינים שאוהבים מרקם מתחתם.",
    hazards: "סלעים, שרידים ארכיאולוגיים, שובך",
    bestSeason: "מאי עד נובמבר",
  },
  kinneret: {
    name: "כנרת",
    city: "טבריה",
    description:
      "אגן מתוק מתחת לפני הים, חם ומינרלי. קבוצות מקומיות מתאמנות כאן כל השנה. חציית הכנרת היא קלאסיקה ישראלית שקטה.",
    hazards: "תנועת סירות, רוח חורף",
    bestSeason: "אפריל עד נובמבר",
  },
  herzliya: {
    name: "חוף הרצליה",
    city: "הרצליה",
    description:
      "חוף עירוני ארוך צפונית לתל אביב, עם קבוצת שחר קבועה ומדף חול רחב. כניסה קלה, מים צלולים בחורף, וקפה אחרי.",
    hazards: "נתיב אופנועי ים, מדוזות בקיץ",
    bestSeason: "אפריל עד יוני, אוקטובר עד דצמבר",
  },
  dado: {
    name: "חוף דדו",
    city: "חיפה",
    description:
      "המים הפתוחים של חיפה. מפרץ רחב עם שובר גלים, מועדון מקומי רציני, והכרמל ברקע. עדיף בבוקר לפני שהרוח המערבית קמה.",
    hazards: "סלעים בקצוות, גלים בקיץ, מדוזות",
    bestSeason: "מאי עד נובמבר",
  },
  "tel-baruch": {
    name: "תל ברוך",
    city: "תל אביב",
    description:
      "האחות השקטה של גורדון. מדף חול, קבוצת ימי חול, וקו פשוט הלוך ושוב לאורך צפון תל אביב.",
    hazards: "מדוזות בקיץ, שובך מדי פעם",
    bestSeason: "אפריל עד יוני, אוקטובר עד דצמבר",
  },
  palmachim: {
    name: "חוף פלמחים",
    city: "פלמחים",
    description:
      "קטע פראי יותר דרומית לראשון. דיונות של גן לאומי, מים צלולים יותר מהעיר, ופחות אנשים אם מגיעים מוקדם.",
    hazards: "סלעים, כללי שמורה, בלי מציל מחוץ לעונה",
    bestSeason: "מאי עד נובמבר",
  },
  nahariya: {
    name: "חוף נהריה",
    city: "נהריה",
    description:
      "ים תיכון צפוני, לעיתים קריר וצלול יותר מתל אביב. טיילת ארוכה, מדף עדין, וקבוצה קטנה כל השנה.",
    hazards: "מדוזות בקיץ, גלים מצפון",
    bestSeason: "מאי עד נובמבר",
  },
  ashkelon: {
    name: "מרינה אשקלון",
    city: "אשקלון",
    description:
      "שחייה דרומית מחומת המרינה. לעיתים חם יותר, לפעמים יותר אצה, ואופציה טובה בחורף כשהצפון סגור ברוח.",
    hazards: "תנועת מרינה, סלעים, מדוזות",
    bestSeason: "מאי עד נובמבר",
  },
  "dover-channel": { name: "תעלת למאנש", city: "דובר" },
  alcatraz: { name: "חציית אלקטרז", city: "סן פרנסיסקו" },
  rottnest: { name: "תעלת רוטנסט", city: "פרת" },
  catalina: { name: "תעלת קטלינה", city: "אוואלון" },
  gibraltar: { name: "מצר גיברלטר", city: "טריפה" },
  zurich: { name: "אגם ציריך", city: "ציריך" },
  hellespont: { name: "הלספונט", city: "צנאקלה" },
  robben: { name: "חציית רובן איילנד", city: "קייפטאון" },
  bondi: { name: "בונדי לברונטה", city: "סידני" },
  waikiki: { name: "חוף וואיקיקי", city: "הונולולו" },
  "cook-strait": { name: "מצר קוק", city: "ולינגטון" },
  manhattan: { name: "אי מנהטן", city: "ניו יורק" },
  santorini: { name: "שחיית הקלדרה", city: "פירה" },
  serpentine: { name: "סרפנטין", city: "לונדון" },
};

const heCities: Record<string, string> = {
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
  London: "לונדון",
};

type EventText = { title?: string; notes?: string; organizer?: string };

const heEvents: Record<string, EventText> = {
  "Tel Aviv dawn crew": {
    title: "קבוצת שחר תל אביב",
    organizer: "קבועים בגורדון",
    notes: "נפגשים במגדל המציל. בוקר חלק כמו משי בלבד. מבטלים כשיש שובך.",
  },
  "Escape from the Rock (training)": {
    title: "בריחה מהסלע אימון",
    organizer: "מועדון החתירה סאות אנד",
    notes: "חציית אימון של המועדון. חליפות רשות, קייק ליווי חובה.",
  },
  "Channel weather window": {
    title: "חלון מזג אוויר בתעלה",
    organizer: "איגוד שחיית התעלה",
    notes: "חלון גאות חלשה. הטייסים מחכים. זו חציה מפוקחת, לא שחייה חברתית.",
  },
  "Red Sea coral loop": {
    title: "לולאת אלמוגים בים סוף",
    organizer: "מים פתוחים אילת",
    notes: "נשארים מחוץ לחבלי השמורה. קרם הגנה שמתאים לשוניות.",
  },
  "Rottnest Channel Swim briefing": {
    title: "תדרוך שחיית תעלת רוטנסט",
    organizer: "איגוד שחיית רוטנסט",
    notes: "יחידים, זוגות וקבוצות. האוקיינוס ההודי, מקוטסלו לאי.",
  },
  "Length of the lake": {
    title: "לאורך האגם",
    organizer: "מועדון מיטנקוואי",
    notes: "מציריך לרפרסוויל. האכלה מליווי. המים בדרך כלל 20 עד 22 מעלות.",
  },
  "Bondi to Bronte social": {
    title: "בונדי לברונטה חברתי",
    organizer: "קבוצת אייסברגס",
    notes: "שחיית אוקיינוס לאורך הצוקים. אם השובך עולה, עוברים לבריכות הגאות.",
  },
  "Tarifa to Africa attempt": {
    title: "ניסיון טריפה לאפריקה",
    organizer: "שחיית המצר",
    notes: "תלוי בגאות. דרכון לנחיתה במרוקו. סירת ליווי חובה.",
  },
  "Kinneret Saturday loop": {
    title: "לולאת שבת בכנרת",
    organizer: "שחייני טבריה",
    notes: "מים מתוקים, חמים, בלי מדוזות. נפגשים בטיילת.",
  },
  "Caldera crossing": {
    title: "חציית הקלדרה",
    organizer: "מים פתוחים האגאי",
    notes: "הורדה בסירה בקלדרה, שוחים לכיוון אויה. מים עמוקים, בלי יציאה באמצע המסלול.",
  },
  "Herzliya sunrise loop": {
    title: "לולאת זריחה בהרצליה",
    organizer: "קבוצת הרצליה",
    notes: "נפגשים במגדל מול האקדיה. כובעים על הראש. קפה אחרי.",
  },
  "Haifa Dado Saturday": {
    title: "שבת בדדו חיפה",
    organizer: "מים פתוחים כרמל",
    notes: "הלוך ושוב לשובר הגלים. אם הרוח המערבית קמה נשארים בתוך החומה.",
  },
  "Tel Baruch weekday dawn": {
    title: "שחר ימי חול בתל ברוך",
    organizer: "שחייני צפון תל אביב",
    notes: "מים שקטים, קבוצה קטנה. שחיינים חדשים מוזמנים בקו הפנימי.",
  },
};

type DispatchText = { title?: string; body?: string; location?: string };

const heDispatches: Record<string, DispatchText> = {
  "Jellyfish thinning off Gordon": {
    title: "מדוזות מתמעטות מול גורדון",
    location: "תל אביב",
    body: "פריחת סוף הקיץ מתפרקת. קבוצות שחר מדווחות על מים צלולים וטמפרטורה 25 מעלות מהילטון עד חוף בננה. עדיין שמים כובע שאפשר לראות.",
  },
  "Channel neap window in October": {
    title: "חלון גאות חלשה בתעלה באוקטובר",
    location: "דובר",
    body: "טייסים מחזיקים חלון מגאות חלשה מ3 עד 7 באוקטובר. המים על 16 מעלות. אם יש לכם חציה, ישנים כמו טייס: מזג האוויר לפני האגו.",
  },
  "New Saturday crew on the Kinneret": {
    title: "קבוצת שבת חדשה בכנרת",
    location: "טבריה",
    body: "שחייני טבריה נפגשים בשבע כל שבת ללולאה של ארבעה קילומטר במים מתוקים. בלי זרם, בלי מדוזות, קפה אחרי. מתחילים מוזמנים בקו הפנימי.",
  },
  "Cape Doctor easing for Robben attempts": {
    title: "הקייפ דוקטור נרגע לניסיונות רובן",
    location: "קייפטאון",
    body: "צפויה תקופה שקטה יותר מול קייפטאון. המים 15 מעלות, אצות סמיכות ליד האי. אם אתם מחכים לחלון, זה החלון לעקוב אחריו.",
  },
  "Santorini caldera going still": {
    title: "הקלדרה בסנטוריני נרגעת",
    location: "סנטוריני",
    body: "האגאי בסוף העונה משתטח. סירות התיירים מתמעטות אחרי שש בערב. המשבצת של הערב היא הנוחה. מים עמוקים, בלי יציאה לחוף, מכירים את המסלול.",
  },
};

export function localizeSpotField(
  locale: Locale,
  slug: string,
  field: keyof SpotText,
  fallback: string,
): string {
  if (locale !== "he") return fallback;
  return heSpots[slug]?.[field] || fallback;
}

export function localizeCity(locale: Locale, city: string): string {
  if (locale !== "he") return city;
  return heCities[city] || city;
}

export function localizeEventField(
  locale: Locale,
  title: string,
  field: keyof EventText,
  fallback: string,
): string {
  if (locale !== "he") return fallback;
  return heEvents[title]?.[field] || fallback;
}

export function localizeDispatchField(
  locale: Locale,
  title: string,
  field: keyof DispatchText,
  fallback: string,
): string {
  if (locale !== "he") return fallback;
  return heDispatches[title]?.[field] || fallback;
}
