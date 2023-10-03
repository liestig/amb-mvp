import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import Image from "next/image";
import React from "react";
import HomeLoginButton from "@/app/components/HomeLoginButton";
import Link from "next/link";
import {cookies} from "next/headers";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Ambrosia',
    description: 'Find your personal chief !',
}

export default function RootLayout({children,}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
        <body className={inter.className}>
        <header className="flex flex-col items-center justify-between p-16">
            <HomeLoginButton/>
            {cookies().get('accessToken') && <div
                className="absolute lg:right-72 lg:top-16 right-5 top-28 bg-ambrosia text-white px-4 py-2 rounded-md hover:bg-ambrosia-100">
                <Link href={"/profile"}>Profil</Link>
            </div>}
            <Link href={"/"}>
                <div
                    className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent  before:dark:opacity-10 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                    <Image
                        className="relative"
                        src="/ambrosia1.png"
                        alt="Ambrosia Logo"
                        width={250}
                        height={142}
                        priority
                    />
                </div>
            </Link>
        </header>
        {children}
        </body>
        </html>
    )
}
