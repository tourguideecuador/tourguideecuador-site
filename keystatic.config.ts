import { config, fields, collection, singleton } from '@keystatic/core';

/*
  Keystatic — content editor for Tour Guide Ecuador.

  STORAGE — driven by PUBLIC_ env vars (this config also runs in the browser, so only
  import.meta.env PUBLIC_ vars are available; never use process.env here):
    • dev (npm run dev)                       → local (edits files on disk)
    • prod + PUBLIC_KEYSTATIC_CLOUD_PROJECT    → Keystatic Cloud (client email login)
    • prod + PUBLIC_KEYSTATIC_GITHUB_REPO      → GitHub mode (GitHub login)

  IMAGES: stored in src/assets/<collection>/ with a relative publicPath
  (../../assets/<collection>/) so Astro's content `image()` resolves & optimizes
  them to WebP — and the client just drag-drops in the editor.
*/

const CLOUD_PROJECT = import.meta.env.PUBLIC_KEYSTATIC_CLOUD_PROJECT as string | undefined;
const GH_REPO = import.meta.env.PUBLIC_KEYSTATIC_GITHUB_REPO as `${string}/${string}` | undefined;

const storage = import.meta.env.DEV
  ? ({ kind: 'local' } as const)
  : GH_REPO
    ? ({ kind: 'github', repo: GH_REPO } as const)
    : CLOUD_PROJECT
      ? ({ kind: 'cloud' } as const)
      : ({ kind: 'local' } as const);

const seoFields = {
  metaTitle: fields.text({ label: 'Meta title', validation: { length: { min: 1 } }, description: 'SEO <title> (carried from old site).' }),
  metaDescription: fields.text({
    label: 'Meta description',
    multiline: true,
    validation: { length: { min: 1 } },
    description: 'SEO meta description — keep ≤ 160 characters. Never leave blank.',
  }),
};

const heroFields = (dir: string, required = false) => ({
  heroImage: fields.image({
    label: 'Hero image',
    directory: `src/assets/${dir}`,
    publicPath: `../../assets/${dir}/`,
    validation: { isRequired: required },
  }),
  heroImageAlt: fields.text({ label: 'Hero image alt text', description: 'Describe the photo for accessibility & SEO.' }),
});

const gallery = (dir: string) =>
  fields.array(
    fields.image({ label: 'Photo', directory: `src/assets/${dir}`, publicPath: `../../assets/${dir}/` }),
    { label: 'Gallery', itemLabel: (props) => props.value?.filename ?? 'Photo' },
  );

