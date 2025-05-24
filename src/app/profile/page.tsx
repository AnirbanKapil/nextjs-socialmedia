"use client"

import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

function Profilepage() {

  const router = useRouter()
  
  const [data,setData] = useState("")

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/currentUser")
    const userData = res.data.data._id
    console.log(userData)
    setData(userData)
  }
  
  const handleLogout = async () => {
         await axios.get("/api/users/logout")
         toast.success("Logout successful! Redirecting to Home Page...");
        setTimeout(()=>{
             router.push("/")  
        },2000)

  }

  return (
    <>
    <div className="flex flex-col justify-center items-center min-h-screen">
    <div>ProfilePage</div>
    <button className="bg-amber-800 rounded-lg p-2 m-2" onClick={handleLogout}>Logout</button>
    <h2 className="p-2 bg-green-500 rounded-3xl">{data === "" ? "" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
    <button className="bg-amber-800 rounded-lg p-2 m-2" onClick={getUserDetails}>Get User</button>
    </div>
    </>
  )
}

export default Profilepage