"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Settings } from "lucide-react";

// Sample logged history data
const sampleLoggedHistory = [
  {
    id: 1,
    user: "John Doe",
    email: "customer@gmail.com",
    loginDate: "Aug 22, 2025",
    systemIp: "49.43.32.95",
    city: "Surat",
    state: "Gujarat",
    country: "India",
    system: "Linux",
  },
  {
    id: 2,
    user: "Owner",
    email: "owner@gmail.com",
    loginDate: "Aug 22, 2025",
    systemIp: "115.187.46.38",
    city: "Kolkata",
    state: "West Bengal",
    country: "India",
    system: "Windows",
  },
  {
    id: 3,
    user: "John Doe",
    email: "customer@gmail.com",
    loginDate: "Aug 22, 2025",
    systemIp: "115.187.46.38",
    city: "Kolkata",
    state: "West Bengal",
    country: "India",
    system: "Windows",
  },
  {
    id: 4,
    user: "John Doe",
    email: "customer@gmail.com",
    loginDate: "Aug 22, 2025",
    systemIp: "106.76.70.125",
    city: "Kohlapur",
    state: "Maharashtra",
    country: "India",
    system: "Windows",
  },
  {
    id: 5,
    user: "Owner",
    email: "owner@gmail.com",
    loginDate: "Aug 22, 2025",
    systemIp: "201.141.110.179",
    city: "Benito Juarez",
    state: "Mexico City",
    country: "Mexico",
    system: "OS X",
  },
  {
    id: 6,
    user: "Owner",
    email: "owner@gmail.com",
    loginDate: "Aug 22, 2025",
    systemIp: "92.98.187.12",
    city: "Dubai",
    state: "Dubai",
    country: "United Arab Emirates",
    system: "OS X",
  },
  {
    id: 7,
    user: "Owner",
    email: "owner@gmail.com",
    loginDate: "Aug 22, 2025",
    systemIp: "201.141.110.179",
    city: "Benito Juarez",
    state: "Mexico City",
    country: "Mexico",
    system: "OS X",
  },
  {
    id: 8,
    user: "Owner",
    email: "owner@gmail.com",
    loginDate: "Aug 22, 2025",
    systemIp: "175.100.52.191",
    city: "Phnom Penh",
    state: "Phnom Penh",
    country: "Cambodia",
    system: "Windows",
  },
  {
    id: 9,
    user: "Owner",
    email: "owner@gmail.com",
    loginDate: "Aug 22, 2025",
    systemIp: "115.187.46.38",
    city: "Kolkata",
    state: "West Bengal",
    country: "India",
    system: "Windows",
  },
  {
    id: 10,
    user: "John Doe",
    email: "customer@gmail.com",
    loginDate: "Aug 22, 2025",
    systemIp: "115.187.46.38",
    city: "Kolkata",
    state: "West Bengal",
    country: "India",
    system: "Windows",
  },
  {
    id: 11,
    user: "Admin User",
    email: "admin@gmail.com",
    loginDate: "Aug 22, 2025",
    systemIp: "192.168.1.100",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    system: "Linux",
  },
  {
    id: 12,
    user: "Test User",
    email: "test@gmail.com",
    loginDate: "Aug 22, 2025",
    systemIp: "203.45.67.89",
    city: "Delhi",
    state: "Delhi",
    country: "India",
    system: "Windows",
  },
  {
    id: 13,
    user: "Manager",
    email: "manager@gmail.com",
    loginDate: "Aug 22, 2025",
    systemIp: "45.123.78.90",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    system: "OS X",
  },
  {
    id: 14,
    user: "Staff User",
    email: "staff@gmail.com",
    loginDate: "Aug 22, 2025",
    systemIp: "67.89.123.45",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    system: "Linux",
  },
  {
    id: 15,
    user: "Guest User",
    email: "guest@gmail.com",
    loginDate: "Aug 22, 2025",
    systemIp: "89.123.45.67",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    system: "Windows",
  },
];

export default function LoggedHistoryPage() {
  const [loggedHistory, setLoggedHistory] = useState(sampleLoggedHistory);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  const filteredHistory = loggedHistory.filter(
    (entry) =>
      entry.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.system.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredHistory.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentEntries = filteredHistory.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  const handleDeleteEntry = (entryId: number) => {
    setLoggedHistory(loggedHistory.filter((entry) => entry.id !== entryId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Logged History</h1>
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
            <span>Dashboard</span>
            <span>›</span>
            <span>Logged History</span>
          </nav>
        </div>
      </div>

      {/* Logged History List Section */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Logged History List
          </h2>
        </div>

        {/* Export Buttons and Search */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-emerald-500 text-white hover:bg-emerald-600"
            >
              Excel
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-emerald-500 text-white hover:bg-emerald-600"
            >
              PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-emerald-500 text-white hover:bg-emerald-600"
            >
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-emerald-500 text-white hover:bg-emerald-600"
            >
              <Settings className="w-4 h-4 mr-1" />
              Column visibility
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Search:</span>
            <Input
              placeholder=""
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-48"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  USER
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  EMAIL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  LOGIN DATE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SYSTEM IP
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CITY
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STATE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  COUNTRY
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SYSTEM
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-blue-600">
                      {entry.user}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{entry.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {entry.loginDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {entry.systemIp}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{entry.city}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-blue-600">{entry.state}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{entry.country}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{entry.system}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteEntry(entry.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + entriesPerPage, filteredHistory.length)} of{" "}
            {filteredHistory.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              ‹
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-900 text-white"
            >
              {currentPage}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
            >
              ›
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
