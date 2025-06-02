import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, MapPin } from "lucide-react";
import { useState } from "react";
import type { Homestay } from "@shared/schema";

interface HomestayCardProps {
  homestay: Homestay;
}

export default function HomestayCard({ homestay }: HomestayCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const getTagColor = (tag: string) => {
    const tagColors: Record<string, string> = {
      "Gần biển": "bg-secondary",
      "Sang trọng": "bg-yellow-500",
      "Truyền thống": "bg-blue-500",
      "Hiện đại": "bg-purple-500",
      "Có hồ bơi": "bg-green-500",
      "Nghệ thuật": "bg-indigo-500",
      "Tiết kiệm": "bg-red-500",
      "Penthouse": "bg-yellow-500",
      "Gia đình": "bg-pink-500"
    };
    return tagColors[tag] || "bg-gray-500";
  };

  return (
    <Card className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border-0">
      <div className="relative">
        <img
          src={homestay.imageUrl}
          alt={homestay.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFavorited(!isFavorited)}
            className="w-10 h-10 bg-white/90 hover:bg-white rounded-full p-0 shadow-lg"
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                isFavorited ? "text-red-500 fill-red-500" : "text-gray-600"
              }`}
            />
          </Button>
        </div>
        <div className="absolute bottom-4 left-4">
          {homestay.tags[0] && (
            <Badge className={`${getTagColor(homestay.tags[0])} text-white text-xs font-medium px-3 py-1 rounded-full`}>
              {homestay.tags[0]}
            </Badge>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-1">
            {homestay.name}
          </h3>
          <div className="flex items-center text-yellow-500 ml-2">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-gray-700 text-sm ml-1 font-medium">{homestay.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {homestay.description}
        </p>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin className="mr-2 h-4 w-4 text-orange-500" />
          <span>{homestay.location}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(homestay.price)}
            </span>
            <span className="text-gray-500 text-sm ml-1">/đêm</span>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium shadow-lg hover:shadow-xl transition-all">
            Xem chi tiết
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
