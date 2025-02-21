import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import { buscar, deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";

function DeletarCategoria() {
  const navigate = useNavigate(); // Hook para navegação entre páginas
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado de carregamento para o botão
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria); // Estado para armazenar os dados da categoria

  const { id } = useParams<{ id: string }>(); // Pega o id da categoria a partir da URL

  // Função para buscar a categoria pelo id
  async function buscarPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria); // Chama o serviço para buscar os dados da categoria
    } catch (error: any) {
      console.error("Erro ao buscar categoria:", error); // Log de erro
      if (error.toString().includes("403")) {
        alert("Sua sessão expirou. Faça login novamente."); // Caso a sessão tenha expirado
        navigate("/"); // Redireciona para a página inicial
      } else {
        alert("Erro ao carregar a categoria."); // Outro tipo de erro
      }
    }
  }

  // Hook que chama a função de busca quando o componente é montado ou quando o id muda
  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  // Função para deletar a categoria
  async function deletarCategoria() {
    setIsLoading(true); // Ativa o carregamento

    try {
      await deletar(`/categorias/${id}`); // Chama o serviço para deletar a categoria

      alert("Categoria deletada com sucesso!"); // Exibe mensagem de sucesso
      navigate("/categorias"); // Redireciona para a lista de categorias
    } catch (error: any) {
      console.error("Erro ao deletar categoria:", error); // Log de erro
      if (error.toString().includes("403")) {
        alert("Sua sessão expirou. Faça login novamente."); // Caso a sessão tenha expirado
        navigate("/"); // Redireciona para a página inicial
      } else {
        alert("Erro ao deletar a categoria."); // Outro tipo de erro
      }
    }

    setIsLoading(false); // Desativa o carregamento
  }

  // Função para retornar à lista de categorias sem fazer alterações
  function retornar() {
    navigate("/categorias");
  }

  // Caso a categoria não tenha sido carregada ainda, exibe um spinner de carregamento
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

  // Renderiza a tela de confirmação para deletar a categoria
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
              <span className="font-semibold">Descrição:</span> {categoria.tipo}{" "}
              {/* Exibe a descrição da categoria */}
            </p>
            <p className="text-[var(--color-light-gray)]">
              <span className="font-semibold">ID:</span> {categoria.id}{" "}
              {/* Exibe o ID da categoria */}
            </p>
          </div>
          <div className="flex">
            {/* Botão para cancelar a exclusão e voltar */}
            <button
              className="flex-1 bg-[var(--color-green-water)] hover:bg-[var(--color-green-water-hover)] text-[var(--color-dark-blue)] font-bold py-3 transition-colors"
              onClick={retornar}
            >
              Não, voltar
            </button>
            {/* Botão para confirmar a exclusão */}
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
                <span>Sim, deletar</span> // Exibe o texto "Sim, deletar" ou o ícone de carregamento
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletarCategoria;
