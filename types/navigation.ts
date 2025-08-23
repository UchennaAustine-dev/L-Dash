import type { LucideIcon } from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon; // use correct icon type from your icon library
  children?: NavItem[];
}

export interface NavigationData {
  main: NavItem[];
  sections: {
    title: string;
    items: NavItem[];
  }[];
}
