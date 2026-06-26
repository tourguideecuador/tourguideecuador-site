// Galápagos seasonality — evergreen reference content for the "when to go" page.
// General guide; wildlife behaviour varies year to year.

export type SeasonKey = 'warm' | 'cool';

export const seasons: Record<SeasonKey, {
  label: string; months: string; temp: string; blurb: string; good: string[];
}> = {
  warm: {
    label: 'Warm & wet',
    months: 'December – May',
    temp: '24–30°C air · 23–26°C sea',
    blurb:
      'Calmer crossings, warm water and bright skies with short tropical showers. The islands turn green and the warm-season hatchlings appear — the easiest, sunniest time to snorkel.',
    good: ['Warmest water for snorkelling', 'Calm seas', 'Sunny skies & green islands', 'Hatchlings & land-bird nesting'],
  },
  cool: {
    label: 'Cool & dry (garúa)',
    months: 'June – November',
    temp: '19–26°C air · 18–23°C sea',
    blurb:
      'The Humboldt current brings cool, nutrient-rich water — and an explosion of marine life. Skies turn misty (the "garúa"), seas are livelier, and the diving is at its best.',
    good: ['Richest marine life', 'Seabird courtship & breeding', 'Whales & dolphins', 'Best diving (wetsuit weather)'],
  },
};

export interface MonthEntry {
  name: string;
  short: string;
  season: SeasonKey;
  note: string;
  highlights: string[];
  bestFor: string;
}

export const months: MonthEntry[] = [
  { name: 'January', short: 'Jan', season: 'warm', note: 'Seas calm and warming; first warm-season rains green the islands.',
    highlights: ['Land birds begin nesting', 'Marine iguanas turn vivid green & red on Española', 'Green sea turtles arrive to nest'],
    bestFor: 'Warm seas & green landscapes' },
  { name: 'February', short: 'Feb', season: 'warm', note: 'Hottest month — the warmest water of the year for snorkelling.',
    highlights: ['Greater flamingos nesting', 'Galápagos doves most active', 'Bahama pintails breeding'],
    bestFor: 'Warmest water & snorkelling' },
  { name: 'March', short: 'Mar', season: 'warm', note: 'Peak of the warm, wet season; superb underwater visibility.',
    highlights: ['Marine iguanas nest on Fernandina', 'Frigatebird males inflate red throat pouches', 'Calm crossings'],
    bestFor: 'Calm seas & frigatebird displays' },
  { name: 'April', short: 'Apr', season: 'warm', note: 'End of the warm season — a month of mass hatching.',
    highlights: ['Waved albatrosses return to Española', 'Green-sea-turtle & land-bird eggs hatch', 'Lush islands, excellent visibility'],
    bestFor: 'Hatchlings & albatross arrival' },
  { name: 'May', short: 'May', season: 'warm', note: 'Pleasant transition month before the cool season sets in.',
    highlights: ['Blue-footed boobies begin their courtship dance', 'Waved albatrosses laying eggs', 'Marine iguanas hatch on Santa Cruz'],
    bestFor: 'Blue-footed booby courtship' },
  { name: 'June', short: 'Jun', season: 'cool', note: 'The garúa mist arrives and seas turn nutrient-rich.',
    highlights: ['Giant tortoises migrate to nest on Santa Cruz', 'First humpback whales off the west', 'Seabird colonies busy'],
    bestFor: 'Whales & rich waters' },
  { name: 'July', short: 'Jul', season: 'cool', note: 'Cool, productive seas; seabird breeding in full swing.',
    highlights: ['Flightless cormorants & blue-footed boobies courting', 'Whales & dolphins common in the west', 'Lava lizards mating'],
    bestFor: 'Seabird breeding & cetaceans' },
  { name: 'August', short: 'Aug', season: 'cool', note: 'Coolest, mistiest stretch — wonderful for active wildlife.',
    highlights: ['Sea lion pupping season begins', 'Galápagos hawks courting', 'Migrant shorebirds arrive'],
    bestFor: 'Sea lion pups' },
  { name: 'September', short: 'Sep', season: 'cool', note: 'Peak marine activity in the coolest, richest waters.',
    highlights: ['Penguins, sea lions & fur seals at their most active', 'Excellent diving', 'Nazca boobies & swallow-tailed gulls nesting'],
    bestFor: 'Best diving & marine life' },
  { name: 'October', short: 'Oct', season: 'cool', note: 'Cool season continues; fewer travellers, abundant wildlife.',
    highlights: ['Galápagos fur seals begin mating', 'Blue-footed booby chicks on the nest', 'Lava herons nesting'],
    bestFor: 'Fur seals & booby chicks' },
  { name: 'November', short: 'Nov', season: 'cool', note: 'Seas begin to calm as the warm season approaches.',
    highlights: ['Playful sea lion pups everywhere', 'Great all-round wildlife & diving', 'Quieter, calming seas'],
    bestFor: 'Quieter seas & sea lion pups' },
  { name: 'December', short: 'Dec', season: 'warm', note: 'Warm season returns — festive, sunny and lush (book early).',
    highlights: ['Green turtles begin nesting', 'Waved albatross chicks fledge & leave Española', 'Warm, calm seas return'],
    bestFor: 'Warming seas & turtle nesting' },
];

