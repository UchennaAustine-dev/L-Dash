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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, Plus, Edit, Trash2, FileText } from "lucide-react";

interface Expense {
  id: string;
  title: string;
  date: string;
  amount: number;
  attachment?: string;
  note: string;
}

export default function ExpensePage() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      title: "Withdrawal",
      date: "2024-07-20",
      amount: 65230,
      attachment: "document.pdf",
      note: "This is the demo dummy data",
    },
    {
      id: "2",
      title: "Deposit",
      date: "2024-07-16",
      amount: 20000,
      attachment: "receipt.pdf",
      note: "This is the demo dummy data",
    },
    {
      id: "3",
      title: "Purchase",
      date: "2024-07-19",
      amount: 15000,
      note: "This is the demo dummy data",
    },
    {
      id: "4",
      title: "Payment",
      date: "2024-07-12",
      amount: 100,
      attachment: "invoice.pdf",
      note: "This is the demo dummy data",
    },
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    amount: "",
    attachment: null as File | null,
    note: "",
  });

  const handleCreate = () => {
    if (formData.title && formData.date && formData.amount) {
      const newExpense: Expense = {
        id: Date.now().toString(),
        title: formData.title,
        date: formData.date,
        amount: Number.parseFloat(formData.amount),
        attachment: formData.attachment?.name,
        note: formData.note,
      };
      setExpenses([...expenses, newExpense]);
      setFormData({
        title: "",
        date: "",
        amount: "",
        attachment: null,
        note: "",
      });
      setIsCreateOpen(false);
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setFormData({
      title: expense.title,
      date: expense.date,
      amount: expense.amount.toString(),
      attachment: null,
      note: expense.note,
    });
    setIsEditOpen(true);
  };

  const handleUpdate = () => {
    if (editingExpense && formData.title && formData.date && formData.amount) {
      const updatedExpense: Expense = {
        ...editingExpense,
        title: formData.title,
        date: formData.date,
        amount: Number.parseFloat(formData.amount),
        attachment: formData.attachment?.name || editingExpense.attachment,
        note: formData.note,
      };
      setExpenses(
        expenses.map((exp) =>
          exp.id === editingExpense.id ? updatedExpense : exp
        )
      );
      setFormData({
        title: "",
        date: "",
        amount: "",
        attachment: null,
        note: "",
      });
      setIsEditOpen(false);
      setEditingExpense(null);
    }
  };

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.note.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <span className="text-blue-600 hover:underline cursor-pointer">
            Dashboard
          </span>
          <span>›</span>
          <span>Expense</span>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">Expense</h1>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create Expense</DialogTitle>
                <button
                  onClick={() => setIsCreateOpen(false)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="attachment">Attachment</Label>
                  <Input
                    id="attachment"
                    type="file"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        attachment: e.target.files?.[0] || null,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Enter notes"
                    value={formData.note}
                    onChange={(e) =>
                      setFormData({ ...formData, note: e.target.value })
                    }
                  />
                </div>
                <Button
                  onClick={handleCreate}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  Create
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Export and Search */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-wrap gap-2">
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
              <Button
                variant="outline"
                size="sm"
                className="bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Column visibility ▼
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Search:</span>
              <Input
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  TITLE
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  DATE
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  AMOUNT
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  ATTACHMENT
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  NOTE
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {expense.title}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {formatDate(expense.date)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {formatCurrency(expense.amount)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {expense.attachment ? (
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        <span className="text-xs">{expense.attachment}</span>
                      </div>
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 max-w-xs truncate">
                    {expense.note}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(expense)}
                        className="text-emerald-600 hover:text-emerald-800"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="text-red-600 hover:text-red-800"
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

        {/* Pagination */}
        <div className="px-4 py-3 border-t bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing 1 to {filteredExpenses.length} of {filteredExpenses.length}{" "}
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

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit expense</DialogTitle>
            <button
              onClick={() => setIsEditOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-date">Date</Label>
              <Input
                id="edit-date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-amount">Amount</Label>
              <Input
                id="edit-amount"
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-attachment">Attachment</Label>
              <Input
                id="edit-attachment"
                type="file"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    attachment: e.target.files?.[0] || null,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                value={formData.note}
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
              />
            </div>
            <Button
              onClick={handleUpdate}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
