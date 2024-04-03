import { Link } from "react-router-dom";
import { UserTokenContextType } from "../types/usertoken";
import { UserTokenContext } from "./context/UserTokenContext";
import { useContext } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";


export default function Navbar(){

    const { userTokens, updateUserToken } = useContext(UserTokenContext) as UserTokenContextType;
    
    const categories = ['Home','Product','Product2']
    interface navProps{
    value: string[]
    }

    
    async function handleLogOut() {
        try {
            updateUserToken('','')
            const userLogOut = await signOut(auth);
        } catch (error) {
            console.log(error)
        }
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
                </div>
            </div>
        </div>
    </>
    )
}