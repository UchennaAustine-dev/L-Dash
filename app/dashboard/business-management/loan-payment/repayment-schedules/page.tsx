// "use client";

// import { useState } from "react";
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

// interface RepaymentSchedule {
//   id: string;
//   loanNo: string;
//   paymentDate: string;
//   principalAmount: number;
//   interest: number;
//   penalty: number;
//   totalAmount: number;
//   status: "paid" | "pending" | "overdue";
// }

// const mockData: RepaymentSchedule[] = [
//   {
//     id: "1",
//     loanNo: "#LON-0002",
//     paymentDate: "Jul 20, 2024",
//     principalAmount: 1980.37,
//     interest: 229.17,
//     penalty: 0,
//     totalAmount: 2209.54,
//     status: "paid",
//   },
//   {
//     id: "2",
//     loanNo: "#LON-0004",
//     paymentDate: "Jul 20, 2024",
//     principalAmount: 357.14,
//     interest: 1200,
//     penalty: 0,
//     totalAmount: 1557.14,
//     status: "paid",
//   },
//   {
//     id: "3",
//     loanNo: "#LON-0003",
//     paymentDate: "Aug 1, 2024",
//     principalAmount: 900,
//     interest: 52.5,
//     penalty: 0,
//     totalAmount: 952.5,
//     status: "paid",
//   },
//   {
//     id: "4",
//     loanNo: "#LON-0002",
//     paymentDate: "Aug 20, 2024",
//     principalAmount: 1998.53,
//     interest: 211.01,
//     penalty: 0,
//     totalAmount: 2209.54,
//     status: "paid",
//   },
//   {
//     id: "5",
//     loanNo: "#LON-0004",
//     paymentDate: "Aug 20, 2024",
//     principalAmount: 357.14,
//     interest: 1200,
//     penalty: 0,
//     totalAmount: 1557.14,
//     status: "paid",
//   },
//   {
//     id: "6",
//     loanNo: "#LON-0003",
//     paymentDate: "Sep 1, 2024",
//     principalAmount: 900,
//     interest: 42,
//     penalty: 0,
//     totalAmount: 942,
//     status: "paid",
//   },
//   {
//     id: "7",
//     loanNo: "#LON-0002",
//     paymentDate: "Sep 20, 2024",
//     principalAmount: 2016.85,
//     interest: 192.69,
//     penalty: 7026.34,
//     totalAmount: 9235.88,
//     status: "paid",
//   },
//   {
//     id: "8",
//     loanNo: "#LON-0004",
//     paymentDate: "Sep 20, 2024",
//     principalAmount: 357.14,
//     interest: 1200,
//     penalty: 0,
//     totalAmount: 1557.14,
//     status: "paid",
//   },
//   {
//     id: "9",
//     loanNo: "#LON-0003",
//     paymentDate: "Oct 1, 2024",
//     principalAmount: 900,
//     interest: 31.5,
//     penalty: 0,
//     totalAmount: 931.5,
//     status: "pending",
//   },
//   {
//     id: "10",
//     loanNo: "#LON-0002",
//     paymentDate: "Oct 20, 2024",
//     principalAmount: 2035.34,
//     interest: 174.21,
//     penalty: 0,
//     totalAmount: 2209.54,
//     status: "pending",
//   },
// ];

// export default function RepaymentSchedulePage() {
//   const [selectedLoan, setSelectedLoan] = useState("#LON-0002"); // Updated default value
//   const [selectedDate, setSelectedDate] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "paid":
//         return (
//           <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
//             Paid
//           </Badge>
//         );
//       case "pending":
//         return (
//           <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
//             Pending
//           </Badge>
//         );
//       case "overdue":
//         return (
//           <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
//             Overdue
//           </Badge>
//         );
//       default:
//         return <Badge variant="secondary">{status}</Badge>;
//     }
//   };

//   const formatCurrency = (amount: number) => {
//     return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
//   };

//   const filteredData = mockData.filter((item) => {
//     const matchesLoan = !selectedLoan || item.loanNo === selectedLoan;
//     const matchesSearch =
//       !searchTerm ||
//       item.loanNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.paymentDate.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesLoan && matchesSearch;
//   });

//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedData = filteredData.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   return (
//     <div className="p-4 md:p-6 space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-semibold text-gray-900">
//             Repayment schedule
//           </h1>
//           <nav className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
//             <Link href="/dashboard" className="hover:text-gray-700">
//               Dashboard
//             </Link>
//             <span>›</span>
//             <span className="text-gray-900">Repayment schedule</span>
//           </nav>
//         </div>
//       </div>

