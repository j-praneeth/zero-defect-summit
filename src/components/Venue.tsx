import { MapPin, Navigation, Car, TrainFront, Clock, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import itcKohenurImage from "@/assets/itc-kohenur.png";
import { useState } from "react";

const Venue = () => {
  const venueName = "ITC Kohenur";
  const venueAddress = "ITC Kohenur, Hyderabad, Telangana";
  const fullAddress =
    "Survey No. 83/1, Hyderabad Knowledge City, Plot No.5, Silpa Gram Craft Village, Madhapur, Hyderabad, Telangana 500032, India";

  // Google Maps place/share URL (keeps it short + works across devices)
  const googleMapsUrl = "https://maps.app.goo.gl/4Ea8dxw7FVmXuEA56";

  const [copied, setCopied] = useState(false);
  const copyAddr = async () => {
    try {
      await navigator.clipboard.writeText(`${venueName}\n${fullAddress}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // no-op
    }
  };

  return (
    <section className="relative py-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary/40 via-background to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            Venue & Directions
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
            {venueName}
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Our location
          </p>
        </div>

        {/* Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Map (sticky on desktop) */}
          <div className="lg:col-span-7">
            <div className="sticky top-24">
              {/* Optional hero photo under map */}
              <div className="mb-4 overflow-hidden rounded-2xl border bg-card shadow-sm">
                <img
                  src={itcKohenurImage}
                  alt="ITC Kohenur, Hyderabad"
                  className="w-full h-64 md:h-96 object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                <iframe
                  className="w-full aspect-[4/3] md:aspect-[18/9]"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.5666144049897!2d78.38054818568153!3d17.43257395887624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9388a09a79f5%3A0x9ff99841b5ec9e9c!2sITC%20Kohenur%2C%20a%20Luxury%20Collection%20Hotel%2C%20Hyderabad!5e0!3m2!1sen!2sus!4v1762927571819!5m2!1sen!2sus"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ITC Kohenur Location Map"
                />
              </div>
            </div>
          </div>

          {/* Right: Stacked cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address Card */}
            <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">Address</h3>
                  <p className="text-muted-foreground">{venueAddress}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {fullAddress}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button asChild className="col-span-2 md:col-span-1 py-5 text-base">
                  <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                    <Navigation className="mr-2 h-4 w-4" />
                    Get directions
                  </a>
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="col-span-2 md:col-span-1 py-5 text-base"
                  onClick={copyAddr}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  {copied ? "Copied!" : "Copy address"}
                </Button>
              </div>
            </div>

            {/* Travel Options */}
            <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Travel options</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <Car className="h-5 w-5 mt-1 text-primary" />
                  <p className="text-muted-foreground">
                    Parking available at hotel. Drop-off at main porch on Knowledge City Rd.
                  </p>
                </li>
                <li className="flex gap-3">
                  <Clock className="h-5 w-5 mt-1 text-primary" />
                  <p className="text-muted-foreground">
                    Recommended arrival: 15–20 mins before session start for check-in.
                  </p>
                </li>
              </ul>
            </div>

            {/* Quick Facts */}
            <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Quick facts</h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="rounded-xl border p-4">
                  <p className="font-medium text-foreground">City</p>
                  Hyderabad
                </div>
                <div className="rounded-xl border p-4">
                  <p className="font-medium text-foreground">Area</p>
                  Madhapur / Knowledge City
                </div>
                <div className="rounded-xl border p-4">
                  <p className="font-medium text-foreground">Pin code</p>
                  500032
                </div>
                <div className="rounded-xl border p-4">
                  <p className="font-medium text-foreground">Map link</p>
                  <a
                    className="underline underline-offset-4"
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Maps
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Venue;
