import { InfoPage } from "@/components/InfoPage";

export const metadata = {
  title: "FAQs"
};

const faqs = [
  ["Can I checkout without an account?", "Yes. Initial launch supports guest checkout."],
  ["What payment methods are supported?", "Cash on Delivery and Vodafone Cash manual confirmation. Card payment is gateway-ready for a future phase."],
  ["How do I choose products?", "Browse by category, brand, goal collection, or best sellers."]
];

export default function FaqsPage() {
  return (
    <InfoPage title="FAQs">
      <div className="grid gap-4">
        {faqs.map(([question, answer]) => (
          <details className="rounded-xl bg-light-gray p-5" key={question}>
            <summary className="cursor-pointer font-bold">{question}</summary>
            <p className="mt-3 text-zinc-600">{answer}</p>
          </details>
        ))}
      </div>
    </InfoPage>
  );
}
