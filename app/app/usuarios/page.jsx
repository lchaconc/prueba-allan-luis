"use client";
import { useState, useEffect } from "react";
import TablaPaginada from "@/components/TablaPaginada";
import BuscarPalabras from "@/components/BuscarPalabras";
import endpoints from "@/_endpoints";
import { getData, delRecord, sendData } from "@/utils/data";
import alertify from "alertifyjs";
import { toast } from "react-toastify";
import { normalToast } from "@/config/toastify.config";
import Gmodal from "@/components/Gmodal";

import { FaUserPlus } from "react-icons/fa6";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState(null);
  const [filtrados, setFiltrados] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modoModal, setModoModal] = useState(null);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

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

  const handleEliminarRegistro = (id) => {
    alertify.confirm(
      "Desea eliminar el resgistro",
      async () => {
        const res = await delRecord(endpoints.delUsuario, id);
        console.log(res);
        if (res.success) {
          toast.success(res.message, normalToast);
          setup();
        } else {
          toast.error(res.message, normalToast);
        }
      },
      () => console.log("Acción cancelada")
    );
  };

  const handleAbrirModal = (id, modo) => {
    if (modo === "edicion") {
      setUsuarioSeleccionado(usuarios.find((usuario) => usuario.id === id));
      setModoModal("edicion");
    }

    if (modo === "nuevo") {
      setModoModal("nuevo");
      setUsuarioSeleccionado(null);
    }
    setShowModal(true);
  };

  const guardarDatosForm = async (datos, id) => {
    setShowModal(false);
    if (modoModal === "edicion") {
      const res = await sendData(datos, endpoints.updateUsuario, "PUT", id);

      if (res.success) {
        toast.success(res.message, normalToast);
        setup();
      } else {
        toast.error(res.message, normalToast);
      }
    }

    if (modoModal === "nuevo") {
      console.log("Nuevo registro", datos);
      const res = await sendData(datos, endpoints.insertUsuario, "POST", null);

      if (res.success) {
        toast.success(`${res.message} - ID del registro ${res.id}` , normalToast);
        setup();
      } else {
        toast.error(res.message, normalToast);
      }
    }
  };

  return (
    <div className="container">
      <Gmodal
        showModal={showModal}
        setShowModal={setShowModal}
        modoModal={modoModal}
        usuarioSeleccionado={usuarioSeleccionado}
        guardarDatosForm={guardarDatosForm}
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
            onClick={() => handleAbrirModal(null, "nuevo")}
          >
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
          handleAbrirModal={handleAbrirModal}
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
