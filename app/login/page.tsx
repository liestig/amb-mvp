'use client';
import {useState} from 'react';
import Cookies from 'js-cookie'
import Link from "next/link";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
        try {
            const response = await fetch('https://ambrosia-api.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });

            if (response.ok) {
                const data = await response.json();

                if (data.status === true && data.data && data.data.token) {
                    Cookies.set('accessToken', data.data.token);
                    window.location.href = '/';
                } else {
                    console.error('Erreur de connexion');
                }
            } else {
                console.error('Erreur de connexion');
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold mb-4 text-ambrosia">Connexion</h1>
            <div className="w-64">
                <input
                    type="text"
                    placeholder="Email"
                    className="border rounded-md p-2 mb-2 w-full text-black"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    className="border rounded-md p-2 mb-4 w-full text-black"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    onClick={handleLogin}
                    className="bg-white text-ambrosia rounded-md p-2 mb-2 w-full hover:bg-blue-600"
                >
                    Se connecter
                </button>
                <Link href={"/signup"}>
                    <button
                        className="bg-ambrosia text-white rounded-md p-2 w-full hover:bg-blue-600"
                    >
                        S&#39;inscrire
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default LoginPage;
