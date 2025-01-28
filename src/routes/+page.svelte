<script lang="ts">
    import GridEditor from "./GridEditor.svelte";
    import type { Collection } from "../stores/collection";
    import { collection, appendMap } from "../stores/collection";

    let map = $state(Array(50).fill(0).concat(Array(50).fill(1)))
    let mapString = $derived(map.join(''))
    let author = $state($collection.author)

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

        const blob = new Blob([JSON.stringify($collection)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'collection.json';
        a.click();
    }
</script>

<div>
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
    <div class="maps-container">
    {#each $collection.data as item}
        <div class="grid">
            {#each item.grid as cell}
                <div class={['box', `color${cell}`]}></div>
            {/each}
        </div>
    {/each}
    </div>
    
</div>
<style>
.maps-container {
    display: flex;
    gap: 10px;
}

.grid {
    display: grid;
    grid-template-columns: repeat(var(--grid-columns), min-content);
}

.box {
    width: 10px;
    height: 10px;
    background-color: var(--color-empty);
}

.box.color1 {
    background-color: var(--color-terrain);
}

.box.color2 {
    background-color: var(--color-obstacle);
}

</style>

