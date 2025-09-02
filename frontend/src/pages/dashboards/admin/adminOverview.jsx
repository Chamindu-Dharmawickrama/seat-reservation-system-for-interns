import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Plus,
    Users,
    Edit,
    AlertCircle,
    X,
    Loader2,
} from "lucide-react";
import {
    fetchSeats,
    fetchInterns,
    fetchRecentActivities,
    addSeat,
    updateSeat,
    assignSeat,
    clearErrors,
    clearSuccess,
    resetSeatOperation,
    resetAssignment,
} from "../../../redux/adminSlice";
import { useToast, ToastContainer } from "../../../components/Toast";

const AdminOverview = () => {
    const dispatch = useDispatch();
    const { toasts, removeToast, showSuccess, showError, showInfo } =
        useToast();

    console.log(toasts)  
    
    // Redux state
    const {
        seats,
        seatsLoading,
        interns,
        internsLoading,
        recentActivities,
        activitiesLoading,
        seatOperationLoading,
        seatOperationError,
        seatOperationSuccess,
        assignmentLoading,
        assignmentError,
        assignmentSuccess,
    } = useSelector((state) => state.admin);

    // Component state
    const [showSeatModal, setShowSeatModal] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedSeat, setSelectedSeat] = useState(null);

    // Form states
    const [seatForm, setSeatForm] = useState({
        seatNumber: "",
        floor: "",
        location: "",
        status: "available",
    });

    const [assignmentForm, setAssignmentForm] = useState({
        internId: "",
        seatId: "",
        date: "",
        timeSlot: "09:00 AM - 05:00 PM (Full Day)",
    });

    // Load initial data
    useEffect(() => {
        dispatch(fetchSeats());
        dispatch(fetchInterns());
        dispatch(fetchRecentActivities());
    }, [dispatch]);

    // Handle success states
    useEffect(() => {
        if (seatOperationSuccess) {
            setShowSeatModal(false);
            resetSeatForm();
            dispatch(resetSeatOperation());
            dispatch(fetchSeats());
            showSuccess(
                editMode
                    ? "Seat updated successfully!"
                    : "Seat added successfully!"
            );
        }
    }, [seatOperationSuccess, dispatch, editMode, showSuccess]);

    useEffect(() => {
        if (assignmentSuccess) {
            setShowAssignModal(false);
            resetAssignmentForm();
            dispatch(resetAssignment());
            dispatch(fetchSeats());
            dispatch(fetchRecentActivities());
            showSuccess("Seat assigned successfully!");
        }
    }, [assignmentSuccess, dispatch, showSuccess]);

    // Handle error states
    useEffect(() => {
        if (seatOperationError) {
            showError(seatOperationError);
        }
    }, [seatOperationError, showError]);

    useEffect(() => {
        if (assignmentError) {
            showError(assignmentError);
        }
    }, [assignmentError, showError]);

    // Form handlers
    const resetSeatForm = () => {
        setSeatForm({
            seatNumber: "",
            floor: "",
            location: "",
            status: "available",
        });
        setSelectedSeat(null);
        setEditMode(false);
    };

    const resetAssignmentForm = () => {
        setAssignmentForm({
            internId: "",
            seatId: "",
            date: "",
            timeSlot: "09:00 AM - 05:00 PM (Full Day)",
        });
    };

    const handleSeatFormChange = (e) => {
        setSeatForm({
            ...seatForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleAssignmentFormChange = (e) => {
        setAssignmentForm({
            ...assignmentForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddSeat = () => {
        setEditMode(false);
        resetSeatForm();
        setShowSeatModal(true);
    };

    const handleEditSeat = (seat) => {
        setEditMode(true);
        setSelectedSeat(seat);
        setSeatForm({
            seatNumber: seat.seatNumber,
            floor: seat.floor,
            location: seat.location,
            status: seat.status,
        });
        setShowSeatModal(true);
    };

    const handleSeatSubmit = (e) => {
        e.preventDefault();
        if (editMode && selectedSeat) {
            dispatch(updateSeat({ id: selectedSeat.id, seatData: seatForm }));
        } else {
            dispatch(addSeat(seatForm));
        }
    };

    const handleAssignmentSubmit = (e) => {
        e.preventDefault();
        dispatch(assignSeat(assignmentForm));
    };

    const getAvailableSeats = () => {
        return seats.filter((seat) => seat.status === "available");
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case "assignment":
                return "bg-[#39B54A]";
            case "seat_added":
                return "bg-[#00B5E2]";
            case "maintenance":
                return "bg-yellow-500";
            default:
                return "bg-gray-500";
        }
    };

    return (
        <div className="p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    System Overview
                </h3>
                <p className="text-gray-600">
                    Manage seats, assignments, and monitor system activity
                </p>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quick Actions */}
                <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-200/50 shadow-md">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                        Quick Actions
                    </h4>
                    <div className="space-y-3">
                        <button
                            onClick={handleAddSeat}
                            disabled={seatOperationLoading}
                            className="w-full bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white py-3 px-4 rounded-lg font-semibold text-base hover:from-[#004080] hover:to-[#0099CC] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                        >
                            {seatOperationLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Plus className="w-4 h-4" />
                            )}
                            <span>Add New Seat</span>
                        </button>
                        <button
                            onClick={() => setShowAssignModal(true)}
                            disabled={assignmentLoading}
                            className="w-full bg-gradient-to-r from-[#39B54A] to-[#00B5E2] text-white py-3 px-4 rounded-lg font-semibold text-base hover:from-[#2d8f3f] hover:to-[#0099CC] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                        >
                            {assignmentLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Users className="w-4 h-4" />
                            )}
                            <span>Manual Seat Assignment</span>
                        </button>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-200/50 shadow-md">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                        Recent Activity
                    </h4>
                    <div className="space-y-3">
                        {activitiesLoading ? (
                            <div className="flex items-center justify-center py-4">
                                <Loader2 className="w-6 h-6 animate-spin" />
                            </div>
                        ) : recentActivities.length > 0 ? (
                            recentActivities
                                .slice(0, 5)
                                .map((activity, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-3 text-sm"
                                    >
                                        <div
                                            className={`w-2 h-2 ${getActivityIcon(
                                                activity.type
                                            )} rounded-full`}
                                        ></div>
                                        <span>{activity.message}</span>
                                    </div>
                                ))
                        ) : (
                            <p className="text-gray-500 text-sm">
                                No recent activities
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Add/Edit Seat Modal */}
            {showSeatModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
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
                                    <option value="available">Available</option>
                                    <option value="maintenance">
                                        Maintenance
                                    </option>
                                    <option value="occupied">Occupied</option>
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
                                    {editMode ? "Update Seat" : "Add Seat"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Assignment Modal */}
            {showAssignModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-xl border border-white/20 transform transition-all duration-300">
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#39B54A] to-[#00B5E2] rounded-xl flex items-center justify-center mx-auto mb-3">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                Manual Seat Assignment
                            </h3>
                        </div>

                        {assignmentError && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                                <span className="text-red-700 text-sm">
                                    {assignmentError}
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
                            onSubmit={handleAssignmentSubmit}
                            className="space-y-6"
                        >
                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-2">
                                    Select Intern *
                                </label>
                                <select
                                    name="internId"
                                    value={assignmentForm.internId}
                                    onChange={handleAssignmentFormChange}
                                    required
                                    className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]"
                                >
                                    <option value="">Choose an intern</option>
                                    {internsLoading ? (
                                        <option disabled>
                                            Loading interns...
                                        </option>
                                    ) : (
                                        interns.map((intern) => (
                                            <option
                                                key={intern.id}
                                                value={intern.id}
                                            >
                                                {intern.name} ({intern.internId}
                                                )
                                            </option>
                                        ))
                                    )}
                                </select>
                            </div>
                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-2">
                                    Select Seat *
                                </label>
                                <select
                                    name="seatId"
                                    value={assignmentForm.seatId}
                                    onChange={handleAssignmentFormChange}
                                    required
                                    className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]"
                                >
                                    <option value="">Choose a seat</option>
                                    {seatsLoading ? (
                                        <option disabled>
                                            Loading seats...
                                        </option>
                                    ) : (
                                        getAvailableSeats().map((seat) => (
                                            <option
                                                key={seat.id}
                                                value={seat.id}
                                            >
                                                {seat.seatNumber} - {seat.floor}{" "}
                                                (Available)
                                            </option>
                                        ))
                                    )}
                                </select>
                            </div>
                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-2">
                                    Date *
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={assignmentForm.date}
                                    onChange={handleAssignmentFormChange}
                                    min={new Date().toISOString().split("T")[0]}
                                    required
                                    className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]"
                                />
                            </div>
                            <div>
                                <label className="block text-base font-semibold text-gray-800 mb-2">
                                    Time Slot
                                </label>
                                <select
                                    name="timeSlot"
                                    value={assignmentForm.timeSlot}
                                    onChange={handleAssignmentFormChange}
                                    className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]"
                                >
                                    <option value="09:00 AM - 05:00 PM (Full Day)">
                                        09:00 AM - 05:00 PM (Full Day)
                                    </option>
                                    <option value="09:00 AM - 01:00 PM (Morning)">
                                        09:00 AM - 01:00 PM (Morning)
                                    </option>
                                    <option value="01:00 PM - 05:00 PM (Afternoon)">
                                        01:00 PM - 05:00 PM (Afternoon)
                                    </option>
                                </select>
                            </div>
                            <div className="flex space-x-4 mt-8">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAssignModal(false);
                                        resetAssignmentForm();
                                        dispatch(clearErrors());
                                    }}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-semibold text-base"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={assignmentLoading}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#39B54A] to-[#00B5E2] text-white rounded-lg hover:from-[#2d8f3f] hover:to-[#0099CC] transition-all duration-200 font-semibold text-base shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center"
                                >
                                    {assignmentLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    ) : null}
                                    Assign Seat
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Toast Container */}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </div>
    );
};

export default AdminOverview;
