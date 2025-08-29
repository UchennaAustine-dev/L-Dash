"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Copy,
  FileText,
  Printer,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  User,
  Phone,
  Mail,
  Building,
} from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { mockLoanDetails, mockPaymentHistory } from "@/lib/mock-data";

export default function LoanDetailsPage() {
  const params = useParams();
  const loanId = params.loanId as string;
  const loanData = mockLoanDetails[loanId] || mockLoanDetails["LON-0002"];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const sortedPaymentHistory = [
    ...loanData.paymentHistory,
    ...mockPaymentHistory,
  ]
    .filter((p) => p.loanNo === loanData.loanNo)
    .sort(
      (a, b) =>
        new Date(b.repaymentDate).getTime() -
        new Date(a.repaymentDate).getTime()
    );

  // Format currency in Naira
  const formatCurrency = (amount: number) =>
    `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

  // Pagination
  const totalPages = Math.ceil(sortedPaymentHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPayments = sortedPaymentHistory.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const toggleFullyPaid = (id: string) => {
    // In a real app, this would update the backend
    console.log(`[v0] Toggling fully paid status for payment ${id}`);
  };

  // Status badge renderer
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
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
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      sortedPaymentHistory.map((payment) => ({
        "Loan No": payment.loanNo,
        "Customer Name": payment.customerName,
        "Loan Issued Date": payment.loanIssuedDate,
        "Repayment Date": payment.repaymentDate,
        "Loan Deadline": payment.loanDeadline,
        "Principal Amount (₦)": payment.principalAmount,
        "Processing Fee (₦)": payment.processingFee,
        "Penalty (₦)": payment.penalty,
        "Total Amount (₦)": payment.totalAmount,
        "Amount Left to Pay (₦)": payment.amountLeftToPay,
        "Due Today (₦)": payment.dueToday,
        Status: payment.status,
        "Fully Paid": payment.fullyPaid ? "Yes" : "No",
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "PaymentHistory");
    XLSX.writeFile(
      wb,
      `${loanData.loanNo.replace("#", "")}_payment_history.xlsx`
    );
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(`Payment History - ${loanData.loanNo}`, 14, 20);
    const columns = [
      "Loan No",
      "Customer",
      "Issued",
      "Repayment",
      "Deadline",
      "Principal (₦)",
      "Processing Fee (₦)",
      "Penalty (₦)",
      "Total (₦)",
      "Left to Pay (₦)",
      "Due Today (₦)",
      "Status",
      "Fully Paid",
    ];
    const rows = sortedPaymentHistory.map((payment) => [
      payment.loanNo,
      payment.customerName,
      payment.loanIssuedDate,
      payment.repaymentDate,
      payment.loanDeadline,
      payment.principalAmount.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
      }),
      payment.processingFee.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
      }),
      payment.penalty.toLocaleString("en-NG", { minimumFractionDigits: 2 }),
      payment.totalAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 }),
      payment.amountLeftToPay.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
      }),
      payment.dueToday.toLocaleString("en-NG", { minimumFractionDigits: 2 }),
      payment.status,
      payment.fullyPaid ? "Yes" : "No",
    ]);
    (doc as any).autoTable({
      head: [columns],
      body: rows,
      startY: 30,
    });
    doc.save(`${loanData.loanNo.replace("#", "")}_payment_history.pdf`);
  };

  const copyToClipboard = async () => {
    const header =
      [
        "Loan No",
        "Customer Name",
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

    const rows = sortedPaymentHistory
      .map((payment) =>
        [
          payment.loanNo,
          payment.customerName,
          payment.loanIssuedDate,
          payment.repaymentDate,
          payment.loanDeadline,
          payment.principalAmount.toString(),
          payment.processingFee.toString(),
          payment.penalty.toString(),
          payment.totalAmount.toString(),
          payment.amountLeftToPay.toString(),
          payment.dueToday.toString(),
          payment.status,
          payment.fullyPaid ? "Yes" : "No",
        ].join(",")
      )
      .join("\n");

    const csvString = header + rows;
    try {
      await navigator.clipboard.writeText(csvString);
      alert("Payment history copied to clipboard!");
    } catch {
      alert("Failed to copy data.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Link href="/repayment-schedule">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Loan Details & Payment History
            </h1>
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
              <Link href="/dashboard" className="hover:text-gray-700">
                Dashboard
              </Link>
              <span>›</span>
              <Link href="/repayment-schedule" className="hover:text-gray-700">
                Repayment schedule
              </Link>
              <span>›</span>
              <span className="text-gray-900">{loanData.loanNo}</span>
            </nav>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={exportToExcel}
            className="bg-green-600 text-white hover:bg-green-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Excel
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={exportToPDF}
            className="bg-green-600 text-white hover:bg-green-700"
          >
            <FileText className="w-4 h-4 mr-2" />
            PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="bg-green-600 text-white hover:bg-green-700"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
          <Button
            onClick={handlePrint}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Credit Officer Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">
                  {loanData.creditOfficer.name}
                </p>
                <p className="text-xs text-gray-500">
                  ID: {loanData.creditOfficer.employeeId}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm">{loanData.creditOfficer.email}</p>
                <p className="text-xs text-gray-500">Email</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm">{loanData.creditOfficer.phone}</p>
                <p className="text-xs text-gray-500">Phone</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm">{loanData.creditOfficer.department}</p>
                <p className="text-xs text-gray-500">
                  {loanData.creditOfficer.activeLoans}/
                  {loanData.creditOfficer.totalLoansManaged} Active
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loan detail card */}
      <Card className="max-w-4xl mx-auto print:max-w-full print:shadow-none">
        <CardContent className="p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center print:bg-black">
                <div className="text-white font-bold text-lg">FL</div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-green-600 print:text-black">
                  FINANCELEND
                </h2>
                <p className="text-sm text-gray-500 print:text-black">
                  LOAN MANAGEMENT SOLUTION
                </p>
              </div>
            </div>
            <div className="text-right print:text-black">
              <p className="text-sm text-gray-500">
                Due Date: {loanData.loanDeadline}
              </p>
              {getStatusBadge(loanData.status)}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 print:text-black">
              {loanData.loanNo}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 print:grid-cols-1 print:gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-3 print:text-black">
                From:
              </h4>
              <div className="space-y-1">
                <p className="font-semibold text-gray-900 print:text-black">
                  {loanData.from.company}
                </p>
                <p className="text-gray-600 print:text-black">
                  {loanData.from.phone}
                </p>
                <p className="text-gray-600 print:text-black">
                  {loanData.from.email}
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-3 print:text-black">
                To:
              </h4>
              <div className="space-y-1">
                <p className="font-semibold text-gray-900 print:text-black">
                  {loanData.to.name}
                </p>
                <p className="text-gray-600 print:text-black">
                  {loanData.to.phone}
                </p>
                <p className="text-gray-600 print:text-black">
                  {loanData.to.address}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 print:grid-cols-1 print:gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2 print:text-black">
                Loan Number
              </h4>
              <p className="font-semibold text-gray-900 print:text-black">
                {loanData.loanNo}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2 print:text-black">
                Loan Type
              </h4>
              <p className="font-semibold text-gray-900 print:text-black">
                {loanData.loanType}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2 print:text-black">
                Issued Date
              </h4>
              <p className="font-semibold text-gray-900 print:text-black">
                {loanData.loanIssuedDate}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2 print:text-black">
                Deadline
              </h4>
              <p className="font-semibold text-gray-900 print:text-black">
                {loanData.loanDeadline}
              </p>
            </div>
          </div>

          {/* Payment Breakdown & History */}
          <div className="border-t pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8 print:grid-cols-1 print:gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2 print:text-black">
                  Principal Amount
                </h4>
                <p className="text-lg font-semibold text-gray-900 print:text-black">
                  {formatCurrency(loanData.principalAmount)}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2 print:text-black">
                  Processing Fee
                </h4>
                <p className="text-lg font-semibold text-gray-900 print:text-black">
                  {formatCurrency(loanData.processingFee)}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2 print:text-black">
                  Penalty
                </h4>
                <p className="text-lg font-semibold text-gray-900 print:text-black">
                  {formatCurrency(loanData.penalty)}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2 print:text-black">
                  Amount Left to Pay
                </h4>
                <p className="text-lg font-semibold text-gray-900 print:text-black">
                  {formatCurrency(loanData.amountLeftToPay)}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2 print:text-black">
                  Total Amount
                </h4>
                <p className="text-xl font-bold text-gray-900 print:text-black">
                  {formatCurrency(loanData.totalAmount)}
                </p>
              </div>
            </div>

            <div className="mt-10 overflow-x-auto">
              <h3 className="text-lg font-semibold mb-4">
                Payment History (Latest to Oldest)
              </h3>
              <table className="w-full min-w-[1200px] border-collapse border border-gray-200 print:min-w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Loan No
                    </th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Issued Date
                    </th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Repayment Date
                    </th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deadline
                    </th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Principal (₦)
                    </th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Processing Fee (₦)
                    </th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Penalty (₦)
                    </th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount Left (₦)
                    </th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Today (₦)
                    </th>
                    <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fully Paid
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedPayments.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="p-3 whitespace-nowrap font-medium">
                        {p.loanNo}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        {p.customerName}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        {p.loanIssuedDate}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        {p.repaymentDate}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        {p.loanDeadline}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        {formatCurrency(p.principalAmount)}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        {formatCurrency(p.processingFee)}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        {formatCurrency(p.penalty)}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        {formatCurrency(p.amountLeftToPay)}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        {formatCurrency(p.dueToday)}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        {getStatusBadge(p.status)}
                      </td>
                      <td className="p-3 text-center whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={p.fullyPaid}
                          onChange={() => toggleFullyPaid(p.id)}
                          aria-label={`Mark loan ${p.loanNo} repayment as fully paid`}
                          className="cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls for payment history */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <div className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {paginatedPayments.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No payment history found for this loan.
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { useParams } from "next/navigation";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// import {
//   Download,
//   Copy,
//   FileText,
//   Printer,
//   ChevronLeft,
//   ChevronRight,
//   ArrowLeft,
// } from "lucide-react";

// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import { format, startOfDay, endOfDay } from "date-fns";

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

// interface LoanDetails {
//   loanNo: string;
//   loanType: string;
//   amount: number;
//   dueDate: string;
//   principalAmount: number;
//   processingFee: number;
//   penalty: number;
//   totalAmount: number;
//   status: string;
//   from: {
//     company: string;
//     phone: string;
//     email: string;
//   };
//   to: {
//     name: string;
//     phone: string;
//   };
//   paymentHistory: RepaymentSchedule[];
// }

// // Synchronized mock data
// const repaymentMockData: RepaymentSchedule[] = [
//   {
//     id: "r1",
//     loanNo: "#LON-0002",
//     loanIssuedDate: "2024-06-01",
//     repaymentDate: "2024-07-20",
//     principalAmount: 198000,
//     processingFee: 22917,
//     penalty: 8793.97,
//     totalAmount: 229710.97,
//     dueToday: 0,
//     status: "fully paid",
//     fullyPaid: true,
//   },
//   {
//     id: "r2",
//     loanNo: "#LON-0003",
//     loanIssuedDate: "2024-07-01",
//     repaymentDate: "2024-10-01",
//     principalAmount: 900,
//     processingFee: 31.5,
//     penalty: 0,
//     totalAmount: 931.5,
//     dueToday: 500,
//     status: "under repayment",
//     fullyPaid: false,
//   },
//   {
//     id: "r3",
//     loanNo: "#LON-0004",
//     loanIssuedDate: "2024-06-15",
//     repaymentDate: "2024-08-15",
//     principalAmount: 35714,
//     processingFee: 2500,
//     penalty: 1200,
//     totalAmount: 39414,
//     dueToday: 5000,
//     status: "overdue",
//     fullyPaid: false,
//   },
//   {
//     id: "r4",
//     loanNo: "#LON-0005",
//     loanIssuedDate: "2024-08-01",
//     repaymentDate: "2024-09-01",
//     principalAmount: 50000,
//     processingFee: 3750,
//     penalty: 0,
//     totalAmount: 53750,
//     dueToday: 53750,
//     status: "approved",
//     fullyPaid: false,
//   },
// ];

// const mockLoanData: Record<string, LoanDetails> = {
//   "LON-0002": {
//     loanNo: "#LON-0002",
//     loanType: "Mortgage Loan",
//     amount: 250000,
//     dueDate: "Jul 20, 2024",
//     principalAmount: 198000,
//     processingFee: 22917,
//     penalty: 8793.97,
//     totalAmount: 229710.97,
//     status: "Paid",
//     from: {
//       company: "Smartweb Infotech",
//       phone: "07878787878",
//       email: "smartweb@gmail.com",
//     },
//     to: {
//       name: "Jane Smith",
//       phone: "+1987654321",
//     },
//     paymentHistory: repaymentMockData.filter((p) => p.loanNo === "#LON-0002"),
//   },
//   "LON-0003": {
//     loanNo: "#LON-0003",
//     loanType: "Personal Loan",
//     amount: 15000,
//     dueDate: "Oct 1, 2024",
//     principalAmount: 900,
//     processingFee: 31.5,
//     penalty: 0,
//     totalAmount: 931.5,
//     status: "Pending",
//     from: {
//       company: "Smartweb Infotech",
//       phone: "07878787878",
//       email: "smartweb@gmail.com",
//     },
//     to: {
//       name: "John Doe",
//       phone: "+1234567890",
//     },
//     paymentHistory: repaymentMockData.filter((p) => p.loanNo === "#LON-0003"),
//   },
//   "LON-0004": {
//     loanNo: "#LON-0004",
//     loanType: "Business Loan",
//     amount: 45000,
//     dueDate: "Aug 15, 2024",
//     principalAmount: 35714,
//     processingFee: 2500,
//     penalty: 1200,
//     totalAmount: 39414,
//     status: "Overdue",
//     from: {
//       company: "Smartweb Infotech",
//       phone: "07878787878",
//       email: "smartweb@gmail.com",
//     },
//     to: {
//       name: "Michael Johnson",
//       phone: "+1122334455",
//     },
//     paymentHistory: repaymentMockData.filter((p) => p.loanNo === "#LON-0004"),
//   },
//   "LON-0005": {
//     loanNo: "#LON-0005",
//     loanType: "Vehicle Loan",
//     amount: 60000,
//     dueDate: "Sep 1, 2024",
//     principalAmount: 50000,
//     processingFee: 3750,
//     penalty: 0,
//     totalAmount: 53750,
//     status: "Approved",
//     from: {
//       company: "Smartweb Infotech",
//       phone: "07878787878",
//       email: "smartweb@gmail.com",
//     },
//     to: {
//       name: "Sarah Wilson",
//       phone: "+1555666777",
//     },
//     paymentHistory: repaymentMockData.filter((p) => p.loanNo === "#LON-0005"),
//   },
// };

// export default function LoanDetailsPage() {
//   const params = useParams();
//   const loanId = params.loanId as string;
//   const loanData = mockLoanData[loanId] || mockLoanData["LON-0002"];

//   const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   // Format currency in Naira
//   const formatCurrency = (amount: number) =>
//     `₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

//   // Filter payment history by date range and search term
//   const filteredPayments = loanData.paymentHistory.filter((payment) => {
//     const matchesSearch =
//       !searchTerm ||
//       payment.loanNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       payment.repaymentDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       payment.status.toLowerCase().includes(searchTerm.toLowerCase());

//     let inDateRange = true;
//     if (dateRange.from)
//       inDateRange =
//         startOfDay(new Date(payment.loanIssuedDate)) >=
//         startOfDay(dateRange.from);
//     if (inDateRange && dateRange.to)
//       inDateRange =
//         endOfDay(new Date(payment.repaymentDate)) <= endOfDay(dateRange.to);
//     return matchesSearch && inDateRange;
//   });

//   // Pagination
//   const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedPayments = filteredPayments.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   // Toggle fully paid status and update payment status accordingly
//   const toggleFullyPaid = (id: string) => {
//     loanData.paymentHistory.forEach((payment) => {
//       if (payment.id === id) {
//         payment.fullyPaid = !payment.fullyPaid;
//         payment.status = payment.fullyPaid ? "fully paid" : "under repayment";
//         payment.dueToday = payment.fullyPaid ? 0 : payment.dueToday;
//       }
//     });
//     // Force update (could use state or context in real app)
//     setCurrentPage(currentPage);
//   };

//   // Status badge renderer
//   const getStatusBadge = (status: string) => {
//     switch (status.toLowerCase()) {
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
//       case "paid":
//         return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
//       case "pending":
//         return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
//       default:
//         return <Badge variant="secondary">{status}</Badge>;
//     }
//   };

//   // Export to Excel
//   const exportToExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(
//       filteredPayments.map((payment) => ({
//         "Loan No": payment.loanNo,
//         "Loan Issued Date": payment.loanIssuedDate,
//         "Repayment Date": payment.repaymentDate,
//         "Principal Amount (₦)": payment.principalAmount,
//         "Processing Fee (₦)": payment.processingFee,
//         "Penalty (₦)": payment.penalty,
//         "Total Amount (₦)": payment.totalAmount,
//         "Due Today (₦)": payment.dueToday,
//         Status: payment.status,
//         "Fully Paid": payment.fullyPaid ? "Yes" : "No",
//       }))
//     );
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "PaymentHistory");
//     XLSX.writeFile(
//       wb,
//       `${loanData.loanNo.replace("#", "")}_payment_history.xlsx`
//     );
//   };

