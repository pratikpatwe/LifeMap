import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const testimonials = [
  {
    name: "Ananya S.",
    role: "Computer Science Student",
    content:
      "This app completely transformed how I manage my assignments and internship work. The AI suggestions are spot-on and I love how it adapts to my schedule!",
    avatar: "AS",
  },
  {
    name: "Raj P.",
    role: "Freelance Designer",
    content:
      "As someone who juggles multiple client projects, this tool has been a game-changer. The smart prioritization helps me focus on what truly matters.",
    avatar: "RP",
  },
  {
    name: "Mira K.",
    role: "Marketing Professional",
    content:
      "The adaptive notifications are my favorite feature. No more notification fatigue! It knows exactly when to remind me about important tasks.",
    avatar: "MK",
  },
]

export function Testimonials() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Loved by Busy People</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See how our AI organizer is helping students, professionals, and freelancers take control of their lives.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

