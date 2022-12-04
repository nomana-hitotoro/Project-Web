<script>
    import { onMount } from 'svelte';

    import inventory from './inventory';
    import sortEnum from "../../utils/enums/sortEnum";
    import orderEnum from "../../utils/enums/orderEnum";

    onMount(() => {
        document.addEventListener('keydown', event => {
            console.log('Pressed', event.key);
            switch (event.key) {
                case 'i':
                    console.log('toggle inventory display', $inventory._HTMLelement.style.display);
                    if ($inventory._HTMLelement.style.display === 'none') {
                        $inventory._HTMLelement.style.display = 'flex';
                    } else {
                        $inventory._HTMLelement.style.display = 'none';
                    }
            }
        })
    })

    const player = "Hito";
    const inventoryAssets = "./assets/inventory";
    export let inventoryService;

    const sortOptions = Object.keys(sortEnum);
    sortOptions.splice(0, 1);
</script>

<main class="inventory" id="inventory">
    <h2 class="title">{player}'s Inventory</h2>
    <div class="buttons">
        {#each sortOptions as key}
            <button key={key} on:click={inventoryService.setSort(sortEnum[key])}>
                <img src={`${inventoryAssets}/sort/${sortEnum[key]}.png`} alt={sortEnum[key]} />
            </button>
        {/each}
        {#if $inventory.order === orderEnum.DESC}
            <button class="sort" key={orderEnum.DESC} on:click={inventoryService.setOrder(orderEnum.ASC)}>
                Desc
            </button>
        {:else}
            <button class="sort" key={orderEnum.ASC} on:click={inventoryService.setOrder(orderEnum.DESC)}>
                Asc
            </button>
        {/if}
    </div>
    <div class="items-wrapper">
        {#each Array($inventory.maxSlots) as _, i}
            <div class="cell">
                {#if $inventory.items[i]}
                    <img class="item-img" src={$inventory.items[i].imgUrl} alt={$inventory.items[i].name} />
                    <img class="coin-icon" src={`${inventoryAssets}/coin.png`} alt="coin" />
                    <span class="stack-price">{$inventory.items[i].price * $inventory.items[i].quantity}$</span>
                    <span class="quantity">{$inventory.items[i].quantity}</span>
                {/if}
            </div>
        {/each}
    </div>
</main>

<style>
    .inventory {
        position: absolute;
        width: auto;
        height: auto;
        top: 5vh;
        right: 5vw;
        flex-direction: column;
        padding: 1rem;
        border-radius: 10px;
        border: 3px solid #5e2a00;
        background-color: #bd926f;
        color: #ffffff;
    }

    #inventory {
        display: none;
    }

    .title {
        margin: 0;
    }

    .buttons {
        height: 22px;
        padding: .5rem 0;
        display: flex;
        flex-direction: row;
    }

    .buttons button {
        margin: 0 1px;
        padding: 1px;
        border: 0;
    }

    .buttons .sort {
        margin-left: auto;
    }

    .buttons button img {
        width: 20px;
        height: 20px;
    }

    .items-wrapper {
        width: 100%;
        max-width: calc(68px*3);
        display: flex;
        flex-wrap: wrap;
        overflow-y: auto;
    }

    .items-wrapper .cell {
        position: relative;
        width: 64px;
        height: 64px;
        margin: 2px;
        border-radius: 5px;
        background-color: #dadada;
        display: flex;
        color: #000000;
    }

    .cell .item-img {
        width: 64px;
        height: 64px;
    }

    .cell .coin-icon {
        width: 10px;
        height: 10px;
        position: absolute;
        bottom: 2px;
        left: 2px;
    }

    .cell .stack-price {
        box-sizing: border-box;
        position: absolute;
        bottom: 2px;
        left: 13px;
        font-size: 10px;
    }

    .cell .quantity {
        box-sizing: border-box;
        position: absolute;
        right: 2px;
        bottom: 2px;
        font-size: 10px;
    }
</style>