import { writable } from "svelte/store";

const inventoryStore = writable({
    ownerId: 0,
    items: [],
    maxSlots: 9
});

export default inventoryStore;