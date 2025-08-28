import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#b1c3d3] via-[#a8c0b8] to-[#a9bfa2] flex flex-col items-center justify-center">
            <div className="text-center px-4 w-full max-w-2xl">
                <div className="mb-6">
                    <h1 className="text-8xl md:text-9xl font-bold text-[#0d1b29] leading-none">
                        404
                    </h1>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto">
                        The page you're looking for doesn't exist or has been
                        moved.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <button
                        onClick={handleGoHome}
                        className="flex items-center gap-2 px-6 py-3 bg-[#223140] text-white rounded-lg font-semibold transition-colors duration-200 hover:bg-black"
                    >
                        <Home className="w-5 h-5" />
                        Go to Home
                    </button>

                    <button
                        onClick={handleGoBack}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-200/80 text-[#0e1b27]  rounded-lg font-semibold transition-colors duration-200 hover:bg-white"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
