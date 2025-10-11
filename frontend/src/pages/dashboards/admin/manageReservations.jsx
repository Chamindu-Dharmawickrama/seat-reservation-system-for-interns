import { useEffect, useState } from "react";
import {
    Calendar,
    MapPin,
    Clock,
    Edit,
    Trash2,
    Eye,
    Search,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useToast, ToastContainer } from "../../../components/Toast";
import {
    fetchReservations,
    deleteReservation,
    clearErrors,
    searchReservations,
} from "../../../redux/adminSlice";

const ManageReservations = () => {
    const dispatch = useDispatch();

    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [searchTerm, setSearchTerm] = useState("");

    //get the state from the redux store
    const {
        reservations,
        reservationsLoading,
        reservationsError,
        reservationsSuccess,
        deleteReservationPayload,
        deleteReservationLoading,
        deleteReservationError,
        deleteReservationSuccess,
    } = useSelector((state) => state.admin);

    const { toasts, showSuccess, showError, removeToast } = useToast();

    //fetch all reservations errors
    const [fetchError, setFetchError] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteReservationInfo, setDeleteReservationInfo] = useState(null);

    console.log("fetching reservation error", fetchError);
    console.log("Error delete reservation ", deleteReservationError);

    // // fetch the all reservations
    useEffect(() => {
        try {
            dispatch(fetchReservations());
        } catch (error) {
            setFetchError(error.message);
        }
    }, [dispatch]);

    // for getting reservation status color
    const getReservationStatusColor = (status) => {
        switch (status) {
            case "active":
                return "bg-green-100 text-green-800";
            case "upcoming":
                return "bg-blue-100 text-blue-800";
            case "completed":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    // handle the delete reservation
    const handleDeleteReservation = (id) => {
        dispatch(deleteReservation(id));
        setIsDeleteModalOpen(false);
        setDeleteReservationInfo(null);
    };

    //handle delete reservation success/ Error
    useEffect(() => {
        if (deleteReservationSuccess) {
            showSuccess("Reservation deleted successfully");
        } else if (deleteReservationError) {
            showError("Failed to delete reservation");
            // Clear the error after showing toast
            setTimeout(() => {
                dispatch(clearErrors());
            }, 100);
        }
    }, [
        deleteReservationSuccess,
        deleteReservationError,
        showSuccess,
        showError,
        dispatch,
    ]);

    // //search
    // useEffect(() => {
    //     dispatch(searchReservations({ searchTerm, selectedDate }));
    // }, [searchTerm, selectedDate, dispatch]);

    console.log("date", selectedDate);
    console.log("All reservations", reservations)

    return (
        <div className="p-6 lg:p-8">
            <div>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Filter by Date
                        </label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Search by Intern
                        </label>
                        <div className="relative">
                            <Search className="w-5 h-5 absolute left-3 mt-1 ml-1 mr-1 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by intern name or ID..."
                                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]"
                                onChange={(e) => setSearchTerm(e.target.value)}
                                value={searchTerm}
                            />
                        </div>
                    </div>
                </div>

                {/* Reservations List */}
                <div className="space-y-4">
                    {reservationsError ? (
                        <div className="flex items-center justify-between bg-red-50 border border-red-50 text-red-700 px-4 py-8 shadow-sm">
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
                                    {reservationsError}
                                </span>
                            </div>
                        </div>
                    ) : reservationsLoading ? (
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
                            <span className="font-semibold">
                                Loading reservations...
                            </span>
                        </div>
                    ) : reservations.length === 0 ? (
                        <div className="flex items-center text-center justify-center bg-gray-50 border border-gray-200 text-gray-700 px-4 py-3 rounded-xl shadow-sm">
                            No reservations found.
                        </div>
                    ) : (
                        reservations.map((reservation) => (
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
                                                Seat {reservation.seat.seatNumber}
                                            </h3>
                                            <p className="text-base text-gray-600 mb-1">
                                                {reservation.seat.floor}
                                            </p>
                                            <div className="flex items-center text-gray-500">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                <span className="text-sm font-medium">
                                                    {reservation.date}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-800 mb-1">
                                                {reservation.user.firstName}
                                            </h4>
                                            <p className="text-sm text-gray-600 mb-1">
                                                ID: {reservation.user.internId}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {reservation.purpose}
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
                                                    reservation.status.slice(1)}
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
                                        <button
                                            className="p-3 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-200"
                                            onClick={() => {
                                                setIsDeleteModalOpen(true);
                                                setDeleteReservationInfo(
                                                    reservation
                                                );
                                            }}
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Toast Container */}
            <ToastContainer toasts={toasts} removeToast={removeToast} />

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
                                {deleteReservationInfo
                                    ? deleteReservationInfo.id
                                    : ""}
                            </strong>
                            ?
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() =>
                                    handleDeleteReservation(
                                        deleteReservationInfo.id
                                    )
                                }
                                className="px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => {
                                    setIsDeleteModalOpen(false);
                                    setDeleteReservationInfo(null);
                                }}
                                className="px-4 py-2 font-semibold bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageReservations;
