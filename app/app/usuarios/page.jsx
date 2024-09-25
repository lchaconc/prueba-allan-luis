"use client";
import { useState, useEffect } from "react";
import TablaPaginada from "@/components/TablaPaginada";
import BuscarPalabras from "@/components/BuscarPalabras";
import endpoints from "@/_endpoints";
import { getData } from "@/utils/data";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState(null);
  const [filtrados, setFiltrados] = useState(null);

  useEffect(() => {
    setup();
  }, []);

  useEffect(() => {
    usuarios && setFiltrados(usuarios)
  }, [usuarios]);

  const setup = async () => {
    console.log(endpoints.getUsuarios);
    setUsuarios(await getData(endpoints.getUsuarios));    
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Usuarios</h1>
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
