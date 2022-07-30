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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { getListSearch } from "../reduxSlice/listSearchSlice";
import { DataGridGroup, DataGridTitle } from "./SearchListStyle";

const SearchList = () => {
  const searchList = useSelector((state) => state.listSearch);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        await dispatch(getListSearch());
      } catch (error) {}
    };
    fetchSearch();
  }, [dispatch]);
  //search list
  const searchRows = searchList.listSearch.map((item) => ({
    _id: item._id,
    nameSearch: item.nameSearch,
  }));
  const searchColumns = [
    { field: "nameSearch", headerName: "Tên danh mục tìm kiếm", width: 200 },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      width: 240,
      renderCell: (params) => {
        return (
          <div>{dateFormat(params.row.createdAt, "dddd, mmmm dS, yyyy")}</div>
        );
      },
    },
    {
      field: "action",
      headerName: "Hành động",
      width: 110,
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
            <Link to={"/danh-sach-tim-kiem/cap-nhat/" + params.row._id}>
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

  // const handleUpdateBrand = async (values) => {
  //   try {
  //     const value = {
  //       data: {
  //         name: values.values.nameBrand,
  //       },
  //       id: values.id,
  //     };
  //     const res = await dispatch(updateBrand(value));
  //     if (res.meta.requestStatus === "fulfilled") {
  //       setOpenAlert(true);
  //       setTransition(() => TransitionLeft);
  //       setNotify({
  //         isValid: false,
  //         message: "Cập nhật thương hiệu thành công",
  //       });
  //     } else if (res.meta.requestStatus === "rejected") {
  //       setOpenAlert(true);
  //       setTransition(() => TransitionLeft);
  //       setNotify({ isValid: true, message: res.payload });
  //     }
  //   } catch (error) {
  //   }
  // };

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

  const handleDeleteSearch = async (id) => {
    setOpenDelete(false);
    setDataDelete(null);
    setOpenAlert(true);
    setTransition(() => TransitionLeft);
    setNotify({ isValid: false, message: "Xóa danh mục thành công" });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Link
        to="/danh-sach-tim-kiem/them-moi"
        style={{ textDecoration: "none" }}
      >
        <Button variant="contained" sx={{ marginBottom: "25px" }}>
          Thêm danh mục tìm kiếm
        </Button>
      </Link>
      <DataGridGroup>
        <DataGridTitle>Danh sách tìm kiếm</DataGridTitle>
        <div style={{ height: "70vh", width: "100%" }}>
          <DataGrid
            rows={searchRows}
            getRowId={(row) => row._id}
            disableSelectionOnClick
            columns={searchColumns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            loading={searchList.isLoading}
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
        <DialogTitle id="alert-dialog-title">{"Xóa mục tìm kiếm"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xóa mục tìm kiếm ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDeleteAlert}
            disabled={searchList.isLoadingAction ? true : false}
          >
            Hủy
          </Button>
          <Button
            onClick={() => handleDeleteSearch(dataDelete)}
            color="error"
            disabled={searchList.isLoadingAction ? true : false}
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default SearchList;
