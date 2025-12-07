import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import ProductDetails from "./components/ui/productDetails";
import Layout from "./Layout";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import ErrorHandler from "./components/ui/ErrorHandler";

export default function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<ErrorHandler />}>
        <Route index element={<Products />} />
        <Route path="products" element={<Products />} />
        <Route path="about" element={<About />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
