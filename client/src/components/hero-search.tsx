import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Sparkles, MapPin, Home, Users } from "lucide-react";

interface HeroSearchProps {
  onSearch: (query: string) => void;
}

export default function HeroSearch({ onSearch }: HeroSearchProps) {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedGuests, setSelectedGuests] = useState("");

  const handleAISearch = async () => {
    if (!searchPrompt.trim()) {
      alert("Vui lòng nhập mô tả homestay bạn muốn tìm!");
      return;
    }

    setIsLoading(true);
    try {
      onSearch(searchPrompt);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickSearch = () => {
    console.log("Opening quick filter modal");
  };

  return (
    <section className="bg-gradient-to-br from-primary via-primary to-orange-600 pt-12 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Tìm Homestay Đà Nẵng
        </h1>
        <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
          Sử dụng AI để tìm homestay phù hợp với mong muốn của bạn. Chỉ cần mô tả những gì bạn cần!
        </p>

        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            {/* Quick Selection Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <Label className="block text-left text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline w-4 h-4 text-primary mr-2" />
                  Địa điểm
                </Label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Nhiều điểm đến" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="my-khe">Mỹ Khê</SelectItem>
                    <SelectItem value="hai-chau">Hải Châu</SelectItem>
                    <SelectItem value="an-thuong">An Thượng</SelectItem>
                    <SelectItem value="son-tra">Sơn Trà</SelectItem>
                    <SelectItem value="ngu-hanh-son">Ngũ Hành Sơn</SelectItem>
                    <SelectItem value="thanh-khe">Thanh Khê</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="block text-left text-sm font-medium text-gray-700 mb-2">
                  <Home className="inline w-4 h-4 text-primary mr-2" />
                  Loại hình
                </Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn loại hình" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="apartment">Căn hộ</SelectItem>
                    <SelectItem value="house">Nhà nguyên căn</SelectItem>
                    <SelectItem value="room">Phòng riêng</SelectItem>
                    <SelectItem value="hostel">Hostel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="block text-left text-sm font-medium text-gray-700 mb-2">
                  <Users className="inline w-4 h-4 text-primary mr-2" />
                  Ở khách
                </Label>
                <Select value={selectedGuests} onValueChange={setSelectedGuests}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Số lượng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 khách</SelectItem>
                    <SelectItem value="2">2 khách</SelectItem>
                    <SelectItem value="3">3 khách</SelectItem>
                    <SelectItem value="4">4 khách</SelectItem>
                    <SelectItem value="5">5 khách</SelectItem>
                    <SelectItem value="6+">6+ khách</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="search-prompt" className="block text-left text-sm font-medium text-gray-700 mb-3">
                <Sparkles className="inline w-4 h-4 text-primary mr-2" />
                Mô tả homestay bạn mong muốn
              </Label>
              <Textarea
                id="search-prompt"
                value={searchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}
                placeholder="Ví dụ: Tôi muốn tìm homestay gần biển Mỹ Khê, có view đẹp, giá khoảng 500k/đêm, phù hợp cho cặp đôi, có không gian riêng tư..."
                className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-gray-700 placeholder-gray-400 text-base"
                rows={4}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAISearch}
                disabled={isLoading}
                className="flex-1 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl h-auto"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Đang tìm kiếm...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Tìm với AI
                  </>
                )}
              </Button>
              <Button
                onClick={handleQuickSearch}
                variant="secondary"
                className="sm:w-auto bg-secondary hover:bg-secondary/90 text-white px-6 py-4 rounded-xl font-medium transition-colors h-auto"
              >
                <Filter className="mr-2 h-4 w-4" />
                Lọc nhanh
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
