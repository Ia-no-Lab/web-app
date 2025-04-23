import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sobre")({
  component: About,
});

function About() {
  return (
    <div className="p-10 max-w-4xl mx-auto text-eerie-black">
      <h1 className="text-5xl font-bold mb-6">Sobre o projeto</h1>
      <p className="text-lg leading-relaxed mb-4">
        O Ia no Lab é uma iniciativa criada por estudantes com o objetivo de
        aproximar o conhecimento científico da realidade de todos.
      </p>
      <p className="text-lg leading-relaxed">
        Este é um projeto <strong>open source</strong>, ou seja, com código
        aberto. Isso significa que qualquer pessoa pode contribuir, estudar como
        funciona, adaptar e melhorar. Os benefícios incluem maior transparência,
        colaboração ativa da comunidade e evolução constante da plataforma.
      </p>
    </div>
  );
}
