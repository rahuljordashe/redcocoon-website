export function formatPrice(amount: number, currency = 'LKR'): string {
  return `${currency} ${amount.toLocaleString('en-LK')}`;
}
