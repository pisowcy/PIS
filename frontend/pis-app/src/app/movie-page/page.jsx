"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Navbar } from "@/components/navbar";
import { Rating } from "@mui/material";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MoviePage() {
  const [rating, setRating] = React.useState(2);

  return (
    <main className="container mx-auto">
      <Navbar />
      <Card className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:flex dark:bg-gray-800">
        <div className="md:flex">
          <div className="md:flex-shrink-0 ml-6 mt-6">
            <img
              alt="Movie 3 poster"
              className="w-56 h-80 object-cover rounded-md"
              height="600"
              src="/poster-example.jpg"
              style={{
                aspectRatio: "140/200",
                objectFit: "cover",
              }}
              width="420"
            />
            <div className="mt-2 flex items-center">
              <StarIcon className="w-4 h-4 mr-2" />
              <p className="text-base leading-6 text-gray-500 dark:text-gray-300">
                Average Rating: 4.5
              </p>
            </div>
            <div className="mt-2 mb-4 flex items-center">
              <p className="text-base leading-6 text-gray-500 dark:text-gray-300">
                Number of Ratings: 1200
              </p>
            </div>
            <Rating
              name="simple-controlled"
              value={rating}
              size="large"
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </div>
          <div className="p-8">
            <CardHeader>
              <Badge className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                Adventure
              </Badge>

              <h2 className="mt-2 text-2xl leading-7 font-bold text-gray-900 dark:text-white">
                The Great Adventure
              </h2>
              <p className="mt-3 text-base leading-6 text-gray-500 dark:text-gray-300">
                Release Date: 2023-12-28 | Country: USA | Duration: 120 min
              </p>
            </CardHeader>
            <CardContent>
              <p className="mt-3 text-base leading-6 text-gray-500 dark:text-gray-300">
                A group of friends embark on a daring adventure to find a
                treasure map that leads to a powerful secret. But they are not
                the only ones searching for the treasure, and they must outwit
                dangerous rivals who want the treasure for evil purposes.
              </p>
            </CardContent>
            <div className="mt-6 flex items-center">
              <div className="flex-shrink-0">
                <Avatar className="h-10 w-10 rounded-full">
                  <img
                    alt="Creator's Avatar"
                    className="h-full w-full object-cover rounded-full"
                    height="100"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "100/100",
                      objectFit: "cover",
                    }}
                    width="100"
                  />
                </Avatar>
              </div>
              <div className="ml-3">
                <p className="text-sm leading-5 font-medium text-gray-900 dark:text-white">
                  John Doe
                </p>
                <div className="flex text-sm leading-5 text-gray-500 dark:text-gray-300">
                  <span>Director</span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Cast
              </h3>
              <div className="mt-2">
                <ul>
                  <li>Actor 1 as Character 1</li>
                  <li>Actor 2 as Character 2</li>
                  <li>Actor 3 as Character 3</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
}

function StarIcon(props) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
