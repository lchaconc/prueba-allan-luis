"use client"
import { useState, useEffect } from "react";
import TablaPaginada from "@/components/TablaPaginada";
import BuscarPalabras from "@/components/BuscarPalabras";
import endpoints from "@/_endpoints";
import { getData, delRecord } from "@/utils/data";
import alertify from "alertifyjs";
import { toast } from "react-toastify";
import { normalToast } from "@/config/toastify.config";
import Gmodal from "@/components/Gmodal";



import { FaUserPlus } from "react-icons/fa6";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState(null);
  const [filtrados, setFiltrados] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setup();
  }, []);

  useEffect(() => {
    usuarios && setFiltrados(usuarios);
  }, [usuarios]);

  const setup = async () => {
    console.log(endpoints.getUsuarios);
    setUsuarios(await getData(endpoints.getUsuarios));
  };


  const handleEliminarRegistro =(id)=> {
    alertify.confirm( "Desea eliminar el resgistro",  
      async () => {
        const res = await delRecord( endpoints.delUsuario, id );
        console.log(res);
        if (res.success) {
          toast.success ( res.message, normalToast )
          setup();           
        } else {
          toast.error ( res.message, normalToast )
        }
              
      }
      , ()=> console.log("Acción cancelada")
    
       )
  }


  const handleAbrirModalEdicion =(id)=> {
    const usuario = usuarios.find( usuario => usuario.id === id  );
    console.log(usuario);    
    setShowModal(true)
  }


  return (
    <div className="container">

      <Gmodal showModal={showModal} setShowModal={setShowModal} />

      <div className="row mt-2">
        <div className="col-12">
          <h1>Usuarios</h1>
        </div>
      </div>

      <div className="row mt-2 mb-3">
        <div className="col-sm-9">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At nostrum
          sed a vero officia repudiandae obcaecati quisquam itaque qui!
          Corporis, eligendi nemo! Autem recusandae eius quas aspernatur dicta
          provident delectus?
        </div>

        <div className="col-sm-3 text-end">
          <button className="btn btn-success">
            <FaUserPlus /> Agregar usuario
          </button>
        </div>
      </div>

      <BuscarPalabras array={usuarios} setFiltrados={setFiltrados} />

      {filtrados ? (
        <TablaPaginada 
        data={filtrados} 
        recordsPerPage={5} 
        handleEliminarRegistro={handleEliminarRegistro}
        handleAbrirModalEdicion={handleAbrirModalEdicion}
        />
      ) : (
        <div className="alert alert-info">
          {" "}
          Cargando datos. Por favor espere...{" "}
        </div>
      )}
    </div>
  );
}
