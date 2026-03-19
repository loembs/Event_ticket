import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import StepIndicator from "@/components/StepIndicator";
import TicketSelector from "@/components/TicketSelector";
import CustomerForm from "@/components/CustomerForm";
import PaymentStep from "@/components/PaymentStep";
import OrderSummary from "@/components/OrderSummary";
import { generateOrderId, saveOrder, TicketPersonalization } from "@/lib/orderStore";
import { EVENT_CONFIG } from "@/lib/eventConfig";
import {
  reservePlaces,
  getAvailablePlaces,
  isSoldOutAll,
  AttendeeStatus,
  initStockFromSupabase,
} from "@/lib/stockStore";

const STEPS = ["Billet", "Coordonnées", "Paiement", "Récapitulatif"];

const Index = () => {
  const [step, setStep] = useState(0);
  const [selectedTicketId, setSelectedTicketId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerStatus, setCustomerStatus] = useState<"" | AttendeeStatus>("");
  const [schoolOrCompany, setSchoolOrCompany] = useState("");
  const [personalizations, setPersonalizations] = useState<TicketPersonalization[]>([]);
  const [orderId, setOrderId] = useState("");
  const [stockRefreshKey, setStockRefreshKey] = useState(0);

  useEffect(() => {
    initStockFromSupabase().finally(() => {
      setStockRefreshKey((v) => v + 1);
    });
  }, []);

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
    if (field === "customerStatus") setCustomerStatus(value as AttendeeStatus);
    if (field === "schoolOrCompany") setSchoolOrCompany(value);
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

  const ticket = EVENT_CONFIG.tickets.find((t) => t.id === selectedTicketId);

  const handleCustomerNext = async () => {
    // Open a blank tab immediately on user click to avoid popup blocking
    // after async operations (stock check/reservation).
    const whatsappTab = window.open("", "_blank", "noopener,noreferrer");

    if (!ticket) return;
    if (!customerStatus) return;

    const expectedTicketId = customerStatus === "etudiant" ? "etudiant" : "professionnel";
    if (selectedTicketId !== expectedTicketId) {
      alert("Le statut doit correspondre au type de billet choisi.");
      return;
    }

    const available = getAvailablePlaces(customerStatus);
    if (available < quantity) {
      alert(`Places insuffisantes. Il reste ${available} place(s) pour ${customerStatus}.`);
      return;
    }

    const reserved = await reservePlaces(customerStatus, quantity);
    if (!reserved) {
      alert("Impossible de reserver ces places pour le moment.");
      await initStockFromSupabase();
      setStockRefreshKey((v) => v + 1);
      return;
    }
    setStockRefreshKey((v) => v + 1);

    const generatedOrderId = generateOrderId();
    setOrderId(generatedOrderId);

    const ticketDetails = Array.from({ length: quantity })
      .map((_, i) => {
        const p = personalizations[i];
        const name = p?.name?.trim() || customerName;
        const phone = p?.phone?.trim() || customerPhone;
        return `  Billet ${i + 1}: ${name} (${phone})`;
      })
      .join("\n");

    const total = ticket.price * quantity;
    const message = `🎫 *NOUVELLE RESERVATION*\n━━━━━━━━━━━━━━━\n📋 *N° Commande:* ${generatedOrderId}\n🎪 *Evenement:* ${EVENT_CONFIG.name}\n📍 *Lieu:* ${EVENT_CONFIG.location}\n📅 *Date:* ${EVENT_CONFIG.date.start}\n\n🎟️ *Type:* ${ticket.name}\n🔢 *Quantite:* ${quantity}\n💰 *Total:* ${total.toLocaleString("fr-FR")} ${ticket.currency}\n\n👤 *Client:* ${customerName}\n📧 *Email:* ${customerEmail}\n📱 *Tel:* ${customerPhone}\n🏷️ *Statut:* ${customerStatus}\n🏫 *Ecole/Entreprise:* ${schoolOrCompany}\n\n📝 *Billets:*\n${ticketDetails}\n━━━━━━━━━━━━━━━`;
    const whatsappUrl = `https://wa.me/${EVENT_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    if (whatsappTab) {
      whatsappTab.location.href = whatsappUrl;
    } else {
      // Fallback if popup was still blocked.
      window.location.href = whatsappUrl;
    }

    saveOrder({
      orderId: generatedOrderId,
      ticketTypeId: selectedTicketId,
      quantity,
      customerName,
      customerEmail,
      customerPhone,
      customerStatus,
      schoolOrCompany,
      personalizations: Array.from({ length: quantity }).map((_, i) => ({
        name: personalizations[i]?.name || customerName,
        phone: personalizations[i]?.phone || customerPhone,
      })),
      totalPrice: total,
      status: "pending",
    });

    goToStep(2);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      <main id="etapes" className="container mx-auto px-4 py-12 max-w-3xl">
        <StepIndicator steps={STEPS} currentStep={step} />

        {step === 0 && (
          <TicketSelector
            key={stockRefreshKey}
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
            status={customerStatus}
            schoolOrCompany={schoolOrCompany}
            onChange={handleCustomerChange}
            onNext={handleCustomerNext}
            onBack={() => goToStep(0)}
          />
        )}

        {step === 2 && (
          <PaymentStep
            onNext={() => goToStep(3)}
            onBack={() => goToStep(1)}
          />
        )}

        {step === 3 && (
          <OrderSummary
            orderId={orderId}
            ticketTypeId={selectedTicketId}
            quantity={quantity}
            customerName={customerName}
            customerEmail={customerEmail}
            customerPhone={customerPhone}
            customerStatus={customerStatus}
            schoolOrCompany={schoolOrCompany}
            personalizations={personalizations}
            onBack={() => goToStep(2)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 {EVENT_CONFIG.organizer} — {isSoldOutAll() ? "SOLD OUT" : `Places: Etudiants ${getAvailablePlaces("etudiant")} / Professionnels ${getAvailablePlaces("professionnel")}`}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
