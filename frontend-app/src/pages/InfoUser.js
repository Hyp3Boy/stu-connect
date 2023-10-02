import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import APIService from "../components/APIService";
import { axiosInteractions } from "../httpClient"; // Asegúrate de importar axiosInteractions

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

        // Obtener las vistas desde la API
        const vistasResp = await axiosInteractions.get(`/interactions/${id}`);
        const vistasData = vistasResp.data;
        setVistas(vistasData.views);

        // Obtener los likes desde la API
        const likesResp = await axiosInteractions.get(`/interactions/${id}`);
        const likesData = likesResp.data;
        setLikes(likesData.likes);

        // Marcar el perfil como visto si aún no se ha hecho
        if (!viewed) {
          setViewed(true);
          // Realizar una solicitud a la API para registrar la vista
          await axiosInteractions.post(`/interactions/${id}`, {
            views: 1, // Incrementar las vistas en 1
            likes: 0, // No cambiar los likes
          });
          // Actualizar el estado local de vistas
          setVistas(vistas + 1);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudent();
  }, [id, viewed, vistas]);

  // Función para manejar los likes
  const toggleLike = async () => {
    try {
      // Realizar una solicitud a la API para cambiar el like
      const likeAction = hasLiked ? -1 : 1; // Si ya ha dado like, resta 1; de lo contrario, suma 1
      await axiosInteractions.post(`/interactions/${id}`, {
        views: 0, // No cambiar las vistas
        likes: likeAction,
      });

      // Actualizar el estado local de likes y hasLiked
      setLikes(likes + likeAction);
      setHasLiked(!hasLiked);
    } catch (error) {
      console.error("Error al cambiar el like:", error);
    }
  };

  return (
    <div className="container mt-5">
      {/* ... Resto del código igual ... */}
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
    </div>
  );
}

export default InfoUser;
