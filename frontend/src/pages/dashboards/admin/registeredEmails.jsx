import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    clearErrors,
    fetchAllRegisteredEmails,
    registerNewEmail,
    resetEmailOperation
} from "../../../redux/adminSlice";
import { AlertCircle, X, Loader2, Mail } from "lucide-react";
import { ToastContainer, useToast } from "../../../components/Toast";

const RegisteredEmails = () => {
    const dispatch = useDispatch();

    const { toasts, removeToast, showSuccess, showError, showInfo } =
        useToast();

    useEffect(() => {
        dispatch(fetchAllRegisteredEmails());
    }, [dispatch]);

    const { emails, emailsLoading, emailsError, emailsSuccess } = useSelector(
        (state) => state.admin
    );

    console.log("emials", emails)

    const [showRegisterEmailModal, setShowRegisterEmailModal] = useState(false);

    const [emailForm, setEmailForm] = useState({
        traineeId: "",
        email: "",
    });

    // Handle email operation success
    useEffect(() => {
        if (emailsSuccess === true) {
            showSuccess("Email added successfully!");
            setShowRegisterEmailModal(false);
            resetEmailForm();
            dispatch(resetEmailOperation());
        } else if (emailsSuccess === false) {
            showError("Failed to add email.");
            dispatch(resetEmailOperation());
        }
    }, [emailsSuccess, dispatch, showSuccess, showError]);

    //fix this
    // useEffect(() => {
    //     if (emailsError) {
    //         showError(emailsError);
    //     }
    // }, []);

    const resetEmailForm = () => {
        setEmailForm({
            traineeId: "",
            email: "",
        });
    };

    //handle add email to the system
    const handleRegisterEmail = (e) => {
        e.preventDefault();
        dispatch(registerNewEmail(emailForm));
    };

    return (
        <div className="max-w-2xl mx-auto py-5 sm:py-5 px-0 sm:px-4">
            <div className="flex justify-end mb-4">
                <button
                    className="bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white py-2 px-6 rounded-lg shadow hover:from-[#001e3b] hover:to-[#004157] transition-colors duration-200 cursor-pointer"
                    onClick={() => {
                        setShowRegisterEmailModal(true);
                        //dispatch(clearErrors());
                    }}
                >
                    Register email
                </button>
            </div>
            <div className="bg-white rounded-lg shadow py-4 sm:py-4 px-2 sm:px-4 mt-6">
                <h2 className="text-xl font-bold mb-6 text-[#0057A8] text-center ">
                    Registered Emails
                </h2>
                <div className="overflow-x-auto ">
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
                            <tbody>
                                <td colSpan={2}>
                                    <div className="flex w- items-center justify-center bg-gradient-to-r from-[#c2c2c2] to-[#949797] text-gray-700 px-6 py-8 shadow-md animate-pulse">
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
                                </td>
                            </tbody>
                        ) : emailsError ? (
                            <tbody>
                                <td colSpan={2}>
                                    <div className="flex items-center justify-between bg-red-50  text-red-700 px-4 py-8 shadow-sm w-full">
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
                                </td>
                            </tbody>
                        ) : emails.length === 0 ? (
                            <tbody>
                                <td colSpan={2}>
                                    <div className="text-center text-gray-500 font-semibold mt-8">
                                        No registered emails found.
                                    </div>
                                </td>
                            </tbody>
                        ) : (
                            <tbody>
                                {emails.map((email) => (
                                    <tr key={email.id}className="hover:bg-gray-100 transition">
                                        <td cl assName="py-3 px-4">
                                            {email.traineeId}
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

            {/* Register Email model */}
            {showRegisterEmailModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl border border-white/20 transform transition-all duration-300">
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#39B54A] to-[#00B5E2] rounded-xl flex items-center justify-center mx-auto mb-3">
                                <Mail className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                Register Email to the System
                            </h3>
                        </div>

                        {emailsError && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                                <span className="text-red-700 text-sm">
                                    {emailsError}
                                </span>
                                <button
                                    onClick={() => dispatch(clearErrors())}
                                    className="ml-auto text-red-500 hover:text-red-700"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        <form
                            onSubmit={handleRegisterEmail}
                            className="space-y-6"
                        >
                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-2">
                                    Enter Trainee ID
                                </label>
                                <input
                                    className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]"
                                    type="text"
                                    value={emailForm.traineeId}
                                    onChange={(e) =>
                                        setEmailForm({
                                            ...emailForm,
                                            traineeId: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-2">
                                    Enter Email Address
                                </label>
                                <input
                                    className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]"
                                    type="email"
                                    value={emailForm.email}
                                    onChange={(e) =>
                                        setEmailForm({
                                            ...emailForm,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div className="flex space-x-4 mt-8">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowRegisterEmailModal(false);
                                        resetEmailForm();
                                        dispatch(clearErrors());
                                        dispatch(resetEmailOperation());
                                    }}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-semibold text-base cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={emailsLoading}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#39B54A] to-[#00B5E2] text-white rounded-lg hover:from-[#2d8f3f] hover:to-[#0099CC] transition-all duration-200 font-semibold text-base shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center cursor-pointer"
                                >
                                    {emailsLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    ) : null}
                                    Add Email
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Toast Container */}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </div>
    );
};

export default RegisteredEmails;
