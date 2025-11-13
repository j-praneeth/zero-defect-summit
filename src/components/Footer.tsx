import { Mail, Phone, Globe, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import mainLogo from "@/assets/initiative-logo.png";

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <img src={mainLogo} alt="Axygen Pharmatech + Fixity Group" className="h-20 w-auto object-contain rounded-lg" />
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-accent">Zero-Defect Tablet Manufacturing</span> Workshop
              </h3>
              <p className="text-primary-foreground/80 text-sm">
                Premier pharmaceutical training event focused on tablet manufacturing excellence
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/"
                    onClick={() => setTimeout(() => scrollToSection("about"), 100)}
                    className="hover:text-accent transition-colors"
                  >
                    About Workshop
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    onClick={() => setTimeout(() => scrollToSection("speaker"), 100)}
                    className="hover:text-accent transition-colors"
                  >
                    Speaker
                  </Link>
                </li>
                <li>
                  <Link to="/agenda" className="hover:text-accent transition-colors">
                    Agenda
                  </Link>
                </li>
                <li>
                  <Link to="/registration" className="hover:text-accent transition-colors">
                    Register
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Contact Us</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Mail className="text-accent mt-1 flex-shrink-0" size={16} />
                  <a href="mailto:hello@axygenpharmatech.com" className="hover:text-accent transition-colors">
                    hello@axygenpharmatech.com
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="text-accent mt-1 flex-shrink-0" size={16} />
                  <div>
                    <div>+91 9603978651</div>
                    <div>040 24342228</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Globe className="text-accent mt-1 flex-shrink-0" size={16} />
                  <a
                    href="https://www.axygenpharmatech.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    www.axygenpharmatech.com
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="text-accent mt-1 flex-shrink-0" size={16} />
                  <span>Hyderabad, Telangana</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/70">
              <p>© 2025 Axygen Pharmatech. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="/privacy" className="hover:text-accent transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="hover:text-accent transition-colors">
                  Terms & Conditions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
