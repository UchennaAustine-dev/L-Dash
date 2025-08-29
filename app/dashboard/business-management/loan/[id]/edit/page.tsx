// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Plus, Trash2 } from "lucide-react";
// import Link from "next/link";

// interface DocumentUpload {
//   id: string;
//   type: string;
//   file: File | null;
//   fileName?: string;
//   status: string;
//   description: string;
// }

// interface LoanEditPageProps {
//   params: {
//     id: string;
//   };
// }

// export default function LoanEditPage({ params }: LoanEditPageProps) {
//   // Pre-populate with existing loan data
//   const [formData, setFormData] = useState({
//     branch: "downtown",
//     loanType: "personal",
//     customer: "jane-smith",
//     loanStartDate: "2025-08-23",
//     loanDueDate: "2025-08-29",
//     amount: "10000",
//     loanTerms: "7",
//     loanTermPeriod: "Day",
//     purposeOfLoan: "Personal expenses",
//     notes: "Needs special attention",
//   });

//   const [documents, setDocuments] = useState<DocumentUpload[]>([
//     {
//       id: "1",
//       type: "identity",
//       file: null,
//       fileName: "existing-document.pdf",
//       status: "Pending",
//       description: "This is demo data",
//     },
//   ]);

//   const handleInputChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const addDocument = () => {
//     const newDoc: DocumentUpload = {
//       id: Date.now().toString(),
//       type: "",
//       file: null,
//       status: "Pending",
//       description: "",
//     };
//     setDocuments((prev) => [...prev, newDoc]);
//   };

//   const removeDocument = (id: string) => {
//     if (documents.length > 1) {
//       setDocuments((prev) => prev.filter((doc) => doc.id !== id));
//     }
//   };

//   const updateDocument = (
//     id: string,
//     field: keyof DocumentUpload,
//     value: any
//   ) => {
//     setDocuments((prev) =>
//       prev.map((doc) => (doc.id === id ? { ...doc, [field]: value } : doc))
//     );
//   };

//   const handleFileChange = (
//     id: string,
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0] || null;
//     updateDocument(id, "file", file);
//     if (file) {
//       updateDocument(id, "fileName", file.name);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Updated Form Data:", formData);
//     console.log("Updated Documents:", documents);
//     // Handle form submission
//   };

//   return (
//     <div className="space-y-6">
//       {/* Breadcrumb */}
//       <Breadcrumb>
//         <BreadcrumbList>
//           <BreadcrumbItem>
//             <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
//           </BreadcrumbItem>
//           <BreadcrumbSeparator />
//           <BreadcrumbItem>
//             <BreadcrumbLink href="/dashboard/business-management/loan">
//               Loan
//             </BreadcrumbLink>
//           </BreadcrumbItem>
//           <BreadcrumbSeparator />
//           <BreadcrumbItem>
//             <BreadcrumbPage>Edit</BreadcrumbPage>
//           </BreadcrumbItem>
//         </BreadcrumbList>
//       </Breadcrumb>

//       {/* Page Header */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Loan Edit</h1>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Loan Basic Info Card */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-lg">#{params.id}</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {/* Left Column */}
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="branch">Branch</Label>
//                   <Select
//                     value={formData.branch}
//                     onValueChange={(value) =>
//                       handleInputChange("branch", value)
//                     }
//                   >
//                     <SelectTrigger className="mt-1">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="downtown">Downtown Branch</SelectItem>
//                       <SelectItem value="mainstreet">
//                         Main Street Branch
//                       </SelectItem>
//                       <SelectItem value="northside">
//                         Northside Branch
//                       </SelectItem>
//                       <SelectItem value="westend">West End Branch</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <Label htmlFor="loanStartDate">Loan Start Date</Label>
//                   <Input
//                     id="loanStartDate"
//                     type="date"
//                     value={formData.loanStartDate}
//                     onChange={(e) =>
//                       handleInputChange("loanStartDate", e.target.value)
//                     }
//                     className="mt-1"
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="loanDueDate">Loan Due Date</Label>
//                   <Input
//                     id="loanDueDate"
//                     type="date"
//                     value={formData.loanDueDate}
//                     onChange={(e) =>
//                       handleInputChange("loanDueDate", e.target.value)
//                     }
//                     className="mt-1"
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="notes">Notes</Label>
//                   <Textarea
//                     id="notes"
//                     value={formData.notes}
//                     onChange={(e) => handleInputChange("notes", e.target.value)}
//                     className="mt-1 min-h-[80px]"
//                     placeholder="Enter notes"
//                   />
//                 </div>
//               </div>

