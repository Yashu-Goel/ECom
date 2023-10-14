import { SkeletonTheme } from "react-loading-skeleton";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import UserProvider from "./Components/Context/UserProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import SellerProvider from "./Components/Seller/SellerProvider";
import "react-loading-skeleton/dist/skeleton.css";
import { Provider } from "react-redux";
import { store } from "./Components/ReduxToolkit/store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
      <SellerProvider>
        <UserProvider>
          <Provider store={store}>
            <App />
          </Provider>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            theme="colored"
          />
        </UserProvider>
      </SellerProvider>
    </SkeletonTheme>
  </Router>
);
