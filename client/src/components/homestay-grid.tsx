import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import HomestayCard from "./homestay-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Loader2 } from "lucide-react";
import type { Homestay } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

interface HomestayGridProps {
  searchQuery: string;
  selectedArea?: string;
}

export default function HomestayGrid({ searchQuery, selectedArea }: HomestayGridProps) {
  const [sortBy, setSortBy] = useState("popular");
  const [homestays, setHomestays] = useState<Homestay[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch all homestays initially
  const { data: allHomestays, isLoading } = useQuery({
    queryKey: ["/api/homestays"],
    queryFn: async () => {
      const response = await fetch("/api/homestays");
      if (!response.ok) throw new Error("Failed to fetch homestays");
      return response.json() as Promise<Homestay[]>;
    }
  });

  // Perform search when searchQuery changes
  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch();
    } else if (selectedArea) {
      filterByArea();
    } else {
      setHomestays(allHomestays || []);
    }
  }, [searchQuery, selectedArea, allHomestays]);

  const performSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const response = await apiRequest("POST", "/api/homestays/search", {
        query: searchQuery,
        area: selectedArea
      });
      const data = await response.json();
      setHomestays(data.results);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const filterByArea = async () => {
    if (!selectedArea) return;
    
    try {
      const response = await fetch(`/api/homestays/area/${encodeURIComponent(selectedArea)}`);
      if (!response.ok) throw new Error("Failed to fetch homestays by area");
      const data = await response.json();
      setHomestays(data);
    } catch (error) {
      console.error("Area filter failed:", error);
    }
  };

  const sortedHomestays = [...homestays].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return parseFloat(b.rating) - parseFloat(a.rating);
      default:
        return 0;
    }
  });

  if (isLoading || isSearching) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-gray-600">
            {isSearching ? "Đang tìm kiếm..." : "Đang tải..."}
          </span>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {searchQuery ? "Kết quả tìm kiếm" : "Homestay nổi bật tại Đà Nẵng"}
            </h2>
            <p className="text-gray-600 mt-1">
              Tìm thấy {sortedHomestays.length} homestay phù hợp
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">Sắp xếp:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Phổ biến nhất</SelectItem>
                <SelectItem value="price-low">Giá thấp đến cao</SelectItem>
                <SelectItem value="price-high">Giá cao đến thấp</SelectItem>
                <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {sortedHomestays.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Không tìm thấy homestay phù hợp với yêu cầu của bạn.</p>
          <p className="text-gray-400">Hãy thử tìm kiếm với từ khóa khác.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedHomestays.map((homestay) => (
              <HomestayCard key={homestay.id} homestay={homestay} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="px-8 py-3 rounded-xl font-medium">
              <Plus className="mr-2 h-4 w-4" />
              Xem thêm homestay
            </Button>
          </div>
        </>
      )}
    </main>
  );
}
