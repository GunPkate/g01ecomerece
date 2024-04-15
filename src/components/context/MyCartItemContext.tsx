import { FC, createContext, useState } from "react";
import { MyCartItem, MyCartItemContextType } from "../../types/MyCartItem";
import { collection, doc, getDoc, getDocs, query, where} from "firebase/firestore"; 
import { db } from "../../firebase";
// import mockMyCart from "../../skuData/mockMyCart.json"
import { VariantType } from "../../types/ProductDetails";

export const MyCartItemContext = createContext<MyCartItemContextType | null>(null);

const mycartRef = doc(db,"myCart",'e3H6i3pKOxhlKcEdDFTl')
const docSnap = await getDoc(mycartRef);

// let defaultMyCartItem = mockMyCart as MyCartItem[]
let defaultMyCartItem = [] as MyCartItem[]
if (docSnap.exists()) {
  let tempData = docSnap.data();
  // console.log("Document data:", tempData);
  tempData.items.forEach(async (x: any)=>{
    let newitem = MyCartItem.InitialObjMyCartItem();

    newitem.id = x.id 
    newitem.name = x.name 
    newitem.color = x.color 
    newitem.size = x.size 
    newitem.skuCode = x.skuCode 
    newitem.quantity = x.quantity 
    newitem.price = x.price 
    newitem.permalink = x.productPermalink

    // console.log(JSON.stringify(newitem))
    // console.log(JSON.stringify(x.productPermalink))

    const permalinkRef = await collection(db,"productByPermarlink")
    const permaQuery = await query(permalinkRef, where("permalink", "==",x.productPermalink))
    // const permaQuery = query(permalinkRef, where("categories", "array-contains","shirts-city-commuter-coat"))
    // const permaQuery = query(permalinkRef, where("id", "==","cY3r7b1XkUfi9sq4GeTz"))

    const querySnapshot = await getDocs(permaQuery);
    // console.log("asd",querySnapshot)
    let tempVariant = [] as VariantType[]
    await querySnapshot.forEach((doc) => {
      let result: any = doc.data()
      console.log("doc.id", " => ", (result));   // doc.data() is never undefined for query doc snapshots
      
      result.variants.forEach((z: { color: string; colorCode: string; remains: number; size: string; skuCode: string; })=>{
        let itemTemp = VariantType.InitialObjVariantType();
        itemTemp.color = z.color
        itemTemp.colorCode = z.colorCode
        itemTemp.remains = z.remains
        itemTemp.size = z.size
        itemTemp.skuCode = z.skuCode
        tempVariant.push(itemTemp)
        if(z.skuCode == x.skuCode){
          newitem.color = z.color 
          newitem.size = z.size
        }
      })

      newitem.img = result.imageUrls[0]
      newitem.name = result.name
      
    });
    newitem.variants = tempVariant

    await defaultMyCartItem.push(newitem)
    console.log("1234",defaultMyCartItem)
  })
} else {
  console.log("No such document!"); // docSnap.data() will be undefined in this case
}

// console.log("1234",defaultMyCartItem)


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