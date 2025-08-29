// "use client";

// import LoanRepaymentSystem from "@/components/loan-repayment-system";

// export default function RepaymentPage() {
//   return <LoanRepaymentSystem />;
// }
"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Download, Copy, CreditCard } from "lucide-react";
import { CreateRepaymentModal } from "@/components/repayment/CreateRepaymentModal";
import { EditRepaymentModal } from "@/components/repayment/EditRepaymentModal";
import type { Repayment } from "@/types/repayment";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { PaymentModal } from "@/components/repayment/PaymentModal";

const LoanRepaymentSystem: React.FC = () => {
  const [repayments, setRepayments] = useState<Repayment[]>([
    {
      id: 1,
      loanNumber: "#LON-0001",
      loanIssuedDate: "2024-06-20",
      loanDeadline: "2024-07-20",
      repaymentDate: "2024-12-29",
      principalAmount: 50000,
      processingFee: 2500,
      amountLeftToPay: 45000,
      totalAmount: 52500,
      penaltyFee: 0,
      dueToday: 1750,
      status: "under repayment",
      loanType: "short-term",
      amountPaidAlready: 7500,
    },
    {
      id: 2,
      loanNumber: "#LON-0002",
      loanIssuedDate: "2024-05-15",
      loanDeadline: "2024-08-15",
      repaymentDate: "2024-12-29",
      principalAmount: 100000,
      processingFee: 5000,
      amountLeftToPay: 0,
      totalAmount: 105000,
      penaltyFee: 0,
      dueToday: 0,
      status: "fully paid",
      loanType: "medium-term",
      amountPaidAlready: 105000,
    },
    {
      id: 3,
      loanNumber: "#LON-0003",
      loanIssuedDate: "2024-07-01",
      loanDeadline: "2024-07-31",
      repaymentDate: "2024-12-29",
      principalAmount: 25000,
      processingFee: 1250,
      amountLeftToPay: 28750,
      totalAmount: 29250,
      penaltyFee: 2500,
      dueToday: 2875,
      status: "overdue",
      loanType: "short-term",
      amountPaidAlready: 0,
    },
  ]);

  const [editingRepayment, setEditingRepayment] = useState<Repayment | null>(
    null
  );
  const [paymentRepayment, setPaymentRepayment] = useState<Repayment | null>(
    null
  );
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] =
    useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const updateRepaymentStatus = () => {
      const today = new Date();
      const updatedRepayments = repayments.map((repayment) => {
        const deadline = new Date(repayment.loanDeadline);
        const daysPastDeadline = Math.floor(
          (today.getTime() - deadline.getTime()) / (1000 * 60 * 60 * 24)
        );

        let newStatus = repayment.status;
        let newPenaltyFee = repayment.penaltyFee;

        if (repayment.amountLeftToPay === 0) {
          newStatus = "fully paid";
        } else if (daysPastDeadline > 1) {
          newStatus = "overdue";
          // Add penalty fee if overdue by more than 1 day
          if (repayment.penaltyFee === 0) {
            newPenaltyFee = repayment.principalAmount * 0.1; // 10% penalty
          }
        } else if (repayment.amountLeftToPay < repayment.totalAmount) {
          newStatus = "under repayment";
        }

        return {
          ...repayment,
          status: newStatus,
          penaltyFee: newPenaltyFee,
          totalAmount:
            repayment.principalAmount + repayment.processingFee + newPenaltyFee,
        };
      });

      setRepayments(updatedRepayments);
    };

    updateRepaymentStatus();
  }, []);

  const handleCreateRepayment = (
    repaymentData: Omit<Repayment, "id">
  ): void => {
    const newRepayment: Repayment = {
      ...repaymentData,
      id: Math.max(...repayments.map((r) => r.id), 0) + 1,
    };
    setRepayments([...repayments, newRepayment]);
  };

  const handleEdit = (repayment: Repayment): void => {
    setEditingRepayment(repayment);
    setIsEditDialogOpen(true);
  };

  const handleUpdateRepayment = (updatedRepayment: Repayment): void => {
    const updatedRepayments = repayments.map((rep) =>
      rep.id === updatedRepayment.id ? updatedRepayment : rep
    );
    setRepayments(updatedRepayments);
    setEditingRepayment(null);
  };

  const handleDelete = (id: number): void => {
    setRepayments(repayments.filter((rep) => rep.id !== id));
  };

  const handleMakePayment = (repaymentId: number, amount: number): void => {
    const updatedRepayments = repayments.map((repayment) => {
      if (repayment.id === repaymentId) {
        const newAmountPaid = repayment.amountPaidAlready + amount;
        const newAmountLeftToPay = Math.max(
          0,
          repayment.totalAmount - newAmountPaid
        );
        const newDueToday = Math.max(0, repayment.dueToday - amount);

        return {
          ...repayment,
          amountPaidAlready: newAmountPaid,
          amountLeftToPay: newAmountLeftToPay,
          dueToday: newDueToday,
          status:
            newAmountLeftToPay === 0
              ? ("fully paid" as const)
              : ("under repayment" as const),
        };
      }
      return repayment;
    });

    setRepayments(updatedRepayments);
  };

  const handlePayment = (repayment: Repayment): void => {
    setPaymentRepayment(repayment);
    setIsPaymentDialogOpen(true);
  };

  const filteredRepayments = repayments.filter(
    (repayment) =>
      repayment.loanNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repayment.loanIssuedDate.includes(searchTerm) ||
      repayment.principalAmount.toString().includes(searchTerm) ||
      repayment.totalAmount.toString().includes(searchTerm) ||
      repayment.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount: number): string => {
    return `₦${amount.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      processing: {
        color: "bg-yellow-100 text-yellow-800",
        text: "Processing",
      },
      approved: { color: "bg-blue-100 text-blue-800", text: "Approved" },
      "under repayment": {
        color: "bg-orange-100 text-orange-800",
        text: "Under Repayment",
      },
      overdue: { color: "bg-red-100 text-red-800", text: "Overdue" },
      "fully paid": {
        color: "bg-green-100 text-green-800",
        text: "Fully Paid",
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] ||
      statusConfig.processing;

    return (
      <Badge className={`${config.color} hover:${config.color}`}>
        {config.text}
      </Badge>
    );
  };

  const exportToExcel = () => {
    const exportData = filteredRepayments.map((repayment) => ({
      "Loan Number": repayment.loanNumber,
      "Loan Issued Date": formatDate(repayment.loanIssuedDate),
      "Loan Deadline": formatDate(repayment.loanDeadline),
      "Repayment Date": formatDate(repayment.repaymentDate),
      "Principal Amount": repayment.principalAmount,
      "Processing Fee": repayment.processingFee,
      "Amount Left to Pay": repayment.amountLeftToPay,
      "Total Amount": repayment.totalAmount,
      "Penalty Fee": repayment.penaltyFee,
      "Due Today": repayment.dueToday,
      Status: repayment.status,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Loan Repayments");
    XLSX.writeFile(wb, "loan_repayments.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Loan Repayment Report", 14, 22);

    const tableData = filteredRepayments.map((repayment) => [
      repayment.loanNumber,
      formatDate(repayment.loanIssuedDate),
      formatDate(repayment.loanDeadline),
      formatCurrency(repayment.principalAmount),
      formatCurrency(repayment.processingFee),
      formatCurrency(repayment.amountLeftToPay),
      formatCurrency(repayment.totalAmount),
      formatCurrency(repayment.dueToday),
      repayment.status,
    ]);
    (doc as any).autoTable({
      head: [
        [
          "Loan #",
          "Issued",
          "Deadline",
          "Principal",
          "Processing",
          "Left to Pay",
          "Total",
          "Due Today",
          "Status",
        ],
      ],
      body: tableData,
      startY: 30,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [34, 197, 94] },
    });

    doc.save("loan_repayments.pdf");
  };

  const copyToClipboard = () => {
    const textData = filteredRepayments
      .map(
        (repayment) =>
          `${repayment.loanNumber}\t${formatDate(
            repayment.loanIssuedDate
          )}\t${formatDate(repayment.loanDeadline)}\t${formatCurrency(
            repayment.principalAmount
          )}\t${formatCurrency(repayment.processingFee)}\t${formatCurrency(
            repayment.amountLeftToPay
          )}\t${formatCurrency(repayment.totalAmount)}\t${formatCurrency(
            repayment.dueToday
          )}\t${repayment.status}`
      )
      .join("\n");

    navigator.clipboard.writeText(
      `Loan Number\tIssued Date\tDeadline\tPrincipal\tProcessing Fee\tAmount Left\tTotal Amount\tDue Today\tStatus\n${textData}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Loan Management
            </h1>
            <span className="text-sm text-gray-500">
              Dashboard &gt; Loan Management
            </span>
          </div>

          <CreateRepaymentModal onCreateRepayment={handleCreateRepayment} />
        </div>

        {/* Actions Bar */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-emerald-600 text-white hover:bg-emerald-700"
                  onClick={exportToExcel}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Excel
                </Button>
                <Button variant="outline" size="sm" onClick={exportToPDF}>
                  <Download className="w-4 h-4 mr-1" />
                  PDF
                </Button>
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
                <Select defaultValue="visibility">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visibility">
                      Column visibility
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Label htmlFor="search">Search:</Label>
                <Input
                  id="search"
                  type="text"
                  className="w-64"
                  placeholder="Search loans..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchTerm(e.target.value)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loans Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      LOAN NUMBER
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      ISSUED DATE
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      DEADLINE
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      REPAYMENT DATE
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      PRINCIPAL
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      PROCESSING FEE
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      AMOUNT LEFT
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      TOTAL AMOUNT
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      PENALTY FEE
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      DUE TODAY
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      STATUS
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRepayments.map((repayment) => (
                    <tr key={repayment.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge
                          variant="secondary"
                          className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                        >
                          {repayment.loanNumber}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(repayment.loanIssuedDate)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(repayment.loanDeadline)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(repayment.repaymentDate)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(repayment.principalAmount)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(repayment.processingFee)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {formatCurrency(repayment.amountLeftToPay)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {formatCurrency(repayment.totalAmount)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {repayment.penaltyFee > 0 ? (
                          <span className="text-red-600 font-semibold">
                            {formatCurrency(repayment.penaltyFee)}
                          </span>
                        ) : (
                          <span className="text-gray-900">
                            {formatCurrency(repayment.penaltyFee)}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {repayment.dueToday > 0 ? (
                          <span className="text-orange-600 font-semibold">
                            {formatCurrency(repayment.dueToday)}
                          </span>
                        ) : (
                          <span className="text-gray-900">
                            {formatCurrency(repayment.dueToday)}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {getStatusBadge(repayment.status)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <div className="flex items-center space-x-2">
                          {repayment.status !== "fully paid" &&
                            repayment.dueToday > 0 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePayment(repayment)}
                                className="h-8 w-8 p-0"
                                title="Make Payment"
                              >
                                <CreditCard className="w-4 h-4 text-emerald-600" />
                              </Button>
                            )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(repayment)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="w-4 h-4 text-green-600" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(repayment.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
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
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>
            Showing 1 to {filteredRepayments.length} of{" "}
            {filteredRepayments.length} entries
          </span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              1
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>

        {/* Edit Dialog */}
        <EditRepaymentModal
          repayment={editingRepayment}
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setEditingRepayment(null);
          }}
          onUpdateRepayment={handleUpdateRepayment}
        />

        {/* Payment Dialog */}
        <PaymentModal
          repayment={paymentRepayment}
          isOpen={isPaymentDialogOpen}
          onClose={() => {
            setIsPaymentDialogOpen(false);
            setPaymentRepayment(null);
          }}
          onMakePayment={handleMakePayment}
        />
      </div>
    </div>
  );
};

export default LoanRepaymentSystem;
