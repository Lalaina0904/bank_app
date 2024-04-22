"use client";

import * as React from "react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { parse } from "path";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import axios from "axios";
import categoryList from "./categoryData";

type account={
    id:number;
    name:string;
    balance:number;
    credit:number;

}




const ScheduledTransfertForm = () => {
    const [account, setAccount] = useState("");
    const [date, setDate] = useState("");
    const [reason, setReason] = useState("");
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState(0);
    const [credit, setCredit] = useState(0);
    const [accounts,setAccounts]=useState<account[]>()
    const [idCategory,setIdCategory]=useState<string>()
    const [fetchResponse,setFetchResponse]=useState()
    const [recipientAccount,setRecipientAccount]=useState("")


    const data={
        reason:reason,
        amount:amount,
        senderAccount:account,
        category:idCategory,
        recipientAccount:recipientAccount,
        effectiveDate:date

    }
React.useEffect(()=>{
const savedAccounts= localStorage.getItem("accounts")

if(savedAccounts)
    setAccounts(JSON.parse(savedAccounts))

    console.log(account);
    

},[])
    const sendData=async ()=>{
        try{    
            const response=await axios.post(`http://localhost:8080/transfert/scheduled`,data)

            console.log(response.data);
            setFetchResponse(response.data)
            console.log(data);
            
            console.log(idCategory);

            
        }catch(error){
                console.error(error);
                
        };
        
    }
    return (
        <div>
        <div className='flex overflow-hidden'>
            <div className='w-full mx-auto lg:max-w-lg'>
                <Card>
                    <div className='grid gap-4'>
                        
                       
                      <div className="grid grid-cols-2 gap-2">

                      <div className='grid gap-2'>
                            <Label>Account Number</Label>
                            <select name="account" id="account"
                            onChange={(e)=>setAccount(e.target.value)}
                             className="bg-transparent border outline-none rounded-sm h-10"
                             >
                                <option value="" disabled selected>select an account ...</option>
                                {
                                    accounts?.map((account)=>(
                                        <option value={account.id} className="text-black" >{`${account.id}(${account.name})`}
                                                                    </option>
                                    ))
                                 }
                            </select>
                        </div>
                        <div className='grid gap-2'>
                            <Label>Account recipient</Label>
                            <select name="account" id="account"
                            onChange={(e)=>setRecipientAccount(e.target.value)}
                             className="bg-transparent border outline-none rounded-sm h-10"
                             >
                            <option value={"0022"}>external</option>

                            </select>
                        </div>
                      </div>
                        <div className="grid gap-2">
                                <Label>Effective Date</Label>
                                <Input
                                    type="date"
                                    onChange={(e) => setDate(e.target.value)}
                                />
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor='time'>Reason</Label>
                            <Input
                                id='text'
                                type='text'
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </div>
                       
                        
                        <div className='grid gap-2'>
                            <Label htmlFor='amount'>
                                amount to transfer
                            </Label>
                            <Input
                                id='amount'
                                type='number'
                                onChange={(e) =>
                                    setAmount(parseInt(e.target.value))
                                }
                            />
                        </div>
                        <div>
                    
                        </div>
                       
                        <div className='grid gap-2'>
                            <Label>Category</Label>
                            <select name="" id="" onChange={e=>setIdCategory(e.target.value)}  className="bg-transparent border outline-none rounded-sm h-10" >
                                {
                                    categoryList.map((category)=>(
                                        <option value={category.id}  className="text-black">
                                            {category.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                     
                    </div>

                    <Button onClick={sendData}>Valider</Button>
                    <div>{fetchResponse}</div>

                </Card>
            </div>
        </div>
    </div>
    );
};

export default ScheduledTransfertForm;
