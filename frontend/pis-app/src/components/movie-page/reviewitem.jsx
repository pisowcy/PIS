import { AvatarFallback, Avatar } from "@/components/ui/avatar";


export function ReviewItem({ username, comment, review }) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Avatar>
            {/* <AvatarImage
              alt="User profile"
              src="/placeholder.svg?height=40&width=40"
            /> */}
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{username}</p>
            <p className="text-xs text-gray-600">
              {review} {review === 1 ? "star" : "stars"}
            </p>
          </div>
        </div>
        <p>{comment}</p>
      </div>
    );
  }