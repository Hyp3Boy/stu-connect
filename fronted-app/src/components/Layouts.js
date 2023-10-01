import React from "react";
import { Link, Outlet } from "react-router-dom";
import httpClient from "../httpClient";

const Layouts = () => {
    const logoutStudent = async () => {
        await httpClient.post("/logout");
        window.location.href = "/";
    };
    return (
        <div className="navbar-container d-flex flex-column justify-content-between min-vh-100">
            <nav
                className="navbar navbar-expand-lg navbar-light"
                style={{ backgroundColor: "rgb(170, 200, 167)" }}
            >
                <div className="container justify-content-start align-items-center navbar-content mx-2">
                    <Link className="navbar-brand text-light" to="/stu20/LandingPage">
                        StuConnect
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link text-light" to="/stu20/Home">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/stu20/LandingPage">
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <button
                        type="button"
                        onClick={logoutStudent}
                        className="btn btn-dark align-self-end"
                    >
                        Logout
                    </button>
                </div>
            </nav>
            <Outlet />
            <footer
                className="text-center text-lg-start"
                style={{ backgroundColor: "rgb(170, 200, 167)" }}
            >
                <div
                    className="text-center text-white p-3"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
                >
                    {new Date().getFullYear()} MDBootstrap.com
                </div>
            </footer>
        </div>
    );
};

export default Layouts;
