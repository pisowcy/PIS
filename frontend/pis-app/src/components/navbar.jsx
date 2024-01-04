import React from "react";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="py-4 px-6 bg-white shadow">
      <div className="flex items-center justify-between">
        <Link href="/">
          <span className="text-xl font-bold text-black">Cinemania</span>
        </Link>
        <div className="flex items-center justify-end gap-4">
          <nav className="flex gap-4">
            <Link
              className="text-sm font-medium text-gray-700 hover:underline"
              href="/movie-ranking"
            >
              Top Movies
            </Link>
            <Link
              className="text-sm font-medium text-gray-700 hover:underline"
              href="/sign-up"
            >
              Sign Up
            </Link>
          </nav>
          <Link href="/sign-in">
            <UserIcon className="w-4 h-4 text-gray-500" />
          </Link>
        </div>
      </div>
    </header>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
