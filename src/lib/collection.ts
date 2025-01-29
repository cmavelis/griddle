import defaultCollection from "./default-collection.json"
import defaultGrid from "./default-grid.json"

export type Grid = typeof defaultGrid;

export type Collection = Omit<typeof defaultCollection, 'data'> & {
    data: Grid[];
};

export const createCollection = (author: string, size: number): Collection => {
    return {
        ...defaultCollection,
        id: crypto.randomUUID(),
        author,
        size: [size, size],
        lastUpdated: new Date().toISOString()
    }
}