import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPage = () => {
  useEffect(() => {
    document.title = "Privacy Policy - Zero-Defect Workshop";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Privacy policy for the Zero-Defect Workshop. Learn how Axygen Pharmatech processes and protects your personal data."
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-background to-secondary/20 py-12 lg:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl lg:text-4xl font-bold text-center mb-8 text-primary">
            Privacy Policy
          </h1>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl lg:text-2xl">Data Processing and Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                By registering, you consent to the processing of your personal data for order fulfillment. 
                APT will store and process your data only for this event and similar events.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPage;
