export interface MyCartItem {
    id: string;
    name: string
    color: string;
    size: string;
    quantity: number;
    price: number;
    img: string
  }

  export type MyCartItemContextType = {
    myCartItems: MyCartItem[];
    updateMyCartItem: (
        id: string,
        name: string,
        color: string,
        size: string,
        quantity: number,
        img: string
    ) => void;
  };