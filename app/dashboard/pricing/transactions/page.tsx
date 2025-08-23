"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Download } from "lucide-react";

interface Transaction {
  id: string;
  user: string;
  date: string;
  subscription: string;
  amount: number;
  paymentType: string;
  paymentStatus: string;
}

export default function TransactionListPage() {
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      user: "Owner",
      date: "Aug 1, 2025",
      subscription: "ADVANCE",
      amount: 3000,
      paymentType: "Stripe",
      paymentStatus: "succeeded",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.subscription
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.paymentType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownloadReceipt = (transactionId: string) => {
    // Handle receipt download
    console.log("Downloading receipt for transaction:", transactionId);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Transaction</h1>
          <nav className="text-sm text-gray-500 mt-1">
            Dashboard &gt; Transaction
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 md:p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <h2 className="text-lg font-medium">
              Pricing Package Transaction List
            </h2>
          </div>

          {/* Export and Search */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Excel
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-emerald-600 text-white hover:bg-emerald-700"
              >
                PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Copy
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    Column visibility
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Show all columns</DropdownMenuItem>
                  <DropdownMenuItem>Hide columns</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="search" className="text-sm font-medium">
                Search:
              </Label>
              <Input
                id="search"
                placeholder="Search..."
                className="w-48"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>USER</TableHead>
                  <TableHead>DATE</TableHead>
                  <TableHead>SUBSCRIPTION</TableHead>
                  <TableHead>AMOUNT</TableHead>
                  <TableHead>PAYMENT TYPE</TableHead>
                  <TableHead>PAYMENT STATUS</TableHead>
                  <TableHead>RECEIPT</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.user}
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.subscription}</TableCell>
                    <TableCell className="text-blue-600">
                      ${transaction.amount}
                    </TableCell>
                    <TableCell>{transaction.paymentType}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        {transaction.paymentStatus}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadReceipt(transaction.id)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            Showing 1 to {filteredTransactions.length} of{" "}
            {filteredTransactions.length} entry
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                «
              </Button>
              <Button variant="outline" size="sm" disabled>
                ‹
              </Button>
              <Button size="sm" className="bg-gray-900 text-white">
                1
              </Button>
              <Button variant="outline" size="sm" disabled>
                ›
              </Button>
              <Button variant="outline" size="sm" disabled>
                »
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
