import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";

export const Footer = () => {
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

    // handle click
    const handleNavigate = () => {
        if (user.role === "ADMIN") {
            navigate("/adminDashboard");
        } else if (user.role === "INTERN") {
            navigate("/internDashboard");
        }
    };
    return (
        <footer className="bg-layout bg-opacity-80 backdrop-blur-sm text-basecolor px-6 md:px-30 py-10">
            <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                    <Link to="/" className="inline-block mb-4">
                        <img
                            src={logo}
                            alt="Logo"
                            className="w-20 md:w-25 mx-auto md:mx-0"
                        />
                    </Link>
                    <p className="text-sm text-gray-300">
                        Experience the future of workspace management with our
                        comprehensive suite of tools.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg text-white font-semibold mb-4">
                        Quick Links
                    </h3>
                    <ul className="space-y-2 text-white">
                        <li>
                            <button
                                onClick={handleNavigate}
                                className="hover:text-gray-300 font-semibold cursor-pointer"
                            >
                                Dashboard
                            </button>
                        </li>
                        {/* <li>
                            <Link
                                to="/login"
                                className="hover:text-gray-300 font-semibold"
                            >
                                Login
                            </Link>
                        </li> */}
                        <li>
                            <Link
                                to="/signup"
                                className="hover:text-gray-300 font-semibold"
                            >
                                Sign up
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4 text-white">
                        Contact
                    </h3>
                    <p className="text-sm font-semibold text-gray-200">
                        Email: slt@gmail.com
                    </p>
                    <p className="text-sm font-semibold text-gray-200 mt-2">
                        Phone: +94 111111111
                    </p>
                    <p className="text-sm text-gray-300 mt-6">
                        &copy; {new Date().getFullYear()} slt. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};
