import { CloseOutlined } from "@mui/icons-material";
import {
  Alert,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Slide,
  Snackbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { getCategory } from "../reduxSlice/categorySlice";
import { getDetailFeatureCategory } from "../reduxSlice/featureCategorySlice";
import {
  DataGridTitle,
  FeatureCategoryDropZoneButton,
  FeatureCategoryDropZoneContainer,
  FeatureCategoryDropZoneImg,
  FeatureCategoryDropZoneImgContainer,
  FeatureCategoryForm,
  FeatureCategoryFormButton,
  FeatureCategoryFormButtonGroup,
  FeatureCategoryFormInputGroup,
  FeatureCategoryInputItem,
  UpdateFeatureCategoryLoadingContainer,
  UpdateFeatureCategoryLoadingDesc,
  UpdateFeatureCategoryLoadingGroup1,
  UpdateFeatureCategoryLoadingItem,
} from "./UpdateFeatureCategoryStyle";

const UpdateFeatureCategory = () => {
  const featureCategoryList = useSelector((state) => state.featureCategory);
  const categoryList = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const location = useLocation();

  const id = location.pathname.split("/")[3];

  useEffect(() => {
    const fetchProductDetail = async (id) => {
      const res = await dispatch(getDetailFeatureCategory(id));
      setImage(res.payload.image);
      setCategory(res.payload.category);
    };
    fetchProductDetail(id);
  }, [dispatch, id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([dispatch(getCategory())]);
      } catch (error) {}
    };
    fetchData();
  }, [dispatch]);

  const [category, setCategory] = useState("");
  const [categoryErr, setCategoryErr] = useState({
    isError: false,
    message: "",
  });

  const [image, setImage] = useState(null);
  const [errorNullImg, setErrorNullImg] = useState(false);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(image);
    };
  }, [image]);

  const handleDeleteImg = () => {
    setImage(null);
    URL.revokeObjectURL(image);
  };

  const handleBlur = () => {
    if (category !== "") {
      setCategoryErr({
        isError: false,
        message: "",
      });
    } else if (category === "") {
      setCategoryErr({
        isError: true,
        message: "Loại sản phẩm bắt buộc!",
      });
    }
  };

  const [openAlert, setOpenAlert] = useState(false);
  const [transition, setTransition] = useState(undefined);
  const [notify, setNotify] = useState({
    isValid: false,
    message: "",
  });
  const TransitionLeft = (props) => {
    return <Slide {...props} direction="left" />;
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleUpdateFeatureCategory = async (e) => {
    e.preventDefault();
    if (image === null) {
      await setErrorNullImg(true);
    }
    if (category === "") {
      setCategoryErr({
        isError: true,
        message: "Loại sản phẩm bắt buộc!",
      });
    }
    if (image !== null && category !== "") {
      setOpenAlert(true);
      setTransition(() => TransitionLeft);
      setNotify({
        isValid: false,
        message: "Cập nhật loại sản phẩm nổi bật thành công",
      });
      setErrorNullImg(false);
      setCategoryErr({
        isError: false,
        message: "",
      });
    }
  };
  return (
    <Layout>
      <DataGridTitle>Cập nhật loại sản phẩm nổi bật</DataGridTitle>
      {featureCategoryList.isloadingDetail ? (
        <UpdateFeatureCategoryLoadingContainer>
          <UpdateFeatureCategoryLoadingGroup1>
            <UpdateFeatureCategoryLoadingItem>
              <Skeleton animation="wave" variant="text" />
            </UpdateFeatureCategoryLoadingItem>
          </UpdateFeatureCategoryLoadingGroup1>
          <UpdateFeatureCategoryLoadingDesc>
            <Skeleton animation="wave" variant="rectangular" />
          </UpdateFeatureCategoryLoadingDesc>
        </UpdateFeatureCategoryLoadingContainer>
      ) : (
        <FeatureCategoryForm
          onSubmit={handleUpdateFeatureCategory}
          autoComplete="off"
        >
          <FeatureCategoryFormInputGroup>
            <FeatureCategoryInputItem className="input-1">
              <FormControl
                fullWidth
                size="small"
                error={categoryErr.isError ? true : false}
                sx={{ marginTop: "0.9px" }}
              >
                <InputLabel id="brand-label">Loại sản phẩm</InputLabel>
                <Select
                  labelId="brand-label"
                  id="brand-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  onBlur={handleBlur}
                  label="Loại sản phẩm"
                >
                  {categoryList.category.map((item, index) => (
                    <MenuItem value={item._id} key={index}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{categoryErr.message}</FormHelperText>
              </FormControl>
            </FeatureCategoryInputItem>
            <Dropzone
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
              multiple={false}
              accept="image/jpeg,image/png"
            >
              {({ getRootProps, getInputProps }) => (
                <FeatureCategoryDropZoneContainer
                  className={`${image !== null && "image"} ${
                    errorNullImg && "error"
                  }`}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <p
                    style={{
                      textAlign: "center",
                      margin: "0 5px 0 5px",
                      lineHeight: "25px",
                    }}
                  >
                    Kéo thả ảnh vào đây hoặc nhấp vào để chọn ảnh (381px -
                    220px)
                  </p>
                  {image !== null && (
                    <FeatureCategoryDropZoneImgContainer>
                      <FeatureCategoryDropZoneImg
                        src={
                          typeof image === "object"
                            ? URL.createObjectURL(image)
                            : image
                        }
                        alt="image"
                      />
                      <FeatureCategoryDropZoneButton onClick={handleDeleteImg}>
                        <CloseOutlined />
                      </FeatureCategoryDropZoneButton>
                    </FeatureCategoryDropZoneImgContainer>
                  )}
                </FeatureCategoryDropZoneContainer>
              )}
            </Dropzone>
          </FeatureCategoryFormInputGroup>
          <FeatureCategoryFormButtonGroup>
            <FeatureCategoryFormButton
              color="primary"
              type="submit"
              variant="contained"
              disabled={
                featureCategoryList.isLoadingAction === true ? true : false
              }
            >
              {featureCategoryList.isLoadingAction === true && (
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "15px",
                  }}
                >
                  <CircularProgress color="inherit" size={18} />
                </span>
              )}
              Cập nhật
            </FeatureCategoryFormButton>
          </FeatureCategoryFormButtonGroup>
        </FeatureCategoryForm>
      )}

      <Snackbar
        open={openAlert}
        onClose={handleCloseAlert}
        TransitionComponent={transition}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        key={transition ? transition.name : ""}
        autoHideDuration={notify.isValid === true ? 4000 : 2000}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={notify.isValid ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {notify.message}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default UpdateFeatureCategory;
