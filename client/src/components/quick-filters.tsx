import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface QuickFiltersProps {
  selectedArea?: string;
  onAreaSelect: (area: string) => void;
}

const popularAreas = [
  "Mỹ Khê",
  "Hải Châu", 
  "An Thượng",
  "Sơn Trà",
  "Ngũ Hành Sơn"
];

export default function QuickFilters({ selectedArea, onAreaSelect }: QuickFiltersProps) {
  return (
    <section className="bg-white py-8 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3 justify-center">
          <span className="text-gray-600 font-medium mr-4 hidden sm:inline">
            Khu vực phổ biến:
          </span>
          {popularAreas.map((area) => (
            <Button
              key={area}
              variant={selectedArea === area ? "default" : "outline"}
              size="sm"
              onClick={() => onAreaSelect(area)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                selectedArea === area
                  ? "bg-primary text-white border-primary"
                  : "bg-gray-100 hover:bg-primary/10 hover:text-primary text-gray-700 border-gray-200 hover:border-primary/30"
              }`}
            >
              <MapPin className="mr-1 h-3 w-3" />
              {area}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
