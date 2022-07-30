import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";

import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import {
  Alert,
  Button,
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
import { Link } from "react-router-dom";
import { getFeatureCategory } from "../reduxSlice/featureCategorySlice";
import {
  DataGridGroup,
  DataGridImg,
  DataGridImgContainer,
  DataGridTitle,
} from "./FeatureCategoryListStyle";

const FeatureCategoryList = () => {
  const featureCategoryList = useSelector((state) => state.featureCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([dispatch(getFeatureCategory())]);
      } catch (error) {}
    };
    fetchData();
  }, [dispatch]);

  //feature category list
  const featureCategoryRows = featureCategoryList.featureCategory.map(
    (item) => ({
      _id: item._id,
      category: item?.category?.name,
      image: item?.image,
    })
  );
  const featureCategoryColumns = [
    {
      field: "category",
      headerName: "Loại sản phẩm",
      width: 220,
    },
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
            <Link to={"/loai-san-pham-noi-bat/cap-nhat/" + params.row._id}>
              <IconButton color="primary">
                <EditOutlined />
              </IconButton>
            </Link>

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

  const handleDeleteFeatureCategory = async (id) => {
    setOpenDelete(false);
    setDataDelete(null);
    setOpenAlert(true);
    setTransition(() => TransitionLeft);
    setNotify({
      isValid: false,
      message: "Xóa loại sản phẩm nổi bật thành công",
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Link
        to="/loai-san-pham-noi-bat/them-moi"
        style={{ textDecoration: "none" }}
      >
        <Button variant="contained" sx={{ marginBottom: "25px" }}>
          Thêm loại sản phẩm nổi bật
        </Button>
      </Link>
      <DataGridGroup>
        <DataGridTitle>Danh sách loại sản phẩm nổi bật</DataGridTitle>
        <div style={{ height: "70vh", width: "100%" }}>
          <DataGrid
            rows={featureCategoryRows}
            getRowId={(row) => row._id}
            disableSelectionOnClick
            columns={featureCategoryColumns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            loading={featureCategoryList.isLoading}
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
            Bạn có chắc muốn xóa mục này này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDeleteAlert}
            disabled={featureCategoryList.isLoadingAction ? true : false}
          >
            Hủy
          </Button>
          <Button
            onClick={() => handleDeleteFeatureCategory(dataDelete)}
            color="error"
            disabled={featureCategoryList.isLoadingAction ? true : false}
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default FeatureCategoryList;
