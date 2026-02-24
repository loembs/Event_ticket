import { Button } from "@/components/ui/button";
import { Calendar, MapPin, MessageCircle, Ticket, User } from "lucide-react";
import { EVENT_CONFIG } from "@/lib/eventConfig";
import { OrderData, generateOrderId, saveOrder } from "@/lib/orderStore";
import { TicketPersonalization } from "@/lib/orderStore";
import { useNavigate } from "react-router-dom";

interface OrderSummaryProps {
  ticketTypeId: string;
  quantity: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  personalizations: TicketPersonalization[];
  onBack: () => void;
}

const OrderSummary = ({
  ticketTypeId,
  quantity,
  customerName,
  customerEmail,
  customerPhone,
  personalizations,
  onBack,
}: OrderSummaryProps) => {
  const navigate = useNavigate();
  const ticket = EVENT_CONFIG.tickets.find((t) => t.id === ticketTypeId)!;
  const total = ticket.price * quantity;

  const handleSendWhatsApp = () => {
    const orderId = generateOrderId();

    const order: OrderData = {
      ticketTypeId,
      quantity,
      customerName,
      customerEmail,
      customerPhone,
      personalizations,
      orderId,
      totalPrice: total,
      status: "pending",
    };
    saveOrder(order);

    const ticketDetails = personalizations
      .map((p, i) => `  Billet ${i + 1}: ${p.name} (${p.phone})`)
      .join("\n");

    const message = `🎫 *NOUVELLE COMMANDE DE TICKETS*
━━━━━━━━━━━━━━━
📋 *N° Commande:* ${orderId}
🎪 *Événement:* ${EVENT_CONFIG.name}
📍 *Lieu:* ${EVENT_CONFIG.location}
📅 *Date:* ${EVENT_CONFIG.date.start}

🎟️ *Type:* ${ticket.name}
🔢 *Quantité:* ${quantity}
💰 *Total:* ${total.toLocaleString("fr-FR")} ${ticket.currency}

👤 *Client:* ${customerName}
📧 *Email:* ${customerEmail}
📱 *Tél:* ${customerPhone}

📝 *Détails des billets:*
${ticketDetails}
━━━━━━━━━━━━━━━
⏳ En attente de confirmation de paiement`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${EVENT_CONFIG.whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    // Navigate to pending page
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
        <p className="text-sm text-muted-foreground text-center">
          📱 En cliquant sur le bouton ci-dessous, votre commande sera envoyée au service client via WhatsApp.
          Après confirmation de votre paiement, votre ticket sera généré automatiquement.
        </p>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="font-display">
          Retour
        </Button>
        <Button
          onClick={handleSendWhatsApp}
          className="px-8 font-display font-semibold gap-2 text-base"
        >
          <MessageCircle className="w-5 h-5" />
          Envoyer via WhatsApp
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
