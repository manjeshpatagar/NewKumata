// import { cookies } from "next/headers";
// import { HomePage } from "@/components/HomePage";
// import { BottomNav } from "@/components/BottomNav";
// import { categoryServerApi } from "@/lib/api-ssr/categoryServerApi";

// async function getDataSSR() {
//   const cookieStore = cookies();
//   const token = cookieStore.get("token")?.value || "";

//   const result = await categoryServerApi.getAll(token);

//   const businessCategories = (result.data || []).filter(
//     (cat: any) => cat.type === "business"
//   );
//   return {
//     categories: businessCategories,
//   };
// }
// export default async function Home() {
//   const { categories } = await getDataSSR();
//   return (
//     <>
//       <HomePage categories={categories} />
//       <BottomNav />
//     </>
//   );
// }

import { HomePage } from "@/components/HomePage";
import { BottomNav } from "@/components/BottomNav";

export default async function Home() {
  return (
    <>
      <HomePage />
      <BottomNav />
    </>
  );
}
