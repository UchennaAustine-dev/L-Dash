"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Users, Package, Clock, Calendar } from "lucide-react";

// Sample data for the repayment overview chart
const repaymentData = [
  { month: "Jan-2025", amount: 4800 },
  { month: "Feb-2025", amount: 7200 },
  { month: "Mar-2025", amount: 6400 },
  { month: "Apr-2025", amount: 7800 },
  { month: "May-2025", amount: 8800 },
  { month: "Jun-2025", amount: 12000 },
  { month: "Jul-2025", amount: 14800 },
  { month: "Aug-2025", amount: 13600 },
  { month: "Sep-2025", amount: 12800 },
  { month: "Oct-2025", amount: 10800 },
  { month: "Nov-2025", amount: 10000 },
  { month: "Dec-2025", amount: 9200 },
];

export default function Page() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);

    // Add event listener for window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-600 mt-1">Welcome to your CarMan dashboard</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Total Customer Card */}
        <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 md:w-6 md:h-6 text-cyan-600" />
              </div>
            </div>
            <div className="ml-3 md:ml-4">
              <p className="text-xs md:text-sm font-medium text-gray-600">
                Total Customer
              </p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">4</p>
            </div>
          </div>
        </div>

        {/* Total Pending Loan Card */}
        <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
              </div>
            </div>
            <div className="ml-3 md:ml-4">
              <p className="text-xs md:text-sm font-medium text-gray-600">
                Total Pending Loan
              </p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>

        {/* Total Active Loan Card */}
        <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
              </div>
            </div>
            <div className="ml-3 md:ml-4">
              <p className="text-xs md:text-sm font-medium text-gray-600">
                Total Active Loan
              </p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>

        {/* Total Expense Card */}
        <div className="bg-white p-4 md:p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
              </div>
            </div>
            <div className="ml-3 md:ml-4">
              <p className="text-xs md:text-sm font-medium text-gray-600">
                Total Expense
              </p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                $100330
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-4 md:px-6 py-4 border-b border-gray-200">
          <h2 className="text-base md:text-lg font-semibold text-gray-900">
            Repayment Overview
          </h2>
          <p className="text-xs md:text-sm text-gray-600 mt-1">
            Repayment Overview
          </p>
        </div>
        <div className="p-4 md:p-6">
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={repaymentData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#6b7280" }}
                  interval={windowWidth < 768 ? 1 : 0}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#6b7280" }}
                />
                <Bar
                  dataKey="amount"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={60}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
