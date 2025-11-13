import gansonsLogo from "@/assets/logo-gansons.png";
import sotaxLogo from "@/assets/logo-sotax.png";
import bectochemLogo from "@/assets/logo-bectochem.png";
import hyderabadTubesLogo from "@/assets/logo-hyderabad-tubes.png";

const KnowledgePartners = () => {
  const partners = [
    {
      name: "Gansons",
      tagline: "Better Solutions Since 1947",
      logo: gansonsLogo
    },
    {
      name: "Sotax",
      logo: sotaxLogo
    },
    {
      name: "Bectochem Lödige",
      tagline: "Process Technology",
      logo: bectochemLogo
    },
    {
      name: "Hyderabad Tubes & Ducts (P) Ltd.",
      logo: hyderabadTubesLogo
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Knowledge Partners
            </h2>
            <p className="text-xl text-muted-foreground">
              In collaboration with industry leaders
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-card border-2 rounded-lg p-8 flex items-center justify-center hover:shadow-lg transition-shadow"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-20 max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgePartners;
