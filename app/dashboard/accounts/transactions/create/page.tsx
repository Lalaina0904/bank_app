"use client";

import * as React from "react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { parse } from "path";
import axios from "axios";

const Page = () => {
    const [account, setAccount] = useState("");
    const [date, setDate] = useState("");
    const [reason, setReason] = useState("");
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState(0);
    const [credit, setCredit] = useState(0);

    const handleSubmit = () => {
        console.log(account, date, amount, balance, credit);
        fetch("http://localhost:3000/api/transactions/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                account: account,
                date: date,
                amount: amount,
                balance: balance,
                credit: credit,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            });
    };
    const data = {
        amount: amount,
        reason: "test",
        date: date,
    };

    /*const sendData=async (idAccount:any)=>{
        try{    
            const response=await axios.post(`http://localhost:8080/account/${idAccount}/withdrawals`,data)

            console.log(response.data);
            
        }catch(error){
                console.error(error);
                
        };
        
    }*/
    return (
        <div>
            <div>
                <div className='w-full mx-auto bg-white lg:max-w-lg'>
                    <div className='grid gap-4'>
                        <div className='grid gap-2'>
                            <Label htmlFor='account'>Compte</Label>
                            <Input
                                id='account'
                                type='text'
                                placeholder='Sélectionnez un compte'
                                onChange={(e) => setAccount(e.target.value)}
                            />
                        </div>
                        {/*
                                  <div className='grid gap-2'>
                                <Label htmlFor='date'>Date</Label>
                                <Input
                                    id='date'
                                    type='date'
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                                 */}
                        <div className='grid gap-2'>
                            <Label htmlFor='time'>Reason</Label>
                            <Input
                                id='text'
                                type='text'
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </div>
                        <div className='grid gap-2'>
                            <Label htmlFor='amount'>Montant à retirer</Label>
                            <Input
                                id='amount'
                                type='number'
                                onChange={(e) =>
                                    setAmount(parseInt(e.target.value))
                                }
                            />
                        </div>
                        {/* <div className='grid gap-2'>
                                <Label htmlFor='balance'>Solde</Label>
                                <Input
                                    id='balance'
                                    type='number'
                                    onChange={(e) =>
                                        setBalance(parseInt(e.target.value))
                                    }
                                />
                            </div>*/}
                        {/*<div className='grid gap-2'>
                                <Label htmlFor='credit'>Crédit autorisé</Label>
                                <Input
                                    id='credit'
                                    type='number'
                                    onChange={(e) =>
                                        setCredit(parseInt(e.target.value))
                                    }
                                />
                                </div>*/}
                    </div>
                    <Button onClick={handleSubmit} className='mt-6'>
                        Valider
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Page;
