import { Link } from "react-router-dom"

export default function Navbar(){

    const categories = ['Home','Product','Product2']
    interface navProps{
    value: string[]
    }

    return (
    <>
        <div className="bg-black min-h-[50px] text-white">
        <span className="flex inline-flex ml-2">
            <a href={`/`} >
                Home
            </a>
        </span>
        {categories.length > 0 ? categories.filter(y=>y!=='Home').map( (x,id) =>
            <span key={id} className="flex inline-flex ml-2">
                <a href={`/${x.toLocaleLowerCase()}`} >
                    {x}
                </a>
            </span>
            ):<></>}
        </div>
    </>
    )
}