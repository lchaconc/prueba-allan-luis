"use client";

import { useForm } from "react-hook-form";

import  { useEffect } from 'react';


const generos = [
  {
    id: "M",
    nombre: "Masculino",
  },

  {
    id: "F",
    nombre: "Femenino",
  },

  {
    id: "O",
    nombre: "Otro",
  },
];

// Simulación de datos traídos desde un servicio
const obtenerDatosRegistro = async () => {
    return {
      nombre: "Juan Perez",
      correo: "juan.perez@example.com",
      genero: "M",
    };
  };

export default function Formulario(params) {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm();

  // Cargar los datos del registro al montar el componente
  useEffect(() => {
    // Simulación de llamada a un servicio para obtener el registro
    const cargarDatos = async () => {
      const datos = await obtenerDatosRegistro();
      // Usar setValue para cargar los datos en el formulario
      setValue("nombre", datos.nombre);
      setValue("correo", datos.correo);
      setValue("genero", datos.genero);
    };

    cargarDatos();
  }, [setValue]);


  const onSubmit = (data) => {

        data.token = "12345";
        console.log("Datos para enviar al servidor",data)

  }

  //errors && console.log(errors);

  if (Object.keys(errors).length !== 0) {
    console.log(errors);
  }

  return (
    <div className="row mt-4 ms-4">
      <div className="col-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="inputNombre" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="inputNombre"
              placeholder="Nombre con apellidos"
              {...register("nombre", {
                required: true,
                maxLength: 15,
                max: 15,
                min: 5,
              })}
            />

            <span className="text-danger">
              {errors.nombre &&
                "El campo es requerido tiene un minimo y máximo de caractres"}
            </span>
          </div>

          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="Correo electrónico"
              {...register("correo", {
                required: true,
                maxLength: 60,
                max: 60,
                min: 15,
              })}
            />

            <span className="text-danger">
              {errors.correo && "El campo de correo es requerido"}
            </span>
          </div>

          <div className="mb-3">
            <select
              className="form-select"
              aria-label="Genero del usuario"
              {...register("genero", { required: "Seleccione un género" })}
            >
              <option value="">Seleccione el género</option>
              {generos &&
                generos.map((genero) => (
                  <option value={genero.id} key={genero.id}>
                    {genero.nombre}
                  </option>
                ))}
            </select>
            <span className="text-danger">
              {errors.genero && errors.genero.message}
            </span>
          </div>
          <input type="submit" className="btn btn-secondary" value="Guardar" />
        </form>
      </div>
    </div>
  );
}
