"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

// Mock data matching the screenshots
const customers = [
  {
    id: "CST-0004",
    name: "Emily Brown",
    email: "emily.b@example.com",
    phone: "+1 (244) 894-8591",
    profession: "Doctor",
    company: "HealthCare Inc",
    branch: "West End Branch",
    avatar: "EB",
  },
  {
    id: "CST-0003",
    name: "Mike Johnson",
    email: "mike.j@example.com",
    phone: "1122334455",
    profession: "Lawyer",
    company: "Legal Experts",
    branch: "Northside Branch",
    avatar: "MJ",
  },
  {
    id: "CST-0002",
    name: "Jane Smith",
    email: "janesmith@example.com",
    phone: "+19876543321",
    profession: "Accountant",
    company: "Finance Corp",
    branch: "Downtown Branch",
    avatar: "JS",
  },
  {
    id: "CST-0001",
    name: "John Doe",
    email: "customer@gmail.com",
    phone: "9856321470",
    profession: "Engineer",
    company: "Tech Solutions",
    branch: "Main Street Branch",
    avatar: "JD",
  },
];

export function CustomerList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleExport = (type: "excel" | "pdf" | "copy") => {
    // Export functionality would be implemented here
    console.log(`Exporting as ${type}`);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-xl font-semibold">Customer</CardTitle>
          <Link href="/dashboard/business-management/customer/create">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer ">
              <Plus className="h-4 w-4 mr-2" />
              Create Customer
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
                <DropdownMenuItem>Customer</DropdownMenuItem>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Phone Number</DropdownMenuItem>
                <DropdownMenuItem>Profession</DropdownMenuItem>
                <DropdownMenuItem>Company</DropdownMenuItem>
                <DropdownMenuItem>Branch</DropdownMenuItem>
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

        {/* Customer Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                  Customer
                </TableHead>
                <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                  Email
                </TableHead>
                <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                  Phone Number
                </TableHead>
                <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                  Profession
                </TableHead>
                <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                  Company
                </TableHead>
                <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                  Branch
                </TableHead>
                <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCustomers.map((customer) => (
                <TableRow key={customer.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-muted text-xs font-medium">
                          {customer.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {customer.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-blue-600">
                    {customer.email}
                  </TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.profession}</TableCell>
                  <TableCell>{customer.company}</TableCell>
                  <TableCell>{customer.branch}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/dashboard/business-management/customer/${customer.id}`}
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
                        href={`/dashboard/business-management/customer/${customer.id}/edit`}
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
            {Math.min(startIndex + itemsPerPage, filteredCustomers.length)} of{" "}
            {filteredCustomers.length} entries
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

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
            ))}

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
  );
}
