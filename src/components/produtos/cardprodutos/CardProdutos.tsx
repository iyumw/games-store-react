import { Link } from "react-router-dom";
import { Pencil, Trash } from "@phosphor-icons/react";
import Produto from "../../../models/Produto";

interface CardProdutosProps {
  produto: Produto;
}

function CardProdutos({ produto }: CardProdutosProps) {
  return (
    <div className="border flex flex-col rounded-2xl overflow-hidden justify-between shadow-lg hover:shadow-xl transition-shadow bg-[var(--color-soft-white)]">
      <div className="flex justify-end p-2">
        <Link
          to={`/editarproduto/${produto.id}`}
          className="text-[var(--color-soft-white)] bg-[var(--color-green-water)] hover:bg-[var(--color-green-water-hover)] 
                      flex items-center justify-center p-2 rounded-full transition duration-300 ease-in-out mr-2"
        >
          <Pencil size={20} />
        </Link>
        <Link
          to={`/deletarproduto/${produto.id}`}
          className="text-[var(--color-soft-white)] bg-[var(--color-vibrant-purple)] hover:bg-[#b992df]
                      flex items-center justify-center p-2 rounded-full transition duration-300 ease-in-out"
        >
          <Trash size={20} />
        </Link>
      </div>

      <div className="flex flex-col items-center p-4">
        <img
          src={produto?.foto}
          className="h-full w-40 object-cover mb-4"
          alt={produto?.nome}
        />
        <p className="text-2xl font-bold text-[var(--color-medium-dark-blue)] mb-2">
          {produto.nome}
        </p>
        <p className="text-xl text-dark-gray mb-2">
          R${produto.preco}
        </p>
        <p className="text-lg text-dark-gray mb-4">
          {produto.categoria?.tipo}
        </p>
      </div>

      <Link
        to={`/comprarProduto/${produto.id}`}
        className="text-[var(--color-soft-white)] bg-[var(--color-vibrant-purple)] hover:bg-[#b992df] w-full
                    flex items-center justify-center py-3 transition duration-300 ease-in-out"
      >
        <button>Comprar</button>
      </Link>
    </div>
  );
}

export default CardProdutos;