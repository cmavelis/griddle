<script lang="ts">
    import GridEditor from "./GridEditor.svelte";
    import type { Collection } from "../stores/collection";
    import { collection, appendMap } from "../stores/collection";

    let map = $state(Array(50).fill(0).concat(Array(50).fill(1)))
    let mapString = $derived(map.join(''))
    let author = $state($collection.author)
    let collectionString = $derived(JSON.stringify($collection, null, 2))

    // Sync author with store
    $effect(() => {
        collection.update(c => ({ ...c, author }))
    })

    const handleCopy = () => {
        navigator.clipboard.writeText(mapString)
    }

    const handleSaveMap = () => {
        appendMap(mapString)
    }

    const handleDownload = (e: SubmitEvent) => {
        e.preventDefault()

        const payload: Collection = {
            id: crypto.randomUUID(),
            size: [10,10],
            game: 'project-proteus',
            author,
            lastUpdated: new Date().toISOString(),
            data: [{
                id: crypto.randomUUID(),
                grid: mapString
            }]
        }

        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'collection.json';
        a.click();
    }
</script>

<div>
    <div>
        {collectionString}
    </div>
    <GridEditor bind:map/>
    <div>{mapString}</div>
    <button onclick={handleCopy}>Copy map</button>
    <button onclick={handleSaveMap}>Save map to collection</button>
    <br/>
    <br/>
    <br/>

    <form onsubmit={handleDownload}>
        <label for="author">Author</label>
        <input type="text" bind:value={author}/>
        <button type="submit">Download</button>
    </form>
    <p>Collection:</p>
    <div>{#each $collection.data as item}
        {item.grid}
    {/each}</div>
    
</div>
