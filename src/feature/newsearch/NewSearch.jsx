import {
  Alert,
  Button,
  CircularProgress,
  Slide,
  Snackbar,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as yup from "yup";
import Layout from "../../components/layout/Layout";
import {
  DataGridTitle,
  NewSearchForm,
  NewSearchFormButton,
  NewSearchFormButtonGroup,
  NewSearchFormInputGroup,
  NewSearchInputItem,
  NewSearchNameBtnGroup,
  NewSearchNameGroup,
  NewSearchNameInputGroup,
} from "./NewSearchStyle";

const NewSearch = () => {
  const searchList = useSelector((state) => state.listSearch);

  const [listSearch, setListSearch] = useState([{ name: "" }]);

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

  const initialStateNewListSearch = {
    nameSearch: "",
  };

  const validationSchemaNewListSearch = yup.object({
    nameSearch: yup
      .string("Điền vào tên danh mục tìm kiếm")
      .required("Tên danh mục tìm kiếm bắt buộc"),
  });

  const [listSearchErr, setListSearchErr] = useState([
    {
      isError: false,
      message: "",
    },
  ]);

  const handleFieldAdd = () => {
    setListSearch([...listSearch, { name: "" }]);

    setListSearchErr([
      ...listSearchErr,
      {
        isError: false,
        message: "",
      },
    ]);
  };

  const handleRemoveField = (index) => {
    const list = [...listSearch];
    const listCatErr = [...listSearchErr];

    list.splice(index, 1);
    setListSearch(list);

    listCatErr.splice(index, 1);
    setListSearchErr(listSearchErr);
  };

  const handleBlur = ({ index }) => {
    if (listSearch[index].name !== "") {
      const listCatErr = [...listSearchErr];
      listCatErr[index] = {
        isError: false,
        message: "",
      };
      setListSearchErr(listCatErr);
    } else if (listSearch[index].name === "") {
      const listCatErr = [...listSearchErr];
      listCatErr[index] = {
        isError: true,
        message: "Tên tìm kiếm bắt buộc",
      };
      setListSearchErr(listCatErr);
    }
  };

  const handleListSearchChange = ({ e, index }) => {
    const list = [...listSearch];
    const { value } = e.target;
    list[index].name = value;
    setListSearch(list);
  };

  const handleCreateSearch = async ({ values, actions }) => {
    const listSearchNull = listSearch.every((item) => item.name !== "");
    if (listSearchNull === false) {
      const listCatErr = [...listSearchErr];
      const listCatNull = [];
      for (const index in listSearch) {
        if (!listSearch[index].name) listCatNull.push(Number(index));
      }
      listCatNull.map(
        (item) =>
          (listCatErr[item] = {
            isError: true,
            message: "Tên tìm kiếm bắt buộc",
          })
      );
      setListSearchErr(listCatErr);
    }
    if (listSearchNull === true) {
      actions.resetForm();
      setOpenAlert(true);
      setListSearch([{ name: "" }]);
      setListSearchErr([
        {
          isError: false,
          message: "",
        },
      ]);
      setTransition(() => TransitionLeft);
      setNotify({
        isValid: false,
        message: "Thêm danh mục tìm kiếm thành công",
      });
    }
  };

  return (
    <Layout>
      <DataGridTitle>Thêm danh mục</DataGridTitle>
      <Formik
        initialValues={initialStateNewListSearch}
        validationSchema={validationSchemaNewListSearch}
        onSubmit={(values, actions) => {
          handleCreateSearch({ values, actions });
        }}
      >
        {(props) => (
          <NewSearchForm onSubmit={props.handleSubmit} autoComplete="off">
            <NewSearchFormInputGroup>
              <NewSearchInputItem>
                <TextField
                  fullWidth
                  id="nameSearch"
                  name="nameSearch"
                  label="Tên danh mục"
                  size="small"
                  type="text"
                  value={props.values.nameSearch}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  error={
                    props.touched.nameSearch && Boolean(props.errors.nameSearch)
                      ? true
                      : false
                  }
                  helperText={
                    props.touched.nameSearch && props.errors.nameSearch
                  }
                />
              </NewSearchInputItem>
            </NewSearchFormInputGroup>
            {listSearch.map((item, index) => (
              <NewSearchNameGroup key={index}>
                <NewSearchNameInputGroup>
                  <NewSearchInputItem>
                    <TextField
                      fullWidth
                      type="text"
                      label="Tên tìm kiếm"
                      size="small"
                      value={item.name}
                      onChange={(e) =>
                        handleListSearchChange({
                          e: e,
                          index,
                        })
                      }
                      onBlur={() => handleBlur({ index })}
                      error={listSearchErr[index].isError}
                      helperText={listSearchErr[index].message}
                    />
                  </NewSearchInputItem>
                  <NewSearchNameBtnGroup>
                    {listSearch.length !== 1 && (
                      <Button
                        type="button"
                        onClick={() => handleRemoveField(index)}
                        variant="outlined"
                        color="error"
                        size="small"
                        style={{ marginRight: "10px" }}
                      >
                        <span>Xóa</span>
                      </Button>
                    )}
                    {listSearch.length - 1 === index && (
                      <Button
                        type="button"
                        onClick={handleFieldAdd}
                        variant="outlined"
                        color="info"
                        size="small"
                      >
                        <span>Thêm</span>
                      </Button>
                    )}
                  </NewSearchNameBtnGroup>
                </NewSearchNameInputGroup>
              </NewSearchNameGroup>
            ))}
            <NewSearchFormButtonGroup>
              <NewSearchFormButton
                color="primary"
                type="submit"
                variant="contained"
                disabled={searchList.isLoadingAction ? true : false}
              >
                {searchList.isLoadingAction && (
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
                Thêm danh mục
              </NewSearchFormButton>
            </NewSearchFormButtonGroup>
          </NewSearchForm>
        )}
      </Formik>
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

export default NewSearch;
