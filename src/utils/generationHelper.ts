import type { IInventoryItem } from "../features/Inventory/inventory.interface";

const ores: string[] = ['coal', 'copper', 'tin', 'bronze', 'iron', 'gold'];

export const getGeneratedItem = (): IInventoryItem => {
    const itemIdx = Math.floor(Math.random() * ores.length);

    const item: IInventoryItem = {
        name: ores[itemIdx],
        quantity: Math.floor(Math.random() * 20) + 1,
        price: Math.floor(Math.exp(itemIdx)),
        maxStack: 99,
        imgUrl: `./assets/ores/${ores[itemIdx]}.png`,
    }

    return item;
}