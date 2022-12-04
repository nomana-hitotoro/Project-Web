import type { IInventory, IInventoryItem } from "./inventory.interface";
import inventoryStore from "./inventory";

/**
 * Inventory Service - enums : ores, sort, order
**/
import sortEnum from "../../utils/enums/sortEnum";
import orderEnum from "../../utils/enums/orderEnum";
import { current_component } from "svelte/internal";
export default class InventoryService {
    private initialInventory: IInventory;

    constructor() {
        inventoryStore.subscribe(
            inventory => this.initialInventory = inventory
        );
    }

    /**
     * @private
     * @description sort inventory based
     * 
     * @memberof InventoryService
     */
    private sortInventory(): void {
        switch (this.initialInventory.sort) {
            case sortEnum.NAME:
                inventoryStore.update(currentInventory => ({
                    ...currentInventory,
                    items: this.sortByName(),
                }));
                break;
            case sortEnum.QUANTITY:
                inventoryStore.update(currentInventory => ({
                    ...currentInventory,
                    items: this.sortByQuantity(),
                }));
                break;
            case sortEnum.PRICE:
                inventoryStore.update(currentInventory => ({
                    ...currentInventory,
                    items: this.sortByPrice(),
                }));
                break;
            default:
                break;
        }
    }

    /**
     * @private
     * @description sort items by name
     * 
     * @returns {IInventoryItem[]}
     */
    private sortByName(): IInventoryItem[] {
        return this.initialInventory.items.sort(
            (prevItem: IInventoryItem, item: IInventoryItem) => 
                this.initialInventory.order === orderEnum.ASC
                    ? prevItem.name.localeCompare(item.name)
                    : -prevItem.name.localeCompare(item.name)
        );
    }

    /**
     * @private
     * @description sort items by name
     * 
     * @returns {IInventoryItem[]}
     */
    private sortByPrice(): IInventoryItem[] {
        return this.initialInventory.items.sort(
            (prevItem: IInventoryItem, item: IInventoryItem) => {
                const prevItemPrice = prevItem.price * prevItem.quantity;
                const itemPrice = item.price * item.quantity;

                return this.initialInventory.order === orderEnum.ASC
                    ? prevItemPrice > itemPrice ? 1 : -1
                    : prevItemPrice > itemPrice ? -1 : 1;
            });
    }

    /**
     * @private
     * @description sort items by quantity
     * 
     * @returns {IInventoryItem[]}
     */
    private sortByQuantity(): IInventoryItem[] {
        return this.initialInventory.items.sort(
            (prevItem: IInventoryItem, item: IInventoryItem) => 
                this.initialInventory.order === orderEnum.ASC
                    ? prevItem.quantity > item.quantity ? 1 : -1
                    : prevItem.quantity > item.quantity ? -1 : 1
        );
    }

    /**
     * @public
     * @description add an item
     * 
     * @param {IInventoryItem} item
     * 
     * @memberof InventoryService 
     */
    public addItem(item: IInventoryItem): void {
        const items: IInventoryItem[] = [ ...this.initialInventory.items ];
        const sameItem = items.filter(i => ( i.name === item.name && i.quantity < i.maxStack ))[0];

        if (!!sameItem) {
            const prevStackquantity: number = sameItem.quantity;
            sameItem.quantity = sameItem.quantity + item.quantity <= sameItem.maxStack
                ? sameItem.quantity + item.quantity
                : sameItem.maxStack;
            item.quantity = prevStackquantity + item.quantity <= sameItem.maxStack
                ? 0
                : item.quantity - (sameItem.maxStack - prevStackquantity);
        }
        if (this.initialInventory.items.length < this.initialInventory.maxSlots && item.quantity > 0) {
            items.push(item);
        } else if (item.quantity > 0) {
            console.log(`Not enough space. Droppe ${item.quantity} ${item.name} on the ground`);
        }
        inventoryStore.update(currentInventory => ({
            ...currentInventory,
            items: [ ...items ],
        }));
    }

    /**
     * @public
     * @description add multiple items in the inventory
     * 
     * @param {IInventoryItem[]} items
     * 
     * @memberof InventoryService
     */
    public addItems(items: IInventoryItem[]): void {
        /** TODO: add multiple items at the same time */
    }

    /**
     * @public
     * @description add {addSlots} slots
     * 
     * @param {number} addSlots
     * 
     * @memberof InventoryService
     */
    public addSlots(addSlots: number): void {
        if (this.initialInventory.maxSlots + addSlots > 0) {
            inventoryStore.update(currentInventory => ({
                ...currentInventory,
                maxSlots: this.initialInventory.maxSlots + addSlots,
            }));
        }
    }

    /**
     * @public
     * @description change inventory items order
     * 
     * @param {string} order
     * 
     * @memberof InventoryService
     */
    public setOrder(order: string): void {
        if (order !== this.initialInventory.order) {
            inventoryStore.update(currentInventory => ({
                ...currentInventory,
                order,
                items: currentInventory.items.reverse(),
            }));
        }
    }

    /**
     * @public
     * @description change inventory items sort
     * 
     * @param {string} sort
     * 
     * @memberof InventoryService
     */
    public setSort(sort: string): void {
        if (sort !== this.initialInventory.sort) {
            inventoryStore.update(currentInventory => ({
                ...currentInventory,
                sort,
            }));
            this.sortInventory();
        }
    }

    public setInventoryHTMLElement(element: HTMLElement): void {
        inventoryStore.update(currentInventory => ({
            ...currentInventory,
            _HTMLelement: element,
        }));
    }
};