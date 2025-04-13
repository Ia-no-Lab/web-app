import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/src/components/ui/button";
import bigLogo from "@/src/assets/big-logo.png";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <Link to="/" className="mr-6 hidden lg:flex">
          <img src={bigLogo} alt="Ia no Lab" className="h-10" />
        </Link>
        <div className="ml-auto flex gap-2">
          <Link to="/home" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-white">
            Home
          </Link>
          <Link to="/sobre" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-white">
            Sobre
          </Link>
          <Link to="/normas" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-white">
            Normas
          </Link>
          <Button
            className="bg-fern-green text-cream hover:bg-tea-green hover:text-eerie-black"
            onClick={() => navigate({ to: "/auth" })}
          >
            Testar
          </Button>
        </div>
      </header>
    </div>
  );
}
