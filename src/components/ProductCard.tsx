export default function ProductCard({product}: {product: any}){

    function genStar(ratings: number){
        let star = "<div>"
        for(let i =0; i < ratings; i ++){

          star+="<span>1</span>"
        }
        star+="</div>"
        return star
    }

    return <>
        <div className="max-w-[370px] max-h-[524px] bg-red-200">
            <img src={product.imageUrls[0]} className="object-cover w-[370px] h-[370px]" alt="" />
            <div>{product.name}</div>
            <div>{product.description}</div>
            {/* {[...Array(Math.round(product.ratings))].map((x,index)=>index) } */}
            {[...Array(Math.ceil(product.ratings))].map((x,index)=> 
                [...Array(Math.round(product.ratings))].length === index ?
                <span> { Math.round( (product.ratings.toFixed(3)- index )*100)/100 }
                &nbsp; </span> 
                : <span>2 &nbsp;</span> 
            ) 
        }
            <div>    
                {product.ratings}
            </div>


            {/* <div dangerouslySetInnerHTML={{__html : genStar(product.ratings) }}> </div> */}

        </div>        
    </>
}