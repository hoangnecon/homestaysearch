import { Home } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Home className="text-white text-sm" />
              </div>
              <h3 className="text-xl font-bold">Homestay AI Đà Nẵng</h3>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Tìm homestay lý tưởng với công nghệ AI. Chúng tôi giúp bạn khám phá những nơi lưu trú tuyệt vời nhất tại Đà Nẵng.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Khu vực</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Mỹ Khê</a></li>
              <li><a href="#" className="hover:text-white transition-colors">An Thượng</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hải Châu</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sơn Trà</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ngũ Hành Sơn</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Trợ giúp</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Liên hệ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chính sách</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Điều khoản</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Homestay AI Đà Nẵng. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
