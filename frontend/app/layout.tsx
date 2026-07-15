import type { Metadata } from "next";
import { Inter, Questrial } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const questrial = Questrial({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kmmuscles.com"),
  title: {
    default: "KMMuscles | Supplements Store Egypt",
    template: "%s | KMMuscles"
  },
  description:
    "Shop supplements by goal, category, brand, and best sellers with KMMuscles in Egypt.",
  openGraph: {
    title: "KMMuscles",
    description: "Reach your potential with supplements for every training goal.",
    images: ["/assets/hero.jpg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${questrial.variable}`}>
      <body>
        <Providers>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
