import React from "react";
import { Link } from "react-router-dom";
import {
    Calendar,
    MapPin,
    Users,
    ArrowRight,
    Star,
    CheckCircle,
    Clock,
    Shield,
} from "lucide-react";
import { Layouts } from "../../layouts/layouts";
import heroImg from "../../assets/hero-img.png";

const Home = () => {
    return (
        <Layouts>
            <div className="min-h-screen ">
                {/* Hero Section */}
                <div className="relative overflow-hidden bg-gradient-to-b from-[#b1c3d3] to-[#a9bfa2]">
                    <div className="relative max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
                        <div className="pt-16 pb-20 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-40">
                            <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
                                <div className="sm:text-center lg:text-left lg:col-span-6">
                                    <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl ">
                                        <span className="block">
                                            Smart Workspace
                                        </span>
                                        <span className="block bg-gradient-to-r from-green-800 to-green-900 bg-clip-text text-transparent mt-2">
                                            Seat Reservations
                                        </span>
                                    </h1>
                                    <p className="mt-6 text-lg text-gray-600 sm:text-xl sm:max-w-xl sm:mx-auto lg:mx-0 leading-relaxed">
                                        Revolutionize your office experience
                                        with intelligent seat booking. Real-time
                                        availability, seamless reservations, and
                                        smart workspace management.
                                    </p>

                                    <div className="mt-8 flex flex-wrap gap-6 sm:justify-center lg:justify-start">
                                        <div className="flex items-center space-x-2">
                                            <CheckCircle className="h-5 w-5 text-green-700" />
                                            <span className="text-sm text-gray-600">
                                                Real-time booking
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Shield className="h-5 w-5 text-blue-500" />
                                            <span className="text-sm text-gray-600">
                                                Secure & reliable
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start px-5 sm:px-0">
                                        <Link
                                            to="/login"
                                            className="group relative inline-flex items-center justify-center px-8 py-3 sm:py-4 text-lg font-medium text-white bg-gradient-to-r from-mainBlue to-blue-900 rounded-xl hover:from-blue-900 hover:to-blue-950 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                                        >
                                            Get Started
                                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                                        </Link>
                                        <Link
                                            to="/signUp"
                                            className="inline-flex items-center justify-center px-8 py-3 sm:py-4text-lg font-medium text-mainBlue bg-white  rounded-xl hover:bg-blue-50 hover:border-blue-900 transition-all duration-200 shadow-md hover:shadow-lg"
                                        >
                                            Create Account
                                        </Link>
                                    </div>
                                </div>

                                <div className="mt-16 lg:mt-0 lg:col-span-6">
                                    <div className="relative mx-auto max-w-lg lg:max-w-none">
                                        <img src={heroImg} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="py-20 bg-white relative overflow-hidden px-2">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50"></div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                Powerful Features for
                                <span className="block bg-mainBlue bg-clip-text text-transparent mt-3">
                                    Modern Workspaces
                                </span>
                            </h3>
                            <p className="text-[17px] sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                Experience the future of workspace management
                                with our comprehensive suite of tools
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                            <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                <div className="relative">
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                        <Calendar className="h-8 w-8 text-white" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                                        Smart Booking System
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed">
                                        Intuitive interface with drag-and-drop
                                        functionality, recurring bookings, and
                                        smart suggestions based on your
                                        preferences.
                                    </p>
                                </div>
                            </div>

                            <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                <div className="relative">
                                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                        <MapPin className="h-8 w-8 text-white" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                                        Real-time Tracking
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed">
                                        Live seat availability across multiple
                                        floors and zones. Interactive maps with
                                        instant updates and occupancy sensors.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layouts>
    );
};

export default Home;
