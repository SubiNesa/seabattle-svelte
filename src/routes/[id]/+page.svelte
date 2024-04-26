<script>
    import Table from './../Table.svelte';
</script>

<main>
    <div class="flex-row-item">1</div>
    <div class="flex-row-item"><Table></Table></div>
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
</style>