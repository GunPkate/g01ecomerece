import { VariantType } from './ProductDetails';
export interface MyCartItem {
  
    id: string;
    name: string
    color: string;
    size: string;
    skuCode: string;
    quantity: number;
    price: number;
    img: string
    permalink: string
    variants: VariantType[]
  }

  export type MyCartItemContextType = {
    myCartItems: MyCartItem[];
    updateMyCartItem: (
      myCartItems: MyCartItem[]
    ) => void;

    updateSelectedCartItem: (
      skuCode: string, value: string, type: string
    )=> void;
  };

  export class MyCartItem  {
    static InitialObjMyCartItem() {
      return {     
        id: '',
        name: '',
        color: '',
        size: '',
        skuCode: '',
        quantity: 0,
        price: 0,
        img: '',
        permalink: '',
        variants: [] as VariantType[]
      }
    }
  }