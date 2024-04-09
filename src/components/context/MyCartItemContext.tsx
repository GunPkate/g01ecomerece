import { FC, createContext, useState } from "react";
import { MyCartItem, MyCartItemContextType } from "../../types/MyCartItem";
import { VariantType } from "../../types/ProductDetails";




export const MyCartItemContext = createContext<MyCartItemContextType | null>(null);

const defaultMyCartItem = [
  {  
    id: "", 
    name: "City Commuter Coat", 
    color: "Khaki", 
    size: "L", 
    skuCode: "C0100205", 
    quantity: 5, 
    price: 1990, 
    img: "https://firebasestorage.googleapis.com/v0/b/wdb-storefront-project-api.appspot.com/o/products%2F6jqhbn0A4mtg1o6bRLVO%2F_images%2FfpH5fRXnDaZqFdiwGhx1-full-length-of-bearded-man-in-stylish-outfit-and-s-2023-11-27-04-57-52-utc.png?alt=media&token=a25c1a35-67ad-4a17-8522-f6e1299addb3", 
    variants: [
      { skuCode : "C0100204", color: "Blue", size: "XL", remains: 100, colorCode: "#0c5eeacb" }, 
      { skuCode : "C0100205", color: "Khaki", size: "L", remains: 54, colorCode: "#F0E68C" }, 
      { skuCode : "C0100212", color: "Black", size: "XL", remains: 79, colorCode: "#0b0b0b" }, 
      { skuCode : "C0100201", color: "Blue", size: "L", remains: 100, colorCode: "#0c5eeacb" }, 
      { skuCode : "C0100209", color: "Black", size: "L", remains: 76, colorCode: "#0b0b0b" }, 
      { skuCode : "C0100203", color: "Blue", size: "M", remains: 100, colorCode: "#0c5eeacb" }, 
      { skuCode : "C0100206", color: "Khaki", size: "S", remains: 54, colorCode: "#F0E68C" }, 
      { skuCode : "C0100211", color: "Black", size: "M", remains: 78, colorCode: "#0b0b0b" }, 
      { skuCode : "C0100208", color: "Khaki", size: "XL", remains: 56, colorCode: "#F0E68C" }, 
      { skuCode : "C0100207", color: "Khaki", size: "M", remains: 43, colorCode: "#F0E68C" }, 
      { skuCode : "C0100202", color: "Blue", size: "S", remains: 100, colorCode: "#0c5eeacb" }, 
      { skuCode : "C0100210", color: "Black", size: "S", remains: 77, colorCode: "#0b0b0b" }
    ] 
  }
  // {
  //     id: "asd2",
  //     name: "xxx22",
  //     color: "Blue",
  //     size: "XL",
  //     skuCode: "",
  //     quantity: 20,
  //     price: 3000
  //   },
] as MyCartItem[]

const MyCartItemProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
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