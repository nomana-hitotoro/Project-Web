import type { IItem } from './item.interface';
export interface IInventoryItem extends IItem {
    maxStack: number,
    amount: number,
}

export interface IInventory {
    ownerId: number,
    items: IInventoryItem[],
    maxSlots: number,
    sort: string,
    order: string,
};