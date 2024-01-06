import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Rating } from "@mui/material";

export function ReviewForm({ movieId }) {
    const [newReview, setNewReview] = useState("");
    const [rating, setRating] = useState(0);
  
    const handleReviewChange = (event) => {
      console.log("change:", event.target.value);
      setNewReview(event.target.value);
    };
  
    const handleReviewSubmit = async (event) => {
      event.preventDefault();
      console.log("New review:", newReview);
  
      try {
        const response = await fetch("http://20.229.152.181/reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            review: rating,
            comment: newReview,
            user: 1,
            production: movieId,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        alert("Your review has been successfully added!");
        window.location.reload();
      } catch (error) {
        console.error("Error posting review:", error);
      }
    };
  
    return (
      <div className="mt-6 mx-auto w-2/3">
        <h3 className="text-lg font-semibold mb-2">Write a review:</h3>
        <Rating
          name="simple-controlled"
          value={rating}
          size="large"
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
        <form className="flex flex-col space-y-4" onSubmit={handleReviewSubmit}>
          <Textarea
            placeholder="Type your review here."
            onChange={handleReviewChange}
          />
          <Button
            className="w-1/2 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded mx-auto"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }