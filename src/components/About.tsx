import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import wsaImage from "@/assets/WSA.png";

const About = () => {
  const keyTakeaways = [
    "Master 10 critical FDA-focused parameters for Compression & Coating",
    "Clear understanding of Compression Force vs Pressure",
    "Learn how to set scientifically justified Reject Limits",
    "Real case studies from compression & coating failures",
    "Hands-on RCA for overweight / oversized tablets",
    "Step-by-step Coating Pan setup & defect prevention",
    "Achieve 99% Coating Yield with practical strategies",
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
              <h3 className="text-2xl font-bold mb-6">KEY TAKEAWAYS</h3>
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
            <div className="w-full">
                <img
                  src={wsaImage}
                  alt="Who Should Attend - Tablet Compression & Coating Operators, Engineering & Maintenance Personnel, Regulatory/Compliance Managers, Plant & Operations Heads, Process/Scale-up/Tech Transfer Teams, Production/QA/QC/IPQA Professionals"
                  className="w-full h-auto rounded-lg"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
