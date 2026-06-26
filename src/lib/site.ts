// Central site config. Editable values come from src/data/settings.json (managed
// in Keystatic by the client); this module derives the rest and keeps a stable API.
import settings from '../data/settings.json';

const num = settings.whatsappNumber.replace(/\D/g, '');
const display = `+${num.slice(0, 3)} ${num.slice(3, 5)} ${num.slice(5, 8)} ${num.slice(8)}`.trimEnd();

export const SITE = {
  name: settings.name,
  tagline: settings.tagline,
  url: 'https://tourguideecuador.com',
  email: settings.email,
  whatsappNumber: num,
  whatsappDisplay: display, // e.g. "+593 99 194 6532"
  whatsappHref: `https://wa.me/${num}`,
  address: settings.address,
  city: settings.city,
  country: settings.country,
  nytQuote: settings.nytQuote,
  licenseNumber: settings.licenseNumber,
  tripadvisorUrl: settings.tripadvisorUrl,
  instagramUrl: settings.instagramUrl,
  facebookUrl: settings.facebookUrl,
  hero: settings.hero,
} as const;

export const NAV = [
  { label: 'Galápagos Cruises', href: '/cruises' },
  { label: 'Ecuador Tours', href: '/tours' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'When to go', href: '/galapagos-wildlife-calendar' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'About', href: '/about-us' },
] as const;

export const whatsappLink = (text?: string) =>
  text ? `${SITE.whatsappHref}?text=${encodeURIComponent(text)}` : SITE.whatsappHref;
