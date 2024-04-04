import { FC, createContext, useState } from "react";
import { MyCartItem, MyCartItemContextType } from "../../types/MyCartItem";




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
    quantity: number
  ) => {
    myCartItems.filter((myCartItem: MyCartItem) => {
        myCartItem.id = id;
        myCartItem.name = name;
        myCartItem.color = color;
        myCartItem.size = size;
        myCartItem.quantity = quantity;
        setMyCartItems([...myCartItems]);
    });
  };
  return <MyCartItemContext.Provider value={{ myCartItems, updateMyCartItem: updateMyCartItem }}>{children}</MyCartItemContext.Provider>;
};

export default MyCartItemProvider;