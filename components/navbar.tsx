"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { useAuth, UserButton } from "@clerk/nextjs"

const routes = [
  {
    label: "Home",
    href: "/",
    public: true,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    public: false,
  },
  {
    label: "Tasks",
    href: "/tasks",
    public: false,
  },
  {
    label: "Calendar",
    href: "/calendar",
    public: false,
  },
  {
    label: "Assistant",
    href: "/assistant",
    public: false,
  },
]

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isSignedIn } = useAuth()

  // Filter routes based on authentication status and current path
  const filteredRoutes = routes.filter((route) => {
    // Hide Home link when on homepage
    if (route.href === "/" && pathname === "/") {
      return false
    }
    // Show only routes that are public or user is signed in
    return route.public || isSignedIn
  })

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">Lifemap</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {filteredRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === route.href ? "text-primary" : "text-muted-foreground",
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <ModeToggle />
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <>
              <Button asChild size="sm">
                <Link href="/sign-in">Login</Link>
              </Button>
              <Button asChild variant="default" size="sm">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <ModeToggle />
          {isSignedIn && <UserButton afterSignOutUrl="/" />}
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t py-4">
          <div className="container flex flex-col space-y-3">
            {filteredRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary p-2 rounded-md",
                  pathname === route.href ? "text-primary bg-muted" : "text-muted-foreground",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.label}
              </Link>
            ))}
            {!isSignedIn && (
              <div className="flex flex-col gap-2 pt-2 border-t">
                <Button asChild size="sm">
                  <Link href="/sign-in">Login</Link>
                </Button>
                <Button asChild variant="default" size="sm">
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}