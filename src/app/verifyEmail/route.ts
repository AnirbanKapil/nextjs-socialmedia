"use client"

import axios from "axios"
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
        setToken(urlToken)
    },[])

    useEffect(()=>{
        if(token.length > 0){
            verifyEmail()
        }
    },[token])
}