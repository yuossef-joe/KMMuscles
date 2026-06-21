import { RefreshCw, Save } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/common/Button";
import { ErrorState } from "@/components/common/ErrorState";
import { FormField, inputClass, textareaClass } from "@/components/common/FormField";
import { LoadingState } from "@/components/common/LoadingState";
import { PageHeader } from "@/components/common/PageHeader";
import { contentApi } from "@/lib/api";
import type { CMSContent, ContactSettings, PaymentSettings, SiteSettings } from "@/types";

type SettingsPageProps = {
  type: "store" | "site" | "contact" | "payments" | "homepage" | "customers";
  title: string;
  description: string;
};

type StoreForm = {
  logoUrl: string;
  faviconUrl: string;
  metaTitle: string;
  metaDescription: string;
  socialLinksJson: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  mapLink: string;
  socialsJson: string;
};

type CmsForm = {
  title: string;
  status: CMSContent["status"];
  metaTitle: string;
  metaDescription: string;
  contentJson: string;
};

type PaymentForm = {
  cashOnDeliveryEnabled: boolean;
  vodafoneCashEnabled: boolean;
  vodafoneCashNumber: string;
  vodafoneCashInstructions: string;
  cardEnabled: boolean;
};

const defaultHomeContent = {
  hero: {
    title: "REACH YOUR POTENTIAL",
    subtitle: "Everyone has goals, let us help you with yours",
    ctaText: "Shop Now",
    ctaHref: "/products"
  },
  bestSellersTitle: "Best Sellers"
};

