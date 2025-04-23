import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/home/experimentos/novo-experimento")({
  component: Experimentos,
});

function Experimentos() {
  return <div>NovoExperimento</div>;
}
