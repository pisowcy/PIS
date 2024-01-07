"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { LoadingAnimation } from "@/components/loadinganimation";
import { MovieCards } from "@/components/search/moviecards";
import { SearchForm } from "@/components/search/searchform";

export default function Component({ params }) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        const url = "http://20.229.152.181:9200/production/_search";
        const requestData = {
            query: {
              multi_match: {
                query: params.query,
                type: "phrase_prefix",
                fields: ["description", "title", "country", "genre"],
                slop: 3,
                max_expansions: 10,
              },
            },
        };
        const config = {
            auth: {
              username: "admin",
              password: "admin",
            },
            headers: {
              "Content-Type": "application/json",
            },
        };
  
        try {
          const response = await axios.post(url, requestData, config);
          const movies = response.data.hits.hits.map((hit) => hit._source);
          setData(movies);
        } catch (error) {
          console.error("Error fetching data: ", error);
        } finally {
            setIsLoading(false);
        }
      };
  
      fetchData();
    }, []);

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <SearchForm query={params.query} />
            {isLoading ? (
                <LoadingAnimation />
            ) : data.length > 0 ? (
                <MovieCards movies={data}/>
            ) : (
                <p>No results for this query</p>
            )}
        </div>
    );
}
