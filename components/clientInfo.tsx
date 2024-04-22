"use client"
import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog } from "@radix-ui/react-dialog"
import axios from "axios"
import React, { useEffect } from "react"
import { useState } from "react"

const ClientInfo=()=>{
    const [user,setUser]=useState({idClient:"",firstName:'',lastName:"",birthdate:"",monthlyNetSalary:0})
    const [id,setId]=useState('')
    const [refresh,setRefresh]=useState(false)
   
    const getClient=async ()=>{
        const response=await axios.get("http://localhost:8080/client/d6430dd9-46e0-475c-91b6-f66bd26d9bcd")
        setUser(response.data)
    }
    useEffect(()=>{
        getClient()
    },[refresh])
    const updateClient=async()=>{
      const response=  await axios.put(`http://localhost:8080/client/${user.idClient}`,user)
      if(response.status===200)
      setRefresh(!refresh)
    }
    const handleInputChange=(e: { target: { name: any; value: any } })=>{
        const {name,value}=e.target
        setUser({...user,[name]:value})
    }
    return(
        <div>
            <div className="mx-auto border rounded-sm p-2 flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                    <span>First name:</span>
                    <span>{user.firstName}</span>
                </div>
                <div className="flex flex-row gap-2">
                    <span>Last name:</span>
                    <span>{user.lastName}</span>
                </div>
                <div className="flex flex-row gap-2">
                    <span>Birthdate:</span>
                    <span>{user.birthdate}</span>
                </div>
                <div className="flex flex-row gap-2">
                    <span>Monthly net salary:</span>
                    <span>{user.monthlyNetSalary}</span>
                </div>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="ml-56 mt-4">Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 ">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                First name
                            </Label>
                            <Input id="firstname" name="firstName" value={user.firstName} className="col-span-3" onChange={handleInputChange}/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                    Last name
                            </Label>
                            <Input id="lastname" name="lastName" value={user.lastName} className="col-span-3" onChange={handleInputChange} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                    Monthly net salary
                            </Label>
                            <Input id="net income" name="monthlyNetSalary" value={user.monthlyNetSalary}  className="col-span-3" onChange={handleInputChange} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                    Birthdate
                            </Label>
                            <Input id="birthdate" value={user.birthdate} className="col-span-3" />
                        </div>
                    </div>
                <DialogFooter>
                    <DialogClose>
                        <Button type="submit" onClick={updateClient} >Save changes</Button>
                    </DialogClose>
                </DialogFooter>
                </DialogContent>
    </Dialog>
        </div>
    )
} 
export default ClientInfo;