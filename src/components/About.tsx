import { Card } from "@/components/ui/card";
import { CheckCircle2, Users, Award, Beaker, Settings, Cog, GraduationCap } from "lucide-react";

const About = () => {
  const keyTakeaways = [
    "Tablet Compression Fundamentals & Optimization",
    "Coating Pan Excellence & Process Control",
    "Defect Prevention & Root Cause Analysis",
    "Hands-On Problem-Solving Sessions",
    "Quality Assurance Best Practices",
    "Equipment Maintenance Strategies",
    "Regulatory Compliance & Documentation",
  ];

  const targetAudience = [
    { icon: Users, title: "Production Operators", desc: "Hands-on manufacturing professionals" },
    { icon: Award, title: "Quality Assurance Teams", desc: "QA/QC specialists and managers" },
    { icon: Beaker, title: "R&D Scientists", desc: "Formulation and process development" },
    { icon: Settings, title: "Maintenance Engineers", desc: "Equipment maintenance specialists" },
    { icon: Cog, title: "Process Engineers", desc: "Manufacturing process optimization" },
    { icon: GraduationCap, title: "Manufacturing Managers", desc: "Production leadership and supervisors" },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About the <span className="text-accent">Workshop</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive 2-day intensive training program designed to eliminate manufacturing defects 
              through mastery of tablet compression and coating processes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="p-8 border-2 hover:shadow-elegant transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              <h3 className="text-2xl font-bold text-foreground mb-4">Workshop Overview</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                This hands-on workshop brings together pharmaceutical professionals to master the art and 
                science of zero-defect tablet manufacturing. Learn directly from international expert 
                Fred A. Rowley, who brings decades of solid dosage manufacturing expertise.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Through interactive sessions, real-world case studies, and practical demonstrations, 
                participants will gain actionable insights to immediately improve their manufacturing processes.
              </p>
            </Card>

            <Card className="p-8 bg-primary text-primary-foreground border-2 border-primary animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              <h3 className="text-2xl font-bold mb-6">Key Learning Outcomes</h3>
              <ul className="space-y-3">
                {keyTakeaways.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span className="text-primary-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
            <h3 className="text-3xl font-bold text-center text-foreground mb-12">
              Who Should <span className="text-accent">Attend</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {targetAudience.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={index}
                    className="p-6 text-center hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 hover-scale border-2"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                      <Icon className="text-accent" size={32} />
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-2">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
