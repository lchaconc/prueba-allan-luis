import Hijo from "./Hijo";

export default function Padre({ puntos, handleIncrementar, handleReset }) {


  return (
    <>
      <h1>Padre</h1>

      <div className="row">
        <div className="col-6">
          <button onClick={handleIncrementar} className="btn btn-info">
            Incrementar
          </button>

            <br />

          <button onClick={handleReset} className="btn btn-danger mt-4" >
            Resetear
          </button>
        </div>

        <div className="col-6">
          <Hijo puntos={puntos} />
        </div>
      </div>
    </>
  );
}
