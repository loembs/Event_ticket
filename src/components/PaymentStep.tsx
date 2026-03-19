import { Button } from "@/components/ui/button";
import { EVENT_CONFIG } from "@/lib/eventConfig";

interface PaymentStepProps {
  onBack: () => void;
  onNext: () => void;
}

const PaymentStep = ({ onBack, onNext }: PaymentStepProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold">Paiement mobile money</h2>

      <div className="glass-card rounded-xl p-6 space-y-4">
        <p className="text-base font-semibold text-foreground">
          Veillez a present effectuer votre paiement via Airtelmoney ou MTNmoney au numero :
          {" "}
          {EVENT_CONFIG.paymentNumber}.
        </p>
        <p className="text-sm text-muted-foreground">
          Votre reservation sera prise en compte et nous vous enverrons votre place.
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
        <Button onClick={onNext} className="font-display font-semibold">
          J'ai effectue le paiement
        </Button>
      </div>
    </div>
  );
};

export default PaymentStep;
