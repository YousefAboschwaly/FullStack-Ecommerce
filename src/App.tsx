import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./components/ui/productDetails";
export default function App() {

  return (
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="products" element={<Products/>}/>
<Route path="product/:id" element={<ProductDetails />} />
      </Routes>
  )
}
