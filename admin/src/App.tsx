import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { CatalogPage } from "@/pages/catalog/CatalogPage";
import { SimpleListPage } from "@/pages/content/SimpleListPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { LoginPage } from "@/pages/LoginPage";
import { OrdersPage } from "@/pages/orders/OrdersPage";
import { ProductsPage } from "@/pages/products/ProductsPage";
import { SettingsPage } from "@/pages/settings/SettingsPage";

export function App() {
  return (
    <Routes>
      <Route element={<LoginPage />} path="/login" />
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route element={<DashboardPage />} index />
          <Route element={<OrdersPage />} path="orders" />
          <Route element={<ProductsPage />} path="products" />
          <Route
            element={<CatalogPage kind="categories" title="Categories" description="Control category navigation, ordering, SEO, and active state." />}
            path="categories"
          />
          <Route element={<CatalogPage kind="brands" title="Brands" description="Manage brand records, logos, and storefront availability." />} path="brands" />
          <Route element={<CatalogPage kind="goals" title="Goal collections" description="Manage goal-based shopping sections and display order." />} path="goals" />
          <Route element={<SettingsPage type="customers" title="Customers" description="Customer workspace derived from order and account data." />} path="customers" />
          <Route element={<SettingsPage type="payments" title="Payment settings" description="Manage COD, Vodafone Cash, and card readiness." />} path="payments" />
          <Route element={<SettingsPage type="store" title="Store settings" description="Manage site metadata, contact information, address, and social links." />} path="settings" />
          <Route element={<SimpleListPage type="users" title="Users & roles" description="Review admin accounts and access roles." />} path="users" />
          <Route element={<Navigate replace to="/" />} path="*" />
        </Route>
      </Route>
    </Routes>
  );
}
