import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export const Footer = () => {
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
                        Experience the future of workspace management with our comprehensive suite of tools.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg text-white font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-white">
                        <li>
                            <Link
                                to="/internDashboard"
                                className="hover:text-gray-300 font-semibold"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/login"
                                className="hover:text-gray-300 font-semibold"
                            >
                               Login 
                            </Link>
                        </li>
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
                    <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
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
