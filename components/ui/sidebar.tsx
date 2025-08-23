"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  children?: NavItem[];
}

export interface NavigationData {
  main: NavItem[];
  sections: { title: string; items: NavItem[] }[];
}

import {
  BarChart3,
  Users,
  Key,
  User,
  DollarSign,
  Building2,
  ChevronRight,
  Car,
  History,
  Clipboard,
  Receipt,
  CreditCard,
} from "lucide-react";

const navigationData: NavigationData = {
  main: [{ name: "Dashboard", href: "/dashboard", icon: BarChart3 }],
  sections: [
    {
      title: "Staff Management",
      items: [
        {
          name: "Staff Management",
          href: "/dashboard/staff-management",
          icon: Users,
          children: [
            {
              name: "Users",
              href: "/dashboard/staff-management/users",
              icon: User,
            },
            {
              name: "Roles",
              href: "/dashboard/staff-management/roles",
              icon: Key,
            },
            {
              name: "Logged History",
              href: "/dashboard/staff-management/logged-history",
              icon: History,
            },
          ],
        },
      ],
    },
    {
      title: "Business Management",
      items: [
        {
          name: "Business Management",
          href: "/dashboard/business-management",
          icon: Building2,
          children: [
            {
              name: "Customer",
              href: "/dashboard/business-management/customer",
              icon: User,
            },
            {
              name: "Loan",
              href: "/dashboard/business-management/loan",
              icon: DollarSign,
            },
            {
              name: "Loan Payment",
              href: "/dashboard/business-management/loan-payment",
              icon: CreditCard,
              children: [
                {
                  name: "Repayment",
                  href: "/dashboard/business-management/loan-payment/repayment",
                  icon: Receipt,
                },
                // {
                //   name: "Repayment Schedule",
                //   href: "/dashboard/business-management/loan-payment/repayment-schedule",
                //   icon: Clipboard,
                // },
              ],
            },
            // {
            //   name: "Finance",
            //   href: "/dashboard/business-management/finance",
            //   icon: TrendingUp,
            // },
            // {
            //   name: "Expense",
            //   href: "/dashboard/business-management/expense",
            //   icon: Receipt,
            // },
          ],
        },
        // {
        //   name: "Contact Entry",
        //   href: "/dashboard/contact-entry",
        //   icon: FileText,
        // },
        // {
        //   name: "Notice Board",
        //   href: "/dashboard/notice-board",
        //   icon: Clipboard,
        // },
      ],
    },
    // {
    //   title: "System Configuration",
    //   items: [
    //     {
    //       name: "System Configuration",
    //       href: "/dashboard/system-configuration",
    //       icon: Settings,
    //       children: [
    //         {
    //           name: "Branch",
    //           href: "/dashboard/system-configuration/branch",
    //           icon: Building2,
    //         },
    //         {
    //           name: "Loan Type",
    //           href: "/dashboard/system-configuration/loan-type",
    //           icon: FileType,
    //         },
    //         {
    //           name: "Document Type",
    //           href: "/dashboard/system-configuration/document-type",
    //           icon: Folder,
    //         },
    //         {
    //           name: "Account Type",
    //           href: "/dashboard/system-configuration/account-type",
    //           icon: User,
    //         },
    //         {
    //           name: "Email Notification",
    //           href: "/dashboard/system-configuration/email-notification",
    //           icon: Mail,
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   title: "System Settings",
    //   items: [
    //     { name: "Pricing", href: "/dashboard/pricing", icon: DollarSign },
    //     { name: "Settings", href: "/dashboard/settings", icon: Settings },
    //   ],
    // },
  ],
};

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
  isOpen?: boolean;
}

