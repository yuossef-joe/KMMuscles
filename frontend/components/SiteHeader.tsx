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
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur">
      <p className="bg-ink py-2 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-white">
        Free delivery across Egypt on orders over 1500 EGP
      </p>
      <div className="border-b border-line">
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
            <span className="hidden font-heading text-2xl uppercase tracking-tight text-ink sm:block">
              KMMuscles
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-[13px] font-medium uppercase tracking-wide text-ink lg:flex">
            <Link className="transition hover:text-brand-red" href="/">
              Home
            </Link>
            <div className="group relative py-7">
              <button className="focus-ring uppercase transition hover:text-brand-red">Shop By Category</button>
              <div className="invisible absolute left-1/2 top-full grid w-72 -translate-x-1/2 translate-y-2 gap-1 rounded-xl border border-line bg-paper p-3 opacity-0 shadow-card transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {categories.map((category) => (
                  <Link
                    className="rounded-lg px-3 py-2 text-sm normal-case tracking-normal text-ink transition hover:bg-surface hover:text-brand-red"
                    href={`/categories/${category.slug}`}
                    key={category.slug}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            {navLinks.slice(1).map((link) => (
              <Link className="transition hover:text-brand-red" href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="focus-ring hidden items-center gap-2 text-[13px] font-medium uppercase text-ink transition hover:text-brand-red md:flex"
            >
              <UserCircle size={22} />
              Log In
            </Link>
            <Link
              href="/cart"
              className="focus-ring relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition hover:border-ink"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={22} />
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-red px-1 text-xs font-bold text-white">
                {itemCount}
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div className="border-t border-line bg-paper lg:hidden">
          <nav className="container-page grid gap-1 py-5 text-sm font-medium uppercase text-ink">
            {navLinks.map((link) => (
              <Link
                className="rounded-lg px-3 py-3 hover:bg-surface"
                href={link.href}
                key={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <p className="eyebrow px-3 pt-4 text-ink-soft">Shop By Category</p>
            {categories.map((category) => (
              <Link
                className="rounded-lg px-5 py-2 normal-case text-ink-soft hover:bg-surface hover:text-ink"
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
