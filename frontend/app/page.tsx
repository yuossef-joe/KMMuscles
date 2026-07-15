import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ProductCard } from "@/components/ProductCard";
import { contact, goals, products } from "@/lib/data";

const heroCarouselItems = [
  {
    id: "whey-stack",
    src: "/assets/image.png",
    alt: "KMMuscles Push Your Self whey protein supplement hero"
  },
  {
    id: "mass-stack",
    src: "/assets/image copy.png",
    alt: "KMMuscles Push Your Self mass gainer supplement hero"
  }
];

export default function HomePage() {
  const bestSellers = products.filter((product) => product.isBestSeller).slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden bg-paper">
        <div className="container-page relative grid min-h-[520px] items-center gap-12 py-16 md:min-h-[600px] md:py-20 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="max-w-3xl">
            <p className="eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
              Supplements for every goal
            </p>
            <h1 className="font-heading text-[clamp(3rem,10vw,7.5rem)] uppercase leading-[0.9] text-ink">
              Reach Your Potential
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-soft md:text-xl">
              Everyone has goals — let us help you with yours. Trusted supplements, honest advice,
              delivered across Egypt.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                className="focus-ring inline-flex h-12 items-center gap-2 rounded-lg bg-ink px-7 text-sm font-medium uppercase tracking-wide text-white transition hover:bg-brand-red"
                href="/products"
              >
                Shop Now <ArrowRight size={18} />
              </Link>
              <Link
                className="focus-ring inline-flex h-12 items-center rounded-lg border border-ink px-7 text-sm font-medium uppercase tracking-wide text-ink transition hover:bg-ink hover:text-white"
                href="/brands"
              >
                Browse Brands
              </Link>
            </div>
          </div>
          <div className="relative">
            <HeroCarousel
              items={heroCarouselItems}
              autoplay
              interval={4500}
              showArrows
              showDots
              loop
            />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper py-16">
        <div className="container-page">
          <div className="mb-9 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-ink-soft">Shop by goal</p>
              <h2 className="section-title mt-2 text-ink">Choose Your Stack</h2>
            </div>
            <Link className="hidden text-sm font-medium uppercase tracking-wide text-ink-soft transition hover:text-brand-red md:block" href="/products">
              View all products
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {goals.map((goal) => (
              <Link
                href={`/goals/${goal.slug}`}
                key={goal.slug}
                className="group relative flex min-h-[420px] flex-col overflow-hidden rounded-xl border border-line bg-surface p-5 transition hover:border-ink/20 hover:shadow-card"
              >
                <Image
                  src={goal.image}
                  alt={goal.title}
                  width={460}
                  height={524}
                  className="relative mx-auto h-64 w-full object-contain transition duration-500 group-hover:scale-105"
                />
                <div className="relative mt-6">
                  <p className="eyebrow text-brand-red">{goal.accent}</p>
                  <h3 className="mt-1 font-heading text-3xl uppercase text-ink">{goal.title}</h3>
                  <span className="mt-5 inline-flex rounded-lg border border-ink px-5 py-2.5 text-sm font-medium uppercase tracking-wide text-ink transition group-hover:bg-ink group-hover:text-white">
                    Discover
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-page">
          <Link
            href="/products?featured=true"
            className="group relative grid min-h-[260px] overflow-hidden rounded-2xl bg-brand-red text-white md:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="relative z-10 p-8 md:p-12">
              <p className="eyebrow text-white/80">Big offers</p>
              <h2 className="mt-3 max-w-2xl font-heading text-5xl uppercase leading-none md:text-7xl">
                Push Your Limits
              </h2>
              <p className="mt-4 max-w-lg text-lg text-white/90">
                Pick your training essentials from best sellers and goal-based supplement stacks.
              </p>
              <span className="mt-7 inline-flex items-center gap-2 rounded-lg bg-ink px-6 py-3 text-sm font-medium uppercase tracking-wide transition group-hover:bg-white group-hover:text-ink">
                Shop Offers <ArrowRight size={18} />
              </span>
            </div>
            <div className="relative min-h-56 overflow-hidden bg-white">
              <video
                className="h-full min-h-56 w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/assets/promo.jpg"
                aria-label="KMMuscles promotional supplement video"
              >
                <source src="/assets/Video/Final Comp.mp4" type="video/mp4" />
              </video>
            </div>
          </Link>
        </div>
      </section>

      <section className="bg-paper py-16 text-ink">
        <div className="container-page">
          <div className="mb-9 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-brand-red">Most wanted</p>
              <h2 className="section-title mt-2 text-ink">Best Sellers</h2>
            </div>
            <Link className="hidden text-sm font-medium uppercase tracking-wide text-ink-soft transition hover:text-brand-red md:block" href="/products">
              Shop all
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface py-14">
        <div className="container-page grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-line bg-paper p-6">
            <MapPin className="text-brand-red" />
            <h3 className="mt-4 font-heading text-2xl uppercase text-ink">Store Location</h3>
            <p className="mt-2 text-ink-soft">{contact.address}</p>
          </div>
          <div className="rounded-xl border border-line bg-paper p-6">
            <Phone className="text-brand-red" />
            <h3 className="mt-4 font-heading text-2xl uppercase text-ink">Phone</h3>
            <p className="mt-2 text-ink-soft">{contact.phone}</p>
          </div>
          <div className="rounded-xl border border-line bg-paper p-6">
            <Mail className="text-brand-red" />
            <h3 className="mt-4 font-heading text-2xl uppercase text-ink">Email</h3>
            <p className="mt-2 text-ink-soft">{contact.email}</p>
          </div>
        </div>
      </section>
    </>
  );
}
