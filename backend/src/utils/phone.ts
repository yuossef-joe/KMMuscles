export function isEgyptianPhone(phone: string) {
  return /^(\+20|0020|0)?1[0125][0-9]{8}$/.test(phone.replace(/\s|-/g, ""));
}
