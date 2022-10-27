import { writable } from "svelte/store";

const inventoryStore = writable({
    ownerId: 0,
    items: [],
    maxSlots: 99
});

export default inventoryStore;