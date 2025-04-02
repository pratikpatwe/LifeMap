"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Calendar, CheckCircle, Clock } from "lucide-react"

export function LandingHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Your AI-Powered Life Organizer
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Stop juggling tasks, assignments, and schedules. Let our AI assistant intelligently organize your life.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/#demo">Try Demo</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-square">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg shadow-xl flex items-center justify-center">
                <div className="w-[90%] h-[90%] bg-card rounded-md shadow-lg p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <Brain className="h-5 w-5" />
                    <span>AI Suggestions</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-muted rounded-md">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Complete CS Assignment</p>
                        <p className="text-sm text-muted-foreground">High priority - Due tomorrow</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted rounded-md">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Suggested Focus Time</p>
                        <p className="text-sm text-muted-foreground">2:00 PM - 4:00 PM (Your most productive hours)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted rounded-md">
                      <Calendar className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Workout Session</p>
                        <p className="text-sm text-muted-foreground">Rescheduled to 6:30 PM based on your patterns</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

