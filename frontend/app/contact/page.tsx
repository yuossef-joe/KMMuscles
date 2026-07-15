import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { InfoPage } from "@/components/InfoPage";
import { contact } from "@/lib/data";

export const metadata = {
  title: "Contact"
};

export default function ContactPage() {
  return (
    <InfoPage title="Contact Us">
      <div className="grid gap-4">
        <p className="flex items-center gap-3">
          <Mail className="text-brand-red" /> {contact.email}
        </p>
        <p className="flex items-center gap-3">
          <MapPin className="text-brand-red" /> {contact.address}
        </p>
        <p className="flex items-center gap-3">
          <Phone className="text-brand-red" /> {contact.phone}
        </p>
        <p className="flex items-center gap-3">
          <Facebook className="text-brand-red" /> Facebook
        </p>
        <p className="flex items-center gap-3">
          <Instagram className="text-brand-red" /> Instagram
        </p>
      </div>
      <div className="mt-8 rounded-xl border border-line bg-surface p-6">
        <h2 className="font-heading text-2xl uppercase text-ink">Send a Message</h2>
        <form className="mt-5 grid gap-4">
          <input placeholder="Name" className="h-12 rounded-lg border border-line bg-paper px-4 outline-none focus:border-ink" />
          <input placeholder="Phone" className="h-12 rounded-lg border border-line bg-paper px-4 outline-none focus:border-ink" />
          <textarea placeholder="Message" className="min-h-28 rounded-lg border border-line bg-paper p-4 outline-none focus:border-ink" />
          <button className="h-12 rounded-lg bg-ink text-sm font-medium uppercase tracking-wide text-white transition hover:bg-brand-red" type="button">
            Submit
          </button>
        </form>
      </div>
    </InfoPage>
  );
}
