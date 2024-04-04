import { useState } from "react"
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../firebase"
import * as categories from '../skuData/categories.json';
import * as collections from '../skuData/collections.json';
import * as product from '../skuData/product.json';
import * as productByPermarlink from '../skuData/productByPermarlink.json';

export default function Admin(){
    
    const [categoryName,setCategoryName] = useState('')
    const [permalink,setPermalink] = useState('')




    function getDatabase(e) {
        e.preventDefault();
        console.log("categories",categories); 
        console.log("collections",collections); 
        console.log("product",product); 
        console.log("productByPermarlink",productByPermarlink); 
    }

    interface Category  {
        categoryName: string,
        permalink: string,
    }

    // type InputEvent = React.ChangeEvent<HTMLInputElement>;
    type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

    async function handleAddData(e: ButtonEvent){
        e.preventDefault();
        try {
        let catbody: Category = {categoryName:'', permalink: ''}
        catbody.categoryName = categoryName;
        catbody.permalink = permalink;

            const docRef = await addDoc(collection(db, "/categories"), catbody);
            console.log("Document written with ID: ", docRef.id);
            console.log(catbody)
          } catch (e) {
            console.error("Error adding document: ", e);
          }

    }

    return (<>
        <div className="min-h-[90vh] flex justify-center">
        <div className=" bg-blue-300 rounded-lg my-auto min-h-[60vh] min-w-[60vw] flex justify-center">
            <form className="min-h-[100%] mt-10 mx-auto" action="">
                <h1 className="text-center">
                    Admin Add Categories
                </h1>
                {/* <h1 className="text-red-400">{validate}</h1> */}
                <div className="bg-zinc-300 rounded-full py-2 pl-2">

                    <label>
                        Name
                    </label>
                    <input className=" ml-2 bg-transparent outline-none" type="text" name="categoryName" placeholder="Category's name" value={categoryName} onChange={(e)=>{setCategoryName(e.target.value)}}/>
                </div>

                <div className="bg-zinc-300 rounded-full py-2 pl-2">
                    <label>
                        Permalink
                    </label>
                    <input className="full ml-2 bg-transparent outline-none" type="text" name="permalink" placeholder="Permalink" value={permalink} onChange={(e)=>{setPermalink(e.target.value)}}/>
                </div>

                {/* <button className="rounded-full bg-success w-full py-2" onClick={(e)=>{handleLogin(e)}}>Login</button> */}
                <div>
   
      
                </div>

                <button className="rounded-full bg-success w-full py-2" onClick={(e)=>{handleAddData(e)}}>Add Data</button>


                <button className="rounded-full bg-success w-full py-2" onClick={(e)=>{getDatabase(e)}}>Gen Data</button>
            </form>
        </div>
        </div>
    </>)
}