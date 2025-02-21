import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Produto from "../../../models/Produto";
import { buscar, deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";

function DeletarProduto() {
  const navigate = useNavigate(); // Hook para navegação entre páginas
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado de carregamento para o botão
  const [produto, setProduto] = useState<Produto>({} as Produto); // Estado para armazenar os dados do produto

  const { id } = useParams<{ id: string }>(); // Pega o id do produto a partir da URL

  // Função para buscar o produto pelo id
  async function buscarPorId(id: string) {
    try {
      await buscar(`/produtos/${id}`, setProduto); // Chama o serviço para buscar os dados do produto
    } catch (error: any) {
      console.error("Erro ao buscar produto:", error); // Log de erro
      if (error.toString().includes("403")) {
        alert("Sua sessão expirou. Faça login novamente."); // Caso a sessão tenha expirado
        navigate("/"); // Redireciona para a página inicial
      } else {
        alert("Erro ao carregar o produto."); // Outro tipo de erro
      }
    }
  }

  // Hook que chama a função de busca quando o componente é montado ou quando o id muda
  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  // Função para deletar o produto
  async function deletarProduto() {
    setIsLoading(true); // Ativa o carregamento

    try {
      await deletar(`/produtos/${id}`); // Chama o serviço para deletar o produto

      alert("Produto deletado com sucesso!"); // Exibe mensagem de sucesso
      navigate("/produtos"); // Redireciona para a lista de produtos
    } catch (error: any) {
      console.error("Erro ao deletar produto:", error); // Log de erro
      if (error.toString().includes("403")) {
        alert("Sua sessão expirou. Faça login novamente."); // Caso a sessão tenha expirado
        navigate("/"); // Redireciona para a página inicial
      } else {
        alert("Erro ao deletar o produto."); // Outro tipo de erro
      }
    }

    setIsLoading(false); // Desativa o carregamento
  }

  // Função para retornar à lista de produtos sem fazer alterações
  function retornar() {
    navigate("/produtos");
  }

  // Caso o produto não tenha sido carregado ainda, exibe um spinner de carregamento
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

  // Renderiza a tela de confirmação para deletar o produto
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
            {produto.nome} {/* Exibe o nome do produto */}
          </header>
          <div className="p-6 flex flex-col items-center">
            <img
              src={produto.foto}
              alt={produto.nome} // Exibe a foto do produto
              className="w-48 h-48 object-cover mb-4 rounded-lg"
            />
            <p className="text-[var(--color-light-gray)]">
              <span className="font-semibold">Preço:</span> R$ {produto.preco}{" "}
              {/* Exibe o preço */}
            </p>
            <p className="text-[var(--color-light-gray)]">
              <span className="font-semibold">Categoria:</span>{" "}
              {produto.categoria?.tipo} {/* Exibe a categoria */}
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
                <span>Sim, deletar</span> // Exibe o texto "Sim, deletar" ou o ícone de carregamento
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletarProduto;
