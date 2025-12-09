import { cookies } from "next/headers";
import { HomePage } from "@/components/HomePage";
import { BottomNav } from "@/components/BottomNav";
import { categoryServerApi } from "@/lib/api-ssr/categoryServerApi";

export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value || "";

  const result = await categoryServerApi.getAll(token);

  const categories =
    Array.isArray(result)
      ? result
      : Array.isArray(result?.data)
      ? result.data
      : [];

  return (
    <>
      <HomePage categories={categories} />
      <BottomNav />
    </>
  );
}
