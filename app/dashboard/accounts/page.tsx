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
import { Checkbox } from "@/components/ui/checkbox";

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

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const data: Account[] = [
    {
        id: "m5gr84i9",
        amount: 316,
        status: "success",
        email: "ken99@yahoo.com",
    },
    {
        id: "3u1reuv4",
        amount: 242,
        status: "success",
        email: "Abe45@gmail.com",
    },
    {
        id: "derv1ws0",
        amount: 837,
        status: "processing",
        email: "Monserrat44@gmail.com",
    },
    {
        id: "5kma53ae",
        amount: 874,
        status: "success",
        email: "Silas22@gmail.com",
    },
    {
        id: "bhqecj4p",
        amount: 721,
        status: "failed",
        email: "carmella@hotmail.com",
    },
];

export type Account = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
};

export const columns: ColumnDef<Account>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label='Select all'
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label='Select row'
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },

    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className='capitalize'>{row.getValue("status")}</div>
        ),
    },

    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Email
                    <CaretSortIcon className='ml-2 h-4 w-4' />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className='lowercase'>{row.getValue("email")}</div>
        ),
    },
    {
        accessorKey: "amount",
        header: () => <div className='text-right'>Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"));

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount);

            return <div className='text-right font-medium'>{formatted}</div>;
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
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                            <span className='sr-only'>Open menu</span>
                            <DotsHorizontalIcon className='h-4 w-4' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(Account.id)
                            }
                        >
                            Copy Account ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>
                            View Account details
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

const Page = () => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

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

    // ---

    return (
        <div className='relative mx-auto flex max-w-2xl flex-col gap-6'>
            <div className='mb-6 flex flex-wrap gap-2'>
                <div className='flex w-max cursor-pointer gap-2 items-center rounded-md border border-neutral-300 bg-neutral-50 p-4 text-sm text-neutral-800'>
                    <p className='text-xm '>Add new account</p>
                    <Plus size={16} />
                </div>
            </div>

            <div className='w-full'>
                <div className='flex items-center py-4'>
                    <Input
                        placeholder='Filter emails...'
                        value={
                            (table
                                .getColumn("email")
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table
                                .getColumn("email")
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
                    <div className='flex-1 text-sm text-muted-foreground'>
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s)
                        selected.
                    </div>
                    <div className='space-x-2'>
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

type IAccount = {
    title: string;
    author: string;
    hearth: number;
    comment: number;
    date: string;
    authorPic: string;
    tag: string[];
};

function Account({
    title,
    author,
    authorPic,
    comment,
    date,
    hearth,
    tag,
}: IAccount) {
    return (
        <Link
            href={"/dashboard/accounts/account"}
            className='flex flex-col gap-6 rounded-md border bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800'
        >
            <div className='flex gap-2'>
                <div className='flex aspect-square w-12 items-center justify-center overflow-hidden rounded-full border-2 bg-white'>
                    <Image
                        className='h-auto w-full'
                        width={40}
                        height={40}
                        src={authorPic}
                        alt={""}
                    />
                </div>
                <div>
                    <p className='font-bold'>{author}</p>
                    <p className='font-mono text-xs'>{date}</p>
                </div>
            </div>
            <div className='flex flex-col gap-3 pl-14'>
                <h1 className='text-2xl font-bold'>{title}</h1>
                <div className='flex flex-wrap gap-1'>
                    {tag.map((tag, index) => (
                        <span
                            key={index}
                            className='flex items-center justify-center rounded-md bg-blue-50 p-1 px-2 text-sm leading-3 dark:bg-neutral-700 dark:text-neutral-300'
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2 font-mono text-xs font-bold text-neutral-400'>
                    <Heart absoluteStrokeWidth size={20} />
                    <p>{hearth}</p>
                </div>
                <div className='flex items-center gap-2 font-mono text-xs font-bold text-neutral-400'>
                    <MessageSquare absoluteStrokeWidth size={20} />
                    <p>{comment}</p>
                </div>
                <div className='flex items-center gap-2 font-mono text-xs font-bold text-neutral-400'>
                    <Bookmark absoluteStrokeWidth size={20} />
                </div>
            </div>
        </Link>
    );
}

export default Page;

// ---
