export function formatCurrency(value: number | null | undefined, currency = "EGP") {
  return new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(value ?? 0);
}

export function formatDate(value: string | Date | null | undefined) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en-EG", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

export function titleCase(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
