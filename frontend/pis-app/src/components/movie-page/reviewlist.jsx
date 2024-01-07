import { ReviewItem } from "./reviewitem";

export function ReviewList({ reviews }) {
  return (
    <div className="mt-6 mx-auto w-2/3">
      <h3 className="text-lg font-semibold mb-4">Reviews</h3>
      <div className="space-y-4">
        {reviews.map((review, index) => {
          return (
            <ReviewItem
              key={index}
              username={review.username}
              comment={review.comment}
              review={review.review}
            />
          );
        })}
      </div>
    </div>
  );
}
