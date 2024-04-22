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
import { useToast } from "./ui/use-toast";
  import axios from "axios";
import categoryList from "./categoryData";
import { ToastAction } from "./ui/toast";
type account={
    id:number;
    name:string;
    balance:number;
    credit:number;

}




const SupplyAccountForm = () => {
    const [account, setAccount] = useState(0);
    const [date, setDate] = useState("");
    const [reason, setReason] = useState("");
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState(0);
    const [credit, setCredit] = useState(0);
    const [accounts,setAccounts]=useState<account[]>()
    const [idCategory,setIdCategory]=useState<number>()
    const [fetchResponse,setFetchResponse]=useState()


   
    const data={
        "recipientAccount":account,
        "effectiveDate":date,
        "amount":amount,

        "reason":reason,
        "idCategory":idCategory
    }
React.useEffect(()=>{
const savedAccounts= localStorage.getItem("accounts")

if(savedAccounts)
    setAccounts(JSON.parse(savedAccounts))

    console.log(account);
    
    

},[])

    const sendData=async ()=>{
        try{    
            const response=await axios.post(`http://localhost:8080/account/supply`,data)

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
                        <div className='grid gap-2'>    
                        </div>
                        <div className='grid gap-2'>
                            <Label>recipient account</Label>
                            <select name="account" id="account"
                            onChange={(e)=>setAccount(Number(e.target.value))}
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
                            <Label htmlFor='time'>Reason</Label>
                            <Input
                                id='text'
                                type='text'
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor='time'>effective date</Label>
                            <Input
                                id='text'
                                type='date'
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                       
                       
                        
                        <div className='grid gap-2'>
                            <Label htmlFor='amount'>
                                amount
                            </Label>
                            <Input
                                id='amount'
                                type='number'
                                onChange={(e) =>
                                    setAmount(parseInt(e.target.value))
                                }
                            />
                        </div>
                        
                       
                        <div className='grid gap-2'>
                            <Label>Category</Label>
                            <select name="" id="" onChange={e=>setIdCategory(Number(e.target.value))}  className="bg-transparent border outline-none rounded-sm h-10" >
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

export default SupplyAccountForm;
