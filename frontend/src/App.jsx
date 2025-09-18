import React, { lazy, Suspense } from "react";
import Home from "./pages/home/home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import AdminDashboard from "./pages/dashboards/admin/adminDashboard";
import InternRegister from "./pages/register/internRegister";
import NotFound from "./pages/error/NotFound";
import "./App.css";
import AdminDashboardBackup from "./pages/dashboards/admin/backup";
import BackUpInternDashboard from "./pages/dashboards/intern/backup";
import InternDashboard from "./pages/dashboards/intern/internDashboard";

// Lazy loading used for admin Dashboard
const AdminOverview = lazy(() =>
    import("./pages/dashboards/admin/adminOverview")
);
const ManageSeats = lazy(() => import("./pages/dashboards/admin/manageSeats"));
const ManageReservations = lazy(() =>
    import("./pages/dashboards/admin/manageReservations")
);
const Reports = lazy(() => import("./pages/dashboards/admin/reports"));
const Users = lazy(() => import("./pages/dashboards/admin/users"));
const AllUsers = lazy(() => import("./pages/dashboards/admin/allUsers"));
const RegisteredEmails = lazy(() =>
    import("./pages/dashboards/admin/registeredEmails")
);

// lazy loading for internship dashboard
const AvailableSeats = lazy(() =>
    import("./pages/dashboards/intern/availableSeat")
);
const MyReservations = lazy(() =>
    import("./pages/dashboards/intern/myReservation")
);

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
                path="/backUpInternDashboard"
                element={<BackUpInternDashboard />}
            />
            <Route path="/signUp" element={<InternRegister />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/backup" element={<AdminDashboardBackup />} />

            {/* admin routes */}
            <Route path="/adminDashboard" element={<AdminDashboard />}>
                <Route
                    index
                    element={
                        <Suspense
                            fallback={
                                <div className="min-h-[80vh] flex text-center justify-center pt-28 text-gray-500">
                                    <div className="loader"></div>
                                </div>
                            }
                        >
                            <AdminOverview />
                        </Suspense>
                    }
                />
                <Route
                    path="manageSeats"
                    element={
                        <Suspense
                            fallback={
                                <div className="min-h-[80vh] flex text-center justify-center pt-28 text-gray-500">
                                    <div className="loader"></div>
                                </div>
                            }
                        >
                            <ManageSeats />
                        </Suspense>
                    }
                />
                <Route
                    path="manageReservations"
                    element={
                        <Suspense
                            fallback={
                                <div className="min-h-[80vh] flex text-center justify-center pt-28 text-gray-500">
                                    <div className="loader"></div>
                                </div>
                            }
                        >
                            <ManageReservations />
                        </Suspense>
                    }
                />
                {/* User Routes */}
                <Route
                    path="users"
                    element={
                        <Suspense
                            fallback={
                                <div className="min-h-[80vh] flex text-center justify-center pt-28 text-gray-500">
                                    <div className="loader"></div>
                                </div>
                            }
                        >
                            <Users />
                        </Suspense>
                    }
                >
                    {/* Nested routes */}
                    <Route
                        index
                        element={
                            <Suspense
                                fallback={
                                    <div className="min-h-[80vh] flex text-center justify-center pt-28 text-gray-500">
                                        <div className="loader"></div>
                                    </div>
                                }
                            >
                                <AllUsers />
                            </Suspense>
                        }
                    />
                    <Route
                        path="registerdEmails"
                        element={
                            <Suspense
                                fallback={
                                    <div className="min-h-[80vh] flex text-center justify-center pt-28 text-gray-500">
                                        <div className="loader"></div>
                                    </div>
                                }
                            >
                                <RegisteredEmails />
                            </Suspense>
                        }
                    />
                </Route>
                <Route
                    path="reports"
                    element={
                        <Suspense
                            fallback={
                                <div className="min-h-[80vh] flex text-center justify-center pt-28 text-gray-500">
                                    <div className="loader"></div>
                                </div>
                            }
                        >
                            <Reports />
                        </Suspense>
                    }
                />
            </Route>

            {/* Intern routes */}
            <Route path="internDashboard" element={<InternDashboard />}>
                <Route
                    index
                    element={
                        <Suspense
                            fallback={
                                <div className="min-h-[80vh] flex text-center justify-center pt-28 text-gray-500">
                                    <div className="loader"></div>
                                </div>
                            }
                        >
                            <AvailableSeats />
                        </Suspense>
                    }
                />

                <Route
                    path="myReservation"
                    element={
                        <Suspense
                            fallback={
                                <div className="min-h-[80vh] flex text-center justify-center pt-28 text-gray-500">
                                    <div className="loader"></div>
                                </div>
                            }
                        >
                            <MyReservations />
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    );
};

export default App;
