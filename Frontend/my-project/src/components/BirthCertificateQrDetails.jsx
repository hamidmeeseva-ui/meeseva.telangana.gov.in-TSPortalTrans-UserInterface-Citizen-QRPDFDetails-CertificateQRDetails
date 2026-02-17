import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import Logo1 from '../assets/GovtLogoNew.png'
import Logo2 from '../assets/Logo2.gif'
import Logo3 from '../assets/Logo3.gif'

const BirthCertificateQrDetails = () => {
    const { id } = useParams();
    const [certificate, setCertificate] = useState(null);

    const fetchCertificate = async () => {
        try {
            const { data } = await axiosInstance.get(
                `/certificates/birth-certificates/${id}`
            );
            setCertificate(data.data); // important
        } catch (error) {
            console.error("Error fetching birth certificate:", error);
        }
    };

    useEffect(() => {
        fetchCertificate();
    }, [id]);

    if (!certificate) return <div>Loading...</div>;

    const fields = [
        ["Application No :", certificate.applicationNo],
        ["Name :", certificate.name],
        ["Date of Birth :", new Date(certificate.dateOfBirth).toLocaleDateString()],
        ["Place of Birth :", certificate.placeOfBirth],
        ["Father Name :", certificate.fatherName],
        ["Mother Name :", certificate.motherName],
        ["Registration No :", certificate.registrationNo],
        ["Address At Time of Birth :", certificate.birthAddress],
        ["Permanent Address :", certificate.permanentAddress],
    ];

    return (
        <div className="min-h-screen bg-white flex items-start justify-center font-serif">
            {/* Certificate Container */}
            <div className="w-full bg-white">

                {/* Header Logos */}
                <div className="flex items-center justify-between px-4 sm:px-8 pt-4">
                    <img
                        src={Logo1}
                        alt="Telangana Logo"
                        className="h-8 sm:h-28 object-contain"
                    />

                    <img
                        src={Logo2}
                        alt="India Emblem"
                        className="h-8 sm:h-28 object-contain"
                    />

                    <img
                        src={Logo3}
                        alt="GHMC Logo"
                        className="h-8 sm:h-28 object-contain"
                    />
                </div>

                {/* Title Section */}
                <div className="text-center ">
                    <h1 className="text-sm sm:text-2xl font-bold pt-1">
                        GOVERNMENT OF TELANGANA
                    </h1>

                    <h2 className="text-[0.65rem] sm:text-lg font-semibold mt-1 ">
                        GREATER HYDERABAD MUNICIPAL CORPORATION - GHMC
                    </h2>

                    <h3 className="text-xs sm:text-base font-semibold mt-1">
                        BIRTH CERTIFICATE
                    </h3>
                </div>

                {/* Details Table */}
                <div className="p-1 sm:p-6 mt-4">
                    <table className="w-full border border-w- border-gray-400 text-[0.35rem] sm:text-sm">
                        <tbody>
                            <tr className="border">
                                <td className="border px-2 py-[0.15rem] sm:py-2 font-semibold">
                                    Application No :
                                </td>
                                <td className="border px-2 py-[0.15rem] sm:py-2">{certificate?.applicationNo}</td>
                            </tr>

                            <tr className="border">
                                <td className="border px-2 py-[0.15rem] font-semibold sm:py-2">Name :</td>
                                <td className="border px-2 py-[0.15rem] sm:py-2">{certificate?.name}</td>
                            </tr>

                            <tr className="border">
                                <td className="border px-2 py-[0.15rem] font-semibold sm:py-2">
                                    Date of Birth :
                                </td>
                                <td className="border px-2 py-[0.15rem] sm:py-2 font-sans">{new Date(certificate?.dateOfBirth)?.toLocaleDateString()}</td>
                            </tr>

                            <tr className="border">
                                <td className="border px-2 py-[0.15rem] font-semibold sm:py-2">
                                    Place of Birth :
                                </td>
                                <td className="border px-2 py-[0.15rem] sm:py-2">
                                    {certificate?.placeOfBirth}
                                </td>
                            </tr>

                            <tr className="border">
                                <td className="border px-2 py-[0.15rem] font-semibold sm:py-2">
                                    Father/Husband Name :
                                </td>
                                <td className="border px-2 py-[0.15rem] sm:py-2">{certificate?.fatherName}</td>
                            </tr>

                            <tr className="border">
                                <td className="border px-2 py-[0.15rem] font-semibold sm:py-2">
                                    Mother Name :
                                </td>
                                <td className="border px-2 py-[0.15rem] sm:py-2">{certificate?.motherName}</td>
                            </tr>

                            <tr className="border">
                                <td className="border px-2 py-[0.15rem] font-semibold sm:py-2">
                                    Registration No :
                                </td>
                                <td className="border px-2 py-[0.15rem] sm:py-2 font-sans">{certificate?.registrationNo}</td>
                            </tr>

                            <tr className="border">
                                <td className="border px-2 py-[0.15rem] font-semibold sm:py-2">
                                    Address At the time of Birth :
                                </td>
                                <td className="border px-2 py-[0.15rem] sm:py-2">
                                    {certificate?.birthAddress}
                                </td>
                            </tr>

                            <tr className="border">
                                <td className="border px-2 py-[0.15rem] font-semibold sm:py-2">
                                    Permanent Address :
                                </td>
                                <td className="border px-2 py-[0.15rem] sm:py-2">{certificate?.permanentAddress}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BirthCertificateQrDetails;