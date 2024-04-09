import { FC, createContext, useState } from "react";
import { MyCartItem, MyCartItemContextType } from "../../types/MyCartItem";
import { VariantType } from "../../types/ProductDetails";




export const MyCartItemContext = createContext<MyCartItemContextType | null>(null);

const defaultMyCartItem = [
    {
        id: "asd1",
        name: "xxx11",
        color: "Red",
        size: "XL",
        quantity: 10,
        price: 2000
      },
    {
        id: "asd2",
        name: "xxx22",
        color: "Blue",
        size: "XL",
        skuCode: "",
        quantity: 20,
        price: 3000
      },
] as MyCartItem[]

const MyCartItemProvider: FC<{children: React.ReactNode}> = ({ children }) => {
  const [myCartItems, setMyCartItems] = useState<MyCartItem[]>(
    defaultMyCartItem
  );

  const updateMyCartItem = (
    id: string,
    name: string,
    color: string,
    size: string,
    skuCode: string,
    price: number,
    quantity: number,
    variants: VariantType[],
    img: string
  ) => {
    myCartItems.filter((myCartItem: MyCartItem) => {
        myCartItem.id = id;
        myCartItem.name = name;
        myCartItem.color = color;
        myCartItem.size = size;
        myCartItem.price = price;
        myCartItem.quantity = quantity;
        myCartItem.skuCode = skuCode;
        myCartItem.img = img;
        myCartItem.variants = variants;
        setMyCartItems([...myCartItems]);
    });
  };
  return <MyCartItemContext.Provider value={{ myCartItems, updateMyCartItem: updateMyCartItem }}>{children}</MyCartItemContext.Provider>;
};

export default MyCartItemProvider;