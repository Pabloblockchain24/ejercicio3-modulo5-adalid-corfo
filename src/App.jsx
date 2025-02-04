import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import EquipoMedico from "./pages/EquipoMedico";
import AppointmentForm from "./pages/AppointmentForm";
import ServiciosMedicos from "./pages/ServiciosMedicos";
import DataProvider from "./context/DataContext";
import ProfilerView from "./pages/ProfilerView";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import DoctorAdd from "./pages/DoctorAdd";
import Navbar from "./components/Navbar";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Vulnerabilities from "./pages/Vulnerabilities";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <DataProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/EquipoMedico" element={<EquipoMedico />} />
            <Route path="/AppointmentForm" element={<AppointmentForm />} />
            <Route path="/ServiciosMedicos" element={<ServiciosMedicos />} />
            <Route path="/ProfilerView" element={<ProfilerView />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRules={["admin", "doctor"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vulnerabilities"
              element={
                <ProtectedRoute allowedRules={["admin"]}>
                  <Vulnerabilities />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addDoctor"
              element={
                <ProtectedRoute allowedRules={["admin"]}>
                  <DoctorAdd />
                </ProtectedRoute>
              }
            />
          </Routes>
        </DataProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
