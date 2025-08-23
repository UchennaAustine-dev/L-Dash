"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Upload, Check, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface CustomerFormData {
  branch: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  profile: File | null;
  dateOfBirth: Date | undefined;
  gender: string;
  maritalStatus: string;
  profession: string;
  company: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  address: string;
  note: string;
  documentType: string;
  document: File | null;
  status: string;
  description: string;
}

export function CustomerCreateForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<CustomerFormData>({
    branch: "",
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    profile: null,
    dateOfBirth: undefined,
    gender: "",
    maritalStatus: "",
    profession: "",
    company: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    address: "",
    note: "",
    documentType: "",
    document: null,
    status: "Pending",
    description: "",
  });

  const handleInputChange = (
    field: keyof CustomerFormData,
    value: string | Date | File | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (
    field: "profile" | "document",
    file: File | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Creating customer:", formData);
    // Redirect to customer list after creation
    router.push("/customers");
  };

  const generateCustomerId = () => {
    return `#CST-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  Customer Create
                </CardTitle>
                <div className="text-sm font-medium text-muted-foreground">
                  {generateCustomerId()}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Branch Selection */}
              <div className="space-y-2">
                <Label htmlFor="branch">Branch</Label>
                <Select
                  value={formData.branch}
                  onValueChange={(value) => handleInputChange("branch", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="west-end">West End Branch</SelectItem>
                    <SelectItem value="northside">Northside Branch</SelectItem>
                    <SelectItem value="downtown">Downtown Branch</SelectItem>
                    <SelectItem value="main-street">
                      Main Street Branch
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    placeholder="Enter phone number"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="profile">Profile</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="profile"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileChange("profile", e.target.files?.[0] || null)
                      }
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        document.getElementById("profile")?.click()
                      }
                      className="w-full justify-start"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {formData.profile ? formData.profile.name : "Choose File"}
                    </Button>
                    {!formData.profile && (
                      <span className="text-sm text-muted-foreground">
                        No file chosen
                      </span>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Date Of Birth</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.dateOfBirth && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dateOfBirth
                          ? format(formData.dateOfBirth, "dd/MM/yyyy")
                          : "dd/mm/yyyy"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.dateOfBirth}
                        onSelect={(date: any) =>
                          handleInputChange("dateOfBirth", date)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      handleInputChange("gender", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Male" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maritalStatus">Marital Status</Label>
                  <Select
                    value={formData.maritalStatus}
                    onValueChange={(value) =>
                      handleInputChange("maritalStatus", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Unmarried" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Document</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="documentType">Document Type</Label>
                  <Select
                    value={formData.documentType}
                    onValueChange={(value) =>
                      handleInputChange("documentType", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Document Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="proof-of-identity">
                        Proof of Identity
                      </SelectItem>
                      <SelectItem value="proof-of-address">
                        Proof of Address
                      </SelectItem>
                      <SelectItem value="bank-statement">
                        Bank Statement
                      </SelectItem>
                      <SelectItem value="utility-bill">Utility Bill</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="document">Document</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="document"
                      type="file"
                      onChange={(e) =>
                        handleFileChange(
                          "document",
                          e.target.files?.[0] || null
                        )
                      }
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        document.getElementById("document")?.click()
                      }
                      className="w-full justify-start"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {formData.document
                        ? formData.document.name
                        : "Choose File"}
                    </Button>
                    {!formData.document && (
                      <span className="text-sm text-muted-foreground">
                        No file chosen
                      </span>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleInputChange("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pending" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="min-h-[100px]"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Additional Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Additional Detail
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="profession">Profession</Label>
                  <Input
                    id="profession"
                    placeholder="Enter profession"
                    value={formData.profession}
                    onChange={(e) =>
                      handleInputChange("profession", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="Enter company"
                    value={formData.company}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="Enter state"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    placeholder="Enter country"
                    value={formData.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    placeholder="Enter zip code"
                    value={formData.zipCode}
                    onChange={(e) =>
                      handleInputChange("zipCode", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="note">Note</Label>
                <Textarea
                  id="note"
                  placeholder="Enter notes"
                  value={formData.note}
                  onChange={(e) => handleInputChange("note", e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-full h-12 w-12 p-0"
        >
          <Check className="h-5 w-5" />
        </Button>

        <Button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8"
        >
          Create
        </Button>
      </div>
    </form>
  );
}
