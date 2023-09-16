import { writable } from 'svelte/store';
import type { User } from '../model/User';

export const user = writable<User | null>(null);