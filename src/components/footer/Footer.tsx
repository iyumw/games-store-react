import { GithubLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react';

function Footer() {
    let data = new Date().getFullYear();

    return (
        <footer className="flex flex-col items-center bg-[var(--color-dark-blue)] p-4 text-sm w-full text-[var(--color-light-gray)] py-6"> {/* Alterado para <footer> e adicionado padding */}
            <div className="max-w-7xl mx-auto w-full flex flex-col items-center"> {/* Container para limitar largura */}
                <p className="text-center font-semibold mb-2"> {/* Adicionado espaçamento abaixo */}
                    © {data} Isis Okamoto. Todos os direitos reservados.
                </p>
                <div className="flex flex-col items-center"> {/* Div para centralizar os ícones */}
                    <p className="text-xs pb-2">Acesse nossas redes sociais</p>
                    <div className="flex gap-4"> {/* Aumentado o espaçamento entre ícones */}
                        <a className="hover:text-[var(--color-green-water)] transition duration-300 ease-in-out hover:-translate-y-1" href="https://linkedin.com/in/isis-okamoto" target="_blank" rel="noopener noreferrer"> {/* Adicionado rel="noopener noreferrer" */}
                            <LinkedinLogo size={26} weight="bold" /> {/* Aumentado tamanho dos ícones */}
                        </a>
                        <a className="hover:text-[var(--color-green-water)] transition duration-300 ease-in-out hover:-translate-y-1" href="https://github.com/iyumw" target="_blank" rel="noopener noreferrer">
                            <GithubLogo size={26} weight="bold" />
                        </a>
                        <a className="hover:text-[var(--color-green-water)] transition duration-300 ease-in-out hover:-translate-y-1" href="https://instagram.com/_iyume" target="_blank" rel="noopener noreferrer">
                            <InstagramLogo size={26} weight="bold" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;