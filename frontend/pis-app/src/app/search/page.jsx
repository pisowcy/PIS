"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SearchPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://20.229.152.181:5601/actor/_search",
          {
            data: {
              query: {
                match_phrase_prefix: {
                  name: {
                    query: "Zo",
                    slop: 3,
                    max_expansions: 10,
                  },
                },
              },
            },
          }
        );

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Render your data here */}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
