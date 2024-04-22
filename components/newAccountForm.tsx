"use client";

import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
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
 accountName: z.string().nonempty(),
 
});
const calculateAge=(birthdate:Date)=>{
    const diff = Date.now() - birthdate.getTime();
    const age = new Date(diff);
    return Math.abs(age.getUTCFullYear()-1970);
 }

const NewAccountForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          accountName:"",
          
        },
    });
 
    const createNewAccount=async (data:z.infer<typeof formSchema>)=>{
        const accountData={
            idClient:"d6430dd9-46e0-475c-91b6-f66bd26d9bcd",
            accountName:data.accountName,
        }
        
        const response=await axios.post("http://localhost:8080/account",accountData)
         console.log(response.data);
         if(response.status===200){
            window.location.href = "/dashboard/accounts";
         }

         
     }
     
   
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        createNewAccount(values);
    
       // console.log(calculateAge(new Date(values.birthdate)));
        
        
        
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
                        name='accountName'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>account name</FormLabel>
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
                    {
                        /*
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
                        */
                    }

                  

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
