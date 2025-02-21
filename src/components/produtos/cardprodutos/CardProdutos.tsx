import { Link } from "react-router-dom";
import { Pencil, Trash } from "@phosphor-icons/react";
import Produto from "../../../models/Produto";

interface CardProdutosProps {
  produto: Produto;
}

function CardProdutos({ produto }: CardProdutosProps) {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden justify-between shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out bg-[var(--color-soft-white)] w-full max-w-xs mx-auto transform hover:-translate-y-1">
      <div className="flex justify-end p-2">
        
        {/* Botões para editar ou excluir o produto */}
        <Link
          to={`/editarproduto/${produto.id}`}
          className="text-[var(--color-soft-white)] bg-[var(--color-green-water)] hover:bg-[var(--color-green-water-hover)] 
                      flex items-center justify-center p-2 rounded-full transition duration-300 ease-in-out mr-2"
        >
          <Pencil size={20} />
        </Link>
        <Link
          to={`/deletarproduto/${produto.id}`}
          className="text-[var(--color-soft-white)] bg-[var(--color-vibrant-purple)] hover:bg-purple-hover
                      flex items-center justify-center p-2 rounded-full transition duration-300 ease-in-out"
        >
          <Trash size={20} />
        </Link>
      </div>

      {/* Informações do produto */}
      <div className="flex flex-col items-center p-4">
        <img
          src={produto?.foto}
          className="h-48 w-48 object-cover mb-4 rounded-lg"
          alt={produto?.nome}
        />
        <p className="text-xl font-bold text-[var(--color-dark-blue)] mb-2 text-center">
          {produto.nome}
        </p>
        <p className="text-lg text-dark-gray mb-2">R${produto.preco}</p>
        <p className="font-semibold">Categoria:</p> {produto.categoria?.tipo}
      </div>

      {/* Botão para ir para a tela de compra do produto */}
      <Link
        to={`/comprarProduto/${produto.id}`}
        className="text-[var(--color-soft-white)] bg-[var(--color-green-water)] hover:bg-[var(--color-green-water-hover)] w-full
                    flex items-center justify-center py-3 transition duration-300 ease-in-out"
      >
        <button>Comprar</button>
      </Link>
    </div>
  );
}

export default CardProdutos;
