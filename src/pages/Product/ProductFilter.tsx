import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from '../../components/ProductCard';
import  product from '../../skuData/product.json';

export default function ProductFilter(){
    const [page,setPage] = useState(1);
    const {name} = useParams();
    let dataDisplay = product.data.filter(x=>x.categories[1].includes(name))
    console.log("product",JSON.stringify(product))


    return <>
        <div className='flex justify-between'>
            <div className="w-full mb-[70px]">
                <div>{name}</div>
            </div>
            <select>
                <option value="">Sort</option>
                <option value="">Sort1</option>
                <option value="">Sort</option>
            </select>
        </div>

        <div className='flex justify-center'>{[...Array(Math.ceil(dataDisplay.length/6))].map((index)=> 
        <div key={index}>
            <button onClick={()=>{setPage(index+1)}}> {index+1} </button> &nbsp; 
        </div>
        )}
        </div>
        <div className='w-full grid grid-cols-3 gap-x-0'>
            {dataDisplay.length>0? 
                dataDisplay.map((x,id) => { if( id/6 >= page-1  && id/6 < page){ return <Link key={id + 1} to={"/productdetails/"+x.permalink}> <ProductCard product={x} />  </Link>} })
                :<></>
            }
        </div>
    </>
}