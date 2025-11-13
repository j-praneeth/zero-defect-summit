import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsPage = () => {
  useEffect(() => {
    document.title = "Terms & Conditions - Zero-Defect Workshop";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Terms and conditions for the Zero-Defect Workshop by Axygen Pharmatech. Learn about registration, cancellation policies, and payment terms."
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-background to-secondary/20 py-12 lg:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl lg:text-4xl font-bold text-center mb-8 text-primary">
            Terms & Conditions
          </h1>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl lg:text-2xl">General Terms and Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>If you are unable to attend the conference, you have the following options:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>
                  <strong>Substitution:</strong> A substitute colleague may attend in your place at any time.
                </li>
                <li>
                  <strong>Cancellation:</strong> If you need to cancel your registration entirely, the following processing fees apply:
                  <ul className="list-disc list-inside ml-6 mt-2">
                    <li><strong>Within 1 week of the conference:</strong> 25% of the registration fee.</li>
                  </ul>
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl lg:text-2xl">Changes & Cancellations by Axygen Pharmatech [APT]</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                APT reserves the right to modify event materials, instructors, or speakers without prior notice or to cancel the event. In case of cancellation, registrants will be notified as soon as possible and will receive a full refund of fees paid. APT is not responsible for airfare penalties or other costs incurred due to a cancellation.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl lg:text-2xl">Payment Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Payment is due in full within <strong>5 days</strong> of receiving the invoice, without deductions.</p>
              <div>
                <h3 className="font-semibold mb-2">Important Information</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Registration is binding. In the event of cancellation or nonattendance, the applicable fees must be paid.</li>
                  <li>Cancellations must be submitted in writing. The cancellation fee will be calculated based on when APT receives the notification.</li>
                  <li>Failure to inform APT of non-attendance will result in liability for the full registration fee, regardless of Payment status.</li>
                  <li>Participation in the conference is confirmed only upon receipt of payment.</li>
                  <li>The court of jurisdiction is <strong>Hyderabad</strong>.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsPage;
