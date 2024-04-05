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

    const {permalink} = useParams();
    // console.log(permalink)
    let dataDisplay = productByPermarlink.filter(x=>x.permalink==permalink)
    console.log(dataDisplay)

    return (<>
    <Navbar/>
        <div  className={ contentBodyStyle }>

        <div className="mx-[160px] mt-[110px] lg:flex justify-between">
            <div className="w-full">
                { dataDisplay.length > 0 ? <img src={dataDisplay[0].imageUrls[0]} alt="" className={mainImage} />: <></>}
                <div className="flex justify-between">
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
                        <div>{x.price}</div> 
                        <div>{x.promotionalPrice}</div> 
                        <div className="flex">
                            {GenStar(x)}
                        </div>
                    </div>)
                    : <></>
                }
            </div>
        </div>
        {/* <Outlet/> */}
    </div>
    <Footer/>
    </>)
}