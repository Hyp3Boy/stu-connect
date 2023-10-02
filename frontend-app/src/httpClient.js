import axios from "axios";

const axiosStudents = axios.create({
    baseURL: "http://localhost:5001",
    withCredentials: true,
});

const axiosCourses = axios.create({
    baseURL: "http://localhost:5002",
    withCredentials: true,
});

const axiosInteractions = axios.create({
    baseURL: "http://localhost:5003",
    withCredentials: true,
});

export default axiosStudents;
export { axiosStudents, axiosCourses, axiosInteractions };
