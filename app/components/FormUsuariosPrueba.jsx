import { useForm } from "react-hook-form";

import { useEffect } from "react";

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

export default function FormUsuariosPrueba({
  seleccionado,
  enviarDatos,
  enviarDatosNuevoUsuario,
  enviandoDatos,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Cargar los datos del registro al montar el componente
  useEffect(() => {
    // Simulación de llamada a un servicio para obtener el registro
    //const cargarDatos = async () => {
    //const datos = await obtenerDatosRegistro();
    // Usar setValue para cargar los datos en el formulario

    if (seleccionado !== null) {
      setValue("nombre", seleccionado.nombre);
      setValue("apellido", seleccionado.apellido);
      setValue("correo", seleccionado.correo);
      setValue("genero", seleccionado.genero);
      //cargarDatos();
    } else {
      setValue("nombre", null);
      setValue("apellido", null);
      setValue("correo", null);
      setValue("genero", null);
    }
  }, [setValue]);

  const onSubmit = (data) => {
    console.log("Datos para enviar al servidor", data);

    if (seleccionado === null) {
      console.log("No hago nada");

      enviarDatosNuevoUsuario(data);
    } else {
      enviarDatos(data, seleccionado.id);
    }
  };

  //errors && console.log(errors);

  if (Object.keys(errors).length !== 0) {
    console.log(errors);
  }

  return (
    <div className="row mt-4 ms-4">
      <div className="col-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="inputNombre" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="inputNombre"
              placeholder="Nombre"
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
            <label htmlFor="inputApellido" className="form-label">
              Apellido
            </label>
            <input
              type="text"
              className="form-control"
              id="inputApellido"
              placeholder="Apellidos"
              {...register("apellido", {
                required: true,
                maxLength: 60,
                max: 60,
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
          {!enviandoDatos ? (
            <input
              type="submit"
              className="btn btn-secondary"
              value="Guardar"
            />
          ) : (
            <div className="alert alert-info" role={"alert"}>
              Enviado datos. Por favor esperar...
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
