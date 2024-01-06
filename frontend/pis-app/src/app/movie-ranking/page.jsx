"use client";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Ranking } from "@/components/movie-ranking/ranking";

export default function MovieRanking() {
  return (
    <main>
    <Navbar />
    <div className="mx-auto px-4 md:px-6 max-w-7xl grid gap-12 flex justify-center">
      <Card className="w-full">
        <CardHeader>
          <h2 className="text-2xl font-bold">Top Movies</h2>
        </CardHeader>
        <CardContent>
          <Ranking />
        </CardContent>
      </Card>
    </div>
    </main>
  );
}
