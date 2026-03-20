import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Ticket, User } from "lucide-react";
import { EVENT_CONFIG } from "@/lib/eventConfig";
import { TicketPersonalization } from "@/lib/orderStore";
import { useNavigate } from "react-router-dom";

interface OrderSummaryProps {
  orderId: string;
  ticketTypeId: string;
  quantity: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerStatus: string;
  schoolOrCompany: string;
  personalizations: TicketPersonalization[];
  onBack: () => void;
}

const OrderSummary = ({
  orderId,
  ticketTypeId,
  quantity,
  customerName,
  customerEmail,
  customerPhone,
  customerStatus,
  schoolOrCompany,
  personalizations,
  onBack,
}: OrderSummaryProps) => {
  const navigate = useNavigate();
  const ticket = EVENT_CONFIG.tickets.find((t) => t.id === ticketTypeId)!;
  const total = ticket.price * quantity;

  const handleContinue = () => {
    navigate(`/order/${orderId}`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold">Récapitulatif de la commande</h2>

      <div className="glass-card rounded-xl p-6 space-y-6">
        {/* Event info */}
        <div className="space-y-3">
          <h3 className="font-display font-semibold text-lg text-primary">Date & Lieu</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            {EVENT_CONFIG.location}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            {EVENT_CONFIG.date.start} — {EVENT_CONFIG.date.end}
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Billing */}
        <div className="space-y-3">
          <h3 className="font-display font-semibold text-lg text-primary">Facturation</h3>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tarif ({ticket.name})</span>
            <span className="font-semibold">{ticket.price.toLocaleString("fr-FR")} {ticket.currency}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Quantité</span>
            <span className="font-semibold">{quantity}</span>
          </div>
          <div className="h-px bg-border" />
          <div className="flex justify-between">
            <span className="font-display font-bold text-lg">Total</span>
            <span className="font-display font-bold text-2xl text-accent">
              {total.toLocaleString("fr-FR")} {ticket.currency}
            </span>
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Customer */}
        <div className="space-y-3">
          <h3 className="font-display font-semibold text-lg text-primary">Coordonnées</h3>
          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-primary" />
            {customerName} — {customerEmail} — {customerPhone}
          </div>
          <div className="text-sm text-muted-foreground">
            Statut: {customerStatus} — {schoolOrCompany}
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Tickets */}
        <div className="space-y-3">
          <h3 className="font-display font-semibold text-lg text-primary">Billets</h3>
          {personalizations.map((p, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <Ticket className="w-4 h-4 text-accent" />
              Billet {i + 1}: {p.name} ({p.phone})
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-xl p-4 border-primary/30 bg-primary/5">
        <p className="text-sm text-muted-foreground text-center leading-relaxed">
          Vos informations ont été envoyées sur WhatsApp. La réservation sera validée après vérification du paiement.
          Vous pouvez suivre l&apos;état de votre commande ci-dessous.
        </p>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="font-display">
          Retour
        </Button>
        <Button
          onClick={handleContinue}
          className="px-8 font-display font-semibold text-base"
        >
          Voir le statut de la commande
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
