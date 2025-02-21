import { useEffect, useState } from "react";
import Cardcategorias from "../cardprodutos/CardCategorias";
import { DNA } from "react-loader-spinner";
import { buscar } from "../../../services/Service";
import Categoria from "../../../models/Categoria";

function ListaCategorias() {
  // Estado para armazenar as categorias
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  // Função que carrega as categorias do backend
  async function buscarCategorias() {
    try {
      await buscar("/categorias", setCategorias);
    } catch (error: any) {
      console.error("Erro ao carregar categorias", error);
    }
  }

  // Chama a função para buscar as categorias quando o componente é montado
  useEffect(() => {
    buscarCategorias();
  }, []);

  return (
    <>
      {/* Exibe o loader enquanto as categorias estão sendo carregadas */}
      {categorias.length === 0 && (
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )}
      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          <h1 className="text-4xl font-medium text-center my-8 text-[var(--color-vibrant-purple)]">
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