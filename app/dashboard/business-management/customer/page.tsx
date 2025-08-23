import { CustomerList } from "@/components/customer-list";
import { Breadcrumb } from "@/components/breadcrumb";

export default function CustomersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-2 py-3 sm:px-3 lg:px-4">
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            {
              label: "Customer",
              href: "/dashboard/business-management/customer",
              active: true,
            },
          ]}
        />

        <div className="mt-6">
          <CustomerList />
        </div>
      </div>
    </div>
  );
}
