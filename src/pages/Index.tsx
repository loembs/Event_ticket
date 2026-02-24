import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import StepIndicator from "@/components/StepIndicator";
import TicketSelector from "@/components/TicketSelector";
import CustomerForm from "@/components/CustomerForm";
import PersonalizationForm from "@/components/PersonalizationForm";
import OrderSummary from "@/components/OrderSummary";
import { TicketPersonalization } from "@/lib/orderStore";
import { EVENT_CONFIG } from "@/lib/eventConfig";

const STEPS = ["Billet", "Coordonnées", "Personnalisation", "Récapitulatif"];

const Index = () => {
  const [step, setStep] = useState(0);
  const [selectedTicketId, setSelectedTicketId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [personalizations, setPersonalizations] = useState<TicketPersonalization[]>([]);

  const handleSelectTicket = (id: string) => {
    setSelectedTicketId(id);
  };

  const handleQuantityChange = (qty: number) => {
    setQuantity(qty);
    // Adjust personalizations array
    setPersonalizations((prev) => {
      const newArr = [...prev];
      while (newArr.length < qty) newArr.push({ name: "", phone: "" });
      return newArr.slice(0, qty);
    });
  };

  const handleCustomerChange = (field: string, value: string) => {
    if (field === "customerName") setCustomerName(value);
    if (field === "customerEmail") setCustomerEmail(value);
    if (field === "customerPhone") setCustomerPhone(value);
  };

  const handlePersonalizationChange = (index: number, field: string, value: string) => {
    setPersonalizations((prev) => {
      const newArr = [...prev];
      newArr[index] = { ...newArr[index], [field]: value };
      return newArr;
    });
  };

  const goToStep = (s: number) => {
    if (s === 2 && personalizations.length < quantity) {
      const newArr = [...personalizations];
      while (newArr.length < quantity) newArr.push({ name: "", phone: "" });
      setPersonalizations(newArr);
    }
    setStep(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ticketName = EVENT_CONFIG.tickets.find((t) => t.id === selectedTicketId)?.name || "";

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      <main id="etapes" className="container mx-auto px-4 py-12 max-w-3xl">
        <StepIndicator steps={STEPS} currentStep={step} />

        {step === 0 && (
          <TicketSelector
            selectedTicketId={selectedTicketId}
            quantity={quantity}
            onSelectTicket={handleSelectTicket}
            onQuantityChange={handleQuantityChange}
            onNext={() => goToStep(1)}
          />
        )}

        {step === 1 && (
          <CustomerForm
            name={customerName}
            email={customerEmail}
            phone={customerPhone}
            onChange={handleCustomerChange}
            onNext={() => goToStep(2)}
            onBack={() => goToStep(0)}
          />
        )}

        {step === 2 && (
          <PersonalizationForm
            quantity={quantity}
            ticketName={ticketName}
            personalizations={personalizations}
            onChange={handlePersonalizationChange}
            onNext={() => goToStep(3)}
            onBack={() => goToStep(1)}
          />
        )}

        {step === 3 && (
          <OrderSummary
            ticketTypeId={selectedTicketId}
            quantity={quantity}
            customerName={customerName}
            customerEmail={customerEmail}
            customerPhone={customerPhone}
            personalizations={personalizations}
            onBack={() => goToStep(2)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 {EVENT_CONFIG.organizer} — Tous droits réservés</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
