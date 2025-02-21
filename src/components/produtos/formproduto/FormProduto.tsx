import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import Produto from "../../../models/Produto";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";

function FormProduto() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoria, setCategoria] = useState<Categoria>({ id: 0, tipo: "" });
  const [produto, setProduto] = useState<Produto>({} as Produto);

  const { id } = useParams<{ id: string }>();

  async function buscarProdutoPorId(id: string) {
    try {
      await buscar(`/produtos/${id}`, setProduto);
    } catch (error: any) {
      if (error.toString().includes("403")) {
        navigate("/");
      }
    }
  }

  async function buscarCategoriaPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria);
    } catch (error: any) {
      if (error.toString().includes("403")) {
        navigate("/");
      }
    }
  }

  async function buscarCategorias() {
    try {
      await buscar("/categorias", setCategorias);
      // Ordena as categorias em ordem alfabética
      setCategorias((prevCategorias) =>
        [...prevCategorias].sort((a, b) => a.tipo.localeCompare(b.tipo))
      );
    } catch (error: any) {
      if (error.toString().includes("403")) {
        navigate("/");
      }
    }
  }

  useEffect(() => {
    buscarCategorias();

    if (id !== undefined) {
      buscarProdutoPorId(id);
    }
  }, [id]);

  useEffect(() => {
    setProduto({
      ...produto,
      categoria: categoria,
    });
  }, [categoria]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
      categoria: categoria,
    });
  }

  function retornar() {
    navigate("/produtos");
  }

  async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const novoProduto = {
      ...produto,
      categoria: categoria,
    };

    try {
      if (id !== undefined) {
        await atualizar(`/produtos`, produto, setProduto);
        alert("Produto atualizado com sucesso");
      } else {
        await cadastrar(`/produtos`, produto, setProduto);
        alert("Produto cadastrado com sucesso");
      }
    } catch (error: any) {
      console.error("Erro completo:", error);
      if (error.response) {
        alert(`Erro: ${error.response.data.message || error.response.data}`);
      } else if (error.request) {
        alert("Erro: Nenhuma resposta recebida do servidor.");
      } else {
        alert("Erro ao processar a requisição.");
      }
    }

    setIsLoading(false);
    retornar();
  }

  const carregandoCategoria = categoria.tipo === "";

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--color-medium-dark-blue)] p-4">
      <div className="container flex flex-col mx-auto items-center bg-[var(--color-dark-blue)] p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-4xl text-center my-8 text-[var(--color-soft-white)] font-bold">
          {id !== undefined ? "Editar Produto" : "Cadastrar Produto"}
        </h1>

        <form className="flex flex-col w-full gap-6" onSubmit={gerarNovoProduto}>
          <div className="flex flex-col gap-2">
            <label htmlFor="nome" className="text-[var(--color-soft-white)] font-semibold">
              Nome do Produto
            </label>
            <input
              type="text"
              placeholder="Nome"
              name="nome"
              required
              className="border-2 border-[var(--color-green-water)] rounded p-2 focus:outline-none focus:border-[var(--color-green-water-hover)] bg-[var(--color-medium-dark-blue)] text-[var(--color-soft-white)]"
              value={produto.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="foto" className="text-[var(--color-soft-white)] font-semibold">
              Foto do Produto
            </label>
            <textarea
              placeholder="Link da Foto"
              name="foto"
              required
              className="border-2 border-[var(--color-green-water)] rounded p-2 focus:outline-none focus:border-[var(--color-green-water-hover)] h-20 resize-none bg-[var(--color-medium-dark-blue)] text-[var(--color-soft-white)]"
              value={produto.foto}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setProduto({ ...produto, foto: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="preco" className="text-[var(--color-soft-white)] font-semibold">
              Preço do Produto
            </label>
            <input
              type="number"
              placeholder="Preço"
              name="preco"
              required
              className="border-2 border-[var(--color-green-water)] rounded p-2 focus:outline-none focus:border-[var(--color-green-water-hover)] bg-[var(--color-medium-dark-blue)] text-[var(--color-soft-white)]"
              value={produto.preco}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[var(--color-soft-white)] font-semibold">Categoria do Produto</p>
            <select
              name="categoria"
              id="categoria"
              className="border-2 border-[var(--color-green-water)] rounded p-2 focus:outline-none focus:border-[var(--color-green-water-hover)] bg-[var(--color-medium-dark-blue)] text-[var(--color-soft-white)]"
              onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
            >
              <option value="" selected disabled>
                Selecione uma Categoria
              </option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.tipo}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="rounded disabled:bg-[var(--color-light-green-water)] bg-[var(--color-green-water)] hover:bg-[var(--color-green-water-hover)]
                               text-[var(--color-dark-blue)] font-bold w-full py-3 flex justify-center transition-colors"
            disabled={carregandoCategoria}
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
              <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormProduto;