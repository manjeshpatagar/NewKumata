"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { toast } from "sonner";
import { categoryApi } from "../../lib/api/categoryApi";

interface AdminSubcategoriesPageProps {
  onBack: () => void;
}

export function AdminSubcategoriesPage({ onBack }: AdminSubcategoriesPageProps) {
  const [mainCategories, setMainCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [selectedParentId, setSelectedParentId] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const [form, setForm] = useState({
    name: "",
    imageFile: null as File | null,
  });

  /* ---------------------------------------------
        FETCH MAIN BUSINESS CATEGORIES + SUBS
  --------------------------------------------- */
  const loadData = async () => {
    try {
      const all = await categoryApi.getAll();

      const mainBusiness = all.filter((c: any) => c.type === "business" && !c.parent);
      const subs = all.filter((c: any) => c.type === "business" && c.parent);

      setMainCategories(mainBusiness);
      setSubcategories(subs);
    } catch (err: any) {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const parentSubs = selectedParentId
    ? subcategories.filter((s) => s.parent === selectedParentId || s.parent?._id === selectedParentId)
    : [];


  /* ---------------------------------------------
        OPEN ADD DIALOG
  --------------------------------------------- */
  const openAddDialog = () => {
    if (!selectedParentId) return toast.error("Select a parent category first");

    setEditing(null);
    setForm({ name: "", imageFile: null });
    setIsDialogOpen(true);
  };

  /* ---------------------------------------------
        SAVE SUBCATEGORY (ADD or UPDATE)
  --------------------------------------------- */
  const handleSave = async () => {
    if (!form.name) return toast.error("Enter name");

    try {
      if (editing) {
        // UPDATE SUBCATEGORY
        const updated = await categoryApi.update(
          editing._id,
          form.name,
          "",                       // description
          editing.isActive ?? true, // keep active
          form.imageFile,           // optional new file
          "business",
          selectedParentId
        );

        setSubcategories(prev =>
          prev.map((s) => (s._id === updated._id ? updated : s))
        );

      } else {
        // CREATE SUBCATEGORY
        const created = await categoryApi.create(
          form.name,
          "",
          form.imageFile,
          "business",
          selectedParentId
        );

        setSubcategories(prev => [created, ...prev]);
      }

      toast.success(editing ? "Updated!" : "Added!");
      setIsDialogOpen(false);

    } catch (err: any) {
      toast.error(err?.message || "Failed");
    }
  };

  /* ---------------------------------------------
        DELETE SUBCATEGORY
  --------------------------------------------- */
  const handleDelete = async (id: string) => {
    try {
      await categoryApi.delete(id);
      setSubcategories(prev => prev.filter(s => s._id !== id));
      toast.success("Deleted!");
    } catch (err: any) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-4">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft />
        </Button>
        <h2 className="text-2xl font-bold">Manage Subcategories</h2>
      </div>

      {/* SELECT PARENT CATEGORY */}
      <Label>Select Business Category (Parent)</Label>
      <select
        className="border rounded-lg p-2 w-full mb-4"
        value={selectedParentId}
        onChange={(e) => setSelectedParentId(e.target.value)}
      >
        <option value="">-- Select Category --</option>
        {mainCategories.map((c) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      {/* ADD BUTTON */}
      {selectedParentId && (
        <Button className="mb-4" onClick={openAddDialog}>
          <Plus className="mr-2" /> Add Subcategory
        </Button>
      )}

      {/* SUBCATEGORY LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {parentSubs.map((s) => (
          <Card key={s._id} className="p-4 flex justify-between items-center">
            {/* LEFT */}
            <div className="flex items-center gap-3">
              {s.image ? (
                <img src={s.image} className="w-12 h-12 rounded object-cover" />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                  <ImageIcon />
                </div>
              )}
              <p className="font-semibold">{s.name}</p>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setEditing(s);
                  setForm({ name: s.name, imageFile: null });
                  setIsDialogOpen(true);
                }}
              >
                <Edit />
              </Button>

              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(s._id)}
              >
                <Trash2 />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* ADD/EDIT DIALOG */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Subcategory" : "Add Subcategory"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            {/* NAME */}
            <div>
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* IMAGE FILE */}
            <div>
              <Label>Image (optional)</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setForm({ ...form, imageFile: e.target.files?.[0] || null })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
