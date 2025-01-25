<script>
    import GridEditor from "./GridEditor.svelte";
    let map = $state(Array(50).fill(0).concat(Array(50).fill(1)))
    let mapString = $derived(map.join(''))

    const handleCopy = () => {
        navigator.clipboard.writeText(mapString)
    }
</script>

<div>
    <GridEditor bind:map/>
    <button onclick={handleCopy}>Copy</button>
    <p>{mapString}</p>
</div>
