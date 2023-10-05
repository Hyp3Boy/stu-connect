import axios from "axios";

const axiosStudents = axios.create({
    baseURL: "http://23.23.2.125:5001",
    withCredentials: true,
});

const axiosCourses = axios.create({
    baseURL: "http://23.23.2.125:5002",
    withCredentials: true,
});

const axiosInteractions = axios.create({
    baseURL: "http://23.23.2.125:5003",
    withCredentials: true,
});

export default axiosStudents;
export { axiosStudents, axiosCourses, axiosInteractions };
