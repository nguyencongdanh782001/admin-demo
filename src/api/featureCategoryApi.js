import axiosClient from "./axiosClient";

export const getAllFeatureCategory = () =>
  axiosClient.get(`feature-category/get-all-feature-category`);

export const getDetailFeatureCategory = (id) =>
  axiosClient.get(`feature-category/get-detail-feature-category/${id}`);

export const postFeatureCategory = (value) =>
  axiosClient.post(`feature-category/create-feauture-category`, value);

export const updateFeatureCategory = (value) =>
  axiosClient.put(
    `feature-category/update-feature-category/${value.id}`,
    value.data
  );

export const deleteFeatureCategory = (id) =>
  axiosClient.delete(`feature-category/delete-feature-category/${id}`);
