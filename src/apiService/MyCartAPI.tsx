import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { CartBody } from "../types/CartBody";
import { MyCartItem } from "../types/MyCartItem";

export async function addNewCartOrExistingCart(body: CartBody){

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
        try {
            await setDoc(doc(db, "myCart", MyId), {
                id: "user1" ,
                items: body.items
            });
        } catch (error) {
            
        }

    }
}

export async function updateMyCartItemAPI(filterItem: MyCartItem[] ) {
    let MyId:any = localStorage.getItem('Id')
    await setDoc(doc(db, "myCart", MyId), {
        id: "user1" ,
        items: filterItem,
    });
    console.log(filterItem)
}