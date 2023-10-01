import React from 'react';
import imagePage from '../assets/imagePage1.jpg';

const LandingPage = () => {
    return (
        <div className="container-Page">
            <div className="image-container">
                <img src={imagePage} alt="a wallpaper" className="imagen" />
            </div>

            <div className="container text-center">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h2 className="mt-4">Bienvenido a nuestra plataforma de intercambio de conocimientos</h2>
                        <p className="lead">
                            Esta plataforma se ha creado con el objetivo de facilitar el intercambio de conocimientos.
                            Aquí, podemos compartir recursos, plantear preguntas, resolver dudas y proporcionar explicaciones
                            claras y concisas sobre nuestros respectivos temas. La diversidad de perspectivas y enfoques nos
                            permite abordar los problemas desde diferentes ángulos y enriquecer nuestro aprendizaje de manera
                            significativa.
                        </p>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-md-6">
                        <div className="card p-4">
                            <h4 className="mb-3">Beneficios de nuestra plataforma</h4>
                            <ul className="list-unstyled">
                                <li>Compartir recursos educativos</li>
                                <li>Resolver dudas y preguntas</li>
                                <li>Obtener explicaciones claras y concisas</li>
                                <li>Enriquecer el aprendizaje desde diferentes perspectivas</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card p-4">
                            <h4 className="mb-3">Cómo funciona</h4>
                            <ol className="list-unstyled">
                                <li>Regístrate en nuestra plataforma</li>
                                <li>Explora los temas de tu interés</li>
                                <li>Participa en discusiones y debates</li>
                                <li>Comparte tus conocimientos y recursos</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
