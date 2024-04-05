import { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import  product from '../../skuData/product.json';

export default function Product(){
    console.log("product",product)
    const [page,setPage] = useState(1);

    return <>
        <div className="mx-[160px] mt-[160px] lg:flex justify-between">
            <div className="block w-[280px] mr-[30px]">
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
            </div>
            <div className="w-full">
                <div className='flex justify-between'>
                    <div className="w-full mb-[70px]">
                        <div>Woman</div>
                    </div>
                    <div>
                        Sort
                    </div>
                </div>

                <div className='flex justify-center'>{[...Array(Math.ceil(product.data.length/6))].map((x,index)=> 
                <>
                    <button onClick={(e)=>{setPage(index+1)}}> {index+1} </button> &nbsp; 
                </>
                )}</div>
                <div className='w-full grid grid-cols-3 gap-4'>
                    {product.data.length>0? 
                        product.data.map((x,id) => { if( id/6 >= page-1  && id/6 < page){ return <> <ProductCard product={x} key={id+1}/>  </>} })
                        :<></>
                    }
                </div>
            </div>
        </div>
    </>
}