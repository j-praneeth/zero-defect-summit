import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Coffee, Utensils, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkshopBrochure from "@/assets/Workshop_Brochure.pdf";

const AgendaPage = () => {
  const [activeDay, setActiveDay] = useState<"day1" | "day2">("day1");

  const day1Sessions = [
    { time: "09:30 - 09:45", title: "Welcome & Workshop Overview", icon: Clock, duration: "15 Minutes", description: "Introduction to objectives, FDA expectations, and high-impact learning format" },
    { time: "09:45 - 11:15", title: "Demystifying the Tablet Press: Understanding 10 Critical Operating Parameters (CPPs) That FDA Evaluates", icon: Clock, duration: "1.5 Hours", description: "Deep-dive discussion with real equipment images & process mapping" },
    { time: "11:15 - 11:30", title: "Tea Break", icon: Coffee, duration: "15 Minutes", description: "" },
    { time: "11:30 - 12:30", title: "The Misinterpretation of 'Compression Force' — Understanding Force vs. Pressure vs. Dwell Time", icon: Clock, duration: "1 Hour", description: "Scientific explanation with failure scenarios" },
    { time: "12:30 - 13:15", title: "Lunch Break", icon: Utensils, duration: "45 Minutes", description: "" },
    { time: "13:15 - 14:00", title: "Setting Reject Limits for Tablet Presses — Optimized Procedures & Regulatory Expectations", icon: Clock, duration: "45 Minutes", description: "Includes automatic vs manual rejection logic" },
    { time: "14:00 - 14:30", title: "Case Study Review (2 Real-Time Incidents)", icon: Clock, duration: "30 Minutes", description: "Discussion & interactive troubleshooting" },
    { time: "14:30 - 14:45", title: "Break", icon: Coffee, duration: "15 Minutes", description: "" },
    { time: "14:45 - 15:30", title: "Oversized / Overweight Tablets — Root Causes & Preventive Controls", icon: Clock, duration: "45 Minutes", description: "Mechanical & formulation-led causes" },
    { time: "15:30 - 16:00", title: "Case Study Review (2 Real-Time Incidents)", icon: Clock, duration: "30 Minutes", description: "Failure/CAPA mapping" },
    { time: "16:00 - 17:00", title: "Day Wrap-Up & Q&A", icon: Clock, duration: "1 Hour", description: "Key takeaways" },
  ];

  const day2Sessions = [
    { time: "09:30 - 09:45", title: "Recap of Day 1 & Kickoff for Coating Pan Discussions", icon: Clock, duration: "15 Minutes", description: "Alignment on problem statements" },
    { time: "09:45 - 11:15", title: "Understanding the 10 Critical Coating Pan CPPs Monitored by FDA", icon: Clock, duration: "1.5 Hours", description: "Includes inlet/outlet temperature, pan speed, atomization pressure, pattern width" },
    { time: "11:15 - 11:30", title: "Tea Break", icon: Coffee, duration: "15 Minutes", description: "" },
    { time: "11:30 - 12:30", title: "Setting Up the Coating Pan for Success — Solution Prep, Gun Geometry, Spray Rate Validation, Droplet Control", icon: Clock, duration: "1 Hour", description: "Demonstration with schematics" },
    { time: "12:30 - 13:15", title: "Lunch Break", icon: Utensils, duration: "45 Minutes", description: "" },
    { time: "13:15 - 14:15", title: "Film Coating Defects: Identification, Root Cause Analysis & Corrective Strategies", icon: Clock, duration: "1 Hour", description: "Includes color variation, erosion, sticking, roughness, twinning, orange peel" },
    { time: "14:15 - 14:45", title: "Case Study Review (2 Real-Time Incidents)", icon: Clock, duration: "30 Minutes", description: "Defect/CAPA" },
    { time: "14:45 - 15:00", title: "Break", icon: Coffee, duration: "15 Minutes", description: "" },
    { time: "15:00 - 15:45", title: "Aqueous Film Coating Strategy to Achieve 99% Yield — End-to-End Parameter Optimization", icon: Clock, duration: "45 Minutes", description: "Throughput vs quality controls" },
    { time: "15:45 - 16:15", title: "Case Study Review (2 Real-Time Incidents)", icon: Clock, duration: "30 Minutes", description: "Review of success stories" },
    { time: "16:15 - 17:00", title: "Workshop Closure & Feedback", icon: Clock, duration: "45 Minutes", description: "Certificates / Next Steps" },
  ];

  const sessions = activeDay === "day1" ? day1Sessions : day2Sessions;

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = WorkshopBrochure;
    link.download = 'Workshop_Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Header with Gradient */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/80 pt-32 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-8">
              AGENDA
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleDownloadPDF}
                size="lg"
                variant="nav"
                className="font-semibold text-base px-8"
              >
                <Download className="mr-2" size={20} />
                DOWNLOAD PDF
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Info Banner */}
            <div className="bg-secondary border-l-4 border-accent p-4 rounded-lg mb-8 flex items-start gap-3">
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-accent-foreground text-xs font-bold">i</span>
              </div>
              <div>
                <p className="text-foreground">
                  Date and time is shown in (UTC +05:30) Asia/Calcutta.
                </p>
              </div>
            </div>

            {/* Day Tabs */}
            <div className="border-b border-border mb-8">
              <div className="flex gap-1">
                <button
                  onClick={() => setActiveDay("day1")}
                  className={`px-6 py-4 font-semibold transition-all relative ${
                    activeDay === "day1"
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <div>
                    <div className="text-base">Day - 1</div>
                    <div className="text-xs">Thu, Dec 11, 2025</div>
                  </div>
                  {activeDay === "day1" && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent"></div>
                  )}
                </button>
                
                <button
                  onClick={() => setActiveDay("day2")}
                  className={`px-6 py-4 font-semibold transition-all relative ${
                    activeDay === "day2"
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <div>
                    <div className="text-base">Day - 2</div>
                    <div className="text-xs">Fri, Dec 12, 2025</div>
                  </div>
                  {activeDay === "day2" && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent"></div>
                  )}
                </button>
              </div>
            </div>

            {/* Sessions List */}
            <div className="space-y-0">
              {sessions.map((session, index) => {
                const Icon = session.icon;
                const isBreak = session.icon === Coffee || session.icon === Utensils;
                
                return (
                  <div
                    key={index}
                    className={`border-b border-border last:border-b-0 py-6 hover:bg-secondary/50 transition-all duration-200 px-4 -mx-4 ${
                      isBreak ? "bg-secondary/30" : ""
                    }`}
                  >
                    <div className="flex items-start gap-6">
                      {/* Time */}
                      <div className="flex-shrink-0 w-24 text-left">
                        <div className="text-lg font-bold text-foreground">
                          {session.time.split(" - ")[0]}
                        </div>
                      </div>

                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          isBreak ? "bg-muted" : "bg-accent/10"
                        }`}>
                          <Icon className={isBreak ? "text-muted-foreground" : "text-accent"} size={22} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          {session.title}
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                          <Clock size={14} />
                          {session.duration}
                        </p>
                        {session.description && (
                          <p className="text-sm text-muted-foreground">
                            {session.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Download Section */}
            <Card className="mt-12 p-8 bg-primary text-primary-foreground text-center">
              <h3 className="text-2xl font-bold mb-4">Need the Full Schedule?</h3>
              <p className="mb-6 text-primary-foreground/90">
                Download the complete workshop agenda as a PDF
              </p>
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                onClick={handleDownloadPDF}
              >
                <Download className="mr-2" size={20} />
                Download PDF
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AgendaPage;
