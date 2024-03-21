"use client";

import * as React from "react";
import { Search, Heart, MessageSquare, Bookmark, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons";

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import NewAccountForm from "@/components/newAccountForm";
import axios from "axios";

/*
*/
/*const data: Account[] = [
    {
        id: "m5gr84i9",
        firstname: "Jean",
        lastname: "bas",
        birthdate: "1990-12-12",
        amount: 316,
    },
    {
        id: "3u1reuv4",
        firstname: "Silas",
        lastname: "Bill",
        birthdate: "1990-12-12",
        amount: 242,
    },
    {
        id: "derv1ws0",
        firstname: "Dave",
        lastname: "Smith",
        birthdate: "1990-12-12",
        amount: 837,
    },
    {
        id: "5kma53ae",
        firstname: "Angel",
        lastname: "Cruz",
        birthdate: "1990-12-12",
        amount: 874,
    },
    {
        id: "bhqecj4p",
        firstname: "Carmen",
        lastname: "Hernandez",
        birthdate: "1990-12-12",
        amount: 721,
    },
];*/

export type Account = {
    id: string;
    firstname: string;
    lastname: string;
    birthdate: string;
    amount: number;
};

export const columns: ColumnDef<Account>[] = [
    {
        accessorKey: "id",
        header: "ID Account",
        cell: ({ row }) => (
            <div className='capitalize'>{row.getValue("id")}</div>
        ),
    },
    {
        accessorKey: "firstname",
        header: "First Name",
        cell: ({ row }) => (
            <div className='capitalize'>{row.getValue("firstname")}</div>
        ),
    },
    {
        accessorKey: "lastname",
        header: "Last Name",
        cell: ({ row }) => (
            <div className='capitalize'>{row.getValue("lastname")}</div>
        ),
    },
    {
        accessorKey: "birthdate",
        header: "Birthdate",
        cell: ({ row }) => (
            <div className='capitalize'>{row.getValue("birthdate")}</div>
        ),
    },

    {
        accessorKey: "amount",
        header: () => <div>Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"));

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount);

            return <div className='font-medium'>{formatted}</div>;
        },
    },

    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const Account = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant='ghost'
                            className='h-8 w-8 p-0 text-center'
                        >
                            <span className='sr-only'>Open menu</span>
                            <DotsHorizontalIcon className='h-5 w-5' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit firstname</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit lastname</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit amount</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

const Page = () => {
    const [sorting, setSorting] = React.useState<SortingState>([]);

    const [columnFilters, setColumnFilters] =React.useState<ColumnFiltersState>([]);

    const [columnVisibility, setColumnVisibility] =React.useState<VisibilityState>({});

    const [rowSelection, setRowSelection] = React.useState({});
    const [account,setAccount]=React.useState<Account>({id:"",firstname:"",lastname:"",birthdate:"",amount:0});
    const [accounts,setAccounts]=React.useState<Account[]>([])

const getAllAccounts = async () => { 
    const response = await axios.get("http://localhost:8080/accounts");
    const accountData:Account[]=response.data.map((account:any)=>({
        id:account.accountNumber,
        firstname:account.clientName,
        lastname:account.clientLastName,
        birthdate:account.birthdate,
        amount:account.monthlyNetIncome
    }))
    
   setAccounts(accountData);

}
React.useEffect(() => {
    getAllAccounts();
    console.log(accounts);
    
}   ,[]);

const data=accounts


    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className='relative mx-auto flex px-0 lg:px-6 flex-col gap-6'>
            <div className='mb-6 flex flex-wrap gap-2'>
                <div className='w-max cursor-pointer text-sm text-neutral-800'>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant='default' className='flex gap-2 '>
                                Add new account
                                <Plus size={16} />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-[650px]'>
                            <DialogHeader>
                                <DialogTitle>
                                    {" "}
                                    Let's create your new account 🚀
                                </DialogTitle>
                                <DialogDescription>
                                    Please complete the form bellow
                                </DialogDescription>
                            </DialogHeader>
                            {/* --- The form where we should add the new account --- */}
                            <NewAccountForm />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className='w-full'>
                <div className='flex items-center py-4'>
                    <Input
                        placeholder='Filter firstName...'
                        value={
                            (table
                                .getColumn("firstname")
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table
                                .getColumn("firstname")
                                ?.setFilterValue(event.target.value)
                        }
                        className='max-w-sm'
                    />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='outline' className='ml-auto'>
                                Columns{" "}
                                <ChevronDownIcon className='ml-2 h-4 w-4' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className='capitalize'
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className='rounded-md border'>
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>

                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className='h-24 text-center'
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className='flex items-center justify-end space-x-2 py-4'>
                    <div className='space-x-2 '>
                        <Button
                            variant='outline'
                            size='sm'
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>

                        <Button
                            variant='outline'
                            size='sm'
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// type IAccount = {
//     title: string;
//     author: string;
//     hearth: number;
//     comment: number;
//     date: string;
//     authorPic: string;
//     tag: string[];
// };

// function Account({
//     title,
//     author,
//     authorPic,
//     comment,
//     date,
//     hearth,
//     tag,
// }: IAccount) {
//     return (
//         <Link
//             href={"/dashboard/accounts/account"}
//             className='flex flex-col gap-6 rounded-md border bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800'
//         >
//             <div className='flex gap-2'>
//                 <div className='flex aspect-square w-12 items-center justify-center overflow-hidden rounded-full border-2 bg-white'>
//                     <Image
//                         className='h-auto w-full'
//                         width={40}
//                         height={40}
//                         src={authorPic}
//                         alt={""}
//                     />
//                 </div>
//                 <div>
//                     <p className='font-bold'>{author}</p>
//                     <p className='font-mono text-xs'>{date}</p>
//                 </div>
//             </div>
//             <div className='flex flex-col gap-3 pl-14'>
//                 <h1 className='text-2xl font-bold'>{title}</h1>
//                 <div className='flex flex-wrap gap-1'>
//                     {tag.map((tag, index) => (
//                         <span
//                             key={index}
//                             className='flex items-center justify-center rounded-md bg-blue-50 p-1 px-2 text-sm leading-3 dark:bg-neutral-700 dark:text-neutral-300'
//                         >
//                             {tag}
//                         </span>
//                     ))}
//                 </div>
//             </div>
//             <div className='flex items-center justify-between'>
//                 <div className='flex items-center gap-2 font-mono text-xs font-bold text-neutral-400'>
//                     <Heart absoluteStrokeWidth size={20} />
//                     <p>{hearth}</p>
//                 </div>
//                 <div className='flex items-center gap-2 font-mono text-xs font-bold text-neutral-400'>
//                     <MessageSquare absoluteStrokeWidth size={20} />
//                     <p>{comment}</p>
//                 </div>
//                 <div className='flex items-center gap-2 font-mono text-xs font-bold text-neutral-400'>
//                     <Bookmark absoluteStrokeWidth size={20} />
//                 </div>
//             </div>
//         </Link>
//     );
// }

export default Page;

// ---
