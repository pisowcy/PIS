"use client";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState} from "react";
import { useRouter } from "next/navigation";

export function SearchForm({ query }) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        router.push(`/search/${searchTerm}`);
    }

    return (
        <div className="flex items-center gap-4">
            <form onSubmit={handleSearchSubmit}>
                <Input className="flex-grow" placeholder={query} onChange={handleSearchChange} />
                <Button>Search</Button>
            </form>
        </div>
    )
}