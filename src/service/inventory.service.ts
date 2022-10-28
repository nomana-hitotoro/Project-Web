import type { IInventory, IInventoryItem } from "../interface/inventory.interface";
import inventoryStore from "../store/inventory";

/**
 * Inventory Service - enums : ores, sort, order
**/
import oresEnum from '../utils/enums/oresEnum';
import sortEnum from "../utils/enums/sortEnum";
import orderEnum from "../utils/enums/orderEnum";
export default class InventoryService {
    private initialInventory: IInventory;

    constructor() {
        inventoryStore.subscribe(
            inventory => this.initialInventory = inventory
        );
    }

    public addItem(item: IInventoryItem): void {
        const items: IInventoryItem[] = [ ...this.initialInventory.items ];
        const sameItem = items.filter(i => ( i.name === item.name && i.amount < i.maxStack ))[0];

        if (!!sameItem) {
            const prevStackAmount: number = sameItem.amount;
            sameItem.amount = sameItem.amount + item.amount <= sameItem.maxStack
                ? sameItem.amount + item.amount
                : sameItem.maxStack;
            item.amount = prevStackAmount + item.amount <= sameItem.maxStack
                ? 0
                : item.amount - (sameItem.maxStack - prevStackAmount);
        }
        if (this.initialInventory.items.length < this.initialInventory.maxSlots && item.amount > 0) {
            items.push(item);
        } else {
            console.log(`Not enough space. Droppe ${item.amount} ${item.name} on the ground`);
        }
        inventoryStore.update(currentInventory => ({
            ...currentInventory,
            items: [ ...items ],
        }));
    }

    public addSlots(addSlots: number): void {
        if (this.initialInventory.maxSlots + addSlots > 0) {
            inventoryStore.update(currentInventory => ({
                ...currentInventory,
                maxSlots: this.initialInventory.maxSlots + addSlots,
            }));
        }
    }

    public sortById(items: IInventoryItem[]): IInventoryItem[] {
        const oresNames = Object.values(oresEnum);

        return items.sort(
            (prevItem: IInventoryItem, item: IInventoryItem) => {
                const [prevIdx, idx] = [oresNames.indexOf(prevItem.name), oresNames.indexOf(item.name)];
                return prevIdx <= idx ? 1 : -1;
            });
    }

    public sortByName(items: IInventoryItem[]): IInventoryItem[] {
        return items.sort(
            (prevItem: IInventoryItem, item: IInventoryItem) => prevItem.name.localeCompare(item.name));
    }

    public sortInventory(sort: string, order: string): void {
        console.log(`SORT: ${sort} ORDER: ${order}`);
        let sortedItems: IInventoryItem[] = [ ...this.initialInventory.items ];

        switch (sort) {
            case 'NAME':
                sortedItems = this.sortByName(sortedItems); break;
            case 'ID': 
                sortedItems = this.sortById(sortedItems); break;
            default: break;
        }

        inventoryStore.update(currentInventory => ({
            ...currentInventory,
            items: order === 'DESC' ? sortedItems.reverse() : sortedItems
        }));
    }
};