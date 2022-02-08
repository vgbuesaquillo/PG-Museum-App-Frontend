import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./styles/ResetPasswordPut.css";
import queryString from "query-string";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { accountService, alertService } from "../services";
import Swal from "sweetalert2";

function ResetPasswordPut() {
  const location = useLocation()
  const state = location.state
  console.log("state", state)
  const TokenStatus = {
    Validating: "Validating",
    Valid: "Valid",
    Invalid: "Invalid",
  };

  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [tokenStatus, setTokenStatus] = useState(TokenStatus.Validating);

  useEffect(() => {
    const { token } = queryString.parse(window.location.search);


    accountService
      .validateResetToken(token)
      .then(() => {
        setToken(token);
        setTokenStatus(TokenStatus.Valid);
      })
      .catch(() => {
        setTokenStatus(TokenStatus.Invalid);
      });
  }, []);

  function getForm() {
    const initialValues = {
      password: "",
      confirmPassword: "",
    };

    const validationSchema = Yup.object().shape({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    });

    function onSubmit({ password, confirmPassword }, { setSubmitting }) {
      alertService.clear();
      accountService
        .resetPassword({ token, password, confirmPassword })
        .then(() => {
          Swal.fire("Password reset successful, you can now login");
          navigate("/login");
        })
        .catch((error) => {
          setSubmitting(false);
          alertService.error(error);
        });
    }

    return (
      <div className="resetpasswordput">
        <div className="resetpasswordput__text">
          <h2>New password</h2>
          <p>Please enter your new password below.</p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="resetpasswordput__form">
                <div className="form-group resetpasswordput__form--form">
                  <label>Password</label>
                  <Field
                    name="password"
                    type="password"
                    className={
                      "form-control" +
                      (errors.password && touched.password ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className={
                      "form-control" +
                      (errors.confirmPassword && touched.confirmPassword
                        ? " is-invalid"
                        : "")
                    }
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary">
                      {isSubmitting && (
                        <span className="spinner-border spinner-border-sm mr-1"></span>
                      )}
                      Reset Password
                    </button>
                    <Link to="/login" className="btn btn-link">
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
  function messagge() {
    Swal.fire("Token invalido por favor intentarlo nuevamente ");
    navigate("/resetPasswordPost");
  }

  function getBody() {
    switch (tokenStatus) {
      case TokenStatus.Valid:
        return getForm();
      case TokenStatus.Invalid:
        return messagge();

      /*      <div>Token validation failed, if the token has expired you can get a new one at the <Link to="forgot-password">forgot password</Link> page.</div>; */
      case TokenStatus.Validating:
        return <div>Validating token...</div>;
    }
  }

  return (
    <div className="card-container">
      <div className="card-body">{getBody()}</div>
    </div>
  );
}

export default ResetPasswordPut;
