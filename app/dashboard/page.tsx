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

// const Page = () => {
//     redirect("/dashboard/ressources");
// };

// function Resource() {
//     return (
//         <div className='flex h-min max-w-6xl cursor-pointer gap-3 rounded-md border bg-card p-2 text-card-foreground hover:bg-accent'>
//             <div className='relative aspect-video w-64 bg-blue-400'>
//                 <Image
//                     objectFit={"cover"}
//                     fill
//                     src={
//                         "https://d2r55xnwy6nx47.cloudfront.net/uploads/2022/02/Andre-Oort-520x292-520x292.jpg"
//                     }
//                     alt={""}
//                 />
//             </div>
//             <div className='flex flex-col'>
//                 <div className='flex items-center justify-between text-neutral-400'>
//                     <h2 className='text-lg font-bold'>Number Theory</h2>
//                     <FileText size={14} />
//                 </div>
//                 <p className='text-sm'>
//                     Number theory is a branch of mathematics that deals with the
//                     properties and relationships
//                 </p>
//                 <div className='flex items-end justify-between py-1'>
//                     <div className='mt-auto flex flex-wrap gap-2'>
//                         <Badge>Math</Badge>
//                         <Badge>NumberTheory</Badge>
//                         <Badge>MathNerd</Badge>
//                     </div>
//                     <div className='text-xs  underline'>
//                         By noface , <span className='italic'>12-02-2025</span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Page;

// create dashboard page

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

export default function Dashboard() {
    // const [date, setDate] = React.useState<Date | undefined>(new Date());

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
                                                        )}
                                                    >
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
                                                align='start'
                                            >
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
