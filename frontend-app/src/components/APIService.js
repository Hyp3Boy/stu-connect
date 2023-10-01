import axiosStudents from "../httpClient";

export default class APIService {
    static GetStudents() {
        return axiosStudents.get("/student");
    }

    static GetStudentById(id) {
        return axiosStudents.get(`/student/${id}`);
    }

    static InsertStudent(data) {
        return axiosStudents
            .post("/register", data)
            .then((response) => {
                if (response.status === 200) {
                    console.log("Student created successfully");
                    window.location.href = "/";
                } else {
                    throw new Error("Error creating student");
                }
            })
            .catch((error) => {
                console.error("Error creating student:", error);
            });
    }
}