export default config({
  storage,
  ...(storage.kind === 'cloud' && CLOUD_PROJECT ? { cloud: { project: CLOUD_PROJECT } } : {}),
  ui: {
    brand: { name: 'Tour Guide Ecuador' },
    navigation: {
      'Site': ['settings'],
      'Catalogue': ['tours', 'cruises', 'destinations', 'tourTypes'],
      'Content': ['pages', 'reviews', 'faqs'],
    },
  },
  singletons: {
    settings: singleton({
      label: 'Site settings',
      path: 'src/data/settings',
      format: { data: 'json' },
      schema: {
        name: fields.text({ label: 'Business name' }),
        tagline: fields.text({ label: 'Tagline' }),
        email: fields.text({ label: 'Contact email' }),
        whatsappNumber: fields.text({ label: 'WhatsApp number', description: 'Digits only, country code first (e.g. 593991946532).' }),
        address: fields.text({ label: 'Address' }),
        city: fields.text({ label: 'City' }),
        country: fields.text({ label: 'Country' }),
        nytQuote: fields.text({ label: 'Press / trust line', description: 'e.g. "Recommended by The New York Times".' }),
        licenseNumber: fields.text({ label: 'Tourism licence # (MINTUR)', description: 'Shown in the credibility strip & footer.' }),
        tripadvisorUrl: fields.url({ label: 'TripAdvisor URL' }),
        instagramUrl: fields.url({ label: 'Instagram URL' }),
        facebookUrl: fields.url({ label: 'Facebook URL' }),
        hero: fields.object(
          {
            eyebrow: fields.text({ label: 'Eyebrow' }),
            heading: fields.text({ label: 'Heading', multiline: true }),
            subheading: fields.text({ label: 'Subheading', multiline: true }),
            ctaPrimaryLabel: fields.text({ label: 'Primary button label' }),
            ctaPrimaryHref: fields.text({ label: 'Primary button link' }),
            ctaSecondaryLabel: fields.text({ label: 'Secondary button label' }),
            ctaSecondaryHref: fields.text({ label: 'Secondary button link' }),
          },
          { label: 'Homepage hero' },
        ),
      },
    }),
  },
  collections: {
    tours: collection({
      label: 'Day Tours',
      slugField: 'title',
      path: 'src/content/tours/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'destination'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        slug: fields.text({ label: 'URL slug (preserve old)', description: 'Old WordPress slug for 301s.', validation: { length: { min: 1 } } }),
        destination: fields.relationship({ label: 'Destination', collection: 'destinations', validation: { isRequired: true } }),
        type: fields.relationship({ label: 'Primary tour type', collection: 'tourTypes', validation: { isRequired: true } }),
        secondaryTypes: fields.array(
          fields.relationship({ label: 'Secondary tour type', collection: 'tourTypes' }),
          { label: 'Secondary tour types', itemLabel: (props) => props.value ?? 'Type' },
        ),
        durationLabel: fields.text({ label: 'Duration label' }),
        priceFrom: fields.number({ label: 'Price from (USD) — optional, via Bokun' }),
        bokunExperienceId: fields.text({ label: 'Bokun experience ID (⏳ later)' }),
        featured: fields.checkbox({ label: 'Featured on homepage' }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true, validation: { length: { min: 1 } } }),
        ...heroFields('tours', true),
        gallery: gallery('tours'),
        ...seoFields,
        content: fields.mdx({ label: 'Body' }),
      },
    }),
    cruises: collection({
      label: 'Galápagos Cruises',
      slugField: 'title',
      path: 'src/content/cruises/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'vesselClass'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        slug: fields.text({ label: 'URL slug (preserve old)', validation: { length: { min: 1 } } }),
        vesselClass: fields.select({
          label: 'Vessel class',
          options: [
            { label: 'Luxury', value: 'Luxury' },
            { label: 'First Class', value: 'First Class' },
            { label: 'Tourist Superior', value: 'Tourist Superior' },
            { label: 'Tourist', value: 'Tourist' },
            { label: 'Diving', value: 'Diving' },
          ],
          defaultValue: 'First Class',
        }),
        vesselType: fields.text({ label: 'Vessel type', description: 'e.g. Motor Catamaran, Expedition Ship.' }),
        cabins: fields.number({ label: 'Cabins' }),
        capacity: fields.number({ label: 'Guests' }),
        featured: fields.checkbox({ label: 'Featured on homepage' }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true, validation: { length: { min: 1 } } }),
        ...heroFields('cruises', true),
        gallery: gallery('cruises'),
        ...seoFields,
        content: fields.mdx({ label: 'Body' }),
      },
    }),
    destinations: collection({
      label: 'Destinations',
      slugField: 'title',
      path: 'src/content/destinations/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        slug: fields.text({ label: 'URL slug (preserve old)', validation: { length: { min: 1 } } }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true, validation: { length: { min: 1 } } }),
        featured: fields.checkbox({ label: 'Featured on homepage' }),
        ...heroFields('destinations'),
        ...seoFields,
        content: fields.mdx({ label: 'Body' }),
      },
    }),
    tourTypes: collection({
      label: 'Tour Types',
      slugField: 'title',
      path: 'src/content/tourTypes/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        slug: fields.text({ label: 'URL slug (preserve old)', validation: { length: { min: 1 } } }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true, validation: { length: { min: 1 } } }),
        ...heroFields('tourTypes'),
        ...seoFields,
        content: fields.mdx({ label: 'Body' }),
      },
    }),
    pages: collection({
      label: 'Pages',
      slugField: 'title',
      path: 'src/content/pages/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        slug: fields.text({ label: 'URL slug (preserve old)', validation: { length: { min: 1 } } }),
        ...heroFields('pages'),
        ...seoFields,
        content: fields.mdx({ label: 'Body' }),
      },
    }),
    reviews: collection({
      label: 'Reviews',
      slugField: 'author',
      path: 'src/content/reviews/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['author', 'location'],
      schema: {
        author: fields.slug({ name: { label: 'Author' } }),
        location: fields.text({ label: 'Location' }),
        date: fields.text({ label: 'Date' }),
        rating: fields.number({ label: 'Rating (1–5)', defaultValue: 5, validation: { isRequired: true, min: 1, max: 5 } }),
        tour: fields.text({ label: 'Tour (optional)' }),
        featured: fields.checkbox({ label: 'Featured' }),
        oldSlug: fields.text({ label: 'Old review slug (for 301)' }),
        content: fields.mdx({ label: 'Testimonial' }),
      },
    }),
    faqs: collection({
      label: 'FAQs',
      slugField: 'question',
      path: 'src/content/faqs/*',
      format: { contentField: 'content' },
      columns: ['question', 'category'],
      schema: {
        question: fields.slug({ name: { label: 'Question' } }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Galápagos cruises', value: 'cruises' },
            { label: 'Ecuador tours', value: 'tours' },
            { label: 'Booking & payment', value: 'booking' },
            { label: 'Travel & practical', value: 'practical' },
          ],
          defaultValue: 'cruises',
        }),
        order: fields.number({ label: 'Order', defaultValue: 0 }),
        content: fields.mdx({ label: 'Answer' }),
      },
    }),
  },
});
