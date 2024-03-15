import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import Footer from "@/components/footer";
import { Cards } from "@/components/cards";

export default function Home() {
    return (
        <main>
            <section className='container mx-auto py-24 flex gap-8'>
                <div className='flex-auto flex flex-col justify-center w-72'>
                    <h1 className='text-4xl font-semibold pb-6 bg-gradient-to-r from-[#274a47ec] dark:from-[#79b0abec] via-[#87c0ba] to-[#b6d4f0]  bg-clip-text leading-[2rem] text-transparent'>
                        Banking app UI kit
                    </h1>
                    <p className='text-xl mb-4'>
                        The new way to manage your finances with our innovative
                        digital bank.
                    </p>

                    <div>
                        <div className='flex gap-3 my-5'>
                            <Checkbox checked />
                            <label className='text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                                Accept terms and conditions
                            </label>
                        </div>
                        <div className='flex gap-3 my-5'>
                            <Checkbox checked className='' />
                            <label className='text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                                Customizable
                            </label>
                        </div>
                        <div className='flex gap-3 my-5'>
                            <Checkbox checked />
                            <label className='text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                                Easy to use
                            </label>
                        </div>

                        <div className='my-16'>
                            <Button className='px-10 text-lg pb-7 pt-6'>
                                Get Started
                            </Button>
                        </div>
                    </div>
                </div>

                <div className='flex-auto w-28 flex justify-center'>
                    <Image
                        src='/assets/mobile_app.png'
                        alt='hero'
                        width={380}
                        height={200}
                    />
                </div>
            </section>

            <section className='container mx-auto mb-16'>
                <Cards />
            </section>
            <Footer />
        </main>
    );
}
