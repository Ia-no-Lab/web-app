import React from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Flame, Beaker, Palette } from "lucide-react";
import { Button } from "@/src/components/ui/button";

const experimentosPopulares = [
  {
    title: "Vulcão de Bicarbonato",
    url: "/home/experimentos/vulcao-bicarbonato",
    icon: <Flame className="w-14 h-14 text-fern-green" />,
  },
  {
    title: "Densidade dos Líquidos",
    url: "/home/experimentos/densidade-liquidos",
    icon: <Beaker className="w-14 h-14 text-fern-green" />,
  },
  {
    title: "Cromatografia com Canetinha",
    url: "/home/experimentos/cromatografia",
    icon: <Palette className="w-14 h-14 text-fern-green" />,
  },
];

const Experiment = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto text-eerie-black">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Experimentos</h1>
        <p className="text-lg">
          Explore uma série de experimentos científicos educativos.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {experimentosPopulares.map((experiment, idx) => (
          <Card
            key={idx}
            className="flex flex-col items-center justify-between text-center p-8 h-[300px] shadow-md hover:shadow-lg transition-shadow"
          >
            <CardHeader className="flex flex-col items-center gap-4">
              {experiment.icon}
              <CardTitle className="text-lg font-semibold">
                {experiment.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="w-full px-0">
              <Button
                onClick={() => navigate({ to: experiment.url })}
                className="w-full bg-[hsl(var(--fern-green))] text-[hsl(var(--cream))] hover:bg-[hsl(var(--tea-green))] hover:text-[hsl(var(--eerie-black))] transition-colors"
              >
                Ver como fazer
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <Button
          onClick={() => navigate({ to: "/home/experimentos" })}
          className="h-14 w-64 text-lg font-semibold bg-[hsl(var(--fern-green))] text-[hsl(var(--cream))] hover:bg-[hsl(var(--tea-green))] hover:text-[hsl(var(--eerie-black))]"
        >
          Descobrir experimentos
        </Button>
      </div>
    </div>
  );
};

export default Experiment;
