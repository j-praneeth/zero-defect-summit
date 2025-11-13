import { IndianRupee } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/RegistrationForm";

const RegistrationPage = () => {

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/80 pt-32 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
              Register <span className="text-accent">Now</span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Secure your spot at this exclusive workshop
            </p>
            <div className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 rounded-full text-xl font-bold shadow-glow">
              <IndianRupee size={28} />
              <span>35,000 + 18% GST per delegate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <RegistrationForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RegistrationPage;
