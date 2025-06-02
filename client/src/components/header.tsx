import { Home, Heart, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <Home className="text-white h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ohdidi</h1>
                <p className="text-xs text-gray-500">Homestay Đà Nẵng</p>
              </div>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors font-medium text-sm">
              Xu hướng
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors font-medium text-sm">
              Video review
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors font-medium text-sm">
              Homestay
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors font-medium text-sm">
              Villa
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors font-medium text-sm">
              Resort
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors font-medium text-sm">
              Khách sạn
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            <Button 
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Thêm lưu trú
            </Button>
            <Button 
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Đăng nhập/Đăng ký
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
