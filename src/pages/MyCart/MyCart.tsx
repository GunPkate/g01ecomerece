import { useContext, useState } from "react";

import { MyCartItem, MyCartItemContextType } from "../../types/MyCartItem";
import { MyCartItemContext } from "../../components/context/MyCartItemContext";
import { VariantType, colorSet, colorCodeSet, sizeSet } from "../../types/ProductDetails";

export default function MyCart(){
    const { myCartItems, updateMyCartItem, updateSelectedCartItem } = useContext(MyCartItemContext) as MyCartItemContextType;

    const [varaint,setVariant] = useState<Array<VariantType>>([])
    const [filterItem,setFilterItem] = useState<Array<VariantType>>([])
    
    const [color,setColor] = useState('')
    const [size,setSize] = useState('')
    const [qty,setQty] = useState(0)
    const [skuCodeCheck,setSkuCodeCheck] = useState('')
    const [validate,setValidate] = useState('')

    function MainCard ( { children, cardStyle, width, title }:{ children: any , cardStyle: string, width: string, title: string}){
        return <>
            <div className={cardStyle + width}>
                <div className="m-[24px] h-[32px]">
                    {title}
                </div> 
                {children}
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

        const btnSize = "w-[100px] h-[82px] "
        const bgColor = "w-[54px] h-[54px] ml-auto mr-auto "
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

    function handleDelete( item: MyCartItem) {
        let filterItem = myCartItems.filter(x=>x.skuCode !== item.skuCode)
        console.log(filterItem)
        updateMyCartItem(filterItem)
    }

    function handleVariant(e: ChangeEvent, skuCode: string, type: string) {
        e.preventDefault()
        const input = (e.target as HTMLInputElement).value
        updateSelectedCartItem(skuCode, input, type)
        setSkuCodeCheck(skuCode)
        if(varaint.length === 1 && color.length > 0 && size.length > 0 || skuCodeCheck !== skuCode){
            resetSelect()
        }
        console.log(myCartItems[0].variants )
        let resetFilter: VariantType[] = myCartItems[0].variants 
        let firstFilter: VariantType[] = []
        filterItem.length > 0 ? firstFilter = filterItem  : firstFilter = resetFilter


        if(type==='size'){
            const sizeData = input;
            setSize(sizeData)
            firstFilter = firstFilter.filter(x=>x.size === sizeData)
            // setValidate(firstFilter.map(x=>x.size).join())
        }
        else if(type==='color'){
            const colorData = input;
            setColor(colorData)
            firstFilter = firstFilter.filter(x=>x.color === colorData)
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
                console.log('secondFilter')
                console.log(secondFilter)
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

        console.log('firstFilter')
        console.log(firstFilter)

    }

    function handleQty(e: ChangeEvent, skuCode: string, type: string ){
        e.preventDefault()

        // let tempData = varaint
        const getValue = (e.target as HTMLInputElement).value;
        updateSelectedCartItem(skuCode, getValue, type)

        // console.log(tempData)
        setQty(parseInt(getValue))
    }

    const cardStyleInput = "bg-red-300 w-full min-h-[800px] "
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
                            </div>
                        )
                        :<></>
                    }

                </div> 
            </MainCard>
            <MainCard cardStyle={cardStyleInput} width="lg:ml-[40px] lg:max-w-[616px] " title="Summary">
                <div className="m-[24px] min-h-[420px] bg-white">
                    123
                </div> 
            </MainCard>
        </div>

        </div>
    </>
}