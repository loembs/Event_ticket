export interface TicketPersonalization {
  name: string;
  phone: string;
}

export interface OrderData {
  ticketTypeId: string;
  quantity: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  personalizations: TicketPersonalization[];
  orderId: string;
  totalPrice: number;
  status: "pending" | "confirmed";
}

export function generateOrderId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function saveOrder(order: OrderData) {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem("ticket_orders", JSON.stringify(orders));
}

export function getOrders(): OrderData[] {
  const data = localStorage.getItem("ticket_orders");
  return data ? JSON.parse(data) : [];
}

export function getOrderById(orderId: string): OrderData | undefined {
  return getOrders().find((o) => o.orderId === orderId);
}

export function confirmOrder(orderId: string) {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.orderId === orderId);
  if (idx !== -1) {
    orders[idx].status = "confirmed";
    localStorage.setItem("ticket_orders", JSON.stringify(orders));
  }
}
