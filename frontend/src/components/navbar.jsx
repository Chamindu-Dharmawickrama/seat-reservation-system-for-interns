import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import { useDispatch } from "react-redux";
import { logout } from "../redux/loginSlice";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoged, setIsLoged] = useState(false);
    const [user, setUser] = useState({
        name: "",
        role: "",
    });
    const navigate = useNavigate();

    // get user details
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoged(true);
            const name = JSON.parse(atob(token.split(".")[1]))?.firstName;
            const userRole = JSON.parse(atob(token.split(".")[1]))?.role;
            setUser({
                name,
                role: userRole,
            });
            console.log(name, userRole);
        }
    }, []);

    const dispatch = useDispatch();

    // destroy the session (logout)
    const destroySession = () => {
        dispatch(logout());
        setIsLoged(false);
        navigate("/");
    };

    // handle click
    const handleNavigate = () => {
        if (user.role === "ADMIN") {
            navigate("/adminDashboard");
        } else if (user.role === "INTERN") {
            navigate("/internDashboard");
        }
    };

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

                <div className="hidden md:flex space-x-6 justify-center items-center">
                    {isLoged ? (
                        <div className="flex justify-center items-center">
                            <button
                                onClick={handleNavigate}
                                className="text-basecolor text-letter font-semibold hover:text-gray-700 mr-5 cursor-pointer"
                            >
                                Dashboard
                            </button>
                            <div className="text-basecolor text-letter font-semibold ">
                                {user.name} 
                            </div>
                            <div className="ml-6 ">
                                <button
                                    onClick={destroySession}
                                    className="bg-gradient-to-r from-red-600 to-red-800 text-letter text-white font-semibold px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-red-800 hover:to-red-900 transition-all duration-200 shadow-md cursor-pointer"
                                >
                                    Log out
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex ">
                            <Link
                                to="/login"
                                className="text-basecolor text-letter font-semibold hover:text-gray-700"
                            >
                                Login
                            </Link>

                            <div className="ml-6 ">
                                <Link
                                    to="/signup"
                                    className="bg-gradient-to-r from-mainGreen to-green-700 text-letter text-white font-semibold px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-green-800 hover:to-green-900 transition-all duration-200 shadow-md"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    )}
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
                    {isLoged ? (
                        <div className="flex flex-col justify-center items-center gap-7">
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    handleNavigate();
                                }}
                                className="text-basecolor text-[18px] font-semibold hover:text-gray-300"
                            >
                                Dashboard
                            </button>
                            <div className="text-basecolor text-[17px] font-semibold hover:text-gray-700">
                                {user.name}
                            </div>
                            <button
                                onClick={destroySession}
                                className="bg-gradient-to-r from-red-600 to-red-800 text-letter text-white font-semibold px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-red-800 hover:to-red-900 transition-all duration-200 shadow-md cursor-pointer"
                            >
                                Log out
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center gap-6  ">
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
                                className="bg-gradient-to-r from-mainGreen to-green-700 text-letter text-white font-semibold px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-green-800 hover:to-green-900 transition-all duration-200 shadow-md"
                            >
                                Sign up
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};
