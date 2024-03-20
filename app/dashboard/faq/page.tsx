import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const Page = () => {
    return (
        <div className='sm:container mx-auto'>
            <Accordion type='single' collapsible className='w-full'>
                <AccordionItem value='item-1' className='py-4'>
                    <AccordionTrigger className='font-semibold text-slate-700 dark:text-slate-300 '>
                        What are the advantages of a digital bank compared to a
                        traditional bank?
                    </AccordionTrigger>
                    <AccordionContent>
                        Digital banks offer a more convenient and accessible
                        banking experience, allowing you to manage your finances
                        online from anywhere. They also often provide lower
                        fees, competitive interest rates, and innovative
                        features for tracking and controlling your expenses.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-2' className='py-4'>
                    <AccordionTrigger className='font-semibold text-slate-700 dark:text-slate-300'>
                        How can I open an account with Madagascar's digital bank
                        ?
                    </AccordionTrigger>
                    <AccordionContent>
                        To open an account with our digital bank, simply
                        download our mobile application or visit our website.
                        Then follow the instructions to create an account by
                        providing the required information and completing
                        necessary verifications.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-3' className='py-4'>
                    <AccordionTrigger className='font-semibold text-slate-700 dark:text-slate-300'>
                        How can I make deposits into my account?
                    </AccordionTrigger>
                    <AccordionContent>
                        You can fund your account by making incoming transfers
                        from an external bank or from another account within our
                        bank. You can also deposit checks via our mobile app
                        using the remote check deposit feature.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-4' className='py-4'>
                    <AccordionTrigger className='font-semibold text-slate-700 dark:text-slate-300'>
                        Is my security guaranteed with Madagascar's digital
                        bank?
                    </AccordionTrigger>
                    <AccordionContent>
                        Yes, we take the security of your information very
                        seriously. We employ advanced security measures such as
                        data encryption, multi-factor authentication, and
                        continuous monitoring to protect your personal and
                        financial information from unauthorized access.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-5' className='py-4'>
                    <AccordionTrigger className='font-semibold text-slate-700 dark:text-slate-300'>
                        How can I contact customer service if I need assistance?
                    </AccordionTrigger>
                    <AccordionContent>
                        Our customer service team is available to address all
                        your questions and concerns. You can reach us by phone,
                        email, or via live chat in our mobile app. Please refer
                        to the "Contact Us" section of our app or website for
                        complete contact details for our customer service.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-6' className='py-4'>
                    <AccordionTrigger className='font-semibold text-slate-700 dark:text-slate-300'>
                        Can I use my debit card at ATMs in Madagascar and
                        abroad?
                    </AccordionTrigger>
                    <AccordionContent>
                        Yes, you can use your debit card to withdraw cash at
                        ATMs in Madagascar and abroad, as long as the card
                        network is accepted by the ATM. Be sure to check for any
                        applicable transaction fees before making a withdrawal
                        abroad.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default Page;
