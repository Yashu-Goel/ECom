import "./App.css";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Home from "./Components/Home/Home";
import {Product} from "./Components/IndividualProduct/Product";
import { Auth } from "./Components/Authentication/Auth.js";
import ProceedToCheckOut from "./Components/ProceedToCheckOut/ProceedToCheckOut";
import OrderConfirmationPage from "./Components/OrderConfirmationPage/OrderConfirmationPage";
import SellerHome from "./Components/Seller/SellerHome";
import AddProduct from "./Components/Seller/AddProduct";
import SellerAuth from "./Components/Seller/SellerAuth";
import OrderHistory from "./Components/OrderHistory/OrderHistory";
import SellerProvider from "./Components/Seller/SellerProvider";
import UserProfile from "./Components/UserProfile/UserProfile";
import SellerCatalogue from "./Components/Seller/SellerCatalogue";
import Profile from "./Components/Seller/Profile";
import DealsPage from "./Components/Deals/DealsPage";
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
      <Route
        exact
        path="/order-confirmation"
        element={<OrderConfirmationPage />}
      />
      <Route exact path="/order-history" element={<OrderHistory />} />
      <Route exact path="/catalogue" element={<SellerCatalogue/>} />
      <Route exact path="/seller" element={<SellerHome />} />
      <Route exact path="todays_deals" element={<DealsPage />} />
      <Route
        exact
        path="/product_details"
        element={
          <SellerProvider>
            <AddProduct />
          </SellerProvider>
        }
      />
      <Route
        exact
        path="/profile"
        element={
          <SellerProvider>
            <Profile />
          </SellerProvider>
        }
      />
      <Route exact path="/user-profile" element={<UserProfile />} />
      <Route
        exact
        path="/seller_auth"
        element={
          <SellerProvider>
            <SellerAuth />
          </SellerProvider>
        }
      />
    </Routes>
  );
}

export default App;
