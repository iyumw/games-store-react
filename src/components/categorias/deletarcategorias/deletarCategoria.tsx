import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { buscar, deletar } from "../../../services/Service";
import Categoria from "../../../models/Categoria";

function DeletarCategoria() {
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  // Função para buscar a categoria pelo ID
  async function buscarPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria);
    } catch (error: any) {
      alert("Ocorreu um erro ao buscar a categoria. Verifique o console para mais detalhes.");
      console.error(error);
    }
  }

  // Busca a categoria pelo ID quando o componente é montado ou o ID muda
  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  // Função para deletar a categoria
  async function deletarCategoria() {
    setIsLoading(true);

    try {
      await deletar(`/categorias/${id}`);
      alert("Categoria apagada com sucesso");
    } catch (error: any) {
      alert("Não foi possível apagar a categoria. Tente novamente.");
      console.error(error);
    }
    setIsLoading(false);
    retornar();
  }

  // Função para retornar à lista de categorias
  function retornar() {
    navigate("/categorias");
  }

  return (
    <div className="w-full min-h-screen bg-[var(--color-dark-blue)] p-4">
      <h1 className="text-4xl text-center my-4 text-[var(--color-vibrant-purple)]">Deletar Categoria</h1>
      <p className="text-center font-semibold mb-4 text-[var(--color-medium-gray)]">
        Você tem certeza de que deseja apagar a categoria a seguir?
      </p>
      <div className="w-full md:w-1/2 lg:w-1/3 mx-auto">
        <div className="border flex flex-col rounded-2xl overflow-hidden justify-between bg-[var(--color-dark-blue)]">
          <header className="py-2 px-6 bg-[var(--color-green-water)] text-[var(--color-soft-white)] font-bold text-2xl">
            Categoria
          </header>
          <p className="p-8 text-3xl bg-[var(--color-medium-dark-blue)] text-[var(--color-soft-white)] h-full">
            {categoria.tipo}
          </p>
          <div className="flex">
            <button
              className="text-[var(--color-soft-white)] bg-[var(--color-dark-gray)] hover:bg-[var(--color-dark-blue)] w-full py-2"
              onClick={retornar}
            >
              Não
            </button>
            <button
              className="w-full text-[var(--color-soft-white)] bg-[var(--color-red-400)] hover:bg-[var(--color-red-600)] flex items-center justify-center"
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
                <span>Sim</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletarCategoria;
