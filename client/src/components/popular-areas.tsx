import { MapPin, Star, Users, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const popularAreas = [
  {
    id: 1,
    name: "Mỹ Khê",
    description: "Bãi biển đẹp nhất Đà Nẵng với cát trắng mịn và sóng êm",
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    highlights: ["Bãi biển đẹp", "Gần trung tâm", "Ẩm thực phong phú"],
    homestayCount: 45,
    avgRating: 4.7
  },
  {
    id: 2,
    name: "An Thượng",
    description: "Khu phố Tây sôi động với nhiều quán bar, café và nhà hàng",
    imageUrl: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    highlights: ["Phố Tây", "Nightlife sôi động", "Café đẹp"],
    homestayCount: 32,
    avgRating: 4.6
  },
  {
    id: 3,
    name: "Hải Châu",
    description: "Trung tâm thành phố với nhiều địa điểm mua sắm và văn hóa",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    highlights: ["Trung tâm TP", "Mua sắm", "Giao thông thuận lợi"],
    homestayCount: 38,
    avgRating: 4.5
  },
  {
    id: 4,
    name: "Sơn Trà",
    description: "Bán đảo xanh mát với thiên nhiên hoang sơ và view biển tuyệt đẹp",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    highlights: ["Thiên nhiên", "View đẹp", "Không khí trong lành"],
    homestayCount: 18,
    avgRating: 4.8
  },
  {
    id: 5,
    name: "Ngũ Hành Sơn",
    description: "Khu vực linh thiêng với động Thủy Sơn và làng đá Non Nước",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    highlights: ["Di tích lịch sử", "Núi Thủy Sơn", "Làng đá"],
    homestayCount: 25,
    avgRating: 4.4
  },
  {
    id: 6,
    name: "Thanh Khê",
    description: "Khu dân cư yên tĩnh, phù hợp cho gia đình và lưu trú dài hạn",
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    highlights: ["Yên tĩnh", "Giá tốt", "Phù hợp gia đình"],
    homestayCount: 22,
    avgRating: 4.3
  }
];

export default function PopularAreas() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="text-primary mr-2 h-6 w-6" />
            <h2 className="text-3xl font-bold text-gray-900">Top Địa Điểm Hay Ở Đà Nẵng</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Khám phá những khu vực du lịch hấp dẫn nhất với đặc trưng riêng biệt
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {popularAreas.map((area) => (
            <Card key={area.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
              <div className="relative overflow-hidden">
                <img
                  src={area.imageUrl}
                  alt={area.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                <div className="absolute top-3 right-3">
                  <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                    <Camera className="inline h-3 w-3 mr-1" />
                    {area.homestayCount} homestay
                  </div>
                </div>
              </div>
              
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-xl text-gray-900">{area.name}</h3>
                  <div className="flex items-center text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-gray-700 text-sm ml-1">{area.avgRating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {area.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {area.highlights.map((highlight, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Users className="h-4 w-4 mr-1" />
                    {area.homestayCount} lựa chọn
                  </div>
                  <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                    Khám phá
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button className="bg-primary hover:bg-primary/90 px-8 py-3 rounded-full font-medium">
            Xem tất cả khu vực
          </Button>
        </div>
      </div>
    </section>
  );
}