"use client";
import axios from "axios";
import { usePathname } from "next/navigation";
import * as React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";

const Page = () => {
    const [account, setAccount] = React.useState({
        clientName: "",
        clientLastName: "",
        birthdate: "",
        monthlyNetIncome: "",
        isEligible: "",
    });
    const [sold, setSold] = React.useState({
        actualSold: "",
        actualLoan: "",
        loanInterest: "",
    });
    const pathname = usePathname();
    const id = pathname.split("/").pop();
    const getAccountInfo = async () => {
        const response = await axios.get(`http://localhost:8080/account/${id}`);
        setAccount({
            clientName: response.data.clientName,
            clientLastName: response.data.clientLastName,
            birthdate: response.data.birthdate,
            monthlyNetIncome: response.data.monthlyNetIncome,
            isEligible: response.data.isEligible,
        });
    };
    const getActuallSold = async () => {
        const response = await axios.get(
            `http://localhost:8080/soldAndLoan/${id}`
        );
        setSold({
            actualSold: response.data.sold,
            actualLoan: response.data.loan,
            loanInterest: response.data.loanInterest,
        });
        console.log(response.data);
    };
    React.useEffect(() => {
        getActuallSold();

        getAccountInfo();
    }, []);
    return (
        <div className='flex flex-col content-between'>
            <Link
                href={`/dashboard/accounts/${id}/withdrawal`}
                className='flex w-max cursor-pointer items-center gap-1 rounded-md border border-neutral-300 bg-neutral-50 p-3 text-sm text-neutral-800'>
                <span className='text-xm font-mono font-bold'>
                    Add Transactions
                </span>
                <Plus size={18} />
            </Link>

            <div className='flex flex-col w-full mt-10 gap-6 sm:flex-row'>
                {/* personnal info */}

                <Card className='w-3/4'>
                    <div className='flex flex-col gap-4 p-4'>
                        <h1 className='text-2xl font-bold'>Personnal Info</h1>

                        <div className='flex flex-col gap-2'>
                            <div className='flex gap-4'>
                                <span className='font-bold'>Name:</span>
                                <span>{account.clientName}</span>
                            </div>
                            <div className='flex gap-4'>
                                <span className='font-bold'>Last Name:</span>
                                <span>{account.clientLastName}</span>
                            </div>
                            <div className='flex gap-4'>
                                <span className='font-bold'>Birthdate:</span>
                                <span>{account.birthdate}</span>
                            </div>
                            <div className='flex gap-4'>
                                <span className='font-bold'>
                                    Monthly Net Income:
                                </span>
                                <span>${account.monthlyNetIncome}</span>
                            </div>
                            <div className='flex gap-4'>
                                <span className='font-bold'>Eligiblility:</span>
                                <span>
                                    {account.isEligible
                                        ? "you are eligible to make a Loan "
                                        : "you can't make withdrawal for the moment"}
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* sold  */}

                <Card className='w-1/4 p-4'>
                    <div>
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
                </Card>
            </div>
        </div>
    );
};

export default Page;
