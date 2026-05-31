import { InfoPage } from "@/components/InfoPage";

export const metadata = {
  title: "Privacy Policy"
};

export default function PrivacyPolicyPage() {
  return (
    <InfoPage title="Privacy Policy" eyebrow="Last updated May 31, 2026">
      <p>
        KMMuscles collects only the information needed to process orders, contact customers,
        deliver products, and improve the shopping experience.
      </p>
      <p>
        Customer contact and delivery details are used for order fulfillment and are not sold.
        Payment method information is handled according to the selected payment provider or
        manual confirmation process.
      </p>
    </InfoPage>
  );
}
