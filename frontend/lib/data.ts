import type { Category, Goal, Product } from "@/lib/types";

export const categories: Category[] = [
  { name: "Mass Gainer", slug: "mass-gainer", image: "/assets/weight-gain.png" },
  { name: "Protein", slug: "protein", image: "/assets/product-whey.jpg" },
  { name: "Creatine", slug: "creatine", image: "/assets/strength.png" },
  { name: "Pre-Workout", slug: "pre-workout", image: "/assets/before-training.png" },
  { name: "Carbohydrate", slug: "carbohydrate" },
  { name: "Amino", slug: "amino", image: "/assets/before-training.png" },
  { name: "Fat Burner", slug: "fat-burner" },
  { name: "Recovery", slug: "recovery", image: "/assets/after-training.png" },
  { name: "Test Booster", slug: "test-booster" },
  { name: "Multi Vitamin", slug: "multi-vitamin" }
];

export const goals: Goal[] = [
  {
    title: "After Training",
    slug: "after-training",
    image: "/assets/after-training.png",
    accent: "Recovery support"
  },
  {
    title: "Before Training",
    slug: "before-training",
    image: "/assets/before-training.png",
    accent: "Energy and focus"
  },
  {
    title: "Weight Gain",
    slug: "weight-gain",
    image: "/assets/weight-gain.png",
    accent: "Mass and calories"
  },
  {
    title: "Strength",
    slug: "strength",
    image: "/assets/strength.png",
    accent: "Power output"
  }
];

export const products: Product[] = [
  {
    id: "serious-mass-544",
    name: "SERIOUS MASS (5.44KG)",
    slug: "serious-mass-544kg",
    sku: "KM-MASS-001",
    brand: { name: "Optimum Nutrition", slug: "optimum-nutrition" },
    category: { name: "Mass Gainer", slug: "mass-gainer" },
    goals: ["weight-gain", "after-training"],
    price: 5800,
    originalPrice: 6440,
    currency: "EGP",
    image: "/assets/product-serious-mass.jpg",
    stockQuantity: 18,
    isBestSeller: true,
    isFeatured: true,
    discountBadge: "BIG OFFER 10%",
    description:
      "High-calorie mass gainer made for athletes who need serious nutrition support during growth phases.",
    benefits: ["Calorie-dense formula", "Protein and carbohydrate blend", "Supports post-workout recovery"],
    howToUse: "Mix one serving with cold water or milk after training or between meals.",
    nutritionFacts: { Serving: "2 scoops", Protein: "50g", Carbohydrates: "250g" },
    variants: ["Chocolate 5.44KG", "Vanilla 5.44KG"]
  },
  {
    id: "gold-standard-10lb",
    name: "GOLD STANDARD WHEY PROTEIN 10LB",
    slug: "gold-standard-whey-protein-10lb",
    sku: "KM-WHEY-010",
    brand: { name: "Optimum Nutrition", slug: "optimum-nutrition" },
    category: { name: "Protein", slug: "protein" },
    goals: ["after-training"],
    price: 11500,
    currency: "EGP",
    image: "/assets/product-whey-10lb.jpg",
    stockQuantity: 9,
    isBestSeller: true,
    description:
      "Classic whey protein for daily recovery, lean muscle support, and quick post-training nutrition.",
    benefits: ["Fast-mixing whey", "Supports lean muscle", "Great after training"],
    howToUse: "Mix one scoop with 180-240ml water or milk after training.",
    nutritionFacts: { Serving: "1 scoop", Protein: "24g", Sugar: "Low" },
    variants: ["Double Rich Chocolate 10LB"]
  },
  {
    id: "gold-standard-whey",
    name: "GOLD STANDARD WHEY PROTEIN",
    slug: "gold-standard-whey-protein",
    sku: "KM-WHEY-005",
    brand: { name: "Optimum Nutrition", slug: "optimum-nutrition" },
    category: { name: "Protein", slug: "protein" },
    goals: ["after-training", "strength"],
    price: 5800,
    currency: "EGP",
    image: "/assets/product-whey.jpg",
    stockQuantity: 20,
    isBestSeller: true,
    isNewArrival: true,
    description:
      "Reliable whey protein for gym users who want clean daily protein and simple recovery support.",
    benefits: ["24g protein per serving", "Smooth texture", "Easy daily protein"],
    howToUse: "Use after training or any time you need a protein boost.",
    nutritionFacts: { Serving: "1 scoop", Protein: "24g", Calories: "120" },
    variants: ["Chocolate", "Vanilla", "Strawberry"]
  },
  {
    id: "creatine-performance",
    name: "MICRONIZED CREATINE",
    slug: "micronized-creatine",
    sku: "KM-CR-001",
    brand: { name: "Optimum Nutrition", slug: "optimum-nutrition" },
    category: { name: "Creatine", slug: "creatine" },
    goals: ["strength", "before-training"],
    price: 2400,
    currency: "EGP",
    image: "/assets/strength.png",
    stockQuantity: 14,
    isFeatured: true,
    description: "Creatine monohydrate for strength, power, and repeated high-intensity training.",
    benefits: ["Supports strength", "Simple daily serving", "Good for intense training blocks"],
    howToUse: "Take 3-5g daily with water or your pre-workout drink.",
    nutritionFacts: { Creatine: "5g", Calories: "0" },
    variants: ["300g"]
  },
  {
    id: "pre-workout-energy",
    name: "PRE-WORKOUT ENERGY BLEND",
    slug: "pre-workout-energy-blend",
    sku: "KM-PRE-001",
    brand: { name: "KMMuscles Select", slug: "kmmuscles-select" },
    category: { name: "Pre-Workout", slug: "pre-workout" },
    goals: ["before-training"],
    price: 3100,
    originalPrice: 3500,
    currency: "EGP",
    image: "/assets/before-training.png",
    stockQuantity: 7,
    discountBadge: "NEW",
    description: "A focused pre-training pick for energy, pump, and sharper workout sessions.",
    benefits: ["Pre-training energy", "Supports focus", "Pump-friendly profile"],
    howToUse: "Take one serving 20-30 minutes before training.",
    nutritionFacts: { Caffeine: "Moderate", Citrulline: "Included" },
    variants: ["Fruit Punch"]
  },
  {
    id: "amino-recovery",
    name: "EAA AMINO RECOVERY",
    slug: "eaa-amino-recovery",
    sku: "KM-AMINO-001",
    brand: { name: "KMMuscles Select", slug: "kmmuscles-select" },
    category: { name: "Amino", slug: "amino" },
    goals: ["after-training", "before-training"],
    price: 2200,
    currency: "EGP",
    image: "/assets/before-training.png",
    stockQuantity: 0,
    discountBadge: "OUT OF STOCK",
    description: "Essential amino acids for hydration and recovery around training.",
    benefits: ["EAA support", "Training hydration", "Refreshing flavor"],
    howToUse: "Mix one serving during or after training.",
    nutritionFacts: { EAAs: "Included", Sugar: "Low" },
    variants: ["Orange"]
  }
];

export const contact = {
  email: "info@kmmuscles.com",
  phone: "+201159500155",
  address: "Fairouz District, Luxor City",
  facebook: "https://web.facebook.com/kmmuscles",
  instagram: "https://www.instagram.com/kmmuscles"
};

export const paymentLogos = [
  { name: "MasterCard", image: "/assets/mastercard.png" },
  { name: "Cash on Delivery", image: "/assets/cod.jpg" },
  { name: "Vodafone Cash", image: "/assets/vodafone-cash.jpeg" },
  { name: "Visa", image: "/assets/visa.png" }
];
