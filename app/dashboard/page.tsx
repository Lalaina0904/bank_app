"use client";


import * as React from "react";
import {
    Briefcase,
    BookText,
    MessagesSquare,
    Search,
    LogOut,
    FileText,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { redirect } from "next/navigation";

import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Legend,
   } from "chart.js";
   import { BarChart, PieChart } from "lucide-react";
   import { useEffect, useState } from "react";
   import { Line,Bar,Pie } from "react-chartjs-2";
   ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
   BarElement,
   
    Tooltip
   );
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { cn } from "@/lib/utils";

import { format } from "date-fns";

import { zodResolver } from "@hookform/resolvers/zod";

import { set, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { get } from "http";
import { startOfMonth } from "date-fns";
import { endOfMonth } from "date-fns";

const FormSchema = z.object({
    dob: z.date({
        required_error: "A date is required",
    }),
});
type category={
    legend:string;
    color:string;
}
type account={
    accountName:string;
    accountNumber:number;
}
type accountWithSold={
    accountNumber:number;
    accountName:string;
    actualSold:number
}

import { useSession } from "next-auth/react";
import { stat } from "fs";

export default function Dashboard() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    // const [date, setDate] = React.useState<Date | undefined>(new Date());

    if (!session) {
        redirect("/login");
        return null;
    }

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    const [date,setDate]=React.useState<string>(format(new Date(),'yyyy-MM-dd'))
    const [sold,setSold]=React.useState()
    const [accounts,setAccounts]=React.useState<accountWithSold[]>()
    const [idAccount,setIdAccount]=React.useState<number>();
    const [entryExpense,setEntryExpense]=React.useState({entry:0,expense:0})
    const [categorySum,setCategorySum]=useState([])
    const [isDayClicked,setIsDayClicked]=useState(false)
    const [month,setMonth]=useState(new Date().getMonth())
    const [isLoading,setIsLoading]=useState(true)
    const currentMonth=new Date(2024,month,1)
    const startDate=format(startOfMonth(currentMonth),'yyyy-MM-dd')
    const endDate=format(endOfMonth(currentMonth),'yyyy-MM-dd')
    
    const geSold= async(account:number,date:string)=>{
        const response = await axios.get(`http://localhost:8080/sold/${account}?date=${date}`)
        setSold(response.data.balance)
        
        return response.data

    }        

    const getAccounts=async ()=>{
        try{
            setIsLoading(true)
            const response = await axios.get(`http://localhost:8080/accounts/d6430dd9-46e0-475c-91b6-f66bd26d9bcd`)
        
        const actualDate=format(new Date(),'yyyy-MM-dd')
        if(!idAccount && response.data.length > 0){
            setIdAccount(response.data[0].accountNumber)
        }
        const accountsWithSold:accountWithSold[]=await Promise.all(
            response.data.map(async (account:account)=>{
                const getSold=await axios.get(`http://localhost:8080/sold/${account.accountNumber}?date=${actualDate}`)
                return {accountNumber:account.accountNumber,accountName:account.accountName,actualSold:getSold.data.balance}
            })
        )
        setAccounts(accountsWithSold)
    }
        catch(err){
            console.log(err);
            
            
        }
        finally{
            setIsLoading(false)
        }
    
    }
    const getEntryExpense=async(account:number,beginDate:string,endDate:string)=>{
        const response = await axios.get(`http://localhost:8080/entryExpense/${account}?startDate=${beginDate}&endDate=${endDate}`)
        setEntryExpense(response.data)
    }

    const getCategorySum=async (account:number,beginDate:string,endDate:string)=>{
        const response = await axios.get(`http://localhost:8080/categorySum/${account}?startDate=${beginDate}&endDate=${endDate}`)
        setCategorySum(response.data)
        console.log(response.data);
        
    }
    

    React.useEffect(()=>{
        getAccounts()

        if(idAccount){
            geSold(idAccount,date)
           getCategorySum(idAccount,startDate,endDate)
           getEntryExpense(idAccount,startDate,endDate)
           if(isDayClicked){
            getCategorySum(idAccount,date,date)
            getEntryExpense(idAccount,date,date)
           }
        }
        console.log("io e:"+startDate+"-"+endDate);
        
       
        
    },[date,idAccount,month])



  const entryExpenseData = {
    labels:["entry","expense"],
    datasets: [
      {
        label: "amount (MGA)",
        data: [entryExpense.entry,entryExpense.expense],
        borderColor: "orange",
        borderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

 
  const color=["#1F77B4", "#FF7F0E", "#2CA02C", "#D62728 ", "#9467BD", "#8C564B", "#E377C2", "#7F7F7F", "#BCBD22", "#17BECF","#AEC7E8 "]
const categoryList = categorySum.map((category: any) => {
    return { legend: category.categoryName, color: color[categorySum.indexOf(category as never)]};
});
  const categoryData = {
    labels: categorySum.map((category:any)=>category.categoryName),
    datasets: [
      {
        label: "amount (MGA)",
        data: categorySum.map((category:any)=>category.totalAmount),
       // backgroundColor: [],
        backgroundColor: color,
        borderColor: "orange",
     
      },
      
    ],
    
  };
  

  const options={ 
    responsive: true,
    legend: {
        display:true,
        position: 'top', 
        labels: {
          fontColor: 'black', 
          fontSize: 14,
        },
    }
}
    if(isLoading&&accounts==null){
        return(
            <div className='container mx-auto'>
                    <div className="fixed top-0 right-0 h-screen w-screen flex justify-center items-center z-50">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
                </div>
            </div>
        )
    }
    return (
        <div className='container mx-auto'>
            <section className='flex justify-between'>
                <div>
                    <div className='text-xl'>Dashboard</div>
                </div>

                <div className='flex'>
                    <Form {...form}>
                        <form className='space-y-8'>
                            <FormField
                                control={form.control}
                                name='dob'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col'>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}>
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP"
                                                            )
                                                        ) : (
                                                            <span>
                                                                {format(
                                                                    new Date(),
                                                                    "PPP"
                                                                )}
                                                            </span>
                                                        )}
                                                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className='w-auto p-0'
                                                align='start'>
                                                <Calendar
                                                    mode='single'
                                                    selected={field.value}
                                                    
                                                    onSelect={(date)=>{
                                                        field.onChange(date)
                                                        if(date !=undefined){
                                                        let day=date?.getDate()
                                                        let month=date?.getMonth()+1
                                                        let year=date.getFullYear()
                                                        console.log(year+"-"+month+"-"+day);
                                                        setDate(year+"-"+month+"-"+day)
                                                        }
                                                        
                                                        
                                                        
                                                    }}
                                                    onMonthChange={(month)=>{
                                                        setIsDayClicked(false)
                                                        setMonth((month.getMonth()))
                                                        
                                                    }}
                                                    onDayClick={()=>setIsDayClicked(true)}
                                                    disabled={(date) =>
                                                        date > new Date() ||
                                                        date <
                                                            new Date(
                                                                "1900-01-01"
                                                            )
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
            </section>

            {/* ----- */}

            {/* Chart goes here with : Balance - Statement - Expense */}

            <section>
                <div className="flex flex-row gap-3">
                    {
                      
                        accounts&& accounts.map((account:accountWithSold)=>(
                            <div key={account.accountNumber} className={`border rounded-lg  flex flex-col items-center w-40 ${account.accountNumber==idAccount?'bg-white text-black':''}`}
                            onClick={()=>setIdAccount(account.accountNumber)}>
                                <div>{account.accountName}</div>
                                <div>{account.actualSold+" MGA"}</div>
                            </div>
                        ))
                        
                        
                    }
                </div>
                <div className="my-7 text-2xl">
                    <h1>sold evolution</h1>
                    <div>sold:{sold+" MGA"}</div>
                </div>
                <div className='flex gap-4'>
                    <div className="flex flex-row justify-between border w-full p-10 items-center">
                        <div> <Pie data={categoryData} options={options} /></div>
                        <div>
                            {
                               categoryList.map((category)=>piChartLegend(category))
                            }
                        </div>
                        <div > <Bar data={entryExpenseData} /></div>
                    </div>
                </div>

            </section>
            
         
        </div>
    );
    
}
const piChartLegend=({legend,color}:category)=>{
        return(
        <div className="flex flex-row items-center gap-1">
            <div className="w-6 h-3 border" style={{backgroundColor:color}}></div>
            <div>{legend}</div>
        </div>
        )
    }
