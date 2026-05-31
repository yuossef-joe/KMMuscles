import { InfoPage } from "@/components/InfoPage";

export const metadata = {
  title: "Shipping Policy"
};

export default function ShippingPolicyPage() {
  return (
    <InfoPage title="Shipping Policy" eyebrow="Last updated May 31, 2026">
      <p>
        Orders are confirmed by phone before delivery. Delivery fees and time estimates may vary
        by governorate, city, and order size.
      </p>
      <p>
        Customers should provide a complete address and reachable phone number during checkout.
      </p>
    </InfoPage>
  );
}
