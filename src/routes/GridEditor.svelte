<script lang="ts">
    const map = $state(Array(50).fill(0).concat(Array(50).fill(1)))
    const lockedCell = 50
    let drawing = $state(false)
    let drawValue = $state(0)
    const maxDrawValue = 1
    const rightClickValue = maxDrawValue + 1

    const getIdFromEvent = (e) => {
        const {cmaBoxId} = e.target.dataset
        if (cmaBoxId !== String(lockedCell)) {
            return cmaBoxId
        }
        return false
    }

    const handleGridMouseDown = (e) => {
        e.preventDefault()
        const id = getIdFromEvent(e)
        if (id) {
            const newDrawValue = map[id] + 1
            drawValue = newDrawValue > maxDrawValue ? 0 : newDrawValue
            map[id] = drawValue
            drawing = true
        }
    }

    const handleMouseEnter = (e) => {
        const id = getIdFromEvent(e)
        if (drawing && id)
        {
            map[id] = drawValue
        }    }

    const handleMouseUp = () => {
        drawing = false
    }

    const handleRightClick = (e) => {
        e.preventDefault()
        const id = getIdFromEvent(e)
        if (id) {
            map[id] = rightClickValue
        }
    }
</script>

<div class="grid" onmousedown={handleGridMouseDown} onmouseover={handleMouseEnter} onmouseup={handleMouseUp} oncontextmenu={handleRightClick}>
    {#each map as cell, i}
        <div data-cma-box-id={i} data-cma-box-value={cell} class={['box', `color${cell}`, i === lockedCell && 'locked']}>{cell} {i}</div>
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
    .color1 {
        background-color: #583c36;
    }
    .color2 {
        background-color: hotpink;
    }
    .locked {
        outline: 2px solid red
    }
</style>
