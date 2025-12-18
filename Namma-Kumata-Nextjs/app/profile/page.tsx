// app/profile/page.tsx
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { ProfilePage } from "@/components/ProfilePage";
import { BottomNav } from "@/components/BottomNav";
import { authServerApi } from "@/lib/api-ssr/authServerApi";
import { AppHeader } from "@/components/AppHeader";

export const metadata: Metadata = {
  title: "Profile - Namma Kumta",
  description: "View and manage your Namma Kumta profile.",
};

async function getProfileSSR() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const user = await authServerApi.getProfile(token);
    return user.data || null;
  } catch (err) {
    console.error("❌ Failed to fetch profile SSR:", err);
    return null;
  }
}

export default async function Profile() {
  const user = await getProfileSSR();

  return (
    <>
     <AppHeader/>
      <ProfilePage initialUser={user} />
      <BottomNav />
    </>
  );
}
