"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchableSelect } from "@/components/SearchableSelect";
import {
  Eye,
  Trash2,
  Download,
  Copy,
  FileText,
  ChevronLeft,
  ChevronRight,
  User,
  Phone,
  Mail,
  Building,
} from "lucide-react";
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, startOfDay, endOfDay, isAfter, startOfToday } from "date-fns";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { mockRepaymentSchedules, mockCreditOfficers } from "@/lib/mock-data";
import type { RepaymentSchedule } from "@/types/loan-system";

export default function RepaymentSchedulePage() {
  const [data, setData] = useState(mockRepaymentSchedules);
  const [selectedCreditOfficer, setSelectedCreditOfficer] =
    useState<string>("");
  const [selectedLoan, setSelectedLoan] = useState<string>("");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date } | any>(
    {}
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const selectedOfficer = mockCreditOfficers.find(
    (co) => co.id === selectedCreditOfficer
  );

  const toggleFullyPaid = (id: string) => {
    setData((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newFullyPaid = !item.fullyPaid;
          return {
            ...item,
            fullyPaid: newFullyPaid,
            status: newFullyPaid ? "fully paid" : "under repayment",
            amountLeftToPay: newFullyPaid ? 0 : item.totalAmount,
            dueToday: newFullyPaid ? 0 : item.dueToday,
          };
        }
        return item;
      })
    );
  };

  const getStatusBadge = (status: RepaymentSchedule["status"]) => {
    switch (status) {
      case "fully paid":
        return (
          <Badge className="bg-green-100 text-green-800">Fully Paid</Badge>
        );
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
      case "approved":
        return <Badge className="bg-cyan-100 text-cyan-800">Approved</Badge>;
      case "under repayment":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            Under Repayment
          </Badge>
        );
      case "overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Naira currency formatting
  const formatCurrency = (amount: number) =>
    `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

  const filteredData = data.filter((item) => {
    const matchesCreditOfficer =
      !selectedCreditOfficer || item.creditOfficerId === selectedCreditOfficer;
    const matchesLoan = !selectedLoan || item.loanNo === selectedLoan;
    const matchesSearch =
      !searchTerm ||
      item.loanNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.loanType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase());

    const isScheduledForTodayOrFuture =
      isAfter(new Date(item.repaymentDate), startOfToday()) ||
      format(new Date(item.repaymentDate), "yyyy-MM-dd") ===
        format(startOfToday(), "yyyy-MM-dd");

    let inRange = true;
    if (dateRange.from)
      inRange =
        startOfDay(new Date(item.loanIssuedDate)) >= startOfDay(dateRange.from);
    if (inRange && dateRange.to)
      inRange =
        endOfDay(new Date(item.repaymentDate)) <= endOfDay(dateRange.to);

    return (
      matchesCreditOfficer &&
      matchesLoan &&
      matchesSearch &&
      isScheduledForTodayOrFuture &&
      inRange
    );
  });

  const sortedData = filteredData.sort(
    (a, b) =>
      new Date(a.repaymentDate).getTime() - new Date(b.repaymentDate).getTime()
  );

  // Pagination setup
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      sortedData.map((item) => ({
        "Loan No": item.loanNo,
        "Customer Name": item.customerName,
        "Loan Type": item.loanType,
        "Loan Issued Date": item.loanIssuedDate,
        "Repayment Date": item.repaymentDate,
        "Loan Deadline": item.loanDeadline,
        "Principal Amount (₦)": item.principalAmount,
        "Processing Fee (₦)": item.processingFee,
        "Penalty (₦)": item.penalty,
        "Total Amount (₦)": item.totalAmount,
        "Amount Left to Pay (₦)": item.amountLeftToPay,
        "Due Today (₦)": item.dueToday,
        Status: item.status,
        "Fully Paid": item.fullyPaid ? "Yes" : "No",
        "Credit Officer":
          mockCreditOfficers.find((co) => co.id === item.creditOfficerId)
            ?.name || "N/A",
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "RepaymentSchedule");
    XLSX.writeFile(wb, "repayment_schedule.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Repayment Schedule", 14, 20);
    const columns = [
      "Loan No",
      "Customer",
      "Type",
      "Issued",
      "Repayment",
      "Principal (₦)",
      "Processing Fee (₦)",
      "Penalty (₦)",
      "Total (₦)",
      "Left to Pay (₦)",
      "Due Today (₦)",
      "Status",
      "Fully Paid",
    ];
    const rows = sortedData.map((item) => [
      item.loanNo,
      item.customerName,
      item.loanType,
      item.loanIssuedDate,
      item.repaymentDate,
      item.principalAmount.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
      }),
      item.processingFee.toLocaleString("en-NG", { minimumFractionDigits: 2 }),
      item.penalty.toLocaleString("en-NG", { minimumFractionDigits: 2 }),
      item.totalAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 }),
      item.amountLeftToPay.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
      }),
      item.dueToday.toLocaleString("en-NG", { minimumFractionDigits: 2 }),
      item.status,
      item.fullyPaid ? "Yes" : "No",
    ]);
    (doc as any).autoTable({
      head: [columns],
      body: rows,
      startY: 30,
    });
    doc.save("repayment_schedule.pdf");
  };

  const copyToClipboard = async () => {
    const header =
      [
        "Loan No",
        "Customer Name",
        "Loan Type",
        "Loan Issued Date",
        "Repayment Date",
        "Loan Deadline",
        "Principal Amount (₦)",
        "Processing Fee (₦)",
        "Penalty (₦)",
        "Total Amount (₦)",
        "Amount Left to Pay (₦)",
        "Due Today (₦)",
        "Status",
        "Fully Paid",
      ].join(",") + "\n";

    const rows = sortedData
      .map((item) =>
        [
          item.loanNo,
          item.customerName,
          item.loanType,
          item.loanIssuedDate,
          item.repaymentDate,
          item.loanDeadline,
          item.principalAmount.toString(),
          item.processingFee.toString(),
          item.penalty.toString(),
          item.totalAmount.toString(),
          item.amountLeftToPay.toString(),
          item.dueToday.toString(),
          item.status,
          item.fullyPaid ? "Yes" : "No",
        ].join(",")
      )
      .join("\n");

    const csvString = header + rows;
    try {
      await navigator.clipboard.writeText(csvString);
      alert("Table data copied to clipboard!");
    } catch {
      alert("Failed to copy data.");
    }
  };

  const creditOfficerOptions = mockCreditOfficers.map((co) => ({
    value: co.id,
    label: `${co.name} (${co.employeeId})`,
  }));

  const loanOptions = Array.from(new Set(data.map((item) => item.loanNo))).map(
    (loanNo) => ({
      value: loanNo,
      label: loanNo,
    })
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Repayment Schedule
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage upcoming loan repayments (today and forward)
          </p>
        </div>
      </div>

      {selectedOfficer && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Credit Officer Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">{selectedOfficer.name}</p>
                  <p className="text-xs text-gray-500">
                    ID: {selectedOfficer.employeeId}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm">{selectedOfficer.email}</p>
                  <p className="text-xs text-gray-500">Email</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm">{selectedOfficer.phone}</p>
                  <p className="text-xs text-gray-500">Phone</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm">{selectedOfficer.department}</p>
                  <p className="text-xs text-gray-500">
                    {selectedOfficer.activeLoans}/
                    {selectedOfficer.totalLoansManaged} Active
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Credit Officer
              </label>
              <SearchableSelect
                options={[
                  { value: "", label: "All Credit Officers" },
                  ...creditOfficerOptions,
                ]}
                value={selectedCreditOfficer}
                onValueChange={setSelectedCreditOfficer}
                placeholder="Select Credit Officer"
                searchPlaceholder="Search officers..."
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Loan Number
              </label>
              <SearchableSelect
                options={[{ value: "", label: "All Loans" }, ...loanOptions]}
                value={selectedLoan}
                onValueChange={setSelectedLoan}
                placeholder="Select Loan"
                searchPlaceholder="Search loans..."
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Date Range
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left bg-transparent"
                    aria-label="Select date range"
                  >
                    {dateRange.from && dateRange.to
                      ? `${format(dateRange.from, "MMM dd, yyyy")} - ${format(
                          dateRange.to,
                          "MMM dd, yyyy"
                        )}`
                      : "Select Date Range"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <Input
                placeholder="Search customer, loan, type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button
              className="bg-green-600 hover:bg-green-700 text-white px-6"
              onClick={() => setCurrentPage(1)}
            >
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Export Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          className="bg-green-600 text-white hover:bg-green-700"
          onClick={exportToExcel}
        >
          <Download className="w-4 h-4 mr-2" />
          Excel
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-green-600 text-white hover:bg-green-700"
          onClick={exportToPDF}
        >
          <FileText className="w-4 h-4 mr-2" />
          PDF
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-green-600 text-white hover:bg-green-700"
          onClick={copyToClipboard}
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy
        </Button>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full min-w-[1200px] border-collapse border border-gray-200">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loan No.
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loan Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issued Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Repayment Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deadline
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Principal (₦)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Processing Fee (₦)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount Left (₦)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Today (₦)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fully Paid
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap font-medium">
                    <Link
                      href={`/loan-details/${item.loanNo.replace("#", "")}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {item.loanNo}
                    </Link>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    {item.customerName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    {item.loanType}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    {item.loanIssuedDate}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    {item.repaymentDate}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    {item.loanDeadline}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    {formatCurrency(item.principalAmount)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    {formatCurrency(item.processingFee)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    {formatCurrency(item.amountLeftToPay)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    {formatCurrency(item.dueToday)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-center">
                    <input
                      type="checkbox"
                      checked={item.fullyPaid}
                      onChange={() => toggleFullyPaid(item.id)}
                      aria-label={`Mark loan ${item.loanNo} as fully paid`}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-800"
                        aria-label="Delete repayment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Link
                        href={`/loan-details/${item.loanNo.replace("#", "")}`}
                      >
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-green-600 hover:text-green-800"
                          aria-label="View repayment details"
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
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + itemsPerPage, sortedData.length)} of{" "}
          {sortedData.length} entries
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
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
                aria-current={currentPage === page ? "page" : undefined}
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
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Eye,
//   Trash2,
//   Download,
//   Copy,
//   FileText,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import Link from "next/link";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { format, startOfDay, endOfDay } from "date-fns";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// interface RepaymentSchedule {
//   id: string;
//   loanNo: string;
//   loanIssuedDate: string;
//   repaymentDate: string;
//   principalAmount: number;
//   processingFee: number;
//   penalty: number;
//   totalAmount: number;
//   dueToday: number;
//   status:
//     | "processing"
//     | "approved"
//     | "under repayment"
//     | "overdue"
//     | "fully paid";
//   fullyPaid: boolean;
// }

// const initialData: RepaymentSchedule[] = [
//   {
//     id: "1",
//     loanNo: "#LON-0002",
//     loanIssuedDate: "2024-06-01",
//     repaymentDate: "2024-07-20",
//     principalAmount: 198000,
//     processingFee: 22917,
//     penalty: 0,
//     totalAmount: 220917,
//     dueToday: 10000,
//     status: "fully paid",
//     fullyPaid: true,
//   },
//   {
//     id: "2",
//     loanNo: "#LON-0004",
//     loanIssuedDate: "2024-06-15",
//     repaymentDate: "2024-07-20",
//     principalAmount: 35714,
//     processingFee: 120000,
//     penalty: 0,
//     totalAmount: 155714,
//     dueToday: 5000,
//     status: "under repayment",
//     fullyPaid: false,
//   },
//   // More mock data here...
// ];

// export default function RepaymentSchedulePage() {
//   const [data, setData] = useState(initialData);
//   const [selectedLoan, setSelectedLoan] = useState<string | "">("");
//   const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date } | any>(
//     {}
//   );
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   // Toggle fully paid checkbox and update status accordingly
//   const toggleFullyPaid = (id: string) => {
//     setData((prev) =>
//       prev.map((item) => {
//         if (item.id === id) {
//           const newFullyPaid = !item.fullyPaid;
//           return {
//             ...item,
//             fullyPaid: newFullyPaid,
//             status: newFullyPaid ? "fully paid" : "under repayment",
//           };
//         }
//         return item;
//       })
//     );
//   };

//   // Format statuses into colored badges
//   const getStatusBadge = (status: RepaymentSchedule["status"]) => {
//     switch (status) {
//       case "fully paid":
//         return (
//           <Badge className="bg-green-100 text-green-800">Fully Paid</Badge>
//         );
//       case "processing":
//         return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
//       case "approved":
//         return <Badge className="bg-cyan-100 text-cyan-800">Approved</Badge>;
//       case "under repayment":
//         return (
//           <Badge className="bg-yellow-100 text-yellow-800">
//             Under Repayment
//           </Badge>
//         );
//       case "overdue":
//         return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
//       default:
//         return <Badge variant="secondary">{status}</Badge>;
//     }
//   };

//   // Naira currency formatting
//   const formatCurrency = (amount: number) =>
//     `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

//   // Filter data based on loan, search, date range
//   const filteredData = data.filter((item) => {
//     const matchesLoan = !selectedLoan || item.loanNo === selectedLoan;
//     const matchesSearch =
//       !searchTerm ||
//       item.loanNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.loanIssuedDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.repaymentDate.toLowerCase().includes(searchTerm.toLowerCase());

//     let inRange = true;
//     if (dateRange.from)
//       inRange =
//         startOfDay(new Date(item.loanIssuedDate)) >= startOfDay(dateRange.from);
//     if (inRange && dateRange.to)
//       inRange =
//         endOfDay(new Date(item.repaymentDate)) <= endOfDay(dateRange.to);
//     return matchesLoan && matchesSearch && inRange;
//   });

//   // Pagination setup
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedData = filteredData.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   // Export to Excel using XLSX
//   const exportToExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(
//       filteredData.map((item) => ({
//         "Loan No": item.loanNo,
//         "Loan Issued Date": item.loanIssuedDate,
//         "Repayment Date": item.repaymentDate,
//         "Principal Amount (₦)": item.principalAmount,
//         "Processing Fee (₦)": item.processingFee,
//         Penalty: item.penalty,
//         "Total Amount (₦)": item.totalAmount,
//         "Due Today (₦)": item.dueToday,
//         Status: item.status,
//         "Fully Paid": item.fullyPaid ? "Yes" : "No",
//       }))
//     );
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "RepaymentSchedule");
//     XLSX.writeFile(wb, "repayment_schedule.xlsx");
//   };

//   // Export to PDF using jsPDF
//   const exportToPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Repayment Schedule", 14, 20);
//     const columns = [
//       "Loan No",
//       "Loan Issued Date",
//       "Repayment Date",
//       "Principal Amount (₦)",
//       "Processing Fee (₦)",
//       "Penalty",
//       "Total Amount (₦)",
//       "Due Today (₦)",
//       "Status",
//       "Fully Paid",
//     ];
//     const rows = filteredData.map((item) => [
//       item.loanNo,
//       item.loanIssuedDate,
//       item.repaymentDate,
//       item.principalAmount.toLocaleString("en-NG", {
//         minimumFractionDigits: 2,
//       }),
//       item.processingFee.toLocaleString("en-NG", { minimumFractionDigits: 2 }),
//       item.penalty.toLocaleString("en-NG", { minimumFractionDigits: 2 }),
//       item.totalAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 }),
//       item.dueToday.toLocaleString("en-NG", { minimumFractionDigits: 2 }),
//       item.status,
//       item.fullyPaid ? "Yes" : "No",
//     ]);
//     (doc as any).autoTable({
//       head: [columns],
//       body: rows,
//       startY: 30,
//     });
//     doc.save("repayment_schedule.pdf");
//   };

//   // Copy table data as CSV to clipboard
//   const copyToClipboard = async () => {
//     const header =
//       [
//         "Loan No",
//         "Loan Issued Date",
//         "Repayment Date",
//         "Principal Amount (₦)",
//         "Processing Fee (₦)",
//         "Penalty",
//         "Total Amount (₦)",
//         "Due Today (₦)",
//         "Status",
//         "Fully Paid",
//       ].join(",") + "\n";

//     const rows = filteredData
//       .map((item) =>
//         [
//           item.loanNo,
//           item.loanIssuedDate,
//           item.repaymentDate,
//           item.principalAmount.toString(),
//           item.processingFee.toString(),
//           item.penalty.toString(),
//           item.totalAmount.toString(),
//           item.dueToday.toString(),
//           item.status,
//           item.fullyPaid ? "Yes" : "No",
//         ].join(",")
//       )
//       .join("\n");

//     const csvString = header + rows;
//     try {
//       await navigator.clipboard.writeText(csvString);
//       alert("Table data copied to clipboard!");
//     } catch {
//       alert("Failed to copy data.");
//     }
//   };

//   return (
//     <div className="p-4 md:p-6 space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-semibold text-gray-900">
//             Repayment Schedule
//           </h1>
//         </div>
//       </div>

//       {/* Filters Panel */}
//       <Card>
//         <CardContent className="p-6">
//           <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end flex-wrap">
//             <div className="flex-1 min-w-[220px]">
//               <Select value={selectedLoan} onValueChange={setSelectedLoan}>
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Select Loan" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="#LON-0002">#LON-0002</SelectItem>
//                   <SelectItem value="#LON-0003">#LON-0003</SelectItem>
//                   <SelectItem value="#LON-0004">#LON-0004</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="flex-1 min-w-[220px]">
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="outline"
//                     className="w-full justify-start text-left"
//                     aria-label="Select date range"
//                   >
//                     {dateRange.from && dateRange.to
//                       ? `${format(dateRange.from, "MMM dd, yyyy")} - ${format(
//                           dateRange.to,
//                           "MMM dd, yyyy"
//                         )}`
//                       : "Select Date Range"}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent align="start" className="w-auto p-0">
//                   <Calendar
//                     mode="range"
//                     selected={dateRange}
//                     onSelect={setDateRange}
//                     numberOfMonths={2}
//                     initialFocus
//                   />
//                 </PopoverContent>
//               </Popover>
//             </div>

//             <div className="flex-1 min-w-[220px]">
//               <Input
//                 placeholder="Search..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full"
//               />
//             </div>

//             <Button
//               className="bg-green-600 hover:bg-green-700 text-white px-6 whitespace-nowrap"
//               onClick={() => setCurrentPage(1)}
//             >
//               Search
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Export Buttons */}
//       <div className="flex flex-wrap gap-2">
//         <Button
//           variant="outline"
//           size="sm"
//           className="bg-green-600 text-white hover:bg-green-700"
//           onClick={exportToExcel}
//         >
//           <Download className="w-4 h-4 mr-2" />
//           Excel
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           className="bg-green-600 text-white hover:bg-green-700"
//           onClick={exportToPDF}
//         >
//           <FileText className="w-4 h-4 mr-2" />
//           PDF
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           className="bg-green-600 text-white hover:bg-green-700"
//           onClick={copyToClipboard}
//         >
//           <Copy className="w-4 h-4 mr-2" />
//           Copy
//         </Button>
//       </div>

//       {/* Table with horizontal scroll on small devices */}
//       <Card>
//         <CardContent className="p-0 overflow-x-auto">
//           <table className="w-full min-w-[900px] border-collapse border border-gray-200">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Loan No.
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Loan Issued Date
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Repayment Date
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Principal Amount (₦)
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Processing Fee (₦)
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Penalty (₦)
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Total Amount (₦)
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Due Today (₦)
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Fully Paid
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {paginatedData.map((item) => (
//                 <tr key={item.id} className="hover:bg-gray-50">
//                   <td className="px-4 py-4 whitespace-nowrap font-medium">
//                     <Link
//                       href={`/dashboard/business-management/loan-payment/repayment-schedules/${item.loanNo.replace(
//                         "#",
//                         ""
//                       )}`}
//                       className="text-blue-600 hover:text-blue-800"
//                     >
//                       {item.loanNo}
//                     </Link>
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap text-sm">
//                     {item.loanIssuedDate}
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap text-sm">
//                     {item.repaymentDate}
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap text-sm">
//                     {formatCurrency(item.principalAmount)}
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap text-sm">
//                     {formatCurrency(item.processingFee)}
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap text-sm">
//                     {formatCurrency(item.penalty)}
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap text-sm">
//                     {formatCurrency(item.totalAmount)}
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap text-sm">
//                     {formatCurrency(item.dueToday)}
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap">
//                     {getStatusBadge(item.status)}
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap text-center">
//                     <input
//                       type="checkbox"
//                       checked={item.fullyPaid}
//                       onChange={() => toggleFullyPaid(item.id)}
//                       aria-label={`Mark loan ${item.loanNo} as fully paid`}
//                       className="cursor-pointer"
//                     />
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap">
//                     <div className="flex items-center gap-2">
//                       <Button
//                         size="sm"
//                         variant="ghost"
//                         className="text-red-600 hover:text-red-800"
//                         aria-label="Delete repayment"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </Button>
//                       <Link
//                         href={`/dashboard/business-management/loan-payment/repayment-schedules/${item.loanNo.replace(
//                           "#",
//                           ""
//                         )}`}
//                       >
//                         <Button
//                           size="sm"
//                           variant="ghost"
//                           className="text-green-600 hover:text-green-800"
//                           aria-label="View repayment details"
//                         >
//                           <Eye className="w-4 h-4" />
//                         </Button>
//                       </Link>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </CardContent>
//       </Card>

//       {/* Pagination */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div className="text-sm text-gray-500">
//           Showing {startIndex + 1} to{" "}
//           {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
//           {filteredData.length} entries
//         </div>
//         <div className="flex items-center gap-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             aria-label="Previous page"
//           >
//             <ChevronLeft className="w-4 h-4" />
//           </Button>
//           {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//             const page = i + 1;
//             return (
//               <Button
//                 key={page}
//                 variant={currentPage === page ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setCurrentPage(page)}
//                 aria-current={currentPage === page ? "page" : undefined}
//               >
//                 {page}
//               </Button>
//             );
//           })}
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//             }
//             disabled={currentPage === totalPages}
//             aria-label="Next page"
//           >
//             <ChevronRight className="w-4 h-4" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
