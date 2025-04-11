import BigLogo from "./BigLogo";
import { Button } from "@chakra-ui/react";

function Header() {
  return (
    <header>
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        <a className="block text-teal-600" href="#">
          <span className="sr-only">Home</span>
          <BigLogo size={200} />
        </a>

        <nav aria-label="Global" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <a
                className="text-gray-500 transition hover:text-gray-500/75 "
                href="#"
              >
                Sobre
              </a>
            </li>
            <li>
              <a
                className="text-gray-500 transition hover:text-gray-500/75"
                href="#"
              >
                Normas
              </a>
            </li>
            <li>
              <Button bg="#3c6b22ff" color="#f4f4f4">Testar</Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
export default Header;
