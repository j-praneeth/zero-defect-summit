import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IndianRupee, User, Mail, Phone, Building2, Briefcase, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RegistrationData {
  name: string;
  email: string;
  mobile: string;
  department: string;
  company: string;
}

const InvoicePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedData = sessionStorage.getItem('registrationData');
    if (!storedData) {
      navigate('/registration');
      return;
    }
    setRegistrationData(JSON.parse(storedData));
  }, [navigate]);

  const handleProceedToPayment = () => {
    const razorpayUrl = "https://pages.razorpay.com/pl_Rcl7g8v2n2DDkC/view";
    window.location.href = razorpayUrl;
  };

  if (!registrationData) {
    return null;
  }

  const baseAmount = 35000;
  const gstRate = 0.18;
  const gstAmount = baseAmount * gstRate;
  const totalAmount = baseAmount + gstAmount;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/80 pt-32 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
              Registration <span className="text-accent">Invoice</span>
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Please review your registration details
            </p>
          </div>
        </div>
      </section>

      {/* Invoice Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Two Column Layout: User Details & Price/Included */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Registration Details - Left */}
              <Card className="p-8 border-2">
                <h2 className="text-2xl font-bold text-foreground mb-6">Registration Details</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                    <User className="text-accent mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-semibold text-foreground">{registrationData.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                    <Mail className="text-accent mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm text-muted-foreground">Email Address</p>
                      <p className="font-semibold text-foreground">{registrationData.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                    <Phone className="text-accent mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm text-muted-foreground">Mobile Number</p>
                      <p className="font-semibold text-foreground">{registrationData.mobile}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                    <Building2 className="text-accent mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm text-muted-foreground">Company Name</p>
                      <p className="font-semibold text-foreground">{registrationData.company}</p>
                    </div>
                  </div>

                  {registrationData.department && (
                    <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                      <Briefcase className="text-accent mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="text-sm text-muted-foreground">Department</p>
                        <p className="font-semibold text-foreground">{registrationData.department}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Right Column: Price Breakdown & What's Included */}
              <div className="space-y-6">
                {/* Price Breakdown */}
                <Card className="p-8 border-2">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Price Breakdown</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-muted-foreground">Workshop Fee</span>
                      <span className="font-semibold text-foreground flex items-center gap-1">
                        <IndianRupee size={16} />
                        {baseAmount.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="text-muted-foreground">GST (18%)</span>
                      <span className="font-semibold text-foreground flex items-center gap-1">
                        <IndianRupee size={16} />
                        {gstAmount.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-4 bg-primary text-primary-foreground rounded-lg px-4">
                      <span className="text-lg font-bold">Total Amount</span>
                      <span className="text-2xl font-bold flex items-center gap-1">
                        <IndianRupee size={24} />
                        {totalAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </Card>

                {/* What's Included */}
                <Card className="p-8 border-2 bg-accent/10">
                  <h3 className="text-xl font-bold text-foreground mb-4">What's Included</h3>
                  <ul className="space-y-3">
                    {[
                      "2-Day Comprehensive Training",
                      "Workshop Materials & Resources",
                      "Certificate of Completion",
                      "Lunch & Refreshments",
                      "Networking Opportunities",
                      "Access to Expert Q&A Sessions",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="text-accent mt-0.5 flex-shrink-0" size={20} />
                        <span className="text-foreground/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleProceedToPayment}
                className="w-full md:w-auto min-w-[300px] bg-accent hover:bg-accent/90 text-accent-foreground h-14 text-lg font-semibold shadow-glow"
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InvoicePage;
