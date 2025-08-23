"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { X, Plus, Edit, Trash2, MoreHorizontal } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  subject: string;
  message: string;
  createdDate: string;
}

export default function ContactDiaryPage() {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Jim A Green",
      email: "jimAGreen@rhyta.com",
      contactNumber: "8563197424",
      subject: "WILD OATS MARKETS",
      message:
        "Generate random addresses, phone numbers, names, usernames and more basic background information of the world, and generate empolymen",
      createdDate: "2024-01-23",
    },
    {
      id: "2",
      name: "Judith D Turner",
      email: "judithDTurner@dayrep.com",
      contactNumber: "8327529086",
      subject: "JACOB REED AND SONS",
      message: "Business inquiry regarding partnership opportunities",
      createdDate: "2024-01-23",
    },
    {
      id: "3",
      name: "Enrique S Liverman",
      email: "enriqueSLiverman@teleworm.us",
      contactNumber: "8325787625",
      subject: "STAR INTERIOR DESIGN",
      message: "Interior design consultation request",
      createdDate: "2024-01-23",
    },
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    subject: "",
    message: "",
  });

  const handleCreate = () => {
    if (
      formData.name &&
      formData.email &&
      formData.contactNumber &&
      formData.subject
    ) {
      const newContact: Contact = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        contactNumber: formData.contactNumber,
        subject: formData.subject,
        message: formData.message,
        createdDate: new Date().toISOString().split("T")[0],
      };
      setContacts([...contacts, newContact]);
      setFormData({
        name: "",
        email: "",
        contactNumber: "",
        subject: "",
        message: "",
      });
      setIsCreateOpen(false);
    }
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      email: contact.email,
      contactNumber: contact.contactNumber,
      subject: contact.subject,
      message: contact.message,
    });
    setIsEditOpen(true);
  };

  const handleUpdate = () => {
    if (
      editingContact &&
      formData.name &&
      formData.email &&
      formData.contactNumber &&
      formData.subject
    ) {
      const updatedContact: Contact = {
        ...editingContact,
        name: formData.name,
        email: formData.email,
        contactNumber: formData.contactNumber,
        subject: formData.subject,
        message: formData.message,
      };
      setContacts(
        contacts.map((contact) =>
          contact.id === editingContact.id ? updatedContact : contact
        )
      );
      setFormData({
        name: "",
        email: "",
        contactNumber: "",
        subject: "",
        message: "",
      });
      setIsEditOpen(false);
      setEditingContact(null);
    }
  };

  const handleDelete = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <span className="text-blue-600 hover:underline cursor-pointer">
            Dashboard
          </span>
          <span>›</span>
          <span>Contact Diary</span>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">Contact List</h1>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Contact
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create Contact</DialogTitle>
                <button
                  onClick={() => setIsCreateOpen(false)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter contact name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter contact email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    placeholder="Enter contact number"
                    value={formData.contactNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contactNumber: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Enter contact subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Enter message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateOpen(false)}
                    className="flex-1"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={handleCreate}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  >
                    Create
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white rounded-lg shadow-sm border p-6 relative"
          >
            {/* Three-dot menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded">
                  <MoreHorizontal className="w-4 h-4 text-gray-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleEdit(contact)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDelete(contact.id)}
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="mb-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-1">
                {contact.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{contact.email}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Contact Number</span>
                  <div className="font-medium">{contact.contactNumber}</div>
                </div>
                <div>
                  <span className="text-gray-500">Created Date</span>
                  <div className="font-medium">
                    {formatDate(contact.createdDate)}
                  </div>
                </div>
              </div>

              <div className="mt-3 text-sm">
                <span className="text-gray-500">Subject</span>
                <div className="font-medium text-gray-900">
                  {contact.subject}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Contact</DialogTitle>
            <button
              onClick={() => setIsEditOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-contactNumber">Contact Number</Label>
              <Input
                id="edit-contactNumber"
                value={formData.contactNumber}
                onChange={(e) =>
                  setFormData({ ...formData, contactNumber: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-subject">Subject</Label>
              <Input
                id="edit-subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-message">Message</Label>
              <Textarea
                id="edit-message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={3}
              />
            </div>
            <Button
              onClick={handleUpdate}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
