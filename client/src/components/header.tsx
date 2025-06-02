import { Home, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Home className="text-white text-sm" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Homestay AI</h1>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-primary transition-colors font-medium">
              Trang chủ
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors font-medium">
              Về chúng tôi
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors font-medium">
              Liên hệ
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4" />
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              Đăng ký
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
