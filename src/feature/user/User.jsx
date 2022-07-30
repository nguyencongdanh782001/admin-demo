import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Skeleton,
  Slide,
  Snackbar,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import Layout from "../../components/layout/Layout";
import { checkPasswordUser, getDetailUser } from "../reduxSlice/userSlice";
import {
  UserButtonGroup,
  UserContainer,
  UserForm,
  UserFormTitle,
  UserInputItem,
  UserInputItemGroup,
  UserLoadingContainer,
  UserLoadingInputItem,
  UserLoadingInputItemGroup,
  UserLoadingTitle,
  UserTitle,
} from "./UserStyle";

const User = () => {
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      await dispatch(getDetailUser(currentUser.currentUser._id));
    };
    getCurrentUser();
  }, [dispatch, currentUser.currentUser._id]);

  const initialStateUpdateUser = {
    username: currentUser.userDetail.username,
  };
  const validationSchemaUpdateUser = yup.object({
    username: yup
      .string("Điền vào tên tài khoản")
      .required("Tên tài khoản bắt buộc"),
  });

  const initialStateCheckPassword = {
    oldPassword: "",
  };
  const validationSchemaCheckPassword = yup.object({
    oldPassword: yup.string("Điền vào mật khẩu").required("Mật khẩu bắt buộc"),
  });

  const initialStateUpdatePassword = {
    password: "",
  };
  const validationSchemaUpdatePassword = yup.object({
    password: yup
      .string("Điền vào mật khẩu mới")
      .min(6, "Mật khẩu ít nhất 6 ký tự")
      .required("Mật khẩu bắt buộc"),
  });

  const handleUpdateUserInfor = async ({ values, actions }) => {
    setOpenAlert(true);
    setTransition(() => TransitionLeft);
    setNotify({
      isValid: false,
      message: "Sửa tên người dùng thành công",
    });
  };

  const handleUpdatePassword = async ({ values, actions }) => {
    actions.resetForm();
    setOpenAlert(true);
    setTransition(() => TransitionLeft);
    setNotify({
      isValid: false,
      message: "Thay đổi mật khẩu thành công",
    });
  };

  const handleCheckPassword = async ({ values, actions }) => {
    try {
      const res = await dispatch(checkPasswordUser(values));
      if (res.meta.requestStatus === "fulfilled") {
        actions.resetForm();
        setOpenAlert(true);
        setTransition(() => TransitionLeft);
        setNotify({ isValid: false, message: "Xác nhận mật khẩu thành công" });
      } else if (res.meta.requestStatus === "rejected") {
        setOpenAlert(true);
        setTransition(() => TransitionLeft);
        setNotify({ isValid: true, message: res.payload });
      }
    } catch (error) {}
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
      <UserContainer>
        <UserTitle>THAY ĐỔI THÔNG TIN NGƯỜI DÙNG</UserTitle>
        {currentUser.isLoadingUserDetail ? (
          <>
            <UserLoadingContainer>
              <UserLoadingTitle>Thay đổi tên người dùng</UserLoadingTitle>
              <UserLoadingInputItemGroup>
                <UserLoadingInputItem>
                  <Skeleton variant="text" animation="wave" />
                </UserLoadingInputItem>
              </UserLoadingInputItemGroup>
            </UserLoadingContainer>
            <UserLoadingContainer>
              <UserLoadingTitle>Thay đổi mật khẩu</UserLoadingTitle>
              <UserLoadingInputItemGroup>
                <UserLoadingInputItem>
                  <Skeleton variant="text" animation="wave" />
                </UserLoadingInputItem>
              </UserLoadingInputItemGroup>
            </UserLoadingContainer>
          </>
        ) : (
          <>
            <Formik
              initialValues={initialStateUpdateUser}
              validationSchema={validationSchemaUpdateUser}
              onSubmit={(values, actions) => {
                handleUpdateUserInfor({ values, actions });
              }}
            >
              {(props) => (
                <UserForm onSubmit={props.handleSubmit} autoComplete="off">
                  <UserFormTitle>Thay đổi tên người dùng</UserFormTitle>
                  <UserInputItemGroup>
                    <UserInputItem>
                      <TextField
                        size="small"
                        fullWidth
                        id="username"
                        name="username"
                        label="Tên người dùng"
                        type="text"
                        value={props.values.username}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        error={
                          props.touched.username &&
                          Boolean(props.errors.username)
                            ? true
                            : false
                        }
                        helperText={
                          props.touched.username && props.errors.username
                        }
                      />
                    </UserInputItem>
                    <UserButtonGroup>
                      <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        type="submit"
                        disabled={
                          currentUser.isLoadingUserUpdate ||
                          currentUser.isLoadingCheckPassword
                            ? true
                            : false
                        }
                      >
                        {currentUser.isLoadingUserUpdate && (
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
                        Sửa
                      </Button>
                    </UserButtonGroup>
                  </UserInputItemGroup>
                </UserForm>
              )}
            </Formik>

            {!currentUser.isPasswordTrue && (
              <Formik
                initialValues={initialStateCheckPassword}
                validationSchema={validationSchemaCheckPassword}
                onSubmit={(values, actions) => {
                  handleCheckPassword({ values, actions });
                }}
              >
                {(props) => (
                  <UserForm onSubmit={props.handleSubmit} autoComplete="off">
                    <UserFormTitle>Thay đổi mật khẩu</UserFormTitle>
                    <UserInputItemGroup>
                      <UserInputItem>
                        <TextField
                          fullWidth
                          id="oldPassword"
                          name="oldPassword"
                          label="Mật khẩu hiện tại"
                          size="small"
                          type={showCurrentPassword ? "text" : "password"}
                          value={props.values.oldPassword}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          error={
                            props.touched.oldPassword &&
                            Boolean(props.errors.oldPassword)
                          }
                          helperText={
                            props.touched.oldPassword &&
                            props.errors.oldPassword
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment
                                position="end"
                                sx={{ position: "absolute", right: "6px" }}
                              >
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    setShowCurrentPassword((prev) => !prev);
                                  }}
                                >
                                  {showCurrentPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </UserInputItem>
                      <UserButtonGroup>
                        <Button
                          variant="contained"
                          color="primary"
                          size="medium"
                          type="submit"
                          disabled={
                            currentUser.isLoadingUserUpdate ||
                            currentUser.isLoadingCheckPassword
                              ? true
                              : false
                          }
                        >
                          {currentUser.isLoadingCheckPassword && (
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
                          Gửi
                        </Button>
                      </UserButtonGroup>
                    </UserInputItemGroup>
                  </UserForm>
                )}
              </Formik>
            )}

            {currentUser.isPasswordTrue && (
              <Formik
                initialValues={initialStateUpdatePassword}
                validationSchema={validationSchemaUpdatePassword}
                onSubmit={(values, actions) => {
                  handleUpdatePassword({ values, actions });
                }}
              >
                {(props) => (
                  <UserForm onSubmit={props.handleSubmit} autoComplete="off">
                    <UserFormTitle>Thay đổi mật khẩu</UserFormTitle>
                    <UserInputItemGroup>
                      <UserInputItem>
                        <TextField
                          fullWidth
                          id="password"
                          name="password"
                          label="Mật khẩu mới"
                          size="small"
                          type={showNewPassword ? "text" : "password"}
                          value={props.values.password}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          error={
                            props.touched.password &&
                            Boolean(props.errors.password)
                          }
                          helperText={
                            props.touched.password && props.errors.password
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment
                                position="end"
                                sx={{ position: "absolute", right: "6px" }}
                              >
                                <IconButton
                                  size="small"
                                  onClick={() => {
                                    setShowNewPassword((prev) => !prev);
                                  }}
                                >
                                  {showNewPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </UserInputItem>
                      <UserButtonGroup>
                        <Button
                          variant="contained"
                          color="primary"
                          size="medium"
                          type="submit"
                          disabled={
                            currentUser.isLoadingUserUpdate ||
                            currentUser.isLoadingCheckPassword
                              ? true
                              : false
                          }
                        >
                          {currentUser.isLoadingUserUpdate && (
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
                          Sửa
                        </Button>
                      </UserButtonGroup>
                    </UserInputItemGroup>
                  </UserForm>
                )}
              </Formik>
            )}
          </>
        )}
      </UserContainer>
    </Layout>
  );
};

export default User;
