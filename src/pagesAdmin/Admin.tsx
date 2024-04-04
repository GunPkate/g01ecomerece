import { useState } from "react"

export default function Admin(){
    
    const [categoryName,setCategoryName] = useState('')
    const [permalink,setPermalink] = useState('')

    interface Category  {
        categoryName: string,
        permalink: string,
    }

    function handleAddData(e){
        e.preventDefault();
        let catbody: Category = {categoryName:'', permalink: ''}
        catbody.categoryName = categoryName;
        catbody.permalink = permalink;
        console.log(catbody)
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
            </form>
        </div>
        </div>
    </>)
}