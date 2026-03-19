import { EVENT_CONFIG } from "@/lib/eventConfig";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-3xl overflow-hidden border border-border shadow-2xl bg-card">
        <img
          src={EVENT_CONFIG.posterUrl}
          alt="Affiche ORUN MOMENT"
          className="w-full h-auto object-cover"
        />
        <div className="p-4 text-center">
          <p className="font-display font-semibold text-foreground">Chargement de la billetterie...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
