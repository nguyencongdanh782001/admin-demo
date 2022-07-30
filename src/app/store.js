import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/reduxSlice/authSlice";
import bannerMobileReducer from "../feature/reduxSlice/bannerMobileSlice";
import bannerReducer from "../feature/reduxSlice/bannerSlice";
import brandReducer from "../feature/reduxSlice/brandSlice";
import categoryReducer from "../feature/reduxSlice/categorySlice";
import featureCategoryReducer from "../feature/reduxSlice/featureCategorySlice";
import listSearchReducer from "../feature/reduxSlice/listSearchSlice";
import productReducer from "../feature/reduxSlice/productSlice";
import userReducer from "../feature/reduxSlice/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    brand: brandReducer,
    banner: bannerReducer,
    bannerMobile: bannerMobileReducer,
    featureCategory: featureCategoryReducer,
    listSearch: listSearchReducer,
  },
});
