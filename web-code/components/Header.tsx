"use client";

import Link from "next/link";
import bigLogo from "@/public/big-logo.png";
import { useRouter } from "next/navigation";
import Image from 'next/image'

import { Button } from "@/components/ui/button";

export default function Header() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <Link href="/" className="mr-6 hidden lg:flex">
          <Image src={bigLogo} alt="Ia no Lab" className="h-40 w-40 object-contain" />
        </Link>
        <div className="ml-auto flex gap-2">
          <Link
            href="/home"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/sobre"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            Sobre
          </Link>
          <Link
            href="/normas"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            Normas
          </Link>
          <Link
            href="/privacidade"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            Privacidade
          </Link>
          <Button
            className="bg-fern-green text-cream hover:bg-tea-green hover:text-eerie-black"
            onClick={() => router.push("/login")}
          >
            Testar
          </Button>
        </div>
      </header>
    </div>
  );
}
