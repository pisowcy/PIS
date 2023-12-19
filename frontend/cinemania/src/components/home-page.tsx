import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { CardHeader, CardContent, Card } from "@/components/ui/card"

export function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="py-4 px-6 bg-white shadow">
        <div className="flex items-center justify-between">
          <Link href="#">
            <span className="text-xl font-bold">Cinemania</span>
          </Link>
          <nav className="ml-auto flex gap-4">
            <Link className="text-sm font-medium hover:underline" href="#">
              Discover
            </Link>
            <Link className="text-sm font-medium hover:underline" href="#">
              Trending
            </Link>
            <Link className="text-sm font-medium hover:underline" href="#">
              Ratings
            </Link>
            <Link className="text-sm font-medium hover:underline" href="#">
              About
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative w-full h-96">
          <img
            alt="Cinematic background"
            className="object-cover h-full w-full"
            height="768"
            src="/placeholder.svg"
            style={{
              aspectRatio: "1366/768",
              objectFit: "cover",
            }}
            width="1366"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white">Welcome to Cinemania</h1>
              <p className="text-lg text-white mt-2">Find and rate your favorite movies</p>
              <div className="mt-4">
                <input className="w-64 py-2 px-4 rounded-md" placeholder="Search for a movie" type="text" />
              </div>
            </div>
          </div>
        </section>
        <section className="px-6 py-12">
          <h2 className="text-2xl font-bold mb-6">Trending Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-bold">Movie Title</h3>
                <Badge>8.4</Badge>
              </CardHeader>
              <CardContent>
                <img
                  alt="Movie poster"
                  className="w-full h-64 object-cover"
                  height="200"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "200/200",
                    objectFit: "cover",
                  }}
                  width="200"
                />
                <p className="mt-4">Movie description...</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <footer className="py-4 px-6 bg-white shadow-t">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">© Cinemania. All rights reserved.</p>
          <nav className="flex gap-4">
            <Link className="text-sm text-gray-500 hover:underline" href="#">
              Privacy Policy
            </Link>
            <Link className="text-sm text-gray-500 hover:underline" href="#">
              Terms of Service
            </Link>
          </nav>
        </div>
        <div className="flex items-center justify-center mt-4 space-x-4">
          <Link href="#">
            <FacebookIcon className="w-4 h-4" />
          </Link>
          <Link href="#">
            <TwitterIcon className="w-4 h-4" />
          </Link>
          <Link href="#">
            <InstagramIcon className="w-4 h-4" />
          </Link>
        </div>
      </footer>
    </div>
  )
}


function FacebookIcon(props) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function TwitterIcon(props) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}


function InstagramIcon(props) {
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
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}
