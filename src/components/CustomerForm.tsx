import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, Briefcase, GraduationCap } from "lucide-react";

interface CustomerFormProps {
  name: string;
  email: string;
  phone: string;
  status: string;
  schoolOrCompany: string;
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const CustomerForm = ({ name, email, phone, status, schoolOrCompany, onChange, onNext, onBack }: CustomerFormProps) => {
  const isValid =
    name.trim().length > 0 &&
    email.includes("@") &&
    phone.trim().length >= 8 &&
    (status === "etudiant" || status === "professionnel") &&
    schoolOrCompany.trim().length > 1;

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
            placeholder="+242 06 XX XX XX XX"
            value={phone}
            onChange={(e) => onChange("customerPhone", e.target.value)}
            className="bg-secondary/50 border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status" className="flex items-center gap-2 text-sm">
            <Briefcase className="w-4 h-4 text-primary" /> Statut
          </Label>
          <select
            id="status"
            value={status}
            onChange={(e) => onChange("customerStatus", e.target.value)}
            className="w-full h-10 rounded-md border border-border bg-secondary/50 px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Sélectionnez votre statut</option>
            <option value="etudiant">Étudiant</option>
            <option value="professionnel">Professionnel</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="schoolOrCompany" className="flex items-center gap-2 text-sm">
            <GraduationCap className="w-4 h-4 text-primary" />
            {status === "professionnel" ? "Entreprise" : "École / Université"}
          </Label>
          <Input
            id="schoolOrCompany"
            placeholder={status === "professionnel" ? "Nom de l'entreprise" : "Nom de l'école / université"}
            value={schoolOrCompany}
            onChange={(e) => onChange("schoolOrCompany", e.target.value)}
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
