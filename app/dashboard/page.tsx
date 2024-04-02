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

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";

const FormSchema = z.object({
    dob: z.date({
        required_error: "A date is required",
    }),
});

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
                                                    onSelect={field.onChange}
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
                <div className='flex gap-4'></div>
            </section>
        </div>
    );
}
