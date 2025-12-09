"use client";

import {
  ArrowLeft,
  Settings,
  Edit2,
  FileText,
  HelpCircle,
  Mail,
  ChevronRight,
  LogOut,
  Phone,
} from "lucide-react";

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

export function ProfilePage({ initialUser }: { initialUser: any }) {
  const router = useRouter();
  const { t } = useLanguage();
  const { logout, user: authUser } = useAuth();

  // Priority: SSR → AuthContext → Guest
  const user = initialUser ||
    authUser || {
      name: "Guest User",
      email: "guest@email.com",
      phoneNumber: "",
      avatarUrl: "",
      bio: "",
    };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 sticky top-0 z-50">
        <div className="px-3 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg font-semibold dark:text-white">
              {t("profile")}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/settings")}
            >
              <Settings size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 px-3 pb-24">
        <div className="max-w-3xl mx-auto pt-4 space-y-6">
          {/* PROFILE CARD */}
          <Card className="p-6 text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-blue-200">
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>

            <h2 className="text-xl font-semibold dark:text-white">
              {user.name}
            </h2>

            <div className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
              <p>{user.email}</p>
              {user.phoneNumber && <p>📞 {user.phoneNumber}</p>}
              {user.bio && <p className="mt-1">{user.bio}</p>}
            </div>

            <Button
              variant="outline"
              className="mt-4"
              onClick={() => router.push("/edit-profile")}
            >
              <Edit2 size={16} className="mr-2" />
              {t("editProfile")}
            </Button>
          </Card>

          {/* HELP SECTION */}
          <Card className="p-5">
            <h3 className="text-lg font-semibold mb-3">{t("helpSupport")}</h3>

            <ProfileLink
              icon={<FileText />}
              title={t("termsConditions")}
              onClick={() => router.push("/terms-conditions")}
            />

            <ProfileLink
              icon={<HelpCircle />}
              title={t("help")}
              onClick={() => router.push("/help")}
            />

            <ProfileLink
              icon={<Mail />}
              title={t("contactUs")}
              onClick={() => router.push("/contact-us")}
            />
          </Card>

          {/* LOGOUT */}
          <Card className="p-4 mb-10">
            <Button
              variant="outline"
              className="w-full border-red-400 text-red-600"
              onClick={() => {
                logout();
                router.push("/auth/login");
              }}
            >
              <LogOut size={18} className="mr-2" />
              {t("logout")}
            </Button>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}

function ProfileLink({ icon, title, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <span>{title}</span>
      </div>
      <ChevronRight className="text-gray-400" />
    </button>
  );
}
