import { Minus, Plus, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EVENT_CONFIG } from "@/lib/eventConfig";
import { cn } from "@/lib/utils";
import { getAvailablePlaces } from "@/lib/stockStore";

interface TicketSelectorProps {
  selectedTicketId: string;
  quantity: number;
  onSelectTicket: (id: string) => void;
  onQuantityChange: (qty: number) => void;
  onNext: () => void;
}

const TicketSelector = ({
  selectedTicketId,
  quantity,
  onSelectTicket,
  onQuantityChange,
  onNext,
}: TicketSelectorProps) => {
  const selectedTicket = EVENT_CONFIG.tickets.find((t) => t.id === selectedTicketId);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold">Choisissez votre billet</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {EVENT_CONFIG.tickets.map((ticket) => {
          const available = getAvailablePlaces(ticket.id as "etudiant" | "professionnel");
          const soldOut = available <= 0;

          return (
            <button
              key={ticket.id}
              onClick={() => !soldOut && onSelectTicket(ticket.id)}
              disabled={soldOut}
              className={cn(
                "glass-card rounded-xl p-6 text-left transition-all duration-300 cursor-pointer hover:scale-[1.02]",
                selectedTicketId === ticket.id
                  ? "border-primary glow-primary"
                  : "border-border hover:border-muted-foreground/30",
                soldOut && "opacity-60 cursor-not-allowed hover:scale-100"
              )}
            >
              <div className="flex items-center gap-2 mb-3">
                <Ticket className="w-5 h-5 text-primary" />
                <span className="font-display font-semibold text-lg">{ticket.name}</span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">{ticket.description}</p>
              <p className="text-2xl font-display font-bold text-accent">
                {ticket.price.toLocaleString("fr-FR")} <span className="text-sm font-normal text-muted-foreground">{ticket.currency}</span>
              </p>
              <p className="mt-2 text-xs font-semibold">
                {soldOut ? "SOLD OUT" : `${available} place(s) restante(s)`}
              </p>
            </button>
          );
        })}
      </div>

      {selectedTicket && (
        <div className="glass-card rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-muted-foreground text-sm">Quantité</span>
            <div className="flex items-center gap-4 mt-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                className="rounded-full"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-2xl font-display font-bold w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  if (!selectedTicket) return;
                  const available = getAvailablePlaces(selectedTicket.id as "etudiant" | "professionnel");
                  onQuantityChange(Math.min(available, quantity + 1));
                }}
                className="rounded-full"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="text-right">
            <span className="text-muted-foreground text-sm">Total</span>
            <p className="text-3xl font-display font-bold text-accent">
              {(selectedTicket.price * quantity).toLocaleString("fr-FR")}{" "}
              <span className="text-base font-normal text-muted-foreground">{selectedTicket.currency}</span>
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Button
          onClick={onNext}
          disabled={!selectedTicketId}
          className="px-8 py-3 font-display font-semibold text-base"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default TicketSelector;
