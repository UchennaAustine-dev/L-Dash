"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface LoanDetails {
  loanNo: string;
  loanType: string;
  amount: number;
  dueDate: string;
  principalAmount: number;
  interest: number;
  penalty: number;
  totalAmount: number;
  status: string;
  from: {
    company: string;
    phone: string;
    email: string;
  };
  to: {
    name: string;
    phone: string;
  };
}

const mockLoanData: Record<string, LoanDetails> = {
  "LON-0002": {
    loanNo: "#LON-0002",
    loanType: "Mortgage Loan",
    amount: 25000,
    dueDate: "Jul 20, 2024",
    principalAmount: 1980.37,
    interest: 229.17,
    penalty: 8793.97,
    totalAmount: 11003.51,
    status: "Paid",
    from: {
      company: "Smartweb Infotech",
      phone: "07878787878",
      email: "smartweb@gmail.com",
    },
    to: {
      name: "Jane Smith",
      phone: "+1987654321",
    },
  },
  "LON-0003": {
    loanNo: "#LON-0003",
    loanType: "Personal Loan",
    amount: 15000,
    dueDate: "Oct 1, 2024",
    principalAmount: 900,
    interest: 31.5,
    penalty: 0,
    totalAmount: 931.5,
    status: "Pending",
    from: {
      company: "Smartweb Infotech",
      phone: "07878787878",
      email: "smartweb@gmail.com",
    },
    to: {
      name: "John Doe",
      phone: "+1234567890",
    },
  },
  "LON-0004": {
    loanNo: "#LON-0004",
    loanType: "Business Loan",
    amount: 50000,
    dueDate: "Sep 20, 2024",
    principalAmount: 357.14,
    interest: 1200,
    penalty: 0,
    totalAmount: 1557.14,
    status: "Paid",
    from: {
      company: "Smartweb Infotech",
      phone: "07878787878",
      email: "smartweb@gmail.com",
    },
    to: {
      name: "Sarah Johnson",
      phone: "+1555666777",
    },
  },
};

export default function SchedulePaymentPage() {
  const params = useParams();
  const loanId = params.loanId as string;
  const loanData = mockLoanData[loanId] || mockLoanData["LON-0002"];

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/business-management/loan-payment/repayment-schedules">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Schedule Payment
            </h1>
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
              <Link href="/dashboard" className="hover:text-gray-700">
                Dashboard
              </Link>
              <span>›</span>
              <Link
                href="/dashboard/business-management/loan-payment/repayment-schedules"
                className="hover:text-gray-700"
              >
                Repayment schedule
              </Link>
              <span>›</span>
              <span className="text-gray-900">{loanData.loanNo}</span>
            </nav>
          </div>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Printer className="w-4 h-4 mr-2" />
          Print
        </Button>
      </div>

      {/* Payment Schedule Card */}
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-8">
          {/* Header with Logo and Status */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <div className="text-white font-bold text-lg">FL</div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-green-600">
                  FINANCELEND
                </h2>
                <p className="text-sm text-gray-500">
                  LOAN MANAGEMENT SOLUTION
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                Due Date: {loanData.dueDate}
              </p>
              <Badge
                className={`mt-1 ${
                  loanData.status === "Paid"
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : loanData.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    : "bg-red-100 text-red-800 hover:bg-red-100"
                }`}
              >
                {loanData.status}
              </Badge>
            </div>
          </div>

          {/* Loan Number */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900">
              {loanData.loanNo}
            </h3>
          </div>

          {/* From and To Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-3">From:</h4>
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">
                  {loanData.from.company}
                </p>
                <p className="text-gray-600">{loanData.from.phone}</p>
                <p className="text-gray-600">{loanData.from.email}</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-3">To:</h4>
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">
                  {loanData.to.name}
                </p>
                <p className="text-gray-600">{loanData.to.phone}</p>
              </div>
            </div>
          </div>

          {/* Loan Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Loan</h4>
              <p className="font-semibold text-gray-900">{loanData.loanNo}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Loan Type
              </h4>
              <p className="font-semibold text-gray-900">{loanData.loanType}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Amount</h4>
              <p className="font-semibold text-gray-900">
                {formatCurrency(loanData.amount)}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Due Date
              </h4>
              <p className="font-semibold text-gray-900">{loanData.dueDate}</p>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div className="border-t pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Principal amount
                </h4>
                <p className="text-lg font-semibold text-gray-900">
                  {formatCurrency(loanData.principalAmount)}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Interest
                </h4>
                <p className="text-lg font-semibold text-gray-900">
                  {formatCurrency(loanData.interest)}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Penalty
                </h4>
                <p className="text-lg font-semibold text-gray-900">
                  {formatCurrency(loanData.penalty)}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Total Amount
                </h4>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(loanData.totalAmount)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
