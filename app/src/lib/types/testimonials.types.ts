export interface Testimonial {
    id: string;
    quote: string;
    source: string;
    logo: string;
    date?: Date;
    url?: string;
    featured?: boolean;
    category?: 'press' | 'review' | 'user' | 'partner';
  }
  
  export type TestimonialCategory = Testimonial['category'];
  
  export interface TestimonialFilter {
    category?: TestimonialCategory;
    featured?: boolean;
    search?: string;
  }
  
  export interface TestimonialSorting {
    field: keyof Testimonial;
    direction: 'asc' | 'desc';
  }
  
  export interface TestimonialViewState {
    filter: TestimonialFilter;
    sorting: TestimonialSorting;
  }