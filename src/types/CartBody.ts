 export interface CartBody {
    id: string,
    items: CartBodyItem[],
    date: string
}

export interface CartBodyItem {
    name: string
    id: string,
    skuCode: string,
    quantity: number,
    permalink: string,
    price: number
}

export class CartBody {
     static initializeCartBody() :CartBody {
        return {
            id: "",
            items: [],
            date: ''
        }
    }

    static initializeCartItemBody() :CartBodyItem {
        return {
            id: '',
            name: '',
            skuCode: '',
            quantity: 0,
            permalink: '',
            price: 0,
        }
    }
}