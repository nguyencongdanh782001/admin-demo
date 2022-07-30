import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
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
import { getProduct } from "../reduxSlice/productSlice";
import {
  DataGridGroup,
  DataGridTitle,
  ImageContainer,
  ImageProduct,
} from "./ProductListStyle";
const ProductList = () => {
  const productList = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllProduct = async () => {
      try {
        await dispatch(getProduct());
      } catch (error) {}
    };
    getAllProduct();
  }, [dispatch, productList.isLoadingDelete]);

  //product list
  const productRows = productList.product.map((item) => ({
    _id: item._id,
    name: item.name,
    image: item.image[0].image,
    category: item.category.name,
    brand: item.brand.name,
    instock: item.instock,
    price: item.price,
    sale: item.sale,
    createdAt: item.createdAt,
  }));
  const productColumns = [
    { field: "name", headerName: "Tên SP", width: 320 },
    {
      field: "image",
      headerName: "Hình SP",
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <ImageContainer>
            <ImageProduct src={params.row.image} alt="" />
          </ImageContainer>
        );
      },
    },
    {
      field: "category",
      headerName: "Loại SP",
      width: 180,
    },
    {
      field: "brand",
      headerName: "Thương Hiệu",
      width: 180,
    },
    {
      field: "instock",
      headerName: "Tình Trạng",
      width: 120,
      renderCell: (params) => {
        return <div>{params.row.instock ? "còn hàng" : "hết hàng"}</div>;
      },
    },
    {
      field: "createdAt",
      headerName: "Ngày tạo",
      width: 230,
      renderCell: (params) => {
        return (
          <div>{dateFormat(params.row.createdAt, "dddd, mmmm dS, yyyy")}</div>
        );
      },
    },
    {
      field: "price",
      headerName: "Giá SP",
      width: 100,
    },
    {
      field: "sale",
      headerName: "Giá Giảm",
      width: 100,
    },
    {
      field: "action",
      headerName: "Hành động",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/san-pham/" + params.row._id}>
              <IconButton
                color="primary"
                disabled={productList.isLoadingDelete}
              >
                <EditOutlined />
              </IconButton>
            </Link>
            <IconButton
              onClick={() => handleClickOpen(params.row._id)}
              disabled={productList.isLoadingDelete}
            >
              <DeleteOutlined color="error" />
            </IconButton>
          </>
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
  const handleClickOpen = (id) => {
    setOpenDelete(true);
    setDataDelete(id);
  };

  const handleCloseDeleteAlert = () => {
    setOpenDelete(false);
    setDataDelete(null);
  };

  const handleDelete = async (id) => {
    setOpenDelete(false);
    setDataDelete(null);
    setOpenAlert(true);
    setTransition(() => TransitionLeft);
    setNotify({ isValid: false, message: "Xóa sản phẩm thành công" });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <Link to="/san-pham-moi" style={{ textDecoration: "none" }}>
        <Button variant="contained" sx={{ marginBottom: "25px" }}>
          Thêm sản phẩm mới
        </Button>
      </Link>

      <DataGridGroup>
        <DataGridTitle>Danh sách sản phẩm</DataGridTitle>
        <div style={{ height: "85vh", width: "100%" }}>
          <DataGrid
            rows={productRows}
            getRowId={(row) => row._id}
            disableSelectionOnClick
            columns={productColumns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            loading={productList.isLoading}
            pagination
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>
      </DataGridGroup>
      <Dialog
        open={openDelete}
        onClose={handleCloseDeleteAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xóa sản phẩm"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xóa sản phẩm&nbsp; "
            {productList.product.find((item) => item._id === dataDelete)?.name}
            "?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDeleteAlert}
            disabled={productList.isLoadingDelete ? true : false}
          >
            Hủy
          </Button>
          <Button
            onClick={() => handleDelete(dataDelete)}
            color="error"
            disabled={productList.isLoadingDelete ? true : false}
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openAlert}
        onClose={handleCloseAlert}
        TransitionComponent={transition}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        key={transition ? transition.name : ""}
        autoHideDuration={2000}
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

export default ProductList;
