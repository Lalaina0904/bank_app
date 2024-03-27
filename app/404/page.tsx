import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
    return (
        <div className='flex flex-col items-center container mx-auto mt-16'>
            <h1 className='text-xl'>
                The access to dashboard is denied, You have to be logged in ❗
            </h1>

            <Button className='mt-10'>
                <Link href='/login'> Redirect to Login</Link>
            </Button>
        </div>
    );
};

export default page;
