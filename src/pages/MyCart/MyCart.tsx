import { useContext } from "react";

import { MyCartItem, MyCartItemContextType } from "../../types/MyCartItem";
import { MyCartItemContext } from "../../components/context/MyCartItemContext";

export default function MyCart(){
    const { myCartItems, updateMyCartItem } = useContext(MyCartItemContext) as MyCartItemContextType;

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
        console.log("item x",item)
        return <>
            <div className="mt-[24px] mb-[24px] max-h-[209px] max-w-[896px]">
                <div className=" lg:flex block">

                    <img src={item.img} className="w-[209px] h-[209px] object-cover" alt="" />

                    <div className="lg:ml-[40px] w-full ">
                        <div className="w-full h-[40px] flex justify-between">
                            <div>
                                {item.name}
                            </div>
                            <button onClick={(e)=>{handleDelete(e, item)}}>
                                Delete
                            </button>
                        </div>

                        <div className="relative flex w-full mt-[87px]">
                            <div className="block lg:w-[139px] h-[82px] mr-[16px]">
                                <label className="w-full h-[85px]">Color</label>
                                <select className=" w-full h-[54px]">
                                    <option>{item.color}</option>
                                    {/* <option>2</option> */}
                                </select>
                            </div>
                            <div className="block lg:w-[139px] h-[82px] mr-[16px]">
                                <label className="w-full h-[85px]">Size</label>
                                <select className=" w-full h-[54px]">
                                    <option>{item.size}</option>
                                    {/* <option>2</option> */}
                                </select>
                            </div>
                            <div className="block lg:w-[139px] h-[82px] mr-[16px]">
                                <label className="w-full h-[85px]">Qty</label>
                                <select className=" w-full h-[54px]">
                                    <option>{item.quantity}</option>
                                    {/* <option>2</option> */}
                                </select>
                            </div>
      
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
    type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

    function handleDelete( e: ButtonEvent, item: MyCartItem) {
        let filterItem = myCartItems.filter(x=>x.skuCode !== item.skuCode)
        console.log(filterItem)
        updateMyCartItem(filterItem)
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