"use client";
import { CardContent, Card } from "@/components/ui/card"
import { useState, useEffect } from "react"
import Link from "next/link";


export function FavoriteCard({ productionId }) {
    console.log(productionId)
    const [production, setProduction] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            let productionData;
            try {
            const responseProduction = await fetch(`http://20.229.152.181/productions/${productionId}`);
            if (!responseProduction.ok) {
                throw new Error(`HTTP error! Status: ${responseProduction.status}`);
            }
            productionData = await responseProduction.json();

            } catch (error) {
            console.
            error("Error fetching data:", error);
            }
            setProduction(productionData)
        };

        fetchData();
        }, []);

    return (
        <Link href={`/movie-page/${production.id}`}>
        <Card style={{ maxWidth: '300px'}}>
        <CardContent>
        <img
        alt="Favorite Item 3"
        className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
        max-height="200"
        src="https://pisstorage2.blob.core.windows.net/static/poster_example.jpg"
        max-width="200"
        />
        <h3 className="font-semibold text-lg md:text-xl">{production.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{production.description}</p>
        </CardContent>
        </Card>
        </Link>
    )
}