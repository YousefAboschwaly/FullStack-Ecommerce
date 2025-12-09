import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import ProductDetails from "./components/ui/productDetails";
import Layout from "./Layout";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import ErrorHandler from "./components/ui/ErrorHandler";
import Login from "./pages/Login";

export default function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public routes */}
        <Route path="login" element={<Login />} />

        {/* Main Layout */}
        <Route path="/" element={<Layout />} errorElement={<ErrorHandler />}>
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

  return <RouterProvider router={router} />;
}
