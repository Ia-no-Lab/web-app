import { useEffect, useState } from "react";
import api from "@/services/api";
import type { Element } from "@/types/Element";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/home/tabela-periodica")({
  component: PeriodicTable,
});
function PeriodicTable() {
  const [elements, setElements] = useState<Element[]>([]);

  useEffect(() => {
    api
      .get("/elements")
      .then((res) => setElements(res.data))
      .catch((err) => console.error("Erro ao buscar elementos:", err));
  }, []);
  return (
    <div className="p-10 max-w-6xl mx-auto text-eerie-black">
      <h1 className="text-5xl font-bold mb-6">Tabela Periódica</h1>
      <p className="text-lg mb-8">
        Navegue pelos elementos da tabela periódica e conheça suas propriedades,
        números atômicos, massas e mais.
      </p>
      <div className="border p-10 rounded-md bg-white text-center text-neutral-400 min-h-[200px]">
        {elements.map((el) => (
          <div
            key={el.symbol}
            style={{ border: "1px solid #ccc", margin: 4, padding: 8 }}
          >
            <strong>{el.symbol}</strong> – {el.name}
            <br />
            Nº atômico: {el.number}
          </div>
        ))}
      </div>
    </div>
  );
}
