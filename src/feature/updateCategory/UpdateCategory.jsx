import {
  Alert,
  CircularProgress,
  Skeleton,
  Slide,
  Snackbar,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import MarkdownIt from "markdown-it";
import mila from "markdown-it-link-attributes";
import markdownItVideo from "markdown-it-video";
import "prismjs/themes/prism-okaidia.css";
import React, { useEffect, useState } from "react";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import * as yup from "yup";
import Layout from "../../components/layout/Layout";
import {
  CatForm,
  CatFormButton,
  CatFormButtonGroup,
  CatFormInputGroup,
  DataGridTitle,
} from "../categorylist/CategoryListStyle";
import { getDetailCategory } from "../reduxSlice/categorySlice";
import {
  NewBrandFormInputDescItem,
  UpdateBrandLoadingContainer,
  UpdateBrandLoadingDesc,
  UpdateBrandLoadingGroup1,
  UpdateBrandLoadingItem,
} from "./UpdateCategoryStyle";

export const mdParser = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: false,
  langPrefix: "language-",
})
  .use(mila, {
    attrs: {
      target: "_blank",
      rel: "noopener noreferrer",
    },
  })
  .use(markdownItVideo, {
    youtube: { width: "100%", height: 340 },
    vimeo: { width: "100%", height: 340 },
    vine: { width: "100%", height: 340, embed: "simple" },
    prezi: { width: "100%", height: 340 },
  });

function renderHTML(text) {
  return mdParser.render(text);
}

const onImageUpload = (file) => {
  // return new Promise(async (resolve) => {
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", "vape-store");
  //   const data = await fetch(
  //     "https://api.cloudinary.com/v1_1/danh7181/image/upload",
  //     {
  //       method: "POST",
  //       body: formData,
  //     }
  //   ).then((r) => r.json());
  //   resolve(data.secure_url);
  // });
};

const UpdateCategory = () => {
  const categoryDetail = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/")[3];

  useEffect(() => {
    const fetchDetailBlog = async (id) => {
      await dispatch(getDetailCategory(id));
    };
    fetchDetailBlog(id);
  }, [dispatch, id]);

  const initialState = {
    name: categoryDetail.categoryDetail.name,
    blog: categoryDetail.categoryDetail.blog,
  };

  const validationSchema = yup.object({
    name: yup
      .string("Điền vào tên loại sản phẩm")
      .required("Tên loại sản phẩm bắt buộc"),
  });

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
  const handleUpdate = async (values) => {
    setOpenAlert(true);
    setTransition(() => TransitionLeft);
    setNotify({
      isValid: false,
      message: "Cập nhật loại sản phẩm thành công",
    });
  };

  const handleChangContent = ({ content, setFieldValue }) => {
    setFieldValue("blog", content.text);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <DataGridTitle>Cập nhật loại sản phẩm</DataGridTitle>
      {categoryDetail.isloadingDetail ? (
        <UpdateBrandLoadingContainer>
          <UpdateBrandLoadingGroup1>
            <UpdateBrandLoadingItem>
              <Skeleton animation="wave" variant="text" />
            </UpdateBrandLoadingItem>
          </UpdateBrandLoadingGroup1>
          <UpdateBrandLoadingDesc>
            <Skeleton animation="wave" variant="rectangular" />
          </UpdateBrandLoadingDesc>
        </UpdateBrandLoadingContainer>
      ) : (
        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            handleUpdate({ values, actions });
          }}
        >
          {(props) => (
            <CatForm onSubmit={props.handleSubmit} autoComplete="off">
              <CatFormInputGroup>
                <TextField
                  id="name"
                  name="name"
                  label="Tên loại sản phẩm"
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
              </CatFormInputGroup>
              <NewBrandFormInputDescItem>
                <MdEditor
                  className={"blog-content"}
                  value={props.values.blog}
                  placeholder="Nội dung"
                  onChange={(content) =>
                    handleChangContent({
                      content,
                      setFieldValue: props.setFieldValue,
                    })
                  }
                  renderHTML={renderHTML}
                  onImageUpload={onImageUpload}
                />
              </NewBrandFormInputDescItem>
              <CatFormButtonGroup>
                <CatFormButton
                  color="primary"
                  type="submit"
                  variant="contained"
                  disabled={categoryDetail.isLoadingAction ? true : false}
                >
                  {categoryDetail.isLoadingAction && (
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
                </CatFormButton>
              </CatFormButtonGroup>
            </CatForm>
          )}
        </Formik>
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

export default UpdateCategory;
