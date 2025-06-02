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
    <Card className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
      <div className="relative">
        <img
          src={homestay.imageUrl}
          alt={homestay.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFavorited(!isFavorited)}
            className="w-8 h-8 bg-white/80 hover:bg-white rounded-full p-0"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isFavorited ? "text-red-500 fill-red-500" : "text-gray-600"
              }`}
            />
          </Button>
        </div>
        <div className="absolute bottom-3 left-3">
          {homestay.tags[0] && (
            <Badge className={`${getTagColor(homestay.tags[0])} text-white text-xs font-medium`}>
              {homestay.tags[0]}
            </Badge>
          )}
        </div>
      </div>
      
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight">
            {homestay.name}
          </h3>
          <div className="flex items-center text-yellow-400 ml-2">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-gray-700 text-sm ml-1">{homestay.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {homestay.description}
        </p>
        
        <div className="flex items-center text-gray-500 text-xs mb-3">
          <MapPin className="mr-1 h-3 w-3" />
          <span>{homestay.location}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-baseline">
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(homestay.price)}
            </span>
            <span className="text-gray-600 text-sm ml-1">/đêm</span>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Xem chi tiết
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