//       {/* Filters */}
//       <Card>
//         <CardContent className="p-6">
//           <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
//             <div className="flex flex-col sm:flex-row gap-4 flex-1">
//               <div className="flex-1 min-w-0">
//                 <Select value={selectedLoan} onValueChange={setSelectedLoan}>
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Select Loan" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="#LON-0002">#LON-0002</SelectItem>
//                     <SelectItem value="#LON-0003">#LON-0003</SelectItem>
//                     <SelectItem value="#LON-0004">#LON-0004</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="flex-1 min-w-0">
//                 <Input
//                   type="date"
//                   placeholder="Select date"
//                   value={selectedDate}
//                   onChange={(e) => setSelectedDate(e.target.value)}
//                   className="w-full"
//                 />
//               </div>
//             </div>
//             <Button className="bg-green-600 hover:bg-green-700 text-white px-6">
//               Search
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Table Actions */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div className="flex flex-wrap gap-2">
//           <Button
//             variant="outline"
//             size="sm"
//             className="bg-green-600 text-white hover:bg-green-700"
//           >
//             <Download className="w-4 h-4 mr-2" />
//             Excel
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             className="bg-green-600 text-white hover:bg-green-700"
//           >
//             <FileText className="w-4 h-4 mr-2" />
//             PDF
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             className="bg-green-600 text-white hover:bg-green-700"
//           >
//             <Copy className="w-4 h-4 mr-2" />
//             Copy
//           </Button>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="bg-green-600 text-white hover:bg-green-700"
//               >
//                 Column visibility ▼
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent>
//               <DropdownMenuItem>Show all columns</DropdownMenuItem>
//               <DropdownMenuItem>Hide penalty column</DropdownMenuItem>
//               <DropdownMenuItem>Hide interest column</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//         <div className="flex items-center gap-2">
//           <span className="text-sm text-gray-500">Search:</span>
//           <Input
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-48"
//           />
//         </div>
//       </div>

