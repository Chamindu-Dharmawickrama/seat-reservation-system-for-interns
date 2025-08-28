import React, { useState } from "react";
import workingImage from "../../assets/working-image.png";
import {
    Eye,
    EyeOff,
    User,
    Mail,
    Phone,
    Building,
    Calendar,
} from "lucide-react";

const InternRegister = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        internId: "",
        department: "",
        university: "",
        startDate: "",
        endDate: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Registration data:", formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#b1c3d3] to-[#a9bfa2] p-4 sm:p-6 lg:p-15">
            <div className="w-full max-w-[1300px] min-h-[720px] bg-white shadow-2xl rounded-2xl flex flex-col lg:flex-row overflow-hidden border border-gray-200">
                {/* Branding */}
                <div className="flex-1 flex flex-col items-center p-6 sm:p-8 lg:p-12 bg-gradient-to-br from-gray-50 to-gray-100 my-20">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4 sm:mb-6 lg:mb-8 leading-tight">
                            Join Our <br />
                            <span className="text-[#0057A8]">
                                Seat Reservation System for Interns
                            </span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis voluptates, esse unde eos aliquid pariatur a animi minus beatae distinctio ex ducimus. Molestias rerum doloremque odio nisi iste quis accusamus!
                        </p>
                    </div>
                    <div className="w-56 h-44 sm:w-64 sm:h-48 md:w-72 md:h-52 rounded-xl flex items-center justify-center shadow-lg">
                        <img
                            src={workingImage}
                            alt="Working environment illustration"
                            className="object-cover w-full h-full rounded-xl m-4"
                        />
                    </div>
                    <div className="mt-8 text-center">
                        <p className="text-gray-600 mb-4">
                            Already have an account?
                        </p>
                        <a
                            href="/login"
                            className="text-[#0057A8] font-semibold hover:text-[#004080] transition-colors duration-200 text-lg"
                        >
                            Sign In Here
                        </a>
                    </div>
                </div>

                {/* Registration Form */}
                <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-white overflow-y-auto">
                    <div className="w-full max-w-md">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#0057A8] to-[#00B5E2] rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <User className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">
                                Create Account
                            </h2>
                            <p className="text-gray-600">
                                Fill in your details to get started
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Personal Information Section */}
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <User className="w-5 h-5 mr-2 text-[#0057A8]" />
                                    Personal Information
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2] focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2] focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                </div>
                                <div className="mt-4">
                                    <div className="relative">
                                        <Mail className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full pl-11 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2] focus:border-transparent transition-all duration-200"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="relative">
                                        <Phone className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Phone Number"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full pl-11 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2] focus:border-transparent transition-all duration-200"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Internship Details Section */}
                            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <Building className="w-5 h-5 mr-2 text-[#0057A8]" />
                                    Internship Details
                                </h3>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        name="internId"
                                        placeholder="Intern ID (if assigned)"
                                        value={formData.internId}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2] focus:border-transparent transition-all duration-200"
                                    />
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2] focus:border-transparent transition-all duration-200"
                                        required
                                    >
                                        <option value="">
                                            Select Department
                                        </option>
                                        <option value="IT">
                                            Information Technology
                                        </option>
                                        <option value="HR">
                                            Human Resources
                                        </option>
                                        <option value="Finance">Finance</option>
                                        <option value="Marketing">
                                            Marketing
                                        </option>
                                        <option value="Operations">
                                            Operations
                                        </option>
                                        <option value="Engineering">
                                            Engineering
                                        </option>
                                    </select>
                                    <input
                                        type="text"
                                        name="university"
                                        placeholder="University/Institution"
                                        value={formData.university}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2] focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Start Date
                                            </label>
                                            <div className="relative">
                                                <Calendar className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                                                <input
                                                    type="date"
                                                    name="startDate"
                                                    value={formData.startDate}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-11 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2] focus:border-transparent transition-all duration-200"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                End Date
                                            </label>
                                            <div className="relative">
                                                <Calendar className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                                                <input
                                                    type="date"
                                                    name="endDate"
                                                    value={formData.endDate}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-11 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2] focus:border-transparent transition-all duration-200"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Account Setup Section */}
                            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <User className="w-5 h-5 mr-2 text-[#39B54A]" />
                                    Account Setup
                                </h3>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39B54A] focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                    <div className="relative">
                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 pr-12 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39B54A] focus:border-transparent transition-all duration-200"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 pr-12 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39B54A] focus:border-transparent transition-all duration-200"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                            className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Terms and Conditions */}
                            <div className="flex items-start space-x-3">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="mt-1 w-4 h-4 text-[#0057A8] border-gray-300 rounded focus:ring-[#0057A8] focus:ring-2"
                                    required
                                />
                                <label
                                    htmlFor="terms"
                                    className="text-sm text-gray-600 leading-relaxed"
                                >
                                    I agree to the{" "}
                                    <a
                                        href="#"
                                        className="text-[#0057A8] hover:underline font-medium"
                                    >
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a
                                        href="#"
                                        className="text-[#0057A8] hover:underline font-medium"
                                    >
                                        Privacy Policy
                                    </a>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white py-4 px-4 rounded-lg font-semibold text-lg hover:from-[#004080] hover:to-[#0099CC] focus:outline-none focus:ring-2 focus:ring-[#0057A8] focus:ring-offset-2 transition-all duration-300 active:transform active:scale-95 shadow-lg hover:shadow-xl"
                            >
                                Create Account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InternRegister;
