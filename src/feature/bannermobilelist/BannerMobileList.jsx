import { CloseOutlined, DeleteOutline } from "@mui/icons-material";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide,
  Snackbar,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import dateFormat from "dateformat";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { getBannerMobile } from "../reduxSlice/bannerMobileSlice";
import {
  BannerDropZoneButton,
  BannerDropZoneContainer,
  BannerDropZoneImg,
  BannerDropZoneImgContainer,
  BannerErrorMessage,
  BannerForm,
  BannerFormButton,
  BannerFormButtonGroup,
  BannerFormInputGroup,
  DataGridGroup,
  DataGridImg,
  DataGridImgContainer,
  DataGridTitle,
} from "./BannerStyle";

const BannerMobileList = () => {
  const bannerList = useSelector((state) => state.bannerMobile);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        await dispatch(getBannerMobile());
      } catch (error) {}
    };
    fetchBanner();
  }, [dispatch]);

  //banner list
  const bannerRows = bannerList.banner.map((item) => ({
    _id: item._id,
    image: item.image,
  }));
  const bannerColumns = [
    {
      field: "image",
      headerName: "Ảnh bìa",
      width: 180,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <DataGridImgContainer>
            <DataGridImg src={params.row.image} alt="" />
          </DataGridImgContainer>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      width: 220,
      renderCell: (params) => {
        return (
          <div>{dateFormat(params.row.createdAt, "dddd, mmmm dS, yyyy")}</div>
        );
      },
    },
    {
      field: "action",
      headerName: "Hành động",
      width: 100,
      renderCell: (params) => {
        return (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              color="error"
              onClick={() => handleClickOpenDelete(params.row._id)}
            >
              <DeleteOutline />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const [image, setImage] = useState(null);
  const [errorNullImg, setErrorNullImg] = useState("");

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(image);
    };
  }, [image]);

  const handleDeleteImg = () => {
    setImage(null);
    URL.revokeObjectURL(image);
  };

  const handleCreateBanner = async (e) => {
    e.preventDefault();
    if (image !== null) {
      setImage(null);
      setOpenAlert(true);
      setTransition(() => TransitionLeft);
      setNotify({ isValid: false, message: "Thêm ảnh bìa thành công" });
      setErrorNullImg("");
    } else {
      await setErrorNullImg("Ảnh bìa bắc buộc!");
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

  const [openDelete, setOpenDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState(null);
  const handleClickOpenDelete = (id) => {
    setOpenDelete(true);
    setDataDelete(id);
  };

  const handleCloseDeleteAlert = () => {
    setOpenDelete(false);
    setDataDelete(null);
  };

  const handleDeleteBanner = async (id) => {
    setOpenDelete(false);
    setDataDelete(null);
    setOpenAlert(true);
    setTransition(() => TransitionLeft);
    setNotify({ isValid: false, message: "Xóa ảnh bìa thành công" });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <DataGridTitle>Thêm ảnh bìa trên điện thoại mới</DataGridTitle>
      <BannerForm onSubmit={handleCreateBanner} autoComplete="off">
        <BannerFormInputGroup>
          {image === null && (
            <BannerErrorMessage>{errorNullImg}</BannerErrorMessage>
          )}
          <Dropzone
            onDrop={(acceptedFiles) => setImage(acceptedFiles)}
            multiple={false}
            accept="image/jpeg,image/png"
          >
            {({ getRootProps, getInputProps }) => (
              <BannerDropZoneContainer
                className={`${image !== null && "image"} ${
                  errorNullImg && "error"
                }`}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <p>Kéo thả ảnh vào đây hoặc nhấp vào để chọn ảnh</p>
                {image !== null && (
                  <BannerDropZoneImgContainer>
                    <BannerDropZoneImg
                      src={URL.createObjectURL(image[0])}
                      alt="image"
                    />
                    <BannerDropZoneButton onClick={handleDeleteImg}>
                      <CloseOutlined />
                    </BannerDropZoneButton>
                  </BannerDropZoneImgContainer>
                )}
              </BannerDropZoneContainer>
            )}
          </Dropzone>
        </BannerFormInputGroup>
        <BannerFormButtonGroup>
          <BannerFormButton
            color="primary"
            type="submit"
            variant="contained"
            disabled={bannerList.isLoadingAction === true ? true : false}
          >
            {bannerList.isLoadingAction === true && (
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
          </BannerFormButton>
        </BannerFormButtonGroup>
      </BannerForm>

      <DataGridGroup>
        <DataGridTitle>Danh sách ảnh bìa</DataGridTitle>
        <div style={{ height: "70vh", width: "100%" }}>
          <DataGrid
            rows={bannerRows}
            getRowId={(row) => row._id}
            disableSelectionOnClick
            columns={bannerColumns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            loading={bannerList.isLoading}
            pagination
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>
      </DataGridGroup>
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
      <Dialog
        open={openDelete}
        onClose={handleCloseDeleteAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xóa ảnh bìa"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xóa ảnh bìa này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDeleteAlert}
            disabled={bannerList.isLoadingAction ? true : false}
          >
            Hủy
          </Button>
          <Button
            onClick={() => handleDeleteBanner(dataDelete)}
            color="error"
            disabled={bannerList.isLoadingAction ? true : false}
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default BannerMobileList;
