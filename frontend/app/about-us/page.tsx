import { InfoPage } from "@/components/InfoPage";

export const metadata = {
  title: "About Us"
};

export default function AboutPage() {
  return (
    <InfoPage title="About Us">
      <p>
        KMMuscles is a sports nutrition store for gym users, athletes, bodybuilders, and
        fitness beginners in Egypt. The store helps customers choose supplements by goal,
        category, brand, and budget.
      </p>
      <p>
        The experience is built around clear product imagery, visible prices, simple checkout,
        and local payment options including Cash on Delivery and Vodafone Cash.
      </p>
    </InfoPage>
  );
}
