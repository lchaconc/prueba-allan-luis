"use client";
import  { useState, useEffect } from 'react';
import TablaPaginada from '@/components/TablaPaginada';
import endpoints from "@/_endpoints";
import { getData } from "@/utils/data";

export default function Usuarios() {

  const [usuarios, setUsuarios] = useState(null);


  useEffect(() => {
    setup();
  }, []);

  const setup = async ()=> {
    console.log(endpoints.getUsuarios);
     setUsuarios(await getData(endpoints.getUsuarios));
    
    
  } 



  return (
    <>
    {
      usuarios ? <TablaPaginada data={usuarios} recordsPerPage={5} /> : 
      <div className="alert alert-info"> Cargando datos. Por favor espere... </div>
    }
    </>
    
  );
}
