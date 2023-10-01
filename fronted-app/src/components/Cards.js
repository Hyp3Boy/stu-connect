import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";
import APIService from "./APIService";


function Cards() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const resp = await APIService.GetStudents();
        const studentsData = await resp.json();
        setStudents(studentsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center h-100" >
      <div className="row justify-content-center">
        {students.map(({ id, username, curso, descripcion, imagen }) => (
          <div className="col-md-4" key={id}>
              <Card
                username={username}
                curso={curso}
                descripcion={descripcion}
                imagen={imagen}
                url=""
              />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
