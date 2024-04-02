import { Link } from "react-router-dom";

export default function Navbar(){

    const categories = ['Home','Product','Product2']
    interface navProps{
    value: string[]
    }

    return (
    <>
        <div className="bg-black min-h-[50px] text-white">
            <div className="flex flex-inline justify-between ">
                <div>
                    <span className="flex inline-flex ml-2">
                        <Link to={`/`} >
                            Home
                        </Link>
                    </span>
                    {categories.length > 0 ? categories.filter(y=>y!=='Home').map( (x,id) =>
                        <span key={id} className="flex inline-flex ml-2">
                            <Link to={`/${x.toLocaleLowerCase()}`} >
                                {x}
                            </Link>
                        </span>
                        ):<></>}

                </div>

                <div>
                    {localStorage.getItem('userCredentail') !== null || localStorage.getItem('userCredentail') !== ''?
                        <Link to={"/login"}>
                            Log In
                        </Link>
                        :<button>
                            Log out
                        </button>

                    }
                </div>
            </div>
        </div>
    </>
    )
}