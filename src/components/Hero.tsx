import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import heroImage from "@/assets/hero-pharma.jpg";
import initiativeLogo from "@/assets/initiative-logo.png";

const Hero = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const targetDate = new Date("2025-12-11T09:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToRegister = () => {
    const element = document.getElementById("register");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-100 ease-out"
        style={{
          backgroundImage: `url(${heroImage})`,
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/75"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 md:pt-32 pb-12 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="text-center lg:text-left">
              <div className="inline-block bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6 animate-fade-in">
                <span className="text-accent font-semibold text-xs md:text-sm uppercase tracking-wider">
                  Premier Pharmaceutical Training Event
                </span>
              </div>

              <h1
                className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground mb-4 md:mb-6 leading-tight animate-fade-in"
                style={{ animationDelay: "0.2s", animationFillMode: "both" }}
              >
                Zero-Defect <br />
                Tablet Manufacturing
                <br />
                <span className="text-accent"> Workshop</span>
              </h1>

              <p
                className="text-lg sm:text-xl md:text-2xl text-primary-foreground/90 mb-6 md:mb-8 font-light animate-fade-in"
                style={{ animationDelay: "0.4s", animationFillMode: "both" }}
              >
                Master Compression & Coating Excellence
              </p>

              <div
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6 mb-6 md:mb-0 text-primary-foreground animate-fade-in"
                style={{ animationDelay: "0.6s", animationFillMode: "both" }}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="text-accent" size={20} />
                  <span className="text-sm md:text-base lg:text-lg">11-12 December 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="text-accent" size={20} />
                  <span className="text-sm md:text-base lg:text-lg">ITC Kohenur, Hyderabad, Telangana</span>
                </div>
              </div>

              <div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in lg:flex"
                style={{ animationDelay: "1s", animationFillMode: "both" }}
              ></div>

              <div
                className="text-primary-foreground/70 text-xs md:text-sm animate-fade-in hidden lg:block"
                style={{ animationDelay: "1.2s", animationFillMode: "both" }}
              >
                <p>
                  Speaker: <span className="text-accent font-semibold">Fred A. Rowley</span> - President, Solid Dosage
                  Training Inc., USA
                </p>
              </div>
            </div>

            {/* Right Side - Countdown Timer */}
            <div className="animate-fade-in" style={{ animationDelay: "0.8s", animationFillMode: "both" }}>
              <div className="bg-primary-foreground/5 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-primary-foreground/20">
                <p className="text-primary-foreground/80 mb-3 md:mb-4 text-center text-xs uppercase tracking-wider">
                  Event Starts In
                </p>
                <div className="grid grid-cols-4 gap-2 md:gap-3">
                  {[
                    { value: timeLeft.days, label: "Days" },
                    { value: timeLeft.hours, label: "Hours" },
                    { value: timeLeft.minutes, label: "Min" },
                    { value: timeLeft.seconds, label: "Sec" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-primary-foreground/10 backdrop-blur-md rounded-lg p-2 md:p-3 border border-primary-foreground/20 text-center"
                    >
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-accent mb-1">
                        {item.value.toString().padStart(2, "0")}
                      </div>
                      <div className="text-[9px] md:text-[10px] text-primary-foreground/80 uppercase tracking-wider">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mt-4 md:mt-6">
                  <Button
                    onClick={() => navigate("/registration")}
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground text-sm md:text-base px-4 md:px-6 py-4 md:py-5 font-semibold shadow-glow flex-1"
                  >
                    Register Now
                  </Button>
                  <Button
                    onClick={() => {
                      const element = document.getElementById("about");
                      if (element) element.scrollIntoView({ behavior: "smooth" });
                    }}
                    size="lg"
                    variant="nav"
                    className="text-sm md:text-base px-4 md:px-6 py-4 md:py-5 font-semibold flex-1"
                  >
                    Learn More
                  </Button>
                </div>
              </div>

              <div className="text-primary-foreground/70 text-xs text-center mt-4 lg:hidden">
                <p>
                  Speaker: <span className="text-accent font-semibold">Fred A. Rowley</span>
                </p>
                <p className="text-[10px]">President, Solid Dosage Training Inc., USA</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
