"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useState } from "react"


export default function SignUpPage () {
    
    const [user,setUser] = useState({
        email : "",
        username : "",
        password : ""
    })
    
    const onSignUp = async () => {
           
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
             
             <button onClick={onSignUp} className="border border-gray-300 rounded-lg mb-4 p-2">SignUp</button> 
             <Link href="/login">Visit SignIn Page</Link>
          </div>
        </>
    )
}