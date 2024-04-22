// @flow
"use client"
import * as React from "react";
import { Search, Plus } from "lucide-react";

import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import NewWithdrawalForm from "@/components/newWithdrawalForm";
import NewTransfertForm from "@/components/newTransfertForm";
import MultipleTransfertForm from "@/components/MultipleTransfertForm";
import ScheduledTransfertForm from "@/components/sheduledTransfertForm";
import SupplyAccountForm from "@/components/supplyForm";
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from '@tanstack/react-query'
import { ThemeProvider } from "@/components/theme-provider";
import axios from "axios";
import { set } from "date-fns";
import { start } from "repl";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent,DialogHeader } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Tabs,
    TabsContent,TabsList,TabsTrigger
 } from "@radix-ui/react-tabs";
import { TabsTransaction} from "@/components/TransactionList";
const Page = () => {
    const [accounts,setIdAccounts]=React.useState<[]>()
    const [idAccount,setIdAccount]=React.useState("")
    const [transactions, setTransactions] = React.useState([]);
    const [transferts,setTransferts]=React.useState([])
    const [startDate,setStartDate]=React.useState("2024-01-03")
    const [endDate,setEndDate]=React.useState(new Date().toISOString().split("T")[0])
    const [form,setForm]=React.useState("withdrawal")
    const getTransactions = async () => {
       const response=await axios.get(`http://localhost:8080/statement/${idAccount}?beginDate=${startDate}&endDate=${endDate}`)
        const data = await response.data;
        setTransactions(data);
      
    }
    const getTransferts=async()=>{
        const response =await axios.get(`http://localhost:8080/transfert/list/${idAccount}`)
        setTransferts(response.data)

    }
React.useEffect(() => {
       if(idAccount!==""&&startDate!==""&&endDate!=="")
       getTransactions();
        const savedAccount=localStorage.getItem('accounts')
        if(savedAccount)
        setIdAccounts(JSON.parse(savedAccount))
    if(idAccount!=="")
        getTransferts()
    },[idAccount,startDate,endDate,form]);
   

    return (
 <div>
      <div className='mb-6 flex flex-wrap justify-end gap-2'>
          <div className='relative mr-auto flex max-w-md grow items-center overflow-hidden rounded-md border bg-white px-2 text-gray-600'>
              <input
                  className='h-10 w-full bg-transparent text-sm focus:outline-none'
                  type='search'
                  name='search'
                  placeholder='Search'
              />
              <div className='text-neutral-400'>
                  <Search />
              </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
                <Button
            
                    className='flex w-max cursor-pointer items-center gap-1 rounded-md border border-neutral-300 bg-neutral-50 p-3 text-sm text-neutral-800'
                    >
                <span className='text-xm font-mono font-bold'>
                    Add Transactions
                </span>
                    <Plus size={18} />
                </Button>

            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <div className="grid grid-cols-3 gap-2 m-3">
                        <Button onClick={()=>setForm("withdrawal")} className={form=="withdrawal"?"border bg-slate-300":""}>Withdrawal</Button>
                        <Button onClick={()=>setForm("transfert")} className={form=="transfert"?"border bg-slate-300":""}>transfert</Button>
                        <Button onClick={()=>setForm("transfertMultiple")} className={form=="withdrawal"?"border bg-slate-300":""}>transfer multiple</Button>
                        <Button onClick={()=>setForm("scheduledTransfer")} className={form=="withdrawal"?"border bg-slate-300":""}>scheduled transfer</Button>
                        <Button onClick={()=>setForm("supply")} className={form=="withdrawal"?"border bg-slate-300":""}>supply</Button>
                    </div>
                </DialogHeader>
               {form=="withdrawal"&&<NewWithdrawalForm/>}
               {form=="transfert"&&<NewTransfertForm/>}
               {form=="transfertMultiple"&&<MultipleTransfertForm/>}
               {form =="scheduledTransfer"&&<ScheduledTransfertForm/>}
               {form == "supply" && <SupplyAccountForm/>}
            </DialogContent>
          </Dialog>
      </div>
     
      <div className="grid grid-cols-2 items-center">
        <div>
            <select name="" id="" onChange={e=>setIdAccount(e.target.value)} className="bg-transparent border rounded-sm h-10">
            <option value="" disabled selected>select an account ...</option>
                {
                    accounts?.map((account:any)=>(
                        <option value={account.id} className="text-black">{account.id}({account.name})</option>
                    ))
                }
            </select>
       
          </div>
         <div className="ml-60">
            <div>
                <Label>start date:</Label>
                <Input type="date" placeholder="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)}/>
            </div>
            <div>
                <Label>end date:</Label>
                <Input type="date" placeholder="date" value={endDate} onChange={(e)=>setEndDate(e.target.value)}/>
            </div>
         </div>
        </div>
      <div className="mt-6">
        <TabsTransaction  transfers={transferts} statements={transactions}/>
      </div>
   
  </div>
    );
};

type ITransaction = {
    transactionId: string;
    description: string;
    date: string;
};
type Transfert={
    reference:string;
    reason:string;
    amount:number;
    effectiveDate:string;
    status:string
}

function Transaction({ transactionId, description, date }: ITransaction) {
    return (
        <Link
            href={"/dashboard/transactions/"+transactionId}
            className='flex h-min cursor-pointer items-start gap-3 rounded-md border p-2 hover:bg-neutral-100 hover:text-neutral-800'
        >
            <div className='flex grow flex-col gap-2'>
                <div className='mr-auto flex items-center justify-between'>
                    <h2 className='text-sm font-bold'>{transactionId}</h2>
                </div>
                <p className='text-sm text-neutral-600'>{description}</p>
                <div className='flex flex-wrap gap-2'>
                    <div className='ml-auto flex text-xs text-neutral-400 underline'>
                        <span className='italic'>{date}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

function Transfert({reference,reason,amount,effectiveDate,status}:Transfert){
    return (<div
    className='flex h-min cursor-pointer items-start gap-3 rounded-md border p-2 hover:bg-neutral-100 hover:text-neutral-800'
>
    <div className='flex grow flex-col gap-2'>
        <div className='mr-auto flex items-center justify-between'>
            <h2 className='text-sm font-bold'>{reference}</h2>
        </div>
        <p className='text-sm text-neutral-600'>{reason}</p>
        <div>{amount}</div>
        <div>{status}</div>
        <div className='flex flex-wrap gap-2'>
            <div className='ml-auto flex text-xs text-neutral-400 underline'>
                <span className='italic'>{effectiveDate}</span>
            </div>
        </div>
    </div>
</div>)
}

export default Page;
