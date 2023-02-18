import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LOGIN_SCHEMA } from "../../utils/validationSchemas";
import { handleToast } from "../../components/Notifications";
import "./login.css";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Spinner/Loader";

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const urlLogin = process.env.REACT_APP_API_URL

  return (
    <div className="login_container">
      <div className="formLogin">
        <div className="login_title">
          <h4>Iniciar Sesión</h4>
        </div>
        <Formik
          initialValues={{ documento: "", password: "" }}
          validationSchema={LOGIN_SCHEMA}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setIsLoading(true);
            try {
              const response = await axiosInstance.post(urlLogin, values);
              localStorage.setItem("token", response.data.access);
              localStorage.setItem("refresh", response.data.refresh);
              setSubmitting(false);
              handleToast("success", "Bienvenido");
              resetForm({
                documento: "",
                password: "",
              });
              navigate("/home");
            } catch (error) {
              console.log(error);
              handleToast("error", error.response.data.msg);
              setIsLoading(false);
            }
          }}
        >
          {(props) => (
            //los props son los valores que se envian al formulario y se pueden usar en el formulario
            <Form className="container">
              <div className="form-group mb-3 w-100">
                <label htmlFor="documento">Documento</label>
                <Field
                  name="documento"
                  type="number"
                  className="form-control"
                />
                <ErrorMessage
                  name="documento"
                  component="p"
                  className="text-danger mt-1"
                />
              </div>
              <div className="form-group mb-3 w-100">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-danger mt-1"
                />
              </div>
              {isLoading ? (
                <Loader />
              ) : (
                <button type="submit" className="btn btn-primary w-100">
                  Iniciar Sesión
                </button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
