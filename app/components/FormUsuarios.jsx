export default function FormUsuarios() {


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
        />
      </div>


      <button className="btn btn-info" > Enviar </button>



    </div>
    )
    
};
