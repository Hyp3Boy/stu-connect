import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosStudents from "../httpClient";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const logInStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosStudents.post("/login", {
        email,
        password,
      });

      if (response.status === 200) {
        // La solicitud fue exitosa
        window.location.href = "/stu20";
      } else {
        // La solicitud no fue exitosa, maneja el error según tu lógica
        console.error("Error en la solicitud:", response.data);
        setError(response.data.error);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };
  return (
    <div>
      <section
        className="h-100 gradient-form"
        style={{ backgroundColor: "#eee" }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                          style={{ width: "185px" }}
                          alt="logo"
                        />
                        <h4 className="mt-1 mb-5 pb-1">We are StuConnect</h4>
                      </div>
                      <form onSubmit={logInStudent}>
                        <p>Please login to your account</p>
                        <div
                          className={`form-outline mb-4 ${error && "has-error"
                            }`}
                        >
                          <input
                            type="email"
                            id="form2Example11"
                            className="form-control"
                            placeholder="Email address"
                            onChange={handleEmailChange}
                          />
                          {error && <div className="form-error">{error}</div>}
                        </div>

                        <div
                          className={`form-outline mb-4 ${error && "has-error"
                            }`}
                        >
                          <input
                            type="password"
                            id="form2Example22"
                            className="form-control"
                            placeholder="Password"
                            onChange={handlePasswordChange}
                          />
                          {error && <div className="form-error">{error}</div>}
                        </div>
                        <div className="text-center pt-1 mb-5 pb-1">
                          <div className="mb-3">
                            <button
                              className="btn btn-primary btn-block fa-lg gradient-custom-2 w-100 border-0"
                              type="submit"
                              style={{ backgroundColor: "rgb(170, 200, 167)" }}
                            >
                              Log in
                            </button>
                          </div>
                          <div>
                            <a className="text-muted" href="#!">
                              Forgot password?
                            </a>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                          >
                            <Link
                              to="/signup"
                              className="text-decoration-none text-danger "
                            >
                              Create new
                            </Link>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">
                        Conectando conocimientos para aprender juntos.
                      </h4>
                      <p className="small mb-0">
                        StuConnect es una plataforma que une a estudiantes con
                        diferentes fortalezas disciplinarias para un aprendizaje
                        mutuo. A través de esta colaboración, compartimos
                        conocimientos y nos apoyamos en áreas en las que
                        necesitamos mejorar.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
