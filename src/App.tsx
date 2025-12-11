import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import ErrorHandler from "./components/ui/ErrorHandler";
import ProductDetails from "./components/ui/productDetails";
import Layout from "./Layout";
import About from "./pages/About";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import { Toaster } from "./components/ui/toaster";
import cookieService from "./app/services/cookieService";

export default function App() {
  const token = cookieService.getCookie("jwt") 
  console.log(token);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public routes */}
        <Route path="login" element={<Login isAuthenticated={token} />} />

        {/* Main Layout */}
        <Route path="/" element={<Layout isAuthenticated={token} />} errorElement={<ErrorHandler />}>
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

  return<>
  <Toaster/>
   <RouterProvider router={router} />
  </>;
}
