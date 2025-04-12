import React from "react";
import PeriodicTable from "../components/PeriodicTable/PeriodicTable";
import { Header, Footer } from "../components/index";

const PeriodicTablePage = () => {
  return (
    <div className="App bg">
      <Header />
      <main>
        <PeriodicTable />
      </main>
      <Footer />
    </div>
  );
};

export default PeriodicTablePage;
