"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface Package {
  id: string;
  name: string;
  price: number;
  period: string;
  userLimit: number;
  customerLimit: number;
  enabledLoggedHistory: boolean;
  couponApplicable: boolean;
  isActive: boolean;
  expiryDate?: string;
}

export default function PackagesPage() {
  const [packages] = useState<Package[]>([
    {
      id: "1",
      name: "BASIC",
      price: 0,
      period: "UNLIMITED",
      userLimit: 50,
      customerLimit: 50,
      enabledLoggedHistory: true,
      couponApplicable: false,
      isActive: false,
    },
    {
      id: "2",
      name: "ADVANCE",
      price: 3000,
      period: "MONTHLY",
      userLimit: 50,
      customerLimit: 50,
      enabledLoggedHistory: true,
      couponApplicable: true,
      isActive: true,
      expiryDate: "Sep 1, 2025 Expiry Date",
    },
    {
      id: "3",
      name: "PREMIUM",
      price: 100,
      period: "QUARTERLY",
      userLimit: 100,
      customerLimit: 100,
      enabledLoggedHistory: true,
      couponApplicable: true,
      isActive: false,
    },
    {
      id: "4",
      name: "STANDARD",
      price: 15,
      period: "YEARLY",
      userLimit: 250,
      customerLimit: 250,
      enabledLoggedHistory: true,
      couponApplicable: true,
      isActive: false,
    },
  ]);

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Packages</h1>
          <nav className="text-sm text-gray-500 mt-1">
            Dashboard &gt; Packages
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 md:p-6">
          <h2 className="text-lg font-medium mb-6">Pricing Packages List</h2>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <div key={pkg.id} className="border rounded-lg p-6 relative">
                {/* Package Header */}
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {pkg.name}
                  </h3>
                  <div className="text-2xl font-bold text-gray-900">
                    <span className="text-sm">$</span>
                    {pkg.price}
                    <span className="text-sm font-normal text-gray-500">
                      /{pkg.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">User Limit</span>
                    <span className="font-medium">{pkg.userLimit}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Customer Limit</span>
                    <span className="font-medium">{pkg.customerLimit}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">
                      Enabled Logged History
                    </span>
                    {pkg.enabledLoggedHistory ? (
                      <Check className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <X className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Coupon Applicable</span>
                    {pkg.couponApplicable ? (
                      <Check className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <X className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <div className="text-center">
                  {pkg.isActive ? (
                    <div>
                      <Button
                        className="w-full mb-2 bg-emerald-600 hover:bg-emerald-700"
                        disabled
                      >
                        Active
                      </Button>
                      {pkg.expiryDate && (
                        <p className="text-xs text-emerald-600">
                          {pkg.expiryDate}
                        </p>
                      )}
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full border-gray-300 hover:bg-gray-50 bg-transparent"
                    >
                      Purchase Now
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
