import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/featureCategoryApi";

export const getFeatureCategory = createAsyncThunk(
  "category/getallfeaturecategory",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.getAllFeatureCategory();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDetailFeatureCategory = createAsyncThunk(
  "category/getdetailfeaturecategory",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.getDetailFeatureCategory(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createFeatureCategory = createAsyncThunk(
  "category/createfeaturecategory",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.postFeatureCategory(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateFeatureCategory = createAsyncThunk(
  "category/updatefeaturecategory",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.updateFeatureCategory(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteFeatureCategory = createAsyncThunk(
  "category/deletefeaturecategory",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.deleteFeatureCategory(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const featureCategorySlice = createSlice({
  name: "featurecategory",
  initialState: {
    featureCategory: [],
    featureCategoryDetail: {},
    isLoading: true,
    isLoadingAction: false,
    isloadingDetail: true,
    error: "",
  },
  extraReducers: {
    //GET FEATURE CATEGORY
    [getFeatureCategory.pending]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [getFeatureCategory.fulfilled]: (state, action) => {
      state.featureCategory = action.payload;
      state.isLoading = false;
      state.error = "";
    },

    [getFeatureCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //ADD DETAIL FEATURE CATEGORY
    [getDetailFeatureCategory.pending]: (state) => {
      state.isloadingDetail = true;
      state.error = "";
    },
    [getDetailFeatureCategory.fulfilled]: (state, action) => {
      state.featureCategoryDetail = action.payload;
      state.isloadingDetail = false;
      state.error = "";
    },
    [getDetailFeatureCategory.rejected]: (state, action) => {
      state.isloadingDetail = false;
      state.error = action.payload;
    },

    // ADD FEATURE CATEGORY
    [createFeatureCategory.pending]: (state) => {
      state.isLoadingAction = true;
      state.error = "";
    },
    [createFeatureCategory.fulfilled]: (state, action) => {
      state.featureCategory.unshift(action.payload);
      state.isLoadingAction = false;
      state.error = "";
    },
    [createFeatureCategory.rejected]: (state, action) => {
      state.isLoadingAction = false;
      state.error = action.payload;
    },

    //UPDATE FEATURE CATEGORY
    [updateFeatureCategory.pending]: (state) => {
      state.isLoadingAction = true;
      state.error = "";
    },
    [updateFeatureCategory.fulfilled]: (state, action) => {
      state.featureCategory = state.featureCategory.map((item) =>
        item._id === action.payload._id ? action.payload : { ...item }
      );
      state.isLoadingAction = false;
      state.error = "";
    },
    [updateFeatureCategory.rejected]: (state, action) => {
      state.isLoadingAction = false;
      state.error = action.payload;
    },

    //DELETE FEATURE CATEGORY
    [deleteFeatureCategory.pending]: (state) => {
      state.isLoadingAction = true;
      state.error = "";
    },
    [deleteFeatureCategory.fulfilled]: (state, action) => {
      state.featureCategory = state.featureCategory.filter(
        (item) => item._id !== action.payload.deleteFeatureCategory._id
      );
      state.isLoadingAction = false;
      state.error = "";
    },
    [deleteFeatureCategory.rejected]: (state, action) => {
      state.isLoadingAction = false;
      state.error = action.payload;
    },
  },
});

const featureCategoryReducer = featureCategorySlice.reducer;
export default featureCategoryReducer;
