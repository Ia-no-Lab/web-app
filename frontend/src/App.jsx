import React from "react";
import "./App.css";
import { About, Terms, SmallLogo, Header, Footer } from "./components/index";
import { LuTestTubeDiagonal, LuChevronRight, LuBot } from "react-icons/lu";
import { Button } from "./components/index.js";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="App bg">
      <Header />
      <main>
        <h1 className="main-tittle">
          <span className="underline decoration-20 decoration-[#3c6b22ff]">
            Simplificando
          </span>{" "}
          a ciência.
        </h1>
        <h2 className="sub-tittle text-stone-500">feito por estudantes.</h2>
        <div className="bigBox">
          <h3 className="text-center options-tittle">Selecione uma opção: </h3>
          <div className="mediumBox text-center allign-center ">
            <div className="smallBox">
              <SmallLogo size={90} />
              <p>Descubra experiências com base em seus materiais</p>
              <Link to="/experiments">
                <Button bg="#3c6b22ff" color="#f4f4f4">
                  <LuChevronRight /> Ir
                </Button>
              </Link>
            </div>
            <div className="smallBox">
              <LuTestTubeDiagonal className="h-15 w-20 " color="#3c6b22ff" />
              <p>Navegue pela tabela periódica interativa</p>
              <Link to="/periodic-table">
                <Button bg="#3c6b22ff" color="#f4f4f4">
                  <LuChevronRight /> Ir
                </Button>
              </Link>
            </div>
            <div className="smallBox">
              <LuBot className="h-21 w-20" color="#3c6b22ff" />
              <p>Converse com a IA científica</p>
              <Link to="/chat">
                <Button bg="#3c6b22ff" color="#f4f4f4">
                  <LuChevronRight /> Ir
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <About />
        <Terms />
      </main>
      <Footer />
    </div>
  );
};

export default App;
