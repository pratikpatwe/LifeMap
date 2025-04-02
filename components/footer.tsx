import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col md:flex-row items-center justify-between py-10 md:py-8">
        <div className="flex flex-col items-center md:items-start gap-4 md:gap-2">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">Lifemap</span>
          </Link>
          <p className="text-sm text-muted-foreground text-center md:text-left">
            Your AI-powered life organizer. Simplify your day, achieve more.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-6 md:mt-0">
          <nav className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary">
              About
            </Link>
            <Link href="/features" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Pricing
            </Link>
            <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Blog
            </Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Contact
            </Link>
          </nav>
        </div>
      </div>
      <div className="container border-t py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© 2025 Lifemap. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

