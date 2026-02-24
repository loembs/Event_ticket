import { Calendar, MapPin, Users } from "lucide-react";
import { EVENT_CONFIG } from "@/lib/eventConfig";
import heroBanner from "@/assets/hero-banner.jpg";
import Countdown from "./Countdown";

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="Event banner"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 hero-gradient opacity-80" />
      </div>
      <div className="relative z-10 container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4 border border-primary/30">
             Événement à venir
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold mb-4 leading-tight">
            <span className="text-gradient">{EVENT_CONFIG.name}</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl">
            {EVENT_CONFIG.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{EVENT_CONFIG.date.start}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <a
                href={EVENT_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors underline underline-offset-2"
              >
                {EVENT_CONFIG.location}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span>{EVENT_CONFIG.organizer}</span>
            </div>
          </div>
          <Countdown targetDate={EVENT_CONFIG.dateISO} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
