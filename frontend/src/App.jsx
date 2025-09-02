import React, { lazy, Suspense } from "react";
import Home from "./pages/home/home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import InternDashboard from "./pages/dashboards/intern/internDashboard";
import AdminDashboard from "./pages/dashboards/admin/adminDashboard";
import InternRegister from "./pages/register/internRegister";
import NotFound from "./pages/error/NotFound";
import "./App.css";
import AdminDashboardBackup from "./pages/dashboards/admin/backup";

// Lazy loading used for admin Dashboard
const AdminOverview = lazy(() =>
    import("./pages/dashboards/admin/adminOverview")
);
const ManageSeats = lazy(() => import("./pages/dashboards/admin/manageSeats"));
const ManageReservations = lazy(() =>
    import("./pages/dashboards/admin/manageReservations")
);
const Reports = lazy(() => import("./pages/dashboards/admin/reports"));

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/internDashboard" element={<InternDashboard />} />
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
        </Routes>
    );
};

export default App;
