"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Edit, Trash } from "lucide-react"
import { cn } from "@/lib/utils"
import { useFirebase } from "@/contexts/firebase-context"
import { Skeleton } from "@/components/ui/skeleton"

export function TaskList() {
  const { tasks, toggleTaskCompletion, deleteTask, loading } = useFirebase()

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-destructive text-destructive-foreground hover:bg-destructive/80"
      case "medium":
        return "bg-warning text-warning-foreground hover:bg-warning/80"
      case "low":
        return "bg-secondary text-secondary-foreground hover:bg-secondary/80"
      default:
        return "bg-primary text-primary-foreground hover:bg-primary/80"
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-start space-x-4 rounded-md border p-4">
            <Skeleton className="h-4 w-4 rounded-sm" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex space-x-2">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">No tasks for today. Add some tasks to get started!</div>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className={cn("flex items-start space-x-4 rounded-md border p-4", task.completed ? "bg-muted/50" : "")}
          >
            <Checkbox checked={task.completed} onCheckedChange={() => toggleTaskCompletion(task.id)} className="mt-1" />
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className={cn("font-medium", task.completed ? "line-through text-muted-foreground" : "")}>
                  {task.title}
                </p>
                <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                <span>{task.dueTime}</span>
                {task.estimatedTime && <span className="ml-2">({task.estimatedTime} min)</span>}
              </div>
              {task.description && <p className="text-sm text-muted-foreground">{task.description}</p>}
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

