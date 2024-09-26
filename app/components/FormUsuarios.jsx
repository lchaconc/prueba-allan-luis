import { useRef } from "react";

export default function FormUsuarios({
  usuarioSeleccionado,
  guardarDatosForm,
}) {
  const refNombre = useRef(null);
  const refApellido = useRef(null);
  const refCorreo = useRef(null);
  const refGenero = useRef(null);

  const handleGuardarDatosForm = () => {
    const datos = {
      nombre: refNombre.current.value,
      apellido: refApellido.current.value,
      correo: refCorreo.current.value,
      genero: refGenero.current.value,
    };

    guardarDatosForm(datos, usuarioSeleccionado.id );
  };

  

  return (
    <div className="container">
      <div className="input-group mb-3">
        <span className="input-group-text" id="spnNombre">
          Nombre
        </span>
        <input
          type="text"
          className="form-control"
          aria-label="Nombre del participante"
          aria-describedby="spnNombre"
          defaultValue={usuarioSeleccionado.nombre}
          ref={refNombre}
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="spnApellido">
          Apellido
        </span>
        <input
          type="text"
          className="form-control"
          aria-label="apeliido del participante"
          aria-describedby="spnApellido"
          defaultValue={usuarioSeleccionado.apellido}
          ref={refApellido}
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="spnCorreo">
          correo
        </span>
        <input
          type="text"
          className="form-control"
          aria-label="correo del trabajo"
          aria-describedby="spnCorreo"
          defaultValue={usuarioSeleccionado.correo}
          ref={refCorreo}
        />
      </div>

      <div className="input-group mb-3">
        <label className="input-group-text" htmlFor="selGenero">
          Género
        </label>
        <select
          className="form-select"
          id="selGenero"
          defaultValue={usuarioSeleccionado.genero}
          ref={refGenero}
        >
          <option value=""> Seleccione un valor </option>
          <option value={"F"}>Femenino</option>
          <option value={"M"}>Masculino</option>
        </select>
      </div>

      <div className="row text-end">
        <div className="col-12">
          <button className="btn btn-info" onClick={handleGuardarDatosForm}>
            {" "}
            Actualizar{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
