import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Speaker from "@/components/Speaker";
import Sponsors from "@/components/Sponsors";
import KnowledgePartners from "@/components/KnowledgePartners";
import Venue from "@/components/Venue";
import FloorMap from "@/components/FloorMap";
import Registration from "@/components/Registration";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Speaker />
      <Sponsors />
      <KnowledgePartners />
      <Venue />
      <FloorMap />
      <Registration />
      <Footer />
    </div>
  );
};

export default Index;
