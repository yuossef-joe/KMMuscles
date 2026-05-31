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
          <Mail className="text-gym-red" /> {contact.email}
        </p>
        <p className="flex items-center gap-3">
          <MapPin className="text-gym-red" /> {contact.address}
        </p>
        <p className="flex items-center gap-3">
          <Phone className="text-gym-red" /> {contact.phone}
        </p>
        <p className="flex items-center gap-3">
          <Facebook className="text-gym-red" /> Facebook
        </p>
        <p className="flex items-center gap-3">
          <Instagram className="text-gym-red" /> Instagram
        </p>
      </div>
      <div className="mt-8 rounded-2xl bg-light-gray p-6">
        <h2 className="font-heading text-3xl uppercase">Send a Message</h2>
        <form className="mt-5 grid gap-4">
          <input placeholder="Name" className="h-12 rounded-lg border border-zinc-200 px-4" />
          <input placeholder="Phone" className="h-12 rounded-lg border border-zinc-200 px-4" />
          <textarea placeholder="Message" className="min-h-28 rounded-lg border border-zinc-200 p-4" />
          <button className="h-12 rounded-lg bg-gym-red font-black uppercase text-white" type="button">
            Submit
          </button>
        </form>
      </div>
    </InfoPage>
  );
}
