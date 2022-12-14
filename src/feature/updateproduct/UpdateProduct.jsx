import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { CloseOutlined } from "@mui/icons-material";
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Slide,
  Snackbar,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import * as yup from "yup";
import Layout from "../../components/layout/Layout";
import { getBrand } from "../reduxSlice/brandSlice";
import { getCategory } from "../reduxSlice/categorySlice";
import { getListSearch } from "../reduxSlice/listSearchSlice";
import { getProductDetail } from "../reduxSlice/productSlice";
import {
  UpdateProductButtonGroup,
  UpdateProductContainer,
  UpdateProductDescItem,
  UpdateProductDropzoneButton,
  UpdateProductDropzoneImage,
  UpdateProductDropzoneImageContainer,
  UpdateProductForm,
  UpdateProductImageBtnGroup,
  UpdateProductImageContainer,
  UpdateProductImageGroup,
  UpdateProductImageInputGroup,
  UpdateProductInputGroup,
  UpdateProductInputItem,
  UpdateProductLoadingContainer,
  UpdateProductLoadingDesc,
  UpdateProductLoadingGroup1,
  UpdateProductLoadingGroup2,
  UpdateProductLoadingImage,
  UpdateProductLoadingItem,
  UpdateProductLoadingItem2,
  UpdateProductTitle,
} from "./UpdateProductStyle";

