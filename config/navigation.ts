import { Icon } from "@iconify/react";
import { PATH_DASHBOARD } from "@/constants/paths";

// Define the type for navigation items
export interface NavItem {
  title: string;
  path: string;
  icon: string;
  children?: NavItem[];
}

// Main navigation configuration
export const navConfig: NavItem[] = [
  {
    title: "Dashboard",
    path: PATH_DASHBOARD.root,
    icon: "mdi:home-outline",
  },
  {
    title: "Realtor",
    path: PATH_DASHBOARD.realtor,
    icon: "mdi:office-building-outline",
  },
  {
    title: "Settings",
    path: "/settings",
    icon: "mdi:cog-outline",
  },
  {
    title: "Chat",
    path: PATH_DASHBOARD.chat,
    icon: "mdi:chat-outline",
  },
];

// Drawer configuration
export const DRAWER_WIDTH = 280;
export const COLLAPSED_DRAWER_WIDTH = 80;
export const APPBAR_MOBILE = 64;
export const APPBAR_DESKTOP = 92;
