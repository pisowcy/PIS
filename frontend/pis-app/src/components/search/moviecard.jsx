"use client";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import Link from "next/link";

export function MovieCard({
    id,
    title,
    premiere_date,
    genre,
    duration,
    description
}) {
    return (
        <Link href={`/movie-page/${id}`}>
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>Release Date: {premiere_date}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Genre: {genre}</p>
                    <p>Runtime: {duration} minutes</p>
                    <p>{description}</p>
                </CardContent>
            </Card>
        </Link>
    )
}