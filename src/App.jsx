
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProductsPage from "./pages/ProductsPage";
import VerifyPage from "./pages/VerifyPage";
import LoginPage from "./pages/LoginPage";
import CartListPage from "./pages/CartListPage";
import ValidationHelper from "./utilites/validationHelper.js";
import PageNNotFound from "./pages/PageNNotFound.jsx";

const App = () => {
  if (ValidationHelper.isLogin()){
      return (
          <BrowserRouter>
              <Routes>

                  <Route path="/" element={<ProductsPage />} />

                  <Route path="/cart-list" element={<CartListPage />} />
                  <Route path="*" element={<PageNNotFound />} />
              </Routes>
          </BrowserRouter>
      );
  }else {
      return (
          <BrowserRouter>
              <Routes>

                  <Route path="/" element={<ProductsPage />} />
                  <Route path="/verify" element={<VerifyPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="*" element={<PageNNotFound />} />
              </Routes>
          </BrowserRouter>
      );
  }
};

export default App;
