export default function MyCart(){

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

    function ItemCard ( {name}:{ name:string} ){
        return <>
            <div className="mt-[24px] mb-[24px] max-h-[209px] max-w-[896px]">
                <div className=" lg:flex block">

                    <img src="https://picsum.photos/300/300.webp" className="w-[209px] h-[209px] object-cover" alt="" />

                    <div className="lg:ml-[40px] w-full ">
                        <div className="w-full h-[40px] flex justify-between">
                            <div>
                                {name}
                            </div>
                            <button>
                                Delete
                            </button>
                        </div>

                        <div className="relative flex w-full mt-[87px]">
                            <div className="block lg:w-[139px] h-[82px] mr-[16px]">
                                <label className="w-full h-[85px]">Color</label>
                                <select className=" w-full h-[54px]">
                                    <option>1</option>
                                    <option>2</option>
                                </select>
                            </div>
                            <div className="block lg:w-[139px] h-[82px] mr-[16px]">
                                <label className="w-full h-[85px]">Size</label>
                                <select className=" w-full h-[54px]">
                                    <option>1</option>
                                    <option>2</option>
                                </select>
                            </div>
                            <div className="block lg:w-[139px] h-[82px] mr-[16px]">
                                <label className="w-full h-[85px]">Qty</label>
                                <select className=" w-full h-[54px]">
                                    <option>1</option>
                                    <option>2</option>
                                </select>
                            </div>
      
                            <div className="absolute bottom-0 right-0">
                                <h1 className="">THB 2000</h1>
                            </div>
                        </div>
                    </div>

            

                </div>
            </div>
            
            <hr className="mb-[24px]"/>
        </>
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
                    <ItemCard name={"Item 1"}></ItemCard>
                    <ItemCard name={"Item 2"}></ItemCard>
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