"use client"
import * as React from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
type transaction = {
    reference: string;
    sold: number;
    date: string;
    reason: string;
    credit:number;
    debit:number;
};

const Page = () => {
    const [transaction, setTransaction] = React.useState<transaction>();
    const pathname = usePathname();
    const reference=pathname.split("/")[3]
    const getTransaction = async () => {
        const response = await axios.get(
            `http://localhost:8080/statementReference/${reference}`
        );
        const data = await response.data;
        setTransaction({
            reference: data.reference,
            sold: data.sold,
            date: data.date,
            reason: data.reason,
            credit:data.credit,
            debit:data.debit,
        });
    }
    React.useEffect(() => {
        getTransaction();
    }, []);
    return (
        <div className='relative flex flex-col gap-6 mx-auto max-w-2xl'>
            <h1 className='text-3xl'>Details </h1>
            <div>
                <span>reference:</span>
                <span>{transaction?.reference}</span>
            </div>
            <div>
                <span>reason:</span>
                <span>{transaction?.reason}</span>
            </div>
           
            <div>
                <span>credit:</span>
                <span>{transaction?.credit}</span>
            </div>
            <div>
                <span>debit:</span>
                <span>{transaction?.debit}</span>
            </div>
            <div>
                <span>date:</span>
                <span>{transaction?.date}</span>
            </div> 
            <div>
                <span>sold: </span>
                <span>{transaction?.sold}</span>
            </div>

           
        </div>
    );
};

export default Page;
