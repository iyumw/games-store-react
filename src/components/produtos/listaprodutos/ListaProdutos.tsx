import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { buscar } from "../../../services/Service";
import Produto from "../../../models/Produto";
import CardProdutos from "../cardprodutos/CardProdutos";
import { BeatLoader } from "react-spinners";

function ListaProdutos() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([]);

  // Função para buscar produtos na API
  async function buscarProdutos() {
    try {
      await buscar("/produtos", setProdutos);
    } catch (error: any) {
      // Se houver erro 403, redireciona para a página inicial
      if (error.toString().includes("403")) {
        navigate("/");
      }
    }
  }

  // Busca os produtos sempre que o número de produtos mudar
  useEffect(() => {
    buscarProdutos();
  }, [produtos.length]);

  return (
    <>
      {/* Exibe o loader enquanto os produtos estão sendo carregados */}
      {produtos.length === 0 && (
        <div className="flex justify-center items-center h-screen">
          <BeatLoader color="var(--color-green-water)" />
        </div>
      )}
      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col mx-2">
          <div
            className="container mx-auto my-4 
                          grid grid-cols-1 sm:grid-cols-2 
                          md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {/* Renderiza os produtos em formato de cards */}
            {produtos.map((produto) => (
              <CardProdutos key={produto.id} produto={produto} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaProdutos;
