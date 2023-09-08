import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import { Product } from "./Components/IndividualProduct/Product";
import { Auth } from "./Components/Authentication/Auth.js";
import OrderConfirmationPage from "./Components/OrderConfirmationPage/OrderConfirmationPage";
import SellerHome from "./Components/Seller/SellerHome";
import AddProduct from "./Components/Seller/AddProduct";
import SellerAuth from "./Components/Seller/SellerAuth";
import SellerOrders from "./Components/Seller/SellerOrders";
import OrderHistory from "./Components/OrderHistory/OrderHistory";
import SellerProvider from "./Components/Seller/SellerProvider";
import UserProfile from "./Components/UserProfile/UserProfile";
import SellerCatalogue from "./Components/Seller/SellerCatalogue";
import Profile from "./Components/Seller/Profile";
import DealsPage from "./Components/Deals/DealsPage";
import SellerDashboard from "./Components/Seller/SellerDashboard";
import ShippingDetails from "./Components/ProceedToCheckOut/ShippingDetails";
import CategoryPage from "./Components/Deals/CategoryPage";
import BillModal from "./Components/OrderConfirmationPage/BillModal";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<Product />} />
        <Route exact path="/auth" element={<Auth />} />
        <Route exact path="/shipping-address" element={<ShippingDetails />} />
        <Route
          exact
          path="/order-confirmation"
          element={<OrderConfirmationPage />}
        />
        <Route exact path="/order-history" element={<OrderHistory />} />
        <Route
          exact
          path="/catalogue"
          element={
            <SellerProvider>
              <SellerCatalogue />
            </SellerProvider>
          }
        />

        <Route
          exact
          path="/orders"
          element={
            <SellerProvider>
              <SellerOrders />
            </SellerProvider>
          }
        />
        <Route exact path="/success" element={<BillModal />} />
        <Route
          exact
          path="/seller"
          element={
            <SellerProvider>
              <SellerHome />{" "}
            </SellerProvider>
          }
        />
        <Route
          exact
          path="/seller_dashboard"
          element={
            <SellerProvider>
              <SellerDashboard />
            </SellerProvider>
          }
        />
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
        <Route
          path="/category/:categoryName/:tags?"
          element={<CategoryPage />}
        />
      </Routes>
    </>
  );
}

export default App;
