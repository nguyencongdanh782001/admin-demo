import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/listSearchApi";

export const getListSearch = createAsyncThunk(
  "listSearch/getalllistSearch",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.getAllListSearch();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDetailListSearch = createAsyncThunk(
  "listSearch/getdetaillistSearch",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.getDetailListSearch(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createListSearch = createAsyncThunk(
  "listSearch/createlistSearch",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.postListSearch(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateListSearch = createAsyncThunk(
  "listSearch/updatelistSearch",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.updateListSearch(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteListSearch = createAsyncThunk(
  "listSearch/deletelistSearch",
  async (value, { rejectWithValue }) => {
    try {
      const res = await api.deleteListSearch(value);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const listSearchSlice = createSlice({
  name: "listSearch",
  initialState: {
    listSearch: [],
    listSearchDetail: {},
    isLoading: true,
    isLoadingAction: false,
    isloadingDetail: true,
    error: "",
  },
  extraReducers: {
    //GET FEATURE LIST SEARCH
    [getListSearch.pending]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [getListSearch.fulfilled]: (state, action) => {
      state.listSearch = action.payload;
      state.isLoading = false;
      state.error = "";
    },

    [getListSearch.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    //ADD DETAIL LIST SEARCH
    [getDetailListSearch.pending]: (state) => {
      state.isloadingDetail = true;
      state.error = "";
    },
    [getDetailListSearch.fulfilled]: (state, action) => {
      state.listSearchDetail = action.payload;
      state.isloadingDetail = false;
      state.error = "";
    },
    [getDetailListSearch.rejected]: (state, action) => {
      state.isloadingDetail = false;
      state.error = action.payload;
    },

    // ADD LIST SEARCH
    [createListSearch.pending]: (state) => {
      state.isLoadingAction = true;
      state.error = "";
    },
    [createListSearch.fulfilled]: (state, action) => {
      state.listSearch.push(action.payload);
      state.isLoadingAction = false;
      state.error = "";
    },
    [createListSearch.rejected]: (state, action) => {
      state.isLoadingAction = false;
      state.error = action.payload;
    },

    //UPDATE LIST SEARCH
    [updateListSearch.pending]: (state) => {
      state.isLoadingAction = true;
      state.error = "";
    },
    [updateListSearch.fulfilled]: (state, action) => {
      state.listSearch = state.listSearch.map((item) =>
        item._id === action.payload._id ? action.payload : { ...item }
      );
      state.isLoadingAction = false;
      state.error = "";
    },
    [updateListSearch.rejected]: (state, action) => {
      state.isLoadingAction = false;
      state.error = action.payload;
    },

    //DELETE LIST SEARCH
    [deleteListSearch.pending]: (state) => {
      state.isLoadingAction = true;
      state.error = "";
    },
    [deleteListSearch.fulfilled]: (state, action) => {
      state.listSearch = state.listSearch.filter(
        (item) => item._id !== action.payload.deleteListSearch._id
      );
      state.isLoadingAction = false;
      state.error = "";
    },
    [deleteListSearch.rejected]: (state, action) => {
      state.isLoadingAction = false;
      state.error = action.payload;
    },
  },
});

const listSearchReducer = listSearchSlice.reducer;
export default listSearchReducer;
