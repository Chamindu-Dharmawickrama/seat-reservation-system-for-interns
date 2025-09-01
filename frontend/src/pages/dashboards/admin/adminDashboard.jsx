import React, { useState } from "react";
import {
    Calendar,
    MapPin,
    Clock,
    User,
    Settings,
    LogOut,
    Plus,
    Edit,
    Trash2,
    Eye,
    Users,
    BarChart3,
    FileText,
    Search,
    Filter,
    Download,
    ChevronDown,
    Shield,
    Building,
} from "lucide-react";
import { Layouts } from "../../../layouts/layouts";
import { Outlet, NavLink, useLocation } from "react-router-dom";

const AdminDashboard = () => {
    // const location = useLocation();
    // const pathname = location.pathname.split("/")[2];
    // console.log(pathname);

    //const [activeTab, setActiveTab] = useState(pathname);

    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [showSeatModal, setShowSeatModal] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    // Mock data
    const allSeats = [
        {
            id: 1,
            seatNumber: "A01",
            floor: "1st Floor",
            status: "available",
            location: "Window Side",
        },
        {
            id: 2,
            seatNumber: "A02",
            floor: "1st Floor",
            status: "occupied",
            location: "Center",
            occupiedBy: "John Doe",
        },
        {
            id: 3,
            seatNumber: "A03",
            floor: "1st Floor",
            status: "maintenance",
            location: "Corner",
        },
        {
            id: 4,
            seatNumber: "B01",
            floor: "2nd Floor",
            status: "available",
            location: "Window Side",
        },
        {
            id: 5,
            seatNumber: "B02",
            floor: "2nd Floor",
            status: "occupied",
            location: "Center",
            occupiedBy: "Jane Smith",
        },
        {
            id: 6,
            seatNumber: "B03",
            floor: "2nd Floor",
            status: "available",
            location: "Corner",
        },
    ];

    const allReservations = [
        {
            id: 1,
            seatNumber: "A01",
            internName: "John Doe",
            internId: "INT001",
            date: "2025-08-28",
            time: "09:00 AM - 05:00 PM",
            status: "active",
            floor: "1st Floor",
            purpose: "Project Work",
        },
        {
            id: 2,
            seatNumber: "B02",
            internName: "Jane Smith",
            internId: "INT002",
            date: "2025-08-29",
            time: "09:00 AM - 01:00 PM",
            status: "upcoming",
            floor: "2nd Floor",
            purpose: "Meeting Preparation",
        },
        {
            id: 3,
            seatNumber: "A03",
            internName: "Mike Johnson",
            internId: "INT003",
            date: "2025-08-25",
            time: "01:00 PM - 05:00 PM",
            status: "completed",
            floor: "1st Floor",
            purpose: "Training Session",
        },
    ];

    const statsData = {
        totalSeats: 50,
        occupiedSeats: 28,
        availableSeats: 20,
        maintenanceSeats: 2,
        totalInterns: 35,
        activeReservations: 28,
        todayBookings: 12,
    };

    const handleSeatAction = (seat, action) => {
        setSelectedSeat(seat);
        if (action === "edit") {
            setEditMode(true);
            setShowSeatModal(true);
        } else if (action === "delete") {
            // Handle delete logic
            console.log("Delete seat:", seat);
        } else if (action === "assign") {
            setShowAssignModal(true);
        }
    };

    const handleAddSeat = () => {
        setSelectedSeat(null);
        setEditMode(false);
        setShowSeatModal(true);
    };

    const getSeatStatusColor = (status) => {
        switch (status) {
            case "available":
                return "bg-[#39B54A] text-white";
            case "occupied":
                return "bg-red-500 text-white";
            case "maintenance":
                return "bg-yellow-500 text-white";
            default:
                return "bg-gray-300 text-gray-700";
        }
    };

    const getReservationStatusColor = (status) => {
        switch (status) {
            case "active":
                return "bg-[#39B54A] text-white";
            case "upcoming":
                return "bg-[#00B5E2] text-white";
            case "completed":
                return "bg-gray-500 text-white";
            default:
                return "bg-gray-300 text-gray-700";
        }
    };

    const filteredSeats = allSeats.filter((seat) => {
        const matchesSearch =
            seat.seatNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            seat.floor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter =
            filterStatus === "all" || seat.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <Layouts>
            <div className="min-h-screen bg-gradient-to-br from-[#b1c3d3] via-[#a8c0b8] to-[#a9bfa2]">
                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* topic */}
                    <div className="mb-8">
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 lg:p-8">
                            <div className="text-center">
                                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 ">
                                    Admin Control Center
                                </h2>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">
                                        Total Seats
                                    </p>
                                    <p className="text-3xl font-bold text-[#0057A8]">
                                        {statsData.totalSeats}
                                    </p>
                                </div>
                                <Building className="w-10 h-10 text-[#0057A8]/20" />
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">
                                        Occupied
                                    </p>
                                    <p className="text-3xl font-bold text-red-500">
                                        {statsData.occupiedSeats}
                                    </p>
                                </div>
                                <Users className="w-10 h-10 text-red-500/20" />
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">
                                        Available
                                    </p>
                                    <p className="text-3xl font-bold text-[#39B54A]">
                                        {statsData.availableSeats}
                                    </p>
                                </div>
                                <MapPin className="w-10 h-10 text-[#39B54A]/20" />
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">
                                        Today's Bookings
                                    </p>
                                    <p className="text-3xl font-bold text-[#00B5E2]">
                                        {statsData.todayBookings}
                                    </p>
                                </div>
                                <Calendar className="w-10 h-10 text-[#00B5E2]/20" />
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg mb-8 border border-white/30 overflow-hidden">
                        <div className="border-b border-gray-200/50">
                            <nav className="flex space-x-0">
                                <NavLink
                                    to="/adminDashboard/"
                                    end
                                    className={({ isActive }) =>
                                        `flex-1 py-6 px-6 font-semibold text-base transition-all duration-300 relative ${
                                            isActive
                                                ? "bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white shadow-lg"
                                                : "text-gray-600 hover:text-[#0057A8] hover:bg-gray-50"
                                        }`
                                    }
                                >
                                    <div className="flex items-center justify-center space-x-2">
                                        <BarChart3 className="w-5 h-5" />
                                        <span>Overview</span>
                                    </div>
                                </NavLink>

                                <NavLink
                                    to="/adminDashboard/manageSeats"
                                    className={({ isActive }) =>
                                        `flex-1 py-6 px-6 font-semibold text-base transition-all duration-300 relative ${
                                            isActive
                                                ? "bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white shadow-lg"
                                                : "text-gray-600 hover:text-[#0057A8] hover:bg-gray-50"
                                        }`
                                    }
                                >
                                    <div className="flex items-center justify-center space-x-2">
                                        <MapPin className="w-5 h-5" />
                                        <span>Manage Seats</span>
                                    </div>
                                </NavLink>

                                <NavLink
                                    to="/adminDashboard/manageReservations"
                                    className={({ isActive }) =>
                                        `flex-1 py-6 px-6 font-semibold text-base transition-all duration-300 relative ${
                                            isActive
                                                ? "bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white shadow-lg"
                                                : "text-gray-600 hover:text-[#0057A8] hover:bg-gray-50"
                                        }`
                                    }
                                >
                                    <div className="flex items-center justify-center space-x-2">
                                        <Calendar className="w-5 h-5" />
                                        <span>All Reservations</span>
                                    </div>
                                </NavLink>

                                <NavLink
                                    to="/adminDashboard/reports"
                                    className={({ isActive }) =>
                                        `flex-1 py-6 px-6 font-semibold text-base transition-all duration-300 relative ${
                                            isActive
                                                ? "bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white shadow-lg"
                                                : "text-gray-600 hover:text-[#0057A8] hover:bg-gray-50"
                                        }`
                                    }
                                >
                                    <div className="flex items-center justify-center space-x-2">
                                        <FileText className="w-5 h-5" />
                                        <span>Reports</span>
                                    </div>
                                </NavLink>
                            </nav>
                        </div>
                        {/* add component */}
                        <section>
                            <Outlet />
                        </section>
                    </div>
                </main>
            </div>
        </Layouts>
    );
};

export default AdminDashboard;
