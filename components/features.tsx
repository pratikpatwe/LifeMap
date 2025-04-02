import { Brain, Calendar, Clock, ListChecks, MessageSquare, Bell } from "lucide-react"

const features = [
  {
    icon: <ListChecks className="h-10 w-10 text-primary" />,
    title: "Intelligent Task Prioritization",
    description:
      "Our AI analyzes your tasks, deadlines, and effort required to create the perfect priority list tailored to your workflow.",
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "Productive Time Blocks",
    description:
      "Get suggestions for the best time slots to work, take breaks, and enjoy personal time based on your productivity patterns.",
  },
  {
    icon: <Brain className="h-10 w-10 text-primary" />,
    title: "Personalized Learning",
    description:
      "The system observes your habits and improves its recommendations over time, adapting to your unique workflow.",
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-primary" />,
    title: "Context-Aware Assistant",
    description:
      "Simply ask 'What should I do now?' and receive intelligent suggestions based on your schedule, deadlines, and workload.",
  },
  {
    icon: <Bell className="h-10 w-10 text-primary" />,
    title: "Adaptive Notifications",
    description:
      "Receive fewer, more relevant notifications that adapt to your behavior and help you stay on track without feeling overwhelmed.",
  },
  {
    icon: <Calendar className="h-10 w-10 text-primary" />,
    title: "Smart Scheduling",
    description:
      "Automatically find the best times for meetings, study sessions, and personal activities based on your calendar and preferences.",
  },
]

export function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Smart Features for Smarter Living</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our AI-powered organizer doesn't just remind you of tasks—it helps you work smarter.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="p-2 rounded-full bg-primary/10">{feature.icon}</div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

