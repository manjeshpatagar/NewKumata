'use client';

import { useState } from "react";
import { ArrowLeft, Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { toast } from "sonner";

import {
  getSubcategories,
  addSubcategory,
  updateSubcategory,
  deleteSubcategory
} from "@/lib/api/tempSubcategoryStore";

interface AdminSubcategoriesPageProps {
  categories: any[];
  onBack: () => void;
}

export function AdminSubcategoriesPage({ categories, onBack }: AdminSubcategoriesPageProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [editing, setEditing] = useState<any>(null);

  const [form, setForm] = useState({
    name: "",
    icon: "",
    imageFile: null as File | null
  });

  const subcategories = selectedCategoryId
    ? getSubcategories(selectedCategoryId)
    : [];

  const openAddDialog = () => {
    setEditing(null);
    setForm({ name: "", icon: "", imageFile: null });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name) return toast.error("Enter subcategory name");

    if (editing) {
      updateSubcategory(selectedCategoryId, {
        ...editing,
        name: form.name,
        icon: form.icon,
      });
      toast.success("Updated!");
    } else {
      addSubcategory(selectedCategoryId, {
        name: form.name,
        icon: form.icon,
        image: form.imageFile ? URL.createObjectURL(form.imageFile) : null,
      });
      toast.success("Added!");
    }

    setIsDialogOpen(false);
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft />
        </Button>
        <h2 className="text-2xl font-bold">Manage Subcategories</h2>
      </div>

      {/* Select Category */}
      <Label>Select Category</Label>
      <select
        className="border rounded-lg p-2 w-full mb-4"
        value={selectedCategoryId}
        onChange={(e) => setSelectedCategoryId(e.target.value)}
      >
        <option value="">-- Select --</option>
        {categories.map((c: any) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      {/* Add Button */}
      {selectedCategoryId && (
        <Button className="mb-4" onClick={openAddDialog}>
          <Plus className="mr-2" /> Add Subcategory
        </Button>
      )}

      {/* List Subcategories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {subcategories.map((s) => (
          <Card key={s.id} className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              {s.image ? (
                <img src={s.image} className="w-12 h-12 rounded object-cover" />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                  {s.icon || <ImageIcon />}
                </div>
              )}
              <p className="font-semibold">{s.name}</p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setEditing(s);
                  setForm({
                    name: s.name,
                    icon: s.icon,
                    imageFile: null
                  });
                  setIsDialogOpen(true);
                }}
              >
                <Edit />
              </Button>

              <Button
                variant="destructive"
                size="icon"
                onClick={() => {
                  deleteSubcategory(selectedCategoryId, s.id);
                  toast.success("Deleted!");
                }}
              >
                <Trash2 />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit" : "Add"} Subcategory</DialogTitle></DialogHeader>

          <div className="space-y-3">
            <div>
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <Label>Icon (optional emoji)</Label>
              <Input
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                placeholder="📚"
              />
            </div>

            <div>
              <Label>Image (optional)</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setForm({ ...form, imageFile: e.target.files?.[0] || null });
                }}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
