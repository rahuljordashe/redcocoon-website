const WHATSAPP_NUMBER = '94777720696';

export function getWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function getReserveLink(productName: string, price: number, currency = 'LKR'): string {
  const message = `Hi! I'd like to reserve the "${productName}" (${currency} ${price.toLocaleString()}). Is it still available?`;
  return getWhatsAppLink(message);
}

export function getQuoteLink(): string {
  const message = `Hi! I'm interested in custom tableware for my venue. Could we discuss a hospitality project?`;
  return getWhatsAppLink(message);
}
