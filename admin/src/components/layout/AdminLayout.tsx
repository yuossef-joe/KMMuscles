import {
  BarChart3,
  Boxes,
  CreditCard,
  FileText,
  Flag,
  Goal,
  Home,
  Image,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Settings,
  Shield,
  ShoppingBag,
  Tags,
  Users,
  X
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import clsx from "clsx";
import { Button } from "@/components/common/Button";
import { useAuth } from "@/context/AuthContext";

const navGroups = [
  {
    label: "Operate",
    links: [
      { label: "Dashboard", href: "/", icon: LayoutDashboard },
      { label: "Orders", href: "/orders", icon: ShoppingBag, roles: ["ORDER_STAFF"] },
      { label: "Products", href: "/products", icon: Package, roles: ["PRODUCT_MANAGER"] }
    ]
  },
  {
    label: "Catalog",
    links: [
      { label: "Categories", href: "/categories", icon: Boxes, roles: ["PRODUCT_MANAGER", "CONTENT_MANAGER"] },
      { label: "Brands", href: "/brands", icon: Shield, roles: ["PRODUCT_MANAGER"] },
      { label: "Goals", href: "/goals", icon: Goal, roles: ["PRODUCT_MANAGER", "CONTENT_MANAGER"] }
    ]
  },
  {
    label: "Content",
    links: [
      { label: "Homepage", href: "/homepage", icon: Home, roles: ["CONTENT_MANAGER"] },
      { label: "Banners", href: "/banners", icon: Flag, roles: ["CONTENT_MANAGER"] },
      { label: "Policies", href: "/policies", icon: FileText, roles: ["CONTENT_MANAGER"] },
      { label: "Media", href: "/media", icon: Image, roles: ["CONTENT_MANAGER", "PRODUCT_MANAGER"] }
    ]
  },
  {
    label: "Settings",
    links: [
      { label: "Customers", href: "/customers", icon: Users, roles: ["ORDER_STAFF"] },
      { label: "Payments", href: "/payments", icon: CreditCard, roles: ["CONTENT_MANAGER"] },
      { label: "Settings", href: "/settings", icon: Settings, roles: ["CONTENT_MANAGER"] },
      { label: "Users", href: "/users", icon: Tags, roles: ["ADMIN"] }
    ]
  }
];

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { hasRole } = useAuth();

  return (
    <aside
      className={clsx(
        "fixed inset-y-0 left-0 z-40 w-72 border-r border-zinc-200 bg-white transition lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-zinc-200 px-5">
        <div className="flex items-center gap-3">
          <img src="/assets/logo-mark.png" alt="KMMuscles" className="h-9 w-auto" />
          <div>
            <p className="text-sm font-black uppercase text-zinc-950">KMMuscles</p>
            <p className="text-xs font-bold text-zinc-500">Admin</p>
          </div>
        </div>
        <button className="focus-ring rounded-md p-2 lg:hidden" onClick={onClose} aria-label="Close navigation">
          <X size={18} />
        </button>
      </div>

      <nav className="h-[calc(100vh-4rem)] overflow-y-auto px-3 py-4">
        {navGroups.map((group) => (
          <div className="mb-5" key={group.label}>
            <p className="px-3 pb-2 text-[11px] font-black uppercase tracking-wide text-zinc-400">{group.label}</p>
            <div className="grid gap-1">
              {group.links
                .filter((link) => !link.roles || hasRole(...link.roles))
                .map((link) => {
                  const Icon = link.icon;
                  return (
                    <NavLink
                      className={({ isActive }) =>
                        clsx(
                          "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-bold transition",
                          isActive ? "bg-gym-red text-white" : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
                        )
                      }
                      end={link.href === "/"}
                      key={link.href}
                      onClick={onClose}
                      to={link.href}
                    >
                      <Icon size={18} />
                      {link.label}
                    </NavLink>
                  );
                })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export function AdminLayout() {
  const { admin, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[18rem_1fr]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen ? <button className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close navigation overlay" /> : null}

      <div className="min-w-0">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-zinc-200 bg-white/90 px-4 backdrop-blur md:px-6">
          <div className="flex items-center gap-3">
            <button className="focus-ring rounded-md p-2 lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open navigation">
              <Menu size={20} />
            </button>
            <div className="hidden items-center gap-2 text-sm font-bold text-zinc-500 md:flex">
              <BarChart3 size={18} className="text-gym-red" />
              Operations workspace
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right text-sm sm:block">
              <p className="font-black text-zinc-950">{admin?.name ?? admin?.email}</p>
              <p className="text-xs font-bold text-zinc-500">{admin?.role}</p>
            </div>
            <Button icon={<LogOut size={16} />} onClick={logout} variant="secondary">
              Logout
            </Button>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1500px] px-4 py-6 md:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