function optionalString(value: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function stringifyJson(value: unknown) {
  return JSON.stringify(value ?? {}, null, 2);
}

function parseRecordJson(value: string, label: string) {
  if (!value.trim()) return null;
  const parsed = JSON.parse(value) as unknown;
  if (!parsed || Array.isArray(parsed) || typeof parsed !== "object") {
    throw new Error(`${label} must be a JSON object`);
  }
  return parsed as Record<string, unknown>;
}

function initialStoreForm(site?: SiteSettings | null, contact?: ContactSettings | null): StoreForm {
  return {
    logoUrl: site?.logoUrl ?? "",
    faviconUrl: site?.faviconUrl ?? "",
    metaTitle: site?.metaTitle ?? "",
    metaDescription: site?.metaDescription ?? "",
    socialLinksJson: stringifyJson(site?.socialLinksJson),
    email: contact?.email ?? "",
    phone: contact?.phone ?? "",
    whatsapp: contact?.whatsapp ?? "",
    address: contact?.address ?? "",
    mapLink: contact?.mapLink ?? "",
    socialsJson: stringifyJson(contact?.socialsJson)
  };
}

function initialCmsForm(content?: CMSContent | null): CmsForm {
  return {
    title: content?.title ?? "Homepage",
    status: content?.status ?? "DRAFT",
    metaTitle: content?.metaTitle ?? "",
    metaDescription: content?.metaDescription ?? "",
    contentJson: stringifyJson(content?.contentJson ?? defaultHomeContent)
  };
}

function initialPaymentForm(settings?: PaymentSettings | null): PaymentForm {
  return {
    cashOnDeliveryEnabled: settings?.cashOnDeliveryEnabled ?? true,
    vodafoneCashEnabled: settings?.vodafoneCashEnabled ?? true,
    vodafoneCashNumber: settings?.vodafoneCashNumber ?? "",
    vodafoneCashInstructions: settings?.vodafoneCashInstructions ?? "",
    cardEnabled: settings?.cardEnabled ?? false
  };
}

export function SettingsPage({ type, title, description }: SettingsPageProps) {
  const [storeForm, setStoreForm] = useState<StoreForm>(() => initialStoreForm());
  const [cmsForm, setCmsForm] = useState<CmsForm>(() => initialCmsForm());
  const [paymentForm, setPaymentForm] = useState<PaymentForm>(() => initialPaymentForm());
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const effectiveType = useMemo(() => (type === "site" || type === "contact" ? "store" : type), [type]);

  async function load() {
    setIsLoading(true);
    setError("");
    setNotice("");
    try {
      if (effectiveType === "homepage") {
        setCmsForm(initialCmsForm(await contentApi.cmsContent("home")));
      } else if (effectiveType === "payments") {
        setPaymentForm(initialPaymentForm(await contentApi.paymentSettings()));
      } else if (effectiveType === "store") {
        const [site, contact] = await Promise.all([contentApi.siteSettings(), contentApi.contactSettings()]);
        setStoreForm(initialStoreForm(site, contact));
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : `Failed to load ${type}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [effectiveType]);

  async function saveHomepage(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setNotice("");
    setIsSaving(true);
    try {
      await contentApi.updateCmsContent("home", {
        title: cmsForm.title,
        status: cmsForm.status,
        metaTitle: optionalString(cmsForm.metaTitle),
        metaDescription: optionalString(cmsForm.metaDescription),
        contentJson: parseRecordJson(cmsForm.contentJson, "Homepage content")
      });
      setNotice("Homepage content saved.");
      await load();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to save homepage content");
    } finally {
      setIsSaving(false);
    }
  }

  async function saveStoreSettings(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setNotice("");
    setIsSaving(true);
    try {
      await Promise.all([
        contentApi.updateSiteSettings({
          logoUrl: optionalString(storeForm.logoUrl),
          faviconUrl: optionalString(storeForm.faviconUrl),
          metaTitle: optionalString(storeForm.metaTitle),
          metaDescription: optionalString(storeForm.metaDescription),
          socialLinksJson: parseRecordJson(storeForm.socialLinksJson, "Site social links")
        }),
        contentApi.updateContactSettings({
          email: storeForm.email,
          phone: storeForm.phone,
          whatsapp: optionalString(storeForm.whatsapp),
          address: storeForm.address,
          mapLink: optionalString(storeForm.mapLink),
          socialsJson: parseRecordJson(storeForm.socialsJson, "Contact socials")
        })
      ]);
      setNotice("Store settings saved.");
      await load();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to save store settings");
    } finally {
      setIsSaving(false);
    }
  }

  async function savePaymentSettings(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setNotice("");
    setIsSaving(true);
    try {
      await contentApi.updatePaymentSettings({
        cashOnDeliveryEnabled: paymentForm.cashOnDeliveryEnabled,
        vodafoneCashEnabled: paymentForm.vodafoneCashEnabled,
        vodafoneCashNumber: optionalString(paymentForm.vodafoneCashNumber),
        vodafoneCashInstructions: optionalString(paymentForm.vodafoneCashInstructions),
        cardEnabled: paymentForm.cardEnabled
      });
      setNotice("Payment settings saved.");
      await load();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to save payment settings");
    } finally {
      setIsSaving(false);
    }
  }

  function renderHomepageForm() {
    return (
      <form className="grid gap-5 rounded-lg border border-zinc-200 bg-white p-5" onSubmit={saveHomepage}>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Page title">
            <input className={inputClass} required value={cmsForm.title} onChange={(event) => setCmsForm({ ...cmsForm, title: event.target.value })} />
          </FormField>
          <FormField label="Status">
            <select className={inputClass} value={cmsForm.status} onChange={(event) => setCmsForm({ ...cmsForm, status: event.target.value as CMSContent["status"] })}>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </FormField>
          <FormField label="Meta title">
            <input className={inputClass} value={cmsForm.metaTitle} onChange={(event) => setCmsForm({ ...cmsForm, metaTitle: event.target.value })} />
          </FormField>
          <FormField label="Meta description">
            <input className={inputClass} value={cmsForm.metaDescription} onChange={(event) => setCmsForm({ ...cmsForm, metaDescription: event.target.value })} />
          </FormField>
        </div>
        <FormField label="Homepage content JSON">
          <textarea
            className={`${textareaClass} min-h-80 font-mono`}
            value={cmsForm.contentJson}
            onChange={(event) => setCmsForm({ ...cmsForm, contentJson: event.target.value })}
          />
        </FormField>
        <Button icon={<Save size={16} />} isLoading={isSaving} type="submit">Save</Button>
      </form>
    );
  }

  function renderStoreForm() {
    return (
      <form className="grid gap-5 rounded-lg border border-zinc-200 bg-white p-5" onSubmit={saveStoreSettings}>
        <section className="grid gap-4">
          <h2 className="text-base font-black text-zinc-950">Site metadata</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Logo URL">
              <input className={inputClass} value={storeForm.logoUrl} onChange={(event) => setStoreForm({ ...storeForm, logoUrl: event.target.value })} />
            </FormField>
            <FormField label="Favicon URL">
              <input className={inputClass} value={storeForm.faviconUrl} onChange={(event) => setStoreForm({ ...storeForm, faviconUrl: event.target.value })} />
            </FormField>
            <FormField label="Meta title">
              <input className={inputClass} value={storeForm.metaTitle} onChange={(event) => setStoreForm({ ...storeForm, metaTitle: event.target.value })} />
            </FormField>
            <FormField label="Meta description">
              <input className={inputClass} value={storeForm.metaDescription} onChange={(event) => setStoreForm({ ...storeForm, metaDescription: event.target.value })} />
            </FormField>
          </div>
          <FormField label="Site social links JSON">
            <textarea className={`${textareaClass} font-mono`} value={storeForm.socialLinksJson} onChange={(event) => setStoreForm({ ...storeForm, socialLinksJson: event.target.value })} />
          </FormField>
        </section>

        <section className="grid gap-4 border-t border-zinc-200 pt-5">
          <h2 className="text-base font-black text-zinc-950">Contact information</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Email">
              <input className={inputClass} required type="email" value={storeForm.email} onChange={(event) => setStoreForm({ ...storeForm, email: event.target.value })} />
            </FormField>
            <FormField label="Phone">
              <input className={inputClass} required value={storeForm.phone} onChange={(event) => setStoreForm({ ...storeForm, phone: event.target.value })} />
            </FormField>
            <FormField label="WhatsApp">
              <input className={inputClass} value={storeForm.whatsapp} onChange={(event) => setStoreForm({ ...storeForm, whatsapp: event.target.value })} />
            </FormField>
            <FormField label="Map link">
              <input className={inputClass} value={storeForm.mapLink} onChange={(event) => setStoreForm({ ...storeForm, mapLink: event.target.value })} />
            </FormField>
          </div>
          <FormField label="Address">
            <textarea className={textareaClass} required value={storeForm.address} onChange={(event) => setStoreForm({ ...storeForm, address: event.target.value })} />
          </FormField>
          <FormField label="Contact socials JSON">
            <textarea className={`${textareaClass} font-mono`} value={storeForm.socialsJson} onChange={(event) => setStoreForm({ ...storeForm, socialsJson: event.target.value })} />
          </FormField>
        </section>
        <Button icon={<Save size={16} />} isLoading={isSaving} type="submit">Save</Button>
      </form>
    );
  }

  function renderPaymentForm() {
    return (
      <form className="grid gap-5 rounded-lg border border-zinc-200 bg-white p-5" onSubmit={savePaymentSettings}>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="flex h-10 items-center gap-2 text-sm font-bold text-zinc-700">
            <input
              checked={paymentForm.cashOnDeliveryEnabled}
              onChange={(event) => setPaymentForm({ ...paymentForm, cashOnDeliveryEnabled: event.target.checked })}
              type="checkbox"
            />
            Cash on delivery
          </label>
          <label className="flex h-10 items-center gap-2 text-sm font-bold text-zinc-700">
            <input
              checked={paymentForm.vodafoneCashEnabled}
              onChange={(event) => setPaymentForm({ ...paymentForm, vodafoneCashEnabled: event.target.checked })}
              type="checkbox"
            />
            Vodafone Cash
          </label>
          <label className="flex h-10 items-center gap-2 text-sm font-bold text-zinc-700">
            <input checked={paymentForm.cardEnabled} onChange={(event) => setPaymentForm({ ...paymentForm, cardEnabled: event.target.checked })} type="checkbox" />
            Card payments
          </label>
        </div>
        <FormField label="Vodafone Cash number">
          <input className={inputClass} value={paymentForm.vodafoneCashNumber} onChange={(event) => setPaymentForm({ ...paymentForm, vodafoneCashNumber: event.target.value })} />
        </FormField>
        <FormField label="Vodafone Cash instructions">
          <textarea
            className={textareaClass}
            value={paymentForm.vodafoneCashInstructions}
            onChange={(event) => setPaymentForm({ ...paymentForm, vodafoneCashInstructions: event.target.value })}
          />
        </FormField>
        <Button icon={<Save size={16} />} isLoading={isSaving} type="submit">Save</Button>
      </form>
    );
  }

  function renderBody() {
    if (effectiveType === "homepage") return renderHomepageForm();
    if (effectiveType === "payments") return renderPaymentForm();
    if (effectiveType === "store") return renderStoreForm();

    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-5 text-sm font-bold text-zinc-700">
        Customer management is waiting on its backend endpoint.
      </div>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow={effectiveType === "homepage" ? "Content" : "Settings"}
        title={title}
        description={description}
        actions={
          <Button icon={<RefreshCw size={16} />} onClick={load} type="button" variant="secondary">
            Refresh
          </Button>
        }
      />
      {error ? <ErrorState message={error} /> : null}
      {notice ? <div className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">{notice}</div> : null}
      {isLoading ? <LoadingState /> : renderBody()}
    </>
  );
}
