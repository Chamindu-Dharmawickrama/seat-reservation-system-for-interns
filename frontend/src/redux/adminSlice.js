import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";

// Async thunks for Admin API calls

//fetch all seats
export const fetchSeats = createAsyncThunk(
    "admin/fetchSeats",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/admin/seats");
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch seats"
            );
        }
    }
);

//add new seat
export const addSeat = createAsyncThunk(
    "admin/addSeat",
    async (seatData, { rejectWithValue }) => {
        try {
            const response = await api.post("/admin/seats", seatData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to add seat"
            );
        }
    }
);

//update seat information
export const updateSeat = createAsyncThunk(
    "admin/updateSeat",
    async ({ id, seatData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/admin/seats/${id}`, seatData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update seat"
            );
        }
    }
);

//delete seat
export const deleteSeat = createAsyncThunk(
    "admin/deleteSeat",
    async (seatId, { rejectWithValue }) => {
        try {
            await api.delete(`/admin/seats/${seatId}`);
            return seatId;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete seat"
            );
        }
    }
);

//fetch all reservations
export const fetchReservations = createAsyncThunk(
    "admin/fetchReservations",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/admin/reservations");
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch reservations"
            );
        }
    }
);

//fetch reservations by id
export const fetchReservationById = createAsyncThunk(
    "admin/fetchReservationById",
    async (reservationId, { rejectWithValue }) => {
        try {
            const response = await api.get(
                `/admin/reservations/${reservationId}`
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch reservation"
            );
        }
    }
);

//delete reservations
export const deleteReservation = createAsyncThunk(
    "admin/deleteReservation",
    async (reservationId, { rejectWithValue }) => {
        try {
            await api.delete(`/admin/reservations/${reservationId}`);
            return reservationId;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete reservation"
            );
        }
    }
);

//fetch all interns
export const fetchInterns = createAsyncThunk(
    "admin/fetchInterns",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/admin/interns");
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch interns"
            );
        }
    }
);

//asign seat to the intern (admin)
export const assignSeat = createAsyncThunk(
    "admin/assignSeat",
    async (assignmentData, { rejectWithValue }) => {
        try {
            const response = await api.post(
                "/admin/assignments",
                assignmentData
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to assign seat"
            );
        }
    }
);

//fetch recent activity (extra feature)
export const fetchRecentActivities = createAsyncThunk(
    "admin/fetchRecentActivities",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/admin/activities");
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch activities"
            );
        }
    }
);

//get total seats , available ...etc
export const fetchDashboardStats = createAsyncThunk(
    "admin/fetchDashboardStats",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/admin/stats");
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch stats"
            );
        }
    }
);

const initialState = {
    // Seats
    seats: [],
    seatsLoading: false,
    seatsError: null,

    // Interns
    interns: [],
    internsLoading: false,
    internsError: null,

    //reservations
    reservations: [],
    reservationsLoading: false,
    reservationsError: null,
    reservationsSuccess: false,

    //reservation by id
    selectedReservation: null,
    selectedReservationLoading: false,
    selectedReservationError: null,

    //delete reservations
    deleteReservationPayload: null,
    deleteReservationLoading: false,
    deleteReservationError: null,
    deleteReservationSuccess: false,

    // Recent Activities
    recentActivities: [],
    activitiesLoading: false,
    activitiesError: null,

    // Dashboard Stats
    dashboardStats: {
        totalSeats: 0,
        availableSeats: 0,
        occupiedSeats: 0,
        maintenanceSeats: 0,
        totalInterns: 0,
        activeAssignments: 0,
    },
    statsLoading: false,
    statsError: null,

    // Assignment ( seat to the intern )
    assignmentLoading: false,
    assignmentError: null,
    assignmentSuccess: false,

    // Seat operations
    seatOperationLoading: false,
    seatOperationError: null,
    seatOperationSuccess: false,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.seatsError = null;
            state.internsError = null;
            state.activitiesError = null;
            state.statsError = null;
            state.assignmentError = null;
            state.seatOperationError = null;
            state.deleteReservationError = null;
        },
        clearSuccess: (state) => {
            state.assignmentSuccess = false;
            state.seatOperationSuccess = false;
        },
        resetSeatOperation: (state) => {
            state.seatOperationLoading = false;
            state.seatOperationError = null;
            state.seatOperationSuccess = false;
        },
        resetAssignment: (state) => {
            state.assignmentLoading = false;
            state.assignmentError = null;
            state.assignmentSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Seats
            .addCase(fetchSeats.pending, (state) => {
                state.seatsLoading = true;
                state.seatsError = null;
            })
            .addCase(fetchSeats.fulfilled, (state, action) => {
                state.seatsLoading = false;
                state.seats = action.payload;
            })
            .addCase(fetchSeats.rejected, (state, action) => {
                state.seatsLoading = false;
                state.seatsError = action.payload;
            })

            // Add Seat
            .addCase(addSeat.pending, (state) => {
                state.seatOperationLoading = true;
                state.seatOperationError = null;
            })
            .addCase(addSeat.fulfilled, (state, action) => {
                state.seatOperationLoading = false;
                state.seatOperationSuccess = true;
                state.seats.push(action.payload);
            })
            .addCase(addSeat.rejected, (state, action) => {
                state.seatOperationLoading = false;
                state.seatOperationError = action.payload;
            })

            // Update Seat
            .addCase(updateSeat.pending, (state) => {
                state.seatOperationLoading = true;
                state.seatOperationError = null;
            })
            .addCase(updateSeat.fulfilled, (state, action) => {
                state.seatOperationLoading = false;
                state.seatOperationSuccess = true;
                const index = state.seats.findIndex(
                    (seat) => seat.id === action.payload.id
                );
                if (index !== -1) {
                    state.seats[index] = action.payload;
                }
            })
            .addCase(updateSeat.rejected, (state, action) => {
                state.seatOperationLoading = false;
                state.seatOperationError = action.payload;
            })

            // Delete Seat
            .addCase(deleteSeat.pending, (state) => {
                state.seatOperationLoading = true;
                state.seatOperationError = null;
            })
            .addCase(deleteSeat.fulfilled, (state, action) => {
                state.seatOperationLoading = false;
                state.seatOperationSuccess = true;
                state.seats = state.seats.filter(
                    (seat) => seat.id !== action.payload
                );
            })
            .addCase(deleteSeat.rejected, (state, action) => {
                state.seatOperationLoading = false;
                state.seatOperationError = action.payload;
            })

            // Fetch Interns
            .addCase(fetchInterns.pending, (state) => {
                state.internsLoading = true;
                state.internsError = null;
            })
            .addCase(fetchInterns.fulfilled, (state, action) => {
                state.internsLoading = false;
                state.interns = action.payload;
            })
            .addCase(fetchInterns.rejected, (state, action) => {
                state.internsLoading = false;
                state.internsError = action.payload;
            })

            // Fetch Reservations
            .addCase(fetchReservations.pending, (state) => {
                state.reservationsLoading = true;
                state.reservationsError = null;
            })
            .addCase(fetchReservations.fulfilled, (state, action) => {
                state.reservationsLoading = false;
                state.reservationsSuccess = true;
                state.reservations = action.payload;
            })
            .addCase(fetchReservations.rejected, (state, action) => {
                state.reservationsLoading = false;
                state.reservationsSuccess = false;
                state.reservationsError = action.payload;
            })

            // Fetch Reservation by ID
            .addCase(fetchReservationById.pending, (state) => {
                state.selectedReservationLoading = true;
                state.selectedReservationError = null;
            })
            .addCase(fetchReservationById.fulfilled, (state, action) => {
                state.selectedReservationLoading = false;
                state.selectedReservation = action.payload;
            })
            .addCase(fetchReservationById.rejected, (state, action) => {
                state.selectedReservationLoading = false;
                state.selectedReservationError = action.payload;
            })

            // Delete Reservation
            .addCase(deleteReservation.pending, (state) => {
                state.deleteReservationLoading = true;
                state.deleteReservationError = null;
            })
            .addCase(deleteReservation.fulfilled, (state, action) => {
                state.deleteReservationLoading = false;
                state.deleteReservationSuccess = true;
                state.deleteReservationPayload = action.payload;
            })
            .addCase(deleteReservation.rejected, (state, action) => {
                state.deleteReservationLoading = false;
                state.deleteReservationSuccess = false;
                state.deleteReservationError = action.payload;
            })

            // Assign Seat
            .addCase(assignSeat.pending, (state) => {
                state.assignmentLoading = true;
                state.assignmentError = null;
            })
            .addCase(assignSeat.fulfilled, (state, action) => {
                state.assignmentLoading = false;
                state.assignmentSuccess = true;
                // Update seat status if needed
                const seatId = action.payload.seatId;
                const seatIndex = state.seats.findIndex(
                    (seat) => seat.id === seatId
                );
                if (seatIndex !== -1) {
                    state.seats[seatIndex].status = "occupied";
                    state.seats[seatIndex].assignedTo = action.payload.internId;
                }
            })
            .addCase(assignSeat.rejected, (state, action) => {
                state.assignmentLoading = false;
                state.assignmentError = action.payload;
            })

            // Fetch Recent Activities
            .addCase(fetchRecentActivities.pending, (state) => {
                state.activitiesLoading = true;
                state.activitiesError = null;
            })
            .addCase(fetchRecentActivities.fulfilled, (state, action) => {
                state.activitiesLoading = false;
                state.recentActivities = action.payload;
            })
            .addCase(fetchRecentActivities.rejected, (state, action) => {
                state.activitiesLoading = false;
                state.activitiesError = action.payload;
            })

            // Fetch Dashboard Stats
            .addCase(fetchDashboardStats.pending, (state) => {
                state.statsLoading = true;
                state.statsError = null;
            })
            .addCase(fetchDashboardStats.fulfilled, (state, action) => {
                state.statsLoading = false;
                state.dashboardStats = action.payload;
            })
            .addCase(fetchDashboardStats.rejected, (state, action) => {
                state.statsLoading = false;
                state.statsError = action.payload;
            });
    },
});

export const {
    clearErrors,
    clearSuccess,
    resetSeatOperation,
    resetAssignment,
} = adminSlice.actions;
export default adminSlice.reducer;
