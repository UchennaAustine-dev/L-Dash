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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";
import Link from "next/link";
import { mockLoans, creditOfficers } from "@/lib/mock-loan";
import { formatNaira } from "@/utils/currency";
import { exportToExcel, exportToPDF, copyToClipboard } from "@/utils/export";
import { toast } from "sonner";

export default function LoanListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOfficer, setSelectedOfficer] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredLoans = mockLoans.filter((loan) => {
    const matchesSearch =
      loan.loanNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.loanType.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.createdBy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.branch.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesOfficer =
      selectedOfficer === "all" || loan.createdBy.id === selectedOfficer;
    const matchesStatus =
      statusFilter === "all" || loan.status === statusFilter;

    return matchesSearch && matchesOfficer && matchesStatus;
  });

  const totalPages = Math.ceil(filteredLoans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLoans = filteredLoans.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleExport = (type: "excel" | "pdf" | "copy") => {
    try {
      switch (type) {
        case "excel":
          exportToExcel(filteredLoans, "loans-report");
          toast.success("Loans exported to Excel successfully!");
          break;
        case "pdf":
          exportToPDF(filteredLoans, "loans-report");
          toast.success("Loans exported to PDF successfully!");
          break;
        case "copy":
          copyToClipboard(filteredLoans);
          toast.success("Loans data copied to clipboard!");
          break;
      }
    } catch (error) {
      toast.error(`Failed to export as ${type}`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            Processing
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Approved
          </Badge>
        );
      case "under_repayment":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            Under Repayment
          </Badge>
        );
      case "overdue":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            Overdue
          </Badge>
        );
      case "fully_paid":
        return (
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
            Fully Paid
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
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
            <CardTitle className="text-xl font-semibold">
              Loan Management
            </CardTitle>
            <Link href="/dashboard/business-management/loan/create">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Create Loan
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by loan number, customer, officer..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select
                value={selectedOfficer}
                onValueChange={setSelectedOfficer}
              >
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="All Officers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Officers</SelectItem>
                  {creditOfficers.map((officer) => (
                    <SelectItem key={officer.id} value={officer.id}>
                      {officer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="under_repayment">
                    Under Repayment
                  </SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="fully_paid">Fully Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Export Controls */}
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
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    Loan Number
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    Customer
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    Loan Type
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    Principal Amount
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    Due Today
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    Credit Officer
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedLoans.map((loan) => (
                  <TableRow key={loan.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {loan.loanNumber}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{loan.customer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {loan.customer.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{loan.loanType.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {loan.loanType.category.replace("_", " ")}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatNaira(loan.principalAmount)}
                    </TableCell>
                    <TableCell className="font-medium text-orange-600">
                      {formatNaira(loan.dueToday)}
                    </TableCell>
                    <TableCell>{getStatusBadge(loan.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">
                            {loan.createdBy.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {loan.createdBy.employeeId}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/dashboard/business-management/loan/${loan.id}`}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
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
                            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() =>
                            toast.error("Delete functionality not implemented")
                          }
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
