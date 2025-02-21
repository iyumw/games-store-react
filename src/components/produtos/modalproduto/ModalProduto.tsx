import Popup from "reactjs-popup";

import "reactjs-popup/dist/index.css";
import "./ModalProduto.css"
import FormProduto from "../formproduto/FormProduto";

function ModalProduto() {
  return (
    <>
      <Popup
        trigger={
          <button className="rounded bg-blue-500 text-white border-green-water border-2 py-2 px-4 cursor-pointer hover:bg-green-water hover:border-blue-900 transition">
            Novo Produto
          </button>
        }
        modal
      >
        <FormProduto />
      </Popup>
    </>
  );
}

export default ModalProduto;
