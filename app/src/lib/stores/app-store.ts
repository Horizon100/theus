import { writable } from 'svelte/store';
import type { Theme } from '../types';

export const theme = writable<Theme>('light');
export const isAuthenticated = writable<boolean>(false);