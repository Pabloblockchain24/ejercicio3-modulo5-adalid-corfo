import { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";

function DoctorAdd() {
  const { addDoctor } = useContext(DataContext);
  const [doctor, setDoctor] = useState({
    id_doc: "",
    nombre: "",
    especialidad: "",
    descripcion: "",
    imagen: "",
    experiencia: "",
    disponibilidad: "",
    contacto: "",
    horas_disponibles: ""
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!doctor.id_doc.trim()) newErrors.id_doc = "El ID es obligatorio";
    if (!doctor.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!doctor.especialidad.trim()) newErrors.especialidad = "La especialidad es obligatoria";
    if (!doctor.descripcion.trim()) newErrors.descripcion = "La descripción es obligatoria";
    if (!doctor.imagen.trim()) newErrors.imagen = "La URL de la imagen es obligatoria";
    if (!doctor.experiencia || doctor.experiencia < 1)
      newErrors.experiencia = "Debe ingresar al menos 1 año de experiencia";
    if (!doctor.disponibilidad.trim()) newErrors.disponibilidad = "La disponibilidad es obligatoria";
    if (!doctor.contacto.trim()) newErrors.contacto = "El contacto es obligatorio";
    if (!doctor.horas_disponibles.trim()) newErrors.horas_disponibles = "Las horas disponibles son obligatorias";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    addDoctor({
      ...doctor,
      informacion_adicional: {
        contacto: doctor.contacto,
        horas_disponibles: doctor.horas_disponibles
      }
    });

    alert("Doctor agregado exitosamente");

    setDoctor({
      id_doc: "",
      nombre: "",
      especialidad: "",
      descripcion: "",
      imagen: "",
      experiencia: "",
      disponibilidad: "",
      contacto: "",
      horas_disponibles: ""
    });

    setErrors({});
  };

  return (
    <div className="doctor-form__container">
      <h2>Agregar Doctor</h2>
      <form onSubmit={handleSubmit}>
        {[
          { name: "id_doc", type: "text", placeholder: "ID" },
          { name: "nombre", type: "text", placeholder: "Nombre" },
          { name: "especialidad", type: "text", placeholder: "Especialidad" },
          { name: "descripcion", type: "textarea", placeholder: "Descripción" },
          { name: "imagen", type: "text", placeholder: "URL Imagen" },
          { name: "experiencia", type: "number", placeholder: "Años de experiencia" },
          { name: "disponibilidad", type: "text", placeholder: "Disponibilidad" },
          { name: "contacto", type: "text", placeholder: "Contacto" },
          { name: "horas_disponibles", type: "text", placeholder: "Horas disponibles" }
        ].map(({ name, type, placeholder }) => (
          <div key={name}>
            {type === "textarea" ? (
              <textarea
                name={name}
                placeholder={placeholder}
                value={doctor[name]}
                onChange={handleChange}
                className={errors[name] ? "error-input" : ""}
              />
            ) : (
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={doctor[name]}
                onChange={handleChange}
                className={errors[name] ? "error-input" : ""}
              />
            )}
            {errors[name] && <p className="error-text">{errors[name]}</p>}
          </div>
        ))}

        <button type="submit" disabled={Object.keys(errors).length > 0}>
          Agregar Doctor
        </button>
      </form>
    </div>
  );
}

export default DoctorAdd;
