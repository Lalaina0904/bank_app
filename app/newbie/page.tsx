import NewAccountForm from "@/components/newAccountForm";
import React from "react";

const page = () => {
    return (
        <div className='flex justify-center mt-10'>
            <div className='relative flex flex-col gap-6 max-w-2xl w-full'>
                <h2 className='font-medium text-xl pt-4'>
                    Welcome in your Banking app ✨
                </h2>

                <p className='text-[1rem]'>
                    Let's configure your account, please fill the form bellow to
                    get started.
                </p>

                <div>
                    <NewAccountForm />
                </div>
            </div>
        </div>
    );
};

export default page;