// Species "at a glance" — which months each is a highlight (1 = Jan … 12 = Dec)
export interface SpeciesRow { species: string; active: number[]; note: string }
export const speciesTimeline: SpeciesRow[] = [
  { species: 'Waved albatross (Española)', active: [4, 5, 6, 7, 8, 9, 10, 11, 12], note: 'Arrive Apr · chicks fledge Dec' },
  { species: 'Blue-footed booby courtship', active: [5, 6], note: 'Famous courtship dance' },
  { species: 'Frigatebird displays', active: [3, 4], note: 'Males inflate red pouches' },
  { species: 'Greater flamingos nesting', active: [2, 3], note: 'Lagoons of Floreana & Rábida' },
  { species: 'Marine iguanas (colour & nesting)', active: [12, 1, 2, 3], note: 'Bright mating colours' },
  { species: 'Green sea turtles nesting', active: [1, 2, 3, 12], note: 'Hatchlings from Apr' },
  { species: 'Giant tortoise nesting', active: [6, 7, 8, 9, 10, 11, 12], note: 'Lowlands of Santa Cruz' },
  { species: 'Humpback whales & dolphins', active: [6, 7, 8, 9], note: 'Best off western Isabela' },
  { species: 'Sea lion pups', active: [8, 9, 10, 11], note: 'Pupping season' },
  { species: 'Galápagos penguins', active: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], note: 'Year-round; liveliest in cool season' },
];

// ─── Spanish (Ecuadorian) translation of the same evergreen data ───────────────
// Structural fields (`season`, `active`, `short[0]`) are shared with the English
// dataset; only display copy is translated.

export const seasonsEs: Record<SeasonKey, {
  label: string; months: string; temp: string; blurb: string; good: string[];
}> = {
  warm: {
    label: 'Cálida y húmeda',
    months: 'Diciembre – Mayo',
    temp: '24–30°C aire · 23–26°C mar',
    blurb:
      'Travesías más tranquilas, agua tibia y cielos despejados con chubascos tropicales breves. Las islas reverdecen y aparecen las crías de la temporada cálida: la época más fácil y soleada para hacer snorkel.',
    good: ['Agua más cálida para snorkel', 'Mar en calma', 'Cielos soleados e islas verdes', 'Crías y anidación de aves terrestres'],
  },
  cool: {
    label: 'Fresca y seca (garúa)',
    months: 'Junio – Noviembre',
    temp: '19–26°C aire · 18–23°C mar',
    blurb:
      'La corriente de Humboldt trae agua fría y rica en nutrientes, y con ella una explosión de vida marina. Los cielos se cubren de neblina (la "garúa"), el mar se anima y el buceo está en su mejor momento.',
    good: ['Mayor vida marina', 'Cortejo y cría de aves marinas', 'Ballenas y delfines', 'Mejor buceo (temporada de neopreno)'],
  },
};

