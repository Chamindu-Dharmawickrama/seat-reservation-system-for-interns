import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Users = () => {
    return (
        <div className="p-4 lg:p-8 min-h-screen">
            <div className="flex flex-col lg:grid lg:grid-cols-[200px_1fr] border border-gray-300 h-full min-h-[70vh]">
                <nav className="bg-gray-100 border-b lg:border-b-0 lg:border-r border-gray-300 p-4 lg:p-6 flex flex-row lg:flex-col gap-4 lg:gap-6">
                    <NavLink
                        to="."
                        end
                        className={({ isActive }) =>
                            `font-semibold text-[14px] sm:text-base transition-all duration-300 ${
                                isActive
                                    ? "text-blue-600"
                                    : "text-gray-600 hover:text-[#0057A8] "
                            }`
                        }
                    >
                        All users
                    </NavLink>
                    <NavLink
                        to="registerdEmails"
                        className={({ isActive }) =>
                            `font-semibold text-[14px] sm:text-base transition-all duration-300 ${
                                isActive
                                    ? "text-blue-600"
                                    : "text-gray-600 hover:text-[#0057A8] "
                            }`
                        }
                    >
                        Email register
                    </NavLink>
                </nav>

                <div className="px-4 lg:px-5">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Users;
