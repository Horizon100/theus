import { writable, derived } from 'svelte/store';
import type { 
  Testimonial, 
  TestimonialFilter, 
  TestimonialViewState 
} from '$lib/types/testimonials.types';
import { 
  TESTIMONIALS, 
  DEFAULT_TESTIMONIAL_VIEW_STATE 
} from '$lib/constants/testimonials.constants';

function createTestimonialStore() {
  const testimonials = writable<Testimonial[]>(TESTIMONIALS);
  const viewState = writable<TestimonialViewState>(DEFAULT_TESTIMONIAL_VIEW_STATE);

  const filteredTestimonials = derived(
    [testimonials, viewState],
    ([$testimonials, $viewState]) => {
      let result = [...$testimonials];

      // Apply filters
      if ($viewState.filter.category) {
        result = result.filter(t => t.category === $viewState.filter.category);
      }

      if ($viewState.filter.featured !== undefined) {
        result = result.filter(t => t.featured === $viewState.filter.featured);
      }

      if ($viewState.filter.search) {
        const search = $viewState.filter.search.toLowerCase();
        result = result.filter(t => 
          t.quote.toLowerCase().includes(search) ||
          t.source.toLowerCase().includes(search)
        );
      }

      // Apply sorting with type safety
      const { field, direction } = $viewState.sorting;
      result.sort((a, b) => {
        const aValue = a[field];
        const bValue = b[field];
        
        // Handle undefined values
        if (aValue === undefined && bValue === undefined) return 0;
        if (aValue === undefined) return 1;
        if (bValue === undefined) return -1;

        // Compare values with type safety
        const modifier = direction === 'asc' ? 1 : -1;
        return aValue < bValue ? -1 * modifier : aValue > bValue ? 1 * modifier : 0;
      });

      return result;
    }
  );

  // Get featured testimonials
  const featuredTestimonials = derived(
    testimonials,
    $testimonials => $testimonials.filter(t => t.featured)
  );

  return {
    subscribe: testimonials.subscribe,
    filteredTestimonials,
    featuredTestimonials,
    viewState: {
      subscribe: viewState.subscribe,
      set: viewState.set,
      update: viewState.update
    },
    setViewState: (newState: Partial<TestimonialViewState>) => {
      viewState.update(state => ({
        ...state,
        ...newState
      }));
    },
    reset: () => testimonials.set(TESTIMONIALS)
  };
}

export const testimonialStore = createTestimonialStore();