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

interface Note {
  id: string;
  title: string;
  description: string;
  attachment?: string;
  createdDate: string;
}

export default function NoticeBoardPage() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "NoticeBoard SASCMA",
      description:
        "Test. 2020-08-07 22:47:00. sfs sdvs sf sfsgvs s sg sg gsafgg eg g · demo. 2021-03-01 14:54:02. Lorem Ipsum is simply dummy text of the printing",
      createdDate: "2024-01-23",
    },
    {
      id: "2",
      title: "Notice Board Bright",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      createdDate: "2024-01-23",
    },
    {
      id: "3",
      title: "Notice Board SSBIC",
      description:
        "Noticeboard. There is no notice. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard",
      createdDate: "2024-01-23",
    },
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    attachment: null as File | null,
  });

  const handleCreate = () => {
    if (formData.title && formData.description) {
      const newNote: Note = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        attachment: formData.attachment?.name,
        createdDate: new Date().toISOString().split("T")[0],
      };
      setNotes([...notes, newNote]);
      setFormData({ title: "", description: "", attachment: null });
      setIsCreateOpen(false);
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      description: note.description,
      attachment: null,
    });
    setIsEditOpen(true);
  };

  const handleUpdate = () => {
    if (editingNote && formData.title && formData.description) {
      const updatedNote: Note = {
        ...editingNote,
        title: formData.title,
        description: formData.description,
        attachment: formData.attachment?.name || editingNote.attachment,
      };
      setNotes(
        notes.map((note) => (note.id === editingNote.id ? updatedNote : note))
      );
      setFormData({ title: "", description: "", attachment: null });
      setIsEditOpen(false);
      setEditingNote(null);
    }
  };

  const handleDelete = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
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
          <span>Notice Board</span>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">Note List</h1>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Note
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create Note</DialogTitle>
                <button
                  onClick={() => setIsCreateOpen(false)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter note title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="attachment">Attachment</Label>
                  <Input
                    id="attachment"
                    type="file"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        attachment: e.target.files?.[0] || null,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                  />
                </div>
                <Button
                  onClick={handleCreate}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  Create
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div
            key={note.id}
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
                <DropdownMenuItem onClick={() => handleEdit(note)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDelete(note.id)}
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-2">
                {formatDate(note.createdDate)}
              </div>
              <h3 className="font-medium text-gray-900 mb-2">{note.title}</h3>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Title</span>
                <div className="mt-1">{note.title}</div>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <span className="font-medium">Description</span>
              <div className="mt-1 text-xs leading-relaxed">
                {note.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
            <button
              onClick={() => setIsEditOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-attachment">Attachment</Label>
              <Input
                id="edit-attachment"
                type="file"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    attachment: e.target.files?.[0] || null,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
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
