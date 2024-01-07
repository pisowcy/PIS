import { Navbar } from "@/components/navbar";
import Link from "next/link";

export function NoContentPage() {
  return (
    <main>
      <Navbar />
      <div className="h-screen flex flex-col items-center justify-center bg-white">
      <p className="text-xl font-light text-black mb-4">This page has no content</p>
      <Link className="text-2xl font-bold text-black hover:underline" href="/">
        Go back to the main page
      </Link>
      </div>
    </main>
  );
}