//               {/* Middle Column */}
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="loanType">Loan Type</Label>
//                   <Select
//                     value={formData.loanType}
//                     onValueChange={(value) =>
//                       handleInputChange("loanType", value)
//                     }
//                   >
//                     <SelectTrigger className="mt-1">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="personal">Personal Loan</SelectItem>
//                       <SelectItem value="mortgage">Mortgage Loan</SelectItem>
//                       <SelectItem value="car">Car Loan</SelectItem>
//                       <SelectItem value="business">Business Loan</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <Label htmlFor="loanTerms">Loan Terms</Label>
//                   <Input
//                     id="loanTerms"
//                     type="number"
//                     value={formData.loanTerms}
//                     onChange={(e) =>
//                       handleInputChange("loanTerms", e.target.value)
//                     }
//                     className="mt-1"
//                     placeholder="Enter loan terms"
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="amount">Amount</Label>
//                   <Input
//                     id="amount"
//                     type="number"
//                     value={formData.amount}
//                     onChange={(e) =>
//                       handleInputChange("amount", e.target.value)
//                     }
//                     className="mt-1"
//                     placeholder="Enter amount"
//                   />
//                 </div>
//               </div>

//               {/* Right Column */}
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="customer">Customer</Label>
//                   <Select
//                     value={formData.customer}
//                     onValueChange={(value) =>
//                       handleInputChange("customer", value)
//                     }
//                   >
//                     <SelectTrigger className="mt-1">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="jane-smith">Jane Smith</SelectItem>
//                       <SelectItem value="john-doe">John Doe</SelectItem>
//                       <SelectItem value="emily-brown">Emily Brown</SelectItem>
//                       <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <Label htmlFor="loanTermPeriod">Loan Term Period</Label>
//                   <Select
//                     value={formData.loanTermPeriod}
//                     onValueChange={(value) =>
//                       handleInputChange("loanTermPeriod", value)
//                     }
//                   >
//                     <SelectTrigger className="mt-1">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="Day">Day</SelectItem>
//                       <SelectItem value="Week">Week</SelectItem>
//                       <SelectItem value="Month">Month</SelectItem>
//                       <SelectItem value="Year">Year</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div>
//                   <Label htmlFor="purposeOfLoan">Purpose Of Loan</Label>
//                   <Textarea
//                     id="purposeOfLoan"
//                     value={formData.purposeOfLoan}
//                     onChange={(e) =>
//                       handleInputChange("purposeOfLoan", e.target.value)
//                     }
//                     className="mt-1 min-h-[80px]"
//                     placeholder="Enter purpose of loan"
//                   />
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Document Upload Card */}
//         <Card>
//           <CardHeader>
//             <div className="flex items-center justify-between">
//               <CardTitle className="text-lg">Document Detail</CardTitle>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {documents.map((document, index) => (
//                 <div
//                   key={document.id}
//                   className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg"
//                 >
//                   <div>
//                     <Label>Document Type</Label>
//                     <Select
//                       value={document.type}
//                       onValueChange={(value) =>
//                         updateDocument(document.id, "type", value)
//                       }
//                     >
//                       <SelectTrigger className="mt-1">
//                         <SelectValue placeholder="Select Document Type" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="identity">
//                           Proof of Identity
//                         </SelectItem>
//                         <SelectItem value="address">
//                           Proof of Address
//                         </SelectItem>
//                         <SelectItem value="income">Proof of Income</SelectItem>
//                         <SelectItem value="employment">
//                           Employment Certificate
//                         </SelectItem>
//                         <SelectItem value="bank">Bank Statement</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div>
//                     <Label>Document</Label>
//                     <div className="mt-1">
//                       <Input
//                         type="file"
//                         onChange={(e) => handleFileChange(document.id, e)}
//                         className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
//                         accept=".pdf,.png,.jpg,.jpeg"
//                       />
//                       {document.fileName && (
//                         <p className="text-sm text-muted-foreground mt-1">
//                           Current: {document.fileName}
//                         </p>
//                       )}
//                       {!document.file && !document.fileName && (
//                         <p className="text-sm text-muted-foreground mt-1">
//                           No file chosen
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   <div>
//                     <Label>Status</Label>
//                     <Select
//                       value={document.status}
//                       onValueChange={(value) =>
//                         updateDocument(document.id, "status", value)
//                       }
//                     >
//                       <SelectTrigger className="mt-1">
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="Pending">Pending</SelectItem>
//                         <SelectItem value="Approved">Approved</SelectItem>
//                         <SelectItem value="Rejected">Rejected</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div className="flex items-end gap-2">
//                     <div className="flex-1">
//                       <Label>Description</Label>
//                       <Input
//                         value={document.description}
//                         onChange={(e) =>
//                           updateDocument(
//                             document.id,
//                             "description",
//                             e.target.value
//                           )
//                         }
//                         className="mt-1"
//                         placeholder="Enter description"
//                       />
//                     </div>
//                     {documents.length > 1 && (
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         onClick={() => removeDocument(document.id)}
//                         className="text-red-600 hover:text-red-700 hover:bg-red-50"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               ))}

