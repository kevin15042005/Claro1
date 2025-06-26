import React, { useState } from "react";
import Papa from "papaparse";

export default function CreateCSV({ setShowCSVPopup, obtenerInformacion }) {
  const [archivo, setArchivo] = useState(null);

  const handleArchivoChange = (e) => {
    const file = e.target.files[0];
    setArchivo(file || null);
  };

  const handleAceptar = () => {
    if (!archivo) {
      alert("Por favor selecciona un archivo CSV.");
      return;
    }

    Papa.parse(archivo, {
      header: true,
      skipEmptyLines: true,
      complete: async function (results) {
        const datos = results.data.map((row) => ({
          nodo: row["nodo"],
          tec: row["tec"],
          tipo: row["tipo"],
          tiempo: Math.floor(Date.now() / 1000),
        }));

        for (const dato of datos) {
          await fetch(`http://100.123.27.39:4000/nodes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dato),
          });
        }

        alert("Se subieron los registros");
        setShowCSVPopup(false);
        obtenerInformacion();
      },
    });
  };

  return (
    <div
      className="fixed inset-0 bg-white flex justify-center items-center z-50"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
    >
      <div className="rounded-[20px] bg-red-600 p-6 text-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-4">
            Selecciona archivo CSV
          </h2>
            <input
              className="border p-2 rounded w-full"
              type="file"
              accept=".csv"
              onChange={handleArchivoChange}
            />
          </div>
          
          <div className="flex justify-center gap-4">
            <button
              className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
              onClick={handleAceptar}
            >
              Aceptar
            </button>
            <button
              className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
              onClick={() => setShowCSVPopup(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
