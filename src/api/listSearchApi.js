import axiosClient from "./axiosClient";

export const getAllListSearch = () => axiosClient.get(`list-search/`);

export const getDetailListSearch = (id) =>
  axiosClient.get(`list-search/get-detail-list-search/${id}`);

export const postListSearch = (value) =>
  axiosClient.post(`list-search/`, value);

export const updateListSearch = (value) =>
  axiosClient.put(`list-search/${value.id}`, value.data);

export const deleteListSearch = (id) => axiosClient.delete(`list-search/${id}`);
