'use client';

import {
  ArrowLeft,
  Settings,
  Edit2,
  FileText,
  HelpCircle,
  Mail,
  ChevronRight,
  LogOut
} from "lucide-react";

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { useAdmin } from "../contexts/AdminContext";
import { ThemeToggle } from "./ThemeToggle";



import { useRouter } from 'next/navigation';

export function ProfilePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { user: authUser, logout } = useAuth();
  const { isAdminLoggedIn } = useAdmin();

  const user = authUser || {
    name: "Guest User",
    email: "guest@email.com",
    phone: "+91 98765 43210",
    avatar: "",
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* HEADER */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="w-full px-3 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="w-9 h-9 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("profile")}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/settings')}
              className="w-9 h-9 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Settings size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* CONTENT AREA (FULL HEIGHT + SCROLLABLE) */}
      <ScrollArea className="flex-1 px-3 pb-24">
        <div className="max-w-3xl mx-auto pt-4 space-y-6">

          {/* PROFILE CARD */}
          <Card className="p-6 bg-white dark:bg-gray-900 text-center shadow-md">
            <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-blue-200 dark:ring-blue-900">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {user.name}
            </h2>

            <div className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
              <p>{user.email}</p>
              <p>{user.phone}</p>
            </div>

            <Button
              variant="outline"
              onClick={() => router.push('/edit-profile')}
              className="mt-4 w-full sm:w-auto"
            >
              <Edit2 size={16} className="mr-2" />
              {t("editProfile")}
            </Button>
          </Card>

          {/* HELP & SUPPORT */}
          <Card className="p-5 bg-white dark:bg-gray-900 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Help & Support
            </h3>

            <div className="space-y-2">
              <ProfileLink
                icon={<FileText />}
                title={t("termsConditions")}
                onClick={() => router.push('/terms-conditions')}
              />

              <ProfileLink
                icon={<HelpCircle />}
                title={t("help")}
                onClick={() => router.push('/help')}
              />

              <ProfileLink
                icon={<Mail />}
                title={t("contactUs")}
                onClick={() => router.push('/contact-us')}
              />
            </div>
          </Card>

          {/* LOGOUT */}
          <Card className="p-4 bg-white dark:bg-gray-900 shadow-md mb-10">
            <Button
              variant="outline"
              className="w-full border-red-300 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
              onClick={() => {
                if (confirm("Are you sure you want to logout?")) {
                  const loggedOut = logout();
                  if (loggedOut) router.push('/auth/login');
                }
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

// Small Component for Settings Rows
function ProfileLink({
  icon,
  title,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <span className="text-gray-700 dark:text-gray-300">{title}</span>
      </div>
      <ChevronRight className="text-gray-400" />
    </button>
  );
}
