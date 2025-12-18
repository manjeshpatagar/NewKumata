"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Upload,
} from "lucide-react";

import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "./ui/alert-dialog";

import { authApi } from "@/lib/api/authApi";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";

export function EditProfilePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { user } = useAuth(); // ✅ NO setUser (fix)

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.bio || "",
    avatarUrl: user?.avatarUrl || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await authApi.updateProfile(formData);

      if (res?.success) {
        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
          router.back();
        }, 1500);
      } else {
        setError("Profile update failed. Please try again.");
      }
    } catch (err) {
      console.error("Update failed", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* HEADER */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b">
        <div className="flex items-center gap-3 px-4 py-4 max-w-3xl mx-auto">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft />
          </Button>
          <h1 className="text-lg font-semibold dark:text-white">
            {t("editProfile")}
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <ScrollArea className="flex-1">
        <div className="max-w-3xl mx-auto p-4 pb-24 space-y-6">

          {/* AVATAR */}
          <Card className="p-6 flex flex-col items-center gap-4 dark:bg-gray-900">
            <Avatar className="w-28 h-28">
              <AvatarImage src={formData.avatarUrl} />
              <AvatarFallback className="text-2xl bg-blue-600 text-white">
                {formData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <Button type="button" variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Change Photo
            </Button>
          </Card>

          {/* FORM */}
          <Card className="p-6 dark:bg-gray-900">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* NAME */}
              <div>
                <Label className="text-sm">Name</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    className="pl-10 dark:bg-gray-800"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <Label className="text-sm">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="email"
                    className="pl-10 dark:bg-gray-800"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* PHONE */}
              <div>
                <Label className="text-sm">Phone Number</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    className="pl-10 dark:bg-gray-800"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* BIO */}
              <div>
                <Label className="text-sm">Bio</Label>
                <Input
                  className="mt-1 dark:bg-gray-800"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  placeholder="Tell something about yourself"
                />
              </div>

              {/* ERROR */}
              {error && (
                <p className="text-sm text-red-600 text-center">
                  {error}
                </p>
              )}

              {/* SAVE */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? "Saving..." : t("saveChanges")}
              </Button>
            </form>
          </Card>
        </div>
      </ScrollArea>

      {/* SUCCESS POPUP */}
      <AlertDialog open={showSuccess}>
        <AlertDialogContent className="max-w-sm text-center">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-green-600">
              ✅ Profile Updated
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Your profile has been updated successfully.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
