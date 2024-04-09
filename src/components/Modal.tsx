export default function Modal ({display = false ,onClose, dataDisplay, qty }: {display: boolean, onClose: any, dataDisplay:any,  qty: number}){

    const buttonStyle = "w-[49%] border-2 border-[#eeeeee] "

    return <div className={display === true ? "visible" : "invisible"}>
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="bg-white rounded-xl w-[46.9%]  mx-auto mt-60">
                    <div>

                        <div className="p-6 pb-0 flex justify-between">
                            <div>
                                Item added to your cart
                            </div>
                            <div>
                                <button onClick={()=>{onClose(false)}}>
                                X
                                </button>
                            </div>
                        </div>

                        <div className="flex m-6">
                            <img src={dataDisplay[0].imageUrls[0]} className="object-fit w-[160px] h-[160px]" alt="" />

                            <div className="flex justify-between w-full my-auto ml-[40px]">
                                <div> {dataDisplay[0].name} 
                                    <div> QTY: {qty}  </div>
                                </div>
                                <div> {dataDisplay[0].price * qty} THB </div>
                            </div>
                        </div>

                        <div className="flex justify-between w-full p-6 pt-0">
                            <button className={buttonStyle + "bg-black text-white "}>View Cart</button>
                            <button className={buttonStyle }>Continue Shopping</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>

    </div>
}
