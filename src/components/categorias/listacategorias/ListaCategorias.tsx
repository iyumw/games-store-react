import { useEffect, useState } from "react";
import Cardcategorias from "../cardcategorias/CardCategorias";
import { buscar } from "../../../services/Service";
import Categoria from "../../../models/Categoria";
import { BeatLoader } from "react-spinners";

function ListaCategorias() {
  // Estado para armazenar as categorias
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // Função para buscar categorias da API
  async function buscarCategorias() {
    try {
      await buscar("/categorias", setCategorias);
    } catch (error: any) {
      console.error("Erro ao carregar categorias", error);
    }
  }

  // Chama a função para busca ao montar o componente
  useEffect(() => {
    buscarCategorias();
  }, []);

  return (
    <>
      {/* Exibe o loader enquanto as categorias estão sendo carregadas */}
      {categorias.length === 0 && (
          <div className="flex justify-center items-center h-screen">
            <BeatLoader color="var(--color-green-water)" />
          </div>
      )}
      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          <h1 className="text-4xl font-medium text-center my-8 text-dark-blue">
            Lista de Categorias
          </h1>
          <div
            className="grid grid-cols-1 md:grid-cols-2 
                                    lg:grid-cols-3 gap-8 px-2"
          >
            {categorias.map((categoria: Categoria) => (
              <Cardcategorias key={categoria.id} categoria={categoria} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaCategorias;