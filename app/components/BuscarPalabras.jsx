import { useRef } from 'react';
import { PiBroom } from "react-icons/pi";


export default function BuscarPalabras({ array, setFiltrados  }) {
  //console.log("array desde el buscador", array);
  const palabraRef = useRef(null);


  const handleReset =()=> {
    palabraRef.current.value=""
    setFiltrados(array)
  }

  const quitarAcentos = (palabra) => {
    return palabra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleObtenerPalabras = (e) => {
    let palabras = e.target.value.toLowerCase();
    palabras = palabras.split(" ");
    buscarCoincidencias(palabras);
  };

  
  function buscarCoincidencias(palabras) {
    const resultados = [];

    array.forEach((item) => {
      const nombre = quitarAcentos(item.nombre.toLowerCase());
      const apellido = quitarAcentos(item.apellido.toLowerCase());
      const correo = quitarAcentos(item.correo.toLowerCase());

      

      const coincidencia = palabras.every((palabra) => {
        return (
          nombre.includes(quitarAcentos(palabra)) ||
          apellido.includes(quitarAcentos(palabra)) ||
          correo.includes(quitarAcentos(palabra))          
        );
      });

      if (coincidencia) {
        resultados.push(item);
      }
    });

    setFiltrados(resultados);
  }

  return (
    <div className="row">
      <div className="col-sm-10">
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Búsqueda
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Digite la palabra o parte de ella"
            //onChange={handleObtenerPalabras}
            onInput={handleObtenerPalabras}
            ref={palabraRef}
          />
        </div>
      </div>
      <div className="col-sm-2 text-end">
        <button
        className='btn btn-outline-secondary'
        onClick={handleReset}
        > <PiBroom /> Reiniciar
        </button>
      </div>
    </div>
  );
}
