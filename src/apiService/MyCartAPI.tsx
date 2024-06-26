import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { CartBody, CartBodyItem } from "../types/CartBody";
import { MyCartItem } from "../types/MyCartItem";
import { VariantType } from "../types/ProductDetails";
import { getAuth } from "firebase/auth";

export async function addNewCartOrExistingCart(body: CartBody, user: any){

    if(localStorage.getItem('Id') === undefined || localStorage.getItem('Id') === null){
        try {
            console.log(body)
            const saveCart = await addDoc(collection(db,"/myCart"),body)
            setDoc(saveCart,body);
            console.log("Document written with ID: ", saveCart.id);
            localStorage.setItem("Id",saveCart.id); 
        } catch (error) {
            
        }

    }else{
        let MyId:any = localStorage.getItem('Id')
        console.log("body",body)
        try {
            await setDoc(doc(db, "myCart", MyId), {
                id: user ,
                items: body.items,
                date: ''
            });
        } catch (error) {
            
        }

    }
}

export async function updateMyCartItemAPI(filterItem: MyCartItem[] ,status: string) {
    // console.log("zxc",filterItem)
    const auth = getAuth();
    const user = auth.currentUser;
    let updateBody: CartBodyItem[] = []
    filterItem.forEach(x=>{
        let tempData = CartBody.initializeCartItemBody()
        tempData.id = x.id
        tempData.name = x.name
        tempData.skuCode = x.skuCode
        tempData.quantity = x.quantity
        tempData.permalink = x.permalink
        tempData.price = x.price
        updateBody.push(tempData)
    })
    let MyId:any = localStorage.getItem('Id')
    // console.log("zxc",MyId)
    await setDoc(doc(db, "myCart", MyId), {
        id: user?.email ,
        items: updateBody,
        date: status === 'checkOut' ? new Date(): ''
    });
}

export async function updateRemainingStock(stockId: any, updateVariants: VariantType[], newRemain: number){
    
    let newVariant: { skuCode: string; color: string; remains: number; colorCode: string; }[] = [];
    updateVariants.forEach( x => 
       {
           let element = {
               "skuCode": x.skuCode,
               "color": x.color,
               "remains": newRemain,
               "colorCode": x.colorCode,
           }
           newVariant.push(element)
       }
    )

    await updateDoc(doc(db, "productByPermarlink", stockId), {
        // variants: [ ]
        variants: newVariant
    });


    // console.log(stockRef.id)
    // console.log(stockRef)
}