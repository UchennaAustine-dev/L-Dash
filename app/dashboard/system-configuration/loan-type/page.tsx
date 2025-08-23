"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Trash2, Plus } from "lucide-react";

interface LoanType {
  id: string;
  type: string;
  loanTermPeriod: string;
  loanTermLimit: string;
  minAmount: string;
  maxAmount: string;
  interestType: string;
  interestRate: string;
  penalty: string;
  notes: string;
}

export default function LoanTypePage() {
  const [loanTypes, setLoanTypes] = useState<LoanType[]>([
    {
      id: "1",
      type: "Car Loan",
      loanTermPeriod: "Month",
      loanTermLimit: "20",
      minAmount: "5000",
      maxAmount: "75000",
      interestType: "Reducing Amount",
      interestRate: "14",
      penalty: "2",
      notes: "",
    },
    {
      id: "2",
      type: "Mortgage Loan",
      loanTermPeriod: "Year",
      loanTermLimit: "30",
      minAmount: "50000",
      maxAmount: "100000",
      interestType: "Mortgage Amortization",
      interestRate: "11",
      penalty: "1",
      notes: "",
    },
    {
      id: "3",
      type: "Personal Loan",
      loanTermPeriod: "Year",
      loanTermLimit: "60",
      minAmount: "1000",
      maxAmount: "10000",
      interestType: "Mortgage Amortization",
      interestRate: "12",
      penalty: "2",
      notes: "",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingLoanType, setEditingLoanType] = useState<LoanType | null>(null);
  const [formData, setFormData] = useState({
    type: "",
    loanTermPeriod: "",
    loanTermLimit: "",
    minAmount: "",
    maxAmount: "",
    interestType: "",
    interestRate: "",
    penalty: "",
    notes: "",
  });

  const filteredLoanTypes = loanTypes.filter((loanType) =>
    loanType.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    const newLoanType: LoanType = {
      id: Date.now().toString(),
      ...formData,
    };
    setLoanTypes([...loanTypes, newLoanType]);
    setFormData({
      type: "",
      loanTermPeriod: "",
      loanTermLimit: "",
      minAmount: "",
      maxAmount: "",
      interestType: "",
      interestRate: "",
      penalty: "",
      notes: "",
    });
    setIsCreateOpen(false);
  };

  const handleEdit = (loanType: LoanType) => {
    setEditingLoanType(loanType);
    setFormData(loanType);
    setIsEditOpen(true);
  };

  const handleUpdate = () => {
    if (editingLoanType) {
      setLoanTypes(
        loanTypes.map((loanType) =>
          loanType.id === editingLoanType.id
            ? { ...loanType, ...formData }
            : loanType
        )
      );
      setIsEditOpen(false);
      setEditingLoanType(null);
      setFormData({
        type: "",
        loanTermPeriod: "",
        loanTermLimit: "",
        minAmount: "",
        maxAmount: "",
        interestType: "",
        interestRate: "",
        penalty: "",
        notes: "",
      });
    }
  };

  const handleDelete = (id: string) => {
    setLoanTypes(loanTypes.filter((loanType) => loanType.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-medium text-gray-900">Loan Type</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Dashboard</span>
            <span>›</span>
            <span>Loan Type</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-900">Loan Type</h2>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Loan Type
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Loan Type</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    placeholder="Enter loan type name"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="loanTermPeriod">Loan Term Period</Label>
                  <Select
                    value={formData.loanTermPeriod}
                    onValueChange={(value) =>
                      setFormData({ ...formData, loanTermPeriod: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Month">Month</SelectItem>
                      <SelectItem value="Year">Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="loanTermLimit">Loan Term Limit</Label>
                  <Input
                    id="loanTermLimit"
                    placeholder="Enter max term limit"
                    value={formData.loanTermLimit}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        loanTermLimit: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="minAmount">Minimum Loan Amount</Label>
                  <Input
                    id="minAmount"
                    placeholder="Enter min loan amount"
                    value={formData.minAmount}
                    onChange={(e) =>
                      setFormData({ ...formData, minAmount: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="maxAmount">Maximum Loan Amount</Label>
                  <Input
                    id="maxAmount"
                    placeholder="Enter max loan amount"
                    value={formData.maxAmount}
                    onChange={(e) =>
                      setFormData({ ...formData, maxAmount: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="interestType">Interest Type</Label>
                  <Select
                    value={formData.interestType}
                    onValueChange={(value) =>
                      setFormData({ ...formData, interestType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Onetime Payment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Onetime Payment">
                        Onetime Payment
                      </SelectItem>
                      <SelectItem value="Reducing Amount">
                        Reducing Amount
                      </SelectItem>
                      <SelectItem value="Mortgage Amortization">
                        Mortgage Amortization
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="interestRate">
                    Interest Rate (%) (Per Year)
                  </Label>
                  <Input
                    id="interestRate"
                    placeholder="Enter interest rate"
                    value={formData.interestRate}
                    onChange={(e) =>
                      setFormData({ ...formData, interestRate: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="penalty">Penalty (%)</Label>
                  <Input
                    id="penalty"
                    placeholder="Enter payment penalty"
                    value={formData.penalty}
                    onChange={(e) =>
                      setFormData({ ...formData, penalty: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Enter notes"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2">
                  <Button
                    onClick={handleCreate}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    Create
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
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
                  Column visibility ▼
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Type</DropdownMenuItem>
                <DropdownMenuItem>Loan Eligible Amount</DropdownMenuItem>
                <DropdownMenuItem>Loan Interest Detail</DropdownMenuItem>
                <DropdownMenuItem>Loan Terms Detail</DropdownMenuItem>
                <DropdownMenuItem>Loan Payment Penalty</DropdownMenuItem>
                <DropdownMenuItem>Action</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="search" className="text-sm font-medium">
              Search:
            </Label>
            <Input
              id="search"
              placeholder="Search loan types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    TYPE
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    LOAN ELIGIBLE AMOUNT
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    LOAN INTEREST DETAIL
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    LOAN TERMS DETAIL
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    LOAN PAYMENT PENALTY
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLoanTypes.map((loanType, index) => (
                  <tr
                    key={loanType.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {loanType.type}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <div className="space-y-1">
                        <div className="text-blue-600">
                          Min Amount : ${loanType.minAmount}
                        </div>
                        <div className="text-blue-600">
                          Max Amount : ${loanType.maxAmount}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <div className="space-y-1">
                        <div className="text-red-600">
                          Interest Type : {loanType.interestType}
                        </div>
                        <div className="text-red-600">
                          Interest Rate : {loanType.interestRate}% / Year
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <div className="text-gray-900">
                        Loan Term Limit : {loanType.loanTermLimit}{" "}
                        {loanType.loanTermPeriod.toLowerCase()}s
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {loanType.penalty}%
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(loanType)}
                          className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(loanType.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
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
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-gray-700">Showing 1 to 3 of 3 entries</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              «
            </Button>
            <Button variant="outline" size="sm" disabled>
              ‹
            </Button>
            <Button size="sm" className="bg-blue-900 text-white">
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
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Loan Type</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="edit-type">Type</Label>
              <Input
                id="edit-type"
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-loanTermPeriod">Loan Term Period</Label>
              <Select
                value={formData.loanTermPeriod}
                onValueChange={(value) =>
                  setFormData({ ...formData, loanTermPeriod: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Month">Month</SelectItem>
                  <SelectItem value="Year">Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-loanTermLimit">Loan Term Limit</Label>
              <Input
                id="edit-loanTermLimit"
                value={formData.loanTermLimit}
                onChange={(e) =>
                  setFormData({ ...formData, loanTermLimit: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-minAmount">Minimum Loan Amount</Label>
              <Input
                id="edit-minAmount"
                value={formData.minAmount}
                onChange={(e) =>
                  setFormData({ ...formData, minAmount: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-maxAmount">Maximum Loan Amount</Label>
              <Input
                id="edit-maxAmount"
                value={formData.maxAmount}
                onChange={(e) =>
                  setFormData({ ...formData, maxAmount: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-interestType">Interest Type</Label>
              <Select
                value={formData.interestType}
                onValueChange={(value) =>
                  setFormData({ ...formData, interestType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Onetime Payment">
                    Onetime Payment
                  </SelectItem>
                  <SelectItem value="Reducing Amount">
                    Reducing Amount
                  </SelectItem>
                  <SelectItem value="Mortgage Amortization">
                    Mortgage Amortization
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-interestRate">
                Interest Rate (%) (Per Year)
              </Label>
              <Input
                id="edit-interestRate"
                value={formData.interestRate}
                onChange={(e) =>
                  setFormData({ ...formData, interestRate: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-penalty">Penalty (%)</Label>
              <Input
                id="edit-penalty"
                value={formData.penalty}
                onChange={(e) =>
                  setFormData({ ...formData, penalty: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                rows={3}
              />
            </div>
            <div className="md:col-span-2">
              <Button
                onClick={handleUpdate}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                Update
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
