import { useState } from "react"

interface User  {
    user: string,
    password: string,
}

export default function Login(){

    const [user,setUser] = useState('')
    const [password,setPassword] = useState('')

    const handleLogin = (e) =>{
        e.preventDefault();
        let userbody: User = {user:'', password: ''}
        userbody.user = user;
        userbody.password = password;
        console.log(userbody)
    }
    return (<>
        <div className="min-h-[90vh] flex justify-center">
        <div className=" bg-blue-300 rounded-lg my-auto min-h-[60vh] min-w-[60vw] flex justify-center">
            <form className="min-h-[100%] mt-10 mx-auto" action="">
                <h1 className="text-center">
                    Member Login
                </h1>
                <div className="bg-zinc-300 rounded-full py-2 pl-2">

                    {/* <label>
                        Username
                    </label> */}
                    <input className=" ml-2 bg-transparent outline-none" type="text" name="user" placeholder="Username" value={user} onChange={(e)=>{setUser(e.target.value)}}/>
                </div>

                <div className="bg-zinc-300 rounded-full py-2 pl-2">
                    {/* <label>
                        Password
                    </label> */}
                    <input className="full ml-2 bg-transparent outline-none" type="text" name="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>

                <button className="rounded-full bg-success w-full py-2" onClick={(e)=>{handleLogin(e)}}>Login</button>
                <div>
                    <span>
                        Forgot password
                    </span>
      
                </div>

                <button className="rounded-full bg-success w-full py-2" onClick={(e)=>{handleLogin(e)}}>Sign up</button>
            </form>
        </div>
        </div>
    </>)
}