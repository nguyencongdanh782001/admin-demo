import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/bannerMobileApi";

export const getBannerMobile = createAsyncThunk(
  "banner-mobile/getallbannermobile",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.getAllBannerMobile();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createBannerMobile = createAsyncThunk(
  "banner-mobile/createbannermobile",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.postBannerMobile(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBannerMobile = createAsyncThunk(
  "banner-mobile/updatebannermobile",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.updateBannerMobile(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteBannerMobile = createAsyncThunk(
  "banner-mobile/deletebannermobile",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.deleteBannerMobile(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const bannerMobileSlice = createSlice({
  name: "banner-mobile",
  initialState: {
    banner: [],
    isLoading: true,
    isLoadingAction: false,
    error: "",
  },
  extraReducers: {
    //GET BANNER
    [getBannerMobile.pending]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [getBannerMobile.fulfilled]: (state, action) => {
      state.banner = action.payload;
      state.isLoading = false;
      state.error = "";
    },

    [getBannerMobile.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // ADD BRAND
    [createBannerMobile.pending]: (state) => {
      state.isLoadingAction = true;
      state.error = "";
    },
    [createBannerMobile.fulfilled]: (state, action) => {
      state.banner.unshift(action.payload);
      state.isLoadingAction = false;
      state.error = "";
    },
    [createBannerMobile.rejected]: (state, action) => {
      state.isLoadingAction = false;
      state.error = action.payload;
    },

    //UPDATE BANNER
    [updateBannerMobile.pending]: (state) => {
      state.isLoadingAction = true;
      state.error = "";
    },
    [updateBannerMobile.fulfilled]: (state, action) => {
      state.banner = state.banner.map((item) =>
        item._id === action.payload._id ? action.payload : { ...item }
      );
      state.isLoadingAction = false;
      state.error = "";
    },
    [updateBannerMobile.rejected]: (state, action) => {
      state.isLoadingAction = false;
      state.error = action.payload;
    },

    //DELETE BRAND
    [deleteBannerMobile.pending]: (state) => {
      state.isLoadingAction = true;
      state.error = "";
    },
    [deleteBannerMobile.fulfilled]: (state, action) => {
      state.banner = state.banner.filter(
        (item) => item._id !== action.payload.deleteBannerMobile._id
      );
      state.isLoadingAction = false;
      state.error = "";
    },
    [deleteBannerMobile.rejected]: (state, action) => {
      state.isLoadingAction = false;
      state.error = action.payload;
    },
  },
});

const bannerMobileReducer = bannerMobileSlice.reducer;
export default bannerMobileReducer;
