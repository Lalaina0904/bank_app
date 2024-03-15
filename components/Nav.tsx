"use client";

import Image from "next/image";
import { ModeToggle } from "./ui/toggleMode";
import { User } from "./user";

import Link from "next/link";

export default function Nav() {
    return (
        <header>
            <nav className='py-6 border-b-2 border-slate-400 border-opacity-20'>
                <div className='container mx-auto flex items-center justify-between'>
                    <div>
                        <Link href='/' className=' flex gap-2 items-center'>
                            <Image
                                src='/logo.svg'
                                alt='app logo'
                                className='dark:invert'
                                width={40}
                                height={24}
                                priority
                            />

                            <span className='uppercase'>Banking app</span>
                        </Link>
                    </div>

                    <div className='flex gap-5'>
                        <div className='flex gap-5'>
                            <ModeToggle />
                            <User />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
