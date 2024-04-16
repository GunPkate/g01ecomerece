// import { Outlet } from "react-router-dom"
import { useParams } from "react-router-dom"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import productByPermarlink from '../../skuData/productByPermarlink.json'
import GenStar from "../../components/GenStar"
import { ChangeEvent, MouseEvent, useContext, useState } from "react"
import Modal from "../../components/Modal"
import { ProductByPermarlink, VariantType, colorCodeSet, colorSet, sizeSet } from "../../types/ProductDetails"
import { MyCartItem, MyCartItemContextType } from "../../types/MyCartItem"
import { MyCartItemContext } from "../../components/context/MyCartItemContext"
import saveMyCart from "../../apiService/saveMycart"
import { CartBody } from "../../types/CartBody"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../../firebase"

export default function ProductDetails(){
    
    const contentBodyStyle = 'min-h-[90vh]'

    const mainImageSize = '40.6vw'
    const sideImageSize = '172.21px'
    const mainImage = `w-[${mainImageSize}] h-[${mainImageSize}] `
    const sideImage = `w-[${sideImageSize}] h-[${sideImageSize}] `
    const discountStyle = "bg-red-500 text-white text-2xl p-2 "
    //Filter only
    const [varaint,setVariant] = useState<Array<VariantType>>([])
    const [filterItem,setFilterItem] = useState<Array<VariantType>>([])
    
    const [color,setColor] = useState('')
    const [size,setSize] = useState('')
    const [qty,setQty] = useState(0)
    const [validate,setValidate] = useState('')
    //Filter only

    const { myCartItems } = useContext(MyCartItemContext) as MyCartItemContextType;

    const [displayModal,setDisplayModal] = useState(false)

    const {permalink} = useParams();
    // console.log(permalink)
    type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
    
    let dataDisplay: ProductByPermarlink[] = productByPermarlink.filter(x=>x.permalink==permalink)
    // console.log(JSON.stringify(dataDisplay) )

    function handleVariant(e: ButtonEvent, data:any,type: string) {
        e.preventDefault()
        if(varaint.length === 1 && color.length > 0 && size.length > 0){
            resetSelect()
        }

        let resetFilter: VariantType[] = dataDisplay[0].variants 
        let firstFilter: VariantType[] = []
        filterItem.length > 0 ? firstFilter = filterItem  : firstFilter = resetFilter


        if(type==='size'){
            setSize(data)
            firstFilter = firstFilter.filter(x=>x.size === data)
            // setValidate(firstFilter.map(x=>x.size).join())
        }
        else if(type==='color'){
            setColor(data)
            firstFilter = firstFilter.filter(x=>x.colorCode === data)
            // setValidate(firstFilter.map(x=>x.color).join())
        }
        

        if(firstFilter.length === 1){
            setVariant(firstFilter)

            setFilterItem([])
            setValidate( " Color: "+ firstFilter[0].color + " Size: " + firstFilter[0].size + " In Stock: " + firstFilter[0].remains)
        }

        else{

                setFilterItem(firstFilter)
                setValidate('')
                let secondFilter: VariantType[] = []
                if(type==='size' && color.length > 0 && filterItem.length > 0){
                    secondFilter = firstFilter.filter(x=>x.colorCode)
                }else  if(type==='color' && size.length > 0 && filterItem.length > 0){
                    secondFilter = firstFilter.filter(x=>x.colorCode)
                }

            if(secondFilter.length === 1 ){
                setVariant(secondFilter)
            }
        }

        function resetSelect(){
            setFilterItem([])
            setColor('')
            setSize('')
            setVariant([])
        }


    }

    function handleQty(e: ChangeEvent ){
        e.preventDefault()
        // let tempData = varaint
        const getValue = (e.target as HTMLInputElement).value;

        // console.log(tempData)
        setQty(parseInt(getValue))
    }
    
    function getColor(data: VariantType[]){

        let resultColor: colorSet[] = []
        const tempDataColor = [...new Set(data.map((x: { color: any })=> x.color )) ]
        tempDataColor.forEach(x=>
            resultColor.push( { "color": x } )
        )
      
        let resultColorCode: colorCodeSet[] = []
        const tempDataColorCode = [...new Set(data.map((x: { colorCode: any })=> x.colorCode )) ]
        tempDataColorCode.forEach(x=>
            resultColorCode.push( { "colorCode": x } )
        )     

        let resultSize: sizeSet[] = []
        const tempDataSize = [...new Set(data.map((x: { size: any })=> x.size )) ]
        tempDataSize.forEach(x=>{
            if(x.length >0){
                resultSize.push( { "size": x } )
            }
        }
        )

        const btnSize = "w-[100px] h-[82px] "
        const bgColor = "w-[54px] h-[54px] ml-auto mr-auto "

        return <div className="block w-full mx-auto"> 

            <div className="flex ">
                {/* {resultColorCode.map(x=><button style={{background: `${x.colorCode}`}}>1</button>)} */}
                {resultColorCode.map(x=>
                    <div className="">
                        <button className= {x.colorCode === color ? btnSize + "border-2 border-rose-400": btnSize } onClick={(e)=>{handleVariant(e,x.colorCode,'color')}}>
                            <div className={bgColor} style={{background: `${x.colorCode}`}} ></div>
                        </button>
                    </div>
                )}
            </div>

            <div className="flex text-center">
                {resultColor.map(x=><div className= {btnSize}>{x.color}</div>)}
            </div>

            <div className="flex ">
                {/* {resultColorCode.map(x=><button style={{background: `${x.colorCode}`}}>1</button>)} */}
                {resultSize.map(x=>
                    <div className="">
                        <button className= {x.size === size ? btnSize + "border-2 border-rose-400" : btnSize + "border-2 border-[#eeeeee]"} onClick={(e)=>{handleVariant(e,x.size,'size')}}>
                            {x.size}
                        </button>
                    </div>
                )}
            </div>
        </div>
    }

    
    const addITemsCart = async (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        e.preventDefault()
        setDisplayModal(!displayModal)
        
        //Update | Add UI
        let contextBody = MyCartItem.InitialObjMyCartItem()
        contextBody.id = "user1"
        contextBody.name = dataDisplay[0].name
        contextBody.color = varaint[0].color
        contextBody.size = varaint[0].size
        contextBody.quantity = qty
        contextBody.skuCode = varaint[0].skuCode
        contextBody.price = dataDisplay[0].price 
        contextBody.img = dataDisplay[0].imageUrls[0]
        contextBody.permalink = dataDisplay[0].permalink
        contextBody.variants = dataDisplay[0].variants

        console.log("uniqueData",varaint)
        console.log("Body",contextBody)
        let newContext = myCartItems;
        newContext.push(contextBody)
        console.log("Context",myCartItems)

        //Update | Add UI
        let body = CartBody.initializeCartBody()
        body.id = 'user1'
        newContext.forEach(x=> {
            let item = CartBody.initializeCartItemBody()
            item.id = newContext.length
            item.skuCode = x.skuCode
            item.quantity = x.quantity
            item.permalink = x.permalink
            item.price = x.price
            body.items.push(item)
        } )

        if(localStorage.getItem('Id') === undefined || localStorage.getItem('Id') === null){
            saveMyCart(body)
            console.log(body)
        }else{
            // let MyId:any = localStorage.getItem('Id')
            // try {
            //     await setDoc(doc(db, "myCart", MyId), {
            //         id: "user1" ,
            //         items: body.items
            //     });
            // } catch (error) {
                
            // }
            console.log("body",body)
            console.log("newContext",newContext)
        }
    }
    

    return (<>
    <Navbar/>
        <div  className={ contentBodyStyle }>
        <div className="mx-[160px] mt-[110px] lg:flex justify-between">
            {/* Image Section */}
            <div className="relative w-full">
                <div>
                    <div className={"absolute right-10 top-10 " + discountStyle}>Sale</div>
                    { dataDisplay.length > 0 ? <img src={dataDisplay[0].imageUrls[0]} alt="" className={mainImage} />: <></>}
                </div>
                <div className={`flex justify-between w-[${mainImageSize}]`}>
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

            {/* Item Section */}
            <div className="w-full pl-5">
                {dataDisplay.length > 0 ? dataDisplay.map((x,index)=> 
                    <div key={index}>
                        <div className="text-2xl">{x.name} {color} {size} </div>  
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

                <div>
                    <div>
                        Qty
                    </div>
                    <select name="qty" className="w-[158px] w-[82px]" onChange={(e)=>{handleQty(e)}} id="">
                        {   
                            [...Array(10)].map((x,index) => <option>{index+1}</option>)
                        }
                    </select>
                </div>

                {/* Add Section */}
                <div className="text-red-600"> {validate} </div>
                {qty !==0 && color.length >0 && varaint.length > 0?
                    <button className="bg-black w-full text-white">
                        <div onClick={(e)=>{addITemsCart(e)}}>
                            Add to Cart
                        </div>
                    </button>
                    :<button className="bg-[#E1E1E1] w-full text-white" disabled>
                        <div>
                            Add to Cart
                        </div>
                    </button>
                }
            </div>



        </div>
        {/* <Outlet/> */}
    </div>
    <Footer/>

    <Modal display={displayModal} onClose={()=>{setDisplayModal(false)}} qty={qty} dataDisplay={dataDisplay}/>
    </>)
}