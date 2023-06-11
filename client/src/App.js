import "./App.css";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Home from "./Components/Home/Home";
import Product from "./Components/IndividualProduct/Product";
import { Auth } from "./Components/Authentication/Auth.js";
import ProceedToCheckOut from "./Components/ProceedToCheckOut/ProceedToCheckOut";
import Payment from "./Components/Payment/Payment";
import SellerHome from "./Components/Seller/SellerHome";
import AddProduct from "./Components/Seller/AddProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route exact path="/product/:id" element={<Product />} />
      <Route exact path="/auth" element={<Auth />} />
      <Route
        exact
        path="/proceed-to-checkout"
        element={<ProceedToCheckOut />}
      />
      <Route exact path="/payment" element={<Payment />} />
      <Route exact path="/seller" element={<SellerHome />} />
      <Route exact path="/product_details" element={<AddProduct />} />
    </Routes>
  );
}

export default App;
