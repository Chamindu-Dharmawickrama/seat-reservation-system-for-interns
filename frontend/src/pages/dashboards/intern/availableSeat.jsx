import React, { useEffect, useState } from "react";
import { Search, Calendar, MapPin, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSeats, searchSeatByTerm } from "../../../redux/seatSlice";
import useDebounce from "../../../hooks/useDebounce";

const AvailableSeat = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [status, setStatus] = useState("all");
    const dispatch = useDispatch();

    const { seats, seatsLoading, seatsError } = useSelector(
        (state) => state.seats
    );

    useEffect(() => {
        dispatch(fetchSeats());
    }, [dispatch]);

    const getSeatStatusColor = (status) => {
        switch (status) {
            case "AVAILABLE":
                return "bg-green-100 text-green-800";
            case "OCCUPIED":
                return "bg-red-100 text-red-800";
            case "MAINTENANCE":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    //use debounce
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    useEffect(() => {
        if (searchTerm.length > 0 || status) {
            dispatch(
                searchSeatByTerm({ searchTerm: debouncedSearchTerm, status })
            );
        }
    }, [debouncedSearchTerm, status, dispatch]);

    return (
        <div className="p-6 lg:p-8">
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-200/50 shadow-md flex flex-col sm:flex-row justify-between gap-3 md:gap-20 sm:gap-5">
                <div className="relative  flex-1">
                    <Search className="w-5 h-5 absolute left-3 mt-1 ml-1 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search seats by seat number..."
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                </div>
                <select
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]"
                    onChange={(e) => setStatus(e.target.value)}
                    value={status}
                >
                    <option value="all">All Status</option>
                    <option value="AVAILABLE">Available</option>
                    <option value="OCCUPIED">Occupied</option>
                    <option value="MAINTENANCE">Maintenance</option>
                </select>
                <div className="flex justify-center text-center items-center">
                    <label className="text-sm text-gray-500 text-center mr-2 ">
                        <Calendar className="w-4 h-4 mb-1 inline mr-2" />
                        Filter By Date
                    </label>
                    <input
                        type="date"
                        // value={selectedDate}
                        // onChange={(e) => setSelectedDate(e.target.value)}
                        className="px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2] transition-all duration-200 shadow-sm"
                    />
                </div>
            </div>

            {/* main content */}
            {seatsLoading ? (
                <div className="flex items-center justify-center bg-gradient-to-r from-[#c2c2c2] to-[#949797] text-gray-700 px-6 py-8 shadow-md animate-pulse">
                    <svg
                        className="w-5 h-5 mr-2 animate-spin"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                        ></circle>
                        <path
                            className="opacity-75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v6l4 2"
                        ></path>
                    </svg>
                    <span className="font-semibold">Loading Seats...</span>
                </div>
            ) : seatsError ? (
                <div
                    className="flex items-center justify-between bg-red-50 border border-red-50 text-red-700 px-4 py-8
                     shadow-sm"
                >
                    <div className="flex items-center space-x-2">
                        <svg
                            className="w-5 h-5 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span className="font-medium">{seatsError}</span>
                    </div>
                </div>
            ) : seats.length === 0 ? (
                <div className="col-span-1 text-center">
                    <p className="text-gray-500">No seats available</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
                    {seats.map((seat) => (
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
                                    {seat.status.charAt(0).toUpperCase() +
                                        seat.status.slice(1)}
                                </span>
                            </div>
                            <div className="flex items-center mb-4 text-gray-600">
                                <MapPin className="w-4 h-4 mr-2" />
                                <p className="text-sm">{seat.floor}</p>
                            </div>
                            <div className="flex items-center text-gray-600 mb-4">
                                <MapPin className="w-4 h-4 mr-2" />
                                <span className="text-sm">{seat.location}</span>
                            </div>
                            {seat.status === "AVAILABLE" && (
                                <button
                                    //onClick={() => handleSeatBook(seat)}
                                    className="w-full bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white py-3 px-4 rounded-lg font-semibold text-base hover:from-[#004080] hover:to-[#0099CC] transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>Book This Seat</span>
                                </button>
                            )}
                            {seat.status === "OCCUPIED" && (
                                <button
                                    disabled
                                    className="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-lg font-semibold text-base cursor-not-allowed"
                                >
                                    Currently Occupied
                                </button>
                            )}
                            {seat.status === "MAINTENANCE" && (
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
            )}
        </div>
    );
};

export default AvailableSeat;
