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
} from "lucide-react";

const InternDashboard = () => {
    const [activeTab, setActiveTab] = useState("available");
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedSeat, setSelectedSeat] = useState(null);

    // Mock data
    const availableSeats = [
        { id: 1, seatNumber: "A01", floor: "1st Floor", status: "available" },
        { id: 2, seatNumber: "A02", floor: "1st Floor", status: "available" },
        { id: 3, seatNumber: "A03", floor: "1st Floor", status: "occupied" },
        { id: 4, seatNumber: "B01", floor: "2nd Floor", status: "available" },
        { id: 5, seatNumber: "B02", floor: "2nd Floor", status: "available" },
        { id: 6, seatNumber: "B03", floor: "2nd Floor", status: "maintenance" },
    ];

    const userReservations = [
        {
            id: 1,
            seatNumber: "A01",
            date: "2025-08-28",
            time: "09:00 AM - 05:00 PM",
            status: "active",
            floor: "1st Floor",
        },
        {
            id: 2,
            seatNumber: "B02",
            date: "2025-08-29",
            time: "09:00 AM - 05:00 PM",
            status: "upcoming",
            floor: "2nd Floor",
        },
        {
            id: 3,
            seatNumber: "A03",
            date: "2025-08-25",
            time: "09:00 AM - 05:00 PM",
            status: "completed",
            floor: "1st Floor",
        },
    ];

    const handleSeatBook = (seat) => {
        setSelectedSeat(seat);
        setShowBookingModal(true);
    };

    const handleBookingConfirm = () => {
        setShowBookingModal(false);
        setSelectedSeat(null);
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#b1c3d3] via-[#a8c0b8] to-[#a9bfa2]">
            {/* Header */}
            <header className="bg-white shadow-lg border-b border-[#0057A8]/20 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-[#0057A8] to-[#00B5E2] rounded-lg flex items-center justify-center">
                                    <MapPin className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl lg:text-2xl font-bold text-[#0057A8] leading-tight">
                                        Seat Reservation System
                                    </h1>
                                    <p className="text-xs text-gray-600 font-medium">
                                        for Interns
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                                <div className="w-6 h-6 bg-gradient-to-br from-[#39B54A] to-[#00B5E2] rounded-full flex items-center justify-center">
                                    <User className="w-3 h-3 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">
                                        John Doe
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Intern
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
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                                Welcome to Your Dashboard
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg mb-8 border border-white/30 overflow-hidden">
                    <div className="border-b border-gray-200/50">
                        <nav className="flex space-x-0">
                            <button
                                onClick={() => setActiveTab("available")}
                                className={`flex-1 py-6 px-6 font-semibold text-base transition-all duration-300 relative ${
                                    activeTab === "available"
                                        ? "bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white shadow-lg"
                                        : "text-gray-600 hover:text-[#0057A8] hover:bg-gray-50"
                                }`}
                            >
                                <div className="flex items-center justify-center space-x-2">
                                    <MapPin className="w-5 h-5" />
                                    <span>Available Seats</span>
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
                                    <span>My Reservations</span>
                                </div>
                            </button>
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6 lg:p-8">
                        {activeTab === "available" && (
                            <div>
                                {/* Date Selector */}
                                <div className="mb-8">
                                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-200/50 shadow-md">
                                        <label className="block text-base font-semibold text-gray-800 mb-3">
                                            <Calendar className="w-4 h-4 inline mr-2" />
                                            Select Date to View Available Seats
                                        </label>
                                        <input
                                            type="date"
                                            value={selectedDate}
                                            onChange={(e) =>
                                                setSelectedDate(e.target.value)
                                            }
                                            className="px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2] transition-all duration-200 shadow-sm"
                                        />
                                    </div>
                                </div>

                                {/* Available Seats Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {availableSeats.map((seat) => (
                                        <div
                                            key={seat.id}
                                            className="bg-white rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
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
                                            <div className="flex items-center mb-4 text-gray-600">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                <p className="text-base font-medium">
                                                    {seat.floor}
                                                </p>
                                            </div>
                                            {seat.status === "available" && (
                                                <button
                                                    onClick={() =>
                                                        handleSeatBook(seat)
                                                    }
                                                    className="w-full bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white py-3 px-4 rounded-lg font-semibold text-base hover:from-[#004080] hover:to-[#0099CC] transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                    <span>Book This Seat</span>
                                                </button>
                                            )}
                                            {seat.status === "occupied" && (
                                                <button
                                                    disabled
                                                    className="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-lg font-semibold text-base cursor-not-allowed"
                                                >
                                                    Currently Occupied
                                                </button>
                                            )}
                                            {seat.status === "maintenance" && (
                                                <button
                                                    disabled
                                                    className="w-full bg-yellow-200 text-yellow-700 py-3 px-4 rounded-lg font-semibold text-base cursor-not-allowed"
                                                >
                                                    Under Maintenance
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "reservations" && (
                            <div>
                                <div className="space-y-4">
                                    {userReservations.map((reservation) => (
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
                                                    <button className="p-3 text-[#00B5E2] hover:bg-[#00B5E2] hover:text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                                                        <Eye className="w-5 h-5" />
                                                    </button>
                                                    {reservation.status ===
                                                        "upcoming" && (
                                                        <>
                                                            <button className="p-3 text-[#39B54A] hover:bg-[#39B54A] hover:text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                                                                <Edit className="w-5 h-5" />
                                                            </button>
                                                            <button className="p-3 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Booking Modal */}
            {showBookingModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl border border-white/20 transform transition-all duration-300">
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#0057A8] to-[#00B5E2] rounded-xl flex items-center justify-center mx-auto mb-3">
                                <Plus className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                Book Seat {selectedSeat?.seatNumber}
                            </h3>
                            <p className="text-base text-gray-600">
                                Reserve your workspace for the selected date and
                                time
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-2">
                                    <Calendar className="w-4 h-4 inline mr-2" />
                                    Date
                                </label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2] transition-all duration-200"
                                />
                            </div>
                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-2">
                                    <Clock className="w-4 h-4 inline mr-2" />
                                    Time Slot
                                </label>
                                <select className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2] transition-all duration-200">
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
                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-2">
                                    Purpose (Optional)
                                </label>
                                <textarea
                                    className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2] transition-all duration-200 resize-none"
                                    rows="3"
                                    placeholder="Meeting, project work, training session, etc."
                                ></textarea>
                            </div>
                        </div>
                        <div className="flex space-x-4 mt-8">
                            <button
                                onClick={() => setShowBookingModal(false)}
                                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-semibold text-base"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleBookingConfirm}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white rounded-lg hover:from-[#004080] hover:to-[#0099CC] transition-all duration-200 font-semibold text-base shadow-md hover:shadow-lg"
                            >
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InternDashboard;
