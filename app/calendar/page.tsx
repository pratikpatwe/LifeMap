"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Brain, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { TimeBlockVisualizer } from "@/components/time-block-visualizer"
import { useTasks } from "@/hooks/use-tasks"

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState<"day" | "week" | "month">("day")
  const { tasks } = useTasks()

  // Function to get tasks for the selected date
  const getTasksForDate = (date: Date | undefined) => {
    if (!date) return []

    const dateString = date.toISOString().split("T")[0]
    return tasks.filter((task) => task.dueDate === dateString)
  }

  // Function to format date for display
  const formatDate = (date: Date | undefined) => {
    if (!date) return ""

    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  // Function to navigate to previous/next day
  const navigateDate = (direction: "prev" | "next") => {
    if (!date) return

    const newDate = new Date(date)
    if (direction === "prev") {
      newDate.setDate(newDate.getDate() - 1)
    } else {
      newDate.setDate(newDate.getDate() + 1)
    }
    setDate(newDate)
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">View and manage your schedule</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={view} onValueChange={(value) => setView(value as "day" | "week" | "month")}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Event
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <Card className="md:row-span-2">
          <CardContent className="p-4">
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            <div className="mt-4 space-y-2">
              <h3 className="font-medium">Tasks Due Today</h3>
              {getTasksForDate(date).length === 0 ? (
                <p className="text-sm text-muted-foreground">No tasks due today</p>
              ) : (
                <div className="space-y-2">
                  {getTasksForDate(date).map((task) => (
                    <div key={task.id} className="flex items-center justify-between rounded-md border p-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            task.priority === "High"
                              ? "bg-destructive"
                              : task.priority === "Medium"
                                ? "bg-amber-500"
                                : "bg-secondary"
                          }`}
                        />
                        <span className={`text-sm ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                          {task.title}
                        </span>
                      </div>
                      <Badge variant="outline">{task.dueTime}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Schedule</CardTitle>
              <CardDescription>{formatDate(date)}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => navigateDate("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => navigateDate("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Brain className="mr-2 h-4 w-4" /> Optimize
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="schedule">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="time-blocks">Time Blocks</TabsTrigger>
              </TabsList>
              <TabsContent value="schedule" className="mt-4 space-y-4">
                <div className="space-y-1">
                  {Array.from({ length: 14 }, (_, i) => i + 8).map((hour) => (
                    <div key={hour} className="grid grid-cols-[60px_1fr] gap-2">
                      <div className="text-sm text-muted-foreground text-right">
                        {hour > 12 ? `${hour - 12}:00 PM` : hour === 12 ? `${hour}:00 PM` : `${hour}:00 AM`}
                      </div>
                      <div className="h-12 rounded-md border border-dashed"></div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="time-blocks" className="mt-4">
                <TimeBlockVisualizer />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
            <CardDescription>Personalized schedule suggestions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border p-4 bg-primary/5">
              <div className="flex items-start gap-3">
                <Brain className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium">Optimize Your Schedule</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    I've analyzed your calendar and productivity patterns. Here are some suggestions:
                  </p>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-500 h-2 w-2 mt-1.5" />
                      <span>Schedule deep work from 2:00 PM - 4:00 PM when you're most productive</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-500 h-2 w-2 mt-1.5" />
                      <span>Move your workout to 6:30 PM for better consistency</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="rounded-full bg-blue-500 h-2 w-2 mt-1.5" />
                      <span>Batch email responses during your 4:00 PM - 4:30 PM slot</span>
                    </li>
                  </ul>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm">Apply Suggestions</Button>
                    <Button size="sm" variant="outline">
                      Customize
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

