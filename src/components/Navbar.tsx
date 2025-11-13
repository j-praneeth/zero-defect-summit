import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import mainLogo from "@/assets/initiative-logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (!isHomePage) {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navigateToPage = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage ? "bg-primary/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => navigate("/")} className="flex items-center gap-4 hover:opacity-80 transition-opacity">
            <img src={mainLogo} alt="Axygen Pharmatech + Fixity Group" className="h-16 w-auto object-contain rounded-lg" />
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-primary-foreground hover:text-accent transition-colors"
            >
              About Workshop
            </button>
            <button
              onClick={() => scrollToSection("speaker")}
              className="text-primary-foreground hover:text-accent transition-colors"
            >
              Speaker
            </button>
            <button
              onClick={() => navigateToPage("/agenda")}
              className="text-primary-foreground hover:text-accent transition-colors"
            >
              Agenda
            </button>
            <button
              onClick={() => scrollToSection("sponsors")}
              className="text-primary-foreground hover:text-accent transition-colors"
            >
              Sponsors
            </button>
            <Button
              onClick={() => navigateToPage("/registration")}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            >
              Register Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-primary-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 bg-primary/95 backdrop-blur-md">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("about")}
                className="text-primary-foreground hover:text-accent transition-colors text-left"
              >
                About Workshop
              </button>
              <button
                onClick={() => scrollToSection("speaker")}
                className="text-primary-foreground hover:text-accent transition-colors text-left"
              >
                Speaker
              </button>
              <button
                onClick={() => navigateToPage("/agenda")}
                className="text-primary-foreground hover:text-accent transition-colors text-left"
              >
                Agenda
              </button>
              <button
                onClick={() => scrollToSection("sponsors")}
                className="text-primary-foreground hover:text-accent transition-colors text-left"
              >
                Sponsors
              </button>
              <Button
                onClick={() => navigateToPage("/registration")}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold w-full"
              >
                Register Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
