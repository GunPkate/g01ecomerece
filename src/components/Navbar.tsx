import { Link } from "react-router-dom";
import { UserTokenContextType } from "../types/usertoken";
import { UserTokenContext } from "./context/UserTokenContext";
import { useContext } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { MyCartItemContextType } from "../types/MyCartItem";
import { MyCartItemContext } from "./context/MyCartItemContext";
import categories from '../skuData/categories.json'

export default function Navbar(){

    const { userTokens, updateUserToken } = useContext(UserTokenContext) as UserTokenContextType;
    const { myCartItems  } = useContext(MyCartItemContext) as MyCartItemContextType;
    
    // console.log("123",categories)
    const cart = `<svg width="40px" height="40px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#fcfcfc" d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>    `;

    
    async function handleLogOut() {
        try {
            updateUserToken('','')
            await signOut(auth);
        } catch (error) {
            console.log(error)
        }
    }

    return (
    <>
        <div className="bg-black h-[56px] lg:h-[60px] text-white ">
            <div className="flex flex-inline justify-between ">
                <div>
                    <span className="flex inline-flex ml-2">
                        <Link to={`/`} >
                            Home
                        </Link>
                    </span>
                    {categories.length > 0 ? categories.map( (x,id) =>
                        <span key={id} className="flex inline-flex ml-2">
                            <Link to={`/product/${x.name.toLocaleLowerCase()}`} >
                                {x.name}
                            </Link>
                        </span>
                        ):<></>}

                </div>

                <div className="flex">
                    {/* {userTokens[0].email.length } */}
                    {userTokens[0].email.length  === 0  ?
                        <><Link to={"/login"}>
                                Log In
                            </Link>
                            <>
                                <span> &nbsp; { userTokens[0].email }</span>
                                {/* <span> &nbsp; {userTokens.length > 0 ? userTokens[0].email : "x"}</span> */}
                            </>
                        </>
                        :<button onClick={()=>{ handleLogOut() }}>
                            Log out
                        </button>

                    }
                    <span>
                        <Link to={"/mycart"}>
                            <div dangerouslySetInnerHTML={{__html: cart}}></div>
                            <span>{myCartItems.length}</span>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    </>
    )
}