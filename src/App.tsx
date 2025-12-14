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
import ProtectedRoute from "./Layout/ProtectedRoute";
import About from "./pages/About";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import AdminLayout from "./Layout/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Categories from "./pages/Admin/Categories";
import AdminProducts  from './pages/Admin/Products';

export default function App() {
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
