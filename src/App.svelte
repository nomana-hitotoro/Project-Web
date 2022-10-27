<script lang="ts">
    import InventoryService from './service/inventory.service';
	import inventory from './store/inventory';
    import { getGeneratedItem } from './utils/generationHelper';

	const inventoryService = new InventoryService();

	const addItem = () => {
		inventoryService.addItem(getGeneratedItem());
	}

	const addSlots = (event: any) => {
		inventoryService.addSlots(Number(event.target.value));
	}
</script>

<main>
	<h1>Hello!</h1>
	<p>Inventory owner has ID N°{$inventory.ownerId}</p>
	<p>It has actually {$inventory.items.length} / {$inventory.maxSlots} taken slots</p>
	<div style='display: flex; flex-direction: row; flex-wrap: wrap; margin: 0 5em;'>
		{#each $inventory.items as { name, price, amount, imgUrl, maxStack }}
			<div style='margin: 0 .2em;'>
				<img width={32} height={32} src={imgUrl} alt={name} />
				<p style='margin: 0;'>{name}: {amount}/{maxStack}</p>
				<p style='margin: 0;'>price: {price}</p>
			</div>
		{/each}
	</div>

	<input bind:value={$inventory.ownerId} />
	<button on:click={addItem}>Add item</button>
	<button value={-10} on:click={addSlots}>- 10 slots</button>
	<button value={-1} on:click={addSlots}>- 1 slot</button>
	<button value={1} on:click={addSlots}>+ 1 slot</button>
	<button value={10} on:click={addSlots}>+ 10 slots</button>
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