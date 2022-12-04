<script lang="ts">
	import { onMount } from 'svelte';

    import Inventory from './features/Inventory/Inventory.svelte';
	import InventoryService from './features/Inventory/inventory.service';
	import inventory from './features/Inventory/inventory';
    import orderEnum from './utils/enums/orderEnum';
    import { getGeneratedItem } from './utils/generationHelper';

	const inventoryService = new InventoryService();

	onMount(() => {
		const inventoryHTMLElement = document.getElementById('inventory');
		inventoryService.setInventoryHTMLElement(inventoryHTMLElement);
		console.log('Saved Inventory Element');
	})

	const addItem = () => {
		inventoryService.addItem(getGeneratedItem());
	}

	const addSlots = (event: any) => {
		inventoryService.addSlots(Number(event.target.value));
	}

	const changeOrder = (event: any) => {
		const { value } = event.target;

		inventoryService.setOrder(orderEnum[value]);
	}
</script>

<main>
	<h1>Hello!</h1>
	<p>Inventory owner has ID N°{$inventory.ownerId}</p>
	<p>It has actually {$inventory.items.length} / {$inventory.maxSlots} taken slots</p>
	<p>Inventory order is {$inventory.order}</p>
	<div style='display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center; margin: 5em 25em;'>
		{#each $inventory.items as { name, price, quantity, imgUrl, maxStack }}
			<div style='margin: 0 .2em;'>
				<img width={32} height={32} src={imgUrl} alt={name} />
				<p style='margin: 0;'>{name}: {quantity}/{maxStack}</p>
				<p style='margin: 0;'>price: {price}</p>
			</div>
		{/each}
	</div>

	<div>
		<button on:click={addItem}>Add item</button>
	</div>
	<div>
		<button value={-9} on:click={addSlots}>- 9 slots</button>
		<button value={-3} on:click={addSlots}>- 3 slot</button>
		<button value={3} on:click={addSlots}>+ 3 slot</button>
		<button value={9} on:click={addSlots}>+ 9 slots</button>
	</div>
	<div>
		<button value={'ASC'} on:click={changeOrder}>{orderEnum.ASC}</button>
		<button value={'DESC'} on:click={changeOrder}>{orderEnum.DESC}</button>
	</div>
	<Inventory inventoryService={inventoryService} />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>