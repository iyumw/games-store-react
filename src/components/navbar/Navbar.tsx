import { ShoppingCart, User } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full flex justify-center py-4 bg-[var(--color-dark-blue)] text-[var(--color-light-gray)]">
      <div className="container flex items-center justify-between text-lg"> {/* Adicionado items-center */}
        <Link to="/home" className="text-2xl font-bold">
          <img
            className="w-[35%]"
            src="https://ik.imagekit.io/vzr6ryejm/games/logolg.png?updatedAt=1714775486354"
            alt="Logo da loja"
          />
        </Link>

        <div className="flex gap-4 items-center"> {/* Adicionado items-center */}
          <div className="flex space-x-6">

            <Link
              to="/categorias"
              className="hover:text-[var(--color-vibrant-purple)] transition duration-300 ease-in-out hover:-translate-y-1"
            >
              Categorias
            </Link>

            <Link
              to="/cadastrarcategoria"
              className="hover:text-[var(--color-vibrant-purple)] transition duration-300 ease-in-out hover:-translate-y-1"
            >
              Cadastrar Categoria
            </Link>

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