// @flow
import * as React from "react";
import { Search, Plus } from "lucide-react";

import Link from "next/link";

const Page = () => {
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
                <Link
                    href={"/dashboard/transactions/create"}
                    className='flex w-max cursor-pointer items-center gap-1 rounded-md border border-neutral-300 bg-neutral-50 p-3 text-sm text-neutral-800'
                >
                    <span className='text-xm font-mono font-bold'>
                        Add Transactions
                    </span>
                    <Plus size={18} />
                </Link>
            </div>

            <div className='relative'>
                <Transaction
                    transactionId={"1"}
                    date={"9 Nov 2023"}
                    description={"transaction ---- "}
                />

                <Transaction
                    transactionId={"2"}
                    date={"10 Nov 2023"}
                    description={"transaction ---- "}
                />

                <Transaction
                    transactionId={"3"}
                    date={"15 Nov 2023"}
                    description={" transaction ----"}
                />

                <Transaction
                    transactionId={"4"}
                    date={"9 Nov 2023"}
                    description={"transaction ---- "}
                />

                <Transaction
                    transactionId={"5"}
                    date={"9 Nov 2023"}
                    description={"transaction ---- "}
                />

                <Transaction
                    transactionId={"6"}
                    date={"9 Nov 2023"}
                    description={"transaction ---- "}
                />

                <Transaction
                    transactionId={"7"}
                    date={"9 Nov 2023"}
                    description={"transaction ---- "}
                />

                <Transaction
                    transactionId={"8"}
                    date={"9 Nov 2023"}
                    description={"transaction ---- "}
                />

                <Transaction
                    transactionId={"9"}
                    date={"9 Nov 2023"}
                    description={"transaction ---- "}
                />
            </div>
        </div>
    );
};

type ITransaction = {
    transactionId: string;
    description: string;
    date: string;
};

function Transaction({ transactionId, description, date }: ITransaction) {
    return (
        <Link
            href={"/dashboard/transactions/transaction"}
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

export default Page;
