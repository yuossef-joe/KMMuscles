import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SettingsPage } from "@/pages/settings/SettingsPage";
import { contentApi } from "@/lib/api";

vi.mock("@/lib/api", () => ({
  contentApi: {
    cmsContent: vi.fn(),
    updateCmsContent: vi.fn(),
    siteSettings: vi.fn(),
    updateSiteSettings: vi.fn(),
    contactSettings: vi.fn(),
    updateContactSettings: vi.fn(),
    paymentSettings: vi.fn(),
    updatePaymentSettings: vi.fn(),
    uploadMedia: vi.fn()
  }
}));

const mockedContentApi = vi.mocked(contentApi);

describe("settings page integrations", () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads and saves homepage CMS content through the admin API", async () => {
    const user = userEvent.setup();
    mockedContentApi.cmsContent.mockResolvedValue({
      id: "cms-1",
      pageKey: "home",
      title: "Homepage",
      status: "PUBLISHED",
      metaTitle: "KMMuscles",
      metaDescription: null,
      contentJson: { hero: { title: "Old headline" } },
      updatedAt: "2026-06-21T00:00:00.000Z"
    });
    mockedContentApi.updateCmsContent.mockResolvedValue({
      id: "cms-1",
      pageKey: "home",
      title: "Homepage",
      status: "PUBLISHED",
      metaTitle: "KMMuscles",
      metaDescription: null,
      contentJson: { hero: { title: "New headline" } },
      updatedAt: "2026-06-21T00:00:00.000Z"
    });

    render(<SettingsPage type="homepage" title="Homepage CMS" description="Edit homepage content." />);

    const jsonInput = await screen.findByLabelText(/homepage content json/i);
    fireEvent.change(jsonInput, { target: { value: JSON.stringify({ hero: { title: "New headline" } }) } });
    await user.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(mockedContentApi.updateCmsContent).toHaveBeenCalledWith("home", expect.objectContaining({
        title: "Homepage",
        status: "PUBLISHED",
        contentJson: { hero: { title: "New headline" } }
      }));
    });
  });

  it("loads and saves store settings through site and contact endpoints", async () => {
    const user = userEvent.setup();
    mockedContentApi.siteSettings.mockResolvedValue({
      id: "site",
      logoUrl: "/logo.svg",
      faviconUrl: null,
      metaTitle: "KMMuscles",
      metaDescription: "Supplements",
      socialLinksJson: { instagram: "https://example.com/km" }
    });
    mockedContentApi.contactSettings.mockResolvedValue({
      id: "contact",
      email: "hello@kmmuscles.com",
      phone: "+201000000000",
      whatsapp: null,
      address: "Cairo",
      mapLink: null,
      socialsJson: { instagram: "https://example.com/contact" }
    });
    mockedContentApi.updateSiteSettings.mockResolvedValue({ id: "site" });
    mockedContentApi.updateContactSettings.mockResolvedValue({
      id: "contact",
      email: "support@kmmuscles.com",
      phone: "+201000000000",
      address: "Cairo"
    });
    mockedContentApi.uploadMedia.mockResolvedValue({
      id: "media-1",
      url: "/uploads/new-logo.png",
      filename: "new-logo.png",
      mimeType: "image/png",
      sizeBytes: 128,
      folder: "settings"
    });

    render(<SettingsPage type="store" title="Store settings" description="Edit store settings." />);

    await user.upload(await screen.findByLabelText(/logo image/i), new File(["logo"], "new-logo.png", { type: "image/png" }));
    const emailInput = await screen.findByLabelText(/email/i);
    await user.clear(emailInput);
    await user.type(emailInput, "support@kmmuscles.com");
    const facebookInputs = screen.getAllByLabelText(/facebook/i);
    await user.clear(facebookInputs[1]);
    await user.type(facebookInputs[1], "https://facebook.com/contact");
    await user.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(mockedContentApi.uploadMedia).toHaveBeenCalledWith(expect.any(File), "settings", "Site logo");
      expect(mockedContentApi.updateSiteSettings).toHaveBeenCalledWith(expect.objectContaining({
        logoUrl: "/uploads/new-logo.png",
        faviconUrl: null,
        socialLinksJson: { instagram: "https://example.com/km" }
      }));
      expect(mockedContentApi.updateContactSettings).toHaveBeenCalledWith(expect.objectContaining({
        email: "support@kmmuscles.com",
        phone: "+201000000000",
        address: "Cairo",
        socialsJson: {
          facebook: "https://facebook.com/contact",
          instagram: "https://example.com/contact"
        }
      }));
    });
  });
});
