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
import { addNewCartOrExistingCart } from "../../apiService/MyCartAPI"
import { CartBody } from "../../types/CartBody"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase"
import { getAuth } from "firebase/auth"

export default function ProductDetails(){
    
    const contentBodyStyle = 'min-h-[90vh]'

    const mainImage = 'w-[343px] h:[343px] object-fill md:w-[780px] md:h-[780px] '
    const sideImage = 'w-[80px] h:[80px] md:w-[172.21px] md:h-[172.21px] md:object-fill lg:object-fill'
    const discountStyle = "bg-red-500 text-white text-2xl p-2 "
    //Filter only
    const [varaint,setVariant] = useState<Array<VariantType>>([])
    const [stock,setStock] = useState(0)
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
    dataDisplay[0].variants.sort((a,b) => a.skuCode > b.skuCode ? 0 : 1)
    // console.log(JSON.stringify(dataDisplay) )

    function handleVariant(e: ButtonEvent, data:any,type: string) {
        e.preventDefault()
        if(varaint.length === 1 && color.length > 0 && size.length > 0){
            resetSelect()
        }

        let resetFilter: VariantType[] = dataDisplay[0].variants.sort((a,b) => a.skuCode > b.skuCode ? 0 : 1)
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
            setStock(firstFilter[0].remains)
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
        const tempDataColor = [...new Set(data.map((xColor: { color: any })=> xColor.color )) ]
        tempDataColor.forEach(x=>
            resultColor.push( { "color": x } )
        )
      
        let resultColorCode: colorCodeSet[] = []
        const tempDataColorCode = [...new Set(data.map((xColorCode: { colorCode: any })=> xColorCode.colorCode )) ]
        tempDataColorCode.forEach(xColorCode=>
            resultColorCode.push( { "colorCode": xColorCode } )
        )     

        let resultSize: sizeSet[] = []
        if(data.map(Object.keys).join().includes("size") !== false){
            const tempDataSize = [...new Set(data.map((xSize: { size: any })=> xSize.size )) ]
            tempDataSize.forEach(xSize=>{
                if(xSize.length >0){
                    resultSize.push( { "size": xSize } )
                }
            }
        )
        }

        const btnSize = "w-[100px] h-[82px] "
        const bgColor = "w-[54px] h-[54px] ml-auto mr-auto "

        return <div className="block w-full mx-auto"> 

            <div className="flex ">
                {/* {resultColorCode.map(x=><button style={{background: `${x.colorCode}`}}>1</button>)} */}
                {resultColorCode.length > 0 ? resultColorCode.map(x=>
                    <div className="">
                        <button className= {x.colorCode === color ? btnSize + "border-2 border-rose-400": btnSize } onClick={(e)=>{handleVariant(e,x.colorCode,'color')}}>
                            <div className={bgColor} style={{background: `${x.colorCode}`}} ></div>
                        </button>
                    </div>
                ) : <></>}
            </div>

            <div className="flex text-center">
                {resultColor.map(x=><div className= {btnSize}>{x.color}</div>)}
            </div>

            <div className="flex ">
                {/* {resultColorCode.map(x=><button style={{background: `${x.colorCode}`}}>1</button>)} */}
                {data.map(Object.keys).join().includes("size") !== false ? resultSize.map(x=>
                    <div className="">
                        <button className= {x.size === size ? btnSize + "border-2 border-rose-400" : btnSize + "border-2 border-[#eeeeee]"} onClick={(e)=>{handleVariant(e,x.size,'size')}}>
                            {x.size}
                        </button>
                    </div>
                ): <></>}
            </div>
        </div>
    }

    
    const addItemsCart = async (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        e.preventDefault()
        setDisplayModal(!displayModal)

        const auth = getAuth();
        const user: any = auth.currentUser;

        //Update | Add UI
        let contextBody = MyCartItem.InitialObjMyCartItem()
        contextBody.id = myCartItems.length + 1 + ''
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
        // console.log("Body",contextBody)
        let newContext = myCartItems;
        newContext.push(contextBody)
        // console.log("Context",myCartItems)


        const permalinkRef = await collection(db,"productByPermarlink")
        const permaQuery = await query(permalinkRef, where("permalink", "==",dataDisplay[0].permalink)) 
        const querySnapshot = await getDocs(permaQuery);
        let stockId:any = localStorage.getItem('permalinkId')
        if(stockId === null || undefined){
            querySnapshot.forEach(x=> stockId = x.id)
        }else{
            querySnapshot.forEach(x=> stockId += ','+x.id)
        }
        localStorage.setItem('permalinkId',stockId)
        // console.log(stockId)

        //Update | Add UI
        let body = CartBody.initializeCartBody()
        body.id = user.email
        newContext.forEach((x,index)=> {
            let item = CartBody.initializeCartItemBody()
            item.id = index+1+''
            item.name = x.name
            item.skuCode = x.skuCode
            item.quantity = x.quantity
            item.permalink = x.permalink
            item.price = x.price
            body.items.push(item)
        } )

        addNewCartOrExistingCart(body , user.email)
    }
    

    return (<>
    <Navbar/>
        <div  className={ contentBodyStyle }>
        <div className="mx-[16px] lg:mx-[160px] mt-[110px] lg:flex justify-between">
            {/* Image Section */}
            <div className="relative w-full">
                <div>
                    <div className={"absolute right-10 top-10 " + discountStyle}>Sale</div>
                    { dataDisplay.length > 0 ? <img src={dataDisplay[0].imageUrls[0]} alt="" className={mainImage} />: <></>}
                </div>
                <div className={`flex justify-between `}>
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
            <div className="w-full pl-12">
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
                        Qty {stock > 0 ? stock : ''}
                    </div>
                    <select name="qty" className="w-[158px] w-[82px]" onChange={(e)=>{handleQty(e)}} id="">
                        {   
                            [...Array(10)].map((x,index) => {
                                if(index+1 <= stock) return <option >{index+1}</option>
                                if(index+1 > stock) return <option disabled>{index+1}</option>
                            } )
                        }
                    </select>
                </div>

                {/* Add Section */}
                <div className="text-red-600"> {validate} </div>
                {qty !==0 && color.length >0 && varaint.length > 0?
                    <button className="bg-black w-full text-white">
                        <div onClick={(e)=>{addItemsCart(e)}}>
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