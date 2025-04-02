"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, CheckCircle, Clock, Calendar, ArrowRight } from "lucide-react"
import { useFirebase } from "@/contexts/firebase-context"
import { generateTaskPriorities } from "@/lib/gemini"
import { Skeleton } from "@/components/ui/skeleton"

type Suggestion = {
  id: string
  type: "task" | "focus" | "reschedule"
  icon: React.ReactNode
  title: string
  description: string
  action: string
}

export function AiSuggestions() {
  const { tasks, loading } = useFirebase()
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading && tasks.length > 0) {
      generateSuggestions()
    } else if (!loading && tasks.length === 0) {
      setIsLoading(false)
    }
  }, [tasks, loading])

  const generateSuggestions = async () => {
    setIsLoading(true)
    try {
      // Get AI-generated task priorities
      const priorities = await generateTaskPriorities(tasks)

      // Create suggestions based on the AI response
      const newSuggestions: Suggestion[] = []

      // Add task suggestions
      if (priorities.prioritizedTasks && priorities.prioritizedTasks.length > 0) {
        const topTask = priorities.prioritizedTasks[0]
        const task = tasks.find((t) => t.id === topTask.id)

        if (task) {
          newSuggestions.push({
            id: "1",
            type: "task",
            icon: <CheckCircle className="h-5 w-5 text-primary" />,
            title: task.title,
            description: topTask.reason || `This is your highest priority task`,
            action: "Start now",
          })
        }
      }

      // Add default suggestions if we don't have enough
      if (newSuggestions.length < 3) {
        if (newSuggestions.length < 1) {
          newSuggestions.push({
            id: "1",
            type: "task",
            icon: <CheckCircle className="h-5 w-5 text-primary" />,
            title: "Complete Your First Task",
            description: "Add tasks to get personalized recommendations",
            action: "Add tasks",
          })
        }

        newSuggestions.push({
          id: "2",
          type: "focus",
          icon: <Clock className="h-5 w-5 text-primary" />,
          title: "Focus Time Block",
          description: "2:00 PM - 4:00 PM (Your most productive hours)",
          action: "Schedule",
        })

        newSuggestions.push({
          id: "3",
          type: "reschedule",
          icon: <Calendar className="h-5 w-5 text-primary" />,
          title: "Optimize Your Schedule",
          description: "Let AI analyze your calendar and suggest improvements",
          action: "Analyze",
        })
      }

      setSuggestions(newSuggestions)
    } catch (error) {
      console.error("Error generating suggestions:", error)
      // Fallback suggestions
      setSuggestions([
        {
          id: "1",
          type: "task",
          icon: <CheckCircle className="h-5 w-5 text-primary" />,
          title: "Review Your Tasks",
          description: "Take a moment to review and prioritize your tasks",
          action: "Review",
        },
        {
          id: "2",
          type: "focus",
          icon: <Clock className="h-5 w-5 text-primary" />,
          title: "Focus Time Block",
          description: "2:00 PM - 4:00 PM (Recommended focus time)",
          action: "Schedule",
        },
        {
          id: "3",
          type: "reschedule",
          icon: <Calendar className="h-5 w-5 text-primary" />,
          title: "Plan Your Week",
          description: "Take some time to plan your upcoming week",
          action: "Plan",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Brain className="h-4 w-4" />
          <span>Generating personalized recommendations...</span>
        </div>

        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Skeleton className="h-5 w-5 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full mt-2" />
                </div>
                <Skeleton className="h-8 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <Brain className="h-4 w-4" />
        <span>Personalized recommendations based on your patterns</span>
      </div>

      {suggestions.map((suggestion) => (
        <Card key={suggestion.id} className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{suggestion.icon}</div>
              <div className="flex-1">
                <h4 className="font-medium">{suggestion.title}</h4>
                <p className="text-sm text-muted-foreground">{suggestion.description}</p>
              </div>
              <Button variant="ghost" size="sm" className="ml-auto">
                {suggestion.action} <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button variant="outline" className="w-full mt-2" onClick={generateSuggestions}>
        <Brain className="mr-2 h-4 w-4" /> Refresh Suggestions
      </Button>
    </div>
  )
}