//   // Export to PDF
//   const exportToPDF = () => {
//     const doc = new jsPDF();
//     doc.text(`Payment History - ${loanData.loanNo}`, 14, 20);
//     const columns = [
//       "Loan No",
//       "Loan Issued Date",
//       "Repayment Date",
//       "Principal Amount (₦)",
//       "Processing Fee (₦)",
//       "Penalty (₦)",
//       "Total Amount (₦)",
//       "Due Today (₦)",
//       "Status",
//       "Fully Paid",
//     ];
//     const rows = filteredPayments.map((payment) => [
//       payment.loanNo,
//       payment.loanIssuedDate,
//       payment.repaymentDate,
//       payment.principalAmount.toLocaleString("en-NG", {
//         minimumFractionDigits: 2,
//       }),
//       payment.processingFee.toLocaleString("en-NG", {
//         minimumFractionDigits: 2,
//       }),
//       payment.penalty.toLocaleString("en-NG", { minimumFractionDigits: 2 }),
//       payment.totalAmount.toLocaleString("en-NG", { minimumFractionDigits: 2 }),
//       payment.dueToday.toLocaleString("en-NG", { minimumFractionDigits: 2 }),
//       payment.status,
//       payment.fullyPaid ? "Yes" : "No",
//     ]);
//     (doc as any).autoTable({
//       head: [columns],
//       body: rows,
//       startY: 30,
//     });
//     doc.save(`${loanData.loanNo.replace("#", "")}_payment_history.pdf`);
//   };

