<div class="grid">
    {#each Array.from(Array(10).keys()) as row (row)}
        {#each Array.from(Array(10).keys()) as column (column)}
            <div class="box">{column}, {row}</div>
        {/each}
    {/each}
</div>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(10, min-content);
        gap: 2px
    }
    .box {
        width: 50px;
        height: 50px;
        background-color: slategray;
    }
</style>
