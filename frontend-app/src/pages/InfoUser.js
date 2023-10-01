import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import APIService from "../components/APIService";

function InfoUser() {
  // Obtener el parámetro 'id' de la URL
  const { id } = useParams();

  const [student, setStudent] = useState({});
  const [vistas, setVistas] = useState(0); // Estado para las vistas
  const [likes, setLikes] = useState(0); // Estado para los likes
  const [hasLiked, setHasLiked] = useState(false); // Estado para rastrear si el usuario ha dado like
  const [viewed, setViewed] = useState(false); // Estado para rastrear si el usuario ha visto el perfil

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const resp = await APIService.GetStudentById(id);
        const studentData = await resp.data;
        setStudent(studentData);

        // Aquí puedes cargar las vistas y likes desde el servidor si es necesario
        // Por ejemplo: const vistasData = await APIService.GetViews(id);
        // setVistas(vistasData);

        // Similarmente, carga los likes si es necesario
        // const likesData = await APIService.GetLikes(id);
        // setLikes(likesData);

        // Marcar el perfil como visto
        if (!viewed) {
          setViewed(true);
          // Aquí podrías enviar una solicitud al servidor para registrar la vista
          // Luego, actualiza el estado local de vistas
          // setVistas(vistas + 1);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudent();
  }, [id, viewed]);

  // Función para manejar los likes
  const toggleLike = () => {
    if (hasLiked) {
      // Si ya le dio like, quitar el like
      // Aquí podrías enviar una solicitud al servidor para quitar el like
      setLikes(likes - 1);
    } else {
      // Si no le ha dado like, agregar el like
      // Aquí podrías enviar una solicitud al servidor para agregar el like
      setLikes(likes + 1);
    }

    // Cambiar el estado de hasLiked para reflejar si el usuario ha dado like o no
    setHasLiked(!hasLiked);
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <img
                // imagen de un gato animado
                src="https://static.vecteezy.com/system/resources/previews/013/078/569/non_2x/illustration-of-cute-colored-cat-cartoon-cat-image-in-format-suitable-for-children-s-book-design-elements-introduction-of-cats-to-children-books-or-posters-about-animal-free-png.png"
                alt="Imagen del estudiante"
                className="w-100 rounded-circle"
              />
            </div>
            <div className="col-md-8">
              <h2 className="card-title">{student.username}</h2>
              <p className="card-text">{student.curso}</p>
              <p className="card-text">{student.descripcion}</p>
              <p className="card-text">
                <strong>Email:</strong> {student.email}
              </p>
              <p className="card-text">
                <strong>Celular:</strong> {student.celular}
              </p>
              <p className="card-text">
                <strong>Vistas:</strong> {vistas}
              </p>
              <p className="card-text">
                <strong>Likes:</strong> {likes}
                <button
                  onClick={toggleLike}
                  className={`btn btn-sm ${hasLiked ? "btn-danger" : "btn-success"
                    } ml-2`}
                >
                  {hasLiked ? "Quitar Like" : String.fromCodePoint(0x2764)}{" "}
                  {/* Corazón Unicode */}
                </button>
              </p>
              {/* Otras propiedades del estudiante */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoUser;
