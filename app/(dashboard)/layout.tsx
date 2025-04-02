import type React from "react"
import { Navbar } from "@/components/navbar"
import { FirebaseProvider } from "@/contexts/firebase-context"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <FirebaseProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
      </div>
    </FirebaseProvider>
  )
}

