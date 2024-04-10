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

  export const InitailObjMycart: MyCartItem = {
    id: '',
    name: '',
    color: '',
    size: '',
    skuCode: '',
    quantity: 0,
    price: 0,
    img: '',
    variants: []
  }