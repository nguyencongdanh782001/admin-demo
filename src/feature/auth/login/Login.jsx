import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { ADMIN } from "../../../assets/global/global_asset";
import { signIn } from "../../reduxSlice/authSlice";
import {
  LoginButton,
  LoginContainer,
  LoginError,
  LoginErrorMessage,
  LoginFiledGroup,
  LoginForm,
  LoginImage,
  LoginImageItem,
  LoginTitle,
  LoginWrapper,
} from "./LoginStyle";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((state) => state.auth);

  const initialState = {
    username: "admin",
    password: "123456",
  };
  const validationSchema = yup.object({
    username: yup
      .string("Điền vào tên tài khoản")
      .required("Tên tài khoản bắt buộc"),
    password: yup
      .string("Điền vào mật khẩu")
      .min(6, "Mật khẩu ít nhất 6 ký tự")
      .required("Mật khẩu bắt buộc"),
  });

  const handleLogin = async (values) => {
    try {
      const res = await dispatch(signIn(values));
      if (res.type === "auth/login/fulfilled") {
        await Cookies.set("token", res.payload.accessToken, { expires: 3 });
        await window.location.reload();
      }
    } catch (error) {}
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <LoginContainer>
      <LoginWrapper>
        <LoginImage>
          <LoginImageItem src={`${ADMIN}`} alt="admin" />
        </LoginImage>
        <LoginTitle component="h4" variant="h4">
          ĐĂNG NHẬP
        </LoginTitle>
        {error && (
          <LoginError>
            <LoginErrorMessage>{error}!</LoginErrorMessage>
          </LoginError>
        )}

        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            handleLogin(values);
          }}
        >
          {(props) => (
            <LoginForm onSubmit={props.handleSubmit} autoComplete="off">
              <LoginFiledGroup>
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label="Tên tài khoản"
                  size="small"
                  value={props.values.username}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  error={
                    props.touched.username && Boolean(props.errors.username)
                      ? true
                      : false
                  }
                  autoFocus
                  helperText={props.touched.username && props.errors.username}
                />
              </LoginFiledGroup>
              <LoginFiledGroup>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Mật khẩu"
                  size="small"
                  type={showPassword ? "text" : "password"}
                  value={props.values.password}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  error={
                    props.touched.password && Boolean(props.errors.password)
                  }
                  helperText={props.touched.password && props.errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        sx={{ position: "absolute", right: "6px" }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => {
                            setShowPassword((prev) => !prev);
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </LoginFiledGroup>
              <LoginButton
                variant="contained"
                color="primary"
                size="medium"
                fullWidth
                type="submit"
                disabled={isLoading ? true : false}
              >
                {isLoading && (
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
                Đăng nhập
              </LoginButton>
            </LoginForm>
          )}
        </Formik>
      </LoginWrapper>
    </LoginContainer>
  );
};

export default Login;
