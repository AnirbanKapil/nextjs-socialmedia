"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"


export default function SignUpPage () {
    const router = useRouter()
    const [user,setUser] = useState({
        email : "",
        username : "",
        password : ""
    })
    
    const [buttonDisable , setButtonDisable] = useState(false)
    const [loading , setLoading] = useState(false)
    
    useEffect(()=>{
        if(user.email.length > 0 && user.username.length > 0 && user.password.length > 0){
            setButtonDisable(false)
        }else{
            setButtonDisable(true)
        }
    },[user])

    const onSignUp = async () => {
           try {
             await axios.post("/api/users/signup",user) 
             toast.success("Signup successful! Redirecting to login...");

             setTimeout(()=>{
                router.push("/login") 
             },2000)
              
           } catch (error : any) {
             toast.error(error.message);
             }
           }
  

    return (

        <>
          <div className="flex flex-col items-center justify-center min-h-screen p-2">
             
             <h1>Signup</h1>
             <hr />
             
             <label htmlFor="username">username</label>
             <input type="text"
              className="bg-gray-800 p-2 rounded-lg mb-4" id="username" 
              value={user.username} 
              onChange={(e)=>{setUser({...user,username : e.target.value})}} placeholder="username"/>
             
             <label htmlFor="email">email</label> 
             <input type="text" 
             id="email" className="bg-gray-800 p-2 rounded-lg mb-4" 
             placeholder="email" 
             value={user.email} 
             onChange={(e)=>{setUser({...user,email:e.target.value})}}/>
             
             <label htmlFor="username">password</label>
             <input type="text" 
             className="bg-gray-800 p-2 rounded-lg mb-4" 
             id="password" value={user.password} 
             onChange={(e)=>{setUser({...user,password : e.target.value})}} 
             placeholder="password"/>
             
             <button onClick={onSignUp} className="border border-gray-300 rounded-lg mb-4 p-2">{buttonDisable ? "no signup" : "signup"}</button> 
             <Link href="/login">Visit SignIn Page</Link>
          </div>
        </>
    )
}