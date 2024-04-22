"use client"
import axios from "axios";
import { usePathname } from "next/navigation";
import * as React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";


const Page = () => {
const [account,setAccount]=React.useState({
    accountNumber:0,
    accountName:"",
    isEligible:false,

});
const [sold,setSold]=React.useState({
    actualSold:"",
    actualLoan:"",
    loanInterest:"",

});
const pathname=usePathname()
const id=pathname.split("/").pop()
const getAccountInfo=async ()=>{
    const response=await axios.get(`http://localhost:8080/account/${id}`)
    setAccount({
       accountNumber:response.data.accountNumber,
       accountName:response.data.accountName,
       isEligible:response.data.isEligible
    });
}
const getActuallSold=async ()=>{
    const response=await axios.get(`http://localhost:8080/soldAndLoan/${id}`)
    setSold({
        actualSold:response.data.sold,
        actualLoan:response.data.loan,
        loanInterest:response.data.loanInterest,
    });
    console.log(response.data);

}
React.useEffect(()=>{
    getActuallSold();

    getAccountInfo();
},[])
    return (
<div className=''>
              
    <div className="grid grid-cols-2 gap-40   items-center">
         <div className='border rounded-sm p-3'>
                <h1 className='text-2xl font-bold'>Account info</h1>

                <div>
                    <div className='flex flex-col gap-2'>
                           
                            <div>
                                <span className='font-bold'>account number:</span>
                                <span>{account.accountNumber}</span>
                            </div>
                            <div>
                                <span className='font-bold'>account name:</span>
                                <span>{account.accountName}</span>
                            </div>
                            <div>
                                <span className='font-bold'>status:</span>
                                <span>{account.isEligible?"eligible to make loan":"not eligible to make loan"}</span>
                            </div>
                    </div>
                </div>
                
            </div>
            {/* sold  */}
            <div className="border rounded-sm p-3">
                <div>
                    <span>Sold:</span>
                    <span> ${sold.actualSold}</span>
                </div>
                <div>
                    <span>Loan:</span>
                    <span>{sold.actualLoan}</span>

                </div>
                <div>
                    <span>Loan interest:</span>
                    <span>{sold.loanInterest}</span>
                </div>
            </div>
    </div>
</div>
    );
};

export default Page;
