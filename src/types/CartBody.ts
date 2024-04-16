 export interface CartBody {
    id: string,
    items: CartBodyItem[]
}

export interface CartBodyItem {
    id: number,
    skuCode: string,
    quantity: number,
    permalink: string,
    price: number
}

export class CartBody {
     static initializeCartBody() :CartBody {
        return {
            id: "",
            items: []
        }
    }

    static initializeCartItemBody() :CartBodyItem {
        return {
            id: 0,
            skuCode: '',
            quantity: 0,
            permalink: '',
            price: 0,
        }
    }
}