//       {/* Table */}
//       <Card>
//         <CardContent className="p-0">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Loan No.
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Payment Date
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Principal Amount
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Interest
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Penalty
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Total Amount
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {paginatedData.map((item) => (
//                   <tr key={item.id} className="hover:bg-gray-50">
//                     <td className="px-4 py-4 whitespace-nowrap">
//                       <Link
//                         href={`/dashboard/business-management/loan-payment/repayment-schedules/${item.loanNo.replace(
//                           "#",
//                           ""
//                         )}`}
//                         className="text-blue-600 hover:text-blue-800 font-medium"
//                       >
//                         {item.loanNo}
//                       </Link>
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {item.paymentDate}
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {formatCurrency(item.principalAmount)}
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {formatCurrency(item.interest)}
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {formatCurrency(item.penalty)}
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {formatCurrency(item.totalAmount)}
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap">
//                       {getStatusBadge(item.status)}
//                     </td>
//                     <td className="px-4 py-4 whitespace-nowrap">
//                       <div className="flex items-center gap-2">
//                         <Button
//                           size="sm"
//                           variant="ghost"
//                           className="text-red-600 hover:text-red-800"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </Button>
//                         <Link
//                           href={`/dashboard/business-management/loan-payment/repayment-schedules/${item.loanNo.replace(
//                             "#",
//                             ""
//                           )}`}
//                         >
//                           <Button
//                             size="sm"
//                             variant="ghost"
//                             className="text-green-600 hover:text-green-800"
//                           >
//                             <Eye className="w-4 h-4" />
//                           </Button>
//                         </Link>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
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
//                 className={currentPage === page ? "bg-blue-600 text-white" : ""}
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
//           >
//             <ChevronRight className="w-4 h-4" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, startOfDay, endOfDay } from "date-fns";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

interface RepaymentSchedule {
  id: string;
  loanNo: string;
  loanIssuedDate: string;
  repaymentDate: string;
  principalAmount: number;
  processingFee: number;
  penalty: number;
  totalAmount: number;
  dueToday: number;
  status:
    | "processing"
    | "approved"
    | "under repayment"
    | "overdue"
    | "fully paid";
  fullyPaid: boolean;
}

const initialData: RepaymentSchedule[] = [
  {
    id: "1",
    loanNo: "#LON-0002",
    loanIssuedDate: "2024-06-01",
    repaymentDate: "2024-07-20",
    principalAmount: 198000,
    processingFee: 22917,
    penalty: 0,
    totalAmount: 220917,
    dueToday: 10000,
    status: "fully paid",
    fullyPaid: true,
  },
  {
    id: "2",
    loanNo: "#LON-0004",
    loanIssuedDate: "2024-06-15",
    repaymentDate: "2024-07-20",
    principalAmount: 35714,
    processingFee: 120000,
    penalty: 0,
    totalAmount: 155714,
    dueToday: 5000,
    status: "under repayment",
    fullyPaid: false,
  },
  // More mock data here...
];

export default function RepaymentSchedulePage() {
  const [data, setData] = useState(initialData);
  const [selectedLoan, setSelectedLoan] = useState<string | "">("");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date } | any>(
    {}
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Toggle fully paid checkbox and update status accordingly
  const toggleFullyPaid = (id: string) => {
    setData((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newFullyPaid = !item.fullyPaid;
          return {
            ...item,
            fullyPaid: newFullyPaid,
            status: newFullyPaid ? "fully paid" : "under repayment",
          };
        }
        return item;
      })
    );
  };

  // Format statuses into colored badges
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

  // Filter data based on loan, search, date range
  const filteredData = data.filter((item) => {
    const matchesLoan = !selectedLoan || item.loanNo === selectedLoan;
    const matchesSearch =
      !searchTerm ||
      item.loanNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.loanIssuedDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.repaymentDate.toLowerCase().includes(searchTerm.toLowerCase());

    let inRange = true;
    if (dateRange.from)
      inRange =
        startOfDay(new Date(item.loanIssuedDate)) >= startOfDay(dateRange.from);
    if (inRange && dateRange.to)
      inRange =
        endOfDay(new Date(item.repaymentDate)) <= endOfDay(dateRange.to);
    return matchesLoan && matchesSearch && inRange;
  });

  // Pagination setup
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Export to Excel using XLSX
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredData.map((item) => ({
        "Loan No": item.loanNo,
        "Loan Issued Date": item.loanIssuedDate,
        "Repayment Date": item.repaymentDate,
        "Principal Amount (₦)": item.principalAmount,
        "Processing Fee (₦)": item.processingFee,
        Penalty: item.penalty,
        "Total Amount (₦)": item.totalAmount,
        "Due Today (₦)": item.dueToday,
        Status: item.status,
        "Fully Paid": item.fullyPaid ? "Yes" : "No",
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "RepaymentSchedule");
    XLSX.writeFile(wb, "repayment_schedule.xlsx");
  };

  // Export to PDF using jsPDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Repayment Schedule", 14, 20);
    const columns = [
      "Loan No",
      "Loan Issued Date",
      "Repayment Date",
      "Principal Amount (₦)",
      "Processing Fee (₦)",
      "Penalty",
      "Total Amount (₦)",
      "Due Today (₦)",
      "Status",
      "Fully Paid",
    ];
    const rows = filteredData.map((item) => [
      item.loanNo,
      item.loanIssuedDate,
      item.repaymentDate,
      item.principalAmount.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
      }),
      item.processingFee.toLocaleString("en-NG", { minimumFractionDigits: 2 }),
      item.penalty.toLocaleString("en-NG", { minimumFractionDigits: 2 }),
      item.totalAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 }),
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

  // Copy table data as CSV to clipboard
  const copyToClipboard = async () => {
    const header =
      [
        "Loan No",
        "Loan Issued Date",
        "Repayment Date",
        "Principal Amount (₦)",
        "Processing Fee (₦)",
        "Penalty",
        "Total Amount (₦)",
        "Due Today (₦)",
        "Status",
        "Fully Paid",
      ].join(",") + "\n";

    const rows = filteredData
      .map((item) =>
        [
          item.loanNo,
          item.loanIssuedDate,
          item.repaymentDate,
          item.principalAmount.toString(),
          item.processingFee.toString(),
          item.penalty.toString(),
          item.totalAmount.toString(),
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

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Repayment Schedule
          </h1>
        </div>
      </div>

      {/* Filters Panel */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end flex-wrap">
            <div className="flex-1 min-w-[220px]">
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

            <div className="flex-1 min-w-[220px]">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
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

            <div className="flex-1 min-w-[220px]">
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>

            <Button
              className="bg-green-600 hover:bg-green-700 text-white px-6 whitespace-nowrap"
              onClick={() => setCurrentPage(1)}
            >
              Search
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

      {/* Table with horizontal scroll on small devices */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse border border-gray-200">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loan No.
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loan Issued Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Repayment Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Principal Amount (₦)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Processing Fee (₦)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Penalty (₦)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Amount (₦)
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
                      href={`/dashboard/business-management/loan-payment/repayment-schedules/${item.loanNo.replace(
                        "#",
                        ""
                      )}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {item.loanNo}
                    </Link>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    {item.loanIssuedDate}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    {item.repaymentDate}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    {formatCurrency(item.principalAmount)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    {formatCurrency(item.processingFee)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    {formatCurrency(item.penalty)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    {formatCurrency(item.totalAmount)}
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
                        href={`/dashboard/business-management/loan-payment/repayment-schedules/${item.loanNo.replace(
                          "#",
                          ""
                        )}`}
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
          {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
          {filteredData.length} entries
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
