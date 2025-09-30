import React, { useEffect, useState } from "react";
import { Edit, Calendar, MapPin, Trash2, Eye, Clock,Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
    clearErrors,
    deleteReservation,
    fetchAllReservations,
} from "../../../redux/reservationSlice";
import { ToastContainer, useToast } from "../../../components/Toast";

const MyReservation = () => {
    const dispatch = useDispatch();

    const {
        reservations,
        reservationLoading,
        reservationError,
        deleteReservationLoading,
        deleteReservationSuccess,
        deleteReservationError,
    } = useSelector((state) => state.reservation);

    useEffect(() => {
        dispatch(fetchAllReservations());
    }, [dispatch]);

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

    //------ delete reservation ------

    // notify service
    const { toasts, removeToast, showSuccess, showError, showInfo } =
        useToast();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);

    //handle delete seat
    const handleDelete = (id) => {
        dispatch(deleteReservation(id));
        setIsDeleteModalOpen(false);
        setSelectedReservation(null);
    };

    // handle succes delete state
    useEffect(() => {
        if (deleteReservationSuccess) {
            showSuccess("Reservation deleted successfully!");
        }
    }, [deleteReservationSuccess, dispatch]);

    // handle Error delete state
    useEffect(() => {
        if (deleteReservationError) {
            showError("Reservation deleted not successfully!");
            dispatch(clearErrors())
        }
    }, [deleteReservationError, dispatch]);

    return (
        <div className="">
            <div className="space-y-4 py-8 px-5 ">
                {reservationLoading ? (
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
                ) : reservationError ? (
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
                            <span className="font-medium">
                                {reservationError}
                            </span>
                        </div>
                    </div>
                ) : reservations.length == 0 ? (
                    <div className="col-span-1 text-center">
                        <p className="text-gray-500">
                            No reservation available
                        </p>
                    </div>
                ) : (
                    reservations.map((reservation) => (
                        <div
                            key={reservation.id}
                            className="bg-white rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300  "
                        >
                            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between ">
                                <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-6 ">
                                    <div className="bg-gradient-to-br from-[#0057A8] to-[#00B5E2] rounded-xl p-2 sm:p-3 mb-2 sm:mb-0">
                                        <MapPin className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-[18px] sm:text-xl font-bold text-gray-800 mb-1">
                                            Seat {reservation.seatNumber}
                                        </h3>
                                        <p className="text-base text-gray-600 mb-1">
                                            {reservation.floor}
                                        </p>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="px-2 text-center sm:text-left">
                                            <p className="text-base font-semibold text-gray-800 mb-1">
                                                Time Slot
                                            </p>
                                            <p className="text-sm text-gray-600 flex items-center">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {reservation.time}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-center sm:justify-start text-gray-500 px-2">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            <span className="text-sm font-medium">
                                                {reservation.date}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="px-4 my-4 sm:my-0">
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

                                {/* Buttons */}
                                <div className="flex items-center space-x-2">
                                    <button className="p-3 text-[#00B5E2] hover:bg-[#00B5E2] hover:text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
                                        <Eye className="w-5 h-5" />
                                    </button>
                                    {reservation.status === "upcoming" && (
                                        <>
                                            <button
                                                className="p-3 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                                                onClick={() => {
                                                    setIsDeleteModalOpen(true);
                                                    setSelectedReservation(
                                                        reservation
                                                    );
                                                }}
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Delete Seat Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                        <h3 className="text-lg font-semibold mb-3">
                            Confirm Delete
                        </h3>
                        <p className="mb-5">
                            Are you sure you want to delete{" "}
                            <strong>
                                {selectedReservation
                                    ? selectedReservation.seatNumber
                                    : ""}
                            </strong>{" "}
                            reservation ?
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() =>
                                    handleDelete(selectedReservation.id)
                                }
                                className="px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition flex"
                            >
                                {deleteReservationLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin mr-2 mt-1" />
                                ) : null}
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => {
                                    setIsDeleteModalOpen(false);
                                    setSelectedReservation(null);
                                    dispatch(clearErrors());
                                }}
                                className="px-4 py-2 font-semibold bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                            >
                                Cancel
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

export default MyReservation;
