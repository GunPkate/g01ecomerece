import GenStar from "./GenStar"

export default function ProductCard({product,width,height}: {product: any, width: string, height:string}){


    return <>
        <div className={`max-w-[${width}] max-h-[${height}]`}>
            <img src={product.imageUrls[0]} className={`object-fit w-[${width}] max-h-[$${height}]`} alt="" />
            <div>{product.name}</div>
            <div>{product.description}</div>

            <div className="inline-flex">
            {(GenStar(product))
            }
            </div>
            <div>    
                {product.ratings}
            </div>


            {/* <div dangerouslySetInnerHTML={{__html : genStar(product.ratings) }}> </div> */}

        </div>        
    </>
}