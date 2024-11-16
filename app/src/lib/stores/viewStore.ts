// src/lib/stores/viewStore.ts
import { writable } from 'svelte/store';

// Create a writable store to manage the grid view state
export const viewStore = writable({
  isGridView: true, // Default state
});

// Optional: Provide methods for toggling the view directly
export const toggleView = () => {
  viewStore.update((state) => ({ ...state, isGridView: !state.isGridView }));
};