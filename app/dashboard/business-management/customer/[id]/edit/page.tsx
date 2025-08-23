import { CustomerEditForm } from "@/components/customer-edit-form";
import { Breadcrumb } from "@/components/breadcrumb";

interface CustomerEditPageProps {
  params: {
    id: string;
  };
}

export default function CustomerEditPage({ params }: CustomerEditPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Dashboard", href: "/dashboard" },
            {
              label: "Customer",
              href: "/dashboard/business-management/customer",
            },
            {
              label: "Edit",
              href: `/dashboard/business-management/customer/${params.id}/edit`,
              active: true,
            },
          ]}
        />

        <div className="mt-6">
          <CustomerEditForm customerId={params.id} />
        </div>
      </div>
    </div>
  );
}
