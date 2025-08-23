// "use client";

// import { useState, useEffect } from "react";
// import { Sidebar } from "@/components/ui/sidebar";
// import { Header } from "@/components/ui/header";

// interface DashboardLayoutProps {
//   children: React.ReactNode;
// }

// export function DashboardLayout({ children }: DashboardLayoutProps) {
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

//   // Handle responsive behavior
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setSidebarCollapsed(true);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize(); // Check on mount

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setSidebarCollapsed(!sidebarCollapsed);
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <Header onSidebarToggle={toggleSidebar} />

//         {/* Page Content */}
//         <main className="flex-1 overflow-y-auto p-6">{children}</main>
//       </div>
//     </div>
//   );
// }

"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Sidebar } from "../ui/sidebar";
import { Header } from "../ui/header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile) {
        setSidebarCollapsed(true);
        setSidebarOpen(false);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check on mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const closeMobileSidebar = () => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      <div
        className={`
        ${isMobile ? "fixed inset-y-0 left-0 z-50" : "relative"}
        ${isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"}
        transition-transform duration-300 ease-in-out
      `}
      >
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={toggleSidebar}
          isMobile={isMobile}
          isOpen={sidebarOpen}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <Header onSidebarToggle={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
