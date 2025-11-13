import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, User, Building2, Briefcase, CheckCircle2 } from "lucide-react";
import { saveRegistration } from "@/lib/api";
import { z } from "zod";

// Validation schema
const registrationSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Mobile number must be 10 digits starting with 6-9"),
  company: z.string().trim().min(2, "Company name must be at least 2 characters").max(200, "Company name must be less than 200 characters"),
  department: z.string().max(100, "Department name must be less than 100 characters").optional(),
});

const RegistrationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    department: "",
    company: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clean mobile number (remove spaces, dashes, and +91 country code)
    const cleanedMobile = formData.mobile.replace(/[\s\-+]/g, '').replace(/^91/, '');
    
    const dataToValidate = {
      ...formData,
      mobile: cleanedMobile,
    };

    // Validate with Zod
    try {
      registrationSchema.parse(dataToValidate);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Validation Error",
          description: firstError.message,
          variant: "destructive",
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // Send cleaned data to MongoDB via API
      await saveRegistration(dataToValidate);

      toast({
        title: "Registration Successful!",
        description: "Your registration has been saved to the database.",
      });

      // Store form data in sessionStorage for invoice page
      sessionStorage.setItem('registrationData', JSON.stringify(dataToValidate));
      
      // Navigate to invoice page
      setTimeout(() => {
        window.location.href = '/invoice';
      }, 1000);

    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error instanceof Error ? error.message : 'There was an error saving your registration. Please try again.';
      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Form - Takes 3 columns */}
      <div className="lg:col-span-3">
        <Card className="p-8 border-2">
          <h3 className="text-3xl font-bold text-foreground mb-2">
            Registration Form
          </h3>
          <p className="text-muted-foreground mb-8">
            Fill in your details to register for the workshop
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-foreground mb-2 flex items-center gap-2">
                <User size={16} className="text-accent" />
                Full Name *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="border-2 h-12"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-foreground mb-2 flex items-center gap-2">
                <Mail size={16} className="text-accent" />
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@company.com"
                required
                className="border-2 h-12"
              />
            </div>

            <div>
              <Label htmlFor="mobile" className="text-foreground mb-2 flex items-center gap-2">
                <Phone size={16} className="text-accent" />
                Mobile Number *
              </Label>
              <Input
                id="mobile"
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="9876543210 (10 digits)"
                required
                className="border-2 h-12"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter 10-digit mobile number (you can include +91, spaces, or dashes - they'll be auto-removed)
              </p>
            </div>

            <div>
              <Label htmlFor="department" className="text-foreground mb-2 flex items-center gap-2">
                <Briefcase size={16} className="text-accent" />
                Department
              </Label>
              <Input
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g., Production, QA, R&D"
                className="border-2 h-12"
              />
            </div>

            <div>
              <Label htmlFor="company" className="text-foreground mb-2 flex items-center gap-2">
                <Building2 size={16} className="text-accent" />
                Company Name *
              </Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your company name"
                required
                className="border-2 h-12"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6 font-semibold shadow-glow"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Register Now"}
            </Button>
          </form>
        </Card>
      </div>

      {/* Sidebar - Takes 2 columns */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-6 border-2 bg-primary text-primary-foreground">
          <h4 className="text-xl font-bold mb-4">What's Included</h4>
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
                <span className="text-primary-foreground/90">{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 border-2">
          <h4 className="text-xl font-bold text-foreground mb-4">
            Need Assistance?
          </h4>
          <div className="space-y-4 text-muted-foreground">
            <div>
              <p className="font-semibold text-foreground text-lg">Ms. Lakshmi</p>
              <p className="text-sm">Conference Manager</p>
            </div>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Mail className="text-accent flex-shrink-0" size={16} />
                <a href="mailto:hello@axygenpharmatech.com" className="hover:text-accent text-sm break-all">
                  hello@axygenpharmatech.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="text-accent flex-shrink-0" size={16} />
                <span className="text-sm">+91 9603978651</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="text-accent flex-shrink-0" size={16} />
                <span className="text-sm">040 24342228</span>
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-2 bg-accent/10">
          <h4 className="text-lg font-bold text-foreground mb-3">
            Cancellation Policy
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Full refund if cancelled 1+ weeks before event</li>
            <li>• 25% processing fee within 1 week of event</li>
            <li>• Substitution allowed anytime without fee</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationForm;
