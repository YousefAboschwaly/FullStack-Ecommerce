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

export const profileMenuItems = [
  { name: 'My Profile', icon: User, path: '/profile' },
  { name: 'My Orders', icon: ShoppingCart, path: '/orders' },
  { name: 'Wishlist', icon: Heart, path: '/wishlist' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

// Centralized color mode values for consistent theming
export const themeColors = {
  // Background colors
  bg: {
    main: { light: 'hsl(210, 40%, 98%)', dark: 'hsl(222, 47%, 11%)' },
    card: { light: 'hsl(0, 0%, 100%)', dark: 'hsl(217, 33%, 17%)' },
    Skeleton: { light: 'hsl(0, 0%, 100%)', dark: '#52525b' },
    cardHover: { light: 'hsl(215, 20%, 95%)', dark: 'hsl(217, 33%, 20%)' },
    overlay: { light: 'rgba(255, 255, 255, 0.7)', dark: 'rgba(26, 32, 44, 0.9)' },
    cardTranslucent: { light: 'rgba(255, 255, 255, 0.8)', dark: 'rgba(26, 32, 44, 0.8)' },
  },

  // Text colors
  text: {
    primary: { light: 'hsl(222, 47%, 11%)', dark: 'hsl(210, 40%, 98%)' },
    secondary: { light: 'hsl(215, 19%, 35%)', dark: 'hsl(215, 19%, 65%)' },
    muted: { light: 'hsl(215, 19%, 45%)', dark: 'hsl(215, 19%, 65%)' },
  },

  // Border colors
  border: {
    default: { light: 'hsl(215, 25%, 85%)', dark: 'hsl(215, 25%, 27%)' },
    accent: { light: 'hsl(270, 70%, 60%)', dark: 'hsl(48, 96%, 53%)' }, // Purple in light, gold in dark
    hover: { light: 'hsl(270, 70%, 50%)', dark: 'hsl(48, 96%, 60%)' },
  },

  // Accent/Brand colors - Purple for light mode, Gold for dark mode
  accent: {
    primary: { light: 'hsl(270, 70%, 60%)', dark: 'hsl(48, 96%, 53%)' },
    primaryHover: { light: 'hsl(270, 70%, 50%)', dark: 'hsl(48, 96%, 60%)' },
    secondary: { light: 'hsl(270, 70%, 70%)', dark: 'hsl(48, 96%, 70%)' },
  },

  // Button colors
  button: {
    primary: { light: 'hsl(270, 70%, 60%)', dark: 'hsl(48, 96%, 53%)' },
    primaryHover: { light: 'hsl(270, 70%, 50%)', dark: 'hsl(48, 96%, 45%)' },
    text: { light: 'hsl(0, 0%, 100%)', dark: 'hsl(222, 47%, 11%)' },
  },
    // Input colors
  input: {
    bg: { light: 'hsl(0, 0%, 100%)', dark: 'hsl(217, 33%, 17%)' },
    border: { light: 'hsl(215, 25%, 85%)', dark: 'hsl(215, 25%, 27%)' },
    borderFocus: { light: 'hsl(270, 70%, 60%)', dark: 'hsl(48, 96%, 53%)' },
    borderError: { light: 'hsl(0, 84%, 60%)', dark: 'hsl(0, 84%, 60%)' },
    placeholder: { light: 'hsl(215, 19%, 60%)', dark: 'hsl(215, 19%, 50%)' },
  },

  // Skeleton colors
  skeleton: {
    base: { light: 'hsl(215, 20%, 90%)', dark: 'hsl(217, 33%, 20%)' },
    shine: { light: 'hsl(215, 20%, 95%)', dark: 'hsl(217, 33%, 28%)' },
  },

  // Shadow colors
  shadow: {
    card: { 
      light: '0 20px 40px rgba(0, 0, 0, 0.1)', 
      dark: '0 20px 40px rgba(212, 175, 55, 0.15)' 
    },
    button: { 
      light: '0 4px 20px rgba(128, 90, 213, 0.4)', 
      dark: '0 4px 20px rgba(212, 175, 55, 0.4)' 
    },
  },

  // Gradient colors
  gradient: {
    cardBg: {
      light: 'linear-gradient(180deg, rgba(128, 90, 213, 0.05) 0%, transparent 100%)',
      dark: 'linear-gradient(180deg, rgba(212, 175, 55, 0.05) 0%, transparent 100%)',
    },
    button: {
      light: 'linear-gradient(135deg, #805AD5 0%, #6B46C1 100%)',
      dark: 'linear-gradient(135deg, #D4AF37 0%, #B8962E 100%)',
    },
    price: {
      light: 'linear-gradient(to right, #805AD5, #6B46C1)',
      dark: 'linear-gradient(to right, #D4AF37, #F4E4A6)',
    },
    // Logo stays yellow/golden in both modes
    logo: {
      light: 'linear-gradient(135deg, hsl(45, 100%, 55%), hsl(40, 100%, 50%))',
      dark: 'linear-gradient(135deg, hsl(48, 96%, 53%), hsl(48, 96%, 60%))',
    },
  },

    badge: {
  category: {
    bg: { light: 'hsl(270, 50%, 95%)', dark: 'hsl(48, 96%, 15%)' },
    text: { light: 'hsl(270, 50%, 45%)', dark: 'hsl(48, 96%, 70%)' },
    border: { light: 'hsl(270, 50%, 80%)', dark: 'hsl(48, 96%, 40%)' },
  },
  stock: {
    inStock: { bg: 'hsl(142, 76%, 90%)', text: 'hsl(142, 76%, 30%)' },
    outOfStock: { bg: 'hsl(0, 84%, 92%)', text: 'hsl(0, 84%, 40%)' },
  },
},
  // Status colors
  status: {
    error: 'hsl(0, 84%, 60%)',
    errorBg: 'hsl(0, 84%, 60%, 0.1)',
    success: 'hsl(142, 76%, 36%)',
    warning: 'hsl(38, 92%, 50%)',
  },
} as const;

// Helper function to get color value
export const getColor = (
  colorPath: { light: string; dark: string },
  mode: 'light' | 'dark'
): string => {
  return colorPath[mode];
};
