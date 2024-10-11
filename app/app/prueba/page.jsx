"use client";
import { useState } from "react";
import Padre from "@/components/pruebas/Padre";
import Link from "next/link";

export default function Prueba() {
  const [puntos, setPuntos] = useState(0);

  const handleIncrementar = () => {
    setPuntos(puntos + 1);
  };

  const handleReset = () => {
    setPuntos(0);
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <form className="container-fluid justify-content-start">
          <button className="btn btn-outline-success me-2" type="button">
            <Link href="/">Inicio</Link>
          </button>
        </form>
      </nav>

      <div>
        <h1>PÁGINA DE PRUEBA</h1>

        <Padre
          puntos={puntos}
          handleIncrementar={handleIncrementar}
          handleReset={handleReset}
        />
      </div>
    </>
  );
}
