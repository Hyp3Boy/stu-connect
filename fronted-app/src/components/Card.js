import React from "react";
import PropTypes from "prop-types";
import imagen1 from "../assets/image2.jpg"

import "./card.css";

function Card({ username, curso, descripcion, imagen, url }) {
    return (
        <div className="card text-center  animate__animated animate__fadeInUp" style = {{backgroundColor:"rgb(170, 200, 167)"}}>
            <div className="overflow">
                <img src={imagen1} alt="a wallpaper" className="card-img-top" />
            </div>
            <div className="card-body text-light" >
                <h3 className="card-title">{username}</h3>
                <p className="card-text text-secondary">
                    {curso
                        ? curso
                        : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam deserunt fuga accusantium excepturi quia, voluptates obcaecati nam in voluptas perferendis velit harum dignissimos quasi ex? Tempore repellat quo doloribus magnam."}
                </p>
                <a
                    href={url ? url : "#!"}
                    target="_blank"
                    className="btn btn-outline-secondary border-1 "
                    rel="noreferrer"

                >
                    Go to {username}
                </a>
            </div>
        </div>
    );
}

Card.propTypes = {
    url: PropTypes.string,
    username: PropTypes.string,
    curso: PropTypes.string,
    imagen: PropTypes.string
};

export default Card;