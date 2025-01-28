import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import defaultCollection from '$lib/default-collection.json';
import defaultGrid from '$lib/default-grid.json';

type Grid = typeof defaultGrid;

export type Collection = Omit<typeof defaultCollection, 'data'> & {
	data: Grid[];
};

const updatedCollection = {
	...defaultCollection,
	lastUpdated: new Date().toISOString(),
	id: crypto.randomUUID()
}

export const collection = writable<Collection>(
	browser 
		? JSON.parse(localStorage.getItem('collection') ?? JSON.stringify(updatedCollection))
		: updatedCollection
);

if (browser) {
	collection.subscribe((value) => localStorage.collection = JSON.stringify(value));
}