export const monthsEs: MonthEntry[] = [
  { name: 'Enero', short: 'Ene', season: 'warm', note: 'Mar en calma y templándose; las primeras lluvias cálidas reverdecen las islas.',
    highlights: ['Las aves terrestres empiezan a anidar', 'Las iguanas marinas se tornan verdes y rojas en Española', 'Llegan las tortugas verdes a anidar'],
    bestFor: 'Mar cálido y paisajes verdes' },
  { name: 'Febrero', short: 'Feb', season: 'warm', note: 'El mes más caluroso: el agua más tibia del año para hacer snorkel.',
    highlights: ['Anidación de flamencos', 'Las palomas de Galápagos en plena actividad', 'Cría de los patillos de las Bahamas'],
    bestFor: 'Agua más tibia y snorkel' },
  { name: 'Marzo', short: 'Mar', season: 'warm', note: 'Pico de la temporada cálida y húmeda; visibilidad submarina excelente.',
    highlights: ['Las iguanas marinas anidan en Fernandina', 'Los fragatas machos inflan su buche rojo', 'Travesías tranquilas'],
    bestFor: 'Mar en calma y cortejo de fragatas' },
  { name: 'Abril', short: 'Abr', season: 'warm', note: 'Fin de la temporada cálida: un mes de eclosiones masivas.',
    highlights: ['Los albatros de Galápagos regresan a Española', 'Eclosionan tortugas verdes y aves terrestres', 'Islas frondosas y excelente visibilidad'],
    bestFor: 'Crías y llegada del albatros' },
  { name: 'Mayo', short: 'May', season: 'warm', note: 'Mes de transición agradable antes de la temporada fresca.',
    highlights: ['Los piqueros patas azules inician su danza de cortejo', 'Los albatros ponen sus huevos', 'Eclosionan iguanas marinas en Santa Cruz'],
    bestFor: 'Cortejo del piquero patas azules' },
  { name: 'Junio', short: 'Jun', season: 'cool', note: 'Llega la garúa y el mar se vuelve rico en nutrientes.',
    highlights: ['Las tortugas gigantes migran a anidar en Santa Cruz', 'Primeras ballenas jorobadas al oeste', 'Colonias de aves marinas activas'],
    bestFor: 'Ballenas y aguas ricas' },
  { name: 'Julio', short: 'Jul', season: 'cool', note: 'Mar frío y productivo; la cría de aves marinas en pleno apogeo.',
    highlights: ['Cortejan cormoranes no voladores y piqueros patas azules', 'Ballenas y delfines frecuentes al oeste', 'Apareamiento de lagartijas de lava'],
    bestFor: 'Cría de aves marinas y cetáceos' },
  { name: 'Agosto', short: 'Ago', season: 'cool', note: 'El tramo más fresco y neblinoso: ideal para la fauna activa.',
    highlights: ['Comienza la temporada de crías de lobo marino', 'Cortejo de los gavilanes de Galápagos', 'Llegan aves playeras migratorias'],
    bestFor: 'Crías de lobo marino' },
  { name: 'Septiembre', short: 'Sep', season: 'cool', note: 'Pico de actividad marina en las aguas más frías y ricas.',
    highlights: ['Pingüinos, lobos marinos y lobos peleteros muy activos', 'Buceo excelente', 'Anidan piqueros de Nazca y gaviotas de cola bifurcada'],
    bestFor: 'Mejor buceo y vida marina' },
  { name: 'Octubre', short: 'Oct', season: 'cool', note: 'Continúa la temporada fresca; menos visitantes, fauna abundante.',
    highlights: ['Los lobos peleteros inician su apareamiento', 'Polluelos de piquero patas azules en el nido', 'Anidan las garzas de lava'],
    bestFor: 'Lobos peleteros y polluelos de piquero' },
  { name: 'Noviembre', short: 'Nov', season: 'cool', note: 'El mar empieza a calmarse al acercarse la temporada cálida.',
    highlights: ['Crías juguetonas de lobo marino por todas partes', 'Gran fauna y buceo en general', 'Mar más tranquilo y sereno'],
    bestFor: 'Mar tranquilo y crías de lobo marino' },
  { name: 'Diciembre', short: 'Dic', season: 'warm', note: 'Vuelve la temporada cálida: festiva, soleada y frondosa (reserva con tiempo).',
    highlights: ['Las tortugas verdes comienzan a anidar', 'Los polluelos de albatros vuelan y dejan Española', 'Regresa el mar cálido y en calma'],
    bestFor: 'Mar templándose y anidación de tortugas' },
];

export const speciesTimelineEs: SpeciesRow[] = [
  { species: 'Albatros de Galápagos (Española)', active: [4, 5, 6, 7, 8, 9, 10, 11, 12], note: 'Llega abr · los polluelos vuelan en dic' },
  { species: 'Cortejo del piquero patas azules', active: [5, 6], note: 'Su famosa danza de cortejo' },
  { species: 'Despliegue de fragatas', active: [3, 4], note: 'Los machos inflan su buche rojo' },
  { species: 'Anidación de flamencos', active: [2, 3], note: 'Lagunas de Floreana y Rábida' },
  { species: 'Iguanas marinas (color y anidación)', active: [12, 1, 2, 3], note: 'Colores vivos de apareamiento' },
  { species: 'Anidación de tortugas verdes', active: [1, 2, 3, 12], note: 'Eclosionan desde abril' },
  { species: 'Anidación de tortugas gigantes', active: [6, 7, 8, 9, 10, 11, 12], note: 'Tierras bajas de Santa Cruz' },
  { species: 'Ballenas jorobadas y delfines', active: [6, 7, 8, 9], note: 'Mejor al oeste de Isabela' },
  { species: 'Crías de lobo marino', active: [8, 9, 10, 11], note: 'Temporada de crías' },
  { species: 'Pingüinos de Galápagos', active: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], note: 'Todo el año; más activos en temporada fresca' },
];

export function getCalendar(lang: string) {
  return lang === 'es'
    ? { seasons: seasonsEs, months: monthsEs, speciesTimeline: speciesTimelineEs }
    : { seasons, months, speciesTimeline };
}
