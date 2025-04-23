import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { LuGithub } from "react-icons/lu";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="flex w-full flex-col items-center justify-center gap-4 border-t p-6 text-center">
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition hover:bg-gray-100 dark:bg-gray-950 dark:text-white dark:hover:bg-gray-800"
        >
          Home
        </Link>
        <Link
          to="/sobre"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition hover:bg-gray-100 dark:bg-gray-950 dark:text-white dark:hover:bg-gray-800"
        >
          Sobre
        </Link>
        <Link
          to="/normas"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition hover:bg-gray-100 dark:bg-gray-950 dark:text-white dark:hover:bg-gray-800"
        >
          Normas
        </Link>
        <Button
          className="bg-fern-green text-cream hover:bg-tea-green hover:text-eerie-black"
          onClick={() => navigate({ to: "/auth" })}
        >
          Testar
        </Button>
      </div>

      <div className="flex items-center justify-center gap-4">
        <a
          href="https://github.com/Ia-no-Lab/web-app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 hover:scale-110 hover:rotate-6 transition-transform"
        >
          <span className="sr-only">GitHub</span>
          <LuGithub size={16} />
        </a>
      </div>

      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Ia no Lab. Todos os direitos reservados.
      </p>
    </footer>
  );
}
