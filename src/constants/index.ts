import { Heart, Settings, ShoppingCart, User } from "lucide-react";

export const colors = {
  navy: {
    900: "#0f172a",
    800: "#1e293b",
    700: "#334155",
    600: "#475569",
  },
};

 export const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

export  const profileMenuItems = [
    { name: 'My Profile', icon: User, path: '/profile' },
    { name: 'My Orders', icon: ShoppingCart, path: '/orders' },
    { name: 'Wishlist', icon: Heart, path: '/wishlist' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  // Centralized color mode values for consistent theming
export const themeColors = {
  // Backgrounds
  bg: {
    main: { light: "gray.50", dark: "#0f172a" },
    card: { light: "white", dark: "#1e293b" },
    hover: { light: "gray.100", dark: "#334155" },
    input: { light: "white", dark: "#1e293b" },
  },
  
  // Text
  text: {
    primary: { light: "gray.800", dark: "white" },
    secondary: { light: "gray.600", dark: "gray.300" },
    muted: { light: "gray.500", dark: "#94a3b8" },
  },
  
  // Borders
  border: {
    default: { light: "gray.200", dark: "#334155" },
    hover: { light: "gray.300", dark: "#475569" },
  },
  
  // Shadows
  shadow: {
    card: { light: "lg", dark: "dark-lg" },
  },
};

// Helper to get color mode value
export const getColor = (colorObj: { light: string; dark: string }, colorMode: string) => 
  colorMode === "light" ? colorObj.light : colorObj.dark;
