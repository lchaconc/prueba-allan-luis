import { useRef } from "react";

export default function FormUsuarios({
  seleccionado,
  enviarDatos,
  enviarDatosNuevoUsuario,
  enviandoDatos,
}) {
  //Referencias de los inputs del formulario para luego obtener su valor

  const refNombre = useRef(null);
  const refApellido = useRef(null);
  const refCorreo = useRef(null);
  const refGenero = useRef(null);

  const handleEnviarDatos = () => {
    console.log(refNombre.current.value);

    const datos = {
      nombre: refNombre.current.value,
      apellido: refApellido.current.value,
      correo: refCorreo.current.value,
      genero: refGenero.current.value,
    };

    console.log("Valor actual de seleccionado", seleccionado)

    if (seleccionado === null ) {

      console.log("No hago nada");

      enviarDatosNuevoUsuario(datos);
      

    }else{

      enviarDatos(datos, seleccionado.id);

    }

    



  };

  return (
    <div className="container">
      <div className="input-group mb-3">
        <span className="input-group-text" id="spnNombre">
          Nombre:
        </span>
        <input
          type="text"
          className="form-control"
          aria-label="Nombre del participante"
          aria-describedby="spnNombre"
          defaultValue={seleccionado ? seleccionado.nombre : ""}
          ref={refNombre}
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="spnApellido">
          Apellido:
        </span>
        <input
          type="text"
          className="form-control"
          aria-label="Nombre del participante"
          aria-describedby="spnNombre"
          defaultValue={seleccionado ? seleccionado.apellido : ""}
          ref={refApellido}
        />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="spnCorreo">
          Correo:
        </span>
        <input
          type="text"
          className="form-control"
          aria-label="correo del trabajo"
          aria-describedby="spnCorreo"
          defaultValue={seleccionado ? seleccionado.correo : ""}
          ref={refCorreo}
        />
      </div>

      <div className="input-group mb-3">
        <label className="input-group-text" htmlFor="inputGroupSelect01">
          Género
        </label>
        <select
          className="form-select"
          id="inputGroupSelect01"
          defaultValue={seleccionado ? seleccionado.genero : ""}
          ref={refGenero}
        >
          <option>Seleccione una opción</option>
          <option value={"M"}>Masculino</option>
          <option value={"F"}>Femenino</option>
          <option value={"O"}>Otro</option>
        </select>
      </div>

      {
        //Indica que si el estado es verdadero se inverte su evaluación mediante el operador NOT que en javascript es con el signo de admiración
        !enviandoDatos ? (
          <button className="btn btn-info" onClick={handleEnviarDatos}>
            {" "}
            Guadar{" "}
          </button>
        ) : (
          <div className="alert alert-info" role={"alert"}>
            Enviado datos. Por favor esperar...
          </div>
        )
      }
    </div>
  );
}
