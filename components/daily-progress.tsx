"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, TrendingUp, Clock } from "lucide-react"

export function DailyProgress() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="productivity">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
          <TabsTrigger value="focus">Focus Time</TabsTrigger>
          <TabsTrigger value="habits">Habits</TabsTrigger>
        </TabsList>

        <TabsContent value="productivity" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Task Completion Rate</h3>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div className="text-2xl font-bold mb-2">78%</div>
                <Progress value={78} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">15% higher than your average</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Deep Work Hours</h3>
                  <Clock className="h-4 w-4 text-blue-500" />
                </div>
                <div className="text-2xl font-bold mb-2">4.5 hrs</div>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">Goal: 6 hours daily</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-4">Productivity by Time of Day</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Morning (8AM - 12PM)</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Afternoon (12PM - 4PM)</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Evening (4PM - 8PM)</span>
                    <span className="text-sm font-medium">70%</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Night (8PM - 12AM)</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <Brain className="mr-2 h-4 w-4 text-primary" />
                <span>AI Insight: Your peak productivity is between 2PM and 4PM</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="focus" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-4">Focus Sessions This Week</h3>
              <div className="grid grid-cols-7 gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                  <div key={day} className="flex flex-col items-center">
                    <div className="h-24 w-full bg-muted rounded-md flex items-end">
                      <div
                        className="bg-primary rounded-md w-full"
                        style={{
                          height: `${[60, 45, 75, 30, 90, 15, 0][i]}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-xs mt-2">{day}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <Brain className="mr-2 h-4 w-4 text-primary" />
                <span>AI Insight: You're most focused on Fridays and least focused on weekends</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="habits" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-4">Habit Consistency</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Morning Planning</span>
                    <span className="text-sm font-medium">90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Exercise</span>
                    <span className="text-sm font-medium">40%</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Reading</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Deep Work Sessions</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <Brain className="mr-2 h-4 w-4 text-primary" />
                <span>AI Insight: Consider rescheduling exercise to evenings for better consistency</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

