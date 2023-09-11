import React, { ReactElement } from "react";
import Modal from "../../../components/modal/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./UserModal.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  EUserModalType,
  IUserDetail,
  TCreateUserRequest,
  TUpdateUserRequest,
} from "../../../interfaces/user-interfaces";

interface IUserModalProps {
  isOpenModal: boolean;
  handleCloseModal: () => void;
  onCreateUser?: (values: TCreateUserRequest) => void;
  onUpdateUser?: (values: TUpdateUserRequest) => void;
  UserModalType?: EUserModalType;
  selectedUser?: IUserDetail;
}

const UserModal = ({
  isOpenModal,
  handleCloseModal,
  onCreateUser,
  onUpdateUser,
  UserModalType,
  selectedUser,
}: IUserModalProps) => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    address: Yup.string(),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const updateValidationSchema = Yup.object().shape({
    id: Yup.number(),
    firstName: Yup.string(),
    lastName: Yup.string(),
    address: Yup.string(),
    email: Yup.string()
      .email("Email not valid!!")
      .required("Email is required"),
  });

  const handleSubmit = (
    values: TCreateUserRequest | TUpdateUserRequest,
    actions: any
  ) => {
    if (UserModalType === EUserModalType.CREATE_USER) {
      onCreateUser?.(values as TCreateUserRequest);
    } else if (UserModalType === EUserModalType.UPDATE_USER) {
      // Object.keys(values as TUpdateUserRequest).map((key) => {
      //   if (
      //     (values as TUpdateUserRequest)[key as keyof TUpdateUserRequest] ===
      //       "" ||
      //     null
      //   ) {
      //     (values as TUpdateUserRequest)[key as keyof TUpdateUserRequest] = (
      //       selectedUser as never
      //     )[key];
      //   }
      // });
      onUpdateUser?.(values as TUpdateUserRequest);
    }
    console.log(values);
    handleCloseModal();
    actions.resetForm();
  };

  return (
    <Modal
      open={isOpenModal}
      handleCloseModal={handleCloseModal}
      title={
        UserModalType === EUserModalType.CREATE_USER
          ? "Create User Modal"
          : "Update User Modal"
      }
    >
      <div className="UserModal__form">
        <Formik
          initialValues={
            UserModalType === EUserModalType.CREATE_USER
              ? {
                  firstName: "",
                  lastName: "",
                  address: "",
                  email: "",
                }
              : {
                  id: selectedUser?.id,
                  firstName: selectedUser?.firstName,
                  lastName: selectedUser?.lastName,
                  address: selectedUser?.address,
                  email: selectedUser?.email,
                }
          }
          validationSchema={
            UserModalType === EUserModalType.CREATE_USER
              ? validationSchema
              : updateValidationSchema
          }
          onSubmit={handleSubmit}
        >
          {(formikProps) => {
            return (
              <Form>
                <div className="UserModal__form-field-row">
                  <div className="UserModal__form-field">
                    <TextField
                      variant="outlined"
                      label="First Name"
                      size="small"
                      type="text"
                      name="firstName"
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      value={formikProps.values.firstName}
                      className={`form-control ${
                        formikProps.errors.firstName &&
                        formikProps.touched.firstName &&
                        "UserModal__form-error"
                      }`}
                      placeholder="Enter user's first name"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="UserModal__form-error-text"
                    />
                  </div>
                  <div className="UserModal__form-field">
                    <TextField
                      variant="outlined"
                      label="Last Name"
                      size="small"
                      type="text"
                      name="lastName"
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      value={formikProps.values.lastName}
                      className={`form-control ${
                        formikProps.errors.lastName &&
                        formikProps.touched.lastName &&
                        "UserModal__form-error"
                      }`}
                      placeholder="Enter user last name"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="UserModal__form-error-text"
                    />
                  </div>
                </div>
                <div className="UserModal__form-field">
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Address"
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    value={formikProps.values.address}
                    type="text"
                    name="address"
                    className={`form-control ${
                      formikProps.errors.address &&
                      formikProps.touched.address &&
                      "UserModal__form-error"
                    }`}
                    placeholder="Enter student's address"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="UserModal__form-error-text"
                  />
                </div>

                <div className="UserModal__form-field">
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Email"
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    value={formikProps.values.email}
                    type="email"
                    name="email"
                    className={`form-control ${
                      formikProps.errors.email &&
                      formikProps.touched.email &&
                      "UserModal__form-error"
                    }`}
                    placeholder="Enter a valid email address"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="UserModal__form-error-text"
                  />
                </div>
                <div className="UserModal__form-action">
                  {UserModalType === EUserModalType.CREATE_USER ? (
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={!formikProps.dirty || !formikProps.isValid}
                    >
                      Create User
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={!formikProps.dirty || !formikProps.isValid}
                    >
                      Update Student
                    </Button>
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
};

export default UserModal;
