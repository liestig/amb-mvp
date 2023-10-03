'use client'
import React, {useState} from 'react';
import Cookies from "js-cookie";

interface ProfileFormData {
    description?: string;
    address?: string;
    isChief?: boolean;
}

const ProfileEditPage: React.FC = () => {
    const [formData, setFormData] = useState<ProfileFormData>({
        description: '',
        address: '',
        isChief: false,
    });
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value, type} = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? !prevData.isChief : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const dataToSend: ProfileFormData = {};

        if (formData.description?.trim() !== '') {
            dataToSend.description = formData.description;
        }

        if (formData.address?.trim() !== '') {
            dataToSend.address = formData.address;
        }

        try {
            const response = await fetch('https://ambrosia-api.onrender.com/user/', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Cookies.get("accessToken"),
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                const data = await response.json();
                Cookies.remove("accessToken");
                console.log(data.data.token);
                Cookies.set("accessToken", data.data.token);
                setSuccessMessage('Profil enregistré');
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                console.error('Erreur lors de l\'édition du profil');
            }
        } catch (error) {
            console.error('Erreur de requête:', error);
        }
        console.log(formData);
    };

    return (
        <div className="container mx-auto max-w-screen-md p-4 bg-ambrosia rounded-2xl">
            <h1 className="text-3xl font-bold mb-4">Édition de Profil</h1>
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {successMessage}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        cols={50}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                        Adresse
                    </label>
                    <input
                        type="text"
                        id="address"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="checkbox"
                        id="isChief"
                        name="isChief"
                        checked={formData.isChief}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label htmlFor="isChief" className="text-gray-700 text-sm font-bold">
                        Je suis un chef
                    </label>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
                >
                    Enregistrer
                </button>
            </form>
        </div>

    );
};

export default ProfileEditPage;


{/*<div className="form-group">*/
}
{/*    <input*/
}
{/*        type="checkbox"*/
}
{/*        id="isChief"*/
}
{/*        name="isChief"*/
}
{/*        checked={formData.isChief}*/
}
{/*        onChange={handleChange}*/
}
{/*    />*/
}
{/*    <label htmlFor="isChief">Je suis un chef</label>*/
}
{/*</div>*/
}