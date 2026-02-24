import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone } from "lucide-react";

interface CustomerFormProps {
  name: string;
  email: string;
  phone: string;
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const CustomerForm = ({ name, email, phone, onChange, onNext, onBack }: CustomerFormProps) => {
  const isValid = name.trim().length > 0 && email.includes("@") && phone.trim().length >= 8;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold">Vos coordonnées</h2>

      <div className="glass-card rounded-xl p-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-primary" /> Nom complet
          </Label>
          <Input
            id="name"
            placeholder="Jean Dupont"
            value={name}
            onChange={(e) => onChange("customerName", e.target.value)}
            className="bg-secondary/50 border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-primary" /> Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="jean@email.com"
            value={email}
            onChange={(e) => onChange("customerEmail", e.target.value)}
            className="bg-secondary/50 border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-primary" /> Téléphone
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+225 07 XX XX XX XX"
            value={phone}
            onChange={(e) => onChange("customerPhone", e.target.value)}
            className="bg-secondary/50 border-border"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} className="font-display">
          Retour
        </Button>
        <Button onClick={onNext} disabled={!isValid} className="px-8 font-display font-semibold">
          Continuer
        </Button>
      </div>
    </div>
  );
};

export default CustomerForm;
