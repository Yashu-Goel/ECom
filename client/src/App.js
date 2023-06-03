import "./App.css";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Home from "./Components/Home/Home";
import Product from "./Components/IndividualProduct/Product";
import { Auth } from "./Components/Authentication/Auth.js";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route exact path="/product/:id" element={<Product />} />
      <Route exact path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
