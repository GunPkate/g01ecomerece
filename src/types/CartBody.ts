 export interface CartBody {
    id: string,
    items: CartBodyItem[]
}

export interface CartBodyItem {
    id: string,
    skuCode: string,
    quantity: number,
    productPermalink: string
}

export const InitailObjCart = {
    id: null,
    skuCode: null,
    quantity: null,
    productPermalink: null,
}

export class CartBody {
     static initializeCartBody() :CartBody {
        return {
            id: "",
            items: []
        }
    }

    static initializeCartItemBody() {
        return {
            id: '',
            skuCode: '',
            quantity: 0,
            productPermalink: '',
        }
    }
}