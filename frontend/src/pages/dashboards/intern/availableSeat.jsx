import React, { useEffect, useState } from "react";
import { Search, Calendar, MapPin, Plus, Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSeats, searchSeatByTerm } from "../../../redux/seatSlice";
import useDebounce from "../../../hooks/useDebounce";
import { clearErrors, makeReservation } from "../../../redux/reservationSlice";
import { ToastContainer, useToast } from "../../../components/Toast";

const AvailableSeat = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [status, setStatus] = useState("all");

    const dispatch = useDispatch();

    const { seats, seatsLoading, seatsError } = useSelector(
        (state) => state.seats
    );
    const { newReservationSuccess, reservationLoading, reservationError } =
        useSelector((state) => state.reservation);

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

    // notify service
    const { toasts, removeToast, showSuccess, showError, showInfo } =
        useToast();

    // make reservation
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedSeat, setSelectedSeat] = useState(null);

    // get user id
    const token = localStorage.getItem("token");
    const user_id = JSON.parse(atob(token.split(".")[1]))?.id
    console.log("User ID ",user_id)

    // booking form
    const [bookingForm, setBookingForm] = useState({
        userId: user_id,
        seatId: "",
        date: "",
        time: "FULLDAY",
        purpose: null,
        status: "ACTIVE",
    });

    // open reservation make form
    const handleSeatBook = (seat) => {
        dispatch(clearErrors());
        setSelectedSeat(seat);
        setShowBookingModal(true);
        setBookingForm((prev) => ({
            ...prev,
            seatId: seat.id,
        }));
    };

    // update the reservation
    const handleChangeReservation = (e) => {
        setBookingForm({
            ...bookingForm,
            [e.target.name]: e.target.value,
        });
    };

    // submit reservation
    const handleBookingConfirm = (e) => {
        e.preventDefault();
        dispatch(makeReservation(bookingForm));
    };

    console.log("newReservationSuccess", newReservationSuccess);

    useEffect(() => {
        if (newReservationSuccess) {
            setShowBookingModal(false);
            setSelectedSeat(null);
            showSuccess("Reservation created successfully");
        }
    }, [newReservationSuccess]);

    useEffect(() => {
        if (reservationError) {
            showError("Reservation Failed");
        }
    }, [reservationError]);

    console.log(bookingForm);

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
                                    onClick={() => handleSeatBook(seat)}
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
                            {reservationError && (
                                <div className="text-red-600 text-sm mb-2">
                                    {reservationError}
                                </div>
                            )}
                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-2">
                                    <Calendar className="w-4 h-4 inline mr-2" />
                                    Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={bookingForm.date}
                                    onChange={handleChangeReservation}
                                    className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2] transition-all duration-200"
                                />
                            </div>
                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-2">
                                    <Clock className="w-4 h-4 inline mr-2" />
                                    Time Slot
                                </label>
                                <select
                                    className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2] transition-all duration-200"
                                    name="time"
                                    value={bookingForm.time}
                                    onChange={handleChangeReservation}
                                >
                                    <option value="FULLDAY">
                                        09:00 AM - 05:00 PM (Full Day)
                                    </option>
                                    <option value="MORNING">
                                        09:00 AM - 01:00 PM (Morning)
                                    </option>
                                    <option value="AFTERNOON">
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
                                    name="purpose"
                                    value={bookingForm.purpose}
                                    onChange={handleChangeReservation}
                                ></textarea>
                            </div>
                        </div>
                        <div className="flex space-x-4 mt-8">
                            <button
                                onClick={() => {
                                    setShowBookingModal(false);
                                    setBookingForm({
                                        userId: user_id,
                                        seatId: "",
                                        date: "",
                                        time: "FULLDAY",
                                        purpose: "",
                                        status: "ACTIVE",
                                    });
                                    setSelectedSeat(null);
                                    dispatch(clearErrors());
                                }}
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

            {/* Toast Container */}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </div>
    );
};

export default AvailableSeat;
