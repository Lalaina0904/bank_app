"use client"
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const page=()=>{
    const [interestRate,setInterestRate]=useState({first7days:0,after7days:0})
    const [accounts,setAccounts]=useState<any[]>()
    const getInterestRate=async()=>{
        const response=await axios.get("http://localhost:8080/interestRate")
        setInterestRate({first7days:response.data.first7days,after7days:response.data.after7days})
    }
    const updateInterestRate=async()=>{
        const response=await axios.put("http://localhost:8080/interestRate",interestRate)
        if(response.status==200)
        window.location.href="/admin"

    }
    const getAccountsList=async()=>{
        const response=await axios.get("http://localhost:8080/accounts/d6430dd9-46e0-475c-91b6-f66bd26d9bcd")
        setAccounts(response.data)
        console.log(response.data)
    
    }
    const updateEligibility=async(accountNumber:string)=>{
        const accountToUpdate = accounts?.find((account: any) => account.accountNumber === accountNumber);

        const response=await axios.put(`http://localhost:8080/account/${accountNumber}/eligibility?isEligible=${!accountToUpdate.isEligible}`)
        
       
        const newEligibility = !accountToUpdate.isEligible;

    // Update the account in the state
    setAccounts(accounts?.map((account: any) => 
        account.accountNumber === accountNumber ? { ...account, isEligible: newEligibility } : account
    ));

       
    
    }
    useEffect(()=>{
        getInterestRate()
        getAccountsList()
    },[])
    const handleInputChange=(e: { target: { name: any; value: any } })=>{
        const {name,value}=e.target
        setInterestRate({...interestRate,[name]:value})
    }
    return(
        <div className="grid grid-cols-2 gap-3 items-center justify-center">
          
           <div className="flex flex-row items-center gap-2 justify-center">
             <div className="border rounded-lg w-56 flex flex-col gap-1 items-center justify-center">
                <div className="text-xl">Interst Rate</div>
                <div className="flex flex-row gap-1">
                    <span>first seven days:</span>
                    <span>{interestRate.first7days}%</span>
                </div>
                <div className="flex flex-row gap-1">
                    <span>after seven days:</span>
                    <span>{interestRate.after7days}%</span>
                </div>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Edit</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit</DialogTitle>
                        <DialogDescription>
                        Make changes to the interest rate
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label>first seven days</Label>
                            <Input value={interestRate.first7days} name="first7days" onChange={handleInputChange}></Input>
                        </div>
                        <div>
                            <Label>after seven days</Label>
                            <Input value={interestRate.after7days} name="after7days" onChange={handleInputChange}></Input>
                        </div>
                    </div>
                <DialogFooter>
                    <Button type="submit"  onClick={updateInterestRate}>Save changes</Button>
                </DialogFooter>
                </DialogContent>
            </Dialog>
           </div>
           <div>
            <div className="my-6"><Input type="search m-6" placeholder="search "></Input></div>
              {
                accounts?.map((account:any)=>(
                    <div className="border rounded-sm my-2">
                        <div>
                            <span>account number:</span>
                            <span>{account.accountNumber}</span>
                        </div>
                        <div>
                            <span>account name:</span>
                            <span>{account.accountName}</span>
                        </div>
                        <div className="flex flex-row gap-1">
                            <div>
                                <span>status:</span>
                                <span>{account.isEligible?"eligible":"not-eligible"}</span>
                            </div>
                            <AlertDialog>
                                <AlertDialogTrigger><div className="text-lg"><Pencil/></div></AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you  sure?</AlertDialogTitle>
                                                 <AlertDialogDescription>
                                                        This action change the eligibility of this account
                                                 </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => updateEligibility(account.accountNumber)}>Confirm</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                            </AlertDialog>

                        </div>
                    </div>
                ))
              }
           </div>
          
        </div>
    )
}
export default page;