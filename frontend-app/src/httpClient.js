import axios from "axios";

const axiosStudents = axios.create({
    baseURL: "http://localhost:5001",
    withCredentials: true,
});

export default axiosStudents;
