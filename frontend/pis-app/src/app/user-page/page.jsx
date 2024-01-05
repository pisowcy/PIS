import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CardContent, Card } from "@/components/ui/card"

export default function Component() {
  return (
    <main className="flex flex-col gap-10 p-4 md:p-6">
      <section className="grid gap-6">
        <h2 className="text-2xl font-bold">User Data</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Avatar className="w-24 h-24 border">
            <AvatarImage alt="User Name" src="/placeholder-user.jpg" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h3 className="font-semibold text-lg md:text-xl">User Name</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">User Bio</p>
          </div>
        </div>
        <Button className="self-center" variant="outline">
          Load More
        </Button>
      </section>
      <section className="grid gap-6">
        <h2 className="text-2xl font-bold">My Reviews</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent>
              <h3 className="font-semibold text-lg md:text-xl">Reviewed Item 1</h3>
              <div className="flex items-center gap-0.5">
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Brief Comment</p>
            </CardContent>
          </Card>
        </div>
        <Button className="self-center" variant="outline">
          Load More
        </Button>
      </section>
      <section className="grid gap-6">
        <h2 className="text-2xl font-bold">Favorites</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent>
              <img
                alt="Favorite Item"
                className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                height={200}
                src="/placeholder.svg"
                width={200}
              />
              <h3 className="font-semibold text-lg md:text-xl">Favorite Item 1</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Item Description</p>
            </CardContent>
          </Card>
        </div>
        <Button className="self-center" variant="outline">
          Load More
        </Button>
      </section>
    </main>
  )
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
  )
}
