'use client'
import Cookies from "js-cookie";
import React, {useEffect, useState} from "react";

interface Chief {
    age: number;
    city: string;
    createdAt: string;
    description: string;
    email: string;
    firstName: string;
    id: number;
    isChief: boolean;
    lastName: string;
    password: string;
    role: string;
    updatedAt: string;
    username: string;
}

const FindMyChief = () => {
    const [chiefs, setChiefs] = useState<Chief[]>([]);
    const [address, setAddress] = useState('');
    const fetchChiefs = async () => {
        try {
            const getChiefs = await fetch("https://ambrosia-api.onrender.com/user/chiefs", {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get("accessToken"),
                },
            });
            const getAddress = await fetch("https://ambrosia-api.onrender.com/user/", {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get("accessToken"),
                },
            });
            const chiefsData = await getChiefs.json();
            const addressData = await getAddress.json();
            setChiefs(chiefsData.data);
            setAddress(addressData.data.address + ", " + addressData.data.city);
            console.log(chiefs);
        } catch (error) {
            console.error('Erreur:', error);
        }
    }

    useEffect(() => {
        fetchChiefs().catch(error => console.log(error));
    }, []);

    return (
        <>
            <div className={"text-center"}>
                Contactez les chefs disponibles par mail
            </div>
            <div className={"flex"}>
                <div className="w-1/4 p-4  ml-36">
                    <label className="text-lg font-bold mb-4 block">Votre adresse</label>
                    {address}
                </div>
                <div className="w-3/4 p-4 mb-5 mr-36 ml-5">
                    <h1 className="text-3xl font-bold mb-4">Liste des chefs</h1>
                    {chiefs.map((chief) => (
                        <div key={chief.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
                            <p className="text-lg font-semibold text-ambrosia">
                                {chief.firstName} {chief.lastName}
                            </p>
                            <p className="text-gray-600 text-sm">
                                Age: {chief.age} ans | Ville: {chief.city}
                            </p>
                            <p className="text-black">
                                Email: <span className="text-blue-500 underline">{chief.email}</span>
                            </p>
                            <p className="text-black mt-2">
                                Description: {chief.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default FindMyChief;