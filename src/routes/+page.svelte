<script lang="ts">
    import GridEditor from "./GridEditor.svelte";
    import type { Collection } from "../stores/collection";
    const uuid = () => crypto.randomUUID();
    let map = $state(Array(50).fill(0).concat(Array(50).fill(1)))
    let mapString = $derived(map.join(''))
    let author = $state('anonymous')

    const handleCopy = () => {
        navigator.clipboard.writeText(mapString)
    }

    const handleDownload = (e: SubmitEvent) => {
        e.preventDefault()

        const payload: Collection = {
            size: [10,10],
            game: 'project-proteus',
            author,
            createdAt: new Date().toISOString(),
            data: [{
                id: uuid(),
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
    <GridEditor bind:map/>
    <div>{mapString}</div>
    <button onclick={handleCopy}>Copy map</button>
    
    <br/>
    <br/>
    <br/>

    <form onsubmit={handleDownload}>
        <label for="author">Author</label>
        <input type="text" bind:value={author}/>
        <button type="submit">Download</button>
    </form>
    
</div>
