import type { IItem } from '../../interfaces/item.interface';
export interface IInventoryItem extends IItem {
    maxStack: number,
    quantity: number,
}

export interface IInventory {
    ownerId: number,
    items: IInventoryItem[],
    maxSlots: number,
    sort: string,
    order: string,
    _HTMLelement: HTMLElement,
};