"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { url } from "inspector";
const formSchema = z.object({
    clientName: z.string(),
    clientLastName: z.string(),
    birthdate: z.string(),
    monthlyNetIncome: z.string(),
    accountNumber:z.string(),

});

const NewAccountForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            clientName:"",
            clientLastName:"",
            birthdate:"",
            monthlyNetIncome:"",
            accountNumber:"",

        },
    });
 
    const createNewAccount=async (data:z.infer<typeof formSchema>)=>{
        const response=await axios.post("http://localhost:8080/account",data)
         console.log(response.data);
         
     }
   
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        createNewAccount(values);
        
        console.log(values);

        toast({
            title: "You submitted the following values:",
            description: (
                <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
                    <code className='text-white'>
                        {JSON.stringify(values, null, 2)}
                    </code>
                </pre>
            ),
        });
    }

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-4'
                >
                    <FormField
                        control={form.control}
                        name='clientName'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First name</FormLabel>
                                <FormControl>
                                    <Input
                                        type='text'
                                        placeholder='John'
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='clientLastName'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last name</FormLabel>
                                <FormControl>
                                    <Input
                                        type='text'
                                        placeholder='Doe'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='birthdate'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date of birth</FormLabel>
                                <FormControl>
                                    <Input
                                        type='date'
                                        placeholder='Doe'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='monthlyNetIncome'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Salary</FormLabel>
                                <FormControl>
                                    <Input
                                        type='number'
                                        placeholder='0'
                                        {...field}
                                        
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='accountNumber'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Account ID</FormLabel>
                                <FormControl>
                                    <Input
                                        type='text'
                                        placeholder='0'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <br />

                    <Button type='submit' className='px-10'>
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default NewAccountForm;
