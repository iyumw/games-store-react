import { ShoppingCart, User, MagnifyingGlass } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function Navbar() {
  const [categoriaDropdown, setCategoriaDropdown] = useState(false);
  const [produtoDropdown, setProdutoDropdown] = useState(false);

  // Referências para os dropdowns
  const categoriaDropdownRef = useRef<HTMLDivElement>(null);
  const produtoDropdownRef = useRef<HTMLDivElement>(null);

  // Fechar dropdowns ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoriaDropdownRef.current &&
        !categoriaDropdownRef.current.contains(event.target as Node)
      ) {
        setCategoriaDropdown(false);
      }
      if (
        produtoDropdownRef.current &&
        !produtoDropdownRef.current.contains(event.target as Node)
      ) {
        setProdutoDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full flex justify-center px-15 py-4 bg-[var(--color-dark-blue)] text-[var(--color-light-gray)]">
      <div className="container flex items-center justify-between text-lg">
        {/* Logo */}
        <Link to="/home" className="flex items-center">
          <img
            className="w-[200px] h-auto" // Define um tamanho fixo para evitar que o link ocupe mais espaço do que a imagem
            src="https://ik.imagekit.io/vzr6ryejm/games/logolg.png?updatedAt=1714775486354"
            alt="Logo da loja"
          />
        </Link>

        {/* Barra de Pesquisa */}
        <div className="flex items-center flex-grow max-w-[600px] mx-8">
          <input
            type="text"
            placeholder="Pesquisar..."
            className="w-full px-4 py-2 rounded-l-lg bg-[var(--color-medium-dark-blue)] text-[var(--color-light-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--color-vibrant-purple)]"
          />
          <button className="px-4 py-2 bg-[var(--color-vibrant-purple)] hover:bg-[var(--color-green-water-hover)] text-[var(--color-soft-white)] rounded-r-lg transition duration-300 ease-in-out">
            <MagnifyingGlass size={24} />
          </button>
        </div>

        {/* Links da Navbar */}
        <div className="flex gap-4 items-center">
          <div className="flex space-x-6">

            {/* Dropdown Produtos */}
            <div className="relative z-10" ref={produtoDropdownRef}>
              <button
                onClick={() => {
                  setProdutoDropdown(!produtoDropdown);
                  setCategoriaDropdown(false); // Fecha os outros dropdowns
                }}
                className="hover:text-vibrant-purple transition duration-300 ease-in-out hover:-translate-y-1 flex items-center gap-1"
              >
                Produtos
                <i className="bi bi-caret-down-fill text-sm"></i>
              </button>
              {produtoDropdown && (
                <div className="absolute bg-white text-black shadow-md mt-2 rounded-lg w-40">
                  <Link
                    to="/produtos"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setProdutoDropdown(false)}
                  >
                    Produtos
                  </Link>
                  <Link
                    to="/cadastrarproduto"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setProdutoDropdown(false)}
                  >
                    Cadastrar Produto
                  </Link>
                </div>
              )}
            </div>

            {/* Dropdown Categorias */}
            <div className="relative z-10" ref={categoriaDropdownRef}>
              <button
                onClick={() => {
                  setCategoriaDropdown(!categoriaDropdown);
                  setProdutoDropdown(false); // Fecha os outros dropdowns
                }}
                className="hover:text-vibrant-purple transition duration-300 ease-in-out hover:-translate-y-1 flex items-center gap-1"
              >
                Categorias
                <i className="bi bi-caret-down-fill text-sm"></i>
              </button>
              {categoriaDropdown && (
                <div className="absolute bg-white text-black shadow-md mt-2 rounded-lg w-40">
                  <Link
                    to="/categorias"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setCategoriaDropdown(false)}
                  >
                    Categorias
                  </Link>
                  <Link
                    to="/cadastrarcategoria"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setCategoriaDropdown(false)}
                  >
                    Cadastrar Categoria
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/perfil"
              className="hover:text-[var(--color-vibrant-purple)] transition duration-300 ease-in-out hover:-translate-y-1"
            >
              <User size={29} />
            </Link>

            <Link
              to="/sair"
              className="hover:text-[var(--color-vibrant-purple)] transition duration-300 ease-in-out hover:-translate-y-1"
            >
              <ShoppingCart size={29} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
