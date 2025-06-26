import iconSave from "../../assets/icons/save.svg";
import iconExit from "../../assets/icons/exit.svg";
import iconCancelar from "../../assets/icons/cancelar.svg";

export default function CrearPopup({
  id,
  setId,
  nodo,
  setNodo,
  technology,
  setTechnology,
  tipo,
  setTipo,
  setShowCreatePopup,
  setShowConfirmPopup,
  setShowSelector,
}) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(255,255,255,0.8)" }}
    >
      <div className="bg-red-700 p-4 rounded-md w-full max-w-md mx-4 my-8 max-h-[90vh] overflow-y-auto">
        <section className="bg-white p-3 rounded-md mb-3">
          <h3 className="font-serif text-xl text-center">
            Formulario a crear {new Date().toLocaleDateString()}
          </h3>
        </section>

        <form className="bg-white p-3 rounded-md">
         

          {/* Campo Nodo */}
          <div className="mb-4">
            <label className="block font-bold text-center mb-1">Nodo</label>
            <input
              type="text"
              value={nodo}
              onChange={(e) => setNodo(e.target.value)}
              placeholder="Nodo"
              className="w-full p-2 border border-gray-300 rounded text-center"
              required
            />
          </div>

          {/* Campo Tecnología */}
          <div className="mb-4">
            <label className="block font-bold text-center mb-1">
              Tecnología
            </label>
            <select
              value={technology}
              onChange={(e) => setTechnology(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option className="text-center" value="">
                Seleccione Tecnología
              </option>
              <option className="text-center" value="Poller">
                Poller
              </option>
              <option className="text-center" value="Harmonic">
                Harmonic
              </option>
              <option className="text-center" value="Cisco">
                Cisco
              </option>
              <option className="text-center" value="Aura">
                Aura
              </option>
            </select>
          </div>

          {/* Campo Tipo */}
          <div className="mb-4">
            <label className="block font-bold text-center mb-1">Tipo</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option className="text-center" value="Seleccion">
                Selección Tipo
              </option>
              <option className="text-center" value="Optico">
                Óptico
              </option>
              <option className="text-center" value="Virtual">
                Virtual
              </option>
            </select>
          </div>

          {/* Campo Hora */}
          <div className="mb-4">
            <label className="block font-bold text-center mb-1">Hora</label>
            <input
              type="text"
              value={new Date().toLocaleTimeString("es-CO")}
              readOnly
              className="w-full p-2 border border-gray-300 rounded text-center bg-gray-100"
            />
          </div>
        </form>

        {/* Botones */}
        <div className="flex justify-end gap-3 mt-3">
          <button
            className="bg-white hover:bg-green-500 rounded p-2"
            onClick={() => setShowConfirmPopup(true)}
          >
            <img className="h-6 w-6" src={iconSave} alt="Guardar" />
          </button>
          <button
            className=" bg-white  py-1 px-4 rounded hover:bg-red-400"
            onClick={() => {
              setShowCreatePopup(false);
              setShowSelector(true);
            }}
          >
            <img className="h-5 w-5" src={iconCancelar} alt="Volver" />
          </button>

          <button
            className="bg-white hover:bg-red-500 rounded p-2"
            onClick={() => setShowCreatePopup(false)}
          >
            <img className="h-6 w-6" src={iconExit} alt="Cancelar" />
          </button>
        </div>
      </div>
    </div>
  );
}
