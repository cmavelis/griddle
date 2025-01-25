<script>
    const map = $state(Array(50).fill(0).concat(Array(50).fill(1)))
</script>

<div class="grid">
    {#each map as cell, i}
        <div class={{box:true, color: cell}}>{cell} {i}</div>
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
    .color {
        background-color: #583c36;
    }
</style>
