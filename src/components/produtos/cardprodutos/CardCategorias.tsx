import { Link } from "react-router-dom";
import Categoria from "../../../models/Categoria";

// Props para receber os dados
interface CardTemasProps {
  categoria: Categoria;
}

function CardCategorias({ categoria }: CardTemasProps) {
  return (
    <div className="border flex flex-col rounded-2xl overflow-hidden justify-between shadow-lg hover:shadow-xl transition-shadow">
      <header className="py-2 px-6 bg-[var(--color-dark-blue)] text-[var(--color-soft-white)] font-bold text-2xl">
        Categoria
      </header>
      <p className="p-8 text-3xl bg-[var(--color-medium-dark-blue)] text-[var(--color-soft-white)] h-full">
        {categoria.tipo}
      </p>

      <div className="flex">
        <Link
          to={`/editarCategoria/${categoria.id}`}
          className="w-full text-[var(--color-soft-white)] bg-[var(--color-green-water)] hover:bg-[var(--color-green-water-hover)] 
                        flex items-center justify-center py-2 transition duration-300 ease-in-out"
        >
          <button>Editar</button>
        </Link>

        <Link
          to={`/deletarCategoria/${categoria.id}`}
          className="text-[var(--color-soft-white)] bg-[var(--color-vibrant-purple)] hover:bg-[#b992df] w-full 
                    flex items-center justify-center py-2 transition duration-300 ease-in-out"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardCategorias;