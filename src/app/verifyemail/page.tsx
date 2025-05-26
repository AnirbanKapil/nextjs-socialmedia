"use client"

import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"


export default  function VerifyEmail () {
    const [token,setToken] = useState("")
    const [error,setError] = useState(false)
    const [verified,setVerified] = useState(false)

    const verifyEmail = async () => {
        try {
          await axios.post("/api/users/verifyEmail",{token})  
          setVerified(true)
        } catch (error : any) {
            setError(true)
            throw new Error(error.message)
        }
    }

    useEffect(()=>{
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")
    },[])

    useEffect(()=>{
        if(token.length > 0){
            verifyEmail()
        }
    },[token])

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-2">
           <h1 className="text-4xl">Verify Email</h1>
           <h2 className="bg-amber-800 font-extrabold p-2 m-2">{token ? `${token}` : "No Token"}</h2>
           {verified && (
            <div>
                <h2 className="text-2xl text-blue-600">Email Verified</h2>
                <Link href="/login" className="text-amber-600">Login</Link>
             </div>
           )}
           {error && (
            <div>
                <h2 className="text-2xl bg-red-700  text-yellow-500 ">Error</h2>
             
             </div>
           )}
        </div>
    )
        

    
}