<script lang="ts">
    import InventoryService from './service/inventory.service';
	import inventory from './store/inventory';

	const inventoryService = new InventoryService();

	function addItem() {
		inventoryService.addItem(
			{
				maxStack: 999,
				name: 'coal',
				price: 2,
				amount: Math.floor(Math.random() * 999),
				imgUrl: './assets/coal.png',
			},
		);
	}

	function addSlots() {
		inventoryService.addSlots(10);
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
	<button on:click={addSlots}>+ 10 slots</button>
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