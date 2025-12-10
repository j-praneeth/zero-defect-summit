import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Coffee, Utensils } from "lucide-react";

const Agenda = () => {
  const day1Sessions = [
    { time: "09:00 - 09:30", title: "Registration & Welcome Coffee", icon: Coffee },
    { time: "09:30 - 11:00", title: "Fundamentals of Tablet Compression Technology", icon: Clock },
    { time: "11:00 - 11:15", title: "Coffee Break", icon: Coffee },
    { time: "11:15 - 13:00", title: "Common Compression Defects & Root Cause Analysis", icon: Clock },
    { time: "13:00 - 14:00", title: "Lunch Break", icon: Utensils },
    { time: "14:00 - 15:30", title: "Tooling Selection & Optimization Strategies", icon: Clock },
    { time: "15:30 - 15:45", title: "Afternoon Tea", icon: Coffee },
    { time: "15:45 - 17:30", title: "Hands-On Problem Solving & Case Studies", icon: Clock },
  ];

  const day2Sessions = [
    { time: "09:30 - 09:45", title: "Recap of Day 1 & Kickoff for Coating Pan Discussions", icon: Clock },
    { time: "09:45 - 11:15", title: "Understanding the 10 Critical Coating Pan CPPs Monitored by FDA", icon: Clock },
    { time: "11:15 - 11:30", title: "Tea Break", icon: Coffee },
    { time: "11:30 - 12:30", title: "Setting Up the Coating Pan for Success — Solution Prep, Gun Geometry, Spray Rate Verification, Droplet Control", icon: Clock },
    { time: "12:30 - 13:15", title: "Lunch Break", icon: Utensils },
    { time: "13:15 - 14:15", title: "Tablet Coating Defects: Identification, Root Cause Analysis & Corrective Strategies", icon: Clock },
    { time: "14:15 - 14:45", title: "Case Study Review (2 Real-Time Incidents)", icon: Clock },
    { time: "14:45 - 15:00", title: "Break", icon: Coffee },
    { time: "15:00 - 15:45", title: "Aqueous Film Coating Strategy to Achieve 99% Yield — End-to-End Parameter Optimization", icon: Clock },
    { time: "15:45 - 16:15", title: "Guest Session by SOTAX Team", icon: Clock },
    { time: "16:15 - 16:45", title: "Q&A by GANSONS Team", icon: Clock },
    { time: "16:45 - 17:00", title: "Workshop Closure & Feedback", icon: Clock },
  ];

  return (
    <section id="agenda" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Workshop <span className="text-accent">Agenda</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Two intensive days of learning, practice, and mastery
            </p>
          </div>

          <Tabs defaultValue="day1" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-auto p-1">
              <TabsTrigger
                value="day1"
                className="text-lg py-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Day 1 - Tablet Compression
                <span className="block text-sm opacity-80">9 December 2025</span>
              </TabsTrigger>
              <TabsTrigger
                value="day2"
                className="text-lg py-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Day 2 - Coating Excellence
                <span className="block text-sm opacity-80">10 December 2025</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="day1">
              <Card className="p-8 border-2">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Mastering Tablet Compression
                </h3>
                <div className="space-y-4">
                  {day1Sessions.map((session, index) => {
                    const Icon = session.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-lg hover:bg-secondary transition-all duration-300"
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                          <Icon className="text-accent" size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-accent font-semibold mb-1">
                            {session.time}
                          </div>
                          <div className="text-foreground font-medium">{session.title}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="day2">
              <Card className="p-8 border-2">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Coating Pan Excellence & Defect Prevention
                </h3>
                <div className="space-y-4">
                  {day2Sessions.map((session, index) => {
                    const Icon = session.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 rounded-lg hover:bg-secondary transition-all duration-300"
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                          <Icon className="text-accent" size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-accent font-semibold mb-1">
                            {session.time}
                          </div>
                          <div className="text-foreground font-medium">{session.title}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Agenda;
