import { useQuery } from "@tanstack/react-query";
import { Flame, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Homestay } from "@shared/schema";

export default function FeaturedHomestays() {
  const { data: homestays, isLoading } = useQuery({
    queryKey: ["/api/homestays"],
    queryFn: async () => {
      const response = await fetch("/api/homestays");
      if (!response.ok) throw new Error("Failed to fetch homestays");
      return response.json() as Promise<Homestay[]>;
    }
  });

  if (isLoading || !homestays) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Get top rated homestays
  const featuredHomestays = homestays
    .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
    .slice(0, 6);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Flame className="text-red-500 mr-2 h-6 w-6" />
            <h2 className="text-3xl font-bold text-gray-900">Top Homestay Hot Đà Nẵng</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Những homestay được yêu thích nhất với đánh giá cao và dịch vụ xuất sắc
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredHomestays.map((homestay, index) => (
            <Card key={homestay.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden relative">
              {index < 3 && (
                <div className="absolute top-3 left-3 z-10">
                  <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    TOP {index + 1}
                  </div>
                </div>
              )}
              <div className="relative overflow-hidden">
                <img
                  src={homestay.imageUrl}
                  alt={homestay.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg leading-tight line-clamp-1">
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
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(homestay.price)}/đêm
                  </span>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Xem ngay
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" className="px-8 py-3 rounded-full font-medium border-primary text-primary hover:bg-primary hover:text-white">
            Xem tất cả homestay hot
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}