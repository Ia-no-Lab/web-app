import React from "react";
import BigLogo from "./BigLogo";
import "./Footer.css";
function Footer() {
  return (
    <footer className="bg-[#3c6b22ff] rounded-lg shadow-sm text-[#f4f4f4]">
      <main className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <BigLogo size={100} />
          </a>
          <ul className="flex flex-wrap items-center gap-2 mb-6 text-sm font-medium ">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Sobre
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Normas
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-[#f4f4f4] sm:mx-auto dark:border-[#f4f4f4] lg:my-8" />
        <span className="block text-sm  sm:text-center ">
          © 2025
          <a href="https://flowbite.com/" className="hover:underline">
            {" "}
            IA no Lab
          </a>
          . All Rights Reserved.
        </span>
      </main>
    </footer>
  );
}

export default Footer;
