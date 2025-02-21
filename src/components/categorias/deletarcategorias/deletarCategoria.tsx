import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import { buscar, deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";

function DeletarCategoria() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria);
    } catch (error: any) {
      console.error("Erro ao buscar categoria:", error);
      if (error.toString().includes("403")) {
        alert("Sua sessão expirou. Faça login novamente.");
        navigate("/");
      } else {
        alert("Erro ao carregar a categoria.");
      }
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarCategoria() {
    setIsLoading(true);

    try {
      await deletar(`/categorias/${id}`);

      alert("Categoria deletada com sucesso!");
      navigate("/categorias"); // Redireciona após a deleção
    } catch (error: any) {
      console.error("Erro ao deletar categoria:", error);
      if (error.toString().includes("403")) {
        alert("Sua sessão expirou. Faça login novamente.");
        navigate("/");
      } else {
        alert("Erro ao deletar a categoria.");
      }
    }

    setIsLoading(false);
  }

  function retornar() {
    navigate("/categorias");
  }

  if (!categoria.tipo) {
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
          Deletar Categoria
        </h1>

        <p className="text-center text-[var(--color-light-gray)] mb-6">
          Você tem certeza de que deseja apagar a categoria a seguir?
        </p>

        <div className="border border-[var(--color-green-water)] rounded-lg overflow-hidden bg-[var(--color-dark-blue)] w-full">
          <header className="py-3 px-6 bg-[var(--color-green-water)] text-[var(--color-dark-blue)] font-bold text-2xl text-center">
            Categoria
          </header>
          <div className="p-6 flex flex-col items-center">
            <p className="text-[var(--color-light-gray)]">
              <span className="font-semibold">Descrição:</span> {categoria.tipo}
            </p>
            <p className="text-[var(--color-light-gray)]">
              <span className="font-semibold">ID:</span> {categoria.id}
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
              onClick={deletarCategoria}
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

export default DeletarCategoria;