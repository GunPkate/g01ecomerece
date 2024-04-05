import ProductCard from '../../components/ProductCard';
import  product from '../../skuData/product.json';

export default function Product(){
    console.log("product",product)

    return <>
        <div className="mx-[160px] mt-[160px] lg:flex bg-red justify-between">
            <div className="block w-[280px] mr-[30px]">
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
            </div>
            <div className="w-full">
                <div className="w-full">
                    <div>Woman</div>
                </div>

                <div className='w-full grid grid-cols-3 gap-4'>
                    {product.data.length>0? 
                        product.data.map((x,id) => {  return <ProductCard product={x} key={id}/> })
                        :<></>
                    }
                </div>
            </div>
        </div>
    </>
}