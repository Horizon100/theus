import type { Testimonial } from '$lib/types/testimonials.types';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote: "Nomads.com ranks destinations that are accommodating to digital nomads, based on factors like cost of living, internet speed and weather",
    source: "The New York Times",
    logo: "/logos/nyt.png",
    category: 'press',
    featured: true,
    date: new Date('2023-01-15'),
    url: 'https://nytimes.com/article-url'
  },
  {
    id: 'testimonial-2',
    quote: "The rankings of Nomads.com's cities are constantly in flux (all the data is refreshed in real-time based on user input)",
    source: "BBC",
    logo: "/logos/bbc.png",
    category: 'press',
    featured: true,
    date: new Date('2023-02-20'),
    url: 'https://bbc.com/article-url'
  },
  {
    id: 'testimonial-3',
    quote: "Nomads.com is a Kayak-like aggregator for potential work destinations, ranking internet, price, and safety",
    source: "TechCrunch",
    logo: "/logos/techcrunch.png",
    category: 'press',
    featured: true,
    date: new Date('2023-03-10'),
    url: 'https://techcrunch.com/article-url'
  }
];

export const TESTIMONIAL_CATEGORY_LABELS: Record<NonNullable<Testimonial['category']>, string> = {
  press: 'Press Coverage',
  review: 'User Review',
  user: 'User Testimonial',
  partner: 'Partner Review'
};

export const DEFAULT_TESTIMONIAL_SORTING: TestimonialSorting = {
  field: 'date',
  direction: 'desc'
};

export const DEFAULT_TESTIMONIAL_VIEW_STATE: TestimonialViewState = {
  filter: {
    category: undefined,
    featured: undefined,
    search: undefined
  },
  sorting: DEFAULT_TESTIMONIAL_SORTING
};