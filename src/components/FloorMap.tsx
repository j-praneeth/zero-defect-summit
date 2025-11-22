import React from "react";
import "./FloorMap.css";

interface Hotspot {
  id: string;
  label: string;
  left: string; // percentage
  top: string; // percentage
  width: string; // percentage
  height: string; // percentage
  status: "Booked" | "Available";
  size: string;
  facing: string;
}

const HOTSPOTS: Hotspot[] = [
  // Bottom Row (Left to Right) - Stalls 1-3
  { id: "stall-1", label: "Stall 1", left: "64.2%", top: "46.2%", width: "3.2%", height: "6.8%", status: "Available", size: "8' x 8'", facing: "Ballroom" },
  { id: "stall-2", label: "Stall 2", left: "67.5%", top: "46.2%", width: "3.2%", height: "6.8%", status: "Available", size: "8' x 8'", facing: "Ballroom" },
  { id: "stall-3", label: "Stall 3", left: "70.8%", top: "46.2%", width: "2.4%", height: "6.8%", status: "Available", size: "8' x 5'5\"", facing: "Ballroom" },

  // Right Column (Bottom to Top) - Stalls 4-6
  { id: "stall-4", label: "Stall 4", left: "73.4%", top: "39.2%", width: "2.4%", height: "6.8%", status: "Available", size: "8' x 5'", facing: "Ballroom" },
  { id: "stall-5", label: "Stall 5", left: "73.4%", top: "32.2%", width: "2.4%", height: "6.8%", status: "Available", size: "8' x 5'", facing: "Ballroom" },
  { id: "stall-6", label: "Stall 6", left: "73.4%", top: "25.2%", width: "2.4%", height: "6.8%", status: "Available", size: "6' x 5'", facing: "Ballroom" },

  // Top Row (Right to Left) - Stalls 7-10
  { id: "stall-7", label: "Stall 7", left: "70.8%", top: "18.5%", width: "2.4%", height: "6.8%", status: "Available", size: "6' x 5'", facing: "Ballroom" },
  { id: "stall-8", label: "Stall 8", left: "67.5%", top: "18.5%", width: "3.2%", height: "6.8%", status: "Available", size: "6' x 5'", facing: "Ballroom" },
  { id: "stall-9", label: "Stall 9", left: "64.2%", top: "18.5%", width: "3.2%", height: "6.8%", status: "Available", size: "6' x 5'", facing: "Ballroom" },
  { id: "stall-10", label: "Stall 10", left: "60.9%", top: "18.5%", width: "3.2%", height: "6.8%", status: "Available", size: "6' x 5'", facing: "Ballroom" },

  // Bottom Right Area (Left to Right) - Stalls 11-13
  { id: "stall-11", label: "Stall 11", left: "75.8%", top: "73.5%", width: "2.8%", height: "5.5%", status: "Available", size: "8' x 8'", facing: "Pre-Function Area" },
  { id: "stall-12", label: "Stall 12", left: "79.0%", top: "75.5%", width: "2.8%", height: "5.5%", status: "Available", size: "8' x 8'", facing: "Pre-Function Area" },
  { id: "stall-13", label: "Stall 13", left: "82.2%", top: "77.5%", width: "2.5%", height: "5.0%", status: "Available", size: "8' x 6'3\"", facing: "Pre-Function Area" },

  // Near Entrance
  { id: "stall-14", label: "Stall 14", left: "86.0%", top: "68.0%", width: "2.5%", height: "5.0%", status: "Available", size: "6' x 6'", facing: "Entrance" },
];

const FloorMap = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Event Floor Plan</h2>
          <p className="text-lg text-muted-foreground">
            Explore the venue layout. Hover over areas to see availability.
          </p>
        </div>

        <div className="floor-map-container shadow-lg rounded-xl border bg-card">
          <img
            src="/map.png"
            alt="Event Floor Map"
            className="floor-map-image"
          />
          {HOTSPOTS.map((spot) => (
            <div
              key={spot.id}
              className={`hotspot ${spot.status.toLowerCase()}`}
              data-label={`${spot.label}\n${spot.size}\n${spot.facing}\n${spot.status}`}
              data-area={spot.facing}
              style={{
                left: spot.left,
                top: spot.top,
                width: spot.width,
                height: spot.height,
              }}
            />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-orange-500/30 border-2 border-orange-500"></div>
            <span>Ballroom Facing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-500/30 border-2 border-yellow-500"></div>
            <span>Pre-Function / Entrance Facing</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FloorMap;