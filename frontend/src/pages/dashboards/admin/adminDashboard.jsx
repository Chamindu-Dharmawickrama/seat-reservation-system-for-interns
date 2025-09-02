import {
    Calendar,
    MapPin,
    Users,
    BarChart3,
    FileText,
    Building,
} from "lucide-react";
import { Layouts } from "../../../layouts/layouts";
import { Outlet, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStats } from "../../../redux/adminSlice";

const AdminDashboard = () => {
    const dispatch = useDispatch();

    // Redux state
    const { dashboardStats, statsLoading } = useSelector(
        (state) => state.admin
    );

    // Load initial data
    useEffect(() => {
        dispatch(fetchDashboardStats());
    }, [dispatch]);

    return (
        <Layouts>
            <div className="min-h-screen bg-gradient-to-br from-[#b1c3d3] via-[#a8c0b8] to-[#a9bfa2]">
                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8 py-4 sm:py-8">
                    {/* topic */}
                    <div className="mb-6 sm:mb-8">
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 lg:p-8">
                            <div className="text-center">
                                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                                    Admin Control Center
                                </h2>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
                        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-6 border border-gray-200/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs sm:text-sm font-medium text-gray-600">
                                        Total Seats
                                    </p>
                                    <p className="mt-1 text-xl sm:text-3xl font-bold text-gray-800">
                                        {statsLoading
                                            ? "..."
                                            : dashboardStats.totalSeats}
                                    </p>
                                </div>
                                <Building className="w-6 h-6 sm:w-10 sm:h-10 text-[#0057A8]/40" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-6 border border-gray-200/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs sm:text-sm font-medium text-gray-600">
                                        Occupied
                                    </p>
                                    <p className="mt-1 text-xl sm:text-3xl font-bold text-orange-600">
                                        {statsLoading
                                            ? "..."
                                            : dashboardStats.occupiedSeats}
                                    </p>
                                </div>
                                <Users className="w-6 h-6 sm:w-10 sm:h-10 text-red-500/40" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-6 border border-gray-200/50 ">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs sm:text-sm font-medium text-gray-600">
                                        Available
                                    </p>
                                    <p className="mt-1 text-xl sm:text-3xl font-bold text-green-600">
                                        {statsLoading
                                            ? "..."
                                            : dashboardStats.availableSeats}
                                    </p>
                                </div>
                                <MapPin className="w-6 h-6 sm:w-10 sm:h-10 text-[#39B54A]/40" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-6 border border-gray-200/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs sm:text-sm font-medium text-gray-600">
                                        Today's Bookings
                                    </p>
                                    <p className="mt-1 text-xl sm:text-3xl font-bold text-[#00B5E2]">
                                        {statsLoading
                                            ? "..."
                                            : dashboardStats.activeAssignments}
                                    </p>
                                </div>
                                <Calendar className="w-6 h-6 sm:w-10 sm:h-10 text-[#00B5E2]/40" />
                            </div>
                        </div>
                    </div>

                    {/* nav */}
                    <div className="bg-white/95 backdrop-blur-sm rounded-t-xl sm:rounded-t-2xl  border border-white/30 overflow-hidden">
                        <div className="border-b border-gray-200/50">
                            <nav className="flex flex-row">
                                <NavLink
                                    to="/adminDashboard"
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
                                        <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span className="text-xs sm:text-base  text-center">
                                            Overview
                                        </span>
                                    </div>
                                </NavLink>

                                <NavLink
                                    to="/adminDashboard/manageSeats"
                                    className={({ isActive }) =>
                                        `flex-1 py-3 sm:py-6 px-2 sm:px-6 font-semibold text-xs sm:text-base transition-all duration-300 relative flex items-center justify-center ${
                                            isActive
                                                ? "bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white shadow-lg"
                                                : "text-gray-600 hover:text-[#0057A8] hover:bg-gray-50"
                                        }`
                                    }
                                >
                                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 w-full text-center">
                                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span className="text-xs sm:text-base text-center">
                                            Manage Seats
                                        </span>
                                    </div>
                                </NavLink>

                                <NavLink
                                    to="/adminDashboard/manageReservations"
                                    className={({ isActive }) =>
                                        `flex-1 py-3 sm:py-6 px-2 sm:px-6 font-semibold text-xs sm:text-base transition-all duration-300 relative flex items-center justify-center ${
                                            isActive
                                                ? "bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white shadow-lg"
                                                : "text-gray-600 hover:text-[#0057A8] hover:bg-gray-50"
                                        }`
                                    }
                                >
                                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 w-full text-center">
                                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span className="text-xs sm:text-base text-center">
                                            All Reservations
                                        </span>
                                    </div>
                                </NavLink>

                                <NavLink
                                    to="/adminDashboard/reports"
                                    className={({ isActive }) =>
                                        `flex-1 py-3 sm:py-6 px-2 sm:px-6 font-semibold text-xs sm:text-base transition-all duration-300 relative flex items-center justify-center ${
                                            isActive
                                                ? "bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white shadow-lg"
                                                : "text-gray-600 hover:text-[#0057A8] hover:bg-gray-50"
                                        }`
                                    }
                                >
                                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 w-full text-center">
                                        <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span className="text-xs sm:text-base text-center">
                                            Reports
                                        </span>
                                    </div>
                                </NavLink>
                            </nav>
                        </div>
                    </div>
                    {/* components */}
                    <section className=" bg-white rounded-b-xl sm:rounded-b-2xl ">
                        <Outlet />
                    </section>
                </main>
            </div>
        </Layouts>
    );
};

export default AdminDashboard;
