import iconExit from "../../assets/icons/exit.svg";

export default function SelectPost({
  setShowCreatePopup,
  setShowCSVPopup,
  setShowSelector,
}) {
  return (
    <div
      className=" fixed inset-0  bg-white  flex justify-center items-center z-50 "
      style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
    >
      <div className=" rounded-[20px] bg-red-600 p-6  text-center">
        <div className=" rounded-[20px] bg-white py-8  text-center">
          <h2 className="text-lg font-semibold m-4 p-2">
            Selecciona el tipo de carga{" "}
          </h2>
          <div className="flex justify-center gap-6">
            <button
              className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
              onClick={() => {
                setShowCreatePopup(true);
                setShowSelector(false);
              }}
            >
              Unico
            </button>{" "}
            <button
              className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
              onClick={() => {
                setShowCSVPopup(true);
                setShowSelector(false);
              }}
            >
              SCV
            </button>
          </div>
         
        </div>
         <div className="flex justify-end my-2">
            <button
              className="bg-white hover:bg-red-500 rounded p-2"
              onClick={() => setShowSelector(false)}
            >
              <img className="h-6 w-6" src={iconExit} alt="Cancelar" />
            </button>
          </div>
      </div>
    </div>
  );
}
