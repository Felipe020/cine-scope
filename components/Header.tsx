"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-color-background flex items-center border-b border-gray-800 ">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/cine-scope-logo.svg"
              alt="logo-cine-scope"
              width={40}
              height={20}
            />
            <span className="text-2xl font-bold">CineScope</span>
          </Link>
        </div>
        <div className="flex gap-4 text-xl">
          <Link
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            href="/profile"
          >
            <Image
              src="/images/account-header-logo.svg"
              alt="logo-perfil"
              width={20}
              height={20}
            />
            <span>Perfil</span>
          </Link>
          <Link
            href="/admin"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/admin-header-logo.svg"
              alt="logo-administrador"
              width={20}
              height={20}
            />
            <span>Administrador</span>
          </Link>
          <Link
            href="/admin"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/login-header-logo.svg"
              alt="logo-login"
              width={20}
              height={20}
            />
            <span>Login</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
