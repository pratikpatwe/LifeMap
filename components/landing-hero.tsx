"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Calendar, CheckCircle, Clock, Sparkles, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

export function LandingHero() {
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    // Trigger animations after component mounts
    setAnimateIn(true)
  }, [])

  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/5"></div>
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Content side */}
          <div className={`flex flex-col justify-center space-y-6 transition-all duration-700 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
              <Sparkles className="h-4 w-4 mr-2" />
              <span>Intelligent organization, effortless living</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                Your AI-Powered <br />
                <span className="text-primary">Life Organizer</span>
              </h1>
              <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
                Stop juggling tasks, assignments, and schedules. Let our intelligent assistant transform chaos into clarity with personalized organization.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              {/* Using shadcn/ui button defaults instead of custom styling for better dark mode compatibility */}
              <Button asChild size="lg">
                <Link href="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/#demo" className="flex items-center">
                  Watch Demo
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium`}>
                    {["👨‍💻", "👩‍🎓", "👨‍⚕️", "👩‍🔬"][i - 1]}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">5,000+</span> organized lives and counting
              </p>
            </div>
          </div>

          {/* Visual side */}
          <div className={`flex items-center justify-center transition-all duration-1000 delay-300 ${animateIn ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-8 opacity-0 rotate-2'}`}>
            <div className="relative w-full max-w-[520px] aspect-square">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/20 rounded-2xl shadow-xl flex items-center justify-center rotate-1 transform-gpu">
                <div className="w-[92%] h-[92%] bg-card rounded-xl shadow-lg p-6 flex flex-col gap-5 backdrop-blur-sm bg-background/95">
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <Brain className="h-5 w-5" />
                    <span>AI Suggestions</span>
                    <span className="ml-auto px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">Smart Prioritization</span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-muted/80 rounded-lg transition-all hover:shadow-md hover:-translate-y-0.5 duration-300 cursor-pointer border border-transparent hover:border-primary/10">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium">Complete CS Assignment</p>
                          <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Due soon</span>
                        </div>
                        <p className="text-sm text-muted-foreground">High priority - Due tomorrow</p>
                        <div className="w-full bg-muted mt-2 rounded-full h-1.5">
                          <div className="bg-primary h-1.5 rounded-full" style={{ width: "70%" }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-muted/80 rounded-lg transition-all hover:shadow-md hover:-translate-y-0.5 duration-300 cursor-pointer border border-transparent hover:border-primary/10">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Suggested Focus Time</p>
                        <p className="text-sm text-muted-foreground">2:00 PM - 4:00 PM (Your most productive hours)</p>
                        <div className="mt-1 flex gap-1">
                          {[1, 2, 3, 4, 5, 6].map((hour) => (
                            <div key={hour} className={`h-1 flex-1 rounded-full ${hour === 3 || hour === 4 ? 'bg-primary' : 'bg-muted-foreground/30'}`}></div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-muted/80 rounded-lg transition-all hover:shadow-md hover:-translate-y-0.5 duration-300 cursor-pointer border border-transparent hover:border-primary/10">
                      <Calendar className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Workout Session</p>
                        <p className="text-sm text-muted-foreground">Rescheduled to 6:30 PM based on your patterns</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="px-2 py-0.5 rounded-md bg-secondary/10 text-secondary text-xs">
                            Based on your fitness goals
                          </div>
                        </div>
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