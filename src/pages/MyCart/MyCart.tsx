import { useContext, useState } from "react";

import { MyCartItem, MyCartItemContextType } from "../../types/MyCartItem";
import { MyCartItemContext } from "../../components/context/MyCartItemContext";
import { VariantType, colorSet, colorCodeSet, sizeSet } from "../../types/ProductDetails";

export default function MyCart(){
    const { myCartItems, updateMyCartItem } = useContext(MyCartItemContext) as MyCartItemContextType;

    const [varaint,setVariant] = useState<Array<VariantType>>([])
    const [filterItem,setFilterItem] = useState<Array<VariantType>>([])
    
    const [color,setColor] = useState('')
    const [size,setSize] = useState('')
    const [qty,setQty] = useState(0)
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
        return <>
            <div className="mt-[24px] mb-[24px] max-h-[209px] max-w-[896px]">
                <div className=" lg:flex block">

                    <img src={item.img} className="w-[209px] h-[209px] object-cover" alt="" />

                    <div className="lg:ml-[40px] w-full ">
                        <div className="w-full h-[40px] flex justify-between">
                            <div>
                                {item.name} {color} {size}
                            </div>
                            <button onClick={(e)=>{handleDelete(e, item)}}>
                                Delete
                            </button>
                        </div>

                        <div className="relative flex w-full mt-[87px]">
                            {getColor(item.variants, item.color, item.size, item.quantity)}
                            <div className="absolute bottom-0 right-0">
                                <h1 className="">THB {item.price * item.quantity}</h1>
                            </div>
                        </div>
                    </div>

            

                </div>
            </div>
            
            <hr className="mb-[24px]"/>
        </>
    }

    function getColor(data: VariantType[], color: string, size: string, quantity: number){

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

        return (
        <div className="flex w-full mx-auto"> 
            <div className="block lg:w-[139px] h-[82px] mr-[16px]">
                <label className="w-full h-[85px]">Color</label>
                <select onChange={(e)=>{handleVariant(e,color,'color')}} className=" w-full h-[54px]">
                    {/* { resultColor.map((x)=>{ if(x.color === color) return <option  value={x.color}>{x.color}</option> }) } 
                    { resultColor.map((x)=>{ if(x.color !== color) return <option  value={x.color}>{x.color}</option> }) }  */}
                    { resultColor.map((x)=>{  return <option  value={x.color}>{x.color}</option> }) }  
                </select>
            </div>

            <div className="block lg:w-[139px] h-[82px] mr-[16px]">
                <label className="w-full h-[85px]">Size</label>
                <select onChange={(e)=>{handleVariant(e,size,'size')}} className=" w-full h-[54px]">
                    {/* {resultSize.map((x)=>{ if(x.size === size) return <option  value={x.size}>{x.size}</option> } )}
                    {resultSize.map((x)=>{ if(x.size !== size ) return <option  value={x.size}>{x.size}</option> } )} */}
                    {resultSize.map((x)=>{  return <option  value={x.size}>{x.size}</option> } )} 
                </select>
            </div>

            <div className="block lg:w-[139px] h-[82px] mr-[16px]">
                                <label className="w-full h-[85px]">Qty</label>
                                <select className=" w-full h-[54px]">
                                    {qty===0 ? <option onChange={(e)=>{handleQty(e,'qty')}}>{quantity}</option> : <></>}
                                    { [...Array(10)].map((x,index )=> { if(index+1 !== quantity) return <option value={index}>{index+1}</option>} )}
                                </select>
                            </div>
        </div>
        )
    }
    type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
    type ChangeEvent = React.MouseEvent<HTMLOptionElement>;

    function handleDelete( e: ButtonEvent, item: MyCartItem) {
        let filterItem = myCartItems.filter(x=>x.skuCode !== item.skuCode)
        console.log(filterItem)
        updateMyCartItem(filterItem)
    }

    function handleVariant(e: ChangeEvent, data:any,type: string) {
        e.preventDefault()
        if(varaint.length === 1 && color.length > 0 && size.length > 0){
            resetSelect()
        }
        console.log(myCartItems[0].variants )
        let resetFilter: VariantType[] = myCartItems[0].variants 
        let firstFilter: VariantType[] = []
        filterItem.length > 0 ? firstFilter = filterItem  : firstFilter = resetFilter


        if(type==='size'){
            const sizeData = e.target.value;
            setSize(sizeData)
            firstFilter = firstFilter.filter(x=>x.size === sizeData)
            // setValidate(firstFilter.map(x=>x.size).join())
        }
        else if(type==='color'){
            const colorData = e.target.value;
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

    function handleQty(e: ChangeEvent, name: string ){
        e.preventDefault()
        // let tempData = varaint
        const getValue = (e.target as HTMLInputElement).value;

        // console.log(tempData)
        setQty(parseInt(getValue))
    }

    function resetUI (){
        myCartItems
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
                        myCartItems.length>0? myCartItems.map( item=>
                            <ItemCard item = {item} ></ItemCard>
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