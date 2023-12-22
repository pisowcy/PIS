import { HomePage } from "@/components/home-page"
import { Navbar } from "@/components/navbar"


export default function Page() {
  return (
    <div data-testid="home-page">
      <Navbar />
      <HomePage />
    </div>
  )
}