//   // Copy to clipboard
//   const copyToClipboard = async () => {
//     const header =
//       [
//         "Loan No",
//         "Loan Issued Date",
//         "Repayment Date",
//         "Principal Amount (₦)",
//         "Processing Fee (₦)",
//         "Penalty (₦)",
//         "Total Amount (₦)",
//         "Due Today (₦)",
//         "Status",
//         "Fully Paid",
//       ].join(",") + "\n";

//     const rows = filteredPayments
//       .map((payment) =>
//         [
//           payment.loanNo,
//           payment.loanIssuedDate,
//           payment.repaymentDate,
//           payment.principalAmount.toString(),
//           payment.processingFee.toString(),
//           payment.penalty.toString(),
//           payment.totalAmount.toString(),
//           payment.dueToday.toString(),
//           payment.status,
//           payment.fullyPaid ? "Yes" : "No",
//         ].join(",")
//       )
//       .join("\n");

//     const csvString = header + rows;
//     try {
//       await navigator.clipboard.writeText(csvString);
//       alert("Payment history copied to clipboard!");
//     } catch {
//       alert("Failed to copy data.");
//     }
//   };

//   // Print page handler with basic styles
//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//         <div className="flex items-center gap-4">
//           <Link href="/dashboard/business-management/loan-payment/repayment-schedules">
//             <Button variant="ghost" size="sm">
//               <ArrowLeft className="w-4 h-4 mr-2" />
//               Back
//             </Button>
//           </Link>
//           <div>
//             <h1 className="text-2xl font-semibold text-gray-900">
//               Schedule Payment
//             </h1>
//             <nav className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
//               <Link href="/dashboard" className="hover:text-gray-700">
//                 Dashboard
//               </Link>
//               <span>›</span>
//               <Link
//                 href="/dashboard/business-management/loan-payment/repayment-schedules"
//                 className="hover:text-gray-700"
//               >
//                 Repayment schedule
//               </Link>
//               <span>›</span>
//               <span className="text-gray-900">{loanData.loanNo}</span>
//             </nav>
//           </div>
//         </div>
//         <div className="flex gap-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={exportToExcel}
//             className="bg-green-600 text-white hover:bg-green-700"
//           >
//             <Download className="w-4 h-4 mr-2" />
//             Excel
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={exportToPDF}
//             className="bg-green-600 text-white hover:bg-green-700"
//           >
//             <FileText className="w-4 h-4 mr-2" />
//             PDF
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={copyToClipboard}
//             className="bg-green-600 text-white hover:bg-green-700"
//           >
//             <Copy className="w-4 h-4 mr-2" />
//             Copy
//           </Button>
//           <Button
//             onClick={handlePrint}
//             className="bg-green-600 hover:bg-green-700 text-white"
//           >
//             <Printer className="w-4 h-4 mr-2" />
//             Print
//           </Button>
//         </div>
//       </div>

