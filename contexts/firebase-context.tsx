"use client"

import { createContext, useContext, type ReactNode, useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { ref, onValue, push, remove, update } from "firebase/database"
import { useAuth } from "@clerk/nextjs"
import type { Task } from "@/types/task"

type FirebaseContextType = {
  tasks: Task[]
  addTask: (task: Omit<Task, "id">) => Promise<void>
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  toggleTaskCompletion: (id: string) => Promise<void>
  completedTasks: Task[]
  incompleteTasks: Task[]
  highPriorityTasks: Task[]
  loading: boolean
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined)

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const { userId, isSignedIn } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSignedIn || !userId) {
      setTasks([])
      setLoading(false)
      return
    }

    const tasksRef = ref(db, `users/${userId}/tasks`)
    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const taskList = Object.entries(data).map(([id, task]) => ({
          id,
          ...(task as Omit<Task, "id">),
        }))
        setTasks(taskList)
      } else {
        setTasks([])
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [userId, isSignedIn])

  const addTask = async (task: Omit<Task, "id">) => {
    if (!isSignedIn || !userId) return
    const tasksRef = ref(db, `users/${userId}/tasks`)
    await push(tasksRef, task)
  }

  const updateTask = async (id: string, updates: Partial<Task>) => {
    if (!isSignedIn || !userId) return
    const taskRef = ref(db, `users/${userId}/tasks/${id}`)
    await update(taskRef, updates)
  }

  const deleteTask = async (id: string) => {
    if (!isSignedIn || !userId) return
    const taskRef = ref(db, `users/${userId}/tasks/${id}`)
    await remove(taskRef)
  }

  const toggleTaskCompletion = async (id: string) => {
    if (!isSignedIn || !userId) return
    const task = tasks.find((t) => t.id === id)
    if (task) {
      const taskRef = ref(db, `users/${userId}/tasks/${id}`)
      await update(taskRef, { completed: !task.completed })
    }
  }

  // Derived states
  const completedTasks = tasks.filter((task) => task.completed)
  const incompleteTasks = tasks.filter((task) => !task.completed)
  const highPriorityTasks = tasks.filter((task) => task.priority === "High" && !task.completed)

  return (
    <FirebaseContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        completedTasks,
        incompleteTasks,
        highPriorityTasks,
        loading,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}

export const useFirebase = () => {
  const context = useContext(FirebaseContext)
  if (context === undefined) {
    throw new Error("useFirebase must be used within a FirebaseProvider")
  }
  return context
}

