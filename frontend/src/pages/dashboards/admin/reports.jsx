import { Download } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuickStats } from "../../../redux/adminSlice";
import { Loader2 } from "lucide-react";

const Reports = () => {
    const dispatch = useDispatch();

    const { quickStats, quickStatsLoading, quickStatsError } = useSelector(
        (state) => state.admin
    );

    useEffect(() => {
        dispatch(getQuickStats());
    }, [dispatch]);

    console.log("quickStats", quickStats);

    return (
        <div className="p-6 lg:p-8">
            <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Usage Reports
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl p-6 border border-gray-200/50 shadow-lg">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">
                            Generate Reports
                        </h4>
                        <div className="space-y-4">
                            <button className="w-full bg-gradient-to-r from-[#0057A8] to-[#00B5E2] text-white py-3 px-4 rounded-lg font-semibold hover:from-[#004080] hover:to-[#0099CC] transition-all duration-300 flex items-center justify-center space-x-2">
                                <Download className="w-4 h-4" />
                                <span>Daily Usage Report</span>
                            </button>
                            <button className="w-full bg-gradient-to-r from-[#39B54A] to-[#00B5E2] text-white py-3 px-4 rounded-lg font-semibold hover:from-[#2d8f3f] hover:to-[#0099CC] transition-all duration-300 flex items-center justify-center space-x-2">
                                <Download className="w-4 h-4" />
                                <span>Weekly Summary</span>
                            </button>
                            <button className="w-full bg-gradient-to-r from-[#00B5E2] to-[#39B54A] text-white py-3 px-4 rounded-lg font-semibold hover:from-[#0099CC] hover:to-[#2d8f3f] transition-all duration-300 flex items-center justify-center space-x-2">
                                <Download className="w-4 h-4" />
                                <span>Monthly Analytics</span>
                            </button>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-gray-200/50 shadow-lg">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">
                            Quick Stats
                        </h4>
                        {quickStatsLoading ? (
                            <div className="flex justify-center items-center h-16">
                                <Loader2 className="w-4 h-4 animate-spin" />
                            </div>
                        ) : quickStatsError ? (
                            <p className="text-red-500">
                                Error: {quickStatsError}
                            </p>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">
                                        Peak Usage Time
                                    </span>
                                    <span className="font-semibold">
                                        {quickStats.peakUsageTime}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">
                                        Most Popular Floor
                                    </span>
                                    <span className="font-semibold">
                                        {quickStats.mostPopularFloor}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">
                                        Average Booking Duration
                                    </span>
                                    <span className="font-semibold">
                                        {quickStats.averageBookingDuration}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
