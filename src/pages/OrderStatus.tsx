import { useParams, useNavigate } from "react-router-dom";
import { getOrderById, confirmOrder } from "@/lib/orderStore";
import { EVENT_CONFIG } from "@/lib/eventConfig";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, Download, Calendar, MapPin, Ticket } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState, useEffect } from "react";

const OrderStatus = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState(getOrderById(orderId || ""));

  useEffect(() => {
    if (orderId) {
      setOrder(getOrderById(orderId));
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <p className="text-xl text-muted-foreground">Commande introuvable</p>
          <Button onClick={() => navigate("/")} className="font-display">
            Retour à l'accueil
          </Button>
        </div>
      </div>
    );
  }

  const ticket = EVENT_CONFIG.tickets.find((t) => t.id === order.ticketTypeId)!;
  const isPending = order.status === "pending";

  const handleConfirm = () => {
    if (orderId) {
      confirmOrder(orderId);
      setOrder(getOrderById(orderId));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Status header */}
        <div className="text-center mb-8">
          {isPending ? (
            <>
              <Clock className="w-16 h-16 text-accent mx-auto mb-4 animate-float" />
              <h1 className="text-3xl font-display font-bold mb-2">Commande en attente</h1>
              <p className="text-muted-foreground">
                Votre commande <span className="text-primary font-semibold">{order.orderId}</span> a été envoyée.
                Le service client confirmera votre paiement.
              </p>
            </>
          ) : (
            <>
              <CheckCircle className="w-16 h-16 text-[var(--step-done)] mx-auto mb-4" />
              <h1 className="text-3xl font-display font-bold mb-2">Paiement confirmé !</h1>
              <p className="text-muted-foreground">
                Vos billets pour <span className="text-primary font-semibold">{EVENT_CONFIG.name}</span> sont prêts.
              </p>
            </>
          )}
        </div>

        {/* Simulate confirm button (for demo — in prod, service client would do this) */}
        {isPending && (
          <div className="glass-card rounded-xl p-6 mb-6 text-center space-y-3 border-accent/30">
            <p className="text-sm text-muted-foreground">
              ⚙️ <strong>Démo :</strong> Simuler la confirmation du paiement par le service client
            </p>
            <Button onClick={handleConfirm} variant="outline" className="font-display gap-2 border-accent text-accent hover:bg-accent/10">
              <CheckCircle className="w-4 h-4" />
              Confirmer le paiement
            </Button>
          </div>
        )}

        {/* Tickets */}
        {!isPending && (
          <div className="space-y-6">
            {order.personalizations.map((p, i) => (
              <div key={i} className="glass-card rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-primary" />
                    <span className="font-display font-semibold">
                      Billet {i + 1} — {ticket.name}
                    </span>
                  </div>
                  <span className="text-accent font-display font-bold">
                    {ticket.price.toLocaleString("fr-FR")} {ticket.currency}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="bg-foreground p-3 rounded-lg">
                    <QRCodeSVG
                      value={`TICKET-${order.orderId}-${i + 1}-${p.name}`}
                      size={140}
                      level="H"
                    />
                  </div>
                  <div className="space-y-2 text-sm flex-1">
                    <p className="font-semibold text-lg">{p.name}</p>
                    <p className="text-muted-foreground">{p.phone}</p>
                    <div className="h-px bg-border my-2" />
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-3 h-3 text-primary" />
                      {EVENT_CONFIG.date.start}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-3 h-3 text-primary" />
                      {EVENT_CONFIG.location}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Réf : {order.orderId}-{i + 1}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => navigate("/")} className="font-display">
            Retour à l'accueil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
