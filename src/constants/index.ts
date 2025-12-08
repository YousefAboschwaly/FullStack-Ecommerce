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