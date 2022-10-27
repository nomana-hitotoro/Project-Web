import type { IInventory, IInventoryItem } from "../interface/inventory.interface";
import inventoryStore from "../store/inventory";
import { createEventDispatcher } from "svelte";

export default class InventoryService {
    private dispatch = createEventDispatcher();
    private initialInventory: IInventory;

    constructor() {
        inventoryStore.subscribe(
            inventory => this.initialInventory = inventory
        );
    }

    public getInitialInventoryValue(): IInventory {
        return {
            ownerId: 0,
            items: [],
            maxSlots: 99
        };
    }

    public addItem(item: IInventoryItem): void {
        if (this.initialInventory.items.length < this.initialInventory.maxSlots) {
            inventoryStore.update(currentInventory => ({
                ...currentInventory,
                items: [...currentInventory.items, item],
            }));
            this.dispatch('Added item');
        }
    }

    public addSlots(addSlots: number): void {
        inventoryStore.update(currentInventory => ({
            ...currentInventory,
            maxSlots: this.initialInventory.maxSlots + addSlots,
        }));
    }
};