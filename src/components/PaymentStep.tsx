import { Button } from "@/components/ui/button";
import { EVENT_CONFIG } from "@/lib/eventConfig";

interface PaymentStepProps {
  onBack: () => void;
  onFinishReservation: () => void;
}

const PaymentStep = ({ onBack, onFinishReservation }: PaymentStepProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold">Paiement mobile money</h2>

      <div className="glass-card rounded-xl p-6 space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          <span className="font-medium text-foreground">Important :</span>Les paiements de tickets se font uniquement sur MTN et AIRTEL money, Veuillez cliquer sur{" "}
          <span className="font-medium text-foreground">Terminer la réservation</span> pour confirmer votre commande.

          Vous serez redirigé vers WhatsApp et un conseiller prendra votre demande en charge.

          <span className="font-medium text-foreground">Merci pour votre intérêt.</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="rounded-xl border border-border bg-card p-4 flex items-center justify-center min-h-[120px]">
            <img src={EVENT_CONFIG.airtelMoneyLogo} alt="Airtel Money" className="max-h-16 object-contain" />
          </div>
          <div className="rounded-xl border border-border bg-card p-4 flex items-center justify-center min-h-[120px]">
            <img src={EVENT_CONFIG.mtnMoneyLogo} alt="MTN Mobile Money" className="max-h-16 object-contain" />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="font-display">
          Retour
        </Button>
        <Button onClick={onFinishReservation} className="font-display font-semibold">
          Terminer la réservation
        </Button>
      </div>
    </div>
  );
};

export default PaymentStep;
