import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

export default function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="about" element={<About/>}/>
      </Routes>
    </>
  )
}
