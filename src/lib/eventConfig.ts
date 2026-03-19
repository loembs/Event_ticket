export const EVENT_CONFIG = {
  name: "Afterwork des pros de la communication 2e édition",
  subtitle: "After Work PRO COM — Brazzaville, prends le relais.",
  dateISO: "2026-05-09T09:00:00",
  date: {
    start: "09 Mai 2026",
    end: "Journée networking",
  },
  location: "Brazzaville, République du Congo",
  organizer: "ORUN MOMENT",
  contacts: ["+242 06 814 44 98", "+221 71 045 26 66"],
  tickets: [
    {
      id: "etudiant",
      name: "Étudiant",
      price: 10000,
      currency: "XAF",
      description: "Participation étudiant",
    },
    {
      id: "professionnel",
      name: "Professionnel",
      price: 15000,
      currency: "XAF",
      description: "Participation professionnel",
    },
  ],
  whatsappNumber: "221710452666",
  paymentNumber: "+242 06 814 44 98",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Brazzaville,+Congo",
  posterUrl: "https://res.cloudinary.com/dlna2kuo1/image/upload/v1773920562/afficheorunmoment_wsbwna.jpg",
  airtelMoneyLogo: "https://res.cloudinary.com/dlna2kuo1/image/upload/v1773920772/Airtelmoney_ntqvrw.png",
  mtnMoneyLogo: "https://res.cloudinary.com/dlna2kuo1/image/upload/v1773920771/MTNmobilemoney_y7gfqa.jpg",
};

export type TicketType = (typeof EVENT_CONFIG.tickets)[number];
