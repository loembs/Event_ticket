import { Calendar, ChevronDown, MapPin, Phone } from "lucide-react";
import { EVENT_CONFIG } from "@/lib/eventConfig";
import Countdown from "./Countdown";

const HeroSection = () => {
  return (
    <section
      className="relative min-h-[85vh] w-full flex items-center justify-center px-4 py-16 sm:py-24 overflow-hidden bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url("${EVENT_CONFIG.posterUrl}")` }}
    >
      <div className="absolute inset-0 bg-white/80" />
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center relative z-10">
        <div className="w-full rounded-[2rem] sm:rounded-[2.5rem] bg-secondary/95 border border-border/60 shadow-xl shadow-black/10 overflow-hidden px-8 sm:px-12 py-12 sm:py-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/15 text-primary text-xs sm:text-sm font-semibold mb-6 tracking-wide">
            ORUN MOMENT
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-tight text-foreground mb-4 leading-tight">
            <span className="text-royal-blue">AfterWork</span> des Pros de la Comm
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-foreground mb-4">Brazzaville, prend le relais</p>
          <p className="text-base sm:text-lg font-semibold text-foreground mb-8">{EVENT_CONFIG.subtitle}</p>

          <div className="flex flex-col items-center gap-1 mb-2">
            <span className="text-xs text-foreground font-medium">Cliquez ici</span>
            <ChevronDown className="w-8 h-8 text-primary animate-bounce" aria-hidden />
          </div>

          <button
            type="button"
            onClick={() => document.getElementById("etapes")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-block px-4 py-2 rounded-full bg-primary/15 text-primary text-xs sm:text-sm font-medium mb-6 tracking-wide cursor-pointer hover:bg-primary/25 transition-colors"
          >
            Prenez votre place pour l'événement
          </button>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 text-base sm:text-lg font-bold text-black mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary shrink-0" />
              <span>{EVENT_CONFIG.date.start}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <a
                href={EVENT_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <span className="text-royal-blue">Brazzaville</span>, République du Congo
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <span>{EVENT_CONFIG.contacts[0]} / {EVENT_CONFIG.contacts[1]}</span>
            </div>
          </div>

          <div className="flex justify-center">
            <Countdown targetDate={EVENT_CONFIG.dateISO} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
