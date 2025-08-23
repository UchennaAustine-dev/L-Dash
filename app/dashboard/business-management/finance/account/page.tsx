"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash2, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Account {
  id: string;
  customer: string;
  accountType: string;
  status: string;
  balance: string;
}

const initialAccounts: Account[] = [
  {
    id: "#ACC-0004",
    customer: "Jane Smith",
    accountType: "Savings Account",
    status: "Active",
    balance: "$12344",
  },
  {
    id: "#ACC-0003",
    customer: "Emily Brown",
    accountType: "Fixed Deposit",
    status: "Active",
    balance: "$1233",
  },
  {
    id: "#ACC-0002",
    customer: "Mike Johnson",
    accountType: "Checking Account",
    status: "Inactive",
    balance: "$120",
  },
  {
    id: "#ACC-0001",
    customer: "John Doe",
    accountType: "Savings Account",
    status: "Active",
    balance: "$1500",
  },
];

const customers = ["Jane Smith", "Emily Brown", "Mike Johnson", "John Doe"];
const accountTypes = [
  "Savings Account",
  "Fixed Deposit",
  "Checking Account",
  "Current Account",
];
const statuses = ["Active", "Inactive", "Suspended"];

export default function AccountPage() {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [newAccount, setNewAccount] = useState({
    customer: "",
    accountType: "",
    status: "Active",
    balance: "",
    notes: "",
  });

  const filteredAccounts = accounts.filter(
    (account) =>
      account.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateAccount = () => {
    if (newAccount.customer && newAccount.accountType && newAccount.balance) {
      const id = `#ACC-${String(accounts.length + 1).padStart(4, "0")}`;
      setAccounts([
        ...accounts,
        {
          id,
          customer: newAccount.customer,
          accountType: newAccount.accountType,
          status: newAccount.status,
          balance: `$${newAccount.balance}`,
        },
      ]);
      setNewAccount({
        customer: "",
        accountType: "",
        status: "Active",
        balance: "",
        notes: "",
      });
      setIsCreateOpen(false);
    }
  };

  const handleEditAccount = (account: Account) => {
    setEditingAccount(account);
    setIsEditOpen(true);
  };

  const handleUpdateAccount = () => {
    if (editingAccount) {
      setAccounts(
        accounts.map((acc) =>
          acc.id === editingAccount.id ? editingAccount : acc
        )
      );
      setIsEditOpen(false);
      setEditingAccount(null);
    }
  };

  const handleDeleteAccount = (id: string) => {
    setAccounts(accounts.filter((acc) => acc.id !== id));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
            Account
          </h1>
          <nav className="text-sm text-gray-600 mt-1">
            <span className="text-orange-600">Dashboard</span> &gt; Account
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-6">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">Account</h2>
          </div>

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Account
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create Account</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Customer
                  </label>
                  <Select
                    value={newAccount.customer}
                    onValueChange={(value) =>
                      setNewAccount({ ...newAccount, customer: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer} value={customer}>
                          {customer}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Account Type
                  </label>
                  <Select
                    value={newAccount.accountType}
                    onValueChange={(value) =>
                      setNewAccount({ ...newAccount, accountType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Account Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {accountTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Status
                  </label>
                  <Select
                    value={newAccount.status}
                    onValueChange={(value) =>
                      setNewAccount({ ...newAccount, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Balance
                  </label>
                  <Input
                    placeholder="Enter balance"
                    value={newAccount.balance}
                    onChange={(e) =>
                      setNewAccount({ ...newAccount, balance: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Notes
                  </label>
                  <Textarea
                    placeholder="Enter notes"
                    value={newAccount.notes}
                    onChange={(e) =>
                      setNewAccount({ ...newAccount, notes: e.target.value })
                    }
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleCreateAccount}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  Create
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 sm:px-6 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Excel
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-emerald-600 text-white hover:bg-emerald-700"
            >
              PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Copy
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  Column visibility <span className="ml-1">▼</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Show all columns</DropdownMenuItem>
                <DropdownMenuItem>Hide balance</DropdownMenuItem>
                <DropdownMenuItem>Hide status</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Search:</span>
            <Input
              placeholder=""
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-32 sm:w-48"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-t border-gray-200">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account Type
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Balance
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAccounts.map((account) => (
                <tr key={account.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    {account.id}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {account.customer}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    {account.accountType}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {account.status}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {account.balance}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditAccount(account)}
                        className="text-emerald-600 hover:text-emerald-700"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAccount(account.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 sm:px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing 1 to {filteredAccounts.length} of {filteredAccounts.length}{" "}
            entries
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              «
            </Button>
            <Button variant="outline" size="sm" disabled>
              ‹
            </Button>
            <Button size="sm" className="bg-blue-600 text-white">
              1
            </Button>
            <Button variant="outline" size="sm" disabled>
              ›
            </Button>
            <Button variant="outline" size="sm" disabled>
              »
            </Button>
          </div>
        </div>
      </div>

      {/* Edit Account Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Account</DialogTitle>
          </DialogHeader>
          {editingAccount && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Customer
                </label>
                <Select
                  value={editingAccount.customer}
                  onValueChange={(value) =>
                    setEditingAccount({ ...editingAccount, customer: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer} value={customer}>
                        {customer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Account Type
                </label>
                <Select
                  value={editingAccount.accountType}
                  onValueChange={(value) =>
                    setEditingAccount({ ...editingAccount, accountType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {accountTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Status
                </label>
                <Select
                  value={editingAccount.status}
                  onValueChange={(value) =>
                    setEditingAccount({ ...editingAccount, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Balance
                </label>
                <Input
                  value={editingAccount.balance.replace("$", "")}
                  onChange={(e) =>
                    setEditingAccount({
                      ...editingAccount,
                      balance: `$${e.target.value}`,
                    })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Notes
                </label>
                <Textarea placeholder="Enter notes" rows={3} />
              </div>

              <Button
                onClick={handleUpdateAccount}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                Update
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
