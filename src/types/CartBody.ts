 export interface CartBody {
    id: string,
    items: CartBodyItem[]
}

export interface CartBodyItem {
    id: string,
    skuCode: string,
    quantity: number,
    productPermalink: string,
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
            id: '',
            skuCode: '',
            quantity: 0,
            productPermalink: '',
            price: 0,
        }
    }
}