export function Sidebar({
  isCollapsed,
  onToggle,
  isMobile = false,
  isOpen = false,
}: SidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName]
    );
  };

  const isActive = (href: string) => pathname === href;

  const isParentActive = (item: NavItem): boolean => {
    if (item.children) {
      return item.children.some((child) =>
        child.children
          ? isActive(child.href) ||
            child.children.some((gc) => isActive(gc.href))
          : isActive(child.href)
      );
    }
    return isActive(item.href);
  };

  const renderNavItem = (item: NavItem, level = 0) => {
    const IconComponent = item.icon;
    const expanded = expandedItems.includes(item.name);
    const hasChildren = item.children && item.children.length > 0;
    const isItemActive = hasChildren
      ? isParentActive(item)
      : isActive(item.href);

    if (hasChildren) {
      return (
        <div key={item.name}>
          <button
            onClick={() => toggleExpanded(item.name)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-1 text-left",
              "min-h-[44px] sm:min-h-[36px]",
              isItemActive
                ? "bg-green-50 text-green-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
            aria-expanded={expanded}
            aria-controls={`${item.name}-children`}
          >
            <IconComponent className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed ||
              (isMobile && (
                <>
                  <span className="flex-1 truncate">{item.name}</span>
                  <ChevronRight
                    className={cn(
                      "w-4 h-4 transition-transform flex-shrink-0",
                      expanded ? "rotate-90" : ""
                    )}
                  />
                </>
              ))}
          </button>

          {expanded && (!isCollapsed || isMobile) && (
            <div
              id={`${item.name}-children`}
              className={cn(level === 0 ? "ml-9" : "ml-6", "space-y-1")}
              role="group"
              aria-label={`${item.name} submenu`}
            >
              {item.children!.map((child) => renderNavItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.name}
        href={item.href}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-1",
          "min-h-[44px] sm:min-h-[36px]",
          level > 0 ? "py-1.5 rounded-md min-h-[40px] sm:min-h-[32px]" : "",
          isActive(item.href)
            ? "bg-green-50 text-green-700"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        )}
      >
        <IconComponent
          className={cn("flex-shrink-0", level > 0 ? "w-4 h-4" : "w-5 h-5")}
        />
        {(!isCollapsed || isMobile) && (
          <span className="truncate">{item.name}</span>
        )}
      </Link>
    );
  };

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-full",
        isMobile ? "w-64" : isCollapsed ? "w-16" : "w-64",
        "max-w-[80vw] sm:max-w-none"
      )}
    >
      <div className="p-3 sm:p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center flex-shrink-0">
            <Car className="w-5 h-5 text-green-600" />
          </div>
          {(!isCollapsed || isMobile) && (
            <span className="font-semibold text-gray-900 truncate">CarMan</span>
          )}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 sm:py-4 overscroll-contain">
        <div className="px-3">
          {navigationData.main.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-1",
                  "min-h-[44px] sm:min-h-[36px]",
                  isActive(item.href)
                    ? "bg-green-50 text-green-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <IconComponent className="w-5 h-5 flex-shrink-0" />
                {(!isCollapsed || isMobile) && (
                  <span className="truncate">{item.name}</span>
                )}
              </Link>
            );
          })}
        </div>

        {navigationData.sections.map((section) => (
          <div key={section.title} className="mt-6">
            {(!isCollapsed || isMobile) && (
              <div className="px-6 mb-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide truncate">
                  {section.title}
                </h3>
              </div>
            )}
            <div className="px-3">
              {section.items.map((item) => renderNavItem(item))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";
// import type { LucideIcon } from "lucide-react";

// export interface NavItem {
//   name: string;
//   href: string;
//   icon: LucideIcon;
//   children?: NavItem[];
// }

// export interface NavigationData {
//   main: NavItem[];
//   sections: { title: string; items: NavItem[] }[];
// }

// import {
//   BarChart3,
//   Users,
//   Key,
//   User,
//   DollarSign,
//   CreditCard,
//   TrendingUp,
//   Receipt,
//   FileText,
//   Clipboard,
//   Building2,
//   FileType,
//   Folder,
//   Mail,
//   Settings,
//   ChevronRight,
//   Car,
//   History,
// } from "lucide-react";

// const navigationData: NavigationData = {
//   main: [{ name: "Dashboard", href: "/dashboard", icon: BarChart3 }],
//   sections: [
//     {
//       title: "Staff Management",
//       items: [
//         {
//           name: "Staff Management",
//           href: "/dashboard/staff-management",
//           icon: Users,
//           children: [
//             {
//               name: "Users",
//               href: "/dashboard/staff-management/users",
//               icon: User,
//             },
//             {
//               name: "Roles",
//               href: "/dashboard/staff-management/roles",
//               icon: Key,
//             },
//             {
//               name: "Logged History",
//               href: "/dashboard/staff-management/logged-history",
//               icon: History,
//             },
//           ],
//         },
//       ],
//     },
//     {
//       title: "Business Management",
//       items: [
//         {
//           name: "Business Management",
//           href: "/dashboard/business-management",
//           icon: Building2,
//           children: [
//             {
//               name: "Customer",
//               href: "/dashboard/business-management/customer",
//               icon: User,
//             },
//             {
//               name: "Loan",
//               href: "/dashboard/business-management/loan",
//               icon: DollarSign,
//             },
//             // {
//             //   name: "Loan Payment",
//             //   href: "/dashboard/business-management/loan-payment",
//             //   icon: CreditCard,
//             //   children: [
//             //     {
//             //       name: "Repayment",
//             //       href: "/dashboard/business-management/loan-payment/repayment",
//             //       icon: Receipt,
//             //     },
//             //     {
//             //       name: "Repayment Schedule",
//             //       href: "/dashboard/business-management/loan-payment/repayment-schedule",
//             //       icon: Clipboard,
//             //     },
//             //   ],
//             // },
//             // {
//             //   name: "Finance",
//             //   href: "/dashboard/business-management/finance",
//             //   icon: TrendingUp,
//             // },
//             // {
//             //   name: "Expense",
//             //   href: "/dashboard/business-management/expense",
//             //   icon: Receipt,
//             // },
//           ],
//         },
//         // {
//         //   name: "Contact Entry",
//         //   href: "/dashboard/contact-entry",
//         //   icon: FileText,
//         // },
//         // {
//         //   name: "Notice Board",
//         //   href: "/dashboard/notice-board",
//         //   icon: Clipboard,
//         // },
//       ],
//     },
//     // {
//     //   title: "System Configuration",
//     //   items: [
//     //     {
//     //       name: "System Configuration",
//     //       href: "/dashboard/system-configuration",
//     //       icon: Settings,
//     //       children: [
//     //         {
//     //           name: "Branch",
//     //           href: "/dashboard/system-configuration/branch",
//     //           icon: Building2,
//     //         },
//     //         {
//     //           name: "Loan Type",
//     //           href: "/dashboard/system-configuration/loan-type",
//     //           icon: FileType,
//     //         },
//     //         {
//     //           name: "Document Type",
//     //           href: "/dashboard/system-configuration/document-type",
//     //           icon: Folder,
//     //         },
//     //         {
//     //           name: "Account Type",
//     //           href: "/dashboard/system-configuration/account-type",
//     //           icon: User,
//     //         },
//     //         {
//     //           name: "Email Notification",
//     //           href: "/dashboard/system-configuration/email-notification",
//     //           icon: Mail,
//     //         },
//     //       ],
//     //     },
//     //   ],
//     // },
//     // {
//     //   title: "System Settings",
//     //   items: [
//     //     { name: "Pricing", href: "/dashboard/pricing", icon: DollarSign },
//     //     { name: "Settings", href: "/dashboard/settings", icon: Settings },
//     //   ],
//     // },
//   ],
// };

// interface SidebarProps {
//   isCollapsed: boolean;
//   onToggle: () => void;
// }

// export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
//   const pathname = usePathname();
//   const [expandedItems, setExpandedItems] = useState<string[]>([]);

//   const toggleExpanded = (itemName: string) => {
//     setExpandedItems((prev) =>
//       prev.includes(itemName)
//         ? prev.filter((name) => name !== itemName)
//         : [...prev, itemName]
//     );
//   };

//   const isActive = (href: string) => pathname === href;

//   const isParentActive = (item: NavItem): boolean => {
//     if (item.children) {
//       return item.children.some((child) =>
//         child.children
//           ? isActive(child.href) ||
//             child.children.some((gc) => isActive(gc.href))
//           : isActive(child.href)
//       );
//     }
//     return isActive(item.href);
//   };

//   const renderNavItem = (item: NavItem, level = 0) => {
//     const IconComponent = item.icon;
//     const expanded = expandedItems.includes(item.name);
//     const hasChildren = item.children && item.children.length > 0;
//     const isItemActive = hasChildren
//       ? isParentActive(item)
//       : isActive(item.href);

//     if (hasChildren) {
//       return (
//         <div key={item.name}>
//           <button
//             onClick={() => toggleExpanded(item.name)}
//             className={cn(
//               "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-1 text-left",
//               isItemActive
//                 ? "bg-green-50 text-green-700"
//                 : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
//             )}
//             aria-expanded={expanded}
//             aria-controls={`${item.name}-children`}
//           >
//             <IconComponent className="w-5 h-5" />
//             {!isCollapsed && (
//               <>
//                 <span className="flex-1">{item.name}</span>
//                 <ChevronRight
//                   className={cn(
//                     "w-4 h-4 transition-transform",
//                     expanded ? "rotate-90" : ""
//                   )}
//                 />
//               </>
//             )}
//           </button>

//           {expanded && !isCollapsed && (
//             <div
//               id={`${item.name}-children`}
//               className={cn(level === 0 ? "ml-9" : "ml-6", "space-y-1")}
//               role="group"
//               aria-label={`${item.name} submenu`}
//             >
//               {item.children!.map((child) => renderNavItem(child, level + 1))}
//             </div>
//           )}
//         </div>
//       );
//     }

//     return (
//       <Link
//         key={item.name}
//         href={item.href}
//         className={cn(
//           "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-1",
//           level > 0 ? "py-1.5 rounded-md" : "",
//           isActive(item.href)
//             ? "bg-green-50 text-green-700"
//             : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
//         )}
//       >
//         <IconComponent className={cn("w-5 h-5", level > 0 ? "w-4 h-4" : "")} />
//         {!isCollapsed && <span>{item.name}</span>}
//       </Link>
//     );
//   };

//   return (
//     <div
//       className={cn(
//         "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col",
//         isCollapsed ? "w-16" : "w-64"
//       )}
//     >
//       {/* Logo */}
//       <div className="p-4 border-b border-gray-200">
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
//             <Car className="w-5 h-5 text-green-600" />
//           </div>
//           {!isCollapsed && (
//             <span className="font-semibold text-gray-900">CarMan</span>
//           )}
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 overflow-y-auto py-4">
//         {/* Main Items */}
//         <div className="px-3">
//           {navigationData.main.map((item) => {
//             const IconComponent = item.icon;
//             return (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className={cn(
//                   "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-1",
//                   isActive(item.href)
//                     ? "bg-green-50 text-green-700"
//                     : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
//                 )}
//               >
//                 <IconComponent className="w-5 h-5" />
//                 {!isCollapsed && <span>{item.name}</span>}
//               </Link>
//             );
//           })}
//         </div>

//         {/* Sections */}
//         {navigationData.sections.map((section) => (
//           <div key={section.title} className="mt-6">
//             {!isCollapsed && (
//               <div className="px-6 mb-2">
//                 <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
//                   {section.title}
//                 </h3>
//               </div>
//             )}
//             <div className="px-3">
//               {section.items.map((item) => renderNavItem(item))}
//             </div>
//           </div>
//         ))}
//       </nav>
//     </div>
//   );
// }
