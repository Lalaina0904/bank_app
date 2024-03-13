import Nav from "@/components/Nav";
import Image from "next/image";

export default function Home() {
    return (
        <main className='p-24'>
            <Nav />
            <section className='py-24 flex flex-col gap-8 items-center text-center'>
                <p>Home</p>
            </section>
        </main>
    );
}
