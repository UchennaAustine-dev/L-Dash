"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Upload, Check } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface CustomerFormData {
  name: string
  email: string
  phoneNumber: string
  dateOfBirth: Date | undefined
  gender: string
  maritalStatus: string
  branch: string
  profession: string
  company: string
  city: string
  state: string
  country: string
  zipCode: string
  address: string
  note: string
}

interface Document {
  id: string
  type: string
  filename: string
  status: string
  notes: string
}

interface CustomerEditFormProps {
  customerId: string
}

// Mock data for the customer being edited (matching the screenshot)
const mockCustomerData: CustomerFormData = {
  name: "Emily Brown",
  email: "emily.b@example.com",
  phoneNumber: "+1 (244) 894-8591",
  dateOfBirth: new Date(1993, 9, 15), // Oct 15, 1993
  gender: "Female",
  maritalStatus: "Married",
  branch: "West End Branch",
  profession: "Doctor",
  company: "HealthCare Inc",
  city: "Houston",
  state: "TX",
  country: "USA",
  zipCode: "77002",
  address: "101 Pine St, Suite 5",
  note: "Needs special attention",
}

const mockDocuments: Document[] = [
  {
    id: "1",
    type: "Proof of Identity",
    filename: "4eb234fd-4706-45f0-b5c9-11cff1be1629.png",
    status: "Approved",
    notes: "This is the demo dummy data",
  },
]

export function CustomerEditForm({ customerId }: CustomerEditFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<CustomerFormData>(mockCustomerData)
  const [documents, setDocuments] = useState<Document[]>(mockDocuments)
  const [newDocument, setNewDocument] = useState({
    type: "",
    file: null as File | null,
    status: "Pending",
    notes: "",
  })

  const handleInputChange = (field: keyof CustomerFormData, value: string | Date) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Updating customer:", formData)
    // Redirect to customer list after update
    router.push("/customers")
  }

  const handleAddDocument = () => {
    if (newDocument.type && newDocument.file) {
      const document: Document = {
        id: Date.now().toString(),
        type: newDocument.type,
        filename: newDocument.file.name,
        status: newDocument.status,
        notes: newDocument.notes,
      }
      setDocuments((prev) => [...prev, document])
      setNewDocument({
        type: "",
        file: null,
        status: "Pending",
        notes: "",
      })
    }
  }

  const handleRemoveDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Customer Edit</CardTitle>
                <div className="text-sm font-medium text-muted-foreground">#{customerId}</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date Of Birth</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.dateOfBirth && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dateOfBirth ? format(formData.dateOfBirth, "dd/MM/yyyy") : "dd/mm/yyyy"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.dateOfBirth}
                        onSelect={(date) => handleInputChange("dateOfBirth", date || new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maritalStatus">Marital Status</Label>
                  <Select
                    value={formData.maritalStatus}
                    onValueChange={(value) => handleInputChange("maritalStatus", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single">Single</SelectItem>
                      <SelectItem value="Married">Married</SelectItem>
                      <SelectItem value="Divorced">Divorced</SelectItem>
                      <SelectItem value="Widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Select value={formData.branch} onValueChange={(value) => handleInputChange("branch", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="West End Branch">West End Branch</SelectItem>
                      <SelectItem value="Northside Branch">Northside Branch</SelectItem>
                      <SelectItem value="Downtown Branch">Downtown Branch</SelectItem>
                      <SelectItem value="Main Street Branch">Main Street Branch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Detail Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Document Detail</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Existing Documents */}
              {documents.map((document) => (
                <div key={document.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Document Type</Label>
                    <div className="text-sm">{document.type}</div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Document</Label>
                    <div className="text-sm text-blue-600">{document.filename}</div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Status</Label>
                    <div className="text-sm">{document.status}</div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Notes</Label>
                    <div className="text-sm">{document.notes}</div>
                  </div>
                </div>
              ))}

              {/* Add New Document */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border-2 border-dashed border-muted rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="documentType">Document Type</Label>
                  <Select
                    value={newDocument.type}
                    onValueChange={(value) => setNewDocument((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Proof of Identity">Proof of Identity</SelectItem>
                      <SelectItem value="Proof of Address">Proof of Address</SelectItem>
                      <SelectItem value="Bank Statement">Bank Statement</SelectItem>
                      <SelectItem value="Utility Bill">Utility Bill</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="document">Document</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="document"
                      type="file"
                      onChange={(e) => setNewDocument((prev) => ({ ...prev, file: e.target.files?.[0] || null }))}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("document")?.click()}
                      className="w-full justify-start"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {newDocument.file ? newDocument.file.name : "Choose File"}
                    </Button>
                    {!newDocument.file && <span className="text-sm text-muted-foreground">No file chosen</span>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newDocument.status}
                    onValueChange={(value) => setNewDocument((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Enter notes"
                    value={newDocument.notes}
                    onChange={(e) => setNewDocument((prev) => ({ ...prev, notes: e.target.value }))}
                    className="min-h-[60px]"
                  />
                </div>
              </div>

              <div className="flex justify-start">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-full h-10 w-10 p-0"
                  onClick={handleAddDocument}
                >
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Additional Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Additional Detail</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="profession">Profession</Label>
                  <Input
                    id="profession"
                    value={formData.profession}
                    onChange={(e) => handleInputChange("profession", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value={formData.city} onChange={(e) => handleInputChange("city", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
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
                    value={formData.country}
                    onChange={(e) => handleInputChange("country", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="note">Note</Label>
                <Textarea
                  id="note"
                  value={formData.note}
                  onChange={(e) => handleInputChange("note", e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-end">
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
          Update
        </Button>
      </div>
    </form>
  )
}
