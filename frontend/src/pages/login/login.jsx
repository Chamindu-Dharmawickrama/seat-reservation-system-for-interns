import workingImage from "../../assets/working-image.png";

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#b1c3d3] to-[#a9bfa2] p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-[1280px] min-h-[620px] bg-white shadow-lg rounded-xl flex flex-col lg:flex-row overflow-hidden border border-gray-200 ">
                <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-10 bg-gray-50">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[35px] font-bold text-center text-gray-800 mb-4 sm:mb-6 lg:mb-8 leading-tight">
                        Seat Reservation System <br />
                        <span className="text-[#0057A8]">for Interns</span>
                    </h1>
                    <div className="w-48 h-36 sm:w-56 sm:h-42 md:w-64 md:h-48 rounded-lg flex items-center justify-center">
                        <img
                            src={workingImage}
                            alt="Working environment illustration"
                            className="object-cover w-full h-full rounded-lg"
                        />
                    </div>
                </div>

                {/* Login Form */}
                <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-white">
                    <div className="w-full max-w-sm">
                        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
                            Login
                        </h2>
                        <form className="space-y-4 sm:space-y-5">
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full px-4 py-3 sm:py-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2] focus:border-transparent transition-all duration-200"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-3 sm:py-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39B54A] focus:border-transparent transition-all duration-200"
                            />

                            <button
                                type="submit"
                                className="w-full bg-[#0057A8] text-white py-3 sm:py-4 px-4 rounded-lg font-medium text-base hover:bg-[#004080] focus:outline-none focus:ring-2 focus:ring-[#0057A8] focus:ring-offset-2 transition duration-300 active:transform active:scale-95"
                            >
                                Login
                            </button>
                        </form>
                        {/* Sign up link */}
                        <p className="text-center text-gray-600 mt-6">
                            Don’t have an account?{" "}
                            <a
                                href="/signUp"
                                className="text-[#00B5E2] font-medium hover:underline"
                            >
                                Sign Up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
