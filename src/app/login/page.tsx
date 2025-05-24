"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function SignUpPage () {
    
    const router = useRouter();
    const [buttonDisable,setButtonDisable] = useState(true);
    
    const [user,setUser] = useState({
        email : "",
        password : ""
    })
    
    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisable(false)
        }else{
            setButtonDisable(true)
        }
    },[user])

    const onLogin = async () => {
        try {
             await axios.post("/api/users/login",user)
              toast.success("Login successful!");
              setTimeout(()=>{
                   router.push("/profile")
              },2000)
        } catch (error : any) {
             toast.error(error.message);
        }
    }

    return (

        <>
          <div className="flex flex-col items-center justify-center min-h-screen p-2">
             <h1>Login</h1>
             <hr />
             
             <label htmlFor="email">email</label> 
             <input type="text" 
             id="email" className="bg-gray-800 p-2 rounded-lg mb-4" 
             placeholder="email" 
             value={user.email} 
             onChange={(e)=>{setUser({...user,email:e.target.value})}}/>
             
             <label htmlFor="password">password</label>
             <input type="text" 
             className="bg-gray-800 p-2 rounded-lg mb-4" 
             id="password" value={user.password} 
             onChange={(e)=>{setUser({...user,password : e.target.value})}} 
             placeholder="password"/>
             
             <button onClick={onLogin} className="border border-gray-300 rounded-lg mb-4 p-2">Login</button> 
             <Link href="/signup">Visit Signup Page</Link>
          </div>
        </>
    )
}