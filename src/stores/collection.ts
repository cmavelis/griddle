import { writable } from 'svelte/store';
import defaultCollection from '$lib/default-collection.json';
import defaultGrid from '$lib/default-grid.json';

type Grid = typeof defaultGrid;

type Collection = typeof defaultCollection & {
	size: string[];
	grid: Grid[];
};

export const enabled = writable<Collection>(JSON.parse(localStorage.getItem('collection')));

enabled.subscribe((value) => (localStorage.collection = JSON.stringify(value)));
