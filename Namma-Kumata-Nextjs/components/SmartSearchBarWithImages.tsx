'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { categoryApi } from '@/lib/api/categoryApi';
import { subCategoryApi } from '@/lib/api/subCategoryApi';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SearchItem {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  image?: string;
}

export function SmartSearchBarWithImages({ placeholder }: { placeholder?: string }) {
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<SearchItem[]>([]);

  /* =========================
     LOAD FROM BACKEND
  ========================= */
  useEffect(() => {
    async function loadData() {
      const catRes = await categoryApi.getAll();
      const subRes = await subCategoryApi.getAll();

      const categories = (catRes.data || catRes)
        .filter((c: any) => c.type === 'business')
        .sort((a: any, b: any) => a.name.localeCompare(b.name));

      const subcategories = (subRes.data || subRes).sort((a: any, b: any) =>
        a.name.localeCompare(b.name)
      );

      const merged: SearchItem[] = [];

      subcategories.forEach((sub: any) => {
        merged.push({
          id: sub._id,
          name: sub.name,
          categoryId: sub.categoryId?._id || sub.categoryId,
          categoryName: sub.categoryId?.name || '',
          image: sub.image,
        });
      });

      setItems(merged);
    }

    loadData();
  }, []);

  /* =========================
     FILTER
  ========================= */
  const filtered = query
    ? items.filter(i =>
        i.name.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  /* =========================
     CLICK OUTSIDE
  ========================= */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* =========================
     NAVIGATION
  ========================= */
  const goToSubcategory = (item: SearchItem) => {
    setOpen(false);
    setQuery('');
    router.push(
      `/subcategory?categoryId=${item.categoryId}&categoryName=${encodeURIComponent(
        item.name
      )}`
    );
  };

  return (
    <div ref={searchRef} className="relative">
     <div className="relative">
  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />

  <Input
    placeholder={placeholder || 'Search'}
    value={query}
    onChange={e => {
      setQuery(e.target.value);
      setOpen(true);
    }}
    onFocus={() => setOpen(true)}
    className="
      h-12
      pl-12
      pr-10
      text-sm
      rounded-xl
      border-2
      border-gray-300
      bg-white
      shadow-sm
      transition-all
      duration-200
      focus:border-blue-500
      focus:ring-4
      focus:ring-blue-100
      focus:outline-none

      dark:bg-gray-900
      dark:border-gray-700
      dark:text-white
      dark:focus:border-blue-400
      dark:focus:ring-blue-900
    "
  />

  {query && (
    <button
      onClick={() => setQuery('')}
      className="
        absolute
        right-3
        top-1/2
        -translate-y-1/2
        rounded-full
        p-1
        hover:bg-gray-100
        dark:hover:bg-gray-800
        transition
      "
    >
      <X className="w-4 h-4 text-gray-500" />
    </button>
  )}
</div>

      {open && (
        <Card className="absolute w-full mt-2 z-50 max-h-[60vh]">
          <ScrollArea className="max-h-[60vh]">
            {filtered.length === 0 ? (
              <p className="p-4 text-center text-sm text-gray-500">
                No results found
              </p>
            ) : (
              filtered.map(item => (
                <div
                  key={item.id}
                  onClick={() => goToSubcategory(item)}
                  className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer"
                >
                  {item.image ? (
                    <ImageWithFallback
                      src={item.image}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                      {item.name.charAt(0)}
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.categoryName}
                    </p>
                  </div>
                </div>
              ))
            )}
          </ScrollArea>
        </Card>
      )}
    </div>
  );
}
