import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LuArrowRight, LuBot, LuAtom } from "react-icons/lu";
import { useNavigate } from "@tanstack/react-router";
import smallLogo from "@/assets/small-logo.png";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: MainPage,
});

function MainPage() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Experimentos",
      description: "Veja ideias e testes científicos.",
      content: "Explore experiências práticas e teóricas.",
      footer: "Ver mais",
      url: "/home/experimentos",
      icon: (
        <img
          src={smallLogo}
          alt="logo"
          className="h-10 w-auto object-contain"
        />
      ),
    },
    {
      title: "Tabela Periódica",
      description: "Descubra os elementos químicos.",
      content: "Visualize dados, grupos e propriedades.",
      footer: "Acessar",
      url: "/home/tabela-periodica",
      icon: <LuAtom className="h-10 w-10 text-fern-green dark:text-cream" />,
    },
    {
      title: "Chat",
      description: "Converse com a IA do laboratório.",
      content: "Tire dúvidas sobre ciência de forma interativa.",
      footer: "Começar",
      url: "/home/chat",
      icon: <LuBot className="h-10 w-10 text-fern-green dark:text-cream" />,
    },
  ];

  return (
    <div className="p-10">
      <div className="flex flex-col items-start gap-4 text-left">
        <h1 className="text-8xl font-black leading-tight text-eerie-black">
          <span className="underline decoration-fern-green decoration-30 underline-offset-4">
            Simplificando
          </span>{" "}
          a ciência.
        </h1>
        <p className="text-7xl font-black mt-2 text-neutral-600">
          feito por estudantes
        </p>
      </div>

      <div className="mt-16">
        <h2 className="text-4xl font-bold text-eerie-black text-center mb-8">
          Selecione uma opção:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-col items-center text-center">
                {card.icon}
                <div className="mt-4">
                  <CardTitle>{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-center">{card.content}</p>
              </CardContent>
              <CardFooter className="justify-center">
                <Button
                  variant="outline"
                  onClick={() => navigate({ to: card.url })}
                  className="flex items-center gap-2 group text-cream bg-fern-green hover:bg-tea-green hover:text-eerie-black transition"
                >
                  {card.footer}
                  <LuArrowRight className="transition-transform group-hover:translate-x-1 duration-200" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
