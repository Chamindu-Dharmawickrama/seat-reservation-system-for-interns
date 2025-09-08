import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../redux/adminSlice";

const AllUsers = () => {
    // // dummy data
    // const users = [
    //     {
    //         id: 3116,
    //         name: "Chamindu Laksara",
    //         email: "cham@gmail.com",
    //         phone: "0719895344",
    //         department: "IT",
    //         university: "IIT",
    //     },
    //     {
    //         id: 3117,
    //         name: "Nimal Perera",
    //         email: "nimal@gmail.com",
    //         phone: "0719895345",
    //         department: "Business",
    //         university: "UOC",
    //     },
    //     {
    //         id: 3118,
    //         name: "Kamal Perera",
    //         email: "kamal@gmail.com",
    //         phone: "0719895346",
    //         department: "Engineering",
    //         university: "UOM",
    //     },
    // ];

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const { users, usersLoading, usersError } = useSelector(
        (state) => state.admin
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f3f4f6] to-[#e0e7ef] py-8 px-4">
            {usersLoading ? (
                <div className="flex items-center justify-center bg-gradient-to-r from-[#c2c2c2] to-[#949797] text-gray-700 px-6 py-8 rounded-xl shadow-md animate-pulse">
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
                    <span className="font-semibold">Loading Users...</span>
                </div>
            ) : usersError ? (
                <div className="flex items-center justify-between bg-red-50 border border-red-200 text-red-700 px-4 py-8 rounded-xl shadow-sm">
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
                        <span className="font-medium">{usersError}</span>
                    </div>
                </div>
            ) : users.length === 0 ? (
                <div className="text-center text-gray-500 font-semibold mt-8">
                    No users found.
                </div>
            ) : (
                users.map((user) => (
                    <div
                        key={user.id}
                        className="bg-gray-50 border border-gray-300 rounded-2xl shadow-md p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4"
                    >
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-500">
                                Trainee ID
                            </span>
                            <span className="text-lg font-semibold text-gray-900">
                                {user.id}
                            </span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-500">
                                Full Name
                            </span>
                            <span className="text-lg font-semibold text-gray-900">
                                {user.name}
                            </span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-500">
                                Email
                            </span>
                            <span className="text-lg font-semibold text-gray-900">
                                {user.email}
                            </span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-500">
                                Phone Number
                            </span>
                            <span className="text-lg font-semibold text-gray-900">
                                {user.phone}
                            </span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-500">
                                Department
                            </span>
                            <span className="text-lg font-semibold text-gray-900">
                                {user.department}
                            </span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-500">
                                University
                            </span>
                            <span className="text-lg font-semibold text-gray-900">
                                {user.university}
                            </span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default AllUsers;
