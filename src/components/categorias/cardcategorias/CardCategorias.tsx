import { Link } from "react-router-dom";
import Categoria from "../../../models/Categoria";

// Props para receber os dados da categoria
interface CardTemasProps {
  categoria: Categoria; // A categoria que será exibida no card
}

function CardCategorias({ categoria }: CardTemasProps) {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden justify-between shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-[#F8F9FA]">
      <header className="py-2 px-6 bg-light-green-water text-dark-blue font-bold text-2xl text-center">
        Categoria
      </header>
      <div className="p-6 flex flex-col text-2xl bg-soft-white">
        <p className="text-gray-800">
          <span className="font-semibold">Descrição:</span> {categoria.tipo}{" "}
          {/* Exibe a descrição da categoria */}
        </p>
        <p className="text-gray-800">
          <span className="font-semibold">ID:</span> {categoria.id}{" "}
          {/* Exibe o ID da categoria */}
        </p>
      </div>

      <div className="flex">
        {/* Link para editar a categoria */}
        <Link
          to={`/editarCategoria/${categoria.id}`}
          className="w-full text-white bg-green-water hover:bg-green-water-hover 
                        flex items-center justify-center py-2 transition duration-300 ease-in-out"
        >
          <button>Editar</button> {/* Botão de edição */}
        </Link>

        {/* Link para deletar a categoria */}
        <Link
          to={`/deletarCategoria/${categoria.id}`}
          className="text-white bg-vibrant-purple hover:bg-purple-hover w-full 
                    flex items-center justify-center py-2 transition duration-300 ease-in-out"
        >
          <button>Deletar</button> {/* Botão de deleção */}
        </Link>
      </div>
    </div>
  );
}

export default CardCategorias;
