export const EVENT_CONFIG = {
  name: "ADICOM FORUM 2026",
  subtitle: "Les règles du digital changent. Nouvelles tendances, nouveaux leaders.",
  dateISO: "2026-04-09T09:00:00",
  date: {
    start: "Jeudi 9 Avril 2026, 09:00",
    end: "Vendredi 10 Avril 2026, 18:00",
  },
  location: "Palais des Congrès, Brazaville, République du Congo",
  organizer: "Totem Experience",
  tickets: [
    {
      id: "standard",
      name: "Standard",
      price: 10000,
      currency: "FCFA",
      description: "Accès général à l'événement",
    },
    {
      id: "vip",
      name: "VIP",
      price: 25000,
      currency: "FCFA",
      description: "Accès VIP + networking + déjeuner",
    },
    {
      id: "premium",
      name: "Premium",
      price: 50000,
      currency: "FCFA",
      description: "Accès Premium + masterclass + cocktail",
    },
  ],
  whatsappNumber: "2250747974505", // numéro WhatsApp du service client
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Palais+des+Congrès,+Abidjan,+Côte+d'Ivoire",
};

export type TicketType = (typeof EVENT_CONFIG.tickets)[number];
