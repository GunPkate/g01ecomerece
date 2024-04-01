import { useState } from "react"

export default function Login(){

    const [user,setUser] = useState('')
    const [password,setPassword] = useState('')

    const handleLogin = (e) =>{
        e.preventDefault();
        console.log(user,password)
    }
    return (<>
        <div className="min-h-[90vh] flex justify-center">
            <form className="my-auto mx-auto" action="">
                <div>
                    <label>
                        Username
                    </label>
                    <input className="ml-2" type="text" name="user" placeholder="user" value={user} onChange={(e)=>{setUser(e.target.value)}}/>
                </div>

                <div>
                    <label>
                        Password
                    </label>
                    <input className="ml-2" type="text" name="password" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>

                <div>
                    <span>
                        Forgot password
                    </span>
                    <button className="button">
                        Sign up
                    </button>
                </div>
                {/* <button type="submit" >Login</button> */}
                <button onClick={(e)=>{handleLogin(e)}}>Login</button>
            </form>
        </div>
    </>)
}