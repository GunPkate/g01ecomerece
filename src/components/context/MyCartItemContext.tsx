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
  } ,
  {
    id: "",
    name: "Boxy Tailored Jacket",
    color: "Navy",
    size: "XL",
    skuCode: "C0900604",
    quantity: 4,
    price: 2990,
    img: "https://firebasestorage.googleapis.com/v0/b/wdb-storefront-project-api.appspot.com/o/products%2Ft7uRtRNRQOhKJHWnWIDY%2F_images%2FSknj6SRVaDh94bLTLIS3-stylish-woman-model-in-studio-in-coat-autumn-fash-2023-11-27-04-59-28-utc.png?alt=media&token=961d6211-c471-4ab9-9e6d-6678962648ad",
    variants: [
      {
        skuCode: "C0900611",
        color: "Black",
        size: "L",
        remains: 0,
        colorCode: "#030303"
      },
      {
        skuCode: "C0900610",
        color: "Black",
        size: "M",
        remains: 39,
        colorCode: "#030303"
      },
      {
        skuCode: "C0900609",
        color: "Black",
        size: "S",
        remains: 30,
        colorCode: "#030303"
      },
      {
        skuCode: "C0900604",
        color: "Navy",
        size: "XL",
        remains: 1,
        colorCode: "#000080"
      },
      {
        skuCode: "C0900608",
        color: "Dark Grey",
        size: "XL",
        remains: 19,
        colorCode: "#A9A9A9"
      },
      {
        skuCode: "C0900605",
        color: "Dark Grey",
        size: "S",
        remains: 27,
        colorCode: "#A9A9A9"
      },
      {
        skuCode: "C0900603",
        color: "Navy",
        size: "L",
        remains: 26,
        colorCode: "#000080"
      },
      {
        skuCode: "C0900602",
        color: "Navy",
        size: "M",
        remains: 27,
        colorCode: "#000080"
      },
      {
        skuCode: "C0900607",
        color: "Dark Grey",
        size: "L",
        remains: 21,
        colorCode: "#A9A9A9"
      },
      {
        skuCode: "C0900606",
        color: "Dark Grey",
        size: "M",
        remains: 8,
        colorCode: "#A9A9A9"
      },
      {
        skuCode: "C0900612",
        color: "Black",
        size: "XL",
        remains: 9,
        colorCode: "#030303"
      },
      {
        skuCode: "C0900601",
        color: "Navy",
        size: "S",
        remains: 13,
        colorCode: "#000080"
      }
    ]
  }

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

  const updateSelectedCartItem =(skuCode:string, value: string, name: string) => {
    let tempData = myCartItems;
    let checkFilter = 0;
    tempData.forEach( x => 
      {
        if( x.skuCode === skuCode ) {
          if(name === 'color') {

            let checkFilterTemp = x.variants.filter(y=>y.color === value && y.size === x.size)
            checkFilter = checkFilterTemp.length
            if(checkFilter === 1){
              x.color = value
              x.size = checkFilterTemp[0].size
              x.skuCode = checkFilterTemp[0].skuCode
              x.id = checkFilterTemp[0].skuCode
            }
            console.log("checkFilter",checkFilterTemp)
          } 
          if(name === 'size'){
            x.size = value
            let checkFilterTemp = x.variants.filter(y=>y.size === value && y.color === x.color)
            checkFilter = checkFilterTemp.length
            if(checkFilter === 1){
              x.size = value
              x.color = checkFilterTemp[0].color
              x.skuCode = checkFilterTemp[0].skuCode
              x.id = checkFilterTemp[0].skuCode
            }
            console.log("checkFilter",checkFilterTemp)
          }  
          if(name === 'qty')  x.quantity = parseInt(value)
        }
      }
    )
    console.log("context X",tempData)
    setMyCartItems(tempData);
  };
  return <MyCartItemContext.Provider value={{ myCartItems, updateMyCartItem: updateMyCartItem, updateSelectedCartItem: updateSelectedCartItem }}>{children}</MyCartItemContext.Provider>;

};

export default MyCartItemProvider;