//       {/* Loan detail card */}
//       <Card className="max-w-4xl mx-auto print:max-w-full print:shadow-none">
//         <CardContent className="p-8">
//           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center print:bg-black">
//                 <div className="text-white font-bold text-lg">FL</div>
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold text-green-600 print:text-black">
//                   FINANCELEND
//                 </h2>
//                 <p className="text-sm text-gray-500 print:text-black">
//                   LOAN MANAGEMENT SOLUTION
//                 </p>
//               </div>
//             </div>
//             <div className="text-right print:text-black">
//               <p className="text-sm text-gray-500">
//                 Due Date: {loanData.dueDate}
//               </p>
//               {getStatusBadge(loanData.status)}
//             </div>
//           </div>

//           <div className="mb-8">
//             <h3 className="text-2xl font-bold text-gray-900 print:text-black">
//               {loanData.loanNo}
//             </h3>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 print:grid-cols-1 print:gap-4">
//             <div>
//               <h4 className="text-sm font-medium text-gray-500 mb-3 print:text-black">
//                 From:
//               </h4>
//               <div className="space-y-1">
//                 <p className="font-semibold text-gray-900 print:text-black">
//                   {loanData.from.company}
//                 </p>
//                 <p className="text-gray-600 print:text-black">
//                   {loanData.from.phone}
//                 </p>
//                 <p className="text-gray-600 print:text-black">
//                   {loanData.from.email}
//                 </p>
//               </div>
//             </div>
//             <div>
//               <h4 className="text-sm font-medium text-gray-500 mb-3 print:text-black">
//                 To:
//               </h4>
//               <div className="space-y-1">
//                 <p className="font-semibold text-gray-900 print:text-black">
//                   {loanData.to.name}
//                 </p>
//                 <p className="text-gray-600 print:text-black">
//                   {loanData.to.phone}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 print:grid-cols-1 print:gap-4">
//             <div>
//               <h4 className="text-sm font-medium text-gray-500 mb-2 print:text-black">
//                 Loan
//               </h4>
//               <p className="font-semibold text-gray-900 print:text-black">
//                 {loanData.loanNo}
//               </p>
//             </div>
//             <div>
//               <h4 className="text-sm font-medium text-gray-500 mb-2 print:text-black">
//                 Loan Type
//               </h4>
//               <p className="font-semibold text-gray-900 print:text-black">
//                 {loanData.loanType}
//               </p>
//             </div>
//             <div>
//               <h4 className="text-sm font-medium text-gray-500 mb-2 print:text-black">
//                 Amount
//               </h4>
//               <p className="font-semibold text-gray-900 print:text-black">
//                 {formatCurrency(loanData.amount)}
//               </p>
//             </div>
//             <div>
//               <h4 className="text-sm font-medium text-gray-500 mb-2 print:text-black">
//                 Due Date
//               </h4>
//               <p className="font-semibold text-gray-900 print:text-black">
//                 {loanData.dueDate}
//               </p>
//             </div>
//           </div>

