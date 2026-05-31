"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingCart, UserCircle, X } from "lucide-react";
import { useState } from "react";
import { categories } from "@/lib/data";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Brands", href: "/brands" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Contact", href: "/contact" }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-border-gray bg-muscle-black/95 backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-3" aria-label="KMMuscles home">
          <Image
            src="/assets/logo-mark.png"
            width={64}
            height={60}
            alt="KMMuscles logo"
            priority
            className="h-10 w-auto sm:h-11"
          />
          <span className="hidden font-heading text-2xl font-black uppercase text-white sm:block">
            KMMuscles
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-bold uppercase tracking-wide lg:flex">
          <Link className="transition hover:text-gym-red" href="/">
            Home
          </Link>
          <div className="group relative py-7">
            <button className="focus-ring transition hover:text-gym-red">Shop By Category</button>
            <div className="invisible absolute left-1/2 top-full grid w-72 -translate-x-1/2 translate-y-2 gap-1 rounded-xl border border-border-gray bg-deep-charcoal p-3 opacity-0 shadow-card transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {categories.map((category) => (
                <Link
                  className="rounded-lg px-3 py-2 text-sm text-zinc-200 transition hover:bg-gym-red hover:text-white"
                  href={`/categories/${category.slug}`}
                  key={category.slug}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          {navLinks.slice(1).map((link) => (
            <Link className="transition hover:text-gym-red" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="focus-ring hidden items-center gap-2 text-sm font-bold uppercase text-zinc-300 transition hover:text-white md:flex"
          >
            <UserCircle size={22} />
            Log In
          </Link>
          <Link
            href="/cart"
            className="focus-ring relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-gray bg-deep-charcoal transition hover:border-gym-red"
            aria-label="Shopping cart"
          >
            <ShoppingCart size={22} />
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gym-red px-1 text-xs font-black">
              {itemCount}
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-gray lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border-gray bg-muscle-black lg:hidden">
          <nav className="container-page grid gap-1 py-5 text-sm font-bold uppercase">
            {navLinks.map((link) => (
              <Link
                className="rounded-lg px-3 py-3 hover:bg-deep-charcoal"
                href={link.href}
                key={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <p className="px-3 pt-4 text-xs text-medium-gray">Shop By Category</p>
            {categories.map((category) => (
              <Link
                className="rounded-lg px-5 py-2 text-zinc-300 hover:bg-deep-charcoal"
                href={`/categories/${category.slug}`}
                key={category.slug}
                onClick={() => setOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
