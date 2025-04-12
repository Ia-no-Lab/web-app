import React from "react";
import ScienceChat from "../components/ScienceChat/ScienceChat";
import { Header, Footer } from "../components/index";

const ScienceChatPage = () => {
  return (
    <div className="App bg">
      <Header />
      <main>
        <ScienceChat />
      </main>
      <Footer />
    </div>
  );
};

export default ScienceChatPage;
