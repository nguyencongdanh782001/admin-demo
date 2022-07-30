import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/categoryApi";

export const getCategory = createAsyncThunk(
  "category/getallcategory",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.getAllCategory();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDetailCategory = createAsyncThunk(
  "category/getdetailcategory",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.getDetailCategory(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/createcategory",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.postCategory(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updatecategory",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.updateCategory(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deletecategory",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.deleteCategory(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: [],
    categoryDetail: {},
    isLoading: true,
    isLoadingAction: false,
    isloadingDetail: true,
    error: "",
  },
  extraReducers: {
    //GET CATEGORY
    [getCategory.pending]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [getCategory.fulfilled]: (state, action) => {
      state.category = action.payload;
      state.isLoading = false;
      state.error = "";
    },

    [getCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //ADD DETAIL CATEGORY
    [getDetailCategory.pending]: (state) => {
      state.isloadingDetail = true;
      state.error = "";
    },
    [getDetailCategory.fulfilled]: (state, action) => {
      state.categoryDetail = action.payload;
      state.isloadingDetail = false;
      state.error = "";
    },
    [getDetailCategory.rejected]: (state, action) => {
      state.isloadingDetail = false;
      state.error = action.payload;
    },

    // ADD CATEGORY
    [createCategory.pending]: (state) => {
      state.isLoadingAction = true;
      state.error = "";
    },
    [createCategory.fulfilled]: (state, action) => {
      state.category.unshift(action.payload);
      state.isLoadingAction = false;
      state.error = "";
    },
    [createCategory.rejected]: (state, action) => {
      state.isLoadingAction = false;
      state.error = action.payload;
    },

    //UPDATE CATEGORY
    [updateCategory.pending]: (state) => {
      state.isLoadingAction = true;
      state.error = "";
    },
    [updateCategory.fulfilled]: (state, action) => {
      state.category = state.category.map((item) =>
        item._id === action.payload._id ? action.payload : { ...item }
      );
      state.isLoadingAction = false;
      state.error = "";
    },
    [updateCategory.rejected]: (state, action) => {
      state.isLoadingAction = false;
      state.error = action.payload;
    },

    //DELETE CATEGORY
    [deleteCategory.pending]: (state) => {
      state.isLoadingAction = true;
      state.error = "";
    },
    [deleteCategory.fulfilled]: (state, action) => {
      state.category = state.category.filter(
        (item) => item._id !== action.payload.deleteCategory._id
      );
      state.isLoadingAction = false;
      state.error = "";
    },
    [deleteCategory.rejected]: (state, action) => {
      state.isLoadingAction = false;
      state.error = action.payload;
    },
  },
});

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
