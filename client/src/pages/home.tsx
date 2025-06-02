import Header from "@/components/header";
import HeroSearch from "@/components/hero-search";
import QuickFilters from "@/components/quick-filters";
import HomestayGrid from "@/components/homestay-grid";
import FeaturedHomestays from "@/components/featured-homestays";
import PopularAreas from "@/components/popular-areas";
import Footer from "@/components/footer";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState<string | undefined>();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSearch onSearch={setSearchQuery} />
      <QuickFilters selectedArea={selectedArea} onAreaSelect={setSelectedArea} />
      <HomestayGrid searchQuery={searchQuery} selectedArea={selectedArea} />
      {!searchQuery && !selectedArea && (
        <>
          <FeaturedHomestays />
          <PopularAreas />
        </>
      )}
      <Footer />
    </div>
  );
}
