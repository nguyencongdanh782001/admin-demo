import { CloseOutlined } from "@mui/icons-material";
import {
  Alert,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  Snackbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { getCategory } from "../reduxSlice/categorySlice";
import { getFeatureCategory } from "../reduxSlice/featureCategorySlice";
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
} from "./NewFeatureCategoryStyle";

const NewFeatureCategory = () => {
  const featureCategoryList = useSelector((state) => state.featureCategory);
  const categoryList = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(getFeatureCategory()),
          dispatch(getCategory()),
        ]);
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

  const handleCreateFeatureCategory = async (e) => {
    e.preventDefault();
    if (image !== null) {
      setImage(null);
      setOpenAlert(true);
      setTransition(() => TransitionLeft);
      setNotify({
        isValid: false,
        message: "Thêm danh Mục nhỏ nổi bật mới thành công",
      });
      setCategoryErr({
        isError: false,
        message: "",
      });
      setErrorNullImg(false);
      setCategory("");
    }
    if (image === null) {
      await setErrorNullImg(true);
    }
    if (category === "") {
      setCategoryErr({
        isError: true,
        message: "Loại sản phẩm bắt buộc!",
      });
    }
  };
  return (
    <Layout>
      <DataGridTitle>Thêm danh Mục nhỏ nổi bật mới</DataGridTitle>
      <FeatureCategoryForm
        onSubmit={handleCreateFeatureCategory}
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
            onDrop={(acceptedFiles) => setImage(acceptedFiles)}
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
                  Kéo thả ảnh vào đây hoặc nhấp vào để chọn ảnh
                </p>
                {image !== null && (
                  <FeatureCategoryDropZoneImgContainer>
                    <FeatureCategoryDropZoneImg
                      src={URL.createObjectURL(image[0])}
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
            Thêm
          </FeatureCategoryFormButton>
        </FeatureCategoryFormButtonGroup>
      </FeatureCategoryForm>
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

export default NewFeatureCategory;
