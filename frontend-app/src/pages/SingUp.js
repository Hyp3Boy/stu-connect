import React, { useState } from 'react';
//import APIService from '../components/APIService'; 5 horas para que esto no funcione c##r
import axios from 'axios';

const SignUp = () => {
    const [error, setError] = useState('');
    const [newStudent, setNewStudent] = useState({
        username: '',
        email: '',
        password: '',
        curso: '',
        celular: '',
        descripcion: '',
        imagen: '#'
    });

    const handleInputChange = (e) => {
        setNewStudent({
            ...newStudent,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        setError('');
        for (const key in newStudent) {
          if (newStudent[key] === '') {
            setError('Por favor rellena todos los campos');
            return;
          }
        }
    
        try {
          await axios.post('/register', newStudent);
          console.log('Student created successfully');
          window.location.href = '/';
        } catch (error) {
          console.error('Error creating student:', error);
          if (error.response && error.response.status === 409) {
            setError('Email already exists');
          } else {
            setError('An error occurred');
          }
        }
      };


    return (
        <div>
            <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
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
                                                    style={{ width: '185px' }}
                                                    alt="logo"
                                                />
                                                <h4 className="mt-1 mb-5 pb-1">We are StuConnect</h4>
                                            </div>
                                            <form onSubmit={handleSubmit}>
                                                <p>Please sign up for a new account</p>
                                                <div className={`form-outline mb-4 ${error && 'has-error'}`}>
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        value={newStudent.username}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        placeholder="Username"
                                                    />
                                                </div>
                                                <div className={`form-outline mb-4 ${error && 'has-error'}`}>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={newStudent.email}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        placeholder="Email address"
                                                    />
                                                    {error && <div className="form-error">{error}</div>}
                                                </div>
                                                <div className={`form-outline mb-4 ${error && 'has-error'}`}>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        value={newStudent.password}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        placeholder="Password"
                                                    />
                                                </div>
                                                <div className={`form-outline mb-4 ${error && 'has-error'}`}>
                                                    <input
                                                        type="text"
                                                        name="curso"
                                                        value={newStudent.curso}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        placeholder="Curso"
                                                    />
                                                </div>
                                                <div className={`form-outline mb-4 ${error && 'has-error'}`}>
                                                    <input
                                                        type="text"
                                                        name="celular"
                                                        value={newStudent.celular}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        placeholder="Celular"
                                                    />
                                                </div>
                                                <div className={`form-outline mb-4 ${error && 'has-error'}`}>
                                                    <textarea
                                                        name="descripcion"
                                                        value={newStudent.descripcion}
                                                        onChange={handleInputChange}
                                                        className="form-control"
                                                        aria-label="With textarea"
                                                        placeholder="Descripcion"
                                                    ></textarea>
                                                </div>
                                                <div className="text-center pt-1 mb-5 pb-1">
                                                    <div className="mb-3">
                                                        <button
                                                            className="btn btn-primary btn-block fa-lg gradient-custom-2 w-100 border-0"
                                                            type="submit"
                                                            style={{ backgroundColor: 'rgb(170, 200, 167)' }}
                                                        >
                                                            Sign Up
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                            <h4 className="mb-4">Nuevo texto para descripción</h4>
                                            <p className="small mb-0">Nuevo texto para descripción</p>
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

export default SignUp;
