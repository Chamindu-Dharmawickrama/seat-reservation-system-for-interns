import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-opacity-80 bg-white backdrop-blur-sm shadow-md md:px-30 px-5 py-3 sticky top-0 z-50">
            <div className="max-w-8xl mx-auto flex justify-between items-center ">
                <div className="ml-5 sm:ml-5">
                    <Link to="/" className="text-2xl font-bold text-white ">
                        <img
                            src={logo}
                            alt="logo "
                            className="md:w-25 w-20 transition-all"
                        />
                    </Link>
                </div>

                <div className="hidden md:flex space-x-6 ">
                    <Link
                        to="/adminDashboard"
                        className="text-basecolor text-letter font-semibold hover:text-gray-700"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/login"
                        className="text-basecolor text-letter font-semibold hover:text-gray-700"
                    >
                        Login
                    </Link>

                    <div className="mb-1 ml-2">
                        <Link
                            to="/signup"
                            className="bg-gradient-to-r from-mainGreen to-green-700 text-letter text-white font-semibold px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-green-800 hover:to-green-900 transition-all duration-200 shadow-md"
                        >
                            Sign up
                        </Link>
                    </div>
                </div>

                <div className="md:hidden ">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-basecolor font-extrabold "
                    >
                        {isOpen ? <X size={36} /> : <Menu size={36} />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden absolute bg-white top-16 left-0 w-full bg-navbase bg-opacity-80 backdrop-blur-sm z-40 py-6 flex flex-col items-center space-y-6 shadow-md">
                    <Link
                        to="/adminDashboard"
                        onClick={() => setIsOpen(false)}
                        className="text-basecolor text-[18px] font-semibold hover:text-gray-300"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="text-basecolor text-[18px] font-semibold hover:text-gray-300 "
                    >
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        onClick={() => setIsOpen(false)}
                        className="mt-2 bg-gradient-to-r from-mainGreen to-green-700 text-letter text-white font-semibold px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-green-800 hover:to-green-900 transition-all duration-200 shadow-md"
                    >
                        Sign up
                    </Link>
                </div>
            )}
        </nav>
    );
};
