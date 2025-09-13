import { useState, useEffect } from "react";
import {
    MapPin,
    Plus,
    Edit,
    Trash2,
    Search,
    Building,
    Loader2,
    AlertCircle,
    X,
} from "lucide-react";
import {
    addSeat,
    resetSeatOperation,
    fetchSeats,
    clearErrors,
    deleteSeat,
    searchSeatByTerm,
    resetDeleteOperation,
    updateSeat,
} from "../../../redux/adminSlice";
import { useToast, ToastContainer } from "../../../components/Toast";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../../../hooks/useDebounce.js";

const ManageSeats = () => {
    const dispatch = useDispatch();

    // notify service
    const { toasts, removeToast, showSuccess, showError, showInfo } =
        useToast();

    console.log(toasts);

    // get the seat adding state
    const {
        seats,
        seatsLoading,
        seatsError,
        seatOperationLoading,
        seatOperationError,
        seatOperationSuccess,
        assignmentError,
        deleteSuccess,
        deleteError,
    } = useSelector((state) => state.admin);

    console.log("seats", seats);

    const [showSeatModal, setShowSeatModal] = useState(false);
    const [showUpdateSeatModal, setShowUpdateSeatModal] = useState(false);
    const [selectSeatData, setSelectSeatData] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteSeatInfo, setDeleteSeatInfo] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [status, setStatus] = useState("all");

    // new seat info
    const [seatForm, setSeatForm] = useState({
        seatNumber: "",
        floor: "",
        location: "",
        status: "AVAILABLE",
    });

    // update seat info
    const [updatedSeatData, setUpdatedSeatData] = useState({
        seatNumber: "",
        floor: "",
        location: "",
        status: "AVAILABLE",
    });

    // change the vlaue of the setSeatForm useState ( add seat )
    const handleSeatFormChange = (e) => {
        setSeatForm({
            ...seatForm,
            [e.target.name]: e.target.value,
        });
    };

    // handle change for update seat modal
    const handleUpdateSeatFormChange = (e) => {
        setUpdatedSeatData({
            ...updatedSeatData,
            [e.target.name]: e.target.value,
        });
    };

    // Form handlers
    const resetSeatForm = () => {
        setSeatForm({
            seatNumber: "",
            floor: "",
            location: "",
            status: "AVAILABLE",
        });
        setUpdatedSeatData({
            seatNumber: "",
            floor: "",
            location: "",
            status: "AVAILABLE",
        });
    };

    // open the add seat model
    const handleAddSeat = () => {
        console.log("clicked");
        resetSeatForm();
        setShowSeatModal(true);
    };

    // add seat
    const handleSeatSubmit = (e) => {
        e.preventDefault();
        console.log(seatForm);
        dispatch(addSeat(seatForm));
    };

    // update seat
    const handleUpdateSeatSubmit = (e) => {
        e.preventDefault();
        dispatch(
            updateSeat({ id: selectSeatData.id, seatData: updatedSeatData })
        );
    };

    // // Handle success states of add seat and update seat
    useEffect(() => {
        if (seatOperationSuccess) {
            setShowSeatModal(false);
            setShowUpdateSeatModal(false);
            resetSeatForm();
            dispatch(resetSeatOperation());
            //dispatch(fetchSeats());
            showSuccess(
                showUpdateSeatModal
                    ? "Seat updated successfully!"
                    : "Seat added successfully!"
            );
        }
    }, [seatOperationSuccess, dispatch, showUpdateSeatModal, showSuccess]);

    // Handle error states of add seat
    useEffect(() => {
        if (seatOperationError) {
            showError(seatOperationError);
        }
    }, [seatOperationError]);

    // useEffect(() => {
    //     if (assignmentError) {
    //         showError(assignmentError);
    //     }
    // }, [assignmentError, showError]);

    // fetch seats
    useEffect(() => {
        dispatch(fetchSeats());
    }, [dispatch, seatOperationSuccess]);

    // Get seat status class
    const getSeatStatusClass = (status) => {
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

    //handle delete seat
    const handleDelete = (id) => {
        dispatch(deleteSeat(id));
        setIsDeleteModalOpen(false);
        setDeleteSeatInfo(null);
    };

    // handle succes delete state
    useEffect(() => {
        if (deleteSuccess) {
            showSuccess("Seat deleted successfully!");
            dispatch(resetDeleteOperation());
        }
    }, [deleteSuccess, dispatch]);

    // handle Error delete state
    useEffect(() => {
        if (deleteError) {
            showSuccess("Seat deleted not successfully!");
            dispatch(resetDeleteOperation());
        }
    }, [deleteError, dispatch]);

    console.log("search term ", searchTerm);
    console.log("filter ", status);

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
            <div>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="w-5 h-5 absolute left-3 top-3 mt-1 ml-1 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search seats by seat number..."
                                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]"
                                onChange={(e) => setSearchTerm(e.target.value)}
                                value={searchTerm}
                            />
                        </div>
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
                    <button
                        className="bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white py-3 px-6 rounded-lg font-semibold hover:from-[#004080] hover:to-[#0099CC] transition-all duration-300 flex items-center space-x-2"
                        onClick={handleAddSeat}
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Seat</span>
                    </button>
                </div>

                {/* Seats Grid */}
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {seats.map((seat) => (
                            <div className="bg-white rounded-xl p-6 border border-gray-300/70 hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold text-gray-800">
                                        Seat {seat.seatNumber}
                                    </h3>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeatStatusClass(
                                            seat.status
                                        )}`}
                                    >
                                        {seat.status}
                                    </span>
                                </div>
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-gray-600">
                                        <Building className="w-4 h-4 mr-2" />
                                        <span className="text-sm">
                                            Floor {seat.floor}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        <span className="text-sm">
                                            {seat.location}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        className="flex-1 p-2 text-[#00B5E2] hover:bg-[#00B5E2] hover:text-white rounded-lg transition-all duration-200"
                                        onClick={() => {
                                            setShowUpdateSeatModal(true);
                                            setSelectSeatData(seat);
                                            setUpdatedSeatData({
                                                seatNumber: seat.seatNumber,
                                                floor: seat.floor,
                                                location: seat.location,
                                                status: seat.status,
                                            });
                                        }}
                                    >
                                        <Edit className="w-4 h-4 mx-auto" />
                                    </button>
                                    {/* <button className="flex-1 p-2 text-[#39B54A] hover:bg-[#39B54A] hover:text-white rounded-lg transition-all duration-200">
                                        <Users className="w-4 h-4 mx-auto" />
                                    </button> */}
                                    <button
                                        className="flex-1 p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-200 "
                                        onClick={() => {
                                            setIsDeleteModalOpen(true);
                                            setDeleteSeatInfo(seat);
                                        }}
                                    >
                                        <Trash2 className="w-4 h-4 mx-auto" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add Seat Modal */}
            {showSeatModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl border border-white/20 transform transition-all duration-300">
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#0057A8] to-[#00B5E2] rounded-xl flex items-center justify-center mx-auto mb-3">
                                <Plus className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                Add New Seat
                            </h3>
                        </div>

                        {/* Error Message */}
                        {seatOperationError && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                                <span className="text-red-700 text-sm">
                                    {seatOperationError}
                                </span>
                                <button
                                    onClick={() => dispatch(clearErrors())}
                                    className="ml-auto text-red-500 hover:text-red-700"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        <form onSubmit={handleSeatSubmit} className="space-y-6">
                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-2">
                                    Seat Number *
                                </label>
                                <input
                                    type="text"
                                    name="seatNumber"
                                    value={seatForm.seatNumber}
                                    onChange={handleSeatFormChange}
                                    required
                                    className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]"
                                    placeholder="e.g., A01"
                                />
                            </div>
                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-2">
                                    Floor *
                                </label>
                                <select
                                    name="floor"
                                    value={seatForm.floor}
                                    onChange={handleSeatFormChange}
                                    required
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
                                <select
                                    name="location"
                                    value={seatForm.location}
                                    onChange={handleSeatFormChange}
                                    required
                                    className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]"
                                >
                                    <option value="">Select Location</option>
                                    <option value="window">Window</option>
                                    <option value="center">Center</option>
                                    <option value="corner">Corner</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-2">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={seatForm.status}
                                    onChange={handleSeatFormChange}
                                    className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]"
                                >
                                    <option value="AVAILABLE">Available</option>
                                    <option value="MAINTENANCE">
                                        Maintenance
                                    </option>
                                    <option value="OCCUPIED">Occupied</option>
                                </select>
                            </div>
                            <div className="flex space-x-4 mt-8">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowSeatModal(false);
                                        resetSeatForm();
                                        dispatch(clearErrors());
                                    }}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-semibold text-base"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={seatOperationLoading}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white rounded-lg hover:from-[#004080] hover:to-[#0099CC] transition-all duration-200 font-semibold text-base shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center"
                                >
                                    {seatOperationLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    ) : null}
                                    Add Seat
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* update/edit seat */}
            {showUpdateSeatModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl border border-white/20 transform transition-all duration-300">
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#0057A8] to-[#00B5E2] rounded-xl flex items-center justify-center mx-auto mb-3">
                                <Plus className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                Edit {selectSeatData.seatNumber} Seat
                            </h3>
                        </div>

                        {/* Error Message */}
                        {seatOperationError && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                                <span className="text-red-700 text-sm">
                                    {seatOperationError}
                                </span>
                                <button
                                    onClick={() => dispatch(clearErrors())}
                                    className="ml-auto text-red-500 hover:text-red-700"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        <form
                            onSubmit={handleUpdateSeatSubmit}
                            className="space-y-6"
                        >
                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-2">
                                    Seat Number *
                                </label>
                                <input
                                    type="text"
                                    name="seatNumber"
                                    value={selectSeatData.seatNumber}
                                    //onChange={handleUpdateSeatFormChange}
                                    required
                                    className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]"
                                    placeholder="e.g., A01"
                                />
                            </div>
                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-2">
                                    Floor *
                                </label>
                                <select
                                    name="floor"
                                    value={updatedSeatData.floor}
                                    onChange={handleUpdateSeatFormChange}
                                    required
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
                                <select
                                    name="location"
                                    value={updatedSeatData.location}
                                    onChange={handleUpdateSeatFormChange}
                                    required
                                    className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]"
                                >
                                    <option value="">Select Location</option>
                                    <option value="window">Window</option>
                                    <option value="center">Center</option>
                                    <option value="corner">Corner</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-2">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={updatedSeatData.status}
                                    onChange={handleUpdateSeatFormChange}
                                    className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]"
                                >
                                    <option value="AVAILABLE">Available</option>
                                    <option value="MAINTENANCE">
                                        Maintenance
                                    </option>
                                    <option value="OCCUPIED">Occupied</option>
                                </select>
                            </div>
                            <div className="flex space-x-4 mt-8">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowUpdateSeatModal(false);
                                        setSelectSeatData(null);
                                        resetSeatForm();
                                        dispatch(clearErrors());
                                    }}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-semibold text-base"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={seatOperationLoading}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white rounded-lg hover:from-[#004080] hover:to-[#0099CC] transition-all duration-200 font-semibold text-base shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center"
                                >
                                    {seatOperationLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    ) : null}
                                    Update Seat
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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
                                {deleteSeatInfo
                                    ? deleteSeatInfo.seatNumber
                                    : ""}
                            </strong>
                            ?
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => handleDelete(deleteSeatInfo.id)}
                                className="px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => {
                                    setIsDeleteModalOpen(false);
                                    setDeleteSeatInfo(null);
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

export default ManageSeats;