//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={addDocument}
//                 className="w-full sm:w-auto"
//               >
//                 <Plus className="h-4 w-4 mr-2" />
//                 Add Document
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Action Buttons */}
//         <div className="flex items-center justify-end gap-4">
//           <Link href="/dashboard/loans">
//             <Button type="button" variant="outline">
//               Cancel
//             </Button>
//           </Link>
//           <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
//             Update
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }

"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";

interface DocumentUpload {
  id: string;
  type: string;
  file: File | null;
  fileName?: string;
  status: string;
  description: string;
}

interface LoanEditPageProps {
  params: {
    id: string;
  };
}

export default function LoanEditPage({ params }: LoanEditPageProps) {
  // Pre-populate with existing loan data
  const [formData, setFormData] = useState({
    branch: "downtown",
    loanType: "personal",
    customer: "jane-smith",
    loanStartDate: "2025-08-23",
    loanDueDate: "2025-08-29",
    amount: "10000",
    loanTerms: "7",
    loanTermPeriod: "Day",
    purposeOfLoan: "Personal expenses",
    notes: "Needs special attention",
  });

  const [documents, setDocuments] = useState<DocumentUpload[]>([
    {
      id: "1",
      type: "identity",
      file: null,
      fileName: "existing-document.pdf",
      status: "Pending",
      description: "This is demo data",
    },
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addDocument = () => {
    const newDoc: DocumentUpload = {
      id: Date.now().toString(),
      type: "",
      file: null,
      status: "Pending",
      description: "",
    };
    setDocuments((prev) => [...prev, newDoc]);
  };

  const removeDocument = (id: string) => {
    if (documents.length > 1) {
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    }
  };

  const updateDocument = (
    id: string,
    field: keyof DocumentUpload,
    value: any
  ) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, [field]: value } : doc))
    );
  };

  const handleFileChange = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;
    updateDocument(id, "file", file);
    if (file) {
      updateDocument(id, "fileName", file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Form Data:", formData);
    console.log("Updated Documents:", documents);
    // Handle form submission
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
            <BreadcrumbLink href="/dashboard/business-management/loan">
              Loan
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Loan Edit</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Loan Basic Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">#{params.id}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="branch">Branch</Label>
                  <Select
                    value={formData.branch}
                    onValueChange={(value) =>
                      handleInputChange("branch", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="downtown">Downtown Branch</SelectItem>
                      <SelectItem value="mainstreet">
                        Main Street Branch
                      </SelectItem>
                      <SelectItem value="northside">
                        Northside Branch
                      </SelectItem>
                      <SelectItem value="westend">West End Branch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="loanStartDate">Loan Start Date</Label>
                  <Input
                    id="loanStartDate"
                    type="date"
                    value={formData.loanStartDate}
                    onChange={(e) =>
                      handleInputChange("loanStartDate", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="loanDueDate">Loan Due Date</Label>
                  <Input
                    id="loanDueDate"
                    type="date"
                    value={formData.loanDueDate}
                    onChange={(e) =>
                      handleInputChange("loanDueDate", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    className="mt-1 min-h-[80px]"
                    placeholder="Enter notes"
                  />
                </div>
              </div>

              {/* Middle Column */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="loanType">Loan Type</Label>
                  <Select
                    value={formData.loanType}
                    onValueChange={(value) =>
                      handleInputChange("loanType", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Personal Loan</SelectItem>
                      <SelectItem value="mortgage">Mortgage Loan</SelectItem>
                      <SelectItem value="car">Car Loan</SelectItem>
                      <SelectItem value="business">Business Loan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="loanTerms">Loan Terms</Label>
                  <Input
                    id="loanTerms"
                    type="number"
                    value={formData.loanTerms}
                    onChange={(e) =>
                      handleInputChange("loanTerms", e.target.value)
                    }
                    className="mt-1"
                    placeholder="Enter loan terms"
                  />
                </div>

                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) =>
                      handleInputChange("amount", e.target.value)
                    }
                    className="mt-1"
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="customer">Customer</Label>
                  <Select
                    value={formData.customer}
                    onValueChange={(value) =>
                      handleInputChange("customer", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jane-smith">Jane Smith</SelectItem>
                      <SelectItem value="john-doe">John Doe</SelectItem>
                      <SelectItem value="emily-brown">Emily Brown</SelectItem>
                      <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="loanTermPeriod">Loan Term Period</Label>
                  <Select
                    value={formData.loanTermPeriod}
                    onValueChange={(value) =>
                      handleInputChange("loanTermPeriod", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Day">Day</SelectItem>
                      <SelectItem value="Week">Week</SelectItem>
                      <SelectItem value="Month">Month</SelectItem>
                      <SelectItem value="Year">Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="purposeOfLoan">Purpose Of Loan</Label>
                  <Textarea
                    id="purposeOfLoan"
                    value={formData.purposeOfLoan}
                    onChange={(e) =>
                      handleInputChange("purposeOfLoan", e.target.value)
                    }
                    className="mt-1 min-h-[80px]"
                    placeholder="Enter purpose of loan"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Upload Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Document Detail</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.map((document, index) => (
                <div
                  key={document.id}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg"
                >
                  <div>
                    <Label>Document Type</Label>
                    <Select
                      value={document.type}
                      onValueChange={(value) =>
                        updateDocument(document.id, "type", value)
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select Document Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="identity">
                          Proof of Identity
                        </SelectItem>
                        <SelectItem value="address">
                          Proof of Address
                        </SelectItem>
                        <SelectItem value="income">Proof of Income</SelectItem>
                        <SelectItem value="employment">
                          Employment Certificate
                        </SelectItem>
                        <SelectItem value="bank">Bank Statement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Document</Label>
                    <div className="mt-1">
                      <Input
                        type="file"
                        onChange={(e) => handleFileChange(document.id, e)}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                        accept=".pdf,.png,.jpg,.jpeg"
                      />
                      {document.fileName && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Current: {document.fileName}
                        </p>
                      )}
                      {!document.file && !document.fileName && (
                        <p className="text-sm text-muted-foreground mt-1">
                          No file chosen
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label>Status</Label>
                    <Select
                      value={document.status}
                      onValueChange={(value) =>
                        updateDocument(document.id, "status", value)
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Label>Description</Label>
                      <Input
                        value={document.description}
                        onChange={(e) =>
                          updateDocument(
                            document.id,
                            "description",
                            e.target.value
                          )
                        }
                        className="mt-1"
                        placeholder="Enter description"
                      />
                    </div>
                    {documents.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeDocument(document.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addDocument}
                className="w-full sm:w-auto bg-transparent"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Document
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
          <Link href="/dashboard/loans">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
