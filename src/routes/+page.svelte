<script lang="ts">
    import GridEditor from "./GridEditor.svelte";
    import { collection, appendMap, deleteMap, getMap } from "../stores/collection";
    import { createCollection } from "$lib/collection";

    let newSize = $state(10)
    let newAuthor = $state('anonymous')
    let area = $derived($collection.size[0] * $collection.size[1])
    let halfArea = $derived(area / 2)
    let map = $state(Array(50).fill(0).concat(Array(50).fill(1)))
    let mapString = $derived(map.join(''))

    $effect(() => {
        map = Array(halfArea).fill(0).concat(Array(halfArea).fill(1))
    })

    $effect(() => {
        document.documentElement.style.setProperty('--grid-columns', $collection.size[0].toString());
        document.documentElement.style.setProperty('--grid-rows', $collection.size[1].toString());
    });

    const handleMapDelete = (id: string) => {
        deleteMap(id)
    }

    const handleMapEdit = (id: string) => {
        const foundMap = getMap(id)
        if (foundMap) {
            map = foundMap.grid.split('').map(Number)
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(mapString)
    }

    const handleSaveMap = () => {
        appendMap(mapString)
    }

    const handleDownload = () => {
        const blob = new Blob([JSON.stringify($collection)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `collection-${$collection.author}.json`;
        a.click();
    }

    const handleFileUpload = async (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) return;
        
        try {
            const reader = new FileReader();
            reader.onload = async (e) => {
                // @ts-ignore
                const content = JSON.parse(e.target.result);
                collection.set(content);
            };
            reader.readAsText(file);
        } catch (error) {
            console.error('Error reading file:', error);
        }
    };

    const handleNewCollection = (e: SubmitEvent) => {
        e.preventDefault()
        const newCollection = createCollection(newAuthor, newSize)
        collection.set(newCollection)
    }
</script>

<div class="main-container">
    <div>
        <GridEditor bind:map lockedCell={halfArea}/>
        <button onclick={handleCopy}>Copy map string</button>
        <button onclick={handleSaveMap}>Add map to collection</button>
        <br/>
        <br/>
        <label for="fileInput">Upload collection (will overwrite current collection)</label>
        <input 
            type="file" 
            accept=".json"
            onchange={handleFileUpload} 
        />
        <br/>
        <br/>
        <p>New Collection:</p>
        <form onsubmit={handleNewCollection}>
            <label for="author">Author</label>
            <input type="text" bind:value={newAuthor}/>
            <label for="size">Size</label>
            <input type="number" bind:value={newSize}/>
            <br/>
            <button type="submit">Create</button>
        </form>
    </div>
    <div>

    <p>Collection by {$collection.author}, size: {$collection.size.toString()}</p>
    <button onclick={handleDownload}>Download</button>
    <br/>
    <br/>
    <div class="maps-container">
    {#each $collection.data as item}
        <div class="map-preview-container">
            <div class="map-preview">
                {#each item.grid as cell}
                    <div class={['box', `color${cell}`]}></div>
                {/each}
            </div>
            <div>
                <p>ID: {item.id}</p>
                <button onclick={() => handleMapDelete(item.id)}>Delete</button>
                <button onclick={() => handleMapEdit(item.id)}>Copy to editor</button>
                </div>
            </div>
        {/each}
        </div>
    </div>
    
</div>
<style>
    .main-container {
        display: flex;
        flex-direction: row;
        gap: 20px;
        justify-content: center;
    }

    .maps-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        overflow-y: auto;
        max-height: 85vh;
    }

.map-preview-container {
    display: flex;
    flex-direction: row;
    gap: 4px;
}

.map-preview {
    display: grid;
    grid-template-columns: repeat(var(--grid-columns), min-content);
    grid-template-rows: repeat(var(--grid-rows),10px);
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

