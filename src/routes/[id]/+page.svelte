<script lang="ts">
    import Table from './../Table.svelte';
    import { type Ship, type Matrix } from '$lib/interfaces/global';

    let ships: Map<number, Ship> = new Map();

    ships.set(0, {
            id: 0,
            name: "S 3",
            size: 3,
            pos: [],
            horizontal: true, 
            distroyed: false,
            taken: false
        }).set(1, {
            id: 1,
            name: "S 4",
            size: 4,
            pos: [],
            horizontal: true,
            distroyed: false,
            taken: false
        });
    let matrix: Matrix = {};

    function dragStart(event: DragEvent, shipId: number) {
		const data = {shipId};
   	    event.dataTransfer.setData('text/plain', JSON.stringify(data));
	}
</script>

<main>
    <div class="flex-row-item" id="div1">
        {#each ships.values() as item, boatIndex (item)}
            {#if !item.taken}
            <div draggable="true"
                on:dragstart={event => dragStart(event, boatIndex)}
                class="boat boat{item.size}">{item.name}</div>
            {/if}
        {/each}
    </div>
    <div class="flex-row-item"><Table bind:ships bind:matrix></Table></div>
    <div class="flex-row-item">3</div>
</main>

<style>
    main {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }
    main > .flex-row-item {
        flex: 1 1 30%; /*grow | shrink | basis */
        height: 100px;
    }
    .boat {
        height: 30px;
        background-color: red;
        margin-bottom: 5px;
    }
    .boat3 {
        width: 90px;
        height: 30px;
        background-color: red;
    }
    .boat4 {
        width: 120px;
        height: 30px;
        background-color: red;
    }
</style>