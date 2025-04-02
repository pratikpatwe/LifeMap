"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Brain, Edit } from "lucide-react"

const timeBlocks = [
  {
    id: 1,
    startTime: "08:00",
    endTime: "09:30",
    title: "Morning Review",
    type: "work",
    description: "Review emails and plan your day",
  },
  {
    id: 2,
    startTime: "09:30",
    endTime: "10:00",
    title: "Break",
    type: "break",
    description: "Quick coffee break",
  },
  {
    id: 3,
    startTime: "10:00",
    endTime: "12:00",
    title: "CS Assignment",
    type: "deep-work",
    description: "Focus on completing the programming assignment",
  },
  {
    id: 4,
    startTime: "12:00",
    endTime: "13:00",
    title: "Lunch",
    type: "break",
    description: "Lunch break",
  },
  {
    id: 5,
    startTime: "13:00",
    endTime: "14:00",
    title: "Team Meeting",
    type: "meeting",
    description: "Weekly team sync",
  },
  {
    id: 6,
    startTime: "14:00",
    endTime: "16:00",
    title: "Deep Work",
    type: "deep-work",
    description: "Focus time for your most important tasks",
    recommended: true,
  },
  {
    id: 7,
    startTime: "16:00",
    endTime: "16:30",
    title: "Break",
    type: "break",
    description: "Recommended break to recharge",
    recommended: true,
  },
  {
    id: 8,
    startTime: "16:30",
    endTime: "18:00",
    title: "Research",
    type: "work",
    description: "Research for upcoming project",
  },
  {
    id: 9,
    startTime: "18:30",
    endTime: "19:30",
    title: "Workout",
    type: "personal",
    description: "Gym session (rescheduled from morning)",
    recommended: true,
  },
]

export function TimeBlockVisualizer() {
  const getTypeStyles = (type: string, recommended = false) => {
    const baseClasses = "rounded-md p-4 border"

    if (recommended) {
      return `${baseClasses} border-primary/50 bg-primary/5`
    }

    switch (type) {
      case "deep-work":
        return `${baseClasses} border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30`
      case "work":
        return `${baseClasses} border-indigo-200 bg-indigo-50 dark:border-indigo-900 dark:bg-indigo-950/30`
      case "meeting":
        return `${baseClasses} border-purple-200 bg-purple-50 dark:border-purple-900 dark:bg-purple-950/30`
      case "break":
        return `${baseClasses} border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30`
      case "personal":
        return `${baseClasses} border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950/30`
      default:
        return `${baseClasses} border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/30`
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "deep-work":
        return "bg-blue-500 text-white hover:bg-blue-600"
      case "work":
        return "bg-indigo-500 text-white hover:bg-indigo-600"
      case "meeting":
        return "bg-purple-500 text-white hover:bg-purple-600"
      case "break":
        return "bg-green-500 text-white hover:bg-green-600"
      case "personal":
        return "bg-orange-500 text-white hover:bg-orange-600"
      default:
        return "bg-gray-500 text-white hover:bg-gray-600"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950/30">
          Deep Work
        </Badge>
        <Badge variant="outline" className="bg-indigo-50 dark:bg-indigo-950/30">
          Work
        </Badge>
        <Badge variant="outline" className="bg-purple-50 dark:bg-purple-950/30">
          Meeting
        </Badge>
        <Badge variant="outline" className="bg-green-50 dark:bg-green-950/30">
          Break
        </Badge>
        <Badge variant="outline" className="bg-orange-50 dark:bg-orange-950/30">
          Personal
        </Badge>
      </div>

      <div className="space-y-3">
        {timeBlocks.map((block) => (
          <div key={block.id} className={cn(getTypeStyles(block.type, block.recommended), "relative")}>
            {block.recommended && (
              <div className="absolute -right-1 -top-1">
                <Badge className="bg-primary text-primary-foreground">
                  <Brain className="mr-1 h-3 w-3" /> AI Recommended
                </Badge>
              </div>
            )}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{block.title}</h4>
                  <Badge className={getTypeBadge(block.type)}>{block.type.replace("-", " ")}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{block.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium">
                  {block.startTime} - {block.endTime}
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

