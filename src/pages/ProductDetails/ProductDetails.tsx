// import { Outlet } from "react-router-dom"
import { useParams } from "react-router-dom"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import productByPermarlink from '../../skuData/productByPermarlink.json'
import GenStar from "../../components/GenStar"

export default function ProductDetails(){
    
    const contentBodyStyle = 'min-h-[90vh]'
    const {permalink} = useParams();
    // console.log(permalink)
    let dataDisplay = productByPermarlink.filter(x=>x.permalink==permalink)
    console.log(dataDisplay)

    return (<>
    <Navbar/>
        <div  className={ contentBodyStyle }>

        <div className="mx-[160px] mt-[160px] lg:flex justify-between">
            <div>123</div>
            <div>{dataDisplay.length > 0 ? dataDisplay.map(x=> <>
                    <div>{x.name}</div> 
                    <div>{x.description}</div> 
                    <div>{x.price}</div> 
                    <div>{x.promotionalPrice}</div> 
                    <div className="flex">
                    {GenStar(x)}
                    </div>
                </>
                )
                : 
                <></>}
            </div>
        </div>
        {/* <Outlet/> */}
    </div>
    <Footer/>
    </>)
}