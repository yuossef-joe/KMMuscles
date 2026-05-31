import { InfoPage } from "@/components/InfoPage";

export const metadata = {
  title: "Login"
};

export default function LoginPage() {
  return (
    <InfoPage title="Customer Login" eyebrow="Phase 2">
      <p>
        Customer accounts are planned for Phase 2. Guest checkout is available now, so customers
        can browse products, add to cart, and submit orders without logging in.
      </p>
    </InfoPage>
  );
}
