import "./App.css";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Home from "./Components/Home/Home";
import Product from "./Components/IndividualProduct/Product";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route exact path="/product/:id" element={<Product />} />
    </Routes>
  );
}

export default App;
