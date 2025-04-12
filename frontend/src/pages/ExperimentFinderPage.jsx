import React from "react";
import ExperimentFinder from "../components/ExperimentFinder/ExperimentFinder";
import { Header, Footer } from "../components/index";

const ExperimentFinderPage = () => {
  return (
    <div className="App bg">
      <Header />
      <main>
        <ExperimentFinder />
      </main>
      <Footer />
    </div>
  );
};

export default ExperimentFinderPage;
