import { writable, get } from 'svelte/store';
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

export const appendMap = (grid: string) => {
	collection.update(c => ({
		...c,
		lastUpdated: new Date().toISOString(),
		data: [...c.data, {
			id: crypto.randomUUID(),
			grid
		}]
	}));
};

export const deleteMap = (id: string) => {
	collection.update(c => ({
		...c,
		data: c.data.filter(map => map.id !== id)
	}));
};

export const getMap = (id: string) => {
	return get(collection).data.find(map => map.id === id);
};
