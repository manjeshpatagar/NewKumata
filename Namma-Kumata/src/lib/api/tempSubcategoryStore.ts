let subcategoryStore: Record<string, any[]> = {};

export function getSubcategories(categoryId: string) {
  return subcategoryStore[categoryId] || [];
}

export function addSubcategory(categoryId: string, subcategory: any) {
  if (!subcategoryStore[categoryId]) {
    subcategoryStore[categoryId] = [];
  }
  subcategoryStore[categoryId].push({ ...subcategory, id: Date.now().toString() });
}

export function updateSubcategory(categoryId: string, updated: any) {
  if (!subcategoryStore[categoryId]) return;
  subcategoryStore[categoryId] = subcategoryStore[categoryId].map((s) =>
    s.id === updated.id ? updated : s
  );
}

export function deleteSubcategory(categoryId: string, id: string) {
  if (!subcategoryStore[categoryId]) return;
  subcategoryStore[categoryId] = subcategoryStore[categoryId].filter((s) => s.id !== id);
}
