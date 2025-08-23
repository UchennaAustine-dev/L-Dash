import { CustomerCreateForm } from "@/components/customer-create-form";
import { Breadcrumb } from "@/components/breadcrumb";

export default function CustomerCreatePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-3 sm:px-6 lg:px-8  ">
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            {
              label: "Customer",
              href: "/dashboard/business-management/customer",
            },
            {
              label: "Create",
              href: "/dashboard/business-management/customer/create",
              active: true,
            },
          ]}
        />

        <div className="mt-6">
          <CustomerCreateForm />
        </div>
      </div>
    </div>
  );
}
