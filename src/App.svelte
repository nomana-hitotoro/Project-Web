<script lang="ts">
    import InventoryService from './service/inventory.service';
	import inventory from './store/inventory';
    import orderEnum from './utils/enums/orderEnum';
    import sortEnum from './utils/enums/sortEnum';
    import { getGeneratedItem } from './utils/generationHelper';

	const inventoryService = new InventoryService();

	const orderKeys = Object.keys(orderEnum);

	const addItem = () => {
		inventoryService.addItem(getGeneratedItem());
	}

	const addSlots = (event: any) => {
		inventoryService.addSlots(Number(event.target.value));
	}

	const onSortClick = (event: any) => {
		const { id } = event.target;

		const button = document.getElementById(id);
		const [sort, order] = id.split('_');

		const newOrderValue = orderKeys[orderKeys.indexOf(order) + 1] ?? orderKeys[0];

		inventoryService.sortInventory(sort, order);

		button.setAttribute("id", `${sort}_${newOrderValue}`);
		if (newOrderValue === 'ASC') button.innerHTML = `${sortEnum[sort]} ↓`;
		else if (newOrderValue === 'DESC') button.innerHTML = `${sortEnum[sort]} ↑`;
		else button.innerHTML = `${sortEnum[sort]}`;
	}
</script>

<main>
	<h1>Hello!</h1>
	<p>Inventory owner has ID N°{$inventory.ownerId}</p>
	<p>It has actually {$inventory.items.length} / {$inventory.maxSlots} taken slots</p>
	<div style='display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center; margin: 5em 25em;'>
		{#each $inventory.items as { name, price, amount, imgUrl, maxStack }}
			<div style='margin: 0 .2em;'>
				<img width={32} height={32} src={imgUrl} alt={name} />
				<p style='margin: 0;'>{name}: {amount}/{maxStack}</p>
				<p style='margin: 0;'>price: {price}</p>
			</div>
		{/each}
	</div>

	<div>
		<button on:click={addItem}>Add item</button>
	</div>
	<div>
		<button value={-10} on:click={addSlots}>- 10 slots</button>
		<button value={-1} on:click={addSlots}>- 1 slot</button>
		<button value={1} on:click={addSlots}>+ 1 slot</button>
		<button value={10} on:click={addSlots}>+ 10 slots</button>
	</div>
	<div>
		{#each Object.keys(sortEnum).splice(1, Object.keys(sortEnum).length-1) as sort}
			<button id={`${sort}_${orderKeys[0]}`} on:click={onSortClick}>{sortEnum[sort]}</button>
		{/each}
	</div>
	
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