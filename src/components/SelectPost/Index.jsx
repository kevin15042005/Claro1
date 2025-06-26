export default function SelectPost({
  setShowCreatePopup,
  setShowCSVPopup,
  setShowSelector,
}) {
  return (
    <div className=" fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lgw-80 text-center">
        <h2 className="text-lg font-semibold mb-4">
          Selecciona el tipo de carga{" "}
        </h2>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              setShowCreatePopup(true);
              setShowSelector(false);
            }}
          >
            Unico
          </button>{" "}
          <button
            onClick={() => {
              setShowCSVPopup(false);
              setShowSelector(true);
            }}
          >
            SCV
          </button>
        </div>
      </div>
    </div>
  );
}
