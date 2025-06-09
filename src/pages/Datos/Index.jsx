import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar/Index";
import CrearPopup from "../../components/Create/Index";
import ConfirmarCreacion from "../../components/ConfirmCreate/Index";
import ActualizarPopup from "../../components/Update/Index";
import ConfirmarActualizacion from "../../components/ConfirmUpdate/Index";
import EliminarPopup from "../../components/Delete/Index";
import iconAdd from "../../assets/icons/add.svg";
import iconLogin from "../../assets/icons/login.svg";
import iconUpdate from "../../assets/icons/update.svg";
import iconDelete from "../../assets/icons/delete.svg";

export default function Datos() {
  // Estados para el formulario
  const [nodo, setNodo] = useState("");
  const [tec, setTec] = useState("");
  const [tipo, setTipo] = useState("");
  const [information, setInformation] = useState([]);
  const [status, setStatus] = useState({});

  // Estados para las operaciones CRUD
  const [idOperacion, setIdOperacion] = useState("");
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showUpdateConfirmPopup, setShowUpdateConfirmPopup] = useState(false);
  const [searchInformation, setSearchInformation] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [lastUpdates, setLastUpdates] = useState({});
  const [showIdUpdatePopup, setShowIdUpdatePopup] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState(null);

  const navigate = useNavigate();

  // Limpiar datos del formulario
  const limpiarDatos = () => {
    setNodo("");
    setTec("");
    setTipo("");
    setIdOperacion("");
    setSelectedItem(null);
  };

  // Validar campos del formulario
  const validarCampos = () => {
    if (!nodo || !tec || !tipo) {
      toast.warn("Todos los campos son requeridos");
      return false;
    }
    return true;
  };

  // Obtener información del servidor
  const obtenerInformacion = async () => {
    try {
      const res = await fetch("http://100.123.27.39:4000/nodes");
      const data = await res.json();
      setInformation(data);

      const statusData = {};
      data.forEach((item) => {
        statusData[item.id] = Math.random() > 0.3;
      });
      setStatus(statusData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    obtenerInformacion();

    const interval = setInterval(() => {
      obtenerInformacion();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Manejar la creación de datos
  const handleSubmit = async () => {
    if (!validarCampos()) return;

    try {
      const res = await fetch("http://100.123.27.39:4000/nodes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nodo,
          tec,
          tipo,
          tiempo: new Date().getTime() / 1000,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Registro creado exitosamente");
        limpiarDatos();
        setShowConfirmPopup(false);
        setShowCreatePopup(false);
        await obtenerInformacion();
      } else {
        toast.error("Error: " + (data.message || "Error al crear registro"));
      }
    } catch (err) {
      console.error("Error al crear información", err);
      toast.error("Error en la conexión con el servidor");
    }
  };

  // Manejar la actualización de datos
  const handleUpdate = async () => {
    setShowUpdateConfirmPopup(false);

    if (!idOperacion || !validarCampos()) {
      toast.error("ID inválido o campos incompletos");
      return;
    }

    try {
      const res = await fetch(
        `http://100.123.27.39:4000/nodes/${idOperacion}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nodo,
            tec,
            tipo,
            tiempo: new Date().getTime() / 1000,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Registro actualizado correctamente");
        limpiarDatos();
        setShowUpdatePopup(false);
        await obtenerInformacion();
      } else {
        toast.error("Error: " + (data.message || "Error al actualizar"));
      }
    } catch (err) {
      console.error("Error al actualizar", err);
      toast.error("Error en la conexión con el servidor");
    }
  };

  // Manejar la eliminación de datos
  const handleDelete = async () => {
    if (!idOperacion) {
      toast.warn("Ingrese un ID válido");
      return;
    }

    try {
      const res = await fetch(
        `http://100.123.27.39:4000/nodes/${idOperacion}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Registro eliminado correctamente");
        setIdOperacion("");
        setShowDeletePopup(false);
        await obtenerInformacion();
      } else {
        toast.error(data.error || "Error al eliminar registro");
      }
    } catch (err) {
      console.error("Error al eliminar", err);
      toast.error("Error en la conexión con el servidor");
    }
  };

  // Preparar formulario para edición
  const prepararEdicion = (item) => {
    setSelectedItem(item);
    setNodo(item.nodo);
    setTec(item.tec);
    setTipo(item.tipo);
    setIdOperacion(item.id);
    setShowUpdatePopup(true);
  };

  // Cerrar sesión
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Filtrar información
const filteredInformation = information.filter((item) =>
  item.id.toString().includes(searchInformation) ||
  item.nodo.toLowerCase().includes(searchInformation.toLowerCase()) ||
  item.tipo.toLowerCase().includes(searchInformation.toLowerCase()) ||
  item.tec?.toLowerCase().includes(searchInformation.toLowerCase())
);

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Navbar className="fixed top-0 left-0 w-full z-50 shadow-md" />
      </div>

      {/* Popups */}
      {showCreatePopup && (
        <CrearPopup
          nodo={nodo}
          setNodo={setNodo}
          tec={tec}
          setTec={setTec}
          tipo={tipo}
          setTipo={setTipo}
          setShowConfirmPopup={setShowConfirmPopup}
          setShowCreatePopup={setShowCreatePopup}
        />
      )}

      {showConfirmPopup && (
        <ConfirmarCreacion
          nodo={nodo}
          tec={tec}
          tipo={tipo}
          handleSubmit={handleSubmit}
          setShowConfirmPopup={setShowConfirmPopup}
        />
      )}

      {showUpdatePopup && (
        <ActualizarPopup
          idOperacion={idOperacion}
          nodo={nodo}
          setNodo={setNodo}
          tec={tec}
          setTec={setTec}
          tipo={tipo}
          setTipo={setTipo}
          selectedItem={selectedItem}
          setShowUpdateConfirmPopup={setShowUpdateConfirmPopup}
          setShowUpdatePopup={setShowUpdatePopup}
        />
      )}

      {showUpdateConfirmPopup && (
        <ConfirmarActualizacion
          idOperacion={idOperacion}
          nodo={nodo}
          tec={tec}
          tipo={tipo}
          handleUpdate={handleUpdate}
          setShowUpdateConfirmPopup={setShowUpdateConfirmPopup}
        />
      )}

      {showDeletePopup && (
        <EliminarPopup
          idOperacion={idOperacion}
          information={information}
          handleDelete={handleDelete}
          setShowDeletePopup={setShowDeletePopup}
        />
      )}

      <main className="flex-1 overflow-y-auto p-4 mt-40 ">
        {/* Contenedor del contenido */}
        <div className="bg-white p-4 md:p-6 rounded-md w-full max-w-6xl mx-auto shadow-sm">
          <h1 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-6">
            Hive (Desplegado)
          </h1>

          {/* Controles superiores */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-4 md:mb-6">
            <input
              type="text"
              placeholder="Buscar Item"
              value={searchInformation}
              className="p-2 rounded-md border border-gray-300 w-full md:w-auto"
              onChange={(e) => setSearchInformation(e.target.value)}
            />

            <div className="flex gap-2 w-full md:w-auto mt-2 md:mt-0">
              <button
                className="p-2 rounded-md border border-gray-300 hover:bg-green-500 transition-colors flex items-center justify-center w-full md:w-auto"
                onClick={() => setShowCreatePopup(true)}
              >
                <img
                  src={iconAdd}
                  alt="Add"
                  className="h-5 w-5 md:h-6 md:w-6"
                />
                <span className="ml-2 md:hidden">Crear</span>
              </button>
              <button
                className="p-2 rounded-md border border-gray-300 hover:bg-red-500 transition-colors flex items-center justify-center w-full md:w-auto"
                onClick={logout}
              >
                <img
                  src={iconLogin}
                  alt="Login"
                  className="h-5 w-5 md:h-6 md:w-6"
                />
                <span className="ml-2 md:hidden">Salir</span>
              </button>
            </div>
          </div>

          {/* Tabla */}
          <div className="bg-gray-200 p-2 md:p-4 rounded-lg overflow-x-auto">
            <div className="max-h-[500px] overflow-y-auto">
              {/* Versión para móviles (tarjetas) */}
              <div className="md:hidden space-y-3">
                {filteredInformation.map((item) => {
                  const ahora = new Date().getTime() / 1000;
                  const tiempoItem = item.tiempo;
                  const diferenciaMinutos = (ahora - tiempoItem) / 60;
                  const sinNovedad = diferenciaMinutos >= 5;
                  const tiempoExcedido = diferenciaMinutos >= 15;

                  return (
                    <div
                      key={item.id}
                      className="bg-white p-3 rounded-md shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold">{item.nodo}</p>
                          <p className="text-sm text-gray-600">ID: {item.id}</p>
                        </div>
                        <span
                          className={`inline-block w-3 h-3 rounded-full ${
                            sinNovedad ? "bg-green-500" : "bg-yellow-500"
                          }`}
                        ></span>
                      </div>

                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        <div
                          className={`relative ${
                            tiempoExcedido ? "bg-red-100 p-1 rounded" : ""
                          }`}
                        >
                          <p className="text-gray-500">Tiempo</p>
                          <div className="group inline-block relative">
                            <p>
                              {item.tiempo
                                ? new Date(
                                    item.tiempo * 1000
                                  ).toLocaleTimeString("es-CO")
                                : "N/A"}
                            </p>
                            {tiempoExcedido && (
                              <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 whitespace-nowrap">
                                Más de 15 minutos
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-800"></div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-500">Tipo</p>
                          <p>{item.tipo}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Tecnología</p>
                          <p>{item.technology}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Aviso</p>
                          <p>{sinNovedad ? "Sin novedad" : "En limbo"}</p>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 mt-3">
                        <button
                          className="p-1 bg-gray-100 hover:bg-yellow-500 rounded"
                          onClick={() => prepararEdicion(item)}
                        >
                          <img
                            className="h-4 w-4"
                            src={iconUpdate}
                            alt="Editar"
                          />
                        </button>
                        <button
                          className="p-1 bg-gray-100 hover:bg-red-500 rounded"
                          onClick={() => {
                            setIdOperacion(item.id);
                            setShowDeletePopup(true);
                          }}
                        >
                          <img
                            className="h-4 w-4"
                            src={iconDelete}
                            alt="Eliminar"
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Versión para desktop (tabla) */}
              <table className="hidden md:table w-full">
                <thead className="sticky top-0 bg-gray-800">
                  <tr>
                    <th className="px-3 py-2 text-left font-bold text-white">ID</th>
                    <th className="px-3 py-2 text-left font-bold text-white">NODO</th>
                    <th className="px-3 py-2 text-left font-bold text-white">TIEMPO</th>
                    <th className="px-3 py-2 text-left font-bold text-white">AVISO</th>
                    <th className="px-3 py-2 text-left font-bold text-white">TIPO</th>
                    <th className="px-3 py-2 text-left font-bold text-white">
                      TECNOLOGÍA
                    </th>
                    <th className="px-3 py-2 text-left font-bold text-white">ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInformation.map((item) => {
                    const ahora = new Date().getTime() / 1000;
                    const tiempoItem = item.tiempo;
                    const diferenciaMinutos = (ahora - tiempoItem) / 60;
                    const sinNovedad = diferenciaMinutos >= 5;
                    const tiempoExcedido = diferenciaMinutos >= 15;

                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-100 border-b border-gray-200"
                      >
                        <td className="px-3 py-2">{item.id}</td>
                        <td className="px-3 py-2">{item.nodo}</td>
                        <td
                          className={`px-3 py-2 whitespace-nowrap relative ${
                            tiempoExcedido ? "bg-red-400 rounded-sm" : ""
                          }`}
                        >
                          <div className="group inline-block">
                            {item.tiempo
                              ? new Date(item.tiempo * 1000).toLocaleString(
                                  "es-CO",
                                  {
                                    year: "2-digit",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )
                              : "N/A"}
                            {tiempoExcedido && (
                              <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 whitespace-nowrap">
                                Más de 15 minutos
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-800"></div>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`inline-block w-3 h-3 rounded-full ${
                                sinNovedad ? "bg-green-500" : "bg-yellow-500"
                              }`}
                            ></span>
                            {sinNovedad ? "Sin novedad" : "En limbo"}
                          </div>
                        </td>
                        <td className="px-3 py-2">{item.tipo}</td>
                        <td className="px-3 py-2">{item.tec}</td>
                        <td className="px-3 py-2">
                          <div className="flex gap-2">
                            <button
                              className="p-1 bg-white hover:bg-yellow-500 rounded transition-colors"
                              onClick={() => prepararEdicion(item)}
                            >
                              <img
                                className="h-4 w-4"
                                src={iconUpdate}
                                alt="Editar"
                              />
                            </button>
                            <button
                              className="p-1 bg-white hover:bg-red-500 rounded transition-colors"
                              onClick={() => {
                                setIdOperacion(item.id);
                                setShowDeletePopup(true);
                              }}
                            >
                              <img
                                className="h-4 w-4"
                                src={iconDelete}
                                alt="Eliminar"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
