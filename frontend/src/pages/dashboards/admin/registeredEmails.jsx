import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRegisteredEmails } from "../../../redux/adminSlice";

const RegisteredEmails = () => {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchAllRegisteredEmails());
    // }, []);

    // const { emails, emailsLoading, emailsError } = useSelector(
    //     (state) => state.admin
    // );

    //mock emails
    const emails = [
        { id: 1, email: "trainee1@example.com" },
        { id: 2, email: "trainee2@example.com" },
        { id: 3, email: "trainee3@example.com" },
    ];
    const emailsLoading = false;
    const emailsError = false;

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="flex justify-end mb-4">
                <button className="bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white py-2 px-6 rounded-lg shadow hover:from-[#001e3b] hover:to-[#004157] transition-colors duration-200 cursor-pointer">
                    Register email
                </button>
            </div>
            <div className="bg-white rounded-lg shadow p-4 mt-6 ">
                <h2 className="text-xl font-bold mb-6 text-[#0057A8] text-center ">
                    Registered Emails
                </h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr className="bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white">
                                <th className="py-3 px-4 text-left font-semibold">
                                    Trainee ID
                                </th>
                                <th className="py-3 px-4 text-left font-semibold">
                                    Email
                                </th>
                            </tr>
                        </thead>

                        {emailsLoading ? (
                            <div className="flex w- items-center justify-center bg-gradient-to-r from-[#c2c2c2] to-[#949797] text-gray-700 px-6 py-8 rounded-xl shadow-md animate-pulse">
                                <svg
                                    className="w-5 h-5 mr-2 animate-spin"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v6l4 2"
                                    ></path>
                                </svg>
                                <span className="font-semibold">
                                    Loading emails...
                                </span>
                            </div>
                        ) : emailsError ? (
                            <div className="flex items-center justify-between bg-red-50 border border-red-200 text-red-700 px-4 py-8 rounded-xl shadow-sm w-full">
                                <div className="flex items-center space-x-2">
                                    <svg
                                        className="w-5 h-5 text-red-500"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span className="font-medium">
                                        {emailsError}
                                    </span>
                                </div>
                            </div>
                        ) : emails.length === 0 ? (
                            <div className="text-center text-gray-500 font-semibold mt-8">
                                No registered emails found.
                            </div>
                        ) : (
                            <tbody>
                                {emails.map((email) => (
                                    <tr className="hover:bg-gray-100 transition">
                                        <td className="py-3 px-4">
                                            {email.id}
                                        </td>
                                        <td className="py-3 px-4">
                                            {email.email}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RegisteredEmails;
