import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "")

// Gemini model - using the flash model for quick responses
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

export async function generateAIResponse(prompt: string, userContext?: string) {
  try {
    const fullPrompt = userContext ? `${userContext}\n\nUser query: ${prompt}` : prompt

    const result = await model.generateContent(fullPrompt)
    const response = result.response
    return response.text()
  } catch (error) {
    console.error("Error generating AI response:", error)
    return "I'm sorry, I couldn't process your request. Please try again."
  }
}

export async function generateTaskPriorities(tasks: any[], userPreferences?: string) {
  try {
    const tasksJson = JSON.stringify(tasks)
    const prompt = `
      You are an AI assistant that helps prioritize tasks.
      Given the following list of tasks: ${tasksJson}
      
      ${userPreferences ? `User preferences: ${userPreferences}` : ""}
      
      Please prioritize these tasks based on:
      1. Deadlines (tasks due sooner should be higher priority)
      2. Estimated time (quick tasks might be good to do first)
      3. Importance (as indicated by the priority field)
      
      Return a JSON array of task IDs in the recommended order, with a brief explanation for each.
      Format: { "prioritizedTasks": [{"id": "task1", "reason": "Due soon and quick to complete"}] }
    `

    const result = await model.generateContent(prompt)
    const response = result.response.text()

    // Sanitize response to extract valid JSON
    const jsonStartIndex = response.indexOf("{")
    const jsonEndIndex = response.lastIndexOf("}")
    if (jsonStartIndex === -1 || jsonEndIndex === -1) {
      throw new Error("Invalid JSON format in response")
    }
    const sanitizedResponse = response.substring(jsonStartIndex, jsonEndIndex + 1)

    try {
      return JSON.parse(sanitizedResponse)
    } catch (e) {
      console.error("Error parsing Gemini response:", e)
      return { prioritizedTasks: [] }
    }
  } catch (error) {
    console.error("Error generating task priorities:", error)
    return { prioritizedTasks: [] }
  }
}

export async function suggestProductiveTimeBlocks(schedule: any[], preferences?: string) {
  try {
    const scheduleJson = JSON.stringify(schedule)
    const prompt = `
      You are an AI assistant that helps suggest productive time blocks.
      Given the following schedule: ${scheduleJson}
      
      ${preferences ? `User preferences: ${preferences}` : ""}
      
      Please suggest optimal time blocks for:
      1. Deep work (when the user is likely most productive)
      2. Breaks (to maintain energy and focus)
      3. Meetings (if applicable)
      4. Personal time
      
      Return a JSON array of suggested time blocks.
      Format: { "timeBlocks": [{"startTime": "14:00", "endTime": "16:00", "activity": "Deep Work", "reason": "Based on your past productivity patterns"}] }
    `

    const result = await model.generateContent(prompt)
    const response = result.response.text()

    // Sanitize response to extract valid JSON
    const jsonStartIndex = response.indexOf("{")
    const jsonEndIndex = response.lastIndexOf("}")
    if (jsonStartIndex === -1 || jsonEndIndex === -1) {
      throw new Error("Invalid JSON format in response")
    }
    const sanitizedResponse = response.substring(jsonStartIndex, jsonEndIndex + 1)

    try {
      return JSON.parse(sanitizedResponse)
    } catch (e) {
      console.error("Error parsing Gemini response:", e)
      return { timeBlocks: [] }
    }
  } catch (error) {
    console.error("Error generating time blocks:", error)
    return { timeBlocks: [] }
  }
}

