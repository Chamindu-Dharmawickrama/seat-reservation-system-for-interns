import { Outlet,NavLink } from "react-router-dom";
import { Layouts } from "../../../layouts/layouts";

const InternDashboard = () => {
    return (
        <Layouts>
            <div className="min-h-screen bg-gradient-to-br from-[#b1c3d3] via-[#a8c0b8] to-[#a9bfa2]">
                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8">
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 lg:p-8">
                            <div className="text-center">
                                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                                    Welcome to Your Dashboard
                                </h2>
                            </div>
                        </div>
                    </div>

                    {/* nav */}
                    <div className="bg-white/95 backdrop-blur-sm rounded-t-xl sm:rounded-t-2xl  border border-white/30 overflow-hidden">
                        <div className="border-b border-gray-200/50">
                            <nav className="flex flex-row">
                                <NavLink
                                    to="/internDashboard"
                                    end
                                    className={({ isActive }) =>
                                        `  flex-1 py-3 sm:py-6 px-2 sm:px-6 font-semibold text-xs sm:text-base transition-all duration-300 relative flex items-center justify-center ${
                                            isActive
                                                ? "bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white shadow-lg"
                                                : "text-gray-600 hover:text-[#0057A8] hover:bg-gray-50"
                                        }`
                                    }
                                >
                                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 w-full text-center">
                                        {/* <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" /> */}
                                        <span className="text-xs sm:text-base  text-center">
                                            Available Seat
                                        </span>
                                    </div>
                                </NavLink>

                                <NavLink
                                    to="/internDashboard/myReservation"
                                    className={({ isActive }) =>
                                        `flex-1 py-3 sm:py-6 px-2 sm:px-6 font-semibold text-xs sm:text-base transition-all duration-300 relative flex items-center justify-center ${
                                            isActive
                                                ? "bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white shadow-lg"
                                                : "text-gray-600 hover:text-[#0057A8] hover:bg-gray-50"
                                        }`
                                    }
                                >
                                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 w-full text-center">
                                        {/* <MapPin className="w-4 h-4 sm:w-5 sm:h-5" /> */}
                                        <span className="text-xs sm:text-base text-center">
                                            Manage Seats
                                        </span>
                                    </div>
                                </NavLink>
                            </nav>
                        </div>
                    </div>

                    <section className=" bg-white rounded-b-xl sm:rounded-b-2xl ">
                        <Outlet />
                    </section>
                </main>
            </div>
        </Layouts>
    );
};

export default InternDashboard;
