import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import Logo1 from "../assets/GovtLogoNew.png";

const ResidenceCertificateQRDetails = () => {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);

  const fetchCertificate = async () => {
    try {
      const { data } = await axiosInstance.get(`/certificates/${id}`);
      setCertificate(data);
    } catch (error) {
      console.error("Error fetching residence certificate:", error);
    }
  };

  useEffect(() => {
    fetchCertificate();
  }, [id]);

  if (!certificate) return <div>Loading...</div>;

  const fields = [
    ["Application No :", certificate.applicationNo],
    ["Name :", certificate.name],
    ["Father/Husband Name :", certificate.fatherOrHusbandName],
    ["Residing Years :", certificate.residingYears],
    ["Purpose :", certificate.purpose],
    ["Door No :", certificate.doorNo],
    ["Locality :", certificate.locality],
    ["District :", certificate.district],
    ["Mandal :", certificate.mandal],
    ["Village :", certificate.village],
    ["Approved Date :", new Date(certificate.approvedDate).toLocaleDateString()],
    ["Approved By :", certificate.approvedBy],
  ];

  return (
    <div className="min-h-screen bg-white flex items-start justify-center font-serif">
      <div className="w-full sm:max-w-4xl bg-white">

        {/* Header Logos */}
        <div className="flex items-center justify-center px-4 sm:px-8 pt-4">
          <img src={Logo1} alt="Telangana Logo" className="h-8 sm:h-28" />
        </div>

        {/* Titles */}
        <div className="text-center">
          <h1 className="text-sm sm:text-2xl font-bold pt-1">
            GOVERNMENT OF TELANGANA
          </h1>
          <h2 className="text-[0.65rem] sm:text-lg font-semibold mt-1">
            REVENUE DEPARTMENT
          </h2>
          <h3 className="text-[0.5rem] sm:text-base font-semibold mt-1">
            APPROVED APPLICATION DETAILS OF <span className="font-sans">{certificate?.applicationNo}</span>
          </h3>
        </div>

        {/* Table */}
        <div className="sm:p-6 mt-4 p-5 font-sans">
          <table className="w-full border border-gray-400 text-[0.35rem] sm:text-sm text-center">
            <thead>
              <tr>
                <th
                  colSpan={2}
                  className="border px-2 py-2 sm:py-3 font-bold text-center"
                >
                  Application Details
                </th>
              </tr>
            </thead>
            <tbody>
              {fields.map(([label, value], index) => (
                <tr key={index} className="border">
                  <td className="border px-2 py-1 sm:py-3 font-semibold bg-gray-100">
                    {label}
                  </td>
                  <td className="border px-2 py-1 sm:py-3">
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default ResidenceCertificateQRDetails;
