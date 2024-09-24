"use client";
import  { useState, useEffect } from 'react';
import TablaUsuarios from "@/components/TablaUsuarios";
import endpoints from "@/_endpoints";
import { getData } from "@/utils/data";

export default function Usuarios() {

  useEffect(() => {
    setup();
  }, []);

  const setup = async ()=> {
    console.log(endpoints.getUsuarios);
    const array = await getData(endpoints.getUsuarios);
    console.log(array);
    
  } 



  return (
    <TablaUsuarios />
  );
}
