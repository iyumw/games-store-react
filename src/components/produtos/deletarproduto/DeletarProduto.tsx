import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Produto from "../../../models/Produto";
import { buscar, deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";

function DeletarProduto() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [produto, setProduto] = useState<Produto>({} as Produto);

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/produtos/${id}`, setProduto);
    } catch (error: any) {
      console.error("Erro ao buscar produto:", error);
      if (error.toString().includes("403")) {
        alert("Sua sessão expirou. Faça login novamente.");
        navigate("/");
      } else {
        alert("Erro ao carregar o produto.");
      }
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarProduto() {
    setIsLoading(true);

    try {
      await deletar(`/produtos/${id}`);

      alert("Produto deletado com sucesso!");
      navigate("/produtos"); // Redireciona após a deleção
    } catch (error: any) {
      console.error("Erro ao deletar produto:", error);
      if (error.toString().includes("403")) {
        alert("Sua sessão expirou. Faça login novamente.");
        navigate("/");
      } else {
        alert("Erro ao deletar o produto.");
      }
    }

    setIsLoading(false);
  }

  function retornar() {
    navigate("/produtos");
  }

  if (!produto.nome) {
    return (
      <div className="flex justify-center items-center h-screen bg-[var(--color-medium-dark-blue)]">
        <RotatingLines
          strokeColor="var(--color-green-water)"
          strokeWidth="5"
          animationDuration="0.75"
          width="50"
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--color-medium-dark-blue)] p-4">
      <div className="container w-full max-w-2xl mx-auto p-6 bg-[var(--color-dark-blue)] rounded-lg shadow-lg flex flex-col items-center">
        <h1 className="text-4xl text-center my-6 text-[var(--color-soft-white)] font-bold">
          Deletar Produto
        </h1>

        <p className="text-center text-[var(--color-light-gray)] mb-6">
          Você tem certeza de que deseja apagar o produto a seguir?
        </p>

        <div className="border border-[var(--color-green-water)] rounded-lg overflow-hidden bg-[var(--color-dark-blue)] w-full">
          <header className="py-3 px-6 bg-[var(--color-green-water)] text-[var(--color-dark-blue)] font-bold text-2xl text-center">
            {produto.nome}
          </header>
          <div className="p-6 flex flex-col items-center">
            <img
              src={produto.foto}
              alt={produto.nome}
              className="w-48 h-48 object-cover mb-4 rounded-lg"
            />
            <p className="text-[var(--color-light-gray)]">
              <span className="font-semibold">Preço:</span> R$ {produto.preco}
            </p>
            <p className="text-[var(--color-light-gray)]">
              <span className="font-semibold">Categoria:</span> {produto.categoria?.tipo}
            </p>
          </div>
          <div className="flex">
            <button
              className="flex-1 bg-[var(--color-green-water)] hover:bg-[var(--color-green-water-hover)] text-[var(--color-dark-blue)] font-bold py-3 transition-colors"
              onClick={retornar}
            >
              Não, voltar
            </button>
            <button
              className="flex-1 bg-[var(--color-vibrant-purple)] hover:bg-purple-hover text-[var(--color-soft-white)] font-bold py-3 flex items-center justify-center transition-colors"
              onClick={deletarProduto}
            >
              {isLoading ? (
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="24"
                  visible={true}
                />
              ) : (
                <span>Sim, deletar</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletarProduto;