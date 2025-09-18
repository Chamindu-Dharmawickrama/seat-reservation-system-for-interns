import React from "react";
import { Search, Calendar } from "lucide-react";

const AvailableSeat = () => {
    return (
        <div className="p-6 lg:p-8">
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border border-gray-200/50 shadow-md flex flex-col sm:flex-row justify-between gap-3 md:gap-20 sm:gap-5">
                <div className="relative  flex-1">
                    <Search className="w-5 h-5 absolute left-3 mt-1 ml-1 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search seats by seat number..."
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2]"
                    />
                </div>
                <div className="flex justify-center text-center items-center">
                    <label className="text-sm text-gray-500 text-center mr-2 ">
                        <Calendar className="w-4 h-4 mb-1 inline mr-2" />
                        Filter By Date
                    </label>
                    <input
                        type="date"
                        // value={selectedDate}
                        // onChange={(e) => setSelectedDate(e.target.value)}
                        className="px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2] transition-all duration-200 shadow-sm"
                    />
                </div>
            </div>
        </div>
    );
};

export default AvailableSeat;
