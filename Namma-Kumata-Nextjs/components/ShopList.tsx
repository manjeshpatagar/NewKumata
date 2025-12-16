"use client";

import { Card } from "./ui/card";
import { Star } from "lucide-react";

interface ShopListProps {
  activeId: string;
  onSelect: (shop: any) => void;
}

export default function ShopList({ activeId, onSelect }: ShopListProps) {
  const shops = [
    {
      _id: "1",
      shopName: "The Seventh Heaven Resort",
      rating: 4.5,
      reviewCount: 515,
      price: "₹909",
      image:
        "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?w=400",
      description: "Great hotel resort...",
      contact: { phone: "9876543210", email: "info@gmail.com" },
      openingHours: { open: "9 AM" },
      address: "Kumta",
    },
    {
      _id: "2",
      shopName: "Hotel Vaibhav Palace",
      rating: 3.6,
      reviewCount: 1181,
      price: "₹1,262",
      image:
        "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?w=400",
      description: "Nice stay with AC rooms...",
      contact: { phone: "9998887777", email: "vaibhav@gmail.com" },
      openingHours: { open: "10 AM" },
      address: "Honnavar",
    },
    {
      _id: "3",
      shopName: "Mandara Elite",
      rating: 4.8,
      reviewCount: 153,
      price: "₹2,913",
      image:
        "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?w=400",
      description: "Luxury hotel experience...",
      contact: { phone: "8887776666", email: "mandara@gmail.com" },
      openingHours: { open: "8 AM" },
      address: "Karwar",
    },
  ];

  return (
    <div className="h-full sticky top-24 space-y-4">

      {shops.map((shop) => (
        <Card
          key={shop._id}
          onClick={() => onSelect(shop)}
          className={`cursor-pointer p-3 flex justify-between
          ${activeId === shop._id ? "border-blue-600 border" : ""}`}
        >
          <div className="flex-1">
            <h3 className="font-semibold">{shop.shopName}</h3>

            <div className="flex items-center gap-1 mt-1 text-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              {shop.rating}
              <span className="text-gray-500">({shop.reviewCount})</span>
            </div>
          </div>

          <div className="relative ml-2">
            <img
              src={shop.image}
              className="w-24 h-20 object-cover rounded-md"
            />
            <span className="absolute bottom-1 right-1 bg-white px-2 py-0.5 rounded font-semibold shadow text-sm">
              {shop.price}
            </span>
          </div>
        </Card>
      ))}

    </div>
  );
}
