import React from "react";
import { Edit, Calendar, MapPin, Trash2, Eye, Clock } from "lucide-react";

const myReservation = () => {
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
        <div className="">
            <div className="space-y-4 py-8">
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
                                        Seat {reservation.seatNumber}
                                    </h3>
                                    <p className="text-base text-gray-600 mb-1">
                                        {reservation.floor}
                                    </p>
                                    <div className="flex items-center text-gray-500">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        <span className="text-sm font-medium">
                                            {reservation.date}
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
                                            reservation.status.slice(1)}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="p-3 text-[#00B5E2] hover:bg-[#00B5E2] hover:text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                                    <Eye className="w-5 h-5" />
                                </button>
                                {reservation.status === "upcoming" && (
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
    );
};

export default myReservation;
