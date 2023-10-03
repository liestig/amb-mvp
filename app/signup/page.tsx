'use client';
import {ChangeEvent, useState} from 'react';
import Cookies from "js-cookie";

interface FormData {
    email: string,
    password: string,
    age: string,
    firstName: string,
    lastName: string,
    city: string,
    isChief: false,
    description: string,
    address: string
    phoneNumber: string
}

const SignupPage = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        age: '',
        firstName: '',
        lastName: '',
        city: '',
        isChief: false,
        description: '',
        address: '',
        phoneNumber: ''
    });

    const [formErrors, setFormErrors] = useState<Partial<FormData>>({});

    const validateForm = () => {
        const errors: Partial<FormData> = {};

        if (!formData.email) {
            errors.email = 'L\'adresse e-mail est requise.';
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            errors.email = 'L\'adresse e-mail n\'est pas valide.';
        }
        if (!formData.password) {
            errors.password = 'Le mot de passe est requis.';
        }
        if (!formData.age || isNaN(parseInt(formData.age)) || parseInt(formData.age) < 0) {
            errors.age = 'L\'âge doit être un nombre positif.';
        }
        if (!formData.firstName) {
            errors.firstName = 'Le prénom est requis.';
        }
        if (!formData.lastName) {
            errors.lastName = 'Le nom de famille est requis.';
        }
        if (!formData.address) {
            errors.address = 'L\'adresse est requise';
        }
        if (!formData.city) {
            errors.city = 'La ville est requise.';
        }
        const phonePattern = /^0[1-9][0-9]{8}$/i;
        if (!phonePattern.test(formData.phoneNumber)) {
            errors.email = 'Le numéro de téléphone n\'est pas valide en France.';
        }

        setFormErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e: {
        target: {
            name: any;
            value: any;
            type: any;
            checked: any;
        };
    }) => {
        const {name, value, type, checked} = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({...formData, [name]: newValue});
    };

    const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSignup = async () => {

        if (!validateForm()) {
            return;
        }

        const ageAsNumber = parseInt(formData.age);

        const dataToSend = {
            ...formData,
            age: ageAsNumber,
        };

        try {
            const response = await fetch('https://ambrosia-api.onrender.com/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.status);
                if (data.status === true && data.data) {
                    Cookies.set('accessToken', data.data.token);
                    window.location.href = '/profile';
                } else {
                    console.log(data.error);
                    console.error('Erreur d\'inscription');
                }
            } else {
                console.error('Erreur d\'inscription 2');
            }
        } catch (error) {
            console.error('Erreur d\'inscription 3:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col lg:flex-row lg:justify-between w-full max-w-screen-md">
                {/* Colonne gauche (Prénom à Description) */}
                <div className="w-full lg:w-1/2 mr-10 p-5 bg-ambrosia rounded-2xl">
                    <input
                        type="text"
                        placeholder="Prénom"
                        className="border rounded-md p-2 mb-2 w-full text-black"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                    {formErrors.firstName && <p className="text-red-500">{formErrors.firstName}</p>}

                    <input
                        type="text"
                        placeholder="Nom de famille"
                        className="border rounded-md p-2 mb-2 w-full text-black"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                    {formErrors.lastName && <p className="text-red-500">{formErrors.lastName}</p>}

                    <input
                        type="number"
                        placeholder="Âge"
                        className="border rounded-md p-2 mb-2 w-full text-black"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                    />
                    {formErrors.age && <p className="text-red-500">{formErrors.age}</p>}

                    <input
                        type="text"
                        placeholder="Numéro de téléphone"
                        className="border rounded-md p-2 mb-2 w-full text-black"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                    />
                    {formErrors.phoneNumber && <p className="text-red-500">{formErrors.phoneNumber}</p>}

                    <input
                        type="text"
                        placeholder="Adresse"
                        className="border rounded-md p-2 mb-2 w-full text-black"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                    {formErrors.address && <p className="text-red-500">{formErrors.address}</p>}
                    <input
                        type="text"
                        placeholder="Ville"
                        className="border rounded-md p-2 mb-2 w-full text-black"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                    />
                    {formErrors.city && <p className="text-red-500">{formErrors.city}</p>}

                    <div className="mb-2">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox text-blue-500"
                                name="isChief"
                                checked={formData.isChief}
                                onChange={handleInputChange}
                            />
                            <span className="ml-2">Je suis un chef</span>
                        </label>
                        {formErrors.isChief && <p className="text-red-500">{formErrors.isChief}</p>}
                    </div>

                    <textarea
                        placeholder="Description (facultatif)"
                        className="border rounded-md p-2 mb-4 w-full text-black"
                        name="description"
                        value={formData.description}
                        onChange={handleTextareaChange}
                    />
                    {formErrors.description && <p className="text-red-500">{formErrors.description}</p>}
                </div>

                {/* Colonne droite (Email, Mot de passe) */}
                <div className="w-full lg:w-1/2">
                    <div className="bg-white p-5 rounded-2xl">
                        <input
                            type="email"
                            placeholder="Adresse e-mail"
                            className="border rounded-md p-2 mb-2 w-full text-black"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}

                        <input
                            type="password"
                            placeholder="Mot de passe"
                            className="border rounded-md p-2 mb-2 w-full text-black"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        {formErrors.password && <p className="text-red-500">{formErrors.password}</p>}

                        <button
                            onClick={handleSignup}
                            className="bg-ambrosia text-white w-full rounded-md p-2 lg:w-auto hover:bg-blue-600 mt-4"
                        >
                            S&#39;inscrire
                        </button>
                    </div>
                </div>
            </div>


        </div>

    );
};

export default SignupPage;
