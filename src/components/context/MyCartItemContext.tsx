import { FC, createContext, useState } from "react";
import { MyCartItem, MyCartItemContextType } from "../../types/MyCartItem";
import { collection, doc, getDoc, setDoc } from "firebase/firestore"; 
import { db } from "../../firebase";
import mockMyCart from "../../skuData/mockMyCart.json"

export const MyCartItemContext = createContext<MyCartItemContextType | null>(null);

// const mycartRef = doc(db,"myCart",'e3H6i3pKOxhlKcEdDFTl')
// const docSnap = await getDoc(mycartRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // docSnap.data() will be undefined in this case
//   console.log("No such document!");
// }

// const defaultMyCartItem = [] as MyCartItem[]
const defaultMyCartItem = mockMyCart as MyCartItem[]

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