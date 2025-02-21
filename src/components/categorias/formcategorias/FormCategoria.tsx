import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import Categoria from "../../../models/Categoria";
import { atualizar, buscar, cadastrar } from "../../../services/Service";

function FormCategoria() {
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  // Função para atualizar o estado da categoria
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  }

  // Função para buscar uma categoria pelo ID
  async function buscarPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria);
    } catch (error: any) {
      alert("Ocorreu um erro ao buscar a categoria. Verifique o console para mais detalhes.");
      console.error(error);
    }
  }

  // Função para cadastrar ou atualizar uma categoria
  async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar("/categorias", categoria, setCategoria);
        alert("A categoria foi atualizada com sucesso");
      } catch (error: any) {
        alert("Ocorreu um erro ao atualizar a categoria. Verifique o console para mais detalhes.");
        console.error(error);
      }
    } else {
      try {
        await cadastrar("/categorias", categoria, setCategoria);
        alert("A categoria foi cadastrada com sucesso");
      } catch (error: any) {
        alert("Ocorreu um erro ao cadastrar a categoria. Verifique o console para mais detalhes.");
        console.error(error);
      }
    }

    setIsLoading(false);
    retornar();
  }

  // Função para retornar à lista de categorias
  function retornar() {
    navigate("/categorias");
  }

  // Busca a categoria pelo ID quando o componente é montado ou o ID muda
  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--color-medium-dark-blue)] p-4">
      <div className="container flex flex-col mx-auto items-center bg-[var(--color-dark-blue)] p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-4xl text-center my-8 text-[var(--color-soft-white)] font-bold">
          {id !== undefined ? "Editar Categoria" : "Cadastrar Categoria"}
        </h1>

        <form className="flex flex-col w-full gap-6" onSubmit={gerarNovaCategoria}>
          <div className="flex flex-col gap-2">
            <label htmlFor="tipo" className="text-[var(--color-soft-white)] font-semibold">
              Descrição da Categoria
            </label>
            <input
              type="text"
              placeholder="Descreva aqui sua categoria"
              name="tipo"
              className="border-2 border-[var(--color-green-water)] rounded p-2 focus:outline-none focus:border-[var(--color-green-water-hover)] bg-[var(--color-medium-dark-blue)] text-[var(--color-soft-white)]"
              value={categoria.tipo || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <button
            className="rounded disabled:bg-[var(--color-light-green-water)] bg-[var(--color-green-water)] hover:bg-[var(--color-green-water-hover)]
                               text-[var(--color-dark-blue)] font-bold w-full py-3 flex justify-center transition-colors"
            type="submit"
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

export default FormCategoria;