//           {/* Payment Breakdown & History */}
//           <div className="border-t pt-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 print:grid-cols-1 print:gap-4">
//               <div>
//                 <h4 className="text-sm font-medium text-gray-500 mb-2 print:text-black">
//                   Principal Amount
//                 </h4>
//                 <p className="text-lg font-semibold text-gray-900 print:text-black">
//                   {formatCurrency(loanData.principalAmount)}
//                 </p>
//               </div>
//               <div>
//                 <h4 className="text-sm font-medium text-gray-500 mb-2 print:text-black">
//                   Processing Fee
//                 </h4>
//                 <p className="text-lg font-semibold text-gray-900 print:text-black">
//                   {formatCurrency(loanData.processingFee)}
//                 </p>
//               </div>
//               <div>
//                 <h4 className="text-sm font-medium text-gray-500 mb-2 print:text-black">
//                   Penalty
//                 </h4>
//                 <p className="text-lg font-semibold text-gray-900 print:text-black">
//                   {formatCurrency(loanData.penalty)}
//                 </p>
//               </div>
//               <div>
//                 <h4 className="text-sm font-medium text-gray-500 mb-2 print:text-black">
//                   Total Amount
//                 </h4>
//                 <p className="text-xl font-bold text-gray-900 print:text-black">
//                   {formatCurrency(loanData.totalAmount)}
//                 </p>
//               </div>
//             </div>

