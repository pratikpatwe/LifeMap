import { LandingHero } from "@/components/landing-hero"
import { Features } from "@/components/features"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <LandingHero />
        <Features />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}

