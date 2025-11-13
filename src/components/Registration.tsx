import { IndianRupee } from "lucide-react";
import RegistrationForm from "@/components/RegistrationForm";

const Registration = () => {
  return (
    <section id="register" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Register <span className="text-accent">Now</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              Secure your spot at this exclusive workshop
            </p>
            <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-xl font-bold">
              <IndianRupee size={24} />
              <span>35,000 + 18% GST per delegate</span>
            </div>
          </div>

          <RegistrationForm />
        </div>
      </div>
    </section>
  );
};

export default Registration;
