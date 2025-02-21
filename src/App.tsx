import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import FormCategoria from "./components/categorias/formcategorias/FormCategoria";
import DeletarCategoria from "./components/categorias/deletarcategorias/deletarCategoria";
import ListaCategorias from "./components/categorias/listacategorias/ListaCategorias";
import ListaProdutos from "./components/produtos/listaprodutos/ListaProdutos";
import FormProduto from "./components/produtos/formproduto/FormProduto";
import DeletarProduto from "./components/produtos/deletarproduto/DeletarProduto";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />

              <Route path="/cadastrarcategoria" element={<FormCategoria />} />
              <Route path="/editarcategoria/:id" element={<FormCategoria />} />
              <Route
                path="/deletarcategoria/:id"
                element={<DeletarCategoria />}
              />
              <Route path="/categorias" element={<ListaCategorias />} />
              
              <Route path="/produtos" element={<ListaProdutos />} />
              <Route path="/editarproduto/:id" element={<FormProduto />} />
              <Route path="/cadastrarproduto" element={<FormProduto />} />
              <Route path="/deletarproduto/:id" element={<DeletarProduto />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
