import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./feature/auth/login/Login";
import BannerList from "./feature/bannerlist/BannerList";
import BrandList from "./feature/brandlist/BrandList";
import CategoryList from "./feature/categorylist/CategoryList";
import NewProduct from "./feature/newproduct/NewProduct";
import ProductList from "./feature/productlist/ProductList";
import { getUser } from "./feature/reduxSlice/userSlice";
import UpdateProduct from "./feature/updateproduct/UpdateProduct";
import User from "./feature/user/User";
import AuthRoute from "./router/AuthRoute";
import ProtectedRoute from "./router/ProtectedRoute";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import UpdateCategory from "./feature/updateCategory/UpdateCategory";
import FeatureCategoryList from "./feature/featurecategorylist/FeatureCategoryList";
import NewFeatureCategory from "./feature/newfeaturecategory/NewFeatureCategory";
import UpdateFeatureCategory from "./feature/updatefeaturecategory/UpdateFeatureCategory";
import BannerMobileList from "./feature/bannermobilelist/BannerMobileList";
import SearchList from "./feature/searchlist/SearchList";
import NewSearch from "./feature/newsearch/NewSearch";
import UpdateSearch from "./feature/updatesearch/UpdateSearch";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrentUser = async () => {
      await dispatch(getUser());
    };
    getCurrentUser();
  }, [dispatch]);

  const darkTheme = createTheme({
    palette: {
      mode: "light",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/san-pham-moi"
            element={
              <ProtectedRoute>
                <NewProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/san-pham/:id"
            element={
              <ProtectedRoute>
                <UpdateProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/thuong-hieu"
            element={
              <ProtectedRoute>
                <BrandList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/loai-san-pham"
            element={
              <ProtectedRoute>
                <CategoryList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/loai-san-pham-noi-bat"
            element={
              <ProtectedRoute>
                <FeatureCategoryList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/loai-san-pham-noi-bat/them-moi"
            element={
              <ProtectedRoute>
                <NewFeatureCategory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/loai-san-pham-noi-bat/cap-nhat/:id"
            element={
              <ProtectedRoute>
                <UpdateFeatureCategory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/loai-san-pham/cap-nhat/:id"
            element={
              <ProtectedRoute>
                <UpdateCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/anh-bia"
            element={
              <ProtectedRoute>
                <BannerList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/anh-bia-dien-thoai"
            element={
              <ProtectedRoute>
                <BannerMobileList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/nguoi-dung"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
          <Route
            path="/danh-sach-tim-kiem"
            element={
              <ProtectedRoute>
                <SearchList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/danh-sach-tim-kiem/them-moi"
            element={
              <ProtectedRoute>
                <NewSearch />
              </ProtectedRoute>
            }
          />
          <Route
            path="/danh-sach-tim-kiem/cap-nhat/:id"
            element={
              <ProtectedRoute>
                <UpdateSearch />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
