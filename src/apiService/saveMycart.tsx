import { addDoc, collection, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { CartBody } from "../types/CartBody";

export default async function saveMyCart(body: CartBody){

    
    console.log(body)
    const saveCart = await addDoc(collection(db,"/myCart"),body)
    setDoc(saveCart,body);
    console.log("Document written with ID: ", saveCart.id);
    localStorage.setItem("Id",saveCart.id);
}