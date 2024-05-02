<script lang="ts">
    import { type Ship, type Matrix} from '$lib/interfaces/global';

    const size = 10;
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    export let ships: Map<number, Ship>;
    export let matrix: Matrix;

    let hoveringOverBasket;

    function setShipPos(ship: Ship, row: number, coll: number) {
        ship.pos = [];
        [...Array(ship.size).keys()].forEach(element => {
            if (!matrix[ship.horizontal ? row : element + row]) {
                matrix[ship.horizontal ? row : element + row] = {}
            }
            if ( !matrix[ship.horizontal ? row : element + row][ship.horizontal ? element + coll : coll]) {
                matrix[ship.horizontal ? row : element + row][ship.horizontal ? element + coll : coll] = {}
            }

            ship.pos.push([ship.horizontal ? row : element + row, ship.horizontal ? element + coll : coll])

            matrix[ship.horizontal ? row : element + row][ship.horizontal ? element + coll : coll] = ship;
        });
    }

    /**
     * Check if any other ship exist
     */
    function checkShipsPos({id, horizontal, size }, row: number, coll: number) {
        let exist = false;
        const fields: number[][] = [];

        // get futur occupied fields in matrix
        let i = 0;
        while (i < size) {
            fields.push([horizontal ? row : i + row, horizontal ? i + coll : coll]);
            i++;
        }


        for (const value of ships.values()) {
            if (value.id !== id) {
                exist = value.pos.some(pos => {
                    return fields.some(field => field[0] == pos[0] && field[1] == pos[1]);
                });
                if (exist) {
                    break;
                }
            } 
        }

        return exist;
    }

    function dragStart(event: DragEvent, row: number, coll: number) {
		// The data we want to make available when the element is dropped
        // is the index of the item being dragged and
        // the index of the basket from which it is leaving.
		const data = {shipId: matrix[row][coll].id};
   	    event.dataTransfer.setData('text/plain', JSON.stringify(data));
	}

	function drop(event: DragEvent, row: number, coll: number) {
		event.preventDefault();

        const json = event.dataTransfer.getData("text/plain");
		const data = JSON.parse(json);

        let ship: Ship = ships.get(data.shipId);
        
        // check if it can fit the matrix
        const limit = ship.horizontal ?  ship.size + coll : ship.size + row;
        if (limit > size) {
            return; 
        }
        
        // check if no other ships are over
        let exist = checkShipsPos({id: ship.id, horizontal: ship.horizontal, size: ship.size}, row, coll);
        if (exist) {
            return;
        }

        ship.pos.forEach(element => {
            delete matrix[element[0]][element[1]];
        });
        ship.taken = true;
		
        // Add the item to the drop.
        if (!matrix[row]) {
            matrix[row] = {}
            matrix[row][coll] = {}
        }

        setShipPos(ship, row, coll);

        ships.set(data.shipId, ship);

		ships = ships;
		matrix = matrix;

		hoveringOverBasket = null;
	}

    /**
     * Change the position
     */
    function onClickShip(row: number, coll: number) {
        const shipId = matrix[row][coll].id;
        const ship: Ship = ships.get(shipId);

        // check if it can fit the matrix
        const limit = !ship.horizontal ?  ship.size + coll : ship.size + row;
        if (limit > size) {
            return; 
        }

        // check if no other ships are over
        let exist = checkShipsPos({id: ship.id, horizontal: !ship.horizontal, size: ship.size}, row, coll);
        if (exist) {
            return;
        }

        ship.pos.forEach(element => {
            delete matrix[element[0]][element[1]];
        });
        ship.horizontal = !ship.horizontal;

        setShipPos(ship, row, coll);

        ships.set(shipId, ship);

        ships = ships;
        matrix = matrix;
    }

    function onDbClickShip(row: number, coll: number) {
        const shipId = matrix[row][coll].id;
        const ship: Ship = ships.get(shipId);

        ship.pos.forEach(element => {
            delete matrix[element[0]][element[1]];
        });
        ship.pos = [];
        ship.horizontal = true;
        ship.taken = false;

        ships.set(shipId, ship);

        ships = ships;
        matrix = matrix;
    }

</script>

<div class="resp-table">
    <div class="resp-table-body">
        <div class="resp-table-row"> 
            <div class="table-body-cell header">
        
            </div>
            {#each alphabet.slice(0, size - 1) as al, a}
            <div class="table-body-cell header">
                {al} 
            </div>
            {/each}
        </div>
        {#each [...Array(size).keys()] as row, r}
        <div class="resp-table-row"> 
            {#each [...Array(size).keys()] as cell, c}
            <div class="table-body-cell" 
                class:header={cell == 0} 
                on:dragstart={event => dragStart(event, row, cell)}
                on:dragenter={() => hoveringOverBasket = cell}
                on:dragleave={() => hoveringOverBasket = null}
                on:drop={event => drop(event, r, c)}
                ondragover="return false"
                >
                {#if matrix[r] && matrix[r][c]}
                    <div 
                        on:click={() => onClickShip(r, c)} 
                        on:dblclick={() => onDbClickShip(r, c)} 
                        draggable="true" class:fill={matrix[r] && matrix[r][c]}>{c == 0 ? r : alphabet[c - 1] + ' ' +  r} </div>
                {:else}
                    {c == 0 ? r : alphabet[c - 1] + ' ' +  r} 
                {/if}
                
            </div>
            {/each}
        </div>
        {/each}
    </div>
</div>

<style>
    .resp-table {
        width: 100%;
        display: table;
    }
    .resp-table-body{
        display: table-row-group;
    }
    .resp-table-row{
        display: table-row;   
    }
    .table-body-cell{
        display: table-cell;
        border: 1px solid #dddddd;
        padding: 8px;
        line-height: 2;
        width: 15px;
    }
    .table-body-cell.header{
        background-color: gainsboro;        
    }
    .table-body-cell div.fill{
        background-color: red;        
    }
</style>

