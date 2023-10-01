import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layouts from "./components/Layouts";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import SingUp from "./pages/SingUp";
import LandingPage from "./pages/LandingPage";

function App() {
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch("/@me", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await resp.json();

        if (data.error) {
          setStudent(null);
        } else {
          setStudent(data);
        }
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute canActivate={student} />}>
          <Route path="/stu20/" element={<Layouts />}>
            <Route path="/stu20/LandingPage" element={<LandingPage />} />
            <Route path="/stu20/Home" element={<Home />} />
            <Route path="/stu20/User" />
          </Route>
        </Route>
        <Route path="/signup" element={<SingUp />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
