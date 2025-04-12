import BigLogo from "./BigLogo";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        <Link className="block text-teal-600" to="/">
          <span className="sr-only">Home</span>
          <BigLogo size={200} />
        </Link>

        <nav aria-label="Global" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <Link
                className="text-gray-500 transition hover:text-gray-500/75"
                to="/experiments"
              >
                Experimentos
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-500 transition hover:text-gray-500/75"
                to="/periodic-table"
              >
                Tabela Periódica
              </Link>
            </li>
            <li>
              <Link to="/chat">
                <Button bg="#3c6b22ff" color="#f4f4f4">
                  Chat Científico
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
export default Header;
