import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { signInAction } from "../../stores/actions/auth-actions";
import "./SignIn.scss";

import { Navigate, useNavigate } from "react-router-dom";
import { EQUIPMENT, USER } from "../../routes/paths";
import { toastError, toastSuccess } from "../../utils/notifications-utils";
import { handleStorageToken } from "../../utils/storage-utils";
import {
  EAuthToken,
  TAuthToken,
  TSignInRequest,
} from "../../interfaces/user-interfaces";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { TRootState } from "../../stores/reducers";
import { EAuthActions } from "../../stores/actions/auth-actions/constants";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state: TRootState) => state.authUser.userData);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const isSignIn = useSelector(
    (state: TRootState) => state.loading[EAuthActions.SIGN_IN]
  );
  const accessToken = localStorage.getItem(EAuthToken.ACCESS_TOKEN);

  const handleSignInSuccess = (tokens: TAuthToken) => {
    toastSuccess("Sign In Successfully!!!");
    handleStorageToken(tokens);
    // navigate
    navigate(USER);
  };

  const handleSignInFailed = (errorMessage: string) => {
    toastError(errorMessage);
  };

  const handleSubmit = (values: TSignInRequest, actions: any) => {
    console.log(values);
    dispatch(signInAction(values, handleSignInSuccess, handleSignInFailed));
    actions.setSubmitting(false);
    setTimeout(() => {
      actions.resetForm();
    }, 1000);
  };

  if (accessToken) {
    return (
      <Navigate
        to={userData?.role.name === "ADMIN" ? USER : EQUIPMENT}
        replace
      />
    );
  }

  return (
    <div className="SignIn">
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {(formikProps) => (
                  <Form>
                    <div className="divider d-flex align-items-center my-4">
                      <div className="text-center fw-bold mx-3 mb-0">
                        Sign In
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <Field
                        type="email"
                        name="email"
                        id="form3Example3"
                        className={`form-control form-control-lg  ${
                          formikProps.errors.email &&
                          formikProps.touched.email &&
                          "login-error-field"
                        }`}
                        placeholder="Enter a valid email address"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="login-error-text"
                      />
                    </div>

                    <div className="form-outline mb-3">
                      <Field
                        type="password"
                        name="password"
                        id="form3Example4"
                        className={`form-control form-control-lg  ${
                          formikProps.errors.password &&
                          formikProps.touched.password &&
                          "login-error-field"
                        }`}
                        placeholder="Enter password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="login-error-text"
                      />
                    </div>
                    <div className="text-center text-lg-start mt-4 pt-2">
                      <LoadingButton
                        loading={isSignIn}
                        type="submit"
                        variant="contained"
                        className="btn btn-primary btn-lg btn-login"
                      >
                        Login
                      </LoadingButton>
                      <p className="small fw-bold mt-2 pt-1 mb-0">
                        Don't have an account?{" "}
                        <a href="#!" className="link-danger">
                          Register
                        </a>
                      </p>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
