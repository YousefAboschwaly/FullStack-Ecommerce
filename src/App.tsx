import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ErrorHandler from "./components/ui/ErrorHandler";
import ProductDetails from "./components/ui/productDetails";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./Layout";
import About from "./pages/About";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import ProtectedRoute from "./Layout/ProtectedRoute";
import CartDrawer from "./components/ui/cartDrawer";
import { useState } from "react";

export default function App() {
  const [isOpen,setIsOpen] = useState(true)
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public routes */}
        <Route path="login" element={<Login />} />

        {/* Main Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
          errorElement={<ErrorHandler />}
        >
          <Route index element={<Products />} />
          <Route path="products" element={<Products />} />
          <Route path="about" element={<About />} />
          <Route path="product/:id" element={<ProductDetails />} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </>
    )
  );

  return (
    <>
      <AuthProvider>
        <Toaster />
        <CartDrawer isOpen={isOpen} onClose={()=>{setIsOpen(false)}} />
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}
