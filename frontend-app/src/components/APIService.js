export default class APIService {
    static GetStudents() {
        return fetch("/student", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    static GetStudentById(id) {
        return fetch(`/student/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    static InsertStudent(data) {
        return fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.ok) {
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
