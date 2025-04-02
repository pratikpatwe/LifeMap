"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Brain, Send, User, Calendar, Clock, ListChecks } from "lucide-react"
import { cn } from "@/lib/utils"
import { useUser } from "@clerk/nextjs"
import { generateAIResponse } from "@/lib/gemini"
import { useFirebase } from "@/contexts/firebase-context"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

type SuggestionType = {
  text: string
  icon: React.ReactNode
}

export default function AssistantPage() {
  const { user } = useUser()
  const { tasks } = useFirebase()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: `Hi ${user?.firstName || "there"}! I'm your AI assistant. How can I help organize your day?`,
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const suggestions: SuggestionType[] = [
    {
      text: "What should I focus on right now?",
      icon: <Brain className="h-4 w-4" />,
    },
    {
      text: "Schedule a study session for my CS assignment",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      text: "When's the best time for my workout today?",
      icon: <Clock className="h-4 w-4" />,
    },
    {
      text: "Prioritize my tasks for today",
      icon: <ListChecks className="h-4 w-4" />,
    },
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Create context for the AI
      const userContext = `
        User: ${user?.firstName || "User"} ${user?.lastName || ""}
        Current tasks: ${JSON.stringify(tasks)}
        Current time: ${new Date().toLocaleTimeString()}
        Current date: ${new Date().toLocaleDateString()}
      `

      // Generate response using Gemini
      const aiResponse = await generateAIResponse(messageText, userContext)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error generating response:", error)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I couldn't process your request. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4">
          <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
          <p className="text-muted-foreground">Ask me anything about your schedule, tasks, or productivity</p>
        </div>

        <Card className="border-none shadow-md">
          <CardContent className="p-0">
            <div className="flex flex-col h-[70vh]">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4 pb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex items-start gap-3 rounded-lg p-4",
                        message.role === "user"
                          ? "ml-auto max-w-[80%] bg-primary text-primary-foreground"
                          : "mr-auto max-w-[80%] bg-muted",
                      )}
                    >
                      {message.role === "assistant" && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <Brain className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex-1">
                        <div className="prose dark:prose-invert">
                          {message.content.split("\n").map((line, i) => (
                            <p key={i} className={i > 0 ? "mt-2" : ""}>
                              {line}
                            </p>
                          ))}
                        </div>
                        <div className="mt-1 text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                      {message.role === "user" && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/80 text-primary-foreground">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                          {user?.imageUrl && <AvatarImage src={user.imageUrl} alt={user.firstName || "User"} />}
                        </Avatar>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {messages.length === 1 && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground mb-2">Try asking:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => handleSendMessage(suggestion.text)}
                      >
                        {suggestion.icon}
                        {suggestion.text}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t p-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSendMessage(input)
                  }}
                  className="flex items-center gap-2"
                >
                  <Input
                    placeholder="Ask me anything about your schedule or tasks..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