//             {/* Payment History Table */}
//             <div className="mt-10 overflow-x-auto">
//               <table className="w-full min-w-[900px] border-collapse border border-gray-200 print:min-w-full">
//                 <thead className="bg-gray-50 border-b border-gray-200">
//                   <tr>
//                     <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Loan No
//                     </th>
//                     <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Loan Issued Date
//                     </th>
//                     <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Repayment Date
//                     </th>
//                     <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Principal (₦)
//                     </th>
//                     <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Processing Fee (₦)
//                     </th>
//                     <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Penalty (₦)
//                     </th>
//                     <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Total Amount (₦)
//                     </th>
//                     <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Due Today (₦)
//                     </th>
//                     <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Fully Paid
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {paginatedPayments.map((p) => (
//                     <tr key={p.id} className="hover:bg-gray-50">
//                       <td className="p-3 whitespace-nowrap font-medium">
//                         {p.loanNo}
//                       </td>
//                       <td className="p-3 whitespace-nowrap">
//                         {p.loanIssuedDate}
//                       </td>
//                       <td className="p-3 whitespace-nowrap">
//                         {p.repaymentDate}
//                       </td>
//                       <td className="p-3 whitespace-nowrap">
//                         {formatCurrency(p.principalAmount)}
//                       </td>
//                       <td className="p-3 whitespace-nowrap">
//                         {formatCurrency(p.processingFee)}
//                       </td>
//                       <td className="p-3 whitespace-nowrap">
//                         {formatCurrency(p.penalty)}
//                       </td>
//                       <td className="p-3 whitespace-nowrap">
//                         {formatCurrency(p.totalAmount)}
//                       </td>
//                       <td className="p-3 whitespace-nowrap">
//                         {formatCurrency(p.dueToday)}
//                       </td>
//                       <td className="p-3 whitespace-nowrap">
//                         {getStatusBadge(p.status)}
//                       </td>
//                       <td className="p-3 text-center whitespace-nowrap">
//                         <input
//                           type="checkbox"
//                           checked={p.fullyPaid}
//                           onChange={() => toggleFullyPaid(p.id)}
//                           aria-label={`Mark loan ${p.loanNo} repayment as fully paid`}
//                           className="cursor-pointer"
//                         />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {/* Pagination Controls for payment history */}
//               {totalPages > 1 && (
//                 <div className="flex justify-between items-center mt-4">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//                     disabled={currentPage === 1}
//                     aria-label="Previous page"
//                   >
//                     <ChevronLeft className="w-4 h-4" />
//                   </Button>
//                   <div className="text-sm text-gray-600">
//                     Page {currentPage} of {totalPages}
//                   </div>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() =>
//                       setCurrentPage((p) => Math.min(p + 1, totalPages))
//                     }
//                     disabled={currentPage === totalPages}
//                     aria-label="Next page"
//                   >
//                     <ChevronRight className="w-4 h-4" />
//                   </Button>
//                 </div>
//               )}

//               {paginatedPayments.length === 0 && (
//                 <div className="p-8 text-center text-gray-500">
//                   No payment history found for this loan.
//                 </div>
//               )}
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
