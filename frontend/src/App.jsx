import React from "react";
import Home from "./pages/home/home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import InternDashboard from "./pages/dashboard/internDashboard";
import AdminDashboard from "./pages/dashboard/adminDashboard";
import InternRegister from "./pages/register/internRegister";
import InternRegisterNew from "./pages/register/internRegister_new";
import NotFound from "./pages/error/NotFound";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/internDashboard" element={<InternDashboard />} />
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/signUp" element={<InternRegister />} />
            <Route path="/signUpNew" element={<InternRegisterNew />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default App;
