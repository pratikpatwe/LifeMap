"use client"

import { useState, useEffect } from "react"

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
}

// Sample tasks data
const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Complete CS Assignment",
    description: "Finish the programming assignment for CS 401",
    priority: "High",
    completed: false,
    dueDate: "2025-04-02",
    dueTime: "11:59 PM",
    estimatedTime: 120,
    category: "School",
  },
  {
    id: "2",
    title: "Prepare for Team Meeting",
    description: "Review agenda and prepare talking points",
    priority: "Medium",
    completed: false,
    dueDate: "2025-04-01",
    dueTime: "1:00 PM",
    estimatedTime: 30,
    category: "Work",
  },
  {
    id: "3",
    title: "Research Project Ideas",
    description: "Brainstorm and research ideas for the final project",
    priority: "Medium",
    completed: false,
    dueDate: "2025-04-01",
    dueTime: "5:00 PM",
    estimatedTime: 60,
    category: "School",
  },
  {
    id: "4",
    title: "Respond to Emails",
    description: "Clear inbox and respond to important messages",
    priority: "Low",
    completed: true,
    dueDate: "2025-04-01",
    dueTime: "4:00 PM",
    estimatedTime: 45,
    category: "Work",
  },
  {
    id: "5",
    title: "Workout Session",
    description: "30-minute cardio and strength training",
    priority: "Medium",
    completed: false,
    dueDate: "2025-04-01",
    dueTime: "6:30 PM",
    estimatedTime: 45,
    category: "Personal",
  },
]

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    // In a real app, this would fetch from an API or local storage
    setTasks(sampleTasks)
  }, [])

  const addTask = (task: Omit<Task, "id">) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
    }
    setTasks((prev) => [...prev, newTask])
  }

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updates } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const toggleTaskCompletion = (id: string) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  // Derived states
  const completedTasks = tasks.filter((task) => task.completed)
  const incompleteTasks = tasks.filter((task) => !task.completed)
  const highPriorityTasks = tasks.filter((task) => task.priority === "High" && !task.completed)

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    completedTasks,
    incompleteTasks,
    highPriorityTasks,
  }
}

