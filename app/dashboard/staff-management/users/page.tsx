"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateUserModal } from "@/components/modals/create-user-modal";
import { Edit, Trash2, Plus, Settings } from "lucide-react";

// Sample user data
const sampleUsers = [
  {
    id: 1,
    name: "Hiroshi Tanaka",
    phone: "+1 (244) 894-8591",
    email: "hiroshi.tanaka@email.com",
    role: "Staff",
    // avatar: "/professional-man.png",
  },
  {
    id: 2,
    name: "Alex Smith",
    phone: "+1 (244) 894-8591",
    email: "alex.smith@email.com",
    role: "Staff",
    // avatar: "/professional-woman-diverse.png",
  },
  {
    id: 3,
    name: "Aisha Ahmed",
    phone: "+1 (683) 152-2477",
    email: "aisha.ahmed@email.com",
    role: "Accountant",
    // avatar: "/professional-woman-hijab.png",
  },
  {
    id: 4,
    name: "Manager",
    phone: "",
    email: "manager@gmail.com",
    role: "Manager",
    // avatar: "/professional-manager.png",
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState(sampleUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  const handleCreateUser = (userData: any) => {
    const newUser = {
      id: users.length + 1,
      ...userData,
      avatar: "/professional-person.png",
    };
    setUsers([...users, newUser]);
    setIsCreateModalOpen(false);
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">User</h1>
          <nav className="flex items-center space-x-2 text-xs md:text-sm text-gray-600 mt-1">
            <span>Dashboard</span>
            <span>›</span>
            <span>Users</span>
          </nav>
        </div>
      </div>

      {/* User List Section */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-4 md:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-base md:text-lg font-semibold text-gray-900">
            User List
          </h2>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create User
          </Button>
        </div>

        {/* Export Buttons and Search */}
        <div className="px-4 md:px-6 py-4 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-emerald-500 text-white hover:bg-emerald-600 text-xs"
            >
              Excel
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-emerald-500 text-white hover:bg-emerald-600 text-xs"
            >
              PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-emerald-500 text-white hover:bg-emerald-600 text-xs"
            >
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-emerald-500 text-white hover:bg-emerald-600 text-xs"
            >
              <Settings className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">Column visibility</span>
              <span className="sm:hidden">Columns</span>
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs md:text-sm text-gray-600">Search:</span>
            <Input
              placeholder=""
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-48"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  USER PROFILE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  EMAIL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ASSIGN ROLE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {/* <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                      /> */}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        {user.phone && (
                          <div className="text-sm text-gray-500">
                            {user.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-emerald-600 hover:text-emerald-700"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 md:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs md:text-sm text-gray-700">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + usersPerPage, filteredUsers.length)} of{" "}
            {filteredUsers.length} entries
          </div>
          <div className="flex items-center justify-center sm:justify-end space-x-2">
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

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateUser}
      />
    </div>
  );
}
