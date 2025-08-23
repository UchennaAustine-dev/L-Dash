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

interface Transaction {
  id: string;
  customer: string;
  type: string;
  status: string;
  amount: string;
  dateTime: string;
}

const initialTransactions: Transaction[] = [
  {
    id: "#AC-0001",
    customer: "John Doe",
    type: "Withdraw",
    status: "Pending",
    amount: "$1000",
    dateTime: "Jul 17, 2024 8:18 PM",
  },
  {
    id: "#AC-0001",
    customer: "John Doe",
    type: "Deposit",
    status: "Pending",
    amount: "$500",
    dateTime: "Jul 19, 2024 10:54 AM",
  },
  {
    id: "#ACC-0001",
    customer: "John Doe",
    type: "Withdraw",
    status: "Completed",
    amount: "$500",
    dateTime: "Jul 31, 2025 10:12 AM",
  },
];

const customers = ["John Doe", "Jane Smith", "Emily Brown", "Mike Johnson"];
const transactionTypes = ["Deposit", "Withdraw", "Transfer"];
const statuses = ["Pending", "Completed", "Failed", "Cancelled"];

export default function TransactionPage() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [newTransaction, setNewTransaction] = useState({
    customer: "",
    accountNumber: "",
    type: "Deposit",
    status: "Pending",
    dateTime: "",
    amount: "",
    notes: "",
  });

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateTransaction = () => {
    if (
      newTransaction.customer &&
      newTransaction.accountNumber &&
      newTransaction.amount &&
      newTransaction.dateTime
    ) {
      const id = newTransaction.accountNumber;
      setTransactions([
        ...transactions,
        {
          id,
          customer: newTransaction.customer,
          type: newTransaction.type,
          status: newTransaction.status,
          amount: `$${newTransaction.amount}`,
          dateTime: new Date(newTransaction.dateTime).toLocaleString(),
        },
      ]);
      setNewTransaction({
        customer: "",
        accountNumber: "",
        type: "Deposit",
        status: "Pending",
        dateTime: "",
        amount: "",
        notes: "",
      });
      setIsCreateOpen(false);
    }
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsEditOpen(true);
  };

  const handleUpdateTransaction = () => {
    if (editingTransaction) {
      setTransactions(
        transactions.map((trans) =>
          trans.id === editingTransaction.id &&
          trans.dateTime === editingTransaction.dateTime
            ? editingTransaction
            : trans
        )
      );
      setIsEditOpen(false);
      setEditingTransaction(null);
    }
  };

  const handleDeleteTransaction = (id: string, dateTime: string) => {
    setTransactions(
      transactions.filter(
        (trans) => !(trans.id === id && trans.dateTime === dateTime)
      )
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
            Transaction
          </h1>
          <nav className="text-sm text-gray-600 mt-1">
            <span className="text-orange-600">Dashboard</span> &gt; Transaction
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-6">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">Transaction</h2>
          </div>

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Transaction
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create Transaction</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Customer
                  </label>
                  <Select
                    value={newTransaction.customer}
                    onValueChange={(value) =>
                      setNewTransaction({ ...newTransaction, customer: value })
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
                    Account Number
                  </label>
                  <Input
                    placeholder="Enter account number"
                    value={newTransaction.accountNumber}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        accountNumber: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Type
                  </label>
                  <Select
                    value={newTransaction.type}
                    onValueChange={(value) =>
                      setNewTransaction({ ...newTransaction, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {transactionTypes.map((type) => (
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
                    value={newTransaction.status}
                    onValueChange={(value) =>
                      setNewTransaction({ ...newTransaction, status: value })
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
                    Date Time
                  </label>
                  <Input
                    type="datetime-local"
                    value={newTransaction.dateTime}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        dateTime: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Amount
                  </label>
                  <Input
                    placeholder="Enter amount"
                    value={newTransaction.amount}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        amount: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Notes
                  </label>
                  <Textarea
                    placeholder="Enter notes"
                    value={newTransaction.notes}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        notes: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleCreateTransaction}
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
                <DropdownMenuItem>Hide amount</DropdownMenuItem>
                <DropdownMenuItem>Hide date/time</DropdownMenuItem>
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
                  Type
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date/Time
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction, index) => (
                <tr
                  key={`${transaction.id}-${index}`}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    {transaction.id}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.customer}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.type}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    {transaction.status}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.amount}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.dateTime}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditTransaction(transaction)}
                        className="text-emerald-600 hover:text-emerald-700"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteTransaction(
                            transaction.id,
                            transaction.dateTime
                          )
                        }
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
            Showing 1 to {filteredTransactions.length} of{" "}
            {filteredTransactions.length} entries
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

      {/* Edit Transaction Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit transaction</DialogTitle>
          </DialogHeader>
          {editingTransaction && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Customer
                </label>
                <Select
                  value={editingTransaction.customer}
                  onValueChange={(value) =>
                    setEditingTransaction({
                      ...editingTransaction,
                      customer: value,
                    })
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
                  Account Number
                </label>
                <Input
                  value={editingTransaction.id}
                  onChange={(e) =>
                    setEditingTransaction({
                      ...editingTransaction,
                      id: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Type
                </label>
                <Select
                  value={editingTransaction.type}
                  onValueChange={(value) =>
                    setEditingTransaction({
                      ...editingTransaction,
                      type: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {transactionTypes.map((type) => (
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
                  value={editingTransaction.status}
                  onValueChange={(value) =>
                    setEditingTransaction({
                      ...editingTransaction,
                      status: value,
                    })
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
                  Date Time
                </label>
                <Input value="17/07/2024 20:18" readOnly />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Amount
                </label>
                <Input
                  value={editingTransaction.amount.replace("$", "")}
                  onChange={(e) =>
                    setEditingTransaction({
                      ...editingTransaction,
                      amount: `$${e.target.value}`,
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
                onClick={handleUpdateTransaction}
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
