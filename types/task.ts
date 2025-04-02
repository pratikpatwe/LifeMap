export type Task = {
  id: string
  title: string
  description?: string
  priority: "High" | "Medium" | "Low"
  completed: boolean
  dueDate: string
  dueTime: string
  estimatedTime?: number
  category?: string
  userId?: string
}