const UpdateProduct = () => {
  const productList = useSelector((state) => state.product);
  const categoryList = useSelector((state) => state.category);
  const brandList = useSelector((state) => state.brand);
  const searchList = useSelector((state) => state.listSearch);
  const dispatch = useDispatch();
  const location = useLocation();

  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchProductDetail = async (id) => {
      const res = await dispatch(getProductDetail(id));
      setListImage(res.payload.image);
      setCategory(res.payload.category._id);
      setBrand(res.payload.brand._id);
      setInstock(res.payload.instock);
      setTags(res.payload.tags);
      setListImgErr(
        Array(res.payload.image.length)
          .fill(0)
          .map((item) => ({
            name: {
              isError: false,
              message: "",
            },
            image: {
              isError: false,
              message: "",
            },
          }))
      );
    };
    fetchProductDetail(id);
  }, [dispatch, id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(getCategory()),
          dispatch(getBrand()),
          dispatch(getListSearch()),
        ]);
      } catch (error) {}
    };
    fetchData();
  }, [dispatch]);

  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [tags, setTags] = useState([]);
  const [instock, setInstock] = useState(true);
  const [listImage, setListImage] = useState([
    {
      name: "",
      instock: true,
      image: null,
    },
  ]);

  const [listImgErr, setListImgErr] = useState([
    {
      name: {
        isError: false,
        message: "",
      },
      image: {
        isError: false,
        message: "",
      },
    },
  ]);

  const initialState = {
    name: productList.productDetail.name,
    capacity: productList.productDetail.capacity,
    nicotine: productList.productDetail.nicotine,
    price: productList.productDetail.price,
    sale: productList.productDetail.sale,
    battery: productList.productDetail.battery,
    puffs: productList.productDetail.puffs,
    desc: productList.productDetail.desc,
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

  const [errorInput, setErrorInput] = useState({
    brandErr: {
      isError: false,
      message: "",
    },
    categoryErr: {
      isError: false,
      message: "",
    },
  });

  const handleBlur = ({ name, index }) => {
    switch (name) {
      case "category":
        if (category !== "") {
          setErrorInput((prev) => ({
            ...prev,
            categoryErr: { isError: false, message: "" },
          }));
        } else {
          setErrorInput((prev) => ({
            ...prev,
            categoryErr: {
              isError: true,
              message: "Lo???i s???n ph???m b???t bu???c!",
            },
          }));
        }
        break;

      case "brand":
        if (brand !== "") {
          setErrorInput((prev) => ({
            ...prev,
            brandErr: { isError: false, message: "" },
          }));
        } else {
          setErrorInput((prev) => ({
            ...prev,
            brandErr: { isError: true, message: "Th????ng hi???u b???t bu???c!" },
          }));
        }
        break;

      case "listImageInput":
        if (listImage[index]["name"] !== "") {
          const listImageErr = [...listImgErr];
          listImageErr[index]["name"] = {
            isError: false,
            message: "",
          };
          setListImgErr(listImageErr);
        } else if (listImage[index]["name"] === "") {
          const listImageErr = [...listImgErr];
          listImageErr[index]["name"] = {
            isError: true,
            message: "M??u ho???c v??? b???t bu???c!",
          };
          setListImgErr(listImageErr);
        }
        break;

      case "listImageImg":
        if (listImage[index]["image"] !== null) {
          const listImageErr = [...listImgErr];
          listImageErr[index]["image"] = {
            isError: false,
            message: "",
          };
          setListImgErr(listImageErr);
        } else if (listImage[index]["image"] === null) {
          const listImageErr = [...listImgErr];
          listImageErr[index]["image"] = {
            isError: true,
            message: "???nh s???n ph???m b???t bu???c!",
          };
          setListImgErr(listImageErr);
        }
        break;
      default:
        break;
    }
  };

  // const handleFocus = ({ name, index }) => {
  //   switch (name) {
  //     case "category":
  //       setErrorInput((prev) => ({
  //         ...prev,
  //         categoryErr: { isError: false, message: "" },
  //       }));
  //       break;
  //     case "brand":
  //       setErrorInput((prev) => ({
  //         ...prev,
  //         brandErr: { isError: false, message: "" },
  //       }));
  //       break;
  //     case "listImageInput":
  //       const listImageErr = [...listImgErr];
  //       listImageErr[index]["name"] = {
  //         isError: false,
  //         message: "",
  //       };
  //       setListImgErr(listImageErr);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const handleFieldAdd = () => {
    setListImage([
      ...listImage,
      {
        name: "",
        instock: true,
        image: null,
      },
    ]);

    setListImgErr([
      ...listImgErr,
      {
        name: {
          isError: false,
          message: "",
        },
        image: {
          isError: false,
          message: "",
        },
      },
    ]);
  };

  const handleRemoveField = (index) => {
    const list = [...listImage];
    const listImageErr = [...listImgErr];

    list.splice(index, 1);
    setListImage(list);

    listImageErr.splice(index, 1);
    setListImgErr(listImageErr);
  };

  const handleListImageChange = ({ name, e, valueImage, index }) => {
    const list = [...listImage];
    if (e && name) {
      const { value } = e.target;
      setListImage(
        list.map((item, i) => (index === i ? { ...item, [name]: value } : item))
      );
    } else if (valueImage) {
      const files = valueImage[0];
      setListImage(
        list.map((item, i) => (index === i ? { ...item, image: files } : item))
      );
    }
  };

  const handleDeleteImgItem = (index) => {
    const list = [...listImage];
    setListImage(
      list.map((item, i) => (index === i ? { ...item, image: null } : item))
    );
    if (typeof list[index]["image"] === "object") {
      list[index]["image"] = null;
      URL.revokeObjectURL(listImage[index]["image"]);
    }
  };

  const handleChangDesc = ({ event, editor, setFieldValue }) => {
    setFieldValue("desc", editor.getData());
  };

  const handleUpdateProduct = async ({ values, actions }) => {
    const listImageNull = listImage.every(
      (item) => item.name !== "" && item.image !== null
    );
    if (category === "") {
      setErrorInput((prev) => ({
        ...prev,
        categoryErr: { isError: true, message: "Lo???i s???n ph???m b???t bu???c!" },
      }));
    }
    if (brand === "") {
      setErrorInput((prev) => ({
        ...prev,
        brandErr: { isError: true, message: "Th????ng hi???u b???t bu???c!" },
      }));
    }
    if (listImageNull === false) {
      const listImageErr = [...listImgErr];
      const listIndexName = [];
      const listIndexImage = [];
      for (const index in listImage) {
        if (!listImage[index].name) listIndexName.push(Number(index));
      }
      for (const index in listImage) {
        if (!listImage[index].image) listIndexImage.push(Number(index));
      }
      listIndexName.map(
        (item) =>
          (listImageErr[item]["name"] = {
            isError: true,
            message: "M??u ho???c v??? b???t bu???c!",
          })
      );
      listIndexImage.map(
        (item) =>
          (listImageErr[item]["image"] = {
            isError: true,
            message: "???nh s???n ph???m b???t bu???c!",
          })
      );
      setListImgErr(listImageErr);
    }
    if (category !== "" && brand !== "" && listImageNull === true) {
      window.scrollTo(0, 0);
      setOpenAlert(true);
      setTransition(() => TransitionLeft);
      setNotify({
        isValid: false,
        message: "C???p nh???t s???n ph???m th??nh c??ng",
      });
    }
  };

  const categorySelected = categoryList?.category.find(
    (item) => item._id === category
  )?.slug;

  const validationSchema = yup.object({
    name: yup
      .string("??i???n v??o t??n s???n ph???m")
      .required("T??n s???n ph???m b???t bu???c!"),
    price: yup.number("Gi?? ti???n ki???u s???!").required("Gi?? ti???n b???t bu???c!"),
    sale: yup.number("Gi?? gi???m ti???n ki???u s???!").required("Gi?? gi???m b???t bu???c!"),

    capacity:
      categorySelected === "freebase" || categorySelected === "saltnic"
        ? yup.string("??i???n v??o dung t??ch").required("Dung t??ch b???t bu???c!")
        : "",
    nicotine:
      categorySelected === "freebase" ||
      categorySelected === "saltnic" ||
      categorySelected === "disposable-pod"
        ? yup.string("??i???n v??o nicotine").required("Nicotine b???t bu???c!")
        : "",
    battery:
      categorySelected === "disposable-pod"
        ? yup
            .string("??i???n v??o dung l?????ng pin")
            .required("Dung l?????ng pin b???t bu???c!")
        : "",
    puffs:
      categorySelected === "disposable-pod"
        ? yup.string("??i???n v??o s??? h??i").required("S??? h??i b???t bu???c!")
        : "",
    desc: "",
  });

  const handleChangeTags = (event) => {
    const { value } = event.target;
    setTags(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={productList.isLoadingCreate ? true : false}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <UpdateProductContainer>
        <UpdateProductTitle>C???P NH???T S???N PH???M</UpdateProductTitle>
        {productList.isLoadingProductDetail === true ? (
          <UpdateProductLoadingContainer>
            <UpdateProductLoadingGroup1>
              <UpdateProductLoadingItem>
                <Skeleton animation="wave" variant="text" />
              </UpdateProductLoadingItem>
              <UpdateProductLoadingItem>
                <Skeleton animation="wave" variant="text" />
              </UpdateProductLoadingItem>
              <UpdateProductLoadingItem>
                <Skeleton animation="wave" variant="text" />
              </UpdateProductLoadingItem>
              <UpdateProductLoadingItem>
                <Skeleton animation="wave" variant="text" />
              </UpdateProductLoadingItem>
              <UpdateProductLoadingItem>
                <Skeleton animation="wave" variant="text" />
              </UpdateProductLoadingItem>
            </UpdateProductLoadingGroup1>
            <UpdateProductLoadingDesc>
              <Skeleton animation="wave" variant="rectangular" />
            </UpdateProductLoadingDesc>
            <UpdateProductLoadingGroup2>
              <div>
                <UpdateProductLoadingItem2>
                  <Skeleton animation="wave" variant="text" />
                </UpdateProductLoadingItem2>
                <UpdateProductLoadingItem2>
                  <Skeleton animation="wave" variant="text" />
                </UpdateProductLoadingItem2>
              </div>
              <div>
                <UpdateProductLoadingImage>
                  <Skeleton animation="wave" variant="text" />
                </UpdateProductLoadingImage>
              </div>
            </UpdateProductLoadingGroup2>
          </UpdateProductLoadingContainer>
        ) : (
          <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              handleUpdateProduct({ values, actions });
            }}
          >
            {(props) => (
              <UpdateProductForm
                onSubmit={props.handleSubmit}
                autoComplete="off"
              >
                <UpdateProductInputGroup>
                  <UpdateProductInputItem>
                    <FormControl
                      size="small"
                      fullWidth
                      error={errorInput.categoryErr.isError ? true : false}
                    >
                      <InputLabel id="category-label">Lo???i s???n ph???m</InputLabel>
                      <Select
                        labelId="category-label"
                        id="category-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        // onFocus={() => handleFocus({ name: "category" })}
                        onBlur={() => handleBlur({ name: "category" })}
                        label="Lo???i s???n ph???m"
                        defaultValue={category}
                      >
                        {categoryList.category.map((item, index) => (
                          <MenuItem value={item._id} key={index}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {errorInput.categoryErr.message}
                      </FormHelperText>
                    </FormControl>
                  </UpdateProductInputItem>
                  <UpdateProductInputItem>
                    <FormControl
                      size="small"
                      fullWidth
                      error={errorInput.brandErr.isError ? true : false}
                    >
                      <InputLabel id="brand-label">Th????ng hi???u</InputLabel>
                      <Select
                        labelId="brand-label"
                        id="brand-select"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        // onFocus={() => handleFocus({ name: "brand" })}
                        onBlur={() => handleBlur({ name: "brand" })}
                        label="Th????ng hi???u"
                      >
                        {brandList.brand.map((item, index) => (
                          <MenuItem value={item._id} key={index}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {errorInput.brandErr.message}
                      </FormHelperText>
                    </FormControl>
                  </UpdateProductInputItem>
                  <UpdateProductInputItem>
                    <FormControl size="small" fullWidth>
                      <InputLabel id="inStock-label">T??nh tr???ng</InputLabel>
                      <Select
                        labelId="inStock-label"
                        id="inStock-select"
                        value={instock}
                        onChange={(e) => setInstock(e.target.value)}
                        label="T??nh tr???ng"
                        defaultValue={true}
                      >
                        <MenuItem value={true}>C??n h??ng</MenuItem>
                        <MenuItem value={false}>H???t h??ng</MenuItem>
                      </Select>
                    </FormControl>
                  </UpdateProductInputItem>
                  <UpdateProductInputItem>
                    <TextField
                      size="small"
                      fullWidth
                      id="name"
                      name="name"
                      label="T??n s???n ph???m"
                      type="text"
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
                  </UpdateProductInputItem>
                  <UpdateProductInputItem>
                    <TextField
                      size="small"
                      fullWidth
                      id="price"
                      name="price"
                      label="Gi??"
                      value={props.values.price}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      type="number"
                      error={
                        props.touched.price && Boolean(props.errors.price)
                          ? true
                          : false
                      }
                      helperText={props.touched.price && props.errors.price}
                    />
                  </UpdateProductInputItem>
                  <UpdateProductInputItem>
                    <TextField
                      size="small"
                      fullWidth
                      id="sale"
                      name="sale"
                      label="Gi?? gi???m"
                      value={props.values.sale}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      type="number"
                      error={
                        props.touched.sale && Boolean(props.errors.sale)
                          ? true
                          : false
                      }
                      helperText={props.touched.sale && props.errors.sale}
                    />
                  </UpdateProductInputItem>

                  {(categorySelected === "freebase" ||
                    categorySelected === "saltnic") && (
                    <UpdateProductInputItem>
                      <TextField
                        size="small"
                        fullWidth
                        id="capacity"
                        name="capacity"
                        label="Dung t??ch"
                        type="text"
                        value={props.values.capacity}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        error={
                          props.touched.capacity &&
                          Boolean(props.errors.capacity)
                            ? true
                            : false
                        }
                        helperText={
                          props.touched.capacity && props.errors.capacity
                        }
                      />
                    </UpdateProductInputItem>
                  )}

                  {categorySelected === "disposable-pod" && (
                    <>
                      <UpdateProductInputItem>
                        <TextField
                          size="small"
                          fullWidth
                          id="battery"
                          name="battery"
                          label="Dung l?????ng pin"
                          type="text"
                          value={props.values.battery}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          error={
                            props.touched.battery &&
                            Boolean(props.errors.battery)
                              ? true
                              : false
                          }
                          helperText={
                            props.touched.battery && props.errors.battery
                          }
                        />
                      </UpdateProductInputItem>
                      <UpdateProductInputItem>
                        <TextField
                          size="small"
                          fullWidth
                          id="puffs"
                          name="puffs"
                          label="S??? h??i"
                          type="text"
                          value={props.values.puffs}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          error={
                            props.touched.puffs && Boolean(props.errors.puffs)
                              ? true
                              : false
                          }
                          helperText={props.touched.puffs && props.errors.puffs}
                        />
                      </UpdateProductInputItem>
                    </>
                  )}

                  {(categorySelected === "freebase" ||
                    categorySelected === "saltnic" ||
                    categorySelected === "disposable-pod") && (
                    <UpdateProductInputItem>
                      <TextField
                        size="small"
                        fullWidth
                        id="nicotine"
                        name="nicotine"
                        label="Nicotine"
                        type="text"
                        value={props.values.nicotine}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        error={
                          props.touched.nicotine &&
                          Boolean(props.errors.nicotine)
                            ? true
                            : false
                        }
                        helperText={
                          props.touched.nicotine && props.errors.nicotine
                        }
                      />
                    </UpdateProductInputItem>
                  )}
                </UpdateProductInputGroup>
                <UpdateProductInputItem>
                  <FormControl size="small" fullWidth>
                    <InputLabel id="tag-label">Th??? tag</InputLabel>
                    <Select
                      labelId="tag-label"
                      id="tag-select"
                      multiple
                      value={tags}
                      onChange={(e) => handleChangeTags(e)}
                      label="Th??? tag"
                    >
                      {searchList.listSearch.map((item, index) =>
                        item.listSearch.map((item1, index1) => (
                          <MenuItem value={item1._id} key={index1}>
                            {item1.name}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  </FormControl>
                </UpdateProductInputItem>
                <UpdateProductDescItem
                  className={`${
                    productList.isLoadingProductDetail ? "loading-page" : ""
                  }`}
                >
                  <CKEditor
                    id="desc"
                    name="desc"
                    editor={ClassicEditor}
                    data={props.values.desc}
                    config={{
                      removePlugins: [
                        "EasyImage",
                        "ImageUpload",
                        "MediaEmbed",
                        "Table",
                      ],
                      placeholder: "M?? t??? s???n ph???m",
                    }}
                    onChange={(event, editor) =>
                      handleChangDesc({
                        event,
                        editor,
                        setFieldValue: props.setFieldValue,
                      })
                    }
                  />
                </UpdateProductDescItem>

                {listImage.map((item, index) => (
                  <UpdateProductImageGroup
                    key={index}
                    className={`${
                      productList.isLoadingProductDetail ? "loading-page" : ""
                    }`}
                  >
                    <UpdateProductImageInputGroup>
                      <UpdateProductInputItem className="input-1">
                        <TextField
                          size="small"
                          fullWidth
                          label="M??u ho???c V???"
                          value={item.name}
                          type="text"
                          onChange={(e) =>
                            handleListImageChange({
                              name: "name",
                              e: e,
                              index,
                            })
                          }
                          onBlur={() =>
                            handleBlur({ name: "listImageInput", index })
                          }
                          // onFocus={() =>
                          //   handleFocus({ name: "listImageInput", index })
                          // }
                          error={
                            listImgErr[index]?.name?.isError ? true : false
                          }
                          helperText={listImgErr[index]?.name?.message}
                        />
                      </UpdateProductInputItem>
                      <UpdateProductInputItem>
                        <FormControl size="small" fullWidth>
                          <InputLabel id="inStockImg-label">
                            T??nh tr???ng h??nh
                          </InputLabel>
                          <Select
                            labelId="inStockImg-label"
                            id="inStockImg-select"
                            value={item.instock}
                            onChange={(e) =>
                              handleListImageChange({
                                name: "instock",
                                e: e,
                                index,
                              })
                            }
                            label="T??nh tr???ng h??nh"
                            defaultValue={true}
                          >
                            <MenuItem value={true}>C??n h??ng</MenuItem>
                            <MenuItem value={false}>H???t h??ng</MenuItem>
                          </Select>
                        </FormControl>
                      </UpdateProductInputItem>

                      <UpdateProductImageBtnGroup>
                        {listImage.length !== 1 && (
                          <Button
                            type="button"
                            onClick={() => handleRemoveField(index)}
                            variant="outlined"
                            color="error"
                            size="small"
                            style={{ marginRight: "10px" }}
                          >
                            <span>X??a ???nh</span>
                          </Button>
                        )}
                        {listImage.length - 1 === index && (
                          <Button
                            type="button"
                            onClick={handleFieldAdd}
                            variant="outlined"
                            color="info"
                            size="small"
                          >
                            <span>Th??m ???nh</span>
                          </Button>
                        )}
                      </UpdateProductImageBtnGroup>
                    </UpdateProductImageInputGroup>

                    <Dropzone
                      onDrop={(acceptedFiles) =>
                        handleListImageChange({
                          valueImage: acceptedFiles,
                          index,
                        })
                      }
                      multiple={false}
                      accept="image/jpeg,image/png"
                    >
                      {({ getRootProps, getInputProps }) => (
                        <UpdateProductImageContainer
                          className={`${item?.image !== null && "image"} 
                              ${listImgErr[index]?.image?.isError && "error"}
                              `}
                          {...getRootProps()}
                        >
                          <input {...getInputProps()} />
                          <p
                            style={{
                              fontSize: "13px",
                              textAlign: "center",
                            }}
                          >
                            Nh???p v??o ????? ch???n ???nh
                          </p>
                          {item.image !== null && (
                            <UpdateProductDropzoneImageContainer>
                              <UpdateProductDropzoneImage
                                src={
                                  typeof item?.image === "object"
                                    ? URL.createObjectURL(item?.image)
                                    : item?.image
                                }
                                alt="image"
                              />
                              <UpdateProductDropzoneButton
                                onClick={() => handleDeleteImgItem(index)}
                              >
                                <CloseOutlined sx={{ fontSize: "15px" }} />
                              </UpdateProductDropzoneButton>
                            </UpdateProductDropzoneImageContainer>
                          )}
                        </UpdateProductImageContainer>
                      )}
                    </Dropzone>
                  </UpdateProductImageGroup>
                ))}

                <UpdateProductButtonGroup>
                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    type="submit"
                    disabled={productList.isLoadingCreate ? true : false}
                  >
                    {productList.isLoadingCreate && (
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
                    C???p nh???t s???n ph???m
                  </Button>
                </UpdateProductButtonGroup>
              </UpdateProductForm>
            )}
          </Formik>
        )}
      </UpdateProductContainer>
    </Layout>
  );
};

export default UpdateProduct;
