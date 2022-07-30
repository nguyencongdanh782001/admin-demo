import axiosClient from "./axiosClient";

export const getAllBannerMobile = () =>
  axiosClient.get(`banner-mobile/all-banner-mobile`);

export const postBannerMobile = (value) =>
  axiosClient.post(`banner-mobile/create-banner-mobile`, value);

export const updateBannerMobile = (value) =>
  axiosClient.put(`banner-mobile/update-banner-mobile/${value.id}`, value.data);

export const deleteBannerMobile = (id) =>
  axiosClient.delete(`banner-mobile/delete-banner-mobile/${id}`);
