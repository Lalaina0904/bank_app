import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.scss";
import Nav from "@/components/Nav";
import Provider from "@/context/session";

export const metadata: Metadata = {
    title: "Banking app",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body>
                <ThemeProvider attribute='class' defaultTheme='system'>
                    <Provider>
                        <Nav />
                        {children}
                    </Provider>
                </ThemeProvider>
            </body>
        </html>
    );
}
