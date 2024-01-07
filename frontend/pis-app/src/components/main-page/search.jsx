"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Search() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        console.log(searchTerm)
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        router.push(`/search/${searchTerm}`);
    }
    return (
        <section className="relative w-full h-96">
            <img
            alt="Cinematic background"
            className="object-cover h-full w-full"
            height="768"
            src="https://wallpaperaccess.com/full/229832.jpg"
            style={{
                aspectRatio: "1366/768",
                objectFit: "cover",
            }}
            width="1366"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white">
                    Cinemania - all your movies in one place
                    </h1>
                    <p className="text-lg text-white mt-2">
                    Explore and rate your favourite productions
                    </p>
                    <div className="mt-4 relative">
                    <form onSubmit={handleSearchSubmit} className="flex">
                        <input
                        className="w-full py-2 px-4 rounded-l-md text-black"
                        placeholder="Search for a movie"
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        />
                        <button
                        type="submit"
                        className="bg-white hover:bg-blue-500 text-white py-2 px-4 rounded-r-md"
                        >
                        🔎
                        </button>
                    </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
