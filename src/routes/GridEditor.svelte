<script lang="ts">
    let { map = $bindable(), lockedCell = 50 } = $props<{map: number[], lockedCell: number}>();
    let drawing = $state(false)
    let drawValue = $state(0)
    const maxDrawValue = 1
    const rightClickValue = maxDrawValue + 1

    const getIdFromEvent = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        if (!target?.dataset) return false
        
        const {cmaBoxId} = target.dataset
        if (cmaBoxId !== String(lockedCell)) {
            return cmaBoxId
        }
        return false
    }

    const handleGridMouseDown = (e: MouseEvent) => {
        e.preventDefault()
        const id = getIdFromEvent(e)
        if (id) {
            const newDrawValue = map[id] + 1
            drawValue = newDrawValue > maxDrawValue ? 0 : newDrawValue
            map[id] = drawValue
            drawing = true
        }
    }

    const handleMouseEnter = (e: MouseEvent) => {
        const id = getIdFromEvent(e)
        if (drawing && id)
        {
            map[id] = drawValue
        }    }

    const handleMouseUp = () => {
        drawing = false
    }

    const handleRightClick = (e: MouseEvent) => {
        e.preventDefault()
        const id = getIdFromEvent(e)
        if (id) {
            drawValue = rightClickValue
            map[id] = rightClickValue
            drawing = true
        }
    }

    const handleFocus = (e: FocusEvent) => {
        if (e.target instanceof HTMLElement) {
            handleMouseEnter(e as unknown as MouseEvent)
        }
    }
    
    const handleBlur = () => {
        handleMouseUp()
    }
</script>

<button 
    class="grid" 
    onmousedown={handleGridMouseDown} 
    onmouseover={handleMouseEnter} 
    onmouseup={handleMouseUp} 
    oncontextmenu={handleRightClick}
    onfocus={handleFocus}
    onblur={handleBlur}
>
    {#each map as cell, i}
        <div data-cma-box-id={i} data-cma-box-value={cell} class={['box', `color${cell}`, i === lockedCell && 'locked']}></div>
    {/each}
</button>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(var(--grid-columns), min-content);
        gap: 2px;
        border: none;
        padding: 0;
        background: none;
    }
    .box {
        width: 50px;
        height: 50px;
        background-color: var(--color-empty);
    }
    .color1 {
        background-color: var(--color-terrain);
    }
    .color2 {
        background-color: var(--color-obstacle);
    }
    .locked {
        outline: 2px solid red
    }
</style>
