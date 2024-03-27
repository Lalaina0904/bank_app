"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { parse } from "path";
import axios from "axios";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
    reason: z.string(),
    amount: z.number().min(0, "Amount must be greater than 0"),
});

export default function page() {
    const [account, setAccount] = useState("");
    const [date, setDate] = useState("");
    const [reason, setReason] = useState("");
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState(0);
    const [credit, setCredit] = useState(0);
    const [fetchResponse, setFetchResponse] = useState("");
    const data = {
        amount: amount,
        reason: "test",
        date: date,
    };
    const pathname = usePathname();
    const id = pathname.split("/")[3];
    const sendData = async (idAccount: any) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/account/${id}/withdrawals`,
                data
            );

            console.log(response.data);
            setFetchResponse(response.data);
            if (response.data === "success")
                window.location.href = "/dashboard/accounts/" + id;
        } catch (error) {
            console.error(error);
        }
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            reason: "",
            amount: 0,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }
    return (
        <div className='container mx-auto'>
            {/* <div className='flex flex-col min-h-screen overflow-hidden'>
                <div className='w-full mx-auto bg-white lg:max-w-lg'>
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
                            <Label htmlFor='amount'>Montant à retirer</Label>
                            <Input
                                id='amount'
                                type='number'
                                onChange={(e) =>
                                    setAmount(parseInt(e.target.value))
                                }
                            />
                        </div>
                    </div>

                    <Button
                        onClick={() => {
                            sendData(account);
                        }}
                        className='mt-6'>
                        Submit
                    </Button>

                    <div>
                        <p>{fetchResponse}</p>
                    </div>
                </div>
            </div> */}

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-8'>
                    <FormField
                        control={form.control}
                        name='reason'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Reason</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Reason of the transaction '
                                        type='text'
                                        onChange={(e) =>
                                            setReason(e.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='amount'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Amount to withdraw'
                                        type='number'
                                        onChange={(e) =>
                                            setAmount(parseInt(e.target.value))
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type='submit'
                        onClick={() => {
                            sendData(account);
                        }}>
                        Submit
                    </Button>

                    <div>
                        <p>{fetchResponse}</p>
                    </div>
                </form>
            </Form>
        </div>
    );
}
