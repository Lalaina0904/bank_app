import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function Cards() {
    return (
        <div className='grid grid-cols-3 gap-4'>
            <div className='...'>
                <Card>
                    <CardHeader>
                        <CardTitle>Online Account Management</CardTitle>
                        <CardDescription>
                            Easily manage your bank account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>
                            Take full control of your bank account from
                            anywhere, anytime. With our intuitive online
                            platform, you can effortlessly manage your account,
                            and update personal details.
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className='...'>
                <Card>
                    <CardHeader>
                        <CardTitle>Real-Time Expense Tracking</CardTitle>
                        <CardDescription>
                            Track your expenses and monthly savings in real-time
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>
                            Stay on top of your finances with our real-time
                            expense tracking feature. Monitor your spending
                            habits, categorize transactions, and visualize your
                            monthly savings effortlessly.
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className='...'>
                <Card>
                    <CardHeader>
                        <CardTitle>Advanced Security Measures</CardTitle>
                        <CardDescription>
                            Enhanced security of your personal information
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>
                            Your security is our top priority. Benefit from our
                            advanced security measures designed to safeguard
                            your personal and financial information. With
                            encryption protocols.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
