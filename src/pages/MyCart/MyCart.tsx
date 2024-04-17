import { useContext, useState } from "react";

import { MyCartItem, MyCartItemContextType } from "../../types/MyCartItem";
import { MyCartItemContext } from "../../components/context/MyCartItemContext";
import { VariantType, colorSet, colorCodeSet, sizeSet } from "../../types/ProductDetails";
import { CartBody } from "../../types/CartBody";
import { db } from "../../firebase";
import { addDoc, collection, deleteField, doc, setDoc, updateDoc } from "firebase/firestore";
import addNewCartOrExistingCart from "../../apiService/MyCartAPI";

export default function MyCart(){
    const { myCartItems, updateMyCartItem, updateSelectedCartItem } = useContext(MyCartItemContext) as MyCartItemContextType;
    
    const [color,setColor] = useState('')
    const [size,setSize] = useState('')
    const [qty,setQty] = useState(0)
    const [skuCodeCheck,setSkuCodeCheck] = useState('')


    function MainCard ( { children, cardStyle, width, title }:{ children: any , cardStyle: string, width: string, title: string}){
        return <>
            <div className={cardStyle + width}>
                <div className={title==="Summary" ? "fixed lg:w-[616px] ": ""}>

                    <div className="m-[24px] h-[32px]">
                        {title}
                    </div> 
                    {children}

                </div>
            </div>
        </>
    }

    function ItemCard ( { item}:{  item: MyCartItem} ){
        // console.log("item x",JSON.stringify(item))
        return <div key={item.skuCode}>
            <div className="mt-[24px] mb-[24px] max-h-[209px] max-w-[896px]">
                <div className=" lg:flex block">

                    <img src={item.img} className="w-[209px] h-[209px] object-cover" alt="" />

                    <div className="lg:ml-[40px] w-full ">
                        <div className="w-full h-[40px] flex justify-between">
                            <div>
                                {item.name} {color} {size}
                            </div>
                            <button onClick={()=>{handleDelete( item)}}>
                                Delete
                            </button>
                        </div>

                        <div className="relative flex w-full mt-[87px]">
                            {getColor(item.variants, item.skuCode, item.color, item.size, item.quantity)}
                            <div className="absolute bottom-0 right-0">
                                <h1 className="">THB { item.price * item.quantity}</h1>
                            </div>
                        </div>
                    </div>

            

                </div>
            </div>
            
            <hr className="mb-[24px]"/>
        </div>
    }

    function getColor(itemList: VariantType[], skuCode:string, colorTemp: string, sizeTemp: string, quantityTemp: number){

        let resultColor: colorSet[] = []
        const tempDataColor = [...new Set(itemList.map((x: { color: any })=> x.color )) ]
        tempDataColor.forEach(x=>
            resultColor.push( { "color": x } )
        )
      
        let resultColorCode: colorCodeSet[] = []
        const tempDataColorCode = [...new Set(itemList.map((x: { colorCode: any })=> x.colorCode )) ]
        tempDataColorCode.forEach(x=>
            resultColorCode.push( { "colorCode": x } )
        )     

        let resultSize: sizeSet[] = []
        const tempDataSize = [...new Set(itemList.map((x: { size: any })=> x.size )) ]
        tempDataSize.forEach(x=>{
            if(x.length >0){
                resultSize.push( { "size": x } )
            }
        }
        )

        const dropDownStyle = "w-full h-[54px] "

        return (
        <div className="flex w-full mx-auto"> 
            <div className="block lg:w-[139px] h-[82px] mr-[16px]">
                <label className="w-full h-[85px]">Color</label>
                <select  
                    onChange={(e)=>{handleVariant(e, skuCode, 'color')}} 
                    className={color.length > 0 && skuCodeCheck === skuCode ? dropDownStyle + "border-2 border-rose-300": dropDownStyle} 
                    value={colorTemp}
                >
                    { resultColor.map((x)=>{  return <option  value={x.color}>{x.color}</option> }) }  
                </select>
            </div>

            <div className="block lg:w-[139px] h-[82px] mr-[16px]">
                <label className="w-full h-[85px]">Size</label>
                <select 
                    onChange={(e)=>{handleVariant(e, skuCode, 'size')}} 
                    className={size.length > 0 && skuCodeCheck === skuCode ? dropDownStyle + "border-2 border-rose-300": dropDownStyle} 
                    value={sizeTemp}
                >
                    {resultSize.map((x)=>{  return <option  value={x.size}>{x.size}</option> } )} 
                </select>
            </div>

            <div className="block lg:w-[139px] h-[82px] mr-[16px]">
                                <label className="w-full h-[85px]">Qty</label>
                                <select 
                                    className={qty > 0 && skuCodeCheck === skuCode ? dropDownStyle + "border-2 border-rose-300": dropDownStyle} 
                                    onChange={(e)=>{handleQty(e, skuCode, 'qty')}} 
                                    value={quantityTemp}
                                >
                                    { [...Array(10)].map((x,index )=> { return <option value={index+1}>{index+1}</option>} )}
                                </select>
                            </div>
        </div>
        )
    }
    // type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
    type ChangeEvent = React.MouseEvent<HTMLOptionElement>;

    async function handleDelete( item: MyCartItem) {
        let filterItem = myCartItems.filter(x=>x.skuCode !== item.skuCode)
        let filterPermalink = filterItem[0].permalink
        let MyId  :any = localStorage.getItem("Id")
        // const mycartRef = doc(db,"myCart",MyId)
        // await updateDoc(mycartRef, {
        //     items: deleteField()
        // });

        await setDoc(doc(db, "myCart", MyId), {
            id: "user1" ,
            items: filterItem,
            permalink: filterPermalink
        });
        console.log(filterItem)
        updateMyCartItem(filterItem)
    }

    function handleVariant(e: ChangeEvent, skuCode: string, type: string) {
        e.preventDefault()
        const input = (e.target as HTMLInputElement).value
        updateSelectedCartItem(skuCode, input, type)
        // setSkuCodeCheck(skuCode)
        if( color.length > 0 && size.length > 0 || skuCodeCheck !== skuCode){
            resetSelect()
        }

        if(type==='size'){
            const sizeData = input;
            setSize(sizeData)
        }
        else if(type==='color'){
            const colorData = input;
            setColor(colorData)
        }
        
        function resetSelect(){
            setColor('')
            setSize('')
            setQty(0)
        }

    }

    function handleQty(e: ChangeEvent, skuCode: string, type: string ){
        e.preventDefault()

        // let tempData = varaint
        const getValue = (e.target as HTMLInputElement).value;
        updateSelectedCartItem(skuCode, getValue, type)

        // console.log(tempData)
        setQty(parseInt(getValue))
    }

    async function handleAddToCart(){
        console.log(myCartItems)
        let body = CartBody.initializeCartBody()
        body.id = 'user1'
        myCartItems.forEach((x,index)=> {
            let item = CartBody.initializeCartItemBody()
            item.id = index+1
            item.skuCode = x.skuCode
            item.quantity = x.quantity
            item.permalink = x.permalink
            item.price = x.price
            body.items.push(item)
        } )

        if(body.items.length > 0){
            // for(let i = 0; i < body.items.length; i ++){             
            console.log(body)
            addNewCartOrExistingCart(body)
        }
    }

    const btnSize = "w-full  "
    const bgColor = "border-2 border-rose-500 "
    const cardStyleInput = "bg-red-300 w-full min-h-[800px] "
    const itemAlert = "fixed inset-0 bg-red-100 opacity-100 "
    // const itemAlert = "fixed inset-0 bg-red-100 opacity-100 w-[900px] h-[200px] top-[60px] "

    return <>
        <div className={`lg:mx-[8.34%] mx-[0.834%]`}>
        
        <div className="lg:flex">
                <div className="w-full ml-[24px] my-auto ">
                    <div className="mt-[40px] mb-[40px]">
                        My cart
                    </div>
                </div>
        </div>
        <div className="lg:flex max-w-[1600px]">
            <MainCard cardStyle={cardStyleInput} width="lg:max-w-[944px] " title="Items">
                <div className="m-[24px] min-h-[490px] bg-white">
                    { 
                        myCartItems.length>0? myCartItems.map( (item,index)=>
                            <div key={index}>
                            <ItemCard item = {item} ></ItemCard>
{/* 
                                <div>{filterItem.map(x=>
                                    <div className={itemAlert}>{x.color}  {x.size}</div>
                                )}</div> */}

                            </div>
                        )
                        :<></>
                    }

                </div> 
            </MainCard>
            <MainCard cardStyle={cardStyleInput } width="lg:ml-[40px] lg:max-w-[616px] " title="Summary">
                <div className="m-[24px] mt-0 min-h-[420px] bg-white">
                    
                    {myCartItems.length > 0 ? myCartItems.map(x=>
                        <>
                            <div className="flex justify-between">
                                <div>
                                    {x.quantity> 1 ? x.name + " x " + x.quantity : x.name }
                                </div>
                                <div>
                                    {x.price * x.quantity}
                                </div>
                            </div>
  
                        </>
                    )
                    :<></>}

                    <div className="flex justify-between">
                        <div>
                            Subtotal 
                        </div>
                        <div>
                            {
                                myCartItems.length > 1 ? myCartItems.map(x=>x.price * x.quantity).reduce((a,c) => a + c,0) :
                                myCartItems.length === 1 ? myCartItems[0].price * myCartItems[0].quantity :
                                <></> 
                            } 
                        </div>
                    </div>
                    
                    <div className="flex justify-between">
                        <div>
                            Shipping Fee
                        </div>
                        <div>
                            Free
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div>
                            Grand Total
                        </div>
                        <div>
                        {
                                myCartItems.length > 1 ? myCartItems.map(x=>x.price * x.quantity).reduce((a,c) => a + c,0) :
                                myCartItems.length === 1 ? myCartItems[0].price * myCartItems[0].quantity :
                                <></> 
                            } 
                        </div>
                    </div>
                    <div>
                        <button className={btnSize + "bg-black text-white"} onClick={()=>{handleAddToCart()}}>Check Out</button>
                    </div>
                    <div>
                        <button className={btnSize + bgColor}>Continue Shopping</button>
                    </div>
                </div> 
            </MainCard>
        </div>

        </div>
    </>
}