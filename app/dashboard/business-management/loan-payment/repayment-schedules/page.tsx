"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import {
  Eye,
  Trash2,
  Download,
  Copy,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface RepaymentSchedule {
  id: string;
  loanNo: string;
  paymentDate: string;
  principalAmount: number;
  interest: number;
  penalty: number;
  totalAmount: number;
  status: "paid" | "pending" | "overdue";
}

const mockData: RepaymentSchedule[] = [
  {
    id: "1",
    loanNo: "#LON-0002",
    paymentDate: "Jul 20, 2024",
    principalAmount: 1980.37,
    interest: 229.17,
    penalty: 0,
    totalAmount: 2209.54,
    status: "paid",
  },
  {
    id: "2",
    loanNo: "#LON-0004",
    paymentDate: "Jul 20, 2024",
    principalAmount: 357.14,
    interest: 1200,
    penalty: 0,
    totalAmount: 1557.14,
    status: "paid",
  },
  {
    id: "3",
    loanNo: "#LON-0003",
    paymentDate: "Aug 1, 2024",
    principalAmount: 900,
    interest: 52.5,
    penalty: 0,
    totalAmount: 952.5,
    status: "paid",
  },
  {
    id: "4",
    loanNo: "#LON-0002",
    paymentDate: "Aug 20, 2024",
    principalAmount: 1998.53,
    interest: 211.01,
    penalty: 0,
    totalAmount: 2209.54,
    status: "paid",
  },
  {
    id: "5",
    loanNo: "#LON-0004",
    paymentDate: "Aug 20, 2024",
    principalAmount: 357.14,
    interest: 1200,
    penalty: 0,
    totalAmount: 1557.14,
    status: "paid",
  },
  {
    id: "6",
    loanNo: "#LON-0003",
    paymentDate: "Sep 1, 2024",
    principalAmount: 900,
    interest: 42,
    penalty: 0,
    totalAmount: 942,
    status: "paid",
  },
  {
    id: "7",
    loanNo: "#LON-0002",
    paymentDate: "Sep 20, 2024",
    principalAmount: 2016.85,
    interest: 192.69,
    penalty: 7026.34,
    totalAmount: 9235.88,
    status: "paid",
  },
  {
    id: "8",
    loanNo: "#LON-0004",
    paymentDate: "Sep 20, 2024",
    principalAmount: 357.14,
    interest: 1200,
    penalty: 0,
    totalAmount: 1557.14,
    status: "paid",
  },
  {
    id: "9",
    loanNo: "#LON-0003",
    paymentDate: "Oct 1, 2024",
    principalAmount: 900,
    interest: 31.5,
    penalty: 0,
    totalAmount: 931.5,
    status: "pending",
  },
  {
    id: "10",
    loanNo: "#LON-0002",
    paymentDate: "Oct 20, 2024",
    principalAmount: 2035.34,
    interest: 174.21,
    penalty: 0,
    totalAmount: 2209.54,
    status: "pending",
  },
];

export default function RepaymentSchedulePage() {
  const [selectedLoan, setSelectedLoan] = useState("#LON-0002"); // Updated default value
  const [selectedDate, setSelectedDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        );
      case "overdue":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Overdue
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
  };

  const filteredData = mockData.filter((item) => {
    const matchesLoan = !selectedLoan || item.loanNo === selectedLoan;
    const matchesSearch =
      !searchTerm ||
      item.loanNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.paymentDate.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLoan && matchesSearch;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Repayment schedule
          </h1>
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
            <Link href="/dashboard" className="hover:text-gray-700">
              Dashboard
            </Link>
            <span>›</span>
            <span className="text-gray-900">Repayment schedule</span>
          </nav>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="flex-1 min-w-0">
                <Select value={selectedLoan} onValueChange={setSelectedLoan}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Loan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="#LON-0002">#LON-0002</SelectItem>
                    <SelectItem value="#LON-0003">#LON-0003</SelectItem>
                    <SelectItem value="#LON-0004">#LON-0004</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 min-w-0">
                <Input
                  type="date"
                  placeholder="Select date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6">
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-green-600 text-white hover:bg-green-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Excel
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-green-600 text-white hover:bg-green-700"
          >
            <FileText className="w-4 h-4 mr-2" />
            PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-green-600 text-white hover:bg-green-700"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-green-600 text-white hover:bg-green-700"
              >
                Column visibility ▼
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Show all columns</DropdownMenuItem>
              <DropdownMenuItem>Hide penalty column</DropdownMenuItem>
              <DropdownMenuItem>Hide interest column</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Search:</span>
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-48"
          />
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loan No.
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Principal Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Interest
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Penalty
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Link
                        href={`/dashboard/business-management/loan-payment/repayment-schedules/${item.loanNo.replace(
                          "#",
                          ""
                        )}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {item.loanNo}
                      </Link>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.paymentDate}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(item.principalAmount)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(item.interest)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(item.penalty)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(item.totalAmount)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Link
                          href={`/dashboard/business-management/loan-payment/repayment-schedules/${item.loanNo.replace(
                            "#",
                            ""
                          )}`}
                        >
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-green-600 hover:text-green-800"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
          {filteredData.length} entries
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const page = i + 1;
            return (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? "bg-blue-600 text-white" : ""}
              >
                {page}
              </Button>
            );
          })}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
