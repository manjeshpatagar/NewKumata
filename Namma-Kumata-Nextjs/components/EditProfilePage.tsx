"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Mail, Phone, Upload, Camera } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { Alert, AlertDescription } from "./ui/alert";
import { authApi } from "@/lib/api/authApi";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";

export function EditProfilePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { user, setUser } = useAuth();
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.bio || "",
    avatarUrl: user?.avatarUrl || "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await authApi.updateProfile(formData);
      if (res.success) {
        setUser(res.data);
        setSaved(true);
        setTimeout(() => router.back(), 1500);
      }
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <h1 className="text-xl">{t("editProfile")}</h1>
      </div>

      <ScrollArea className="flex-1 p-4 pb-20">
        {saved && (
          <Alert className="mb-4 bg-green-50 border-green-300">
            <AlertDescription className="text-green-700">
              {t("profileUpdated")}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar */}
          <Card className="p-6 text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src={formData.avatarUrl} />
              <AvatarFallback>{formData.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <Button type="button" variant="outline">
              <Upload size={16} className="mr-2" />
              Upload Avatar
            </Button>
          </Card>

          {/* Name */}
          <div>
            <Label>Name</Label>
            <Input
              className="dark:bg-gray-800"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          {/* Email */}
          <div>
            <Label>Email</Label>
            <Input
              className="dark:bg-gray-800"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          {/* Phone */}
          <div>
            <Label>Phone Number</Label>
            <Input
              className="dark:bg-gray-800"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
            />
          </div>

          {/* Bio */}
          <div>
            <Label>Bio</Label>
            <Input
              className="dark:bg-gray-800"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              placeholder="Write something about yourself"
            />
          </div>

          {/* Save button */}
          <Button type="submit" className="w-full bg-blue-600">
            {t("saveChanges")}
          </Button>
        </form>
      </ScrollArea>
    </div>
  );
}
