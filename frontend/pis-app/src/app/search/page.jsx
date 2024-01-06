"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Page = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://20.229.152.181:9200/actor/_search";
      const requestData = {
        query: {
          match_phrase_prefix: {
            name: {
              query: "Zo",
              slop: 3,
              max_expansions: 10,
            },
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
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Actor Data</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>No data</p>}
    </div>
  );
};

export default Page;
