<script>
    const size = 10;
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
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
            <div class="table-body-cell" class:header={cell == 0}>
                {c == 0 ? r : alphabet[c - 1] + ' ' +  r} 
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
</style>

