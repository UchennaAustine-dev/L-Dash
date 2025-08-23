"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Edit,
  FileSpreadsheet,
  FileText,
  Copy,
  Settings2,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

// Mock loan data
const loanData = {
  id: "LON-0008",
  loanId: "LON-0008",
  startDate: "Aug 24, 2025",
  purposeOfLoan: "personal",
  loanType: "Personal Loan",
  endDate: "Aug 29, 2025",
  customer: "Jane Smith",
  amount: "$10000",
  status: "Draft",
  repaymentSchedules: [
    {
      paymentDate: "Aug 24, 2025",
      principalAmount: "$1825.48",
      interest: "$100",
      penalty: "0",
      totalAmount: "$1725.48",
      status: "Pending",
    },
    {
      paymentDate: "Aug 25, 2025",
      principalAmount: "$1641.74",
      interest: "$93.75",
      penalty: "0",
      totalAmount: "$1725.48",
      status: "Pending",
    },
    {
      paymentDate: "Aug 26, 2025",
      principalAmount: "$1636.19",
      interest: "$57.33",
      penalty: "0",
      totalAmount: "$1725.48",
      status: "Pending",
    },
    {
      paymentDate: "Aug 27, 2025",
      principalAmount: "$1674.74",
      interest: "$50.75",
      penalty: "0",
      totalAmount: "$1725.48",
      status: "Pending",
    },
    {
      paymentDate: "Aug 28, 2025",
      principalAmount: "$1691.45",
      interest: "$34",
      penalty: "0",
      totalAmount: "$1725.48",
      status: "Pending",
    },
    {
      paymentDate: "Aug 29, 2025",
      principalAmount: "$1706.4",
      interest: "$17.06",
      penalty: "0",
      totalAmount: "$1725.48",
      status: "Pending",
    },
  ],
  repayments: [],
};

interface LoanDetailPageProps {
  params: {
    id: string;
  };
}

export default function LoanDetailPage({ params }: LoanDetailPageProps) {
  const [loan] = useState(loanData);
  const [searchTerm, setSearchTerm] = useState("");

  const handleExport = (type: "excel" | "pdf" | "copy") => {
    console.log(`Exporting as ${type}`);
  };

  const filteredSchedules = loan.repaymentSchedules.filter((schedule) =>
    schedule.paymentDate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/business-management/loan">
              Loan
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{loan.id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Loans</h1>
      </div>

      {/* Loan Basic Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{loan.id}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Loan ID
                </label>
                <p className="mt-1 font-medium">{loan.loanId}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Start Date
                </label>
                <p className="mt-1">{loan.startDate}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Purpose Of Loan
                </label>
                <p className="mt-1">{loan.purposeOfLoan}</p>
              </div>
            </div>

            {/* Middle Column */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Loan Type
                </label>
                <p className="mt-1">{loan.loanType}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  End Date
                </label>
                <p className="mt-1">{loan.endDate}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Status
                </label>
                <div className="mt-1">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    {loan.status}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Customer
                </label>
                <p className="mt-1">{loan.customer}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Amount
                </label>
                <p className="mt-1 font-semibold text-lg">{loan.amount}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Repayment Schedules Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Repayment Schedules</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Export and Search Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-emerald-600 text-white hover:bg-emerald-700"
                onClick={() => handleExport("excel")}
              >
                <FileSpreadsheet className="h-4 w-4 mr-1" />
                Excel
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-emerald-600 text-white hover:bg-emerald-700"
                onClick={() => handleExport("pdf")}
              >
                <FileText className="h-4 w-4 mr-1" />
                PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-emerald-600 text-white hover:bg-emerald-700"
                onClick={() => handleExport("copy")}
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    <Settings2 className="h-4 w-4 mr-1" />
                    Column visibility
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Payment Date</DropdownMenuItem>
                  <DropdownMenuItem>Principal Amount</DropdownMenuItem>
                  <DropdownMenuItem>Interest</DropdownMenuItem>
                  <DropdownMenuItem>Penalty</DropdownMenuItem>
                  <DropdownMenuItem>Total Amount</DropdownMenuItem>
                  <DropdownMenuItem>Action</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10 w-full sm:w-64" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    Payment Date
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    Principal Amount
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    Interest
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    Penalty
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    Total Amount
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground py-8"
                  >
                    No data available in table
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="text-sm text-muted-foreground mt-4">
            Showing 0 to 0 of 0 entries
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
