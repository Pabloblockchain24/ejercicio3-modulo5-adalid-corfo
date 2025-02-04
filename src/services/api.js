import axios from "axios";

const API_URL = "http://localhost:3001";

export const getAppointments = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/appointments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos protegidos", error);
    throw error;
  }
};

export const getDoctors = async () => {
  try {
    const response = await axios.get(`${API_URL}/doctores`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener doctores", error);
    throw error;
  }
};

export const postDoctor = async (doctor) => {
  try {
    const response = await axios.post(`${API_URL}/doctores`, doctor);
    return response.data;
  } catch (error) {
    console.error("Error al agregar doctor", error);
    throw error;
  }
};

export const getServices = async () => {
  try {
    const response = await axios.get(`${API_URL}/servicios_medicos`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener servicios medicos", error);
    throw error;
  }
};
