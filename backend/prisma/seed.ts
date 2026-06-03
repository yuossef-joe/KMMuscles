import { AdminRole, BannerPlacement, ContentStatus, PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { hashPassword } from "@/utils/hash";

dotenv.config();

const prisma = new PrismaClient();

const categories = [
  { name: "Mass Gainer", slug: "mass-gainer", imageUrl: "/assets/weight-gain.png" },
  { name: "Protein", slug: "protein", imageUrl: "/assets/product-whey.jpg" },
  { name: "Creatine", slug: "creatine", imageUrl: "/assets/strength.png" },
  { name: "Pre-Workout", slug: "pre-workout", imageUrl: "/assets/before-training.png" },
  { name: "Carbohydrate", slug: "carbohydrate" },
  { name: "Amino", slug: "amino", imageUrl: "/assets/before-training.png" },
  { name: "Fat Burner", slug: "fat-burner" },
  { name: "Recovery", slug: "recovery", imageUrl: "/assets/after-training.png" },
  { name: "Test Booster", slug: "test-booster" },
  { name: "Multi Vitamin", slug: "multi-vitamin" }
];

const goals = [
  {
    title: "After Training",
    slug: "after-training",
    imageUrl: "/assets/after-training.png",
    accent: "Recovery support"
  },
  {
    title: "Before Training",
    slug: "before-training",
    imageUrl: "/assets/before-training.png",
    accent: "Energy and focus"
  },
  { title: "Weight Gain", slug: "weight-gain", imageUrl: "/assets/weight-gain.png", accent: "Mass and calories" },
  { title: "Strength", slug: "strength", imageUrl: "/assets/strength.png", accent: "Power output" }
];

const products = [
  {
    name: "SERIOUS MASS (5.44KG)",
    slug: "serious-mass-544kg",
    sku: "KM-MASS-001",
    brandSlug: "optimum-nutrition",
    categorySlug: "mass-gainer",
    goalSlugs: ["weight-gain", "after-training"],
    price: 5800,
    originalPrice: 6440,
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
    name: "GOLD STANDARD WHEY PROTEIN 10LB",
    slug: "gold-standard-whey-protein-10lb",
    sku: "KM-WHEY-010",
    brandSlug: "optimum-nutrition",
    categorySlug: "protein",
    goalSlugs: ["after-training"],
    price: 11500,
    image: "/assets/product-whey-10lb.jpg",
    stockQuantity: 9,
    isBestSeller: true,
    description: "Classic whey protein for daily recovery, lean muscle support, and quick post-training nutrition.",
    benefits: ["Fast-mixing whey", "Supports lean muscle", "Great after training"],
    howToUse: "Mix one scoop with 180-240ml water or milk after training.",
    nutritionFacts: { Serving: "1 scoop", Protein: "24g", Sugar: "Low" },
    variants: ["Double Rich Chocolate 10LB"]
  },
  {
    name: "GOLD STANDARD WHEY PROTEIN",
    slug: "gold-standard-whey-protein",
    sku: "KM-WHEY-005",
    brandSlug: "optimum-nutrition",
    categorySlug: "protein",
    goalSlugs: ["after-training", "strength"],
    price: 5800,
    image: "/assets/product-whey.jpg",
    stockQuantity: 20,
    isBestSeller: true,
    isNewArrival: true,
    description: "Reliable whey protein for gym users who want clean daily protein and simple recovery support.",
    benefits: ["24g protein per serving", "Smooth texture", "Easy daily protein"],
    howToUse: "Use after training or any time you need a protein boost.",
    nutritionFacts: { Serving: "1 scoop", Protein: "24g", Calories: "120" },
    variants: ["Chocolate", "Vanilla", "Strawberry"]
  },
  {
    name: "MICRONIZED CREATINE",
    slug: "micronized-creatine",
    sku: "KM-CR-001",
    brandSlug: "optimum-nutrition",
    categorySlug: "creatine",
    goalSlugs: ["strength", "before-training"],
    price: 2400,
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
    name: "PRE-WORKOUT ENERGY BLEND",
    slug: "pre-workout-energy-blend",
    sku: "KM-PRE-001",
    brandSlug: "kmmuscles-select",
    categorySlug: "pre-workout",
    goalSlugs: ["before-training"],
    price: 3100,
    originalPrice: 3500,
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
    name: "EAA AMINO RECOVERY",
    slug: "eaa-amino-recovery",
    sku: "KM-AMINO-001",
    brandSlug: "kmmuscles-select",
    categorySlug: "amino",
    goalSlugs: ["after-training", "before-training"],
    price: 2200,
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

async function main() {
  const passwordHash = await hashPassword(process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!");

  await prisma.adminUser.upsert({
    where: { email: process.env.SEED_ADMIN_EMAIL ?? "admin@kmmuscles.com" },
    update: {},
    create: {
      name: process.env.SEED_ADMIN_NAME ?? "KMMuscles Admin",
      email: process.env.SEED_ADMIN_EMAIL ?? "admin@kmmuscles.com",
      passwordHash,
      role: AdminRole.SUPER_ADMIN
    }
  });

  await prisma.brand.upsert({
    where: { slug: "optimum-nutrition" },
    update: {},
    create: { name: "Optimum Nutrition", slug: "optimum-nutrition", isActive: true }
  });

  await prisma.brand.upsert({
    where: { slug: "kmmuscles-select" },
    update: {},
    create: { name: "KMMuscles Select", slug: "kmmuscles-select", isActive: true }
  });

  for (const [index, category] of categories.entries()) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: { ...category, displayOrder: index },
      create: { ...category, displayOrder: index }
    });
  }

  for (const [index, goal] of goals.entries()) {
    await prisma.goalCollection.upsert({
      where: { slug: goal.slug },
      update: { ...goal, displayOrder: index },
      create: { ...goal, displayOrder: index }
    });
  }

  for (const item of products) {
    const brand = await prisma.brand.findUniqueOrThrow({ where: { slug: item.brandSlug } });
    const category = await prisma.category.findUniqueOrThrow({ where: { slug: item.categorySlug } });
    const goalsForProduct = await prisma.goalCollection.findMany({ where: { slug: { in: item.goalSlugs } } });

    const product = await prisma.product.upsert({
      where: { slug: item.slug },
      update: {
        name: item.name,
        sku: item.sku,
        brandId: brand.id,
        categoryId: category.id,
        description: item.description,
        benefitsJson: item.benefits,
        howToUse: item.howToUse,
        nutritionFacts: item.nutritionFacts,
        price: item.price,
        originalPrice: item.originalPrice,
        stockQuantity: item.stockQuantity,
        isBestSeller: item.isBestSeller ?? false,
        isFeatured: item.isFeatured ?? false,
        isNewArrival: item.isNewArrival ?? false,
        discountBadge: item.discountBadge
      },
      create: {
        name: item.name,
        slug: item.slug,
        sku: item.sku,
        brandId: brand.id,
        categoryId: category.id,
        description: item.description,
        benefitsJson: item.benefits,
        howToUse: item.howToUse,
        nutritionFacts: item.nutritionFacts,
        price: item.price,
        originalPrice: item.originalPrice,
        stockQuantity: item.stockQuantity,
        isBestSeller: item.isBestSeller ?? false,
        isFeatured: item.isFeatured ?? false,
        isNewArrival: item.isNewArrival ?? false,
        discountBadge: item.discountBadge
      }
    });

    await prisma.productImage.upsert({
      where: { id: `${product.id}-primary` },
      update: { url: item.image, altText: item.name, displayOrder: 0 },
      create: { id: `${product.id}-primary`, productId: product.id, url: item.image, altText: item.name }
    });

    await prisma.productVariant.deleteMany({ where: { productId: product.id } });
    await prisma.productVariant.createMany({
      data: item.variants.map((name) => ({
        productId: product.id,
        name,
        stockQuantity: item.stockQuantity
      }))
    });

    await prisma.productGoal.deleteMany({ where: { productId: product.id } });
    await prisma.productGoal.createMany({
      data: goalsForProduct.map((goal) => ({
        productId: product.id,
        goalCollectionId: goal.id
      }))
    });
  }

  await prisma.contactSettings.upsert({
    where: { id: "contact" },
    update: {},
    create: {
      id: "contact",
      email: "info@kmmuscles.com",
      phone: "+201159500155",
      whatsapp: "+201159500155",
      address: "Fairouz District, Luxor City",
      socialsJson: {
        facebook: "https://web.facebook.com/kmmuscles",
        instagram: "https://www.instagram.com/kmmuscles"
      }
    }
  });

  await prisma.siteSettings.upsert({
    where: { id: "site" },
    update: {},
    create: {
      id: "site",
      logoUrl: "/assets/logo-mark.png",
      faviconUrl: "/assets/logo-mark.png",
      metaTitle: "KMMuscles Supplements",
      metaDescription: "Supplements for every training goal.",
      socialLinksJson: {
        facebook: "https://web.facebook.com/kmmuscles",
        instagram: "https://www.instagram.com/kmmuscles"
      }
    }
  });

  await prisma.paymentSettings.upsert({
    where: { id: "payments" },
    update: {},
    create: {
      id: "payments",
      cashOnDeliveryEnabled: true,
      vodafoneCashEnabled: true,
      vodafoneCashNumber: "+201159500155",
      vodafoneCashInstructions: "Send payment to Vodafone Cash, then keep your transaction reference.",
      cardEnabled: false
    }
  });

  await prisma.cMSContent.upsert({
    where: { pageKey: "home" },
    update: {},
    create: {
      pageKey: "home",
      title: "Homepage",
      status: ContentStatus.PUBLISHED,
      contentJson: {
        hero: {
          title: "REACH YOUR POTENTIAL",
          subtitle: "Everyone has goals, let us help you with yours",
          ctaText: "Shop Now",
          ctaHref: "/products"
        },
        bestSellersTitle: "Best Sellers"
      }
    }
  });

  await prisma.banner.upsert({
    where: { id: "home-promo-banner" },
    update: {},
    create: {
      id: "home-promo-banner",
      title: "Push Your Limits",
      imageUrl: "/assets/promo.jpg",
      altText: "KMMuscles promotional banner",
      linkUrl: "/products?featured=true",
      placement: BannerPlacement.HOME_PROMO
    }
  });

  for (const key of ["privacy-policy", "shipping-policy", "refund-policy", "terms-and-conditions"]) {
    await prisma.policyPage.upsert({
      where: { key },
      update: {},
      create: {
        key,
        title: key
          .split("-")
          .map((part) => part[0].toUpperCase() + part.slice(1))
          .join(" "),
        content: "Draft policy content. Update from the admin dashboard before publishing.",
        status: ContentStatus.DRAFT
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
