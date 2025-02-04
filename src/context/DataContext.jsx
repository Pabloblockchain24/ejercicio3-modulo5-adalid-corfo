import { createContext, useEffect, useState } from "react";
export const DataContext = createContext();
import { getAppointments, getDoctors, getServices, postDoctor } from "../services/api"


export default function DataProvider({ children }) {
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [loadingAppointements, setLoadingAppointements] = useState(false);

  const [errorServices, setErrorServices] = useState(null);

  useEffect(() => {
    async function loadDoctors() {
      try {
        const doctores = await getDoctors()
        setDoctors(doctores);
      } catch (error) {
        console.error("Error al cargar los doctores:", error);
      }
    }
    loadDoctors();
  }, []);

  const loadServices = async () => {
    setLoadingServices(true);
    setErrorServices(null);
    try {
      const servicios_medicos = await getServices()
      setServices(servicios_medicos);
    } catch (error) {
      console.error("Error al cargar los servicios:", error);
      setErrorServices("Error al cargar los servicios. Por favor, intenta nuevamente.");
    } finally {
      setLoadingServices(false);
    }
  };

  const fetchAppointments = async (token) => {
    setLoadingAppointements(true);
    try {
      const appointments = await getAppointments(token)
      return appointments
    } catch (error) {
      console.error("Error al cargar los servicios:", error);
    } finally {
      setLoadingAppointements(false);
    }
  }   

  useEffect(() => {
    loadServices();
  }, []);


  const force_error_loadServices = async () => {
    throw new Error("Error al cargar los servicios");
  }

  const reFetchServices = async () => {
    setLoadingServices(true);
    setTimeout(async() => {
      try {
        await loadServices();
        setLoadingServices(false);  
        alert('Servicios cargados correctamente')
      } catch (error) {
        console.error("Error al cargar los servicios:", error);
        setErrorServices("Error al cargar los servicios. Por favor, intenta nuevamente.");
        setLoadingServices(false);
      }
    }, 1000)
  };



  const addAppointment = (newAppointment) => {
    setAppointments([...appointments, newAppointment]);

    // aqui deberia hacer el post a la api
    console.log('New appointment addded: ', newAppointment)
  };

  const addDoctor = (newDoctor) => {
    const response = postDoctor(newDoctor);
    if (response.error) {
      console.error("Error al agregar doctor", response.error);
    }  
    console.log("Nuevo doctor agregado:", newDoctor);
  };

  return (
    <DataContext.Provider
      value={{ doctors, services, addAppointment, appointments, reFetchServices, loadingServices, errorServices, fetchAppointments, loadingAppointements, addDoctor}}
    >
      {children}
    </DataContext.Provider>
  );
}
