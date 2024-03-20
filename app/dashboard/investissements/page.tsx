import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const Page = () => {
    return (
        <div className='sm:container mx-auto flex flex-col items-center justify-center'>
            <Card className='text-center'>
                <CardHeader>
                    <CardTitle>Investissements</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                    <p>
                        The investment account offers you the possibility to
                        create a portfolio to which you can add your stocks and
                        ETFs. The prices of these securities are then
                        automatically accumulated, giving you an overview of the
                        value of your portfolio.
                    </p>
                    <p>
                        <b>
                            The creation or modification of an investment
                            account is currently only available in the mobile
                            application
                        </b>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;
