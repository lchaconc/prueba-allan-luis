"use client";
import { useState, useEffect } from "react";
import TablaPaginada from "@/components/TablaPaginada";
import BuscarPalabras from "@/components/BuscarPalabras";
import endpoints from "@/_endpoints";
import { getData } from "@/utils/data";
import { FaUserPlus } from "react-icons/fa6";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState(null);
  const [filtrados, setFiltrados] = useState(null);

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

  return (
    <div className="container">
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
        <TablaPaginada data={filtrados} recordsPerPage={5} />
      ) : (
        <div className="alert alert-info">
          {" "}
          Cargando datos. Por favor espere...{" "}
        </div>
      )}
    </div>
  );
}
