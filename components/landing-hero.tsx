"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Calendar, CheckCircle, Clock, Sparkles, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function LandingHero() {
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    // Trigger animations after component mounts
    setAnimateIn(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: custom * 0.1 + 0.4
      }
    })
  }

  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden" style={{ height: "calc(100vh - 50px)" }}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/5"></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"
      ></motion.div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Content side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center space-y-6"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2 w-fit"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              <span>Intelligent organization, effortless living</span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                variants={itemVariants}
                className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80"
              >
                Your AI-Powered <br />
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-primary"
                >
                  Life Organizer
                </motion.span>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="max-w-[600px] text-lg text-muted-foreground md:text-xl"
              >
                Stop juggling tasks, assignments, and schedules. Let our intelligent assistant transform chaos into clarity with personalized organization.
              </motion.p>
            </div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 mt-2"
            >
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
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-6 pt-4"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + (i * 0.1), duration: 0.4 }}
                    className={`w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium`}
                  >
                    {["👨‍💻", "👩‍🎓", "👨‍⚕️", "👩‍🔬"][i - 1]}
                  </motion.div>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="text-sm text-muted-foreground"
              >
                <span className="font-medium text-foreground">5,000+</span> organized lives and counting
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-[520px] aspect-square">
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/20 rounded-2xl shadow-xl flex items-center justify-center rotate-1 transform-gpu"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="w-[92%] h-[92%] rounded-xl shadow-lg p-6 flex flex-col gap-5 backdrop-blur-sm bg-background/95"
                >
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    className="flex items-center gap-2 text-primary font-semibold"
                  >
                    <Brain className="h-5 w-5" />
                    <span>AI Suggestions</span>
                    <span className="ml-auto px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">Smart Prioritization</span>
                  </motion.div>

                  <div className="space-y-4">
                    <motion.div
                      custom={0}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ y: -4, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", transition: { duration: 0.2 } }}
                      className="flex items-start gap-3 p-4 bg-muted/80 rounded-lg transition-all cursor-pointer border border-transparent hover:border-primary/10"
                    >
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium">Complete CS Assignment</p>
                          <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Due soon</span>
                        </div>
                        <p className="text-sm text-muted-foreground">High priority - Due tomorrow</p>
                        <div className="w-full bg-muted mt-2 rounded-full h-1.5">
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "70%" }}
                            transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }}
                            className="bg-primary h-1.5 rounded-full"
                          ></motion.div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      custom={1}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ y: -4, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", transition: { duration: 0.2 } }}
                      className="flex items-start gap-3 p-4 bg-muted/80 rounded-lg transition-all cursor-pointer border border-transparent hover:border-primary/10"
                    >
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Suggested Focus Time</p>
                        <p className="text-sm text-muted-foreground">2:00 PM - 4:00 PM (Your most productive hours)</p>
                        <div className="mt-1 flex gap-1">
                          {[1, 2, 3, 4, 5, 6].map((hour) => (
                            <motion.div
                              key={hour}
                              initial={{ scaleY: 0 }}
                              animate={{ scaleY: 1 }}
                              transition={{ duration: 0.4, delay: 1.8 + (hour * 0.1) }}
                              className={`h-1 flex-1 rounded-full ${hour === 3 || hour === 4 ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                              style={{ transformOrigin: "bottom" }}
                            ></motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      custom={2}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ y: -4, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", transition: { duration: 0.2 } }}
                      className="flex items-start gap-3 p-4 bg-muted/80 rounded-lg transition-all cursor-pointer border border-transparent hover:border-primary/10"
                    >
                      <Calendar className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Workout Session</p>
                        <p className="text-sm text-muted-foreground">Rescheduled to 6:30 PM based on your patterns</p>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 2.2, duration: 0.5 }}
                          className="flex items-center gap-2 mt-1"
                        >
                          <div className="px-2 py-0.5 rounded-md bg-secondary/10 text-secondary text-xs">
                            Based on your fitness goals
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}