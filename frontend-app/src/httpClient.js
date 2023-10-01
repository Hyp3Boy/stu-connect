import axios from "axios";

const axiosStudents = axios.create({
    baseURL: "http://localhost:5001",
    withCredentials: true,
});

const axiosCourses = axios.create({
    baseURL: "http://localhost:5002",
    withCredentials: true,
});

export default axiosStudents;
export { axiosCourses };
