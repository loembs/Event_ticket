import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ticket } from "lucide-react";
import { TicketPersonalization } from "@/lib/orderStore";

interface PersonalizationFormProps {
  quantity: number;
  ticketName: string;
  personalizations: TicketPersonalization[];
  onChange: (index: number, field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const PersonalizationForm = ({
  quantity,
  ticketName,
  personalizations,
  onChange,
  onNext,
  onBack,
}: PersonalizationFormProps) => {
  const isValid = personalizations.every(
    (p) => p.name.trim().length > 0 && p.phone.trim().length >= 8
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold">Personnalisation des billets</h2>
      <p className="text-muted-foreground text-sm">
        Renseignez les informations pour chaque billet
      </p>

      <div className="space-y-4">
        {Array.from({ length: quantity }).map((_, i) => (
          <div key={i} className="glass-card rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-primary font-display font-semibold">
              <Ticket className="w-4 h-4" />
              Billet {i + 1} — {ticketName}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm">Nom & Prénom(s)</Label>
                <Input
                  placeholder="Nom complet"
                  value={personalizations[i]?.name || ""}
                  onChange={(e) => onChange(i, "name", e.target.value)}
                  className="bg-secondary/50 border-border"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Téléphone</Label>
                <Input
                  type="tel"
                  placeholder="+225 07 XX XX XX XX"
                  value={personalizations[i]?.phone || ""}
                  onChange={(e) => onChange(i, "phone", e.target.value)}
                  className="bg-secondary/50 border-border"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="font-display">
          Retour
        </Button>
        <Button onClick={onNext} disabled={!isValid} className="px-8 font-display font-semibold">
          Voir le récapitulatif
        </Button>
      </div>
    </div>
  );
};

export default PersonalizationForm;
