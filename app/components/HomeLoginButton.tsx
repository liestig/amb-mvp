'use client'
import {useRouter, usePathname} from "next/navigation";
import Cookies from "js-cookie";
import React, {useEffect} from "react";

const HomeLoginButton = () => {
    const router = useRouter();
    const path = usePathname();
    const [buttonText, setButtonText] = React.useState('Se connecter');
    const handleClick = () => {
        if (Cookies.get('accessToken')) {
            Cookies.remove('accessToken');
            window.location.reload();
        } else {
            router.push('/login');
        }
    };

    useEffect(() => {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            setButtonText('Se déconnecter');
        } else {
            setButtonText('Se connecter');
        }
    }, []);

    return (
        <>
            {(path != '/login') &&
                <div
                    className="absolute lg:right-36 right-5 bg-ambrosia text-white px-4 py-2 rounded-md hover:bg-ambrosia-100">
                    <button onClick={handleClick}>{buttonText}</button>
                </div>}
        </>
    )
}

export default HomeLoginButton;