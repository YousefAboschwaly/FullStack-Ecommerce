import { Route, Routes } from "react-router-dom";
import ProductDetails from "./components/ui/productDetails";
import Layout from "./Layout";
import About from "./pages/About";
import Products from "./pages/Products";
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Products />} />
        <Route path="products" element={<Products />} />
        <Route path="about" element={<About />} />
        <Route path="product/:id" element={<ProductDetails />} />
      </Route>
    </Routes>
  );
}
