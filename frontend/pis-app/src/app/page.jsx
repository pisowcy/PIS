"use client";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/main-page/footer";
import { MovieCards } from "@/components/main-page/moviecards";
import { Search } from "@/components/main-page/search";

export default function HomePage() {
  return (
    <main
      className="flex flex-col min-h-screen bg-gray-100"
      data-testid="home-page"
    >
      <Navbar />
      <div className="flex-1">
        <Search />
        <MovieCards />
      </div>
      <Footer />
    </main>
  );
}
