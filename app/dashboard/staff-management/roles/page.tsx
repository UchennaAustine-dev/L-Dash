"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateRoleModal } from "@/components/modals/create-role-modal";
import { Edit, Trash2, Plus, Settings } from "lucide-react";

// Sample role data
const sampleRoles = [
  {
    id: 1,
    name: "Customer",
    assignedUsers: 4,
    assignedPermissions: 12,
  },
  {
    id: 2,
    name: "Manager",
    assignedUsers: 1,
    assignedPermissions: 59,
  },
  {
    id: 3,
    name: "Accountant",
    assignedUsers: 1,
    assignedPermissions: 0,
  },
  {
    id: 4,
    name: "Staff",
    assignedUsers: 2,
    assignedPermissions: 0,
  },
];

export default function RolesPage() {
  const [roles, setRoles] = useState(sampleRoles);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rolesPerPage = 10;

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRoles.length / rolesPerPage);
  const startIndex = (currentPage - 1) * rolesPerPage;
  const currentRoles = filteredRoles.slice(
    startIndex,
    startIndex + rolesPerPage
  );

  const handleCreateRole = (roleData: any) => {
    const newRole = {
      id: roles.length + 1,
      name: roleData.title,
      assignedUsers: 0,
      assignedPermissions: roleData.permissions.length,
    };
    setRoles([...roles, newRole]);
    setIsCreateModalOpen(false);
  };

  const handleDeleteRole = (roleId: number) => {
    setRoles(roles.filter((role) => role.id !== roleId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Role</h1>
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
            <span>Dashboard</span>
            <span>›</span>
            <span>Role</span>
          </nav>
        </div>
      </div>

      {/* Role List Section */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Role List</h2>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Role
          </Button>
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
                  ROLE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ASSIGNED USERS
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ASSIGNED PERMISSIONS
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentRoles.map((role) => (
                <tr key={role.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {role.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-emerald-600 font-medium">
                      {role.assignedUsers}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {role.assignedPermissions}
                    </div>
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
                        onClick={() => handleDeleteRole(role.id)}
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

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + rolesPerPage, filteredRoles.length)} of{" "}
            {filteredRoles.length} entries
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

      {/* Create Role Modal */}
      <CreateRoleModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateRole}
      />
    </div>
  );
}
