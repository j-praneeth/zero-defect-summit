import { Card } from "@/components/ui/card";
import { Award, Globe, Users, BookOpen } from "lucide-react";
import speakerImage from "@/assets/speaker-fred-rowley.jpg";
import AnimatedCounter from "@/components/AnimatedCounter";

const Speaker = () => {
  return (
    <section id="speaker" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Meet Your <span className="text-accent">Expert Trainer</span>
            </h2>
            <p className="text-xl text-muted-foreground">Learn from a global leader in solid dosage manufacturing</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-accent rounded-2xl blur-2xl opacity-20"></div>
                <img src={speakerImage} alt="Fred A. Rowley" className="relative rounded-2xl shadow-elegant w-full" />
              </div>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>
              <h3 className="text-3xl font-bold text-foreground mb-2">Fred A. Rowley</h3>
              <p className="text-xl text-accent mb-6 font-semibold">President, Solid Dosage Training Inc., USA</p>

              <p className="text-muted-foreground leading-relaxed mb-6">
                Fred A. Rowley, President of Solid Dosage Training, Inc., is an internationally recognized expert and
                pioneer in solid dosage manufacturing. With a B.S. in Biochemistry from the University of Santo Tomas
                and an honorary doctorate (2006), he has held senior roles at Watson Laboratories, Weider Nutrition,
                Arnet Pharmaceuticals, Alza Corporation, and Syntex FP.
              </p>

              <p className="text-muted-foreground leading-relaxed mb-8">
                He has authored 34 peer-reviewed articles on granulation, compression, coating, and printing, and serves
                on the editorial boards of Pharmaceutical Manufacturing and Tablets and Capsules. A sought-after
                consultant and lecturer, Mr. Rowley has advised companies and law firms in 22 countries and presented at
                the FDA and international industry forums.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 border-2 hover:border-accent transition-all duration-300 hover-scale">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Globe className="text-accent" size={24} />
                    </div>
                    <div>
                      <AnimatedCounter target={22} suffix="+" className="text-2xl font-bold text-foreground" />
                      <div className="text-xs text-muted-foreground">Countries Consulted</div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border-2 hover:border-accent transition-all duration-300 hover-scale">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="text-accent" size={24} />
                    </div>
                    <div>
                      <AnimatedCounter target={5000} suffix="+" className="text-2xl font-bold text-foreground" />
                      <div className="text-xs text-muted-foreground">Professionals Trained</div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border-2 hover:border-accent transition-all duration-300 hover-scale">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="text-accent" size={24} />
                    </div>
                    <div>
                      <AnimatedCounter target={30} suffix="+" className="text-2xl font-bold text-foreground" />
                      <div className="text-xs text-muted-foreground">Years Experience</div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border-2 hover:border-accent transition-all duration-300 hover-scale">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <BookOpen className="text-accent" size={24} />
                    </div>
                    <div>
                      <AnimatedCounter target={34} className="text-2xl font-bold text-foreground" />
                      <div className="text-xs text-muted-foreground">Peer-Reviewed Articles</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Speaker;
