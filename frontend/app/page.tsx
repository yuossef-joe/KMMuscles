import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ProductCard } from "@/components/ProductCard";
import { contact, goals, products } from "@/lib/data";

export default function HomePage() {
  const bestSellers = products.filter((product) => product.isBestSeller).slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden bg-muscle-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_45%,rgba(226,27,45,0.34),transparent_34%),linear-gradient(135deg,#050505_0%,#120305_58%,#050505_100%)]" />
        <div className="container-page relative grid min-h-[560px] items-center gap-12 py-24 md:min-h-[640px] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex rounded bg-gym-red px-4 py-2 text-xs font-black uppercase tracking-wide">
              Supplements for every goal
            </p>
            <h1 className="font-heading text-[clamp(4rem,13vw,10rem)] font-black uppercase leading-[0.82]">
              Reach Your Potential
            </h1>
            <p className="mt-6 max-w-xl text-xl text-zinc-200 md:text-2xl">
              Everyone has goals, let us help you with yours
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                className="focus-ring inline-flex h-13 items-center gap-2 rounded-lg bg-gym-red px-7 py-4 font-black uppercase text-white transition hover:bg-energy-orange"
                href="/products"
              >
                Shop Now <ArrowRight size={20} />
              </Link>
              <Link
                className="focus-ring inline-flex h-13 items-center rounded-lg border border-white/30 px-7 py-4 font-black uppercase text-white transition hover:border-gym-red hover:text-gym-red"
                href="/brands"
              >
                Browse Brands
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 rounded-full bg-gym-red/20 blur-3xl" />
            <HeroCarousel />
          </div>
        </div>
      </section>

      <section className="dark-grid bg-deep-charcoal py-16">
        <div className="container-page">
          <div className="mb-9 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-black uppercase text-gym-red">Shop by goal</p>
              <h2 className="section-title mt-2">Choose Your Stack</h2>
            </div>
            <Link className="hidden font-bold uppercase text-zinc-300 hover:text-gym-red md:block" href="/products">
              View all products
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {goals.map((goal) => (
              <Link
                href={`/goals/${goal.slug}`}
                key={goal.slug}
                className="group relative min-h-[420px] overflow-hidden rounded-2xl border border-border-gray bg-muscle-black p-5 shadow-card"
              >
                <div className="absolute inset-x-6 top-8 h-40 rounded-full bg-gym-red/20 blur-3xl transition group-hover:bg-energy-orange/30" />
                <Image
                  src={goal.image}
                  alt={goal.title}
                  width={460}
                  height={524}
                  className="relative mx-auto h-64 w-full object-contain transition duration-300 group-hover:scale-105"
                />
                <div className="relative mt-6">
                  <p className="text-sm font-bold uppercase text-energy-orange">{goal.accent}</p>
                  <h3 className="font-heading text-4xl font-black uppercase">{goal.title}</h3>
                  <span className="mt-5 inline-flex rounded-lg border border-white/20 px-5 py-3 text-sm font-black uppercase transition group-hover:border-gym-red group-hover:bg-gym-red">
                    Discover
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muscle-black py-16">
        <div className="container-page">
          <Link
            href="/products?featured=true"
            className="group relative grid min-h-[260px] overflow-hidden rounded-2xl border border-border-gray bg-gym-red md:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="relative z-10 p-8 md:p-12">
              <p className="text-sm font-black uppercase text-white/80">Big offers</p>
              <h2 className="mt-3 max-w-2xl font-heading text-5xl font-black uppercase leading-none md:text-7xl">
                Push Your Limits
              </h2>
              <p className="mt-4 max-w-lg text-lg text-white/90">
                Pick your training essentials from best sellers and goal-based supplement stacks.
              </p>
              <span className="mt-7 inline-flex items-center gap-2 rounded-lg bg-muscle-black px-6 py-3 font-black uppercase">
                Shop Offers <ArrowRight size={19} />
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

      <section className="bg-light-gray py-16 text-zinc-950">
        <div className="container-page">
          <div className="mb-9 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-black uppercase text-gym-red">Best Sellers</p>
              <h2 className="section-title mt-2 text-zinc-950">Best Sellers</h2>
            </div>
            <Link className="hidden font-bold uppercase text-zinc-700 hover:text-gym-red md:block" href="/products">
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

      <section className="bg-deep-charcoal py-14">
        <div className="container-page grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border-gray bg-muscle-black p-6">
            <MapPin className="text-gym-red" />
            <h3 className="mt-4 font-heading text-3xl uppercase">Store Location</h3>
            <p className="mt-2 text-zinc-400">{contact.address}</p>
          </div>
          <div className="rounded-2xl border border-border-gray bg-muscle-black p-6">
            <Phone className="text-gym-red" />
            <h3 className="mt-4 font-heading text-3xl uppercase">Phone</h3>
            <p className="mt-2 text-zinc-400">{contact.phone}</p>
          </div>
          <div className="rounded-2xl border border-border-gray bg-muscle-black p-6">
            <Mail className="text-gym-red" />
            <h3 className="mt-4 font-heading text-3xl uppercase">Email</h3>
            <p className="mt-2 text-zinc-400">{contact.email}</p>
          </div>
        </div>
      </section>
    </>
  );
}
