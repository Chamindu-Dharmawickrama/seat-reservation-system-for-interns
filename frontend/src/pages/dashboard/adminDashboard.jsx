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

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("overview");
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
        <div className="min-h-screen bg-gradient-to-br from-[#b1c3d3] via-[#a8c0b8] to-[#a9bfa2]">
            {/* Header */}
            <header className="bg-white shadow-lg border-b border-[#0057A8]/20 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-[#0057A8] to-[#00B5E2] rounded-lg flex items-center justify-center">
                                    <Shield className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl lg:text-2xl font-bold text-[#0057A8] leading-tight">
                                        Admin Dashboard
                                    </h1>
                                    <p className="text-xs text-gray-600 font-medium">
                                        Seat Reservation System
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                                <div className="w-6 h-6 bg-gradient-to-br from-[#0057A8] to-[#00B5E2] rounded-full flex items-center justify-center">
                                    <Shield className="w-3 h-3 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">
                                        Admin User
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Administrator
                                    </p>
                                </div>
                            </div>
                            <button className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200">
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                            <button
                                onClick={() => setActiveTab("overview")}
                                className={`flex-1 py-6 px-6 font-semibold text-base transition-all duration-300 relative ${
                                    activeTab === "overview"
                                        ? "bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white shadow-lg"
                                        : "text-gray-600 hover:text-[#0057A8] hover:bg-gray-50"
                                }`}
                            >
                                <div className="flex items-center justify-center space-x-2">
                                    <BarChart3 className="w-5 h-5" />
                                    <span>Overview</span>
                                </div>
                            </button>
                            <button
                                onClick={() => setActiveTab("seats")}
                                className={`flex-1 py-6 px-6 font-semibold text-base transition-all duration-300 relative ${
                                    activeTab === "seats"
                                        ? "bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white shadow-lg"
                                        : "text-gray-600 hover:text-[#0057A8] hover:bg-gray-50"
                                }`}
                            >
                                <div className="flex items-center justify-center space-x-2">
                                    <MapPin className="w-5 h-5" />
                                    <span>Manage Seats</span>
                                </div>
                            </button>
                            <button
                                onClick={() => setActiveTab("reservations")}
                                className={`flex-1 py-6 px-6 font-semibold text-base transition-all duration-300 relative ${
                                    activeTab === "reservations"
                                        ? "bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white shadow-lg"
                                        : "text-gray-600 hover:text-[#0057A8] hover:bg-gray-50"
                                }`}
                            >
                                <div className="flex items-center justify-center space-x-2">
                                    <Calendar className="w-5 h-5" />
                                    <span>All Reservations</span>
                                </div>
                            </button>
                            <button
                                onClick={() => setActiveTab("reports")}
                                className={`flex-1 py-6 px-6 font-semibold text-base transition-all duration-300 relative ${
                                    activeTab === "reports"
                                        ? "bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white shadow-lg"
                                        : "text-gray-600 hover:text-[#0057A8] hover:bg-gray-50"
                                }`}
                            >
                                <div className="flex items-center justify-center space-x-2">
                                    <FileText className="w-5 h-5" />
                                    <span>Reports</span>
                                </div>
                            </button>
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6 lg:p-8">
                        {activeTab === "overview" && (
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                                    System Overview
                                </h3>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-200/50 shadow-md">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                            Quick Actions
                                        </h4>
                                        <div className="space-y-3">
                                            <button
                                                onClick={handleAddSeat}
                                                className="w-full bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white py-3 px-4 rounded-lg font-semibold text-base hover:from-[#004080] hover:to-[#0099CC] transition-all duration-300 flex items-center justify-center space-x-2"
                                            >
                                                <Plus className="w-4 h-4" />
                                                <span>Add New Seat</span>
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setShowAssignModal(true)
                                                }
                                                className="w-full bg-gradient-to-r from-[#39B54A] to-[#00B5E2] text-white py-3 px-4 rounded-lg font-semibold text-base hover:from-[#2d8f3f] hover:to-[#0099CC] transition-all duration-300 flex items-center justify-center space-x-2"
                                            >
                                                <Users className="w-4 h-4" />
                                                <span>
                                                    Manual Seat Assignment
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-200/50 shadow-md">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                            Recent Activity
                                        </h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-3 text-sm">
                                                <div className="w-2 h-2 bg-[#39B54A] rounded-full"></div>
                                                <span>
                                                    Seat A01 assigned to John
                                                    Doe
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-3 text-sm">
                                                <div className="w-2 h-2 bg-[#00B5E2] rounded-full"></div>
                                                <span>
                                                    New seat B05 added to 2nd
                                                    Floor
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-3 text-sm">
                                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                                <span>
                                                    Seat A03 marked for
                                                    maintenance
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "seats" && (
                            <div>
                                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                    <div className="flex-1">
                                        <div className="relative">
                                            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Search seats..."
                                                value={searchTerm}
                                                onChange={(e) =>
                                                    setSearchTerm(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]"
                                            />
                                        </div>
                                    </div>
                                    <select
                                        value={filterStatus}
                                        onChange={(e) =>
                                            setFilterStatus(e.target.value)
                                        }
                                        className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="available">
                                            Available
                                        </option>
                                        <option value="occupied">
                                            Occupied
                                        </option>
                                        <option value="maintenance">
                                            Maintenance
                                        </option>
                                    </select>
                                    <button
                                        onClick={handleAddSeat}
                                        className="bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white py-3 px-6 rounded-lg font-semibold hover:from-[#004080] hover:to-[#0099CC] transition-all duration-300 flex items-center space-x-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span>Add Seat</span>
                                    </button>
                                </div>

                                {/* Seats Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {filteredSeats.map((seat) => (
                                        <div
                                            key={seat.id}
                                            className="bg-white rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-xl font-bold text-gray-800">
                                                    Seat {seat.seatNumber}
                                                </h3>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeatStatusColor(
                                                        seat.status
                                                    )} shadow-md`}
                                                >
                                                    {seat.status
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        seat.status.slice(1)}
                                                </span>
                                            </div>
                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center text-gray-600">
                                                    <Building className="w-4 h-4 mr-2" />
                                                    <span className="text-sm">
                                                        {seat.floor}
                                                    </span>
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <MapPin className="w-4 h-4 mr-2" />
                                                    <span className="text-sm">
                                                        {seat.location}
                                                    </span>
                                                </div>
                                                {seat.occupiedBy && (
                                                    <div className="flex items-center text-gray-600">
                                                        <User className="w-4 h-4 mr-2" />
                                                        <span className="text-sm">
                                                            {seat.occupiedBy}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() =>
                                                        handleSeatAction(
                                                            seat,
                                                            "edit"
                                                        )
                                                    }
                                                    className="flex-1 p-2 text-[#00B5E2] hover:bg-[#00B5E2] hover:text-white rounded-lg transition-all duration-200"
                                                >
                                                    <Edit className="w-4 h-4 mx-auto" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleSeatAction(
                                                            seat,
                                                            "assign"
                                                        )
                                                    }
                                                    className="flex-1 p-2 text-[#39B54A] hover:bg-[#39B54A] hover:text-white rounded-lg transition-all duration-200"
                                                >
                                                    <Users className="w-4 h-4 mx-auto" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleSeatAction(
                                                            seat,
                                                            "delete"
                                                        )
                                                    }
                                                    className="flex-1 p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-200"
                                                >
                                                    <Trash2 className="w-4 h-4 mx-auto" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "reservations" && (
                            <div>
                                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Filter by Date
                                        </label>
                                        <input
                                            type="date"
                                            value={selectedDate}
                                            onChange={(e) =>
                                                setSelectedDate(e.target.value)
                                            }
                                            className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Search by Intern
                                        </label>
                                        <div className="relative">
                                            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Search by intern name or ID..."
                                                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Reservations List */}
                                <div className="space-y-4">
                                    {allReservations.map((reservation) => (
                                        <div
                                            key={reservation.id}
                                            className="bg-white rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-6">
                                                    <div className="bg-gradient-to-br from-[#0057A8] to-[#00B5E2] rounded-xl p-3">
                                                        <MapPin className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-800 mb-1">
                                                            Seat{" "}
                                                            {
                                                                reservation.seatNumber
                                                            }
                                                        </h3>
                                                        <p className="text-base text-gray-600 mb-1">
                                                            {reservation.floor}
                                                        </p>
                                                        <div className="flex items-center text-gray-500">
                                                            <Calendar className="w-4 h-4 mr-1" />
                                                            <span className="text-sm font-medium">
                                                                {
                                                                    reservation.date
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-semibold text-gray-800 mb-1">
                                                            {
                                                                reservation.internName
                                                            }
                                                        </h4>
                                                        <p className="text-sm text-gray-600 mb-1">
                                                            ID:{" "}
                                                            {
                                                                reservation.internId
                                                            }
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {
                                                                reservation.purpose
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-base font-semibold text-gray-800 mb-1">
                                                            Time Slot
                                                        </p>
                                                        <p className="text-sm text-gray-600 flex items-center">
                                                            <Clock className="w-3 h-3 mr-1" />
                                                            {reservation.time}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <span
                                                            className={`px-4 py-2 rounded-full text-sm font-semibold ${getReservationStatusColor(
                                                                reservation.status
                                                            )} shadow-md`}
                                                        >
                                                            {reservation.status
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                reservation.status.slice(
                                                                    1
                                                                )}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <button className="p-3 text-[#00B5E2] hover:bg-[#00B5E2] hover:text-white rounded-lg transition-all duration-200">
                                                        <Eye className="w-5 h-5" />
                                                    </button>
                                                    <button className="p-3 text-[#39B54A] hover:bg-[#39B54A] hover:text-white rounded-lg transition-all duration-200">
                                                        <Edit className="w-5 h-5" />
                                                    </button>
                                                    <button className="p-3 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-200">
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "reports" && (
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                                    Usage Reports
                                </h3>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="bg-white rounded-xl p-6 border border-gray-200/50 shadow-lg">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                            Generate Reports
                                        </h4>
                                        <div className="space-y-4">
                                            <button className="w-full bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white py-3 px-4 rounded-lg font-semibold hover:from-[#004080] hover:to-[#0099CC] transition-all duration-300 flex items-center justify-center space-x-2">
                                                <Download className="w-4 h-4" />
                                                <span>Daily Usage Report</span>
                                            </button>
                                            <button className="w-full bg-gradient-to-r from-[#39B54A] to-[#00B5E2] text-white py-3 px-4 rounded-lg font-semibold hover:from-[#2d8f3f] hover:to-[#0099CC] transition-all duration-300 flex items-center justify-center space-x-2">
                                                <Download className="w-4 h-4" />
                                                <span>Weekly Summary</span>
                                            </button>
                                            <button className="w-full bg-gradient-to-r from-[#00B5E2] to-[#39B54A] text-white py-3 px-4 rounded-lg font-semibold hover:from-[#0099CC] hover:to-[#2d8f3f] transition-all duration-300 flex items-center justify-center space-x-2">
                                                <Download className="w-4 h-4" />
                                                <span>Monthly Analytics</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-xl p-6 border border-gray-200/50 shadow-lg">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                            Quick Stats
                                        </h4>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">
                                                    Peak Usage Time
                                                </span>
                                                <span className="font-semibold">
                                                    10:00 AM - 2:00 PM
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">
                                                    Most Popular Floor
                                                </span>
                                                <span className="font-semibold">
                                                    2nd Floor
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">
                                                    Average Booking Duration
                                                </span>
                                                <span className="font-semibold">
                                                    6.5 hours
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">
                                                    Utilization Rate
                                                </span>
                                                <span className="font-semibold text-[#39B54A]">
                                                    78%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Add/Edit Seat Modal */}
            {showSeatModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl border border-white/20 transform transition-all duration-300">
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#0057A8] to-[#00B5E2] rounded-xl flex items-center justify-center mx-auto mb-3">
                                {editMode ? (
                                    <Edit className="w-6 h-6 text-white" />
                                ) : (
                                    <Plus className="w-6 h-6 text-white" />
                                )}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                {editMode
                                    ? `Edit Seat ${selectedSeat?.seatNumber}`
                                    : "Add New Seat"}
                            </h3>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-2">
                                    Seat Number
                                </label>
                                <input
                                    type="text"
                                    defaultValue={
                                        selectedSeat?.seatNumber || ""
                                    }
                                    className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]"
                                    placeholder="e.g., A01"
                                />
                            </div>
                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-2">
                                    Floor
                                </label>
                                <select
                                    defaultValue={selectedSeat?.floor || ""}
                                    className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]"
                                >
                                    <option value="">Select Floor</option>
                                    <option value="1st Floor">1st Floor</option>
                                    <option value="2nd Floor">2nd Floor</option>
                                    <option value="3rd Floor">3rd Floor</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-2">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    defaultValue={selectedSeat?.location || ""}
                                    className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]"
                                    placeholder="e.g., Window Side, Corner, Center"
                                />
                            </div>
                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-2">
                                    Status
                                </label>
                                <select
                                    defaultValue={
                                        selectedSeat?.status || "available"
                                    }
                                    className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]"
                                >
                                    <option value="available">Available</option>
                                    <option value="maintenance">
                                        Maintenance
                                    </option>
                                    <option value="occupied">Occupied</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex space-x-4 mt-8">
                            <button
                                onClick={() => setShowSeatModal(false)}
                                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-semibold text-base"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setShowSeatModal(false)}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white rounded-lg hover:from-[#004080] hover:to-[#0099CC] transition-all duration-200 font-semibold text-base shadow-md hover:shadow-lg"
                            >
                                {editMode ? "Update Seat" : "Add Seat"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showAssignModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl border border-white/20 transform transition-all duration-300">
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#39B54A] to-[#00B5E2] rounded-xl flex items-center justify-center mx-auto mb-3">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                Manual Seat Assignment
                            </h3>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-2">
                                    Select Intern
                                </label>
                                <select className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]">
                                    <option value="">Choose an intern</option>
                                    <option value="INT001">
                                        John Doe (INT001)
                                    </option>
                                    <option value="INT002">
                                        Jane Smith (INT002)
                                    </option>
                                    <option value="INT003">
                                        Mike Johnson (INT003)
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-2">
                                    Select Seat
                                </label>
                                <select className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]">
                                    <option value="">Choose a seat</option>
                                    <option value="A01">
                                        A01 - 1st Floor (Available)
                                    </option>
                                    <option value="B01">
                                        B01 - 2nd Floor (Available)
                                    </option>
                                    <option value="B03">
                                        B03 - 2nd Floor (Available)
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-2">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]"
                                />
                            </div>
                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-2">
                                    Time Slot
                                </label>
                                <select className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]">
                                    <option>
                                        09:00 AM - 05:00 PM (Full Day)
                                    </option>
                                    <option>
                                        09:00 AM - 01:00 PM (Morning)
                                    </option>
                                    <option>
                                        01:00 PM - 05:00 PM (Afternoon)
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="flex space-x-4 mt-8">
                            <button
                                onClick={() => setShowAssignModal(false)}
                                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-semibold text-base"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setShowAssignModal(false)}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#39B54A] to-[#00B5E2] text-white rounded-lg hover:from-[#2d8f3f] hover:to-[#0099CC] transition-all duration-200 font-semibold text-base shadow-md hover:shadow-lg"
                            >
                                Assign Seat
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
