import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import Header from './Header';

const EditBirthCertificate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState(null);

    const fetchCertificate = async () => {
        const { data } = await axiosInstance.get(`/certificates/birth-certificates/${id}`);
        const resData = data.data
        setForm({
            ...resData,
            dateOfBirth: resData.dateOfBirth?.split('T')[0],
        });
    };

    useEffect(() => {
        fetchCertificate();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axiosInstance.put(`/certificates/birth-certificates/${id}`, form);
        navigate('/dashboard');
    };

    if (!form) return <div>Loading...</div>;

    return (
        <>
            <Header />

            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-lg">
                    <h2 className="text-xl font-bold mb-4">Edit Certificate</h2>
                    {Object.keys(form)
                        .filter(key => !['_id', 'createdAt', 'updatedAt', '__v'].includes(key))
                        .map((key) => (
                            <input
                                key={key}
                                type={key === 'approvedDate' ? 'date' : 'text'}
                                name={key}
                                value={form[key]}
                                placeholder={key}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded mb-2"
                                required
                            />
                        ))}
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                    >
                        Update Certificate
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditBirthCertificate
