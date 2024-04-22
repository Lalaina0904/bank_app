import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
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
import axios from "axios"
import Link from "next/link"
import React from "react"

type statementAndList={
    transfers:Transfert[],
    statements:ITransaction[]

}
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
export const  TabsTransaction: React.FC<statementAndList>=({transfers,statements})=> {
   
  return (
    <Tabs defaultValue="statement" className="">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="statement">account statement</TabsTrigger>
        <TabsTrigger value="transfer">transfer list</TabsTrigger>
      </TabsList>
      <TabsContent value={"statement"}>
            <div className='relative mt-10'>
                {
                statements.map((transaction: any) => (
                    <Transaction
                      transactionId={transaction.reference}
                      date={transaction.date}
                      description={transaction.reason}
                    />
                ))
             
            }
            </div>
        </TabsContent>
        <TabsContent value={"transfer"}>
        <div className='relative mt-10'>
                {
                transfers.map((transfert: any) => (
                    <Transfert
                     reference={transfert.reference}
                     amount={transfert.amount}
                     effectiveDate={transfert.effectiveDate}
                     reason={transfert.reason}
                     status={transfert.status}
                    />
                ))
             
            }
            </div>
        </TabsContent>
    </Tabs>
  )
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
    const cancelTransfer=(reference:string)=>{
        axios.put(`http://localhost:8080/transfert/cancel?reference=${reference}`)
    }
    return (<div
    className='flex h-min cursor-pointer items-center gap-3 rounded-md border p-2 '
>
    <div className='flex grow flex-col gap-2'>
        <div className='mr-auto flex items-center justify-between'>
            <h2 className='text-sm font-bold'>
                <span>reference:</span>
                <span>{reference}</span>
            </h2>
        </div>
        <div className='text-sm text-neutral-600'>
            <span>reason:</span>
            <span >{reason}</span>
        </div>
        <div>
            <span>amount:</span>
            <span>{amount}</span>
        </div>
        <div>
            
                <span>status:</span>
                <span>{status}</span>
            
            
        </div>
        <div className='flex flex-wrap gap-2'>
            <div className='ml-auto flex text-xs text-neutral-400 underline'>
                <span>effective date:</span>
                <span className='italic'>{effectiveDate}</span>
            </div>
        </div>
    </div>
    <div>
        {status==='pending'&&
            <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">cancel</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently cancel this transfer
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=>cancelTransfer(reference)}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        }
    </div>

</div>)
}
