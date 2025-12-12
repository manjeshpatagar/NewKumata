// app/favorites/page.tsx

import type { Metadata } from "next";
import { cookies } from "next/headers";
import { favouriteServerApi } from "@/lib/api-ssr/favouriteServerApi";
import { FavoritesPage } from "@/components/FavoritesPage";
import { BottomNav } from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Favorites - Namma Kumta",
  description: "View your favorite shops, temples, and advertisements.",
};

async function getFavouritesSSR() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return [];

    const res = await favouriteServerApi.getMyFavourites(token);
    console.log("✅ SSR Favourites Response:", res);
    return res.data || [];
  } catch (error) {
    console.error("❌ SSR Favourites Error:", error);
    return [];
  }
}

export default async function Favorites() {
  const favourites = await getFavouritesSSR();

  return (
    <>
      <FavoritesPage initialFavourites={favourites} />
      <BottomNav />
    </>
  );
}
