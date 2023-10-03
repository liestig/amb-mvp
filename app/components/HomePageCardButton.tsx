'use client';
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import Cookies from "js-cookie";

type HomePageAuthenticationButtonProps = {
    title: string;
    description: string;
    link: string;
};

const HomePageCardButton: React.FC<HomePageAuthenticationButtonProps> = ({title, description, link,}) => {

    const [finalLink, setFinalLink] = useState(link);

    useEffect(() => {
        const accessToken = Cookies.get('accessToken');

        if (!accessToken) {
            setFinalLink("/login");
        }
    }, []);
    return (
        <div
            className="group rounded-lg bg-gray-600 bg-opacity-20 border border-transparent px-5 py-4 transition-colors hover:border-gray-500 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <Link
                href={finalLink}
            >
                <h2 className={`mb-3 text-2xl font-semibold`}>
                    {title}
                </h2>
                <p className={`m-0 lg:max-w-[30ch] text-sm opacity-50`}>
                    {description}
                </p>
            </Link>
        </div>
    )
}

export default HomePageCardButton;