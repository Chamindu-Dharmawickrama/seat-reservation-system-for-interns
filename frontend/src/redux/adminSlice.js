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

//fetch all users
export const fetchUsers = createAsyncThunk(
    "admin/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/admin/users");
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch users "
            );
        }
    }
);

//search user
export const searchUser = createAsyncThunk(
    "admin/searchUser",
    async (query, { rejectWithValue }) => {
        try {
            const response = await api.get(`/admin/users/search?query=${query}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to search users"
            );
        }
    }
);

//delete user
export const deleteUser = createAsyncThunk(
    "admin/deleteUser",
    async (userId, { rejectWithValue }) => {
        try {
            await api.delete(`/admin/users/${userId}`);
            return userId;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete user"
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

//get all register emails
export const fetchAllRegisteredEmails = createAsyncThunk(
    "admin/fetchAllRegisteredEmails",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/admin/emails");
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch emails"
            );
        }
    }
);

// register new email to the system
export const registerNewEmail = createAsyncThunk(
    "admin/registerNewEmail",
    async (emailData, { rejectWithValue }) => {
        try {
            const response = await api.post("/admin/emails", emailData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to add email"
            );
        }
    }
);

// delete registered email
export const deleteRegisteredEmail = createAsyncThunk(
    "admin/deleteRegisteredEmail",
    async (emailId, { rejectWithValue }) => {
        try {
            await api.delete(`/admin/emails/${emailId}`);
            return emailId;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete email"
            );
        }
    }
);

// get the reports
export const getReports = createAsyncThunk(
    "admin/getReports",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/admin/reports");
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch reports"
            );
        }
    }
);

//get quick stats
export const getQuickStats = createAsyncThunk(
    "admin/getQuickStats",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/admin/quick-stats");
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch quick stats"
            );
        }
    }
);

const initialState = {
    // Seats
    seats: [],
    seatsLoading: false,
    seatsError: null,

    //user
    users: [],
    usersLoading: false,
    usersError: null,

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

    // email operations
    emails: [],
    emailsLoading: false,
    emailsError: null,
    emailsSuccess: null,

    // reports
    reports: [],
    reportsLoading: false,
    reportsError: null,

    // stats
    quickStats: {},
    quickStatsLoading: false,
    quickStatsError: null,
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
            state.emailsError = null;
        },
        clearSuccess: (state) => {
            state.assignmentSuccess = false;
            state.seatOperationSuccess = false;
            state.emailsSuccess = null;
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
        resetEmailOperation: (state) => {
            state.emailsLoading = false;
            state.emailsError = null;
            state.emailsSuccess = null;
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

            // Fetch Users
            .addCase(fetchUsers.pending, (state) => {
                state.usersLoading = true;
                state.usersError = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.usersLoading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.usersLoading = false;
                state.usersError = action.payload;
            })

            // Search User
            .addCase(searchUser.pending, (state) => {
                state.usersLoading = true;
                state.usersError = null;
            })
            .addCase(searchUser.fulfilled, (state, action) => {
                state.usersLoading = false;
                state.users = action.payload;
            })
            .addCase(searchUser.rejected, (state, action) => {
                state.usersLoading = false;
                state.usersError = action.payload;
            })

            //delete user
            .addCase(deleteUser.pending, (state) => {
                state.usersLoading = true;
                state.usersError = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.usersLoading = false;
                state.usersSuccess = true;
                state.users = state.users.filter((user) => user.id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.usersLoading = false;
                state.usersError = action.payload;
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
            })

            // fetch Emails
            .addCase(fetchAllRegisteredEmails.pending, (state) => {
                state.emailsLoading = true;
                state.emailsError = null;
            })
            .addCase(fetchAllRegisteredEmails.fulfilled, (state, action) => {
                state.emailsLoading = false;
                state.emailsSuccess = true;
                state.emails = action.payload;
            })
            .addCase(fetchAllRegisteredEmails.rejected, (state, action) => {
                state.emailsLoading = false;
                state.emailsError = action.payload;
                state.emailsSuccess = null;
            })

            // add Email
            .addCase(registerNewEmail.pending, (state) => {
                state.emailsLoading = true;
                state.emailsError = null;
                state.emailsSuccess = null;
            })
            .addCase(registerNewEmail.fulfilled, (state, action) => {
                state.emailsLoading = false;
                state.emailsSuccess = true;
                state.emails.push(action.payload);
            })
            .addCase(registerNewEmail.rejected, (state, action) => {
                state.emailsLoading = false;
                state.emailsError = action.payload;
                state.emailsSuccess = null;
            })

            // delete email
            .addCase(deleteRegisteredEmail.pending, (state) => {
                state.emailsLoading = true;
                state.emailsError = null;
            })
            .addCase(deleteRegisteredEmail.fulfilled, (state, action) => {
                state.emailsLoading = false;
                state.emailsSuccess = true;
                state.emails = state.emails.filter(
                    (email) => email.id !== action.payload.id
                );
            })
            .addCase(deleteRegisteredEmail.rejected, (state, action) => {
                state.emailsLoading = false;
                state.emailsError = action.payload;
                state.emailsSuccess = false;
            })

            // reports
            .addCase(getReports.pending, (state) => {
                state.reportsLoading = true;
                state.reportsError = null;
            })
            .addCase(getReports.fulfilled, (state, action) => {
                state.reportsLoading = false;
                state.reports = action.payload;
            })
            .addCase(getReports.rejected, (state, action) => {
                state.reportsLoading = false;
                state.reportsError = action.payload;
            })

            // quick stats
            .addCase(getQuickStats.pending, (state) => {
                state.quickStatsLoading = true;
                state.quickStatsError = null;
            })
            .addCase(getQuickStats.fulfilled, (state, action) => {
                state.quickStatsLoading = false;
                state.quickStats = action.payload;
            })
            .addCase(getQuickStats.rejected, (state, action) => {
                state.quickStatsLoading = false;
                state.quickStatsError = action.payload;
            });
    },
});

export const {
    clearErrors,
    clearSuccess,
    resetSeatOperation,
    resetAssignment,
    resetEmailOperation,
} = adminSlice.actions;
export default adminSlice.reducer;
