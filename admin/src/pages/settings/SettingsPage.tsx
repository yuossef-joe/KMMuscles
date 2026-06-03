import { RefreshCw, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/common/Button";
import { ErrorState } from "@/components/common/ErrorState";
import { LoadingState } from "@/components/common/LoadingState";
import { PageHeader } from "@/components/common/PageHeader";
import { contentApi } from "@/lib/api";

type SettingsPageProps = {
  type: "site" | "contact" | "payments" | "homepage" | "customers";
  title: string;
  description: string;
};

export function SettingsPage({ type, title, description }: SettingsPageProps) {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function load() {
    setIsLoading(true);
    setError("");
    try {
      if (type === "site") setData(await contentApi.siteSettings());
      else if (type === "contact") setData(await contentApi.contactSettings());
      else if (type === "payments") setData(await contentApi.paymentSettings());
      else setData({ status: "Ready for backend endpoint expansion", module: type });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : `Failed to load ${type}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [type]);

  return (
    <>
      <PageHeader
        eyebrow="Settings"
        title={title}
        description={description}
        actions={
          <>
            <Button icon={<RefreshCw size={16} />} onClick={load} variant="secondary">
              Refresh
            </Button>
            <Button disabled icon={<Save size={16} />} title="Editing support is prepared for the next pass">
              Save
            </Button>
          </>
        }
      />
      {error ? <ErrorState message={error} /> : isLoading ? <LoadingState /> : (
        <pre className="overflow-auto rounded-lg border border-zinc-200 bg-white p-5 text-sm leading-6 text-zinc-700">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </>
  );
}
