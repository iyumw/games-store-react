function Home() {
  return (
    <>
      <div className="bg-[var(--color-medium-dark-blue)] text-[var(--color-light-gray)] flex justify-center min-h-[90vh]">
        <div className="container grid grid-cols-2 text-white items-center justify-center">
          <div className="flex flex-col gap-6 items-center text-center">
            <h2 className="text-5xl font-bold">Seja Bem Vindo!</h2>
            <p className="text-xl">Aqui você encontra os melhores jogos! :D</p>

            <div className="rounded bg-blue-500 text-white border-green-water border-2 py-2 px-4 cursor-pointer hover:bg-green-water hover:border-blue-900 transition">
              Nova Categoria
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src="https://ik.imagekit.io/vzr6ryejm/games/home.png?updatedAt=1714775484705"
              alt="Imagem Página Home"
              className="w-2/3"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
