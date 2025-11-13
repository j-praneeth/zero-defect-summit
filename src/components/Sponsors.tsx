import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Medal, Award, Mail } from "lucide-react";
import initiativeLogo from "@/assets/initiative-logo.png";

const Sponsors = () => {
  const sponsorTiers = [
    {
      tier: "Platinum Sponsor",
      icon: Crown,
      benefits: [
        "Prime exhibition space",
        "Logo on all marketing materials",
        "Speaking opportunity (15 mins)",
        "6 complimentary delegate passes",
        "Premium branding throughout venue",
      ],
    },
    {
      tier: "Gold Sponsor",
      icon: Medal,
      benefits: [
        "Exhibition booth space",
        "Logo on workshop materials",
        "4 complimentary delegate passes",
        "Brand visibility in all communications",
      ],
    },
    {
      tier: "Silver Sponsor",
      icon: Award,
      benefits: [
        "Exhibition table space",
        "Logo on website & signage",
        "2 complimentary delegate passes",
        "Digital marketing exposure",
      ],
    },
  ];

  const exhibitorCategories = [
    "Equipment Manufacturers",
    "Coating Solution Providers",
    "Tooling & Die Manufacturers",
    "Quality Control Systems",
    "Data Integrity Solutions",
    "Training & Consulting Services",
  ];

  return (
    <section id="sponsors" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Become a <span className="text-accent">Sponsor</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Connect with pharmaceutical industry leaders and showcase your solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {sponsorTiers.map((tier, index) => {
              const Icon = tier.icon;
              return (
                <Card
                  key={index}
                  className="p-8 border-2 hover:shadow-elegant transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6 mx-auto">
                    <Icon className="text-accent" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-center text-foreground mb-6">
                    {tier.tier}
                  </h3>
                  <ul className="space-y-3 mb-8">
                    {tier.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>

          <Card className="p-8 border-2 bg-secondary mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              Exhibition Opportunities
            </h3>
            <p className="text-muted-foreground text-center mb-8">
              Showcase your products and services to pharmaceutical manufacturing professionals
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {exhibitorCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-background p-4 rounded-lg text-center font-medium text-foreground"
                >
                  {category}
                </div>
              ))}
            </div>
          </Card>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Interested in Sponsorship?
            </h3>
            <p className="text-muted-foreground mb-6">
              Contact us to discuss customized sponsorship packages tailored to your goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                onClick={() => window.location.href = "mailto:hello@axygenpharmatech.com"}
              >
                <Mail className="mr-2" size={20} />
                Contact Sponsorship Team
              </Button>
              <a
                href="mailto:hello@axygenpharmatech.com"
                className="text-accent hover:underline font-semibold"
              >
                hello@axygenpharmatech.com
              </a>
            </div>
          </div>

          <div className="mt-16">
            <div className="flex justify-center mb-8">
              <img 
                src={initiativeLogo} 
                alt="Initiative Logo" 
                className="w-auto h-60 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
