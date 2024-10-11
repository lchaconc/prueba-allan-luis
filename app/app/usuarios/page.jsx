"use client";
import { useState, useEffect } from "react";
import TablaPaginada from "@/components/TablaPaginada";
import BuscarPalabras from "@/components/BuscarPalabras";
import endpoints from "@/_endpoints";
import { getData, deleteRecord, sendData, sendDataNew } from "@/utils/data";
import { FaUserPlus } from "react-icons/fa6";
import alertify from "alertifyjs";
import ModalGeneral from "@/components/ModalGeneral";
import { ToastContainer, toast } from "react-toastify";
import configToast from "@/config/toast.config.json";
import Link from "next/link";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState(null);
  const [filtrados, setFiltrados] = useState(null);
  const [modoModal, setModoModal] = useState(null);
  const [seleccionado, setSeleccionado] = useState(null);
  const [enviandoDatos, setEnviandoDatos] = useState(false);

  //Estado que maneja el modal
  const [show, setShow] = useState(false);

  useEffect(() => {
    setup();
  }, []);

  useEffect(() => {
    usuarios && setFiltrados(usuarios);
  }, [usuarios]);

  const setup = async () => {
    //console.log(endpoints.getUsuarios);
    setUsuarios(await getData(endpoints.getUsuarios));
  };

  const handleEliminarUsuario = (id) => {
    alertify.confirm(
      "¿Desea elminar el usuario?",
      async () => {
        const respuesta = await deleteRecord(endpoints.deleteUsuario, id);
        console.log(respuesta);
        if (respuesta.success) {
          setup();
        } else {
          console.log("Error no se eliminó el usuario");
        }
      },
      () => console.log("Acción cancelada")
    );
  };

  const handleAbrirModal = (id, modo) => {
    if (modo === "edicion") {
      setSeleccionado(filtrados.find((item) => item.id === id));
    } else {
      setSeleccionado(null);
    }

    setModoModal(modo);
    setShow(true);
  };

  const enviarDatos = (datos, id) => {
    console.log(datos);
    console.log(id);
    alertify.confirm(
      "Aplicación usuarios",
      "¿Desea actualizar los datos del usuario?",
      async () => {
        setEnviandoDatos(true);
        const respuesta = await sendData(
          endpoints.updateUsuario,
          datos,
          id,
          "PUT"
        );
        console.log(respuesta);
        if (respuesta.success) {
          setShow(false);
          toast.success("¡Datos actualizados correctamente!", configToast);
          setup();
          setEnviandoDatos(false);
        } else {
          console.log("No se actualizó el usuario");
        }
      },
      () => console.log("Acción cancelada")
    );
  };

  const enviarDatosNuevoUsuario = (datos) => {
    console.log("Entré a anviar datos de nuevo usuario");
    console.log("Estos son los datos que se tienen que enviar a la base de datos",datos);
    alertify.confirm(
      "Aplicación usuarios",
      "¿Desea guardar los datos del nuevo usuario?",
      async () => {
        setEnviandoDatos(true);
        const respuesta = await sendDataNew(
          endpoints.setNewUsuario,
          datos,
          "POST"
        );
        console.log(respuesta);
        if (respuesta.success) {
          setShow(false);
          toast.success("¡Datos guardados correctamente!", configToast);
          setup();
          setEnviandoDatos(false);
        } else {
          console.log("No se guardó el nuevo usuario");
        }
      },
      () => console.log("Acción cancelada")
    );
    
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
      <div className="container">
        <ToastContainer />

        <ModalGeneral
          show={show}
          setShow={setShow}
          modoModal={modoModal}
          seleccionado={seleccionado}
          enviarDatos={enviarDatos}
          enviarDatosNuevoUsuario = {enviarDatosNuevoUsuario}
          enviandoDatos={enviandoDatos}
        />

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
            <button
              className="btn btn-success"
              onClick={() => handleAbrirModal(null, "insertar")}
            >
              <FaUserPlus /> Agregar usuario
            </button>
          </div>
        </div>

        <BuscarPalabras array={usuarios} setFiltrados={setFiltrados} />

        {filtrados ? (
          <TablaPaginada
            data={filtrados}
            recordsPerPage={10}
            handleEliminarUsuario={handleEliminarUsuario}
            handleAbrirModal={handleAbrirModal}
          />
        ) : (
          <div className="alert alert-info">
            {" "}
            Cargando datos. Por favor espere...{" "}
          </div>
        )}
      </div>
    </>
  );
}
