"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { parse } from "path";
import axios from "axios";
import { useState } from "react";
import { usePathname } from "next/navigation";
export default function page(){



    const [account, setAccount] = useState("");
    const [date, setDate] = useState("");
    const [reason, setReason] = useState("");
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState(0);
    const [credit, setCredit] = useState(0);
    const [fetchResponse,setFetchResponse]=useState("")
    const data={
        amount:amount,
        reason:"test",
        date:date
    }
const pathname=usePathname()
const id=pathname.split("/")[3]
    const sendData=async (idAccount:any)=>{
        try{    
            const response=await axios.post(`http://localhost:8080/account/${id}/withdrawals`,data)

            console.log(response.data);
            setFetchResponse(response.data)
            if(response.data==="success")
            window.location.href = "/dashboard/accounts/"+id;
            
        }catch(error){
                console.error(error);
                
        };
        
    }
    return (
        <div>
            <div className='flex flex-col min-h-screen overflow-hidden'>
                <div className='w-full mx-auto bg-white lg:max-w-lg'>
                    <Card>
                        <div className='grid gap-4'>
                          
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
                                    Montant à retirer
                                </Label>
                                <Input
                                    id='amount'
                                    type='number'
                                    onChange={(e) =>
                                        setAmount(parseInt(e.target.value))
                                    }
                                />
                            </div>
                          
                        </div>
                        <Button onClick={()=>{sendData(account)}}>Valider</Button>
                        <div>
                            <p>{fetchResponse}</p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}