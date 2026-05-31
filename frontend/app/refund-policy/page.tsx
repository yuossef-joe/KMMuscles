import { InfoPage } from "@/components/InfoPage";

export const metadata = {
  title: "Refund Policy"
};

export default function RefundPolicyPage() {
  return (
    <InfoPage title="Refund Policy" eyebrow="Last updated May 31, 2026">
      <p>
        Refunds and returns are reviewed by the KMMuscles team. Products must be unopened,
        unused, and in original condition unless the issue is caused by delivery damage or an
        incorrect item.
      </p>
      <p>Contact the store as soon as possible with your order reference for support.</p>
    </InfoPage>
  );
}
