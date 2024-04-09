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
    myCartItem: MyCartItem[]
  ) => {
      setMyCartItems(myCartItem);
  };
  return <MyCartItemContext.Provider value={{ myCartItems, updateMyCartItem: updateMyCartItem }}>{children}</MyCartItemContext.Provider>;
};

export default MyCartItemProvider;