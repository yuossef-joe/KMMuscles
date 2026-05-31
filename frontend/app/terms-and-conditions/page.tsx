import { InfoPage } from "@/components/InfoPage";

export const metadata = {
  title: "Terms & Conditions"
};

export default function TermsPage() {
  return (
    <InfoPage title="Terms & Conditions" eyebrow="Last updated May 31, 2026">
      <p>
        Website prices, availability, offers, and delivery fees may change. Orders are not final
        until confirmed by KMMuscles staff.
      </p>
      <p>
        Customers are responsible for submitting accurate contact, address, and payment method
        details during checkout.
      </p>
    </InfoPage>
  );
}
