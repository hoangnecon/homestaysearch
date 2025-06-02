import { homestays, users, type User, type InsertUser, type Homestay, type InsertHomestay } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllHomestays(): Promise<Homestay[]>;
  getHomestayById(id: number): Promise<Homestay | undefined>;
  getHomestaysByArea(area: string): Promise<Homestay[]>;
  searchHomestays(query: string, area?: string, minPrice?: number, maxPrice?: number): Promise<Homestay[]>;
  createHomestay(homestay: InsertHomestay): Promise<Homestay>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private homestays: Map<number, Homestay>;
  private currentUserId: number;
  private currentHomestayId: number;

  constructor() {
    this.users = new Map();
    this.homestays = new Map();
    this.currentUserId = 1;
    this.currentHomestayId = 1;
    
    // Initialize with sample Da Nang homestays
    this.initializeHomestays();
  }

  private async initializeHomestays() {
    const sampleHomestays: InsertHomestay[] = [
      {
        name: "Coastal Villa Mỹ Khê",
        description: "Villa sang trọng với view biển tuyệt đẹp, chỉ 2 phút đi bộ đến bãi biển Mỹ Khê",
        location: "Mỹ Khê, Ngũ Hành Sơn",
        area: "Mỹ Khê",
        price: 800000,
        rating: "4.8",
        imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        amenities: ["WiFi miễn phí", "Điều hòa", "Bếp", "View biển"],
        tags: ["Gần biển", "Sang trọng", "Cặp đôi"],
        isAvailable: true
      },
      {
        name: "Heritage House Hải Châu",
        description: "Nhà truyền thống được cải tạo hiện đại, giữ nguyên nét văn hóa Việt Nam",
        location: "Hải Châu, Trung tâm",
        area: "Hải Châu",
        price: 450000,
        rating: "4.6",
        imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        amenities: ["WiFi miễn phí", "Điều hòa", "Bếp", "Máy giặt"],
        tags: ["Truyền thống", "Trung tâm", "Văn hóa"],
        isAvailable: true
      },
      {
        name: "Minimal Studio An Thượng",
        description: "Studio hiện đại, thiết kế tối giản, gần khu ẩm thực An Thượng sôi động",
        location: "An Thượng, Ngũ Hành Sơn",
        area: "An Thượng",
        price: 600000,
        rating: "4.9",
        imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        amenities: ["WiFi miễn phí", "Điều hòa", "Bếp nhỏ", "Gần ẩm thực"],
        tags: ["Hiện đại", "Tối giản", "Ẩm thực"],
        isAvailable: true
      },
      {
        name: "Garden Villa Sơn Trà",
        description: "Villa có hồ bơi riêng, vườn xanh tươi mát, view núi Sơn Trà hùng vĩ",
        location: "Sơn Trà, Thọ Quang",
        area: "Sơn Trà",
        price: 1200000,
        rating: "4.7",
        imageUrl: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        amenities: ["WiFi miễn phí", "Điều hòa", "Hồ bơi", "Vườn", "BBQ"],
        tags: ["Có hồ bơi", "Vườn", "Núi"],
        isAvailable: true
      },
      {
        name: "Cozy Family Home",
        description: "Nhà gia đình ấm cúng, có bếp đầy đủ, phù hợp cho nhóm bạn và gia đình",
        location: "Thanh Khê, Gần trung tâm",
        area: "Thanh Khê",
        price: 350000,
        rating: "4.5",
        imageUrl: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        amenities: ["WiFi miễn phí", "Điều hòa", "Bếp đầy đủ", "Máy giặt"],
        tags: ["Gia đình", "Nhóm bạn", "Tiết kiệm"],
        isAvailable: true
      },
      {
        name: "Sky Penthouse",
        description: "Penthouse cao cấp với view 360° toàn thành phố và biển, tiện nghi 5 sao",
        location: "Hải Châu, Trung tâm",
        area: "Hải Châu",
        price: 2500000,
        rating: "5.0",
        imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        amenities: ["WiFi miễn phí", "Điều hòa", "View 360°", "Gym", "Concierge"],
        tags: ["Sang trọng", "Penthouse", "View đẹp"],
        isAvailable: true
      },
      {
        name: "Art House Boutique",
        description: "Homestay phong cách boutique với nội thất nghệ thuật độc đáo",
        location: "An Thượng, Bãi biển",
        area: "An Thượng",
        price: 750000,
        rating: "4.8",
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        amenities: ["WiFi miễn phí", "Điều hòa", "Nội thất độc đáo", "Gần biển"],
        tags: ["Nghệ thuật", "Boutique", "Độc đáo"],
        isAvailable: true
      },
      {
        name: "Dragon Bridge Hostel",
        description: "Không gian chung thân thiện, gần Cầu Rồng, phù hợp cho du khách bụi",
        location: "Hải Châu, Cầu Rồng",
        area: "Hải Châu",
        price: 200000,
        rating: "4.3",
        imageUrl: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        amenities: ["WiFi miễn phí", "Điều hòa", "Không gian chung", "Bếp chung"],
        tags: ["Tiết kiệm", "Du khách bụi", "Thân thiện"],
        isAvailable: true
      }
    ];

    for (const homestay of sampleHomestays) {
      await this.createHomestay(homestay);
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllHomestays(): Promise<Homestay[]> {
    return Array.from(this.homestays.values()).filter(h => h.isAvailable);
  }

  async getHomestayById(id: number): Promise<Homestay | undefined> {
    return this.homestays.get(id);
  }

  async getHomestaysByArea(area: string): Promise<Homestay[]> {
    return Array.from(this.homestays.values()).filter(
      h => h.isAvailable && h.area.toLowerCase().includes(area.toLowerCase())
    );
  }

  async searchHomestays(query: string, area?: string, minPrice?: number, maxPrice?: number): Promise<Homestay[]> {
    const allHomestays = Array.from(this.homestays.values()).filter(h => h.isAvailable);
    
    return allHomestays.filter(homestay => {
      // Text search in name, description, tags, and amenities
      const searchableText = [
        homestay.name,
        homestay.description,
        homestay.location,
        homestay.area,
        ...homestay.tags,
        ...homestay.amenities
      ].join(' ').toLowerCase();
      
      const queryWords = query.toLowerCase().split(' ');
      const matchesQuery = queryWords.some(word => searchableText.includes(word));
      
      // Area filter
      const matchesArea = !area || homestay.area.toLowerCase().includes(area.toLowerCase());
      
      // Price filters
      const matchesMinPrice = !minPrice || homestay.price >= minPrice;
      const matchesMaxPrice = !maxPrice || homestay.price <= maxPrice;
      
      return matchesQuery && matchesArea && matchesMinPrice && matchesMaxPrice;
    });
  }

  async createHomestay(insertHomestay: InsertHomestay): Promise<Homestay> {
    const id = this.currentHomestayId++;
    const homestay: Homestay = { ...insertHomestay, id };
    this.homestays.set(id, homestay);
    return homestay;
  }
}

export const storage = new MemStorage();
