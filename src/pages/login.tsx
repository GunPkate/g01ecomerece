import React, { useState } from "react"
import { auth } from "../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { FirebaseError } from "firebase/app"

interface User  {
    user: string,
    password: string,
}

type InputEvent = React.ChangeEvent<HTMLInputElement>;
type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

export default function Login(){

    const [user,setUser] = useState('')
    const [password,setPassword] = useState('')
    const [validate,setValidate] = useState('')

    const handleRegister = async (e: ButtonEvent): Promise<void> =>{
        e.preventDefault();
        let userbody: User = {user:'', password: ''}
        userbody.user = user;
        userbody.password = password;
        console.log(userbody)

        try {
            const userCredentail: any =  await createUserWithEmailAndPassword(auth, userbody.user, userbody.password)
            console.log('userCredentail',userCredentail)
            if(userCredentail.accessToken){
                setValidate('');
            }
        } catch (error :unknown) {
            if(error instanceof FirebaseError){
                console.log('error',error.code)
                setValidate(error.code)
            }
        }
    }

    const handleLogin = (e: ButtonEvent) => {
        e.preventDefault();
    }
    return (<>
        <div className="min-h-[90vh] flex justify-center">
        <div className=" bg-blue-300 rounded-lg my-auto min-h-[60vh] min-w-[60vw] flex justify-center">
            <form className="min-h-[100%] mt-10 mx-auto" action="">
                <h1 className="text-center">
                    Member Login
                </h1>
                <h1 className="text-red-400">{validate}</h1>
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

                <button className="rounded-full bg-success w-full py-2" onClick={(e)=>{handleRegister(e)}}>Sign up</button>
            </form>
        </div>
        </div>
    </>)
}