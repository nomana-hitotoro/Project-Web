import { writable } from "svelte/store";

import orderEnum from "../utils/enums/orderEnum";
import sortEnum from "../utils/enums/sortEnum";

const inventoryStore = writable({
    ownerId: 0,
    items: [],
    maxSlots: 9,
    sort: sortEnum.DEFAULT,
    order: orderEnum.DEFAULT,
});

export default inventoryStore;