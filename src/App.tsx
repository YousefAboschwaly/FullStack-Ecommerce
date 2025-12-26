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
import AdminLayout from "./Layout/AdminLayout";
import ProtectedRoute from "./Layout/ProtectedRoute";
import About from "./pages/About";
import Categories from "./pages/Admin/Categories";
import Dashboard from "./pages/Admin/Dashboard";
import AdminProducts from "./pages/Admin/Products";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import EmailConfirmation from "./components/ui/EmailConfirmation";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public routes */}
        <Route path="login" element={<Login />} />
        <Route path="email-confirmation" element={<EmailConfirmation />} />

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

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<Categories />} />
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
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}
