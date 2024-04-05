import GenStar from "./GenStar"

export default function ProductCard({product}: {product: any}){


    return <>
        <div className="max-w-[370px] max-h-[524px]">
            <img src={product.imageUrls[0]} className="object-cover w-[370px] h-[370px]" alt="" />
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