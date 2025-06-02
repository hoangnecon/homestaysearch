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
    <section className="bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 pt-16 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
            TÌM KIẾM CƠ SỞ LƯU TRÚ DU LỊCH
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-green-100 mb-6">
            CHO KỲ NGHỈ CỦA BẠN
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-2 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
            {/* Search Input */}
            <div className="lg:col-span-1 relative">
              <div className="flex items-center h-14 px-4 rounded-2xl bg-gray-50 border border-gray-200">
                <Search className="h-5 w-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  value={searchPrompt}
                  onChange={(e) => setSearchPrompt(e.target.value)}
                  placeholder="Nhập homestay, villa, hotel,..."
                  className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* Location Selection */}
            <div className="relative">
              <div className="flex items-center h-14 px-4 rounded-2xl bg-gray-50 border border-gray-200 cursor-pointer">
                <MapPin className="h-5 w-5 text-orange-500 mr-3" />
                <div className="flex-1">
                  <div className="text-xs font-medium text-gray-700">Địa điểm</div>
                  <div className="text-sm text-gray-500">
                    {selectedLocation ? selectedLocation : "Nhập điểm đến"}
                  </div>
                </div>
              </div>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="absolute inset-0 opacity-0">
                  <SelectValue />
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

            {/* Type Selection */}
            <div className="relative">
              <div className="flex items-center h-14 px-4 rounded-2xl bg-gray-50 border border-gray-200 cursor-pointer">
                <Home className="h-5 w-5 text-green-500 mr-3" />
                <div className="flex-1">
                  <div className="text-xs font-medium text-gray-700">Loại hình</div>
                  <div className="text-sm text-gray-500">
                    {selectedType ? selectedType : "Chọn loại hình"}
                  </div>
                </div>
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="absolute inset-0 opacity-0">
                  <SelectValue />
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

            {/* Guests Selection & Search Button */}
            <div className="relative">
              <div className="flex items-center h-14 rounded-2xl overflow-hidden">
                <div className="flex items-center px-4 bg-gray-50 border border-gray-200 border-r-0 rounded-l-2xl flex-1 h-full cursor-pointer">
                  <Users className="h-5 w-5 text-blue-500 mr-3" />
                  <div className="flex-1">
                    <div className="text-xs font-medium text-gray-700">Ở khách</div>
                    <div className="text-sm text-gray-500">
                      {selectedGuests ? selectedGuests : "Số lượng"}
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleAISearch}
                  disabled={isLoading}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 h-14 rounded-r-2xl font-medium text-sm"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Tìm kiếm
                    </>
                  )}
                </Button>
              </div>
              <Select value={selectedGuests} onValueChange={setSelectedGuests}>
                <SelectTrigger className="absolute left-0 top-0 w-3/5 h-full opacity-0">
                  <SelectValue />
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
        </div>
      </div>
    </section>
  );
}
