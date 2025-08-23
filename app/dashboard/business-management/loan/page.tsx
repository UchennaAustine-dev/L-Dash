"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Plus,
  Search,
  FileSpreadsheet,
  FileText,
  Copy,
  Settings2,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

// Mock loan data
const loans = [
  {
    id: "LON-0008",
    branch: "Downtown Branch",
    loanType: "Personal Loan",
    customer: "Jane Smith",
    startDate: "Aug 23, 2025",
    endDate: "Aug 29, 2025",
    amount: "$10000",
    status: "Draft",
    createdBy: "Owner",
  },
  {
    id: "LON-0007",
    branch: "Main Street Branch",
    loanType: "Personal Loan",
    customer: "John Doe",
    startDate: "Aug 25, 2025",
    endDate: "Dec 7, 2025",
    amount: "$10000",
    status: "Draft",
    createdBy: "Owner",
  },
  {
    id: "LON-0006",
    branch: "Northside Branch",
    loanType: "Mortgage Loan",
    customer: "John Doe",
    startDate: "Aug 1, 2025",
    endDate: "Dec 1, 2025",
    amount: "$5000",
    status: "Draft",
    createdBy: "Owner",
  },
  {
    id: "LON-0005",
    branch: "Northside Branch",
    loanType: "Mortgage Loan",
    customer: "Jane Smith",
    startDate: "Jul 1, 2025",
    endDate: "Aug 1, 2025",
    amount: "$50000",
    status: "Draft",
    createdBy: "Owner",
  },
  {
    id: "LON-0004",
    branch: "Main Street Branch",
    loanType: "Personal Loan",
    customer: "John Doe",
    startDate: "Jul 20, 2024",
    endDate: "Nov 18, 2026",
    amount: "$10000",
    status: "Draft",
    createdBy: "-",
  },
  {
    id: "LON-0003",
    branch: "Northside Branch",
    loanType: "Car Loan",
    customer: "Emily Brown",
    startDate: "Aug 1, 2024",
    endDate: "Dec 18, 2024",
    amount: "$4500",
    status: "Under Review",
    createdBy: "-",
  },
  {
    id: "LON-0002",
    branch: "Downtown Branch",
    loanType: "Mortgage Loan",
    customer: "Jane Smith",
    startDate: "Jul 20, 2024",
    endDate: "Jul 18, 2025",
    amount: "$25000",
    status: "Approved",
    createdBy: "-",
  },
];

export default function LoanListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const filteredLoans = loans.filter(
    (loan) =>
      loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.loanType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.branch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLoans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLoans = filteredLoans.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleExport = (type: "excel" | "pdf" | "copy") => {
    console.log(`Exporting as ${type}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Draft":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            {status}
          </Badge>
        );
      case "Under Review":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            {status}
          </Badge>
        );
      case "Approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            {status}
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

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
            <BreadcrumbPage>Loans</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-xl font-semibold">Loan</CardTitle>
            <Link href="/dashboard/business-management/loan/create">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Loan
              </Button>
            </Link>
          </div>
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
                  <DropdownMenuItem>ID</DropdownMenuItem>
                  <DropdownMenuItem>Branch</DropdownMenuItem>
                  <DropdownMenuItem>Loan Type</DropdownMenuItem>
                  <DropdownMenuItem>Customer</DropdownMenuItem>
                  <DropdownMenuItem>Start Date</DropdownMenuItem>
                  <DropdownMenuItem>End Date</DropdownMenuItem>
                  <DropdownMenuItem>Amount</DropdownMenuItem>
                  <DropdownMenuItem>Status</DropdownMenuItem>
                  <DropdownMenuItem>Created By</DropdownMenuItem>
                  <DropdownMenuItem>Action</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
          </div>

          {/* Loan Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    ID
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    Branch
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    Loan Type
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    Customer
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    Start Date
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    End Date
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    Amount
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    Created By
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedLoans.map((loan) => (
                  <TableRow key={loan.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{loan.id}</TableCell>
                    <TableCell>{loan.branch}</TableCell>
                    <TableCell>{loan.loanType}</TableCell>
                    <TableCell>{loan.customer}</TableCell>
                    <TableCell>{loan.startDate}</TableCell>
                    <TableCell>{loan.endDate}</TableCell>
                    <TableCell className="font-medium">{loan.amount}</TableCell>
                    <TableCell>{getStatusBadge(loan.status)}</TableCell>
                    <TableCell>{loan.createdBy}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/dashboard/business-management/loan/${loan.id}`}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 cursor-pointer"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link
                          href={`/dashboard/business-management/loan/${loan.id}/edit`}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 cursor-pointer"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredLoans.length)} of{" "}
              {filteredLoans.length} entries
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page ? "bg-slate-900 text-white" : ""
                    }
                  >
                    {page}
                  </Button>
                )
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
