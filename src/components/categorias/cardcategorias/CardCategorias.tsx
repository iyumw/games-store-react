import { Link } from "react-router-dom";
import Categoria from "../../../models/Categoria";

// Props para receber os dados
interface CardTemasProps {
  categoria: Categoria;
}

function CardCategorias({ categoria }: CardTemasProps) {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden justify-between shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-[#F8F9FA]">
      <header className="py-2 px-6 bg-light-green-water text-dark-blue font-bold text-2xl text-center">
        Categoria
      </header>
      <div className="p-6 flex flex-col text-2xl bg-soft-white">
            <p className="text-gray-800">
              <span className="font-semibold">Descrição:</span> {categoria.tipo}
            </p>
            <p className="text-gray-800">
              <span className="font-semibold">ID:</span> {categoria.id}
            </p>
          </div>

      <div className="flex">
        <Link
          to={`/editarCategoria/${categoria.id}`}
          className="w-full text-white bg-green-water hover:bg-green-water-hover 
                        flex items-center justify-center py-2 transition duration-300 ease-in-out"
        >
          <button>Editar</button>
        </Link>

        <Link
          to={`/deletarCategoria/${categoria.id}`}
          className="text-white bg-vibrant-purple hover:bg-purple-hover w-full 
                    flex items-center justify-center py-2 transition duration-300 ease-in-out"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardCategorias;