import { DeleteOutline, EditOutlined } from "@mui/icons-material";
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
  Modal,
  Slide,
  Snackbar,
  TextField,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import dateFormat from "dateformat";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import Layout from "../../components/layout/Layout";
import { getBrand } from "../reduxSlice/brandSlice";
import {
  BrandForm,
  BrandFormButton,
  BrandFormButtonGroup,
  BrandFormInputGroup,
  DataGridGroup,
  DataGridTitle,
  ModalContainer,
  ModalContent,
  ModalForm,
  ModalFormButton,
  ModalFormButtonGroup,
  ModalHeader,
  ModalTitle,
  ModalWrapper,
} from "./BrandListStyle";
const BrandList = () => {
  const brandList = useSelector((state) => state.brand);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        await dispatch(getBrand());
      } catch (error) {}
    };
    fetchBrand();
  }, [dispatch]);
  //brand list
  const brandRows = brandList.brand.map((item) => ({
    _id: item._id,
    name: item.name,
  }));
  const brandColumns = [
    { field: "name", headerName: "Tên thương hiệu", width: 200 },
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
            <IconButton
              color="primary"
              onClick={() => handleClickOpenEditModal(params.row._id)}
            >
              <EditOutlined />
            </IconButton>
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

  const [openEdit, setOpenEdit] = useState(false);
  const [dataUpate, setDataUpate] = useState(null);
  const handleClickOpenEditModal = (id) => {
    setOpenEdit(true);
    setDataUpate(id);
  };

  const handleCloseEditModal = () => {
    setOpenEdit(false);
    setDataUpate(null);
  };

  const initialState = {
    nameBrand: brandList.brand.find((item) => item._id === dataUpate)?.name,
  };

  const initialStateNewBrand = {
    name: "",
  };

  const validationSchemaNewBrand = yup.object({
    name: yup
      .string("Điền vào tên thương hiệu")
      .required("Tên thương hiệu bắt buộc"),
  });

  const validationSchema = yup.object({
    nameBrand: yup
      .string("Điền vào tên thương hiệu")
      .required("Tên thương hiệu bắt buộc"),
  });

  const handleUpdateBrand = async (values) => {
    setOpenEdit(false);
    setDataUpate(null);
    setOpenAlert(true);
    setTransition(() => TransitionLeft);
    setNotify({
      isValid: false,
      message: "Cập nhật thương hiệu thành công",
    });
  };

  const handleCreateBrand = async ({ values, actions }) => {
    actions.resetForm();
    setOpenAlert(true);
    setTransition(() => TransitionLeft);
    setNotify({ isValid: false, message: "Thêm thương hiệu thành công" });
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

  const handleDeleteBrand = async (id) => {
    setOpenDelete(false);
    setDataDelete(null);
    setOpenAlert(true);
    setTransition(() => TransitionLeft);
    setNotify({ isValid: false, message: "Xóa thương hiệu thành công" });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <DataGridTitle>Thêm thương hiệu mới</DataGridTitle>
      <Formik
        initialValues={initialStateNewBrand}
        validationSchema={validationSchemaNewBrand}
        onSubmit={(values, actions) => {
          handleCreateBrand({ values, actions });
        }}
      >
        {(props) => (
          <BrandForm onSubmit={props.handleSubmit} autoComplete="off">
            <BrandFormInputGroup>
              <TextField
                id="name"
                name="name"
                label="Tên thương hiệu"
                size="small"
                value={props.values.name}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                error={
                  props.touched.name && Boolean(props.errors.name)
                    ? true
                    : false
                }
                helperText={props.touched.name && props.errors.name}
              />
            </BrandFormInputGroup>
            <BrandFormButtonGroup>
              <BrandFormButton
                color="primary"
                type="submit"
                variant="contained"
                disabled={brandList.isLoadingAction ? true : false}
              >
                {brandList.isLoadingAction && (
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
              </BrandFormButton>
            </BrandFormButtonGroup>
          </BrandForm>
        )}
      </Formik>
      <DataGridGroup>
        <DataGridTitle>Danh sách thương hiệu</DataGridTitle>
        <div style={{ height: "70vh", width: "100%" }}>
          <DataGrid
            rows={brandRows}
            getRowId={(row) => row._id}
            disableSelectionOnClick
            columns={brandColumns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            loading={brandList.isLoading}
            pagination
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>
      </DataGridGroup>
      <Modal
        open={openEdit}
        onClose={handleCloseEditModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContainer>
          <ModalWrapper>
            <ModalHeader>
              <ModalTitle>Cập nhật tên thương hiệu</ModalTitle>
            </ModalHeader>
            <ModalContent>
              <Formik
                initialValues={initialState}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                  handleUpdateBrand({ values, id: dataUpate });
                }}
              >
                {(props) => (
                  <ModalForm onSubmit={props.handleSubmit} autoComplete="off">
                    <TextField
                      fullWidth
                      id="nameBrand"
                      name="nameBrand"
                      label="Tên loại sản phẩm"
                      size="small"
                      value={props.values.nameBrand}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      error={
                        props.touched.nameBrand &&
                        Boolean(props.errors.nameBrand)
                          ? true
                          : false
                      }
                      autoFocus
                      helperText={
                        props.touched.nameBrand && props.errors.nameBrand
                      }
                    />

                    <ModalFormButtonGroup>
                      <ModalFormButton
                        color="primary"
                        type="button"
                        onClick={handleCloseEditModal}
                        disabled={brandList.isLoadingAction ? true : false}
                      >
                        Hủy
                      </ModalFormButton>
                      <ModalFormButton
                        color="primary"
                        type="submit"
                        disabled={brandList.isLoadingAction ? true : false}
                      >
                        Cập Nhật
                      </ModalFormButton>
                    </ModalFormButtonGroup>
                  </ModalForm>
                )}
              </Formik>
            </ModalContent>
          </ModalWrapper>
        </ModalContainer>
      </Modal>
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
        <DialogTitle id="alert-dialog-title">{"Xóa thương hiệu"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xóa thương hiệu&nbsp; "
            {brandList.brand.find((item) => item._id === dataDelete)?.name}
            "?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDeleteAlert}
            disabled={brandList.isLoadingAction ? true : false}
          >
            Hủy
          </Button>
          <Button
            onClick={() => handleDeleteBrand(dataDelete)}
            color="error"
            disabled={brandList.isLoadingAction ? true : false}
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default BrandList;
