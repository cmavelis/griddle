import defaultCollection from "./default-collection.json"

export const createCollection = (author: string, size: number) => {
    return {
        ...defaultCollection,
        id: crypto.randomUUID(),
        author,
        size: [size, size],
        lastUpdated: new Date().toISOString()
    }
}