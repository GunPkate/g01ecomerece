// import { Outlet } from "react-router-dom"
import { useParams } from "react-router-dom"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import productByPermarlink from '../../skuData/productByPermarlink.json'
import GenStar from "../../components/GenStar"

export default function ProductDetails(){
    
    const contentBodyStyle = 'min-h-[90vh]'

    const mainImage = 'w-[780px] h-[780px] '
    const sideImage = 'w-[172.21px] h-[172.21px] '
    const discountStyle = "bg-red-500 text-white text-2xl "
    
    const {permalink} = useParams();
    // console.log(permalink)
    let dataDisplay = productByPermarlink.filter(x=>x.permalink==permalink)
    // console.log(JSON.stringify(dataDisplay) )

    function getColor(data: any){
        let resultColor: unknown[] = []
        const tempDataColor = [...new Set(data.map((x: { color: any })=> x.color )) ]
        tempDataColor.forEach(x=>
            resultColor.push( { "color": x } )
        )
        
        let resultColorCode: unknown[] = []
        const tempDataColorCode = [...new Set(data.map((x: { colorCode: any })=> x.colorCode )) ]
        tempDataColorCode.forEach(x=>
            resultColorCode.push( { "colorCode": x } )
        )

        const btnSize = "w-[100px] h-[82px] "
        const bgColor = "w-[54px] h-[54px] ml-auto mr-auto "

        return <div className="block w-full mx-auto"> 

            <div className="flex ">
                {/* {resultColorCode.map(x=><button style={{background: `${x.colorCode}`}}>1</button>)} */}
                {resultColorCode.map(x=>
                    <div className="">
                        <button className= {btnSize}>
                            <div className={bgColor} style={{background: `${x.colorCode}`}} ></div>
                        </button>
                    </div>
                )}
            </div>

            <div className="flex text-center">
                {resultColor.map(x=><div className= {btnSize}>{x.color}</div>)}
            </div>
        </div>
    }


    return (<>
    <Navbar/>
        <div  className={ contentBodyStyle }>

        <div className="mx-[160px] mt-[110px] lg:flex justify-between">
            <div className="relative w-[780px]">
                <div>
                    <div className={"absolute right-10 top-10 " + discountStyle}>Sale</div>
                    { dataDisplay.length > 0 ? <img src={dataDisplay[0].imageUrls[0]} alt="" className={mainImage} />: <></>}
                </div>
                <div className="flex justify-between w-[780px]">
                    { dataDisplay.length > 0 ? dataDisplay.map((x)=> x.imageUrls.map((y,index)=> 
                        {
                            if(index !== 0){
                                return   <img key={index} src={y} alt="" className={sideImage} />  
                            }
                        } ) ) 
                        :<></>
                    }      
                </div>
            </div>

            <div className="w-full pl-5">
                {dataDisplay.length > 0 ? dataDisplay.map((x,index)=> 
                    <div key={index}>
                        <div>{x.name}</div> 
                        <div>{x.description}</div> 
                        <div className={ x.price > x.promotionalPrice ? discountStyle + "w-[277px] ":""}>THB: {x.promotionalPrice}</div> 
                        <div className={ x.price > x.promotionalPrice ? "opacity-1 line-through":"opacity-0"}>From THB: {x.price}</div> 
                        <div className="flex">
                            {GenStar(x)}
                        </div>
                    
                    <div>
                        Color
                    </div>
                    <div>
                        {getColor(x.variants)}
                    </div>
                
                    </div>
                )
                    
                    : <></>
                }
            </div>
        </div>
        {/* <Outlet/> */}
    </div>
    <Footer/>
    </>)
}