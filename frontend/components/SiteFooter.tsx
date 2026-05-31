import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { categories, contact, paymentLogos } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="border-t border-border-gray bg-muscle-black">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1.1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/assets/logo-mark.png" width={64} height={60} alt="KMMuscles logo" />
            <span className="font-heading text-3xl font-black uppercase text-white">KMMuscles</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-6 text-zinc-400">
            Supplements store helping athletes and gym users in Egypt reach their goals with
            strong products, clear advice, and flexible local checkout.
          </p>
        </div>

        <div>
          <h3 className="font-heading text-xl uppercase">Shop</h3>
          <div className="mt-4 grid gap-2 text-sm text-zinc-400">
            {categories.slice(0, 5).map((category) => (
              <Link href={`/categories/${category.slug}`} key={category.slug}>
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-heading text-xl uppercase">The Company</h3>
          <div className="mt-4 grid gap-2 text-sm text-zinc-400">
            <Link href="/about-us">About Us</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/shipping-policy">Shipping Policy</Link>
            <Link href="/refund-policy">Refund Policy</Link>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-xl uppercase">Contact Us</h3>
          <div className="mt-4 grid gap-3 text-sm text-zinc-400">
            <span className="flex items-center gap-2">
              <Mail size={17} /> {contact.email}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={17} /> {contact.address}
            </span>
            <span className="flex items-center gap-2">
              <Phone size={17} /> Tel: {contact.phone}
            </span>
            <div className="flex gap-3 pt-2">
              <Link className="rounded-full bg-deep-charcoal p-2 hover:bg-gym-red" href={contact.facebook}>
                <Facebook size={18} />
              </Link>
              <Link className="rounded-full bg-deep-charcoal p-2 hover:bg-gym-red" href={contact.instagram}>
                <Instagram size={18} />
              </Link>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-xl uppercase">Payment Methods</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {paymentLogos.map((logo) => (
              <div
                className="flex h-14 items-center justify-center rounded-lg bg-white p-2"
                key={logo.name}
              >
                <Image src={logo.image} width={100} height={60} alt={logo.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border-gray py-5 text-center text-xs uppercase text-zinc-500">
        KMMuscles © 2026
      </div>
    </footer>
  );
}
