import React from "react";
import Papa from "papaparse";
export default function CreateCSV({ setShowCSVPopup, obtenerInformacion }) {
  const handlCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
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
        alert("Se subeiron los regsitro");
        setShowCSVPopup(false);
        obtenerInformacion();
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-lg font-semibold mb-4">Subir CSV</h2>
        <input type="file" accept=".csv" onChange={handleCSVUpload} />
        <button
          className="mt-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
          onClick={() => setShowCSVPopup(false)}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
