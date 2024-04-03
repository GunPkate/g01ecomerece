export default function MyCart(){

    function Card ( { children ,cardStyle, margin }:{ children: any , cardStyle: string, margin: string}){
        return <>
            <div className={cardStyle + margin}>
             {children}
            </div>
        </>
    }
    return <>
        <div className="lg:flex ">
            <Card cardStyle={"bg-red-300 w-full min-h-[800px] "} margin={"ml-[16px]"} >
                <div className="text-center bg-white mx-auto my-auto">
                    Items
                </div>
                </Card>
            <Card cardStyle={"bg-sky-300 w-full min-h-[800px] "} margin={"mr-[16px]"} >
                <div className="text-center bg-white mx-auto my-auto">
                    Summary
                </div>
            </Card>
        </div>
    </>
}