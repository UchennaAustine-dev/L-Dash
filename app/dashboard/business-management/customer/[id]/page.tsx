"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Edit, FileText, Download, Trash2 } from "lucide-react";
import Link from "next/link";

// Mock customer data - you would fetch this based on the ID in a real application
const customerData = {
  id: "CST-0004",
  name: "Emily Brown",
  email: "emily.b@example.com",
  phone: "+1 (244) 894-8591",
  profession: "Doctor",
  company: "HealthCare Inc",
  branch: "West End Branch",
  avatar: "EB",
  // Additional details
  gender: "Female",
  dateOfBirth: "Oct 15, 1993",
  maritalStatus: "Married",
  state: "TX",
  country: "USA",
  city: "Houston",
  zipCode: "77002",
  address: "101 Pipe St, Suite 5",
  notes: "Needs special attention",
  // Documents
  documents: [
    {
      type: "Proof of Identity",
      document: "4bb034fd-4705-43f0-b5c9-11cff1be1629.png",
      status: "Approved",
      notes: "This is the demo dummy data",
    },
    {
      type: "Proof of Address",
      document: "5d41b7ca-db17-4e4c-bc8d-61776e6e7b8a.png",
      status: "Pending",
      notes: "This is the demo dummy data",
    },
  ],
};

interface CustomerDetailPageProps {
  params: {
    id: string;
  };
}

export default function CustomerDetailPage({
  params,
}: CustomerDetailPageProps) {
  const [customer] = useState(customerData);

  const handleDownload = (documentName: string) => {
    // Download functionality would be implemented here
    console.log(`Downloading ${documentName}`);
  };

  const handleDeleteDocument = (documentName: string) => {
    // Delete functionality would be implemented here
    console.log(`Deleting ${documentName}`);
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
            <BreadcrumbLink href="/dashboard/business-management/customer">
              Customer
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{customer.id} Detail</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{customer.id} Detail</h1>
        <Link
          href={`/dashboard/business-management/customer/${customer.id}/edit`}
        >
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Edit className="h-4 w-4 mr-2" />
            Edit Customer
          </Button>
        </Link>
      </div>

      {/* Customer Basic Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{customer.id}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-muted text-sm font-medium">
                    {customer.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{customer.name}</h3>
                  <p className="text-sm text-muted-foreground">{customer.id}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Branch
                </label>
                <p className="mt-1">{customer.branch}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Phone Number
                </label>
                <p className="mt-1">{customer.phone}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Marital Status
                </label>
                <p className="mt-1">{customer.maritalStatus}</p>
              </div>
            </div>

            {/* Middle Column */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Name
                </label>
                <p className="mt-1">{customer.name}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Gender
                </label>
                <p className="mt-1">{customer.gender}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Date of Birth
                </label>
                <p className="mt-1">{customer.dateOfBirth}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Email
                </label>
                <p className="mt-1 text-blue-600">{customer.email}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Profession
                </label>
                <p className="mt-1">{customer.profession}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  State
                </label>
                <p className="mt-1">{customer.state}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Detail Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Additional Detail</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Company
                </label>
                <p className="mt-1">{customer.company}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Country
                </label>
                <p className="mt-1">{customer.country}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Notes
                </label>
                <p className="mt-1">{customer.notes}</p>
              </div>
            </div>

            {/* Middle Column */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  City
                </label>
                <p className="mt-1">{customer.city}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Zip Code
                </label>
                <p className="mt-1">{customer.zipCode}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Address
                </label>
                <p className="mt-1">{customer.address}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Document</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    Type
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    Document
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    Notes
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground uppercase text-xs">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customer.documents.map((doc, index) => (
                  <TableRow key={index} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{doc.type}</TableCell>
                    <TableCell className="text-blue-600 hover:text-blue-800">
                      {doc.document}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          doc.status === "Approved" ? "default" : "secondary"
                        }
                        className={
                          doc.status === "Approved"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        }
                      >
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {doc.notes}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          onClick={() => handleDownload(doc.document)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteDocument(doc.document)}
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
        </CardContent>
      </Card>
    </div>
